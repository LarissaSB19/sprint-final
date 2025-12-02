const RabbitMQService = require('./rabbitmq-service')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Estoque inicial fictício
let estoque = {
    "Thriller": 50,
    "Bad": 5,
    "Dangerous": 8
}

async function processMessage(msg) {
    const dados = JSON.parse(msg.content)

    const produto = dados.products[0].name
    const quantidade = 1

    if (estoque[produto] !== undefined) {
        estoque[produto] -= quantidade
        console.log(`\nESTOQUE ATUALIZADO`)
        console.log(`Produto: ${produto}`)
        console.log(`Quantidade restante: ${estoque[produto]}`)
    } else {
        console.log(`\nProduto '${produto}' não encontrado no estoque.`)
    }
}

async function consume() {
    console.log(`Inventory-service inscrito na fila: ${process.env.RABBITMQ_QUEUE_NAME}`)
    await (await RabbitMQService.getInstance()).consume(process.env.RABBITMQ_QUEUE_NAME, (msg) => { processMessage(msg) })
}

consume()