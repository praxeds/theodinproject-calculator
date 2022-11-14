const lcdDisplay = document.getElementById('lcdDisplay')
const turnOnBtn = document.getElementById('turnOnBtn')
const calcOutput = document.getElementById('calcOutput')
const clearBtn = document.getElementById('clearBtn')

const startAudio = new Audio('assets/audio/start.mp3')
const clickSound = new Audio('assets/audio/click.mp3')



turnOnBtn.addEventListener('click', function(e) {
    if (lcdDisplay.classList.contains('noDisplay') == true) {
        lcdDisplay.classList.remove('noDisplay')
        startAudio.play()
    } else {
        return
    }
} )


clearBtn.addEventListener('click', function(e) {
    clearDisplay()
} )
function clearDisplay() {
    if (calcOutput.innerText !== '') {
        calcOutput.innerText = ''
    } else {
        return
    }
}