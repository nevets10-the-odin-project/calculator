"use strict";

let isEquals = false;
let isTempChanged = false;
let tempNum = 0;
let num1 = null;
let num2 = null;
let currentOperator = null;

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);

const resultDiv = document.querySelector(".result");
const equationDiv = document.querySelector(".equation");

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

function operate(operator, a, b) {
	if (operator === "+") return add(a, b);
	if (operator === "-") return subtract(a, b);
	if (operator === "x") return multiply(a, b);
	if (operator === "÷") return divide(a, b);
	return "ERROR";
}

function updateNumber(newNumber) {
	if (isNum1) {
		num1 = num1 === 0 ? newNumber : +`${num1}${newNumber}`;
	} else {
		num2 = num2 === 0 ? newNumber : +`${num2}${newNumber}`;
	}
}

function populateResultDiv(number) {
	resultDiv.textContent = number;
}

function populateEquationDiv(currentEquation) {
	equationDiv.textContent = currentEquation;
}

function processInput(e) {
	const button = e.target.closest("button");

	if (button.classList.value === "number") {
		const newNumber = +button.innerText;

		if (!isTempChanged) {
			tempNum = newNumber;
		} else {
			tempNum = +`${tempNum}${newNumber}`;
		}

		isTempChanged = true;

		populateResultDiv(tempNum);
	} else if (button.classList.value === "operator") {
		const newOperator = button.innerText;

		if (!currentOperator) {
			num1 = tempNum;
		} else if (isTempChanged) {
			num2 = tempNum;
			num1 = operate(currentOperator, num1, num2);

			populateResultDiv(num1);
		}

		isTempChanged = false;
		currentOperator = newOperator;

		populateEquationDiv(`${num1} ${currentOperator}`);
	} else if (button.classList.value === "equals") {
		isEquals = true;
		if (!currentOperator) {
			populateEquationDiv(`${tempNum} =`);
			populateResultDiv(tempNum);
			isTempChanged = false;
		} else {
			num2 = tempNum;

			populateEquationDiv(`${num1} ${currentOperator} ${num2} =`);

			num1 = operate(currentOperator, num1, num2);

			populateResultDiv(num1);

			isTempChanged = false;
		}
	} else if (button.classList.value === "clear") {
		if (!isEquals) {
			isTempChanged = false;
			tempNum = 0;
		} else {
			isEquals = false;
			isTempChanged = false;
			tempNum = 0;
			num1 = null;
			num2 = null;
			currentOperator = null;
			populateEquationDiv("");
		}

		populateResultDiv(tempNum);
	} else if (button.classList.value === "clear-all") {
		isEquals = false;
		isTempChanged = false;
		tempNum = 0;
		num1 = null;
		num2 = null;
		currentOperator = null;
		populateEquationDiv("");
		populateResultDiv(tempNum);
	} else if (button.classList.value === "delete") {
		if (!isTempChanged) return;
		const tempNumString = tempNum.toString();
		tempNum = +tempNumString.substring(0, tempNumString.length - 1);
		populateResultDiv(tempNum);
	}
}
