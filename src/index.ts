console.log("✅ script loaded");

const expenseName = document.querySelector("#expenseName") as HTMLInputElement;
const costSpend = document.querySelector("#costSpend") as HTMLInputElement;
let expenseList = document.querySelector("#expenseList") as HTMLUListElement;
const expenseForm = document.querySelector("#expenseForm") as HTMLFormElement;
const totalEl = document.querySelector("#total") as HTMLSpanElement;

interface expenseInter {
  id: number;
  title: string;
  amount: number;
}

let expenses: expenseInter[] = [];

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

  const newExpense: expenseInter = {
    id: Date.now(),
    title: title,
    amount: amount,
  };

  if (!title || isNaN(amount) || amount <= 0) return;

  expenses.push(newExpense);

  renderList();
  updateTotal();
  saveToLocalStorage();

  expenseName.value = "";
  costSpend.value = "";
});
loadLocalStorage();
