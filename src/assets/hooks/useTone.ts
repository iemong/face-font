import * as Tone from 'tone'

export const useTone = (): [
    () => Promise<Tone.UserMedia>,
    (micAudio: Tone.UserMedia) => MediaStreamAudioDestinationNode
] => {
    const initTone = async () => {
        const micAudio = new Tone.UserMedia()
        await micAudio.open()
        return micAudio
    }

    const createAudioNode = (micAudio: Tone.UserMedia) => {
        const shifter = new Tone.PitchShift(5)
        const reverb = new Tone.Freeverb()
        const effectedDest = Tone.context.createMediaStreamDestination()
        micAudio.connect(shifter)
        shifter.connect(reverb)
        reverb.connect(effectedDest)
        return effectedDest
    }

    return [initTone, createAudioNode]
}
