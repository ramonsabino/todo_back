const { response, request } = require("express");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const allTodos = [{ name: "aaaa", status: false }];
const todosRoutes = express.Router();

// CREATE
todosRoutes.post("/todos", async (req, res) => {
  const { name } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name,
    },
  });

  return res.status(201).json(todo);
});

// READ
todosRoutes.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  console.log(todos);
  return res.status(200).json(todos);
});

// UPDATE
todosRoutes.put("/todos", async (req, res) => {
  const { name, id, status } = req.body;

  if (!id) {
    return res.status(400).json("Id required");
  }

  const todoAlreadyExists = await prisma.todo.findUnique({ where: { id } });

  if (!todoAlreadyExists) {
    return res.status(404).json("Todo not found");
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });
  return res.status(200).json(todo);
});

// DELETE
todosRoutes.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const intId = parseInt(id);

  if (!intId) {
    return res.status(400).json("Id required");
  }

  const todoAlreadyExists = await prisma.todo.findUnique({
    where: { id: intId },
  });

  if (!todoAlreadyExists) {
    return res.status(404).json("Todo not found");
  }

  await prisma.todo.delete({ where: { id: intId } });
  return res.status(204).send();
});

module.exports = todosRoutes;
