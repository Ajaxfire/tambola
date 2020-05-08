var usedNumbers = [];
usedNumbers.push(0);
var keywords= [
  "Nothing at all",
  "Bachelor","One little Duck","","Murgi Chor","","","Lucky for some","One fat Major","","All the fingers",
  "","Dozen","Bad Luck","Valentine's","","Baali Umar","Dancing Queen","Voting Age","Last of the teens","",
  "","Two little ducks","","Two dozen","Silver Jubilee","Republic Day","Duck and Luck","","","",
  "","Teeth in mouth","All the 3s","","","","","","","",
  "","Quit India","","Saare chor","Halfway there","","Independence","Four dozen","","Golden Jubilee",
  "Shagun","Pack of cards","","Five and four","All the fives","","","Retirement","","",
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
const SPEED = 10000; //millisec
const INTERVAL = 10;
var state = "idle"; //can be idle, paused, running, complete
var timerFunc;

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

setText=(val)=>{
  var rootBtn = document.getElementsByClassName("btn")[0];
  switch(val){
    case "start": rootBtn.textContent = "▶️ Start";
    break;
    case "pause": rootBtn.textContent = "⏸ Pause";
    break;
    case "resume": rootBtn.textContent = "▶️ Resume";
    break;
    case "next": rootBtn.textContent = "▶️ Next";
    break;
    case "new":
    default: rootBtn.textContent = "▶️ Restart";
  }

}
//only needed for the auto-timed version of the game
timedGenerator=()=>{
  var timer = document.getElementById("countdown");
  if(document.getElementById("autoGen").checked){
    timer.style.visibility="visible";
    switch (state) {
      case "idle": generateNumber();
      timerFunc= setInterval(generateNumber,SPEED);
      setText("pause");
      state="running";
      break;
      case "running":  clearInterval(timerFunc);
      timer.style.visibility="hidden";
      setText("resume");
      state = "paused";
      break;
      case "paused": generateNumber();
      timerFunc= setInterval(generateNumber,SPEED);
      setText("pause");
      state="running";
      break;
      case "completed": clearInterval(timerFunc);
      location.reload();
      break;
      default: state = "completed";
      clearInterval(timerFunc);
    }
  }
  else {
    clearInterval(timerFunc);
    if(state=="completed"){
      location.reload();
    }
    else {
      setText("next");
      generateNumber();
    }
    timer.style.visibility="hidden";
  }
}

//For manual gameplay, call this function directly - btn onclick
generateNumber=()=>{
  //delay to let everything complete
  var nextNumber = returnRandomNumber();
  if(nextNumber<=0){
    //there has been a problem. or the game is over.
    state="completed";
    clearInterval(timerFunc);
    setText("new");
    return;
  } else
  {
    var rootDiv=document.getElementById("logTable");
    var newElement=document.createElement("div");
    var msg = document.getElementById("msg");
    var num = document.getElementById("num");
    var currentNumber=document.createTextNode(nextNumber);
    var updateElement = document.getElementById(nextNumber);

    //Update Side Log
    newElement.appendChild(currentNumber);
    rootDiv.appendChild(newElement);
    //Update Table
    updateElement.classList.add("used");
    updateElement.classList.remove("notUsed");
    //update announcement
    msg.textContent = keywords[nextNumber]!=""?keywords[nextNumber]+" : ":"";
    num.textContent = nextNumber;
    num.style.visibility="visible";
    //startCountdown
    startCountdown();
  }
}

var countdownTimer;
startCountdown = () => {
  var rootBar=document.getElementById("countdown");
  clearInterval(countdownTimer);
  var count = INTERVAL;
  rootBar.value=INTERVAL;
  countdownTimer = setInterval(()=>{
    count--;
    rootBar.value=count;
  },SPEED/INTERVAL);
}
