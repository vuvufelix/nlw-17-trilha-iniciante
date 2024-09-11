// Para utilizar o enquirer agente faz o seguinte

const {select} = require("@inquirer/prompts")


// =======================================

const start = async () => {

    while(true) {
        
        const opcao = await select({
            message: "Meno >",
            cholces: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "Cadastrar":
                console.log("Vamos cadastrar")
                break
            case "Listar":
                console.log("Vamos listar")
                break
            case "Sair":
                return
        }
    }
}

start()