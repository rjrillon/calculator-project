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
    default:
      return NaN; //for unexpected results.
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
  if (y === 0) {
    return "lmao";
  }
  return x / y;
}

function handleInput(label) {
  if (!isNaN(label)) {
    // If operator was pressed, update display with new result
    if (operator !== null && display.value === num1.toString()) {
      display.value = label;
    } else {
      display.value += label;
    }
  } else if (label === "AC" || label === "Backspace") {
    display.value = "";
    operator = null;
    num1 = null;
    num2 = null;
  } else if (label === "=") {
    if (num1 !== null && operator !== null) {
      num2 = parseFloat(display.value);
      const result = operate(num1, operator, num2);
      display.value = result;

      if (result === "lmao") {
        num1 = null;
        num2 = null;
        operator = null;
      } else {
        num1 = result; // new num1 and reset operator, num2
        operator = null;
        num2 = null;
      }
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
    // Handle operator buttons (+, -, x, /)
    // If no previous number is stored, save the current display value as num1
    if (num1 === null) {
      num1 = parseFloat(display.value);
      // If an operator is already set, calculate the result of the previous operation
    } else if (operator !== null) {
      num2 = parseFloat(display.value);
      const result = operate(num1, operator, num2);
      display.value = result;
      num1 = result; // Store the result for further calculations
    }
    // Save next new operator for next calculation
    operator = label;
  }
}

let num1 = null;
let num2 = null;
let operator = null;
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

  // Add classes for unique styling
  if (label === "0") {
    btn.classList.add("zero-btn");
  }
  if (["AC", "+/-", "%"].includes(label)) {
    btn.classList.add("gray-btn");
  } else if (["/", "x", "-", "+", "="].includes(label)) {
    btn.classList.add("orange-btn");
  }

  btn.addEventListener("click", () => {
    handleInput(label);
  });
  buttons.appendChild(btn);
});

// Add event listener for keyboard input
document.addEventListener("keydown", event => {
  const key = event.key;

  // Check if the key is a number
  if (!isNaN(key) || key === "Backspace") {
    handleInput(key);
  }
});
