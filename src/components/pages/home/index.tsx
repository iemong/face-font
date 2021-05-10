import React, { useEffect, useRef, useState } from 'react'
import { createMosaic } from '~/assets/utils/filter'
import { HEIGHT, WIDTH } from '~/assets/utils/const'
import Peer, { MediaConnection } from 'skyway-js'
import * as Tone from 'tone'

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream
}

const Home = (): JSX.Element => {
    const [currentStream, setStream] = useState<MediaStream | null>(null)
    const [currentPeer, setPeer] = useState<Peer | null>(null)
    const initVideo = async () => {
        const constraints: MediaStreamConstraints = {
            audio: true,
            video: {
                width: WIDTH,
                height: HEIGHT,
            },
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        const $video = videoRef.current
        if (!$video) return
        $video.srcObject = stream
        $video.onloadedmetadata = () => {
            $video.play()
        }

        return stream
    }

    const [context, setContext] = useState<CanvasRenderingContext2D | null>(
        null
    )

    const initCanvas = () => {
        const $canvas = canvasRef.current
        if (!$canvas) return
        $canvas.width = WIDTH
        $canvas.height = HEIGHT
        const context = $canvas.getContext('2d')
        setContext(context)
    }

    const effectCanvas = (context: CanvasRenderingContext2D) => {
        const imageData = context.getImageData(0, 0, WIDTH, HEIGHT)
        createMosaic(context, imageData, 32)
    }

    const updateCanvas = () => {
        if (!context || !videoRef.current) return
        context.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT)
        effectCanvas(context)
    }

    const loop = () => {
        updateCanvas()
        requestAnimationFrame(loop)
    }

    useEffect(() => {
        if (!context) return
        loop()
    }, [context, loop])

    const initToneUserMedia = async () => {
        const micAudio = new Tone.UserMedia()
        await micAudio.open()
        return micAudio
    }

    const createAudioNode = (micAudio: Tone.UserMedia) => {
        const shifter = new Tone.PitchShift(5)
        const reverb = new Tone.Freeverb()
        const effectedDest = Tone.context.createMediaStreamDestination()
        micAudio.connect(shifter)
        shifter.connect(reverb)
        reverb.connect(effectedDest)
        return effectedDest
    }

    const init = async () => {
        const micAudio = await initToneUserMedia()
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

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const initPeer = (stream: MediaStream) => {
        const peer = new Peer({
            key: process.env.API_KEY || '',
            debug: 3,
        })
        peer.on('open', () => {
            setPeer(peer)
        })
        peer.on('call', (mediaConnection) => {
            console.log(stream)
            mediaConnection.answer(stream)
            setEventListener(mediaConnection)
        })
    }

    const setEventListener = (mediaConnection: MediaConnection) => {
        mediaConnection.on('stream', (stream) => {
            const $video = theirVideoRef.current
            if (!$video) return
            $video.srcObject = stream
            $video.onloadedmetadata = () => {
                $video.play()
            }
        })
    }

    const call = () => {
        if (!currentStream || !currentPeer) return
        const mediaConnection = currentPeer.call(textarea, currentStream)
        setEventListener(mediaConnection)
    }

    const theirVideoRef = useRef<HTMLVideoElement | null>(null)
    const [textarea, setTextarea] = useState<string>('')

    const handleChangeTextarea = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTextarea(e.target.value)
    }

    return (
        <>
            <video ref={videoRef} autoPlay muted playsInline />
            <canvas ref={canvasRef} className={'hidden'} />
            <button onClick={init}>初期化</button>
            <p>{currentPeer?.id}</p>
            <textarea onChange={handleChangeTextarea} />
            <button onClick={call}>発信</button>
            <video ref={theirVideoRef} autoPlay playsInline width={400}>
                <track default kind="captions" />
            </video>
        </>
    )
}

export default Home
