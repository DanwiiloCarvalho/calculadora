//Captura dos elementos da calculadora
const screen = document.querySelector('.screen span.display');
const clear = document.querySelector(".clear");
const allButton = document.querySelectorAll("button");

let expression = []; //Array que guarda a expressão matemática
let posEqual = false; //Flag que indica se a tecla = foi pressionada

//Função que limpa o display(colocando o dígito zero) e a expressão matemática
function clearExpression() {
    screen.innerText = "0";
    screen.previousElementSibling.innerText = "0";
    expression = [];
}

//Evento de clique da tecla C que limpa a expressão e o display
clear.addEventListener("click", clearExpression);

//Percorre todos os botões do teclado
allButton.forEach((element) => {
    element.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
            if (element.getAttribute('class') === 'equal') {
                element.style.backgroundColor = 'rgb(196, 191, 191)';
            }
            element.classList.add('buttonClick');
        }
    });

    element.addEventListener('mouseup', () => {
        if (element.getAttribute('class').includes('equal')) {
            element.removeAttribute('style');
        }
        element.classList.remove('buttonClick');
    });

    //Eventos das teclas ponto, operações, números e igual
    element.addEventListener('click', () => {
        if (posEqual) {
            clearExpression();
            posEqual = false;
        }
        if (element.classList.contains('dot')) {
            if (screen.innerText === '0') {
                screen.innerText += element.innerText;
            } else if (!screen.innerText.includes('.')) {
                screen.innerText += element.innerText;
            }
        }
        if (element.classList.contains('op')) {
            let operand = Number(screen.innerText);
            expression.push(operand);
            expression.push(element.innerText.replace("x", "*").replace("÷", "/"));
            screen.innerText = "0";
            console.log(expression);
            screen.previousElementSibling.innerText = expression.join(" ");
        }
        if (element.classList.contains('number')) {
            if (screen.innerText === '0') {
                screen.innerText = "";
            }
            screen.innerText += element.innerText;
        }
        if (element.classList.contains('equal')) {
            let operand = Number(screen.innerText);
            expression.push(operand);
            /* console.log(expression); */
            screen.previousElementSibling.innerText = expression.join(" ");
            let result = eval(screen.previousElementSibling.innerText);
            screen.innerText = result;
            screen.previousElementSibling.innerText += " " + element.innerText + " " + result;
            posEqual = true;
        }
    });
});