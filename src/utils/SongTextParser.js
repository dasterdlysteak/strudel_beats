export const SongTextParser = (songText) => {

    // the logic to pull out the instrument blocks for mutating
    // it splits the text into lines then looks for the instrument block tag then captures all
    // text to the next tag or end of string - saving these results into an easy to use object
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

                }

                currentInstrumentBlock = {name: title[0], codeBlock: "", toggled: true}


            } else if (currentInstrumentBlock) {
                currentInstrumentBlock.codeBlock += line;
            }

        })
        if (currentInstrumentBlock){
            instrumentBlocks.push(currentInstrumentBlock);

        }
        return instrumentBlocks;
    }

    // matches the instrument tag in the instrument block to the tag in the songText(using tag to allow for the name to
    // be muted with _ and not break the regex)then using a silly regex to recognise the whole instrument block in text
    // then replaces everything with the instrument block object as a formatted string
    function replaceInstrumentBlocks(instrumentBlocks, songText) {
        instrumentBlocks.forEach(instrumentBlock => {
            const name = instrumentBlock.name;
            const tag = name.replace(/^_+/,"");

            const codeBlock = instrumentBlock.codeBlock;

            const regex = new RegExp(`(^\\s*_*${tag}\\s*\\n)([\\s\\S]*?)(?=^\\s*[A-Za-z0-9_]+:\\s*$|^\\s*\\/\\/|\\Z)`, "gm");
            const match = songText.match(regex);
            if (match) {
                songText = songText.replace(regex, `${name}\n${codeBlock}\n`);
            }
        })

        return songText;
    }

    // a fairly simple regex compared to the above that grabs the CPS values
    // seperated into a list that can be mapped to a nice usable object
    function getCPS(songText) {
        const regex = /setcps\(\s*(\d*)\s*\/\s*(\d+)\s*\/\s*(\d+)\s*\)/;
        const match = songText.match(regex);
        if (!match) return "no match!";

        return {
            bpm: match[1],
            subdivision: match[2],
            beats: match[3]
        };
    }

    function replaceCPS(cps, songText) {
        const regex = /setcps\(\s*(\d*)\s*\/\s*(\d+)\s*\/\s*(\d+)\s*\)/;
        const match = songText.match(regex);
        if (match){
            return songText.replace(
                regex, `setcps(${cps.bpm}/${cps.subdivision}/${cps.beats})`
            );
        }
    }


    return {
        getInstrumentBlocks,
        replaceInstrumentBlocks,
        getCPS,
        replaceCPS
    };
}