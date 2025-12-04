# Inventory

Este projeto é uma aplicação em Node.js responsável por gerenciar o estoque de produtos. Ao receber uma notificação de compra, o serviço atualiza a quantidade disponível no inventário. As mensagens são consumidas de uma fila RabbitMQ e processadas para refletir as alterações no banco de dados.

Estrutura esperada da mensagem recebida: 

```Json
{
    "name": "NOME TESTE",
    "email": "EMAIL TESTE",
    "cpf": "12345678900",
    "creditCard": {
        "number": "1234567890123456",
        "securityNumber": "123"
    },
    "products": [
        {
            "name": "Thriller",
            "value": "50"
        }
    ],
    "address": {
        "zipCode": "CEP",
        "street": "NOME_DA_RUA",
        "number": "NUMERO_DA_RESIDENCIA",
        "neighborhood": "NOME_DO_BAIRO",
        "city": "NOME_DA CIDADE",
        "state": "DF"
    }
}
```