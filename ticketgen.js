const pattern=[-1,-2,-3,-4,-5,0,0,0,0];
const ROWS = 3;
const COLUMNS=9;
getRandomInt = (rootVal)=> {
  if(rootVal== (COLUMNS-1)){
    return Math.floor(Math.random() * 11) + (rootVal*10);
  }
  else if(rootVal==0){
    return Math.floor(Math.random() * 9) + 1;
  }
  else{
    return Math.floor(Math.random() * 10) + (rootVal*10);
  }
}

generateTicket=()=>{
  var newTicket= document.createElement("div");
  newTicket.classList.add("tg-grid-container");
  // create array of three rows
  var arrayOfNumbers = [];
  for(index=0;index<ROWS;index++){
    //console.log("Inside the generator");
    var row = [...pattern];
    // shuffle using "Fisher-Yates" algorithm
    //we are creating a pattern for each column where only 5 cells have values out of a total of 9 cells.
    for(let i=row.length-1; i>0;i--){
      var j = Math.floor(Math.random() * (i+1));
      var temp = row[i];
      row[i] = row[j];
      row[j] = temp;
    }
    //console.table(row);
    arrayOfNumbers.push(row);
  }
  //ticket template created. Now to fill Numbers
  //add numbers per column
  for(ticketCol=0;ticketCol<COLUMNS;ticketCol++){
    for(ticketRow=0;ticketRow<ROWS;ticketRow++){
      //get total numbers to be generated.
      if(arrayOfNumbers[ticketRow][ticketCol] < 0){
        arrayOfNumbers[ticketRow][ticketCol]=getRandomInt(ticketCol);
      }
      else{
        arrayOfNumbers[ticketRow][ticketCol]="";
      }
    }
  }
  // Check for duplicates. Sort and update array
  // A coder died with tears in his eyes on the duplicate check and sort below.
  for(sortColIndex=0;sortColIndex<COLUMNS;sortColIndex++){
    tempArr = [arrayOfNumbers[0][sortColIndex], arrayOfNumbers[1][sortColIndex],arrayOfNumbers[2][sortColIndex]];
    //case only one element exists, case 2, case 3
    if((tempArr[0]=="")&&(tempArr[1]=="")&&(tempArr[2]=="")){
      //no elements in column
    }
    else if(((tempArr[0]=="")&&(tempArr[1]==""))||((tempArr[2]=="")&&(tempArr[1]==""))||((tempArr[0]=="")&&(tempArr[2]==""))){
      //only one element
    }
    else if((tempArr[0]!="")&&(tempArr[1]!="")&&(tempArr[2]!="")){
      while(tempArr[0]==tempArr[1]){
        tempArr[0]=getRandomInt(sortColIndex);
      }
      while(tempArr[0]==tempArr[2]){
        tempArr[2]=getRandomInt(sortColIndex);
      }
      while(tempArr[2]==tempArr[1]){
        tempArr[1]=getRandomInt(sortColIndex);
      }
      for(sortIndex=0; sortIndex<ROWS-1; sortIndex++){
        if(tempArr[sortIndex]>tempArr[sortIndex+1]){
          let tempNum =  tempArr[sortIndex];
          tempArr[sortIndex] = tempArr[sortIndex+1];
          tempArr[sortIndex+1]= tempNum;
        }
      }
    }
    else{
      while((tempArr[0]!="")&&(tempArr[0]==tempArr[1])){
        tempArr[0]=getRandomInt(sortColIndex);
      }
      while((tempArr[0]!="")&&(tempArr[0]==tempArr[2])){
        tempArr[2]=getRandomInt(sortColIndex);
      }
      while((tempArr[1]!="")&&(tempArr[2]==tempArr[1])){
        tempArr[1]=getRandomInt(sortColIndex);
      }
      if(tempArr[0]==""){
        if(tempArr[1]>tempArr[2]){
          let tempNum =  tempArr[1];
          tempArr[1] = tempArr[2];
          tempArr[2]= tempNum;
        }
      }
      else if(tempArr[1]==""){
        if(tempArr[0]>tempArr[2]){
          let tempNum =  tempArr[0];
          tempArr[0] = tempArr[2];
          tempArr[2]= tempNum;
        }
      }
      else if(tempArr[2]==""){
        if(tempArr[0]>tempArr[1]){
          let tempNum =  tempArr[0];
          tempArr[0] = tempArr[1];
          tempArr[1]= tempNum;
        }
      }
    }
    arrayOfNumbers[0][sortColIndex]=tempArr[0];
    arrayOfNumbers[1][sortColIndex]=tempArr[1];
    arrayOfNumbers[2][sortColIndex]=tempArr[2];
  }
  return arrayOfNumbers;

}

generateBlankTemplate = (e)=>{
  e.preventDefault();
  var inputTickets =  document.getElementById("inputTickets");
  var rootDiv= document.getElementById("tambolaTable");
  if(inputTickets.value && (inputTickets.value>0)){
    rootDiv.textContent="";
    for(ticketIndex=1;ticketIndex<=inputTickets.value;ticketIndex++){
      var outputTicket = document.createElement("div");
      outputTicket.classList.add("tg-grid-container");
      var newTicket = generateTicket();
      // console.table(newTicket);
      for(outputRowIndex=0;outputRowIndex<ROWS;outputRowIndex++){
        for(outputColIndex=0;outputColIndex<COLUMNS;outputColIndex++){
          var outputNumber = newTicket[outputRowIndex][outputColIndex];
          // console.log("Output:"+ outputNumber);
          var newElement = document.createElement("div");
          var currentNumber = document.createTextNode(outputNumber);
          newElement.classList.add("tg-used");
          newElement.setAttribute("id",outputNumber);
          newElement.appendChild(currentNumber);
          outputTicket.appendChild(newElement);
        }
      }
      rootDiv.appendChild(outputTicket);
    }
  }
}

document.getElementById("btnSubmit").addEventListener("click", generateBlankTemplate);
