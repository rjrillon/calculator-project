let operator1, operator2, operand;

function operate(x, op, y) {
  switch (op) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  if (x === 0 || y === 0) {
    throw new Error("error cant divide by 0");
  }
  return x / y;
}

// When DOM is loaded...
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");
  const calculator = document.querySelector("#calculator");
  const display = document.querySelector("#display");
  const buttons = document.querySelector("#buttons");

  const buttonLabels = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  buttonLabels.forEach(label => {
    const btn = document.createElement("button");
    btn.textContent = label;
    buttons.appendChild(btn);
  });

  //   calculator.appendChild(display);
  //   calculator.appendChild(buttonsContainer);
  //   container.appendChild(calculator);
});
