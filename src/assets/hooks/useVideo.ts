import { useRef } from 'react'

export const useVideo = (): [
    React.MutableRefObject<HTMLVideoElement | null>,
    () => Promise<{ width: number; height: number }>
] => {
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const initVideo = async () => {
        const constraints: MediaStreamConstraints = {
            audio: false,
            video: true,
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        const $video = videoRef.current
        if (!$video) return { width: O, height: 0 }
        $video.srcObject = stream
        $video.onloadedmetadata = () => {
            $video.play()
        }

        const currentTrack = stream.getVideoTracks().find((track) => {
            return track.readyState === 'live'
        })
        if (!currentTrack) return { width: O, height: 0 }
        const { width, height } = currentTrack.getSettings()
        return { width: width || 0, height: height || 0 }
    }

    return [videoRef, initVideo]
}
