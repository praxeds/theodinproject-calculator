const lcdDisplay = document.getElementById('lcdDisplay')
const turnOnBtn = document.getElementById('turnOnBtn')
const calcOutput = document.getElementById('calcOutput')
const clearBtn = document.getElementById('clearBtn')

const startAudio = new Audio('assets/audio/start.mp3')
const clickSound = new Audio('assets/audio/click.mp3')


turnOnBtn.addEventListener('click', function (e) {
    if (lcdDisplay.classList.contains('noDisplay') == true) {
        lcdDisplay.classList.remove('noDisplay')
        startAudio.play()
    } else {
        return
    }
})


clearBtn.addEventListener('click', function (e) {
    clearDisplay()
})
function clearDisplay() {
    if (calcOutput.innerText !== '') {
        calcOutput.innerText = ''
    } else {
        return
    }
}


function add(a, b) {
    return a + b
}
function substract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    return operator(a, b)
}

document.addEventListener('keydown', (key) => {
    if (lcdDisplay.classList.contains('noDisplay') == false) {
        if (key.key == 'Backspace') {
            const calcOutputArr = calcOutput.innerHTML.split('')
            calcOutputArr.pop()
            calcOutput.innerHTML = calcOutputArr.join('')
        }
    }
    if (calcOutput.innerText.length < 8) {
        if (key.key == ' ') { return }
        // if (!isNaN(Number(key.key)) || key.key == '/' || key.key == '*' || key.key == '-' || key.key == '+' || key.key == '.' || key.key == '=' || key.key == 'Enter' || key.key == 'Backspace') {
        // console.log(key.key)
        // }
        if (!isNaN(Number(key.key))) {
            calcOutput.innerHTML += key.key
        }
        if (key.key == '.') {
            if (calcOutput.innerText.includes('.') == false && calcOutput.innerText.length > 0) {
                calcOutput.innerHTML += key.key
            }
        }
    }
})