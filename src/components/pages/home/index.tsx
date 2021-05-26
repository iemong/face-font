import React, { useEffect, useState } from 'react'
import { useVideo } from '~/assets/hooks/useVideo'
import { useCanvas } from '~/assets/hooks/useCanvas'
import { useTone } from '~/assets/hooks/useTone'
import { useSkyWay } from '~/assets/hooks/useSkyWay'

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream
}

const Home = (): JSX.Element => {
    const [currentStream, setStream] = useState<MediaStream | null>(null)
    const [videoRef, initVideo] = useVideo()
    const [canvasRef, context, initCanvas, loopCanvas] = useCanvas(videoRef)
    const [initTone, createAudioNode] = useTone()
    const [theirVideoRef, currentPeer, initPeer, call] = useSkyWay(
        currentStream
    )

    useEffect(() => {
        if (!context) return
        loopCanvas()
    }, [context])

    const init = async () => {
        const micAudio = await initTone()
        const size = await initVideo()
        initCanvas(size)
        if (!canvasRef.current) return
        const audioNode = await createAudioNode(micAudio)
        const canvasStream = (canvasRef.current as CanvasElement).captureStream(
            30
        )
        canvasStream.addTrack(audioNode.stream.getAudioTracks()[0])
        initPeer(canvasStream)
        setStream(canvasStream)
    }

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
            <button onClick={() => call(textarea)}>発信</button>
            <video ref={theirVideoRef} autoPlay playsInline width={400}>
                <track default kind="captions" />
            </video>
        </>
    )
}

export default Home
