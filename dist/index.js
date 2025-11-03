"use strict";
console.log("✅ script loaded");
const expenseName = document.querySelector("#expenseName");
const costSpend = document.querySelector("#costSpend");
let expenseList = document.querySelector("#expenseList");
const expenseForm = document.querySelector("#expenseForm");
const totalEl = document.querySelector("#total");
let expenses = [];
function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function loadLocalStorage() {
    const data = localStorage.getItem("expenses");
    if (data) {
        expenses = JSON.parse(data);
        renderList();
        updateTotal();
    }
}
function updateTotal() {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    totalEl.textContent = total.toString();
}
function renderList() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
        const contains = document.createElement("div");
        contains.classList.add("btn-container");
        const li = document.createElement("li");
        const delBtn = document.createElement("button");
        li.textContent = `${expense.title}: $ ${expense.amount}`;
        delBtn.textContent = "Delete";
        delBtn.classList.add("btn-del");
        contains.append(li, delBtn);
        expenseList.appendChild(contains);
        delBtn.addEventListener("click", function () {
            expenses = expenses.filter((t) => t.id !== expense.id);
            renderList();
            updateTotal();
            saveToLocalStorage();
        });
    });
}
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = expenseName.value.trim();
    const amount = Number(costSpend.value);
    const newExpense = {
        id: Date.now(),
        title: title,
        amount: amount,
    };
    if (!title || isNaN(amount) || amount <= 0)
        return;
    expenses.push(newExpense);
    renderList();
    updateTotal();
    saveToLocalStorage();
    expenseName.value = "";
    costSpend.value = "";
});
loadLocalStorage();
//# sourceMappingURL=index.js.map