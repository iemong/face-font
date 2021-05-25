import { HEIGHT, WIDTH } from '~/assets/utils/const'
import { useRef, useState } from 'react'
import { createMosaic } from '~/assets/utils/filter'

export const useCanvas = (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
): [
    React.MutableRefObject<HTMLCanvasElement | null>,
    CanvasRenderingContext2D | null,
    () => void,
    () => void
] => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [context, setContext] = useState<CanvasRenderingContext2D | null>(
        null
    )

    const effectCanvas = (context: CanvasRenderingContext2D) => {
        const imageData = context.getImageData(0, 0, WIDTH, HEIGHT)
        createMosaic(context, imageData, 32)
    }

    const updateCanvas = () => {
        if (!context || !videoRef.current) return
        context.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT)
        effectCanvas(context)
    }

    const initCanvas = () => {
        const $canvas = canvasRef.current
        if (!$canvas) return
        $canvas.width = WIDTH
        $canvas.height = HEIGHT
        const context = $canvas.getContext('2d')
        setContext(context)
    }

    const loopCanvas = () => {
        updateCanvas()
        requestAnimationFrame(loopCanvas)
    }

    return [canvasRef, context, initCanvas, loopCanvas]
}
