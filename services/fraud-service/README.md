# Fraud Service

Este projeto corresponde a uma aplicação que recebe notificações de transações e realiza validações para identificar possíveis fraudes. O serviço consome mensagens de uma fila RabbitMQ e aplica regras de negócio para verificar inconsistências nos dados do cliente e da compra. Estrutura esperada da mensagem recebida: 

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
