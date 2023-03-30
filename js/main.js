const form = document.getElementById('novoItem')
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((e) => {
  criaElemento(e)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const nome = e.target.elements['nome']
  const quantidade = e.target.elements['quantidade']

  //verifica se o item existe
  const existe = itens.find(elemento => elemento.nome === nome.value)
  
  const itemAtual = {
    "nome" : nome.value,
    "quantidade" : quantidade.value
  }

  if(existe) {
    itemAtual.id = existe.id
    
    atualizaElemento(itemAtual)

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual  //substitui no localStorage
  } else {
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0  // adiciona com um novo id

    criaElemento(itemAtual)

    itens.push(itemAtual)
  }

  localStorage.setItem("itens", JSON.stringify(itens))

  nome.value = ""
  quantidade.value = ""
})

function criaElemento(item) {
  const novoItem = document.createElement('li')
  novoItem.classList.add("item")
 
  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade
  numeroItem.dataset.id = item.id
  
  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += item.nome

  novoItem.appendChild(botaoDeleta(item.id))

  lista.appendChild(novoItem)
  
}

//atualiza a quantidade para cada item
function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// Botão DELETE item
function botaoDeleta(id) {
  const elementoBotao = document.createElement('button')
  elementoBotao.innerText = "X"

  elementoBotao.addEventListener('click', function() {
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

//deleta/remove o elemento
function deletaElemento(tag, id) {
tag.remove()
itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

localStorage.setItem("itens", JSON.stringify(itens)) //atualiza o localStorage
}
