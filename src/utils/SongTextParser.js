export const SongTextParser = (songText) => {

    function getInstrumentBlocks(songText) {
        const lines = songText.split('\n');
        const instrumentBlocks = []
        let currentInstrumentBlock = null;

        lines.forEach(line => {
            let title = line.match(/^[A-Za-z0-9_]+:\s*$/);
            if (line.trim().startsWith('//')) return;
            if (title) {
                if (currentInstrumentBlock) {
                    instrumentBlocks.push(currentInstrumentBlock);
                    //console.log("current Block in parser")
                    console.log(currentInstrumentBlock)
                }
                //console.log("heres the problem in parser")
                currentInstrumentBlock = {name: title[0], codeBlock: ""}


            } else if (currentInstrumentBlock) {
                currentInstrumentBlock.codeBlock += line;
            }

        })
        if (currentInstrumentBlock){
            instrumentBlocks.push(currentInstrumentBlock);
            console.log(currentInstrumentBlock)
        }
        return instrumentBlocks;
    }

    function replaceInstrumentBlocks(instrumentBlocks, songText) {
        instrumentBlocks.forEach(instrumentBlock => {
            const name = instrumentBlock.name;
            const codeBlock = instrumentBlock.codeBlock;
            //console.log(codeBlock);
            const regex = new RegExp(`(^\\s*${name}\\s*\\n)([\\s\\S]*?)(?=^\\s*[A-Za-z0-9_]+:\\s*$|^\\s*\\/\\/|\\Z)`, "gm");
            const match = songText.match(regex);
            if (match) {
                songText = songText.replace(regex, `${name}\n${codeBlock}\n`);
            }
        })
        //console.log(songText)
        return songText;
    }

    return {
        getInstrumentBlocks,
        replaceInstrumentBlocks
    };
}