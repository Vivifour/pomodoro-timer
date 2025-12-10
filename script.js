let focusDuration = 25 * 60;
let breakDuration = 5 * 60;

let duration = focusDuration;
let timer = null;
let running = false;
let isBreak = false;
let pomodoroCount = 0;

// Definisi dan Pengaturan Audio
const sound = new Audio("sound break.mp3");
sound.volume = 0.6; // Mengatur volume menjadi 60%

function updateDisplay(){
    let m = Math.floor(duration / 60);
    let s = duration % 60;
    document.getElementById("display").innerText = `${m}:${s<10?"0"+s:s}`;
}

// === PROGRESS BAR ===
function updateProgress() {
    let totalDuration = isBreak ? breakDuration : focusDuration;
    let elapsed = totalDuration - duration;
    let percentage = (elapsed / totalDuration) * 100;

    document.getElementById("progress-bar").style.width = `${Math.min(percentage, 100)}%`;
}

// === TIMER & KONTROL ===
function startTimer() {
    if (running) return;
    running = true;

    timer = setInterval(() => {
        duration--;
        updateDisplay();
        updateProgress(); // Update progress bar setiap detik

        if (duration <= 0) {
            clearInterval(timer);
            running = false;
            
            sound.play(); // Memainkan bunyi saat waktu habis

            if (!isBreak) {
                pomodoroCount++;
                document.getElementById("count").innerText = pomodoroCount;
                saveStats(1);
                alert("Fokus selesai! Saatnya istirahat 🧘");
                duration = breakDuration;
                isBreak = true;
                startTimer();
            } else {
                alert("Sesi istirahat selesai! Ayo fokus lagi 💪");
                duration = focusDuration;
                isBreak = false;
                startTimer();
            }
        }
    }, 1000);
}

function pauseTimer(){ 
    clearInterval(timer); 
    running = false; 
}

function resetTimer(){
    pauseTimer();
    duration = focusDuration;
    isBreak = false;
    updateDisplay();
    updateProgress(); // Reset progress bar
}

function applySetting(){
    focusDuration = document.getElementById("focusInput").value * 60;
    breakDuration = document.getElementById("breakInput").value * 60;
    resetTimer();
}


// === DARK MODE ===
function toggleMode(){ 
    document.body.classList.toggle("dark"); 
}
// === TO-DO LIST ===
function addTask() {
    let input = document.getElementById("taskInput");
    if(input.value.trim() === "") return;

    let li = document.createElement("li");
    li.innerHTML = `
        <span>${input.value}</span>
        <button onclick="finishTask(this)">✔</button>
    `;
    document.getElementById("taskList").appendChild(li);
    input.value="";
}

function finishTask(button){
    let item = button.parentElement;
    item.classList.toggle("task-done");
}

// === STATISTIK ===
function loadStats(){ 
    return JSON.parse(localStorage.getItem("pomodoroStats")) || {}; 
}

function saveStats(count){
    let data = loadStats();
    let today = new Date().toISOString().split("T")[0];
    data[today] = (data[today]||0) + count;
    localStorage.setItem("pomodoroStats", JSON.stringify(data));
    drawChart();
}

function resetData(){
    localStorage.removeItem("pomodoroStats");
    drawChart();
    alert("Statistik berhasil direset!");
}

function drawChart(){
    let data = loadStats();
    let dates = Object.keys(data).slice(-7);
    let values = dates.map(d=>data[d]);

    const ctx=document.getElementById('chart').getContext('2d');
    if(window.myChart) window.myChart.destroy();

    window.myChart= new Chart(ctx,{
        type:'bar',
        data:{
            labels:dates,
            datasets:[{label:'Pomodoro',data:values}]
        },
        options: {
            // Pengaturan opsional untuk tampilan yang lebih baik
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
const sound = document.getElementById("alarmSound");

function startTimer() {
    if (running) return;
    running = true;

        sound.load(sound break.mp3);

    timer = setInterval(() => {
        duration--;
        updateDisplay();
        updateProgress();

        if (duration <= 0) {
            clearInterval(timer);
            running = false;

            sound.play(sound break.mp3);  I

            if (!isBreak) {
                pomodoroCount++;
                document.getElementById("count").innerText = pomodoroCount;
                saveStats(1);
                alert("Fokus selesai! Saatnya istirahat");
                duration = breakDuration;
                isBreak = true;
                startTimer();
            } else {
                alert("Istirahat selesai!");
                duration = focusDuration;
                isBreak = false;
                startTimer();
            }
        }
    }, 1000);




// Inisialisasi Saat Pemuatan Halaman
updateDisplay();
updateProgress();
drawChart();
