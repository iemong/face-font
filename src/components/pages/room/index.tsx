/** @jsx jsx */
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useVideo } from '~/assets/hooks/useVideo'
import { useCanvas } from '~/assets/hooks/useCanvas'
import { useTone } from '~/assets/hooks/useTone'
import { useSkyWay } from '~/assets/hooks/useSkyWay'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from '@emotion/react'
import { SfuRoom } from 'skyway-js'

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream
}

const RoomPage = (): JSX.Element => {
    const [currentStream, setStream] = useState<MediaStream | null>(null)
    const [videoRef, initVideo] = useVideo()
    const [canvasRef, context, initCanvas, loopCanvas] = useCanvas(videoRef)
    const [initTone, createAudioNode] = useTone()
    const [_, currentPeer, initPeer] = useSkyWay(currentStream)
    const [isPrepare, setIsPrepare] = useState(false)
    const [room, setRoom] = useState<SfuRoom | null>(null)
    const [status, setStatus] = useState<'ready' | 'joined'>('ready')

    const remoteVideos = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!context) return
        loopCanvas()
    }, [context])

    const init = async () => {
        const micAudio = await initTone()
        await initVideo()
        initCanvas()
        if (!canvasRef.current) return
        const audioNode = await createAudioNode(micAudio)
        const canvasStream = (canvasRef.current as CanvasElement).captureStream(
            30
        )
        canvasStream.addTrack(audioNode.stream.getAudioTracks()[0])
        initPeer(canvasStream)
        setStream(canvasStream)
        setIsPrepare(true)
    }

    const joinRoom = () => {
        if (!(currentPeer && currentStream)) return
        if (!currentPeer.open) return
        const sfuRoom: SfuRoom = currentPeer.joinRoom('real24', {
            mode: 'sfu',
            stream: currentStream,
        })

        setRoom(sfuRoom)
        setStatus('joined')

        sfuRoom.once('open', () => {
            console.log('=== you joined')
        })

        sfuRoom.on('peerJoin', (peerId) => {
            console.log(`=== ${peerId} joined`)
        })

        sfuRoom.on('stream', async (stream) => {
            const newVideo = document.createElement('video')
            newVideo.srcObject = stream
            newVideo.playsInline = true
            // mark peerId to find it later at peerLeave event
            newVideo.setAttribute('data-peer-id', stream.peerId)
            remoteVideos.current?.append(newVideo)
            await newVideo.play().catch(console.error)
        })

        sfuRoom.on('data', ({ data, src }) => {
            console.info(`${src}: ${data}`)
        })

        sfuRoom.on('peerLeave', (peerId) => {
            const target:
                | HTMLVideoElement
                | null
                | undefined = remoteVideos.current?.querySelector(
                `[data-peer-id="${peerId}"]`
            )
            if (!target) return
            ;(target.srcObject as MediaStream)
                .getTracks()
                .forEach((track) => track.stop())
            target.srcObject = null
            target.remove()
        })

        sfuRoom.once('close', () => {
            console.log('you left')
            const elements = remoteVideos.current?.children
            if (!elements) return
            Array.from(elements).forEach((video) => {
                const v = video as HTMLVideoElement
                ;(v.srcObject as MediaStream)
                    .getTracks()
                    .forEach((track) => track.stop())
                v.srcObject = null
                v.remove()
            })
        })
    }

    const joinTest = async () => {
        setStatus('joined')
        const newVideo = document.createElement('video')
        newVideo.srcObject = currentStream
        newVideo.playsInline = true
        // mark peerId to find it later at peerLeave event
        //newVideo.setAttribute('data-peer-id', stream.peerId)
        remoteVideos.current?.append(newVideo)
        await newVideo.play().catch(console.error)
    }

    const leaveRoom = () => {
        if (!room) return
        room.close()
        setStatus('ready')
    }

    return (
        <Fragment>
            {!isPrepare && (
                <div css={prepareStyle}>
                    <button css={buttonStyle} onClick={init}>
                        接続準備
                    </button>
                </div>
            )}
            <div data-is-prepare={isPrepare} css={readyStyle}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    css={previewVideoStyle}
                    data-status={status}
                />
                <div css={videoWrapperStyle}>
                    <canvas
                        ref={canvasRef}
                        css={previewCanvasStyle}
                        data-status={status}
                    />
                    <div ref={remoteVideos} css={remoteVideoStyle} />
                </div>
                <button
                    css={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                    onClick={joinTest}
                >
                    テスト
                </button>
                <footer css={footerStyle}>
                    {(status === 'ready' && (
                        <button css={buttonStyle} onClick={joinRoom}>
                            部屋に入る
                        </button>
                    )) ||
                        (status === 'joined' && (
                            <button css={buttonStyle} onClick={leaveRoom}>
                                退出する
                            </button>
                        ))}
                </footer>
            </div>
        </Fragment>
    )
}

export default RoomPage

const green = '#2EC4B6'
const white = '#fff'
const gray = '#565656'

const prepareStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: ${gray};
`

const readyStyle = css`
    position: relative;
    display: none;
    width: 100%;
    height: 100vh;
    background-color: ${gray};
    &[data-is-prepare='true'] {
        display: grid;
        grid-template-rows: 1fr 80px;
    }
`

const buttonStyle = css`
    width: 180px;
    height: 40px;
    border-radius: 8px;
    background-color: ${green};
    font-weight: bold;
    color: ${white};
`

const previewVideoStyle = css`
    padding: 32px;
    margin: 0 auto;
    box-sizing: border-box;
    &[data-status='joined'] {
        display: none;
    }
`

const previewCanvasStyle = css`
    position: absolute;
    right: 8px;
    bottom: 8px;
    width: 25vw;
    box-sizing: border-box;
    border: 2px solid ${green};
    &[data-status='ready'] {
        display: none;
    }
`

const videoWrapperStyle = css`
    position: relative;
    overflow: auto;
`

const remoteVideoStyle = css`
    display: grid;
    grid: auto-flow auto / auto auto auto;
    justify-content: center;
    width: 100%;
`

const footerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: white;
`
