const input = document.getElementById('inputbox');
const buttons = document.querySelectorAll('button');

let expression = '';
let lastInput = '';
const operators = ['+', '-', '*', '/'];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;

    // Clear everything
    if (value === 'C') {
      expression = '';
      input.value = '';
      return;
    }

    // Delete last character
    if (value === 'DEL') {
      expression = expression.slice(0, -1);
      input.value = expression;
      return;
    }

    // Calculate result
    if (value === '=') {
      try {
        if (expression === '') return;

        // Evaluate only if expression is valid
        const lastChar = expression[expression.length - 1];
        if (operators.includes(lastChar)) return;

        const result = evaluateExpression(expression);
        input.value = result;
        expression = result.toString(); // allow chaining
      } catch (e) {
        input.value = 'Error';
        expression = '';
      }
      return;
    }

    // Handle multiple operator prevention
    if (operators.includes(value)) {
      if (expression === '' || operators.includes(lastInput)) {
        return; // don't allow starting with or repeating an operator
      }
    }

    // Handle multiple decimals in a number
    if (value === '.') {
      const parts = expression.split(/[\+\-\*\/]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) return; // disallow multiple decimals
    }

    // Append valid input
    expression += value;
    lastInput = value;
    input.value = expression;
  });
});

function evaluateExpression(expr) {
  // Convert to a valid JS expression, and evaluate safely
  return Function('"use strict"; return (' + expr + ')')();
}
