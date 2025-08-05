function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function multi(a, b) {
  return a * b;
}

function divid(a, b) {
  return a / b;
}

function operator(num1, operatorSymbol, num2) {
  switch (operatorSymbol) {
    case '+':
      return add(num1, num2);
    case '-':
      return sub(num1, num2);
    case '*':
      return multi(num1, num2);
    case '/':
      if (num2 === 0) {
        return "error";
      }
      return divid(num1, num2);
    default:
      return "Invalid operator";
  }
}
const theDisplay = document.querySelector(".display");

const buttons = document.querySelectorAll(".numbers button");

const operators = document.querySelectorAll(".operators button");

const equal = document.querySelector(".isequal");

const clear = document.querySelector(".clear");


let num1 = "";
let num2 = "";
let actualNum1;
let actualNum2;
let theOperator;
let result;

buttons.forEach(button => {
    button.addEventListener("click", () => {
   if (result && theOperator) {
      theDisplay.textContent += button.textContent;
      num2 += button.textContent;
      actualNum2 = parseFloat(num2);
       
    } else if (result) {
      theDisplay.textContent = button.textContent;
      num1 = button.textContent;
      actualNum1 = parseFloat(num1);
      result = undefined;

    } else if (theOperator) {
      theDisplay.textContent += button.textContent;
      num2 += button.textContent;
      actualNum2 = parseFloat(num2);

    } else {
      theDisplay.textContent += button.textContent;
      num1 += button.textContent;
      actualNum1 = parseFloat(num1);
}

    });
});

operators.forEach(button => {
    button.addEventListener("click", () => {
      if (num1 && num2) {
        let result1 = operator(actualNum1, theOperator, actualNum2);
        actualNum1 = result1;
        actualNum2 = 0;
        num2 = "";
        theDisplay.textContent = button.textContent;
      }
        if (!theDisplay.textContent || theOperator) {
            return;
        } else {
            theDisplay.textContent += button.textContent;
            theOperator = button.textContent;
        }
    });
});

equal.addEventListener("click", () => {
    if (actualNum1 !== undefined && actualNum2 !== undefined && theOperator) {
        result = operator(actualNum1, theOperator, actualNum2);
        theDisplay.textContent = result;
        num1 = theDisplay.textContent;
        num2 = "";
        actualNum1 = result;
        actualNum2 = undefined;
        theOperator = undefined;
    }
});

clear.addEventListener("click", () => {
    theDisplay.textContent = "";
    num1 = "";
    num2 = "";
    theOperator = undefined;
});



