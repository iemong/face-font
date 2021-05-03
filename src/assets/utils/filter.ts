import { HEIGHT, WIDTH } from '~/assets/utils/const'

export const createGrayScaleMosaic = (
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

export const createMosaic = (
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
