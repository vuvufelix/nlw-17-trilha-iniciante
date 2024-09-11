// Para utilizar o enquirer agente faz o seguinte

const {select, input} = require("@inquirer/prompts")

let meta = {
    value: "Tomar 3L de água por dia"
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta"})

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia")
        return
    } 

    metas.push(
        {value: meta, checked: false}
    )
}

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
                await cadastrarMeta()
                console.log(metas)
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