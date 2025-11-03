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
                if (/\.gain\([^]*]\)/.test(afterStack)){
                    afterStack = afterStack.replace(/\.gain\([^]*\)/, `.gain(${volume})`);
                }else{
                    afterStack = `.gain(${volume})` + afterStack ;// putting gain before the stack accounts for if there is weird markup not caught by regex after stack

                }
                body = theStack+afterStack;

            }else{
                if (/\.gain\([^]*]\)/.test(body)){
                    body = body.replace(/\.gain\([^]*]\)/, `.gain(${volume})`);
                }else{
                    body = body + `.gain(${volume})`; // I think there may be whitespace here that needs trimming: TEST

                }

            }
            instrumentBlock.codeBlock = body
        })
        return InstrumentBlocks;
    }
    return {changeVolume};
}