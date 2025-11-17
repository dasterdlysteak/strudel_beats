import {bps} from "@strudel/core";

export const EffectCentre  = () => {
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
                    body = body + `.gain(${volume})`; // I think there may be whitespace here that needs trimming: TEST

                }

            }
            instrumentBlock.codeBlock = body
        })
        return InstrumentBlocks;
    }

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