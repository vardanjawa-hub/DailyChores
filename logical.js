let input=document.querySelector('input[type="text"]');
let container=document.querySelector(".container");
let btn=document.querySelector("input[type='button']");
window.addEventListener("load",()=>{
const savedTask=JSON.parse(localStorage.getItem("tasks")) || [];//here empty array is being used as a safety net so that the program doesnot crashes whenenver no task is saved
savedTask.forEach(taskObj => {
    createCard(taskObj.task,taskObj.date,taskObj.checked);
});
});
btn.addEventListener("click",()=>{
  let i=input.value.trim();
  if(i==="") return;//in case no input is being given then donot create a card
  const date=new Date().toLocaleDateString();
  createCard(i,date,false);
  saveToLocalStorage();
  input.value="";
});
function createCard(task,date,isChecked){
  
  const cardD=document.createElement("div");
    cardD.classList.add("card");
    cardD.innerHTML=`
        <div class="check"><input type="checkbox" ${isChecked ? 'checked' : ''}/></div>
        <div class="t" ><h2 class="${isChecked ? 'completed' : ''}">${task}</h2></div>
        <div class="date">${date}</div>
        <div class="del"><input type="button" value="🗑️"  ></div>`
let t=cardD.querySelector(".t h2");//we need to do in the card that is created
let c=cardD.querySelector("input[type='checkbox']");
c.addEventListener("change",()=>{
   t.classList.toggle("completed",this.checked);
   saveToLocalStorage();
});
const del=cardD.querySelector(".del");
del.addEventListener("click",()=>{
   cardD.remove();  
   saveToLocalStorage();
});
     container.appendChild(cardD);
}
function saveToLocalStorage(){
    const cards=document.querySelectorAll(".card");//selecting all the cards created so far and storing them
    const tasks=[];
    cards.forEach(card=>{
      tasks.push({
         task:    card.querySelector('.t h2').innerText,
            date:    card.querySelector('.date').innerText,
            checked: card.querySelector('input[type="checkbox"]').checked
      });
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}



