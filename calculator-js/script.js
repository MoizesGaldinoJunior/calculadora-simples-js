//ESSE CÓDIGO USA O EVAL() PARA CALCULAR A EXPRESSÃO DIGITADA NO DISPLAY, PORÉM É UM RISCO DE SEGURANÇA, POIS O EVAL() EXECUTA QUALQUER CÓDIGO JS, INCLUSIVE MALICIOSO. NÃO É RECOMENDADO USAR O EVAL() EM PRODUÇÃO.

// document.addEventListener("DOMContentLoaded", function () {
//     const display = document.getElementById("display"); //Buscamos o input da calculadora
//     const buttons = document.querySelectorAll(".keyboard__key"); //Buscamos todos os botões da calculadora


//     //percorremos todos os botões e adicionamos um evento de clique
//     buttons.forEach(button => { //Criamos um forEach para cada botão, atribuindo um evento de clique
//         button.addEventListener("click", function () {
//             const value = this.getAttribute("data-value") //Pegamos o valor do botão clicado
//             if (value === "=") {
//                 try {
//                     display.value = eval(display.value) //eval() executa o que estiver no display como um código JS
//                 } catch {
//                     display.value = "Error" //Se houver um erro, exibimos
//                 }
//             } else if (value === "C") {
//                 display.value = "" //Apaga tudo do display
//             } else {
//                 display.value += value //Qualquer outro botão apenas adiciona seu valor ao display
//             }
//         })
//     })

// })

// SUBSTITUINDO O eval() POR calculateExpression()

document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display")
    const buttons = document.querySelectorAll(".keyboard__key")

    let resetDisplay = false

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.getAttribute("data-value")
            handleInput(value)
        })
    })
    
    
    //ADICIONANDO SUPORTE A TECLADO
    document.addEventListener("keydown", function (e){
        handleKeyboardInput(e)
    })
    
    function handleInput(value) {
    
        if (value === "=") {
            display.value = calculateExpression(display.value)
            resetDisplay = true
        } else if (value === "C") {
            display.value = ""
            resetDisplay = false
        } else {
            if (resetDisplay && /\d/.test(value)) {
                display.value = value
            } else {
                display.value += value
            }
            resetDisplay = false
        }
    }
    

    function calculateExpression(expression) {
        try {
            const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, "") //Remove caracterez inseguros.
            return new Function(`return ${sanitizedExpression}`)() //Usamos new Function() para criar uma função anônima e executá-la.
        } catch {
            return "Error"
            }
        }
  
    function handleKeyboardInput(e) {
        const key = e.key

        if (/[\d+\-*/().]/.test(key)) {
            handleInput(key)
        } else if (key === "Enter") {
            handleInput("=")
        } else if (key === "Backspace") {
            display.value = display.value.slice(0, -1)
        } else if (key === "Escape") {
            handleInput("C")
        }
    }
})