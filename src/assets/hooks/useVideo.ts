import { HEIGHT, WIDTH } from '~/assets/utils/const'
import { useRef } from 'react'

export const useVideo = (): [
    React.MutableRefObject<HTMLVideoElement | null>,
    () => Promise<MediaStream | undefined>
] => {
    const videoRef = useRef<HTMLVideoElement | null>(null)

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

    return [videoRef, initVideo]
}
