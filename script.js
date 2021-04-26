const calculator = document.querySelector('#calculator');
const keys = calculator.querySelector('#calculatorKeys');
const disp = calculator.querySelector('#calculatorDisplay');


const calculation = (num1, operator, num2) => {
    if (operator === 'plus') return parseFloat(num1) + parseFloat(num2);
    if (operator === 'minus') return parseFloat(num1) - parseFloat(num2);
    if (operator === 'multiply') return parseFloat(num1) * parseFloat(num2);
    if (operator === 'divide') return parseFloat(num1) / parseFloat(num2);
}

keys.addEventListener('click', (e) => {

    const key = e.target;
    const keyContent = key.textContent;
    const { type } = key.dataset;
    const { action } = key.dataset;
    const { previousKeyType } = calculator.dataset;
    const displayedNum = disp.textContent;
    const { signValue } = calculator.dataset;

    if (type === 'number') {

        calculator.dataset.signValue = 'positive';

        if (displayedNum === '0') {

            if (action === 'decimal') {
                disp.textContent = '0.'
            } else {
                disp.innerText = keyContent;
            }

        } else if (previousKeyType === 'operator') {

            if (action === 'decimal') {
                disp.textContent = '0.'
            } else {
                disp.innerText = keyContent;
            }

        } else if (action === 'decimal') {

            if (!displayedNum.includes('.')) {
                disp.textContent = disp.textContent + '.';
            }

        } else if (previousKeyType === 'equal') {

            disp.innerText = keyContent;

        } else if (action === 'signChange') {

            if (signValue === 'positive') {
                calculator.dataset.signValue = 'negative';
                disp.textContent = '-' + disp.textContent;
            } else if (signValue === 'negative') {
                disp.textContent = disp.textContent.substring(1);
            }


        } else {

            disp.innerText = disp.textContent + keyContent;
        }

    } else if (type === 'operator') {

        if (
            action === 'plus' || action === 'minus' || action === 'multiply' || action === 'divide'
        ) {

            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.action = action;

        } else if (action === 'ce') {
            disp.textContent = '0';
        } else if (action === 'clear') {
            disp.textContent = '0';
            calculator.dataset.firstValue = '0';
        }
        // else if (action === 'backsace') {

        //     if (disp.textContent.length > 1) {
        //         disp.textContent = disp.textContent.slice(0, -1);
        //     } else {
        //         disp.textContent = '0';
        //     }
        // } 
        else if (previousKeyType === 'number') {
            const firstValue = calculator.dataset.firstValue;
            const secondValue = disp.textContent;
            const action = calculator.dataset.action;

            console.log(firstValue)
            console.log(secondValue)
            console.log(action)

            // if (firstValue && secondValue && (action === 'plus' || action === 'minus' || action === 'multiply' || action === 'divide')) {
            //     const calcValue = calculation(firstValue, action, secondValue)
            //     disp.textContent = calcValue

            //     calculator.dataset.firstValue = calcValue
            // } else {

            //     calculator.dataset.firstValue = displayedNum
            // }
        }


    } else if (type === 'equal') {

        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.action;
        const secondValue = displayedNum;

        disp.innerText = calculation(firstValue, operator, secondValue);

    }

    calculator.dataset.previousKeyType = type;

});