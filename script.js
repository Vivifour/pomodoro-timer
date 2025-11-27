
let pomodoroDuration=1500;
let breakDuration=300;
let pomodoroRemaining=pomodoroDuration;
let breakRemaining=breakDuration;
let timer=null;
let isRunning=false;
let isBreak=false;

function updateTime(){
    let seconds=isBreak?breakRemaining:pomodoroRemaining;
    let m=Math.floor(seconds/60);
    let s=seconds%60;
    document.getElementById("timeDisplay").innerText=
        `${m<10?"0":""}${m}:${s<10?"0":""}${s}`;

    if(isBreak) breakRemaining--;
    else pomodoroRemaining--;

    if(seconds<=0){
        isBreak=!isBreak;
        pomodoroRemaining=pomodoroDuration;
        breakRemaining=breakDuration;
    }
}

function updateProgress(){
    const total=isBreak?breakDuration:pomodoroDuration;
    const remaining=isBreak?breakRemaining:pomodoroRemaining;
    const percent=((total-remaining)/total)*100;
    document.getElementById("progress-bar").style.width=percent+"%";
}

function startPause(){
    if(isRunning){
        clearInterval(timer);isRunning=false;return;
    }
    isRunning=true;
    timer=setInterval(()=>{updateTime();updateProgress();},1000);
}

function resetTimer(){
    clearInterval(timer);isRunning=false;
    pomodoroRemaining=pomodoroDuration;
    breakRemaining=breakDuration;
    updateTime();updateProgress();
}
updateTime();updateProgress();

function addTask(){
    let input=document.getElementById("taskInput");
    if(input.value.trim()==="")return;
    let li=document.createElement("li");
    li.innerHTML=`<span>${input.value}</span><button onclick="finishTask(this)">✔</button>`;
    document.getElementById("taskList").appendChild(li);
    input.value="";
}
function finishTask(btn){
    let item=btn.parentElement;
    item.classList.toggle("task-done");
}
