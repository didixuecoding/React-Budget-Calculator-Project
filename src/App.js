import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";

import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

// const initialExpense = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car payment", amount: 400 },
//   { id: uuid(), charge: "credit card bill", amount: 800 }
// ];

const initialExpense = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

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
  //  edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // *** useEffect *** //
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

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
    setCharge(e.target.value);
  };
  //handle amount
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      // handle alert call
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount has to be greater than zero`
      });
    }
  };
  // handle clear all
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  // handle delete
  const handleDelete = id => {
    let filteredExpenses = expenses.filter(item => item.id !== id);
    setExpenses(filteredExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // handle edit
  const handleEdit = id => {
    let editedExpense = expenses.find(item => item.id === id);
    let { charge, amount } = editedExpense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
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
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
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
