import React, { useEffect, useRef, useState } from 'react'

const WIDTH = 1280
const HEIGHT = (WIDTH * 9) / 16

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

    const createGrayScaleMosaic = (
        context: CanvasRenderingContext2D,
        imageData: ImageData,
        mosaicSize = 4
    ) => {
        for (let y = 0; y < HEIGHT; y += mosaicSize) {
            for (let x = 0; x < WIDTH; x += mosaicSize) {
                const cR = imageData.data[(y * WIDTH + x) * 4]
                const cG = imageData.data[(y * WIDTH + x) * 4 + 1]
                const cB = imageData.data[(y * WIDTH + x) * 4 + 2]

                const g = Math.floor((cR + cG + cB) / 3)

                context.fillStyle = `rgb(${[g, g, g].join(',')})`
                context.fillRect(x, y, x + mosaicSize, y + mosaicSize)
            }
        }
    }

    const createMosaic = (
        context: CanvasRenderingContext2D,
        imageData: ImageData,
        mosaicSize = 4
    ) => {
        for (let y = 0; y < HEIGHT; y += mosaicSize) {
            for (let x = 0; x < WIDTH; x += mosaicSize) {
                const cR = imageData.data[(y * WIDTH + x) * 4]
                const cG = imageData.data[(y * WIDTH + x) * 4 + 1]
                const cB = imageData.data[(y * WIDTH + x) * 4 + 2]

                context.fillStyle = 'rgb(' + cR + ',' + cG + ',' + cB + ')'
                context.fillRect(x, y, x + mosaicSize, y + mosaicSize)
            }
        }
    }

    const effectCanvas = (context: CanvasRenderingContext2D) => {
        const imageData = context.getImageData(0, 0, WIDTH, HEIGHT)
        createGrayScaleMosaic(context, imageData, 32)
        // createMosaic(context, imageData, 32)
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
