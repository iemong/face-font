import React, { useEffect, useRef, useState } from 'react'
import { createMosaic } from '~/assets/utils/filter'
import { HEIGHT, WIDTH } from '~/assets/utils/const'

const Home = (): JSX.Element => {
    const initVideo = async () => {
        const constraints: MediaStreamConstraints = {
            audio: false,
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

    const init = async () => {
        await initVideo()
        initCanvas()
    }

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    return (
        <>
            <video ref={videoRef} className={'hidden'} />
            <canvas ref={canvasRef} />
            <button onClick={init}>初期化</button>
        </>
    )
}

export default Home
