import express from "express";
const app = express();
app.use(express.json());

let clientes = [
    {
        id: 1,
        nome: "Meriadoc"
    },
    {
        id: 2,
        nome: "Peregrin"
    }
];

function listarCliente(id) {
    return clientes.findIndex(cliente => cliente.id === Number(id));
}

app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a API João Vidal");
});

app.get('/listar', (req, res) => {
    res.status(200).json(clientes);
});

app.get('/listar/:id', (req, res) => {
    const index = listarCliente(req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json(clientes[index]);
});

app.post('/cadastrar', (req, res) => {
    clientes.push(req.body);
    res.status(201).send('Cliente cadastrado com sucesso!');
});

app.put('/editar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    const cliente = clientes.find(cliente => cliente.id === id);

    if (!cliente) {
        return res.status(404).send(`Cliente com id "${id}" não encontrado`);
    }
    cliente.nome = nome;
    res.status(200).send(`Dados do cliente com id "${id}" atualizados com sucesso`);
});

app.delete('/remover/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (clientes.some(cliente => cliente.id === id)) {
        clientes = clientes.filter(cliente => cliente.id !== id);
        res.status(200).send(`Dados do cliente com id "${id}" removidos com sucesso`);
    } else {
        res.status(404).send(`Cliente com id "${id}" não encontrado`);
    }
});

export default app;