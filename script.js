"use strict";

const add = function (num1, num2) {
	return num1 + num2;
};

const subtract = function (num1, num2) {
	return num1 - num2;
};

const multiply = function (num1, num2) {
	return num1 * num2;
};

const divide = function (num1, num2) {
	return num1 / num2;
};

const operate = function (operator, num1, num2) {
	if (operator === "add") return add(num1, num2);
	if (operator === "subtract") return subtract(num1, num2);
	if (operator === "multiply") return multiply(num1, num2);
	if (operator === "divide") return divide(num1, num2);
	return "ERROR";
};

const readInput = function (e) {
	const button = e.target.closest("button");
	console.log(button.id);
};

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", readInput);
