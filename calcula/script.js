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
      return divid(num1, num2);
    default:
      return "Invalid operator";
  }
}
const theDisplay = document.querySelector(".display");

const buttons = document.querySelectorAll(".numbers button");

const operators = document.querySelector(".operators button");

const equal = document.querySelector(".equal");


let num1;
let num2;


 buttons.forEach(button => {
    button.addEventListener("click", () => {
     
      theDisplay.textContent += button.textContent;
      if(theDisplay.textContent.includes('+') || 
         theDisplay.textContent.includes('-') ||
         theDisplay.textContent.includes('x') ||
         theDisplay.textContent.includes('/')) {
           num2 += button.textContent;
         }
          
      num1 += button.textContent;
    });
  });


equal.addEventListener("click", operator())


