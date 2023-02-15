"use strict";

let isEquals = false;
let isTempChanged = false;
let tempNum = "0";
let num1 = null;
let num2 = null;
let currentOperator = null;

const resultDiv = document.querySelector(".result");
const equationDiv = document.querySelector(".equation");

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", processInput);

function processInput(e) {
	const button = e.target.closest("button");
	const buttonType = button.classList.value;

	if (isEquals && buttonType !== "equals") clearAll();

	switch (buttonType) {
		case "number":
			updateTempNumber(button.innerText);
			populateResultDiv(tempNum);
			isTempChanged = true;
			break;
		case "operator":
			processOperator(button.innerText);
			populateEquationDiv(`${num1} ${currentOperator}`);
			isTempChanged = false;
			break;
		case "negative":
			toggleNegative();
			populateResultDiv(tempNum);
			break;
		case "equals":
			equals();
			isTempChanged = false;
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
		case "reciprocal":
			reciprocal();
			isTempChanged = false;
			break;
		case "squared":
			squared();
			isTempChanged = false;
			break;
		case "sqrt":
			squareRoot();
			isTempChanged = false;
			break;
		default:
			alert("You pressed something unexpected...");
	}
}

function populateResultDiv(number) {
	resultDiv.textContent = number;
}

function populateEquationDiv(currentEquation) {
	equationDiv.textContent = currentEquation;
}

function updateTempNumber(newNumber) {
	if (tempNum.indexOf(".") !== -1 && newNumber === ".") return;

	if (!isTempChanged && newNumber !== ".") {
		tempNum = newNumber;
	} else {
		tempNum = tempNum.concat(newNumber.toString());
	}
}

function toggleNegative() {
	if (!isTempChanged) {
		tempNum = (+resultDiv.textContent * -1).toString();
		isTempChanged = false;
	} else {
		tempNum = (tempNum * -1).toString();
	}
}

function processOperator(newOperator) {
	if (!currentOperator) {
		num1 = +tempNum;
	} else if (isTempChanged) {
		num2 = +tempNum;
		num1 = operate(currentOperator, num1, num2);
	}
	populateResultDiv(num1);
	currentOperator = newOperator;
}

function equals() {
	isEquals = true;
	if (!currentOperator) {
		num1 = +tempNum;
		populateEquationDiv(`${num1} =`);
		populateResultDiv(num1);
	} else {
		num2 = +tempNum;
		populateEquationDiv(`${num1} ${currentOperator} ${num2} =`);
		num1 = operate(currentOperator, num1, num2);
		populateResultDiv(num1);
	}
}

function clear() {
	if (!isEquals) {
		isTempChanged = false;
		tempNum = "0";
		populateResultDiv(tempNum);
	} else {
		clearAll();
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
	if (!isTempChanged) return;
	const tempNumString = tempNum.toString();
	tempNum = +tempNumString.substring(0, tempNumString.length - 1);
	populateResultDiv(tempNum);
}

function reciprocal() {
	num1 = +tempNum;
	num1 = divide(1, num1);
	populateEquationDiv(`1/(${tempNum})`);
	populateResultDiv(num1);
	tempNum = num1.toString();
}

function squared() {
	num1 = +tempNum;
	num1 = multiply(num1, num1);
	populateEquationDiv(`sqr(${tempNum})`);
	populateResultDiv(num1);
	tempNum = num1.toString();
}

function squareRoot() {
	num1 = +tempNum;
	num1 = num1 ** divide(1, 2);
	populateEquationDiv(`√(${tempNum})`);
	populateResultDiv(num1);
	tempNum = num1.toString();
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
