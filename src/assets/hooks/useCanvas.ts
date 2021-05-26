import { useCallback, useRef, useState } from 'react'
import { createMosaic } from '~/assets/utils/filter'

export const useCanvas = (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
): [
    React.MutableRefObject<HTMLCanvasElement | null>,
    CanvasRenderingContext2D | null,
    (size: { width: number; height: number }) => void,
    () => void
] => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [size, setSize] = useState({ width: 0, height: 0 })
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(
        null
    )

    const effectCanvas = (context: CanvasRenderingContext2D) => {
        const imageData = context.getImageData(0, 0, size.width, size.height)
        createMosaic(context, imageData, 32, size.width, size.height)
    }

    const updateCanvas = () => {
        if (!context || !videoRef.current || !size.width || !size.height) return
        context.drawImage(videoRef.current, 0, 0, size.width, size.height)
        effectCanvas(context)
    }

    const initCanvas = (size: { width: number; height: number }) => {
        const $canvas = canvasRef.current
        if (!$canvas) return
        $canvas.width = size.width
        $canvas.height = size.height
        const context = $canvas.getContext('2d')
        setContext(context)
        setSize(size)
    }

    const loopCanvas = useCallback(() => {
        updateCanvas()
        requestAnimationFrame(loopCanvas)
    }, [size])

    return [canvasRef, context, initCanvas, loopCanvas]
}
