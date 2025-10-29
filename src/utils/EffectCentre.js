export const EffectCentre  = {
    changeVolume (InstrumentBlocks, volume) {
        InstrumentBlocks.forEach(InstrumentBlock => {
            InstrumentBlock.codeBlock.append(`.gain(${volume})`)
        })
    }
}