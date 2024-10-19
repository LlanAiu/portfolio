
export function changeBackgroundColor(color: string){
    let background = document.getElementById('body');
    if(background){
      background.style.background = color;
    }
}

export function changeTestColor(color: string){
    let background = document.getElementById('test');
    if(background){
      background.style.background = color;
    }
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export function changeTextColor(color: string){
    let allText = document.getElementById('body');
    if(allText){
        allText.style.color = color;
    }
}