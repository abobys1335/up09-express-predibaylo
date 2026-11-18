const express = require('express')

const router = express.Router()

let tasks = [
    {
        id: 1, title: 'Сделать череп_перекрестие-костей', done: false
    },
    {
        id: 2, title: "Растик", done: true
    }
]

router.get("/", (req, res) => {

    res.json(tasks)
})

router.post("/", (req, res) => {
    const { title } = req.body


    
    const task = {
        id: Date.now(),
        title: title.trim(),
        done: false,
    }

    tasks.push(task)

    res.status(201).json(task)
})

router.delete("/:id", (req, res) => {
    const task = tasks.find((el) => el.id == req.params.id)
    if (!task) {
        return res
        .status(404)
        .json({ 'message': `Задача с id: ${req.params.id} не была найдена` })
    }
    tasks = tasks.filter(el => el.id != req.params.id)

    res.status(204).end()
})

router.patch("/:id", (req, res) => {
    const task = tasks.find((el) => el.id == req.params.id)
    if (!task) {
        return res
        .status(404)
        .json({ 'message': `Задача с id: ${req.params.id} не была найдена` })
    }
    taskIndex = tasks.findIndex((el) => el.id == req.params.id)

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body }

    res.json(tasks[taskIndex])
})


router.get("/:id", (req, res) => {
    const task = tasks.find((el) => el.id == req.params.id)
    if (!task) {
        return res
        .status(404)
        .json({ 'message': `Задача с id: ${req.params.id} не была найдена` })
    }
    taskIndex = tasks.find(el => el.id == req.params.id)

    res.json(taskIndex)
})


module.exports = router

