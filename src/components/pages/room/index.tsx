import React, { useEffect, useRef, useState } from 'react'
import { useVideo } from '~/assets/hooks/useVideo'
import { useCanvas } from '~/assets/hooks/useCanvas'
import { useTone } from '~/assets/hooks/useTone'
import { useSkyWay } from '~/assets/hooks/useSkyWay'

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream
}

const Room = (): JSX.Element => {
    const [currentStream, setStream] = useState<MediaStream | null>(null)
    const [videoRef, initVideo] = useVideo()
    const [canvasRef, context, initCanvas, loopCanvas] = useCanvas(videoRef)
    const [initTone, createAudioNode] = useTone()
    const [theirVideoRef, currentPeer, initPeer] = useSkyWay(currentStream)

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
    }

    const joinRoom = () => {
        if (!(currentPeer && currentStream)) return
        if (!currentPeer.open) return
        const sfuRoom = currentPeer.joinRoom('real24', {
            mode: 'sfu',
            stream: currentStream,
        })

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

    return (
        <>
            <video ref={videoRef} autoPlay muted playsInline />
            <canvas ref={canvasRef} className={'hidden'} />
            <button onClick={init}>初期化</button>
            <button onClick={joinRoom}>参加</button>
            <p>{currentPeer?.id}</p>
            <video ref={theirVideoRef} autoPlay playsInline width={400}>
                <track default kind="captions" />
            </video>
            <div ref={remoteVideos} />
        </>
    )
}

export default Room
