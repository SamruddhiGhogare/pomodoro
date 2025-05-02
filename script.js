class PomodoroTimer {
    constructor() {
        this.minutes = 25;
        this.seconds = 0;
        this.isRunning = false;
        this.timer = null;
        this.currentMode = 'pomodoro';
        
        // DOM Elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');

        // Event Listeners
        this.startBtn.addEventListener('click', () => this.startTimer());
        this.pauseBtn.addEventListener('click', () => this.pauseTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.changeMode(btn));
        });
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Initialize
        this.updateDisplay();
    }

    startTimer() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.timer = setInterval(() => {
                if (this.seconds === 0) {
                    if (this.minutes === 0) {
                        this.timerComplete();
                        return;
                    }
                    this.minutes--;
                    this.seconds = 59;
                } else {
                    this.seconds--;
                }
                this.updateDisplay();
            }, 1000);
        }
    }

    pauseTimer() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.timer);
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.setTime(this.currentMode);
        this.updateDisplay();
    }

    changeMode(button) {
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.currentMode = button.textContent.toLowerCase();
        this.setTime(this.currentMode);
        this.updateDisplay();
    }

    setTime(mode) {
        switch(mode) {
            case 'pomodoro':
                this.minutes = 25;
                break;
            case 'short break':
                this.minutes = 5;
                break;
            case 'long break':
                this.minutes = 15;
                break;
        }
        this.seconds = 0;
    }

    updateDisplay() {
        this.minutesDisplay.textContent = this.minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = this.seconds.toString().padStart(2, '0');
    }

    timerComplete() {
        this.pauseTimer();
        this.playNotification();
        // You can add more actions here when timer completes
    }

    playNotification() {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <div class="task-actions">
                    <button class="complete-btn"><i class="fas fa-check"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            li.querySelector('.complete-btn').addEventListener('click', () => {
                li.classList.toggle('completed');
            });
            
            li.querySelector('.delete-btn').addEventListener('click', () => {
                li.remove();
            });
            
            this.taskList.appendChild(li);
            this.taskInput.value = '';
        }
    }
}

// Initialize the Pomodoro Timer
const pomodoro = new PomodoroTimer(); 