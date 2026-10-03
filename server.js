const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];
let nextId = 3;

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const i = users.findIndex(u => u.id === Number(req.params.id));
  if (i === -1) return res.status(404).json({ error: 'User not found' });
  const [deleted] = users.splice(i, 1);
  res.json(deleted);
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('Server running');
});