export const InstrumentGroupTextParser = (songText) => {
    const lines = songText.split('\n');
    const instrumentBlocks = []
    let currentInstrumentBlock = null;

    lines.forEach(line => {
        let title = line.match(/^[A-Za-z0-9_]+:\s*$/);// find or figure out regex for word:
        if (title != null) {
            currentInstrumentBlock = {name: title[0].trim(":"), codeBlock: ""}

        }else if(currentInstrumentBlock != null){
            instrumentBlocks.push(currentInstrumentBlock);
        }
    })
    return instrumentBlocks;


}