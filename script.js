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
	let newEquation = equationDiv.innerText;
	if (isEquals && buttonType !== "equals") clearAll();

	switch (buttonType) {
		case "number":
			tempNum = updateNumber(tempNum, button.innerText);
			isTempChanged = true;
			break;
		case "operator":
			processOperator(button.innerText);
			newEquation = `${num1} ${currentOperator}`;
			isTempChanged = false;
			break;
		case "negative":
			tempNum = toggleNegative(tempNum);
			break;
		case "equals":
			let result = equals();
			tempNum = result.number;
			newEquation = result.equation;
			isTempChanged = false;
			break;
		case "clear":
			clear();
			break;
		case "clear-all":
			clearAll();
			newEquation = "";
			break;
		case "delete":
			if (!isTempChanged) return;
			tempNum = deleteDigit(tempNum);
			break;
		case "modifier":
			let modified = processModifier(+tempNum, button.id);
			tempNum = modified.number;
			newEquation = modified.equation;
			isTempChanged = false;
			break;
		case "decimal":
			tempNum = decimal(tempNum);
			isTempChanged = true;
			break;
		default:
			alert("You pressed something unexpected...");
	}

	populateResultDiv(tempNum);
	populateEquationDiv(newEquation);
}

function populateResultDiv(number) {
	resultDiv.textContent = number;
}

function populateEquationDiv(currentEquation) {
	equationDiv.textContent = currentEquation;
}

function updateNumber(currentNumber, newNumber) {
	if (isTempChanged) {
		currentNumber = currentNumber.concat(newNumber.toString());
	} else {
		currentNumber = newNumber;
	}

	return currentNumber;
}

function decimal(number) {
	if (isTempChanged) {
		return number.indexOf(".") === -1 ? number.concat(".") : number;
	} else {
		return "0.";
	}
}

function toggleNegative(number) {
	return (+number * -1).toString();
}

function processOperator(newOperator) {
	if (!currentOperator) {
		num1 = +tempNum;
	} else if (isTempChanged) {
		num2 = +tempNum;
		num1 = operate(currentOperator, num1, num2);
	}
	currentOperator = newOperator;
}

function equals() {
	if (!currentOperator) {
		return {
			number: tempNum,
			equation: `${+tempNum} =`,
		};
	} else if (!isEquals) {
		isEquals = true;
		num2 = +tempNum;

		return {
			number: operate(currentOperator, num1, num2),
			equation: `${num1} ${currentOperator} ${num2} =`,
		};
	} else {
		num1 = +tempNum;

		return {
			number: operate(currentOperator, num1, num2),
			equation: `${num1} ${currentOperator} ${num2} =`,
		};
	}
}

function clear() {
	if (!isEquals) {
		isTempChanged = false;
		tempNum = "0";
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
}

function deleteDigit(numString) {
	if (numString.length === 1) {
		return "0";
	} else {
		return numString.substring(0, numString.length - 1);
	}
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

	const modNumber = result.modNumber;
	const newEquation = currentOperator
		? `${num1} ${currentOperator} ${result.modString}`
		: result.modString;

	return {
		number: modNumber,
		equation: newEquation,
	};
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
		modString: modNumber,
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
