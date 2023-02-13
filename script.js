"use strict";

let num1 = 0;
let num2 = 0;
let isNum1 = true;
let result = 0;
let operator = "";

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

const operate = function (op, a, b) {
	if (op === "add") return add(a, b);
	if (op === "subtract") return subtract(a, b);
	if (op === "multiply") return multiply(a, b);
	if (op === "divide") return divide(a, b);
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
	operator = newOperator;
};

const populateResultDiv = function (number) {
	resultDiv.textContent = number;
};

const processInput = function (e) {
	const button = e.target.closest("button");

	if (button.classList.value === "operate") {
		result = operate(operator, num1, num2);
		populateResultDiv(result);
	} else if (button.classList.value === "number") {
		const newNumber = +button.innerText;
		updateNumber(newNumber);
		populateResultDiv(isNum1 ? num1 : num2);
	} else {
		updateOperator(button.id);
		isNum1 = !isNum1;
	}

	console.log("num1", num1);
	console.log("num2", num2);
	console.log("operator", operator);
	console.log("result", result);
};

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);

const resultDiv = document.querySelector(".result");
