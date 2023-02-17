"use strict";

let isEquals = false;
let isTempChanged = false;
let tempNum = "0";
let num1 = null;
let num2 = null;
let currentOperator = null;
let areBtnsDisabled = false;

const resultDiv = document.querySelector(".result");
const equationDiv = document.querySelector(".equation");

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);

function processInput(e) {
	const button = e.target.closest("button");
	const buttonType = button.classList.value;

	if (areBtnsDisabled) {
		clearAll();
		disableButtons(false);
	}

	switch (buttonType) {
		case "number":
			updateNumber(button.innerText);
			break;
		case "operator":
			processOperator(button.innerText);
			break;
		case "negative":
			toggleNegative();
			break;
		case "equals":
			equals();
			break;
		case "clear":
			clear();
			break;
		case "clear-all":
			clearAll();
			break;
		case "delete":
			deleteDigit();
			break;
		case "modifier":
			modifyNum(button.id);
			break;
		case "decimal":
			decimal();
			break;
		default:
			alert("You pressed something unexpected...");
	}

	if (num2 === 0 && currentOperator === "÷" && isEquals) {
		populateResultDiv("We don't do that here.");
		disableButtons(true);
	} else if (!Number.isFinite(+tempNum)) {
		populateResultDiv("Ok, that's enough.");
		disableButtons(true);
	}
}

function populateResultDiv(number) {
	resultDiv.textContent = number;
}

function populateEquationDiv(currentEquation) {
	equationDiv.textContent = currentEquation;
}

function updateNumber(newNumber) {
	if (isEquals) clearAll();

	if (isTempChanged) {
		if (tempNum === "0") {
			tempNum = newNumber;
		} else {
			tempNum = tempNum.concat(newNumber);
		}
	} else {
		tempNum = newNumber;
	}

	isTempChanged = true;

	populateResultDiv(tempNum);
}

function decimal() {
	if (isEquals) clearAll();

	if (isTempChanged) {
		tempNum = tempNum.indexOf(".") === -1 ? tempNum.concat(".") : tempNum;
	} else {
		tempNum = "0.";
	}

	isTempChanged = true;

	populateResultDiv(tempNum);
}

function toggleNegative() {
	if (tempNum !== "0") {
		tempNum = tempNum.indexOf("-") === -1 ? `-${tempNum}` : tempNum.slice(1);
		populateResultDiv(tempNum);
	}
}

function processOperator(newOperator) {
	if (!currentOperator) {
		num1 = +tempNum;
	} else if (isTempChanged) {
		num2 = +tempNum;
		num1 = operate(currentOperator, num1, num2);
	} else if (isEquals) {
		num1 = operate(currentOperator, num1, num2);
		num2 = +tempNum;
	}

	currentOperator = newOperator;
	isTempChanged = false;
	isEquals = false;

	populateEquationDiv(`${num1} ${currentOperator}`);
}

function equals() {
	if (isEquals) {
		num1 = +tempNum;
	} else {
		isEquals = true;
		num2 = +tempNum;
	}

	let equation = `${+tempNum} =`;

	if (currentOperator) {
		tempNum = operate(currentOperator, num1, num2).toString();
		equation = `${num1} ${currentOperator} ${num2} =`;
	}

	isTempChanged = false;

	populateResultDiv(tempNum);
	populateEquationDiv(equation);
}

function clear() {
	if (isEquals) {
		clearAll();
	} else {
		isTempChanged = false;
		tempNum = "0";
		populateResultDiv(tempNum);
	}
}

function clearAll() {
	isEquals = false;
	isTempChanged = false;
	tempNum = "0";
	num1 = null;
	num2 = null;
	currentOperator = null;
	populateEquationDiv("");
	populateResultDiv(tempNum);
}

function deleteDigit() {
	if (isTempChanged) {
		if (tempNum.length === 1) {
			tempNum = "0";
		} else {
			tempNum = tempNum.substring(0, tempNum.length - 1);
		}
	}
}

function modifyNum(modifier) {
	let modEquation = "";

	if (modifier === "percent") {
		tempNum = percent(tempNum).toString();
		modEquation = tempNum;
	} else if (modifier === "sqrt") {
		modEquation = `√(${tempNum})`;
		tempNum = squareRoot(tempNum).toString();
	} else if (modifier === "reciprocal") {
		modEquation = `1/(${tempNum})`;
		tempNum = reciprocal(tempNum).toString();
	} else {
		modEquation = `sqr(${tempNum})`;
		tempNum = squared(tempNum).toString();
	}

	isTempChanged = false;

	populateResultDiv(tempNum);
	populateEquationDiv(
		currentOperator ? `${num1} ${currentOperator} ${modEquation}` : modEquation
	);
}

function reciprocal(number) {
	return divide(1, number);
}

function squared(number) {
	return multiply(number, number);
}

function squareRoot(number) {
	return number ** divide(1, 2);
}

function percent(number) {
	//https://github.com/microsoft/calculator/issues/655#issuecomment-527471016
	if (currentOperator === "+" || currentOperator === "-") {
		return (num1 * number) / 100;
	} else if (currentOperator === "x" || currentOperator === "÷") {
		return number / 100;
	} else {
		return 0;
	}
}

function disableButtons(shouldDisable) {
	let btnsToDisable = ["operator", "modifier", "decimal", "negative"];

	btnsToDisable.forEach((btnClass) => {
		const buttons = document.querySelectorAll(`.${btnClass}`);

		for (let i = 0; i < buttons.length; i++) {
			if (shouldDisable) {
				buttons[i].setAttribute("disabled", "");
			} else {
				buttons[i].removeAttribute("disabled");
			}
		}
	});

	areBtnsDisabled = shouldDisable;
}

function operate(operator, a, b) {
	if (operator === "+") return add(a, b);
	if (operator === "-") return subtract(a, b);
	if (operator === "x") return multiply(a, b);
	if (operator === "÷") return divide(a, b);
	return "ERROR";
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}
