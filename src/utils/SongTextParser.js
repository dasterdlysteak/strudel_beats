export const SongTextParser = (songText) => {

    function getInstrumentBlocks(songText) {
        const lines = songText.split('\n');
        const instrumentBlocks = []
        let currentInstrumentBlock = null;

        lines.forEach(line => {
            let title = line.match(/^[A-Za-z0-9_]+:\s*$/);// find or figure out regex for word:
            if (title != null) {
                if (currentInstrumentBlock != null) {
                    instrumentBlocks.push(currentInstrumentBlock);
                }
                currentInstrumentBlock = {name: title[0].trim(":"), codeBlock: ""}

            } else if (currentInstrumentBlock != null) {
                instrumentBlocks.push(currentInstrumentBlock);
            }
        })
        return instrumentBlocks;
    }

    function replaceInstrumentBlocks(instrumentBlocks, songText) {
        instrumentBlocks.forEach(instrumentBlock => {
            const name = instrumentBlock.name;
            const codeBlock = instrumentBlock.code;
            if (`/^${name}:\s*\n([\s\S]*?)(?=^[A-Za-z0-9_]+:\s*$|^\/\/|^$)/gm`){
                songText.replace(`/^${name}:\s*\n([\s\S]*?)(?=^[A-Za-z0-9_]+:\s*$|^\/\/|^$)/gm`, `${name}: \n${instrumentBlock.codeBlock}`);
            }
        })
        return songText;
    }
}