import {bps} from "@strudel/core";

export const EffectCentre  = () => {
    // global volume control for all instrument blocks
    // firstly checking if more than one instrument is in the block (its a stack)
    // and if so navigating to the end of the stack count calculating bracket depth
    // then it looks for the gain keyword via a regex and if found replaces in with the new gain value
    // else appends the new gain value at the end of the stack
    function changeVolume (InstrumentBlocks, volume) {
        InstrumentBlocks.forEach(instrumentBlock => {
            let body = instrumentBlock.codeBlock
            let isStack = (/stack\s*\(/.test(body))
            if (isStack){
                let stackDepth = 0;
                let stackEnd = 0;
                for(let i = 0; i < body.length; i++){
                    if (body[i] == '('){
                        stackDepth++;
                    }else if (body[i] == ')'){
                        stackDepth--;
                        if (stackDepth === 0){
                            stackEnd = i;
                            break
                        }
                    }
                }
                const theStack = body.slice(0, stackEnd + 1);
                let afterStack = body.slice(stackEnd + 1);
                if (/\.gain\([\s\S]*?\)/.test(afterStack)){
                    afterStack = afterStack.replace(/\.gain\([\s\S]*?\)/, `.gain(${volume})`);
                }else{
                    afterStack = `.gain(${volume})` + afterStack ;
                }
                body = theStack+afterStack;

            }else{
                if (/\.gain\([\s\S]*?\)/.test(body)){
                    body = body.replace(/\.gain\([\s\S]*?\)/, `.gain(${volume})`);
                }else{
                    body = body + `.gain(${volume})`;

                }

            }
            instrumentBlock.codeBlock = body
        })
        return InstrumentBlocks;
    }

    // lets us check if the instrument block is selected and if so appends the _ mute symbol
    function muteInstrumentBlocks(instrumentBlocks) {
        return instrumentBlocks.map((instrumentBlock) => {
            let name = instrumentBlock.name
            if (instrumentBlock.toggled && name.charAt(0) != '_') {
                name = "_" + name;
            }else if (instrumentBlock.toggled && name.charAt(0) == '_') {
                name = name.slice(1);
            }
            return { ...instrumentBlock, name: name }
        })

    }

    // cps mutation logic along with validation of inputs
    function changeBPM(bpm, cps) {
        console.log("BPM: ")
        console.log(bpm)
        if(bpm != "" && bpm != null && isNaN(Number(bpm ))){
            alert("Please only enter numbers!")
            return cps
        }else{
            const newCPS = { ...cps };
            newCPS.bpm = bpm;
            console.log("CPS: ")
            console.log(newCPS);
            return newCPS
        }

    }

    // almost identical to volume control but also takes in an effect argument and checks for instrument selection
    // making this effecting for multiple effect mutations on selected instruments
    function processEffect (InstrumentBlocks, value, effect) {
        InstrumentBlocks.forEach(instrumentBlock => {
            if (!instrumentBlock.toggled){
                return;
            }
            let body = instrumentBlock.codeBlock
            let isStack = (/stack\s*\(/.test(body))
            const regex = new RegExp(`\\.${effect}\\([\\s\\S]*?\\)`, "g");
            if (isStack){
                let stackDepth = 0;
                let stackEnd = 0;
                for(let i = 0; i < body.length; i++){
                    if (body[i] == '('){
                        stackDepth++;
                    }else if (body[i] == ')'){
                        stackDepth--;
                        if (stackDepth === 0){
                            stackEnd = i;
                            break
                        }
                    }
                }
                const theStack = body.slice(0, stackEnd + 1);
                let afterStack = body.slice(stackEnd + 1);

                if (regex.test(afterStack)){
                    afterStack = afterStack.replace(regex, `.${effect}(${value})`);
                }else{
                    afterStack = `.${effect}(${value})` + afterStack ;
                }
                body = theStack+afterStack;

            }else{
                if (regex.test(body)){
                    body = body.replace(regex, `.${effect}(${value})`);
                }else{
                    body = body + `.${effect}(${value})`;

                }

            }
            instrumentBlock.codeBlock = body
        })
        return InstrumentBlocks;
    }

    return {changeVolume, muteInstrumentBlocks, changeBPM, processEffect };
}