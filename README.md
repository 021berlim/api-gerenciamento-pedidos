# 📦 Sistema de Gerenciamento de Pedidos de Restaurante

API backend desenvolvida em Node.js para gerenciar pedidos de restaurante, simulando um sistema robusto, mas com uma implementação simples e eficiente.

---

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express**
- **Sequelize ORM**
- **MySQL**

---

## 📋 Como Rodar o Projeto

1. **Clone o repositório**
```bash
git clone https://github.com/021berlim/nome-do-repo.git
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
- Edite o arquivo de configuração `/src/config/database.js` com as informações do seu MySQL.

4. **Crie o banco de dados**
```sql
CREATE DATABASE restaurante;
```

5. **Execute as migrations (se houver) ou sincronize os models**
No seu código principal (`app.js`), certifique-se de sincronizar os models:
```javascript
const db = require('./src/database');
db.sequelize.sync();
```

6. **Inicie o servidor**
```bash
npm start
```

Servidor rodando em: `http://localhost:3000`

---

## 🗄️ Modelos/Tabelas

### Cliente (`clientes`)
| Campo | Tipo        | Descrição |
| :---- | :---------- | :-------- |
| id    | Inteiro (PK) | Identificador do cliente |
| nome  | String      | Nome do cliente |
| telefone | String   | Telefone de contato |
| endereco | String   | Endereço |

---

### Produto (`produtos`)
| Campo | Tipo        | Descrição |
| :---- | :---------- | :-------- |
| id    | Inteiro (PK) | Identificador do produto |
| nome  | String      | Nome do prato ou bebida |
| descricao | String  | Descrição do produto |
| preco | Decimal     | Preço do produto |

---

### Pedido (`pedidos`)
| Campo | Tipo        | Descrição |
| :---- | :---------- | :-------- |
| id    | Inteiro (PK) | Identificador do pedido |
| cliente_id | Inteiro (FK) | Referência ao cliente |
| status | String     | Status atual do pedido (`Em preparo`, `Pronto`, `Entregue`) |
| data | DateTime     | Data do pedido |

---

### Item do Pedido (`itens_pedido`)
| Campo | Tipo        | Descrição |
| :---- | :---------- | :-------- |
| id    | Inteiro (PK) | Identificador do item |
| pedido_id | Inteiro (FK) | Referência ao pedido |
| produto_id | Inteiro (FK) | Referência ao produto |
| quantidade | Inteiro | Quantidade do produto no pedido |
| preco_unitario | Decimal | Preço unitário no momento do pedido |

---

## 📚 Rotas da API

### 📌 Clientes

#### Criar novo cliente
`POST /clientes`
```json
{
  "nome": "João da Silva",
  "telefone": "11999999999",
  "endereco": "Rua das Flores, 123"
}
```

Resposta:
```json
{
  "id": 1,
  "nome": "João da Silva",
  "telefone": "11999999999",
  "endereco": "Rua das Flores, 123",
  "createdAt": "2025-04-26T18:00:00.000Z",
  "updatedAt": "2025-04-26T18:00:00.000Z"
}
```

---

### 📌 Produtos

#### Cadastrar novo produto
`POST /produtos`
```json
{
  "nome": "Pizza Margherita",
  "descricao": "Pizza com molho de tomate, muçarela e manjericão",
  "preco": 45.00
}
```

Resposta:
```json
{
  "id": 1,
  "nome": "Pizza Margherita",
  "descricao": "Pizza com molho de tomate, muçarela e manjericão",
  "preco": 45.00,
  "createdAt": "2025-04-26T18:05:00.000Z",
  "updatedAt": "2025-04-26T18:05:00.000Z"
}
```

---

#### Listar todos os produtos
`GET /produtos`

Resposta:
```json
[
  {
    "id": 1,
    "nome": "Pizza Margherita",
    "descricao": "Pizza com molho de tomate, muçarela e manjericão",
    "preco": 45.00
  }
]
```

---

### 📌 Pedidos

#### Criar novo pedido
`POST /pedidos`
```json
{
  "cliente_id": 1,
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 2,
      "preco_unitario": 45.00
    }
  ]
}
```

Resposta:
```json
{
  "id": 1,
  "cliente_id": 1,
  "status": "Em preparo",
  "data": "2025-04-26T18:10:00.000Z",
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 2,
      "preco_unitario": 45.00
    }
  ]
}
```

---

#### Atualizar status de pedido
`PATCH /pedidos/:id/status`
```json
{
  "status": "Pronto"
}
```

Resposta:
```json
{
  "message": "Status atualizado com sucesso"
}
```

---

#### Listar pedidos de um cliente
`GET /clientes/:id/pedidos`

Resposta:
```json
[
  {
    "id": 1,
    "status": "Pronto",
    "data": "2025-04-26T18:10:00.000Z",
    "total": 90.00
  }
]
```

---

#### Buscar detalhes de um pedido
`GET /pedidos/:id`

Resposta:
```json
{
  "id": 1,
  "cliente": {
    "nome": "João da Silva"
  },
  "status": "Pronto",
  "data": "2025-04-26T18:10:00.000Z",
  "itens": [
    {
      "nome": "Pizza Margherita",
      "quantidade": 2,
      "preco_unitario": 45.00
    }
  ],
  "total": 90.00
}
```

---

## 📌 Observações
- Todas as rotas são **públicas** e **não exigem autenticação**.
- Todas as requisições e respostas utilizam o formato **JSON**.
- O status de um pedido pode ser: `"Em preparo"`, `"Pronto"` ou `"Entregue"`.
- Projeto idealizado para fins didáticos e práticos.

---
