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

const processInput = function (e) {
	const button = e.target.closest("button");

	if (button.classList.value === "operate") {
	} else if (button.classList.value === "number") {
		const newNumber = +button.innerText;
		updateNumber(newNumber);
		console.log(num1);
	} else {
	}
};

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);
