/* - - - - * 
 March 2021, Internet Techniques
 * - - - - *
 STUDENT:
 Emirhan Caliskan
 * - - - - *
 ALBUM NO:
 56140
 * - - - - *
 DESCRIPTION:
 Simple calculator app that can perform several operations.
*/

let registeredOperator; //STORES CHOSEN OPERATOR AT ANY GIVEN TIME
let firstValue = document.getElementById("text-box1").value; //INPUT1
let secondValue = document.getElementById("text-box2").value;//INPUT2

//CLEAR OPERATOR AND ITS DISPLAY UPON CLICKING THE OPERATOR LABEL
function clearOperator()
{
    document.getElementById("operator-display").textContent="\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
    registeredOperator = '';
}

//SAVE CHOSEN OPERATOR DEPENDING ON CLICKED BUTTON
function saveOperator(operator)
{
    registeredOperator = operator;
    document.getElementById("operator-display").textContent = registeredOperator;
}

//CLEAR ALL FIELDS
function clearButton()
{
    document.getElementById("text-box1").value="";
    document.getElementById("text-box2").value="";
    clearOperator();
    clearResults();
}

//SWAP INPUTS BETWEEN FIELDS
function swapButton()
{
    let buffer = document.getElementById("text-box1").value;
    document.getElementById("text-box1").value=document.getElementById("text-box2").value;
    document.getElementById("text-box2").value=buffer;
}

//CLEAR RESULTS SECTION UPON CLICKING 'OUTPUT:' LABEL
function clearResults()
{
    document.getElementById("result-display").textContent="";
}

//DECIDE WHAT HAPPENS WHEN CALCULATE BUTTON CLICKED
function calculateButton()
{
    firstValue = document.getElementById("text-box1").value;
    secondValue = document.getElementById("text-box2").value;
    
    if (isNaN(firstValue)==false && isNaN(secondValue)==false && firstValue!= "" && secondValue!= "") {
        document.getElementById("result-display").textContent = registerOperation(registeredOperator);
    } else {
        document.getElementById("result-display").textContent = userErrorHandle(firstValue, secondValue);
    }
}

////DEFINING WHAT EACH OPERATOR SHOULD DO
function registerOperation(operator)
{
    switch (operator)
    {
        case "+":
            return firstValue + " " + operator + negationHandle(secondValue, true) + (Number(firstValue) + Number(secondValue));

        case "-":
            return firstValue + " " + operator + negationHandle(secondValue, true) + (Number(firstValue) - Number(secondValue));

        case "/":
            return divisionZero(firstValue, secondValue, true);

        case "*":
            return firstValue + " " + operator + negationHandle(secondValue, true) + (Number(firstValue) * Number(secondValue));

        case "%":
            return divisionZero(firstValue, secondValue, false);

        case "^":
            return negationHandle(firstValue, false) + operator + negationHandle(secondValue, true) + (Math.pow(Number(firstValue), Number(secondValue)));

        case "!":
            return factorial(Number(firstValue)) + " | " + factorial(Number(secondValue));

        case "log":
            return logarithmCalculate(firstValue, secondValue);

        case "lcm":
            return operator + " of " + firstValue + " and " + secondValue + " is: " + "\n" + lcmCalculate(firstValue, secondValue);

        case "gcd":
            return operator + " of " + firstValue + " and " + secondValue + " is: " + "\n" + gcdCalculate(firstValue, secondValue);

        //ERROR: no operation is selected
        default:
            return "No operation selected!";
    }
}

//HANDLE ALL DIVISIONS, ERROR WHEN DIVISION BY ZERO IS ATTEMPTED
function divisionZero(firstValue, secondValue, bool)
{
    if (secondValue == 0)
    {
        return "Mathematically undefined request: Can't divide by zero";
    }
    else if (bool == true)
    {
        return firstValue + " " + registeredOperator + negationHandle(secondValue, true) + (Number(firstValue) / Number(secondValue));
    }
    else 
    {
        return firstValue + " " + registeredOperator + negationHandle(secondValue, true) + (Number(firstValue) % Number(secondValue));
    }
}

/*
    IMPLEMENTATION OF FEATURE TO ADD PARANTHESIS TO NEGATIVE SECOND VALUES SO THAT THE
    OUTPUT DOES NOT LOOK AWKWARD. EX: '3 - -4 = 7' IS BAD, '3 - (-4) = 7' IS BETTER.     
*/
function negationHandle(value, bool)
{
    if(value<0 && bool)
    {
        return " (" + value + ") = ";
    } 
    else if (value >= 0 && bool)
    {
        return " " + value + " = ";
    } 
    else if (value < 0 && !bool)
    {
        return "(" + value + ") ";
    } 
    else
    {
        return value + " ";
    }
}
    
//CHECK: IS FACTORIAL POSSIBLE? + CALCULATE: FACTORIAL
function factorial(value)
{
    //is it integer? AND is it positive?
    if (value === parseInt(value, 10) && value >= 0)
    {
        let result = value;

        //by defination: 0! = 1
        if (value == 0)
            result = 1;

        //calculate factorial for a>0
        for (let i = 1; i < value; i++)
        {
            result *= i;
        }

        //result of 171! and upper cannot be shown
        if (value > 170) 
        {
            return "Can't compute.. Too big!"; //technical restraint error
        }
        else 
        {
            return value + registeredOperator + " = " + result;
        }
    }
    //ERROR: MATHEMATICALLY UNDEFINED REQUEST, EITHER NEGATIVE OR NONINTEGER
    else
    {
        if(!isNaN(value))
        {
            var wrongInput = value;
        }
        else
        {
            var wrongInput = "input";
        }
        return "Mathematically undefined request: " + "\n" + "'" + wrongInput + "' has to be a positive integer";
    }
}

//DETECT THAT A SINGLE INPUT IS PROVIDED: CALCULATE THE FACTORIAL FOR THAT + DO NOT DISPLAY ANY ERROR MESSAGE FOR THE OTHER
function handleSingleFactorial() 
{
    if (firstValue == "" || secondValue == "")
    {
        if (firstValue == "")
            return factorial(Number(secondValue));
        if (secondValue == "")
            return factorial(Number(firstValue));
        return "";
    }
    else
    {
        return factorial(Number(firstValue)) + " | " + factorial(Number(secondValue));
    }           
}

//EXCEPTION HANDLING MECHANISM USED IN 'calculateButton'
function userErrorHandle(firstValue, secondValue) 
{
    let isNumber = isNaN(firstValue) || isNaN(secondValue);
    let isEmpty = firstValue == "" && secondValue == "";

    //chosen operation is factorial and not all text boxes are empty
    if (!isEmpty && registeredOperator == "!")
    {
        return handleSingleFactorial();
    }
    //error: there is an empty text box
    else if (firstValue == "" || secondValue == "")
    {
        return "Fill in boxes first!";
    }
    //error: no operation can take place with this set of inputs
    else
    {
        return "Invalid Input! Enter numbers only.";
    }

}

//CALCULATE GREATEST COMMON DIVISOR
function gcdCalculate(firstValue, secondValue)
{
    if (Number(secondValue) == 0)
    {
        return Number(firstValue);
    }

    return Math.abs(gcdCalculate(secondValue, (Number(firstValue) % Number(secondValue))));
}

//CALCULATE LEAST COMMON MULTIPLIER
function lcmCalculate(firstValue, secondValue) 
{
    let result = Math.abs(Number(firstValue) * Number(secondValue)) / gcdCalculate(firstValue, secondValue);           
    return Math.abs(result);
}

//CALCULATE LOGARITHM GIVEN ARGUMENT AND BASE + HANDLE INVALID CASES
function logarithmCalculate(firstValue, secondValue) 
{
    if (Number(secondValue) >= 0 && Number(firstValue) > 0)
    {
        return "The base " + secondValue + " logarithm of " + firstValue + " is: " + (Math.log(Number(firstValue)) / Math.log(Number(secondValue)));
    }
    else if (Number(secondValue) < 0 || Number(firstValue) < 0) 
    {
        return "Mathematically undefined request: " + "The base of the logarithm (" + secondValue + ") and/or " + "the argument (" + firstValue + ") cannot be negative!";
    }
    // argument is zero
    else 
    {
        return "Mathematically undefined request: " + "The argument of the logarithm " + "cannot be zero";
    }
}