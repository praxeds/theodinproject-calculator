const lcdDisplay = document.getElementById('lcdDisplay')
const turnOnBtn = document.getElementById('turnOnBtn')
const calcOutput = document.getElementById('calcOutput')
const clearBtn = document.getElementById('clearBtn')
const calcBtns = document.querySelectorAll('.calcBtn')

const startAudio = new Audio('assets/audio/start.mp3')
const clickSound = new Audio('assets/audio/click.mp3')

let displayNumber1
let displayNumber2
let operatorSymbol
let keyOperator
let result
let resultArr


turnOnBtn.addEventListener('click', function() {
    if (lcdDisplay.classList.contains('noDisplay')) {
        turnOnDisplay()
    } else {
        clearDisplay()
    }
})
clearBtn.addEventListener('click', clearDisplay)
calcOutput.addEventListener('transitionend', removeTransition)

window.addEventListener('keydown', function (e) {
    const key = e.key
    // console.log(key)
    useCalculator(key)
})
for (const button of calcBtns) {
    button.addEventListener('click', function (e) {
        const buttonInput = e.path[0].innerText
        useCalculator(buttonInput)
    })
}


function percentage() {
    if (calcOutput.innerText.length < 5) {
        calcOutput.innerText = Number(calcOutput.innerText) / 100
    }

}

function turnOnDisplay() {
    lcdDisplay.classList.remove('noDisplay')
    startAudio.play()
}

function clearDisplay() {
    if (calcOutput.innerText !== '') {
        displayNumber1 = undefined
        displayNumber2 = undefined
        operatorSymbol = undefined
        calcOutput.innerText = ''
    } else return
}

function removeTransition(e) {
    this.classList.remove('selected')
}

function useCalculator(button) {
    if (lcdDisplay.classList.contains('noDisplay')) return

    switch (button) {
        case ('+'):
        case ('-'):
        case ('*'):
        case ('/'):
        case ('÷'):
            //              ! Getting the user's first number
            if (calcOutput.innerText.length > 0 && displayNumber2 === undefined) {
                displayNumber1 = Number(calcOutput.innerHTML)
                operatorSymbol = button
                // console.log('Number 1: ' + displayNumber1)
                // console.log(operatorSymbol)
                //              ! Getting the user's chosen operator
                keyOperator = document.querySelector(`div[data-key="${button}"]`).classList[1]
                // console.log(keyOperator)
            }
            break
        case ('='):
        case ('Enter'):
            //              ! Calculating the user's numbers
            console.log(displayNumber1, operatorSymbol, displayNumber2)
            getResult()
    }
    if (button == 'Backspace') {
        const calcOutputArr = calcOutput.innerHTML.split('')
        calcOutputArr.pop()
        calcOutput.innerHTML = calcOutputArr.join('')
    }
    else if (calcOutput.innerText.length < 8) {
        if (typeof operatorSymbol == 'string' && displayNumber1 != '') {
            //              ! Getting the user's second number
            if (displayNumber2 !== undefined) {
                switch (true) {
                    case (!isNaN(Number(button))):
                        calcOutput.innerHTML += button
                        displayNumber2 = Number(calcOutput.innerHTML)
                        break
                    case (button == '.'):
                        if (calcOutput.innerText.includes('.') == false && calcOutput.innerText.length > 0) {
                            calcOutput.innerHTML += button
                        }
                        break
                    case (button == '+'):
                    case (button == '-'):
                    case (button == '*'):
                    case (button == '/'):
                    case (button == '÷'):
                        // console.log(displayNumber1 + operatorSymbol + displayNumber2)
                        console.log(displayNumber1, operatorSymbol, displayNumber2)
                        getResult()
                        keyOperator = document.querySelector(`div[data-key="${button}"]`).classList[1]

                }
            }
            else if (calcOutput.innerText !== '') {
                switch (true) {
                    case (!isNaN(Number(button))):
                        calcOutput.innerHTML = button
                        displayNumber2 = Number(calcOutput.innerHTML)
                        // console.log('Number 2: ' + displayNumber2)
                        break
                    case (button == '%'):
                        percentage()
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

function getResult () {
    if (keyOperator === 'divide' && displayNumber2 == 0) {
        calcOutput.innerHTML = 'nope'
    }
    else if (displayNumber1 != undefined && displayNumber2 != undefined) {
        switch (keyOperator) {
            case ('add'):
                result = displayNumber1 + displayNumber2
                break
            case ('substract'):
                result = displayNumber1 - displayNumber2
                break
            case ('multiply'):
                result = displayNumber1 * displayNumber2
                break
            case ('divide'):
                result = displayNumber1 / displayNumber2
                break
        }
        // console.log(displayNumber1, operatorSymbol, displayNumber2)
        // console.log(result)
        resultArr = String(result).split('')
        if (resultArr.length > 8) {
            calcOutput.innerHTML = resultArr.slice(0, 5).join('')
        } else {
            calcOutput.innerHTML = result
        }
        
        displayNumber1 = result
        displayNumber2 = undefined
        keyOperator = undefined
        
    }
}