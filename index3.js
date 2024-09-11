// Para utilizar o enquirer agente faz o seguinte

const {select, input, checkbox} = require("@inquirer/prompts")

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

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizaressa etapa",
        choices: [...metas], // Escolhas
        instructions: false
    })

    // DESMARCAR META
    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }
    
    // MARCAR META
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluida(s)")
}
// =======================================

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log("Não existem metas realizadas :( ")
    }

    await select({
        message: "Metas realizads " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        console.log("Não existem metas abertas")
        return
    }

    await select({
        message: "Meatas Abertas " + abertas.length,
        cholces: [...abertas]
    })
}

const start = async () => {

    while(true) {

        const opcao = await select({
            message: "Meno >",
            cholces: [ // Listar
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "Sair":
                return
        }
    }
}

start()