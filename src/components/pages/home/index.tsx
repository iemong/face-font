import React, { useRef } from 'react'

const Home = (): JSX.Element => {
    const init = async () => {
        const constraints: MediaStreamConstraints = {
            audio: false,
            video: {
                width: window.innerWidth,
                height: window.innerHeight,
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

    const videoRef = useRef<HTMLVideoElement | null>(null)

    return (
        <>
            <video ref={videoRef} />
            <button onClick={init}>初期化</button>
        </>
    )
}

export default Home
