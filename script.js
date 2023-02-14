"use strict";

let isTempChanged = false;
let tempNum = 0;
let num1 = null;
let num2 = null;
let currentOperator = null;

const add = function (a, b) {
	return a + b;
};

const subtract = function (a, b) {
	return a - b;
};

const multiply = function (a, b) {
	return a * b;
};

const divide = function (a, b) {
	return a / b;
};

const operate = function (operator, a, b) {
	if (operator === "+") return add(a, b);
	if (operator === "-") return subtract(a, b);
	if (operator === "x") return multiply(a, b);
	if (operator === "÷") return divide(a, b);
	return "ERROR";
};

const updateNumber = function (newNumber) {
	if (isNum1) {
		num1 = num1 === 0 ? newNumber : +`${num1}${newNumber}`;
	} else {
		num2 = num2 === 0 ? newNumber : +`${num2}${newNumber}`;
	}
};

const populateResultDiv = function (number) {
	resultDiv.textContent = number;
};

const populateEquationDiv = function (currentEquation) {
	equationDiv.textContent = currentEquation;
};

const processInput = function (e) {
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
		const newOperator = button.id;
		currentOperator = newOperator;
		if (!currentOperator) {
			num1 = tempNum;
		}

		isTempChanged = false;
		console.log(currentOperator);
	} else if (button.classList.value === "equals") {
	}
};

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);

const resultDiv = document.querySelector(".result");
const equationDiv = document.querySelector(".equation");
