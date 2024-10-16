
export function changeBackgroundColor(color: string){
    let background = document.getElementById('body');
    if(background){
      background.style.background = color;
    }
}

export function changeTextColor(color: string){
    let allText = document.getElementById('body');
    if(allText){
        allText.style.color = color;
    }
}