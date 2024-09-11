// Para utilizar o enquirer agente faz o seguinte

const {select, input, checkbox} = require("@inquirer/prompts")

let mensagem = "Bem vindo ao App de Metas";

let meta = {
    value: "Tomar 3L de água por dia"
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta"})

    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia"
        return
    } 

    metas.push(
        {value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"
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
        mensagem = "Nenhuma meta selecionada!"
        return
    }
    
    // MARCAR META
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluida(s)"
}
// =======================================

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = "Não existem metas realizadas :( "
        return
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
        mensagem = "Não existem metas abertas"
        return
    }

    await select({
        message: "Meatas Abertas " + abertas.length,
        cholces: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itemDeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas], // Escolhas
        instructions: false
    })

    if(itemDeletar.length == 0) {
        mensagem = "Nenhum item selecionado"
        return
    }

    itemDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Metas(s) deletadas(s) com sucesso"
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {

    while(true) {
        mostrarMensagem()

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
                    name: "Deletar Metas",
                    value: "deletar"
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
            case "deletar":
                await deletarMetas()
                break
            case "Sair":
                return
        }
    }
}

start()