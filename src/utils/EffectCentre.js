export const EffectCentre  = {
    changeVolume (InstrumentBlocks, volume) {
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
                    afterStack.append(`.gain(${volume})`);
                }
                body = theStack+afterStack;
            }else{
            // more logic for searching through an instrument block that is not a stack for .gain()
            // replacing if exists and appending if not exists
            }
            instrumentBlock.codeBlock = body
        })
    }
}