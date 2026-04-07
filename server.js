const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('.'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const users = [
  { id: 1, username: "Otavio", password: "123" },
  { id: 2, username: "aluno", password: "abc" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    username.includes(";") ||
    password.includes(";")
  ) {
    return res.status(400).json({
      message: "Erro 400: Entrada inválida ou caractere não permitido.",
    });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res
      .status(401)
      .json({ message: "Erro 401: Credenciais incorretas." });
  }

  return res.status(200).json({ message: "Login realizado com sucesso!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
