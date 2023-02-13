"use strict";

let isNum1 = true;
let num1 = 0;
let num2 = 0;
let tempNum = 0;
let result = 0;
let operator = "";
let equation = "";

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
	if (op === "+") return add(a, b);
	if (op === "-") return subtract(a, b);
	if (op === "x") return multiply(a, b);
	if (op === "÷") return divide(a, b);
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
	let newEquation = equation;

	if (button.classList.value === "operate") {
		updateNumber(tempNum);
		newEquation += isNum1 ? `${num1}=` : `${num2}=`;
		result = operate(operator, num1, num2);
		populateResultDiv(result);
	} else if (button.classList.value === "number") {
		const newNumber = +button.innerText;
		tempNum = tempNum === 0 ? newNumber : +`${tempNum}${newNumber}`;
		populateResultDiv(tempNum);
	} else {
		const newOperator = button.innerText;
		updateNumber(tempNum);
		updateOperator(newOperator);
		newEquation += isNum1 ? `${num1}${newOperator}` : `${num2}${newOperator}`;
		isNum1 = false;
		tempNum = 0;
	}

	updateEquation(newEquation);
	populateEquationDiv(newEquation);
	console.log("num1", num1);
	console.log("num2", num2);
	console.log("equation", equation);
	console.log("result", result);
};

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);

const resultDiv = document.querySelector(".result");
const equationDiv = document.querySelector(".equation");
