const RabbitMQService = require('./rabbitmq-service')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

async function processMessage(msg) {
    const dados = JSON.parse(msg.content)

    const cpf = dados.cpf
    const cartao = dados.creditCard?.number

    let status = "APROVADO"
    let motivo = "Nenhuma suspeita encontrada"

    // Simulações simples de fraude
    if (cpf === "12345678900") {
        status = "REPROVADO"
        motivo = "CPF já realizou compras suspeitas"
    } else if (!cartao || cartao.length < 16) {
        status = "REPROVADO"
        motivo = "Cartão inválido"
    }

    if (status === "APROVADO") {
        await (await RabbitMQService.getInstance()).send('contact', { 
            "clientFullName": dados.name,
            "to": dados.email,
            "subject": "Pedido Aprovado",
            "text": `${dados.name}, seu pedido de disco de vinil acaba de ser aprovado, e esta sendo preparado para entrega!`,
        })

        await (await RabbitMQService.getInstance()).send('shipping', dados)
    }

    console.log("\nVerificação de fraude:")
    console.log(`Status: ${status}`)
    console.log(`Motivo: ${motivo}`)
}

async function consume() {
    console.log(`Fraud-service inscrito na fila: ${process.env.RABBITMQ_QUEUE_NAME}`)
    await (await RabbitMQService.getInstance()).consume(process.env.RABBITMQ_QUEUE_NAME, (msg) => { processMessage(msg) })
}

consume()