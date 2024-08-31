const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');

// CREATE
router.post('/livros', async (req, res) => {
    const livro = new Livro(req.body);
    try {
        await livro.save();
        res.status(201).send(livro);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ ALL
router.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.status(200).send(livros);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ ONE
router.get('/livros/:id', async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);
        if (!livro) {
            return res.status(404).send();
        }
        res.status(200).send(livro);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE
router.put('/livros/:id', async (req, res) => {
    try {
        const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!livro) {
            return res.status(404).send();
        }
        res.status(200).send(livro);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE
router.delete('/livros/:id', async (req, res) => {
    try {
        const livro = await Livro.findByIdAndDelete(req.params.id);
        if (!livro) {
            return res.status(404).send();
        }
        res.status(200).send(livro);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
