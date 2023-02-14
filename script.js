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

const updateOperator = function (newOperator) {
	currentOperator = newOperator;
};

const updateEquation = function (newEquation) {
	equation = newEquation;
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
	} else if (button.classList.value === "operator") {
	} else if (button.classList.value === "equals") {
	}
};

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);

const resultDiv = document.querySelector(".result");
const equationDiv = document.querySelector(".equation");
