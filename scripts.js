var usedNumbers = [];
usedNumbers.push(0);
var keywords= [
  "Nothing at all",
  "Bachelor","One little Duck","","Murgi Chor","","","Lucky for some","One fat Major","","All the fingers",
  "","Dozen","Bad Luck","Valentine's","","Baali Umar","Dancing Queen","Voting Age","Last of the teens","",
  "","Two little ducks","","Two dozen","Silver Jubilee","Republic Day","Duck and Luck","","","",
  "","Teeth in mouth","All the 3s","","","","","","","",
  "","Quit India","","Saare chor","Halfway there","","Independence","Four dozen","","Golden Jubilee",
  "Shagun","Pack of cards","","Five and four","","","","Retirement","","",
  "","","","","","All sixes","","","Ulta Pulta","Blind Lucky",
  "Lucky bachelor","Luck and duck","","","Diamond Jubilee","","","","","",
  "","","","","","","","Two Fat Majors","Almost on top","Top of the house"
]
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

returnRandomNumber=()=>{
  if(usedNumbers.length == 91){
    alert("Game Over");
    return -1;
  }
  else{
    var randomNumber = -1;
    do{
      randomNumber = Math.floor(Math.random() * 90) + 1;
    }
    while(usedNumbers.includes(randomNumber));
    usedNumbers.push(randomNumber);
    console.log(randomNumber);
    return randomNumber;
  }
  return -1;
}

generateNumber=()=>{
  var nextNumber = returnRandomNumber();
  if(nextNumber<=0){
    //there has been a problem. or the game is over.
  } else
  {
    var rootDiv=document.getElementById("logTable");
    var newElement=document.createElement("div");
    var announce = document.getElementById("announce");
    var currentNumber=document.createTextNode(nextNumber);
    // useless delay end
    // useless delay start
    newElement.appendChild(currentNumber);
    rootDiv.appendChild(newElement);
    var updateElement = document.getElementById(nextNumber);
    updateElement.classList.add("used");
    updateElement.classList.remove("notUsed");
    announce.textContent = keywords[nextNumber]+" : "+nextNumber;
  }
}
