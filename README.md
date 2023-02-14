# calculator

Final project in The Odin Project's Foundations course

## 3rd workflow idea

### Revision of the previous idea

tempNum = 0

a = null

b = null

operator = null

isTempChanged = false

isEquals = false

User clicks button

    if button is a number

        if isTempChanged === false

            tempNum = number

            isTempChanged = true

            updateResultDiv(tempNum)

        else if tempNum !== 0

            tempNum = tempNum concatenate new number

            populateResultDiv(tempNum)

        if isEquals = true

            populateEquationDiv("")

            isEquals = false

    else if button is an operator

        if operator === null

            operator = new operator button

            a = tempNum

            isTempChanged = false

            populateEquationDiv(`${a} ${operator}`)

        else if isTempChanged === false

            populateEquationDiv(`${a} ${operator}`)

        else

            b = tempNum

            a = operate(a, b, operator)

            operator = new operator button

            populateEquationDiv(`${a} ${operator}`)

            populateResultDiv(a)

            isTempChanged = false

    else if button is equals

        if operator === null

            populateEquationDiv(`${tempNum} =`)

            populateResultDiv(tempNum)

        else

            if (!isTempChanged)

                b = tempNum

            a = operate(a, b, operator)

            isTempChanged = false

            populateEquationDiv(`${a} ${operator} ${b} =`)

            populateResultDiv(a)

    else if button is clear

        tempNum = 0

        a = null

        b = null

        operator = null

        isTempChanged = false

    else if other buttons

        do other stuff specific to that button
