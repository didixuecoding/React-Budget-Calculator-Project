import React, { useState } from "react";
import uuid from "uuid/v4";

import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const initialExpense = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 800 }
];

export default function App() {
  const [expenses, setExpenses] = useState(initialExpense);

  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending:
        <span className="total">
          $
          {expenses.reduce((total, expense) => {
            return (total += expense.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}
