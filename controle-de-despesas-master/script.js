const transacoesUl  = document.querySelector('#transactions')
const exibirGanhosDisplay = document.querySelector("#money-plus")
const exibirGastosDisplay = document.querySelector("#money-minus")
const exibirTotalDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTextoTransacao = document.querySelector("#text")
const inputValorTransacao = document.querySelector("#amount")



const localStorageTransacoes = JSON.parse(localStorage
    .getItem("armazenarTransacoes"))
let armazenarTransacoes = localStorage
    .getItem("armazenarTransacoes") !== null ? localStorageTransacoes : []

const removerTransacao = ID => {
    armazenarTransacoes = armazenarTransacoes.filter(transacao => 
        transacao.id !== ID)
        updateLocalStore()
    addTransacoesTela()

}

const addTransacoesDOM = transacao => {
    const operacao = transacao.gastos < 0 ? '-' : '+'
    const cssClass = armazenarTransacoes.gastos < 0 ? 'minus' : 'plus'
    const li = document.createElement('li')

    li.classList.add(cssClass)
    li.innerHTML = `
        ${transacao.name}
        <span>${operacao} R$ ${Math.abs(transacao.gastos)}</span>
        <button class="delete-btn" onClick="removerTransacao(${transacao.id})"> x </button>
    `

    transacoesUl.append(li)

}

const update = () => {
    const transacoesGastos = armazenarTransacoes
        .map(armazenarTransacoes => armazenarTransacoes.gastos)
    const total = transacoesGastos
        .reduce((somar, numero) => somar + numero, 0)
        .toFixed(2)
    const ganhos = transacoesGastos 
        .filter(value => value > 0) 
        .reduce((somar, value) => somar + value, 0)
        .toFixed(2)
    const despesas = Math.abs(transacoesGastos
        .filter(value => value < 0)
        .reduce((somar, value) => somar + value, 0))
        .toFixed(2)

        exibirTotalDisplay.textContent = `R$ ${total}`
        exibirGanhosDisplay.textContent = `R$ ${ganhos}`
        exibirGastosDisplay.textContent = `R$ ${despesas}`

}

const addTransacoesTela = () => {
    transacoesUl.innerHTML = ""
    armazenarTransacoes.forEach(addTransacoesDOM)
    update()
}

addTransacoesTela()

const updateLocalStore = () => {
    localStorage.setItem("armazenarTransacoes", JSON.stringify(armazenarTransacoes))
}

const gerarId = () => Math.round(Math.random() * 1000)

const addTransacaoArray = (nomeTransacao, valorTransacao) => {
    armazenarTransacoes.push({
        id: gerarId(),
        name: nomeTransacao , 
        gastos: Number(valorTransacao)
    })
}
const limparInputs = () => {
    inputTextoTransacao.value = ""
    inputValorTransacao.value = ""

}

const formSubmit =  event => {
    event.preventDefault()

    const nomeTransacao = inputTextoTransacao.value.trim()
    const valorTransacao = inputValorTransacao.value.trim()
    const verificarPreenchimento = nomeTransacao === "" || valorTransacao === ""

    if (verificarPreenchimento) {
        alert("Preencher todos os campos com o nome e valor da transação")
        return
    } 

    addTransacaoArray(nomeTransacao, valorTransacao)
    addTransacoesTela()
    updateLocalStore()
    limparInputs()

}

form.addEventListener("submit", formSubmit)