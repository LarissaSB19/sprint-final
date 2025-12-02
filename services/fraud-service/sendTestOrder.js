const RabbitMQService = require('./rabbitmq-service')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

async function sendTestOrder() {
    await (await RabbitMQService.getInstance()).send('fraud-check', {
        id: "101",
        cpf: "12345678900",
        creditCard: { number: "1234567890123456", securityNumber: "123" },
        products: [{ name: "Thriller", value: "50" }],
        name: "Rubens",
        email: "rubens@email.com"
    })
    console.log("✔ Pedido de teste enviado para fraud-check")
}

sendTestOrder()