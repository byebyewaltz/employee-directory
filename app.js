import express from "express";
import employees from "#db/employees";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

// /random MUST come before /:id so it isn't captured as an id lookup
app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

app.get("/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === Number(req.params.id));
  if (!employee) {
    return res.status(404).send("There is no employee with that id.");
  }
  res.json(employee);
});

export default app;
