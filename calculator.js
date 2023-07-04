document.addEventListener('DOMContentLoaded', function() {
    var screen = document.querySelector('.screen');
    var buttons = document.querySelectorAll('.calculator button');
    var clearButton = document.getElementById('btn-clear');
    var decimalButton = document.getElementById('btn-decimal');
    var equalButton = document.getElementById('btn-equal');


    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var value = button.textContent;

            if (value === '.') {
                if (screen.textContent.includes('.')) {
                    return;
                }
            }

            screen.textContent += value;
        });
    });

    clearButton.addEventListener('click', function() {
        screen.textContent = '';
    });

    decimalButton.addEventListener('click', function() {
        if (!screen.textContent.includes('.')) {
            screen.textContent += '.';
        }
    });

    equalButton.addEventListener('click', function() {
        var expression = screen.textContent;
        if (expression) {
            try {
                var result = evaluateExpression(expression);
                screen.textContent = result;
            } catch (error) {
                console.error('Error:', error);
                screen.textContent = 'Error';
            }
        }
    });

    function evaluateExpression(expression) {
        var operands = expression.split(/[+\-*/^%]/);
        var operators = expression.match(/[+\-*/^%]/g);

        var result = parseFloat(operands[0]);
        for (var i = 0; i < operators.length; i++) {
            var operator = operators[i];
            var operand = parseFloat(operands[i + 1]);

            switch (operator) {
                case '+':
                    result += operand;
                    break;
                case '-':
                    result -= operand;
                    break;
                case '*':
                    result *= operand;
                    break;
                case '/':
                    result /= operand;
                    break;
                case '^':
                    result = Math.pow(result, operand);
                    break;
                case '%':
                    result %= operand;
                    break;
            }
        }

        return result;
    }
});
