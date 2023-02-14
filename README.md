# calculator

Final project in The Odin Project's Foundations course

## 2nd workflow idea

### Had this idea on my drive back home from work today

currentOp = {a: null, operator: null; b: null }
tempNum = 0
isTempChanged = false

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

        if currentOp.operator === null

            if currentOp.a === null

                currentOp.a = tempNum

                currentOp.operator = new operator button

                isTempChanged = false

                populateEquationDiv(`${currentOp.a} ${currentOp.operator}`)

            else

                if isTempChanged === false

                    populateEquationDiv(`${equationDiv - 2} ${currentOp.operator}`)

                else

                    currentOp.b = tempNum

                    tempNum = operate(currentOp)

                    populateEquationDiv(`${equationDiv} ${currentOp.b} ${currentOp.operator}`)

                    populateResultDiv(tempNum)

                    currentOp.a = tempNum

                    currentOp.operator = new operator button

                    isTempChanged = false

        else if isTempChanged === false

            populateEquationDiv(`${equationDiv - 2} ${currentOp.operator}`)

        else

            currentOp.b = tempNum

            tempNum = operate(currentOp)

            populateEquationDiv(`${equationDiv} ${currentOp.b} ${currentOp.operator}`)

            populateResultDiv(tempNum)

            currentOp.a = tempNum

            currentOp.operator = new operator button

            isTempChanged = false

    else if button is equals

        if currentOp.operator === null

            populateEquationDiv(`${tempNum} =`)

            populateResultDiv(tempNum)

        else

            populateEquationDiv(`${equationDiv} ${currentOp.operator} ${tempNum} =`)

            populateResultDiv(operate(currentOp))

        isEquals = true

        isTempChanged = false

        currentOp.a = null

        currentOp.operator = null

        currentOp.b = null

### Higher-level functionality ideas that need to be fleshed out

Store the currentOp objects before each additional number/operator in an array which will then be sorted based on precedence and iterated through until the final result is determined. Parenthesis would create their own child currentOp objects within their own arrays?
