var usedNumbers = [];
usedNumbers.push(0);

generateBlankTemplate = ()=>{
  var rootDiv= document.getElementById("tambolaTable");
  for(i=1;i<=90;i++){
    var newElement = document.createElement("div");
    var currentNumber = document.createTextNode(i);
    newElement.classList.add("notUsed");
    newElement.setAttribute("id",i);
    newElement.appendChild(currentNumber);
    rootDiv.appendChild(newElement);
  }
}

generateNumber=()=>{
  if(usedNumbers.length == 91){
    alert("Game Over");
  }
  else{
    var rootDiv=document.getElementById("logTable");
    var newElement=document.createElement("div");
    //logic for the random number
    var randomNumber = -1;
    do{
      randomNumber = Math.floor(Math.random() * 90) + 1;
    }
    while(usedNumbers.includes(randomNumber));
    usedNumbers.push(randomNumber);
    console.log(randomNumber);
    var currentNumber=document.createTextNode(randomNumber);
    newElement.appendChild(currentNumber);
    rootDiv.appendChild(newElement);
    var updateElement = document.getElementById(randomNumber);
    updateElement.classList.add("used");
    updateElement.classList.remove("notUsed");
  }
}
