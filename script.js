"use strict";

let num1 = 0;
let num2 = 0;
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

const processInput = function (e) {
	const button = e.target.closest("button");

	if (button.classList.value === "operate") {
	} else if (button.classList.value === "number") {
		console.log(button.innerText);
	} else {
	}
};

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);
