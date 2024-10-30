// Cotação de moedas do dia
const USD = 4.87
const EUR = 5.32
const GBP = 6.08 

// Obtendo os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')
const footer = document.querySelector('main footer')
const description = document.getElementById('description')
const result = document.getElementById('result')

// Manipulando o input amount para receber apenas números
amount.addEventListener('input', () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, '')
})

// Capturando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault()
    
    switch (currency.value) {
        case 'USD':
            convertCurrency(amount.value, USD, 'US$')
            break
        case 'EUR':
            convertCurrency(amount.value, EUR, '€')
            break
        case 'GBP':
            convertCurrency(amount.value, GBP, '£')
    }
}

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Aplica a classe que exibe o footer
        footer.classList.add('show-result')

        // Calcula o total da conversão
        let total = amount * price
        
        // Verifica se o resultado não é um número
        if(isNaN(total)) {
            alert('Por favor, digite o valor corretamente para converter.')
        }

        // Formata o valor total
        total = formatCurrencyBRL(total).replace('R$', '')

        // Exibe o resultado da conversão
        result.textContent = `${total} Reais`

    } catch (error) {
        footer.classList.remove('show-result')
        alert('Não foi possível fazer a conversão. Tente novamente')
    }
}

// Formatar o valor em REAL
function formatCurrencyBRL(value) {
    //Converte para número para utilizar o toLocaleString e assim formatar para o padrão BRL
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}