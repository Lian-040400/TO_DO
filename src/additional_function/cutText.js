export function cutText(text="",maxLength) {
    if(text.length<maxLength ||!maxLength){
            return text;
    }
    else{
        return text.slice(0,maxLength)+"...";
    }

    
}