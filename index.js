function operate(x, op, y) {
  switch (op) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "x":
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

let operator1 = null;
let operator2 = null;
let operand = null;
// When DOM is loaded...
document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#display");
  const buttons = document.querySelector("#buttons");

  const buttonLabels = [
    "AC",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  buttonLabels.forEach(label => {
    const btn = document.createElement("button");
    btn.textContent = label;

    if (label === "0") {
      btn.classList.add("zero-btn");
    }

    if (["AC", "+/-", "%"].includes(label)) {
      btn.classList.add("gray-btn");
    } else if (["/", "x", "-", "+", "="].includes(label)) {
      btn.classList.add("orange-btn");
    }

    btn.addEventListener("click", () => {
      if (!isNaN(label)) {
        display.value += label;
      } else if (label === "AC") {
        display.value = "";
        operand = null;
        operator1 = null;
        operator2 = null;
      } else if (label === "=") {
        if (operator1 !== null && operand !== null) {
          operator2 = parseFloat(display.value);
          const result = operate(operator1, operand, operator2);
          display.value = result;
          operator1 = result;
          operand = null;
        }
      } else if (label === "+/-") {
        if (display.value !== "") {
          display.value = (parseFloat(display.value) * -1).toString();
        }
      } else if (label === "%") {
        if (display.value !== "") {
          display.value = (parseFloat(display.value) / 100).toString();
        }
      } else if (label === ".") {
        if (!display.value.includes(".")) {
          display.value += ".";
        }
      } else {
        if (display.value !== "") {
          // Value in display becomes operator1
          operator1 = parseFloat(display.value);
          // When operand is clicked (+,-,*,/)
          operand = label;
          // Clear display for next operator2
          display.value = "";
        }
      }
    });
    buttons.appendChild(btn);
  });
});
