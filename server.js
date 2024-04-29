"use strict";
const express = require("express");
const multer = require("multer");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const app = express();

app.use("/public", express.static("public"));

app.get("/hello", function (req, res) {
  res.type("text");
  res.send("Hello World!");
});

async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'Chinook_Sqlite.sqlite',
    driver: sqlite3.Database,
  });

  return db;
}

app.get("/invoice_items", async (req, res) => {
  let db = await getDBConnection();
  const sqlString = "SELECT * FROM InvoiceLine";
  let rows = await db.all(sqlString);
  res.json(rows);



});

//added delete method
app.delete("/expenses/:id", async function (req, res) {
    let db = await getDBConnection();
    const id = req.params.id;
    const deleteQuery = "DELETE FROM finance_data WHERE id = ?";
    try {
      const delOut = await db.run(deleteQuery, id);
      res.status(200).send("Expense deleted successfully");
    } catch (error) {
      res.status(404).send("Expense id not found");
    }
  });

  app.put("/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const { date, description, amount } = req.body;
    const updateQuery = `UPDATE expenses SET date = ?, description = ?, amount = ? WHERE id = ?`;
  
    try {
        const delOut = await db.run(deleteQuery, id);
        res.status(200).send("Expense deleted successfully");
      } catch (error) {
        res.status(404).send("Expense id not found");
      }
  });

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
