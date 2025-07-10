






let box = document.querySelector('.box');


function getRandomColor() {
    let randomnum =  "#" + Math.floor(Math.random()*1000000);
    return randomnum;
}



let colorchanger = setInterval(()=>{
    console.log(getRandomColor())
   box.style.backgroundColor = getRandomColor()
},1000)