const lcdDisplay = document.getElementById('lcdDisplay')
const turnOnBtn = document.getElementById('turnOnBtn')
const calcOutput = document.getElementById('calcOutput')
const clearBtn = document.getElementById('clearBtn')
const calcBtns = document.querySelectorAll('.calcBtn')

const startAudio = new Audio('assets/audio/start.mp3')
const clickSound = new Audio('assets/audio/click.mp3')

let displayNumber1
let displayNumber2
let operator



turnOnBtn.addEventListener('click', turnOnDisplay)
clearBtn.addEventListener('click', clearDisplay)
calcOutput.addEventListener('transitionend', removeTransition)

window.addEventListener('keydown', function (e) {
    const key = e.key
    useCalculator(key)
})
for (const button of calcBtns) {
    button.addEventListener('click', function (e) {
        const buttonInput = e.path[0].innerText
        useCalculator(buttonInput)
    })
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

function removeTransition(e) {
    this.classList.remove('selected')
}

function useCalculator(button) {
    // console.log(button)
    if (lcdDisplay.classList.contains('noDisplay')) return

    switch (true) {
        case (button == '+'):
        case (button == '-'):
        case (button == '*'):
        case (button == '/'):
        case (button == '÷'):
            if (calcOutput.innerText.length > 0) {
                displayNumber1 = calcOutput.innerHTML
                operator = button
                console.log('Number 1: ' + displayNumber1)
                console.log(operator)
            }
    }

    if (button == 'Backspace') {
        const calcOutputArr = calcOutput.innerHTML.split('')
        calcOutputArr.pop()
        calcOutput.innerHTML = calcOutputArr.join('')
    }
    else if (calcOutput.innerText.length < 8) {
        if (typeof operator == 'string' && displayNumber1 != '') {
            if (displayNumber2 !== undefined) {
                switch (true) {
                    case (!isNaN(Number(button))):
                        calcOutput.innerHTML += button
                        break
                    case (button == '.'):
                        if (calcOutput.innerText.includes('.') == false && calcOutput.innerText.length > 0) {
                            calcOutput.innerHTML += button
                        }
                        break
                }
                displayNumber2 = calcOutput.innerHTML
                console.log('Number 2: ' + displayNumber2)
            }
            else if (calcOutput.innerText !== '') {
                switch (true) {
                    case (!isNaN(Number(button))):
                        calcOutput.innerHTML = ''
                        calcOutput.innerHTML += button
                        displayNumber2 = calcOutput.innerHTML
                        console.log('Number 2: ' + displayNumber2)
                        break
                }
            }
        } else {
            switch (true) {
                case (button == ' '):
                    return
                case (!isNaN(Number(button))):
                    calcOutput.innerHTML += button
                    break
                case (button == '.'):
                    if (calcOutput.innerText.includes('.') == false && calcOutput.innerText.length > 0) {
                        calcOutput.innerHTML += button
                    }
                    break
                case (button == '%'):
                    percentage()
            }
        }


    }
    calcOutput.classList.add('selected')
    clickSound.play()
    clickSound.currentTime = 0
}