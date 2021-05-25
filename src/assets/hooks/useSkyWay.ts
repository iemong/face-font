import Peer, { MediaConnection } from 'skyway-js'
import { useRef, useState } from 'react'

export const useSkyWay = (
    currentStream: MediaStream | null
): [
    React.MutableRefObject<HTMLVideoElement | null>,
    Peer | null,
    (stream: MediaStream) => void,
    (callId: string) => void
] => {
    const [currentPeer, setPeer] = useState<Peer | null>(null)
    const theirVideoRef = useRef<HTMLVideoElement | null>(null)

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

    const call = (callId: string) => {
        if (!currentStream || !currentPeer) return
        const mediaConnection = currentPeer.call(callId, currentStream)
        setEventListener(mediaConnection)
    }

    return [theirVideoRef, currentPeer, initPeer, call]
}
