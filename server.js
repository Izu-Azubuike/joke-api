const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Database (array of objects)
let db = [];

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// POST request handler for adding a joke to the db
app.post('/', (req, res) => {
    const joke = req.body;
    joke.id = db.length + 1; // Generate unique id
    db.push(joke);
    res.json(db);
});

// GET request handler for getting all jokes from the db
app.get('/', (req, res) => {
    res.json(db);
});

// PATCH request handler for updating a joke by id
app.patch('/:id', (req, res) => {
    const id = req.params.id;
    const jokeToUpdate = db.find(joke => joke.id === parseInt(id));
    if (!jokeToUpdate) {
        return res.status(404).json({ message: 'Joke not found' });
    }
    Object.assign(jokeToUpdate, req.body); // Update joke with request body
    res.json(jokeToUpdate);
});

// DELETE request handler for deleting a joke by id
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indexToDelete = db.findIndex(joke => joke.id === parseInt(id));
    if (indexToDelete === -1) {
        return res.status(404).json({ message: 'Joke not found' });
    }
    const deletedJoke = db.splice(indexToDelete, 1)[0];
    res.json(deletedJoke);
});

// Start the server using nodemon
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

