const lcdDisplay = document.getElementById('lcdDisplay')
const turnOnBtn = document.getElementById('turnOnBtn')
const calcOutput = document.getElementById('calcOutput')
const clearBtn = document.getElementById('clearBtn')
const calcBtns = document.querySelectorAll('.calcBtn')

const startAudio = new Audio('assets/audio/start.mp3')
const clickSound = new Audio('assets/audio/click.mp3')




window.addEventListener('keydown', keyboardInput)
turnOnBtn.addEventListener('click', turnOnDisplay)
clearBtn.addEventListener('click', clearDisplay)
calcOutput.addEventListener('transitionend', removeTransition)


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
function percentage() {
    if (calcOutput.innerText.length < 5) {
        calcOutput.innerText = Number(calcOutput.innerText) / 100
    }

}

function operate(operator, a, b) {
    return operator(a, b)
}


function turnOnDisplay() {
    if (lcdDisplay.classList.contains('noDisplay') == true) {
        lcdDisplay.classList.remove('noDisplay')
        startAudio.play()
    } else {
        return
    }
}

function clearDisplay() {
    if (calcOutput.innerText !== '') {
        calcOutput.innerText = ''
    } else {
        return
    }
}

function keyboardInput(key) {
    if (lcdDisplay.classList.contains('noDisplay')) return

    if (key.key == 'Backspace') {
        const calcOutputArr = calcOutput.innerHTML.split('')
        calcOutputArr.pop()
        calcOutput.innerHTML = calcOutputArr.join('')
    }

    if (calcOutput.innerText.length < 8) {
        // if (key.key == '/' || key.key == '*' || key.key == '-' || key.key == '+' || key.key == '=' || key.key == 'Enter') {
        // }

        switch (true) {
            case (key.key == ' '):
                return
            case (!isNaN(Number(key.key))):
                calcOutput.innerHTML += key.key
                break
            case (key.key == '.'):
                if (calcOutput.innerText.includes('.') == false && calcOutput.innerText.length > 0) {
                    calcOutput.innerHTML += key.key
                }
                break
            case (key.key == '%'):
                percentage()

        }
    }
    calcOutput.classList.add('selected')
    clickSound.play()
    clickSound.currentTime = 0
}

function removeTransition(e) {
    this.classList.remove('selected')
}

for (const button of calcBtns) {
    button.addEventListener('click', function (e) {
        const buttonInput = e.path[0].innerText
        console.log(buttonInput)

        if (lcdDisplay.classList.contains('noDisplay')) return

        if (buttonInput == 'Backspace') {
            const calcOutputArr = calcOutput.innerHTML.split('')
            calcOutputArr.pop()
            calcOutput.innerHTML = calcOutputArr.join('')
        }

        if (calcOutput.innerText.length < 8) {
            switch (true) {
                case (buttonInput == ' '):
                    return
                case (!isNaN(Number(buttonInput))):
                    calcOutput.innerHTML += buttonInput
                    break
                case (buttonInput == '.'):
                    if (calcOutput.innerText.includes('.') == false && calcOutput.innerText.length > 0) {
                        calcOutput.innerHTML += buttonInput
                    }
                    break
                case (buttonInput == '%'):
                    percentage()

            }
        }
        calcOutput.classList.add('selected')
        clickSound.play()
        clickSound.currentTime = 0
    })
}