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
		case "modifier":
			tempNum = processModifier(+tempNum, button.id).toString();
			populateResultDiv(tempNum);
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

function processModifier(number, modifier) {
	let result;

	if (modifier === "percent") {
		result = percent(number);
	} else if (modifier === "sqrt") {
		result = squareRoot(number);
	} else if (modifier === "reciprocal") {
		result = reciprocal(number);
	} else {
		result = squared(number);
	}

	const newEquation = currentOperator
		? `${num1} ${currentOperator} ${result.modString}`
		: result.modString;

	populateEquationDiv(newEquation);

	return result.modNumber;
}

function reciprocal(number) {
	return {
		modNumber: divide(1, number),
		modString: `1/(${number})`,
	};
}

function squared(number) {
	return {
		modNumber: multiply(number, number),
		modString: `sqr(${number})`,
	};
}

function squareRoot(number) {
	return {
		modNumber: number ** divide(1, 2),
		modString: `√(${number})`,
	};
}

function percent(number) {
	//https://github.com/microsoft/calculator/issues/655#issuecomment-527471016
	let modNumber = 0;

	if (currentOperator === "+" || currentOperator === "-") {
		modNumber = (num1 * number) / 100;
	} else if (currentOperator === "x" || currentOperator === "÷") {
		modNumber = number / 100;
	}

	return {
		modNumber,
		modString: modNumber ? `${num1} ${currentOperator} ${modNumber}` : modNumber,
	};
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
