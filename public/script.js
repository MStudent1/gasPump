let chosenGasBool = false; 
let chosenGasNumber;
let chosenGasPrice = 0;
let paymentMethod = 'none';
let paymentMethodBool = false;
let inputField = document.getElementById('interface');
let decimalField = document.getElementById('decimal');
let currentInputNumber = '';
let cashAmount = 0;
let gasTankSize = 10;
let amountOfGas;
let gallonsPumped = 0;
let intervalId;
let decIntervalId;
let cents = 0;
let count = 0;

function changeColor(input, price)
{
    let element=document.getElementById(input);
    if(!chosenGasBool)
    {
        element.style.backgroundColor = "red";
        chosenGasBool = true;
        chosenGasNumber = input;
        chosenGasPrice = price;
        console.log(chosenGasNumber, " ", price);
    }
}
function reset()
{
    chosenGasBool = false;
    chosenGasPrice = 0;
    paymentMethod = 'none';
    paymentMethodBool = false;
    currentInputNumber = '';
    cashAmount = 0;
    gasTankSize = 0;
    if(chosenGasNumber)
    {
        let element=document.getElementById(chosenGasNumber);
        element.style.backgroundColor = "white";
    }
    chosenGasNumber = '';
    paymentMethod = 'none';
    inputField.innerHTML = 'Enter 1 for credit or 2 for cash';
}
function paymentMethodFunction(input)
{
    let message;
    let inputValue;
    if(input === 'credit')
    {
        message = "input credit card number and press ENTER";
        inputValue = '1';
    }
    else
    {
        message = "input cash amount and press ENTER";
        inputValue = '2';
    }
    if(paymentMethod === 'none')
    {
        paymentMethod = input;
        inputField.innerHTML = message;
    }
    else
    {
        addToInput(inputValue);
    }
}

function addToInput(input) 
{
    currentInputNumber += input;
    inputField.innerHTML = currentInputNumber;
}

function deleteEntry() {
    document.getElementById('screen').innerHTML = 'SCREEN';
}

function compute()
{
    if(!paymentMethodBool)
    {
        if(paymentMethod === 'credit')
        {   
            if(currentInputNumber.length > 16 || currentInputNumber.length < 16)
            {
                inputField.innerHTML = 'Invalid credit card info';
            }
            else
            {
                inputField.innerHTML = 'Enter size of gas tank and press ENTER';
            }
        }
        else if(paymentMethod === 'cash')
        {
            cashAmount = currentInputNumber;
        }
        paymentMethodBool = true;
        currentInputNumber = '';
        return;
    }
    else if(!gasTankSize && paymentMethod != 'cash')
    {
        gasTankSize = currentInputNumber;
        if(!chosenGasNumber)
        {
            inputField.innerHTML = 'Select Gas type and press ENTER';
            return;
        }
    }
    else if(!chosenGasNumber)
    {
        inputField.innerHTML = 'Choose gas type and press ENTER';
        return;
    }
    if(paymentMethod === 'cash')
    {
        amountOfGas = cashAmount / chosenGasPrice;
        inputField.innerHTML = Math.round(amountOfGas * 100)/100 +' gallons purchased';
    }
    else if(paymentMethod === 'credit')
    {
        amountOfGas = gasTankSize * chosenGasPrice;
        inputField.innerHTML = Math.round(amountOfGas * 100)/100 + ' dollars of gas purchase';
    }
}

function showGallons() {
   intervalId =  setInterval(incrementGallons, 5000);
}

function incrementGallons() {
    if (gallonsPumped <= gasTankSize) {
        decIntervalId = setInterval(incrementDecimal, 500);
        if (count == gasTankSize){
            clearInterval(decIntervalId);
            decimalField = ".0";
        }
        inputField.innerHTML = `Gallons: ${gallonsPumped}`;
        gallonsPumped += 1;
    } else {
        clearInterval(intervalId);
        inputField.innerHTML = 'Thank you! Would you like a reciept?';
    }
}

function incrementDecimal() {
     if (cents < 10) {
        decimalField.innerHTML = `.${cents}`;
        cents += 1;
    } else {
        count += 1;
        cents = 0;
    }
}