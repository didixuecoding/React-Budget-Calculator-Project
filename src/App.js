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
  // *** state values ***//
  // all expense, add expense
  const [expenses, setExpenses] = useState(initialExpense);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  // *** helper functions ***//
  // handle Alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };
  //handle charge
  const handleCharge = e => {
    console.log(`charge : ${e.target.value}`);
    setCharge(e.target.value);
  };
  //handle amount
  const handleAmount = e => {
    console.log(`amount : ${e.target.value}`);
    setAmount(e.target.value);
  };
  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      setCharge("");
      setAmount("");
      handleAlert({ type: "success", text: "item added" });
    } else {
      // handle alert call
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount has to be greater than zero`
      });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending:
        <span className="total">
          $
          {expenses.reduce((total, expense) => {
            return (total += parseInt(expense.amount, 10));
          }, 0)}
        </span>
      </h1>
    </>
  );
}
