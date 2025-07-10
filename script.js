  // Troca de tema
  const themeSwitcher = document.getElementById("themeSwitcher");
  function setTheme(theme) {
    document.body.classList.remove("theme-default", "theme-sunset", "theme-matrix", "theme-pastel");
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }
  if (themeSwitcher) {
    themeSwitcher.addEventListener("change", (e) => {
      setTheme(e.target.value);
    });
    // Carregar tema salvo
    const savedTheme = localStorage.getItem("theme") || "default";
    themeSwitcher.value = savedTheme;
    setTheme(savedTheme);
  }
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskDueDate = document.getElementById("taskDueDate");
  const addBtn = document.querySelector(".add-btn");
  const syncBtn = document.querySelector(".sync-btn");
  const tasksViews = document.querySelectorAll(".tasks-view"); // Alterado para selecionar todos os .tasks-view
  const filterStatus = document.getElementById("filterStatus");
  const filterCategory = document.getElementById("filterCategory");
  const taskCategory = document.getElementById("taskCategory");
  // const cartaz3 = document.querySelector(".cartaz-3");
  const modalTarefas = document.getElementById("modal-tarefas");
  const closeModalTarefas = document.querySelector(".close-modal-tarefas");
  const valueInput = document.getElementById("valueInput");
  const descriptionInput = document.getElementById("descriptionInput");
  const transactionType = document.getElementById("transactionType");
  const transactionCategory = document.getElementById("transactionCategory");
  const addTransactionBtn = document.querySelector(".add-transaction-btn");
  const balanceElement = document.querySelector(".balance");
  const filterTransactionType = document.getElementById(
    "filterTransactionType"
  );
  const filterTransactionCategory = document.getElementById(
    "filterTransactionCategory"
  );
  // const transactionsView = document.querySelector(".transactions-view");
  const transactionsTimeline = document.querySelector(".transactions-timeline");
  const cartaz2 = document.querySelector(".cartaz-2");
  const toggleTasksBtn = document.querySelector(".toggle-tasks-btn");
  const toggleTransactionsBtn = document.querySelector(
    ".toggle-transactions-btn"
  );
  const goalAmount = document.getElementById("goalAmount");
  const goalDescription = document.getElementById("goalDescription");
  const goalDate = document.getElementById("goalDate");
  const addGoalBtn = document.querySelector(".add-goal-btn");
  const goalsList = document.querySelector(".goals-list");
  const budgetCategory = document.getElementById("budgetCategory");
  const budgetLimit = document.getElementById("budgetLimit");
  const addBudgetBtn = document.querySelector(".add-budget-btn");
  const budgetList = document.querySelector(".budget-list");
  const toggleGoalsBtn = document.querySelector(".toggle-goals-btn");
  const cartazGoals = document.querySelector(".cartaz-goals");
  const savingsBalanceElement = document.querySelector(".savings-balance");
  const transactionsBalanceElement = document.querySelector(
    ".transactions-balance"
  );
  // Elementos do modal de metas
  const modalGoals = document.getElementById("modal-goals");
  const closeModalGoals = document.querySelector(".close-modal-goals");
  const toggleGoalsModalBtn = document.querySelector(".toggle-goals-modal-btn");
  const goalsListModal = document.querySelector(".goals-list-modal");
  // Função para atualizar a lista de metas no modal
  function updateGoalsListModal() {
    if (!goalsListModal) return;
    goalsListModal.innerHTML = "";
    goals.forEach((goal) => {
      const amount = parseFloat(goal.amount) || 0;
      const saved = parseFloat(goal.saved) || 0;
      const progress = (saved / amount) * 100 || 0;
      const remainingDays = Math.ceil(
        (new Date(goal.date) - new Date()) / (1000 * 60 * 60 * 24)
      );
      const goalElement = document.createElement("div");
      goalElement.classList.add("goal-item");
      goalElement.innerHTML = `
        <div>
          <strong>${goal.description}</strong>
          <div>Meta: ${formatCurrency(amount)}</div>
          <div>Poupado: ${formatCurrency(saved)} (${progress.toFixed(1)}%)</div>
          <div>Prazo: ${remainingDays} dias</div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
        </div>
        <div class="goal-actions">
          <button class="add-savings-btn">💵</button>
          <button class="delete-btn">❌</button>
        </div>
      `;
      // Botão de adicionar poupança
      const addSavingsBtn = goalElement.querySelector(".add-savings-btn");
      addSavingsBtn.addEventListener("click", () => {
        const amount = parseFloat(prompt("Quanto você quer adicionar à poupança?"));
        if (!isNaN(amount) && amount > 0) {
          const transaction = {
            id: Date.now(),
            value: amount,
            description: `Poupança para ${goal.description}`,
            type: "saldo",
            category: "saldo",
            date: new Date().toLocaleDateString(),
          };
          transactions.push(transaction);
          goal.saved += amount;
          updateFinancialSummary();
          updateTransactionsView();
          updateGoalsList();
          updateGoalsListModal();
        }
      });
      // Botão de deletar meta
      const deleteBtn = goalElement.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir esta meta?")) {
          goals = goals.filter((g) => g.id !== goal.id);
          updateGoalsList();
          updateGoalsListModal();
        }
      });
      goalsListModal.appendChild(goalElement);
    });
    if (goals.length === 0) {
      goalsListModal.innerHTML = '<p class="no-goals">Nenhuma meta cadastrada</p>';
    }
  }
  // Abrir modal de metas
  if (toggleGoalsModalBtn) {
    toggleGoalsModalBtn.addEventListener("click", () => {
      modalGoals.classList.add("open");
      updateGoalsListModal();
    });
  }

  // Abrir modal de tarefas
  if (toggleTasksBtn) {
    toggleTasksBtn.addEventListener("click", () => {
      modalTarefas.classList.add("open");
      updateTasksView();
      toggleTasksBtn.textContent = "Ocultar Tarefas";
    });
  }

  // Fechar modal de tarefas
  if (closeModalTarefas) {
    closeModalTarefas.addEventListener("click", () => {
      modalTarefas.classList.remove("open");
      toggleTasksBtn.textContent = "Visualizar Tarefas";
    });
  }
  if (modalTarefas) {
    modalTarefas.addEventListener("click", (e) => {
      if (e.target === modalTarefas) {
        modalTarefas.classList.remove("open");
        toggleTasksBtn.textContent = "Visualizar Tarefas";
      }
    });
  }

  // Fechar modal de metas
  if (closeModalGoals) {
    closeModalGoals.addEventListener("click", () => {
      modalGoals.classList.remove("open");
    });
  }
  if (modalGoals) {
    modalGoals.addEventListener("click", (e) => {
      if (e.target === modalGoals) {
        modalGoals.classList.remove("open");
      }
    });
  }

  let tasks = [];
  let transactions = [];
  let goals = [];
  let budgets = [];


  function addTask(taskText) {
    const text = taskText || taskInput.value.trim();
    if (!text) {
      alert("Digite uma tarefa!");
      return;
    }
    const task = {
      id: Date.now(),
      text: text,
      date: new Date().toLocaleDateString(),
      dueDate: taskDueDate.value || "",
      completed: false,
      category: taskCategory.value || "outros",
    };
    tasks.push(task);
    updateTasksView();
    taskInput.value = "";
    taskDueDate.value = "";
    taskCategory.value = "";
  }
  // Adiciona tarefa ao clicar no botão
  addBtn.addEventListener("click", () => {
    addTask();
  });

  function updateTasksView() {
    // Só mostra tarefas no modal
    const modalTasksView = document.querySelector('#modal-tarefas .tasks-view');
    if (!modalTasksView) return;
    modalTasksView.innerHTML = "";
    const filterStatusValue = filterStatus.value;
    const filterCategoryValue = filterCategory.value;
    tasks
      .filter((task) => {
        if (filterStatusValue === "ativas" && task.completed) return false;
        if (filterStatusValue === "concluidas" && !task.completed) return false;
        if (filterCategoryValue && task.category !== filterCategoryValue) return false;
        return true;
      })
      .forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        const daysLeft = task.dueDate
          ? Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
          : null;
        if (daysLeft !== null) {
          if (daysLeft < 0) {
            taskElement.classList.add("task-overdue");
          } else if (daysLeft <= 2) {
            taskElement.classList.add("task-urgent");
          } else if (daysLeft <= 5) {
            taskElement.classList.add("task-warning");
          }
        }
        taskElement.innerHTML = `
          <div class="task-content ${task.completed ? "completed" : ""}">
            <input type="checkbox" ${task.completed ? "checked" : ""} />
            <span class="task-text">${task.text}</span>
            <span class="task-category">${task.category}</span>
            ${
              task.dueDate
                ? `<span class="task-due-date ${daysLeft < 0 ? "overdue" : ""}">
                    ${daysLeft < 0 ? "Atrasada" : daysLeft === 0 ? "Hoje" : daysLeft === 1 ? "Amanhã" : `${daysLeft} dias`}
                  </span>`
                : ""
            }
            <span class="task-date">${task.date}</span>
          </div>
          <div class="task-actions">
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">❌</button>
          </div>
        `;
        const checkbox = taskElement.querySelector('input[type="checkbox"]');
        checkbox.addEventListener("change", () => {
          task.completed = checkbox.checked;
          taskElement.classList.toggle("completed");
          updateTasksView();
        });
        const editBtn = taskElement.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
          const spanElement = taskElement.querySelector(".task-text");
          const currentText = spanElement.textContent;
          const inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.value = currentText;
          inputElement.classList.add("edit-input");
          const saveBtn = document.createElement("button");
          saveBtn.classList.add("save-btn");
          saveBtn.textContent = "💾";
          spanElement.replaceWith(inputElement);
          editBtn.replaceWith(saveBtn);
          saveBtn.addEventListener("click", () => {
            const newText = inputElement.value.trim();
            if (newText) {
              task.text = newText;
              updateTasksView();
            }
          });
        });
        const deleteBtn = taskElement.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
          tasks = tasks.filter((t) => t.id !== task.id);
          updateTasksView();
        });
        modalTasksView.appendChild(taskElement);
      });
  }

  function addTransaction() {
    const value = parseFloat(valueInput.value);
    const description = descriptionInput.value.trim();
    const category = transactionCategory.value;

    if (isNaN(value) || value <= 0) {
      alert("Por favor, insira um valor válido maior que zero");
      return;
    }

    if (!category) {
      alert("Por favor, selecione uma categoria");
      return;
    }

    const transaction = {
      id: Date.now(),
      value: value,
      description: description || "...",
      type: transactionType.value,
      category: category,
      date: new Date().toLocaleDateString(),
    };

    transactions.push(transaction);
    updateFinancialSummary();
    updateTransactionsView();
    clearTransactionForm();
  }

  function updateFinancialSummary() {
    const summary = transactions.reduce(
      (acc, transaction) => {
        const value = transaction.value;

        if (transaction.type === "saldo" && transaction.category === "saldo") {
          acc.savings += value;
        } else {
          if (transaction.type === "saldo" || transaction.type === "receita") {
            acc.transactions += value;
          } else if (transaction.type === "despesa") {
            acc.transactions -= value;
          }
        }
        return acc;
      },
      { savings: 0, transactions: 0 }
    );

    const totalBalance = summary.savings + summary.transactions;

    balanceElement.textContent = formatCurrency(totalBalance);
    savingsBalanceElement.textContent = formatCurrency(summary.savings);
    transactionsBalanceElement.textContent = formatCurrency(
      summary.transactions
    );

    balanceElement.style.color = totalBalance >= 0 ? "#28a745" : "#dc3545";
    savingsBalanceElement.style.color =
      summary.savings >= 0 ? "#28a745" : "#dc3545";
    transactionsBalanceElement.style.color =
      summary.transactions >= 0 ? "#28a745" : "#dc3545";
  }

  function formatCurrency(value) {
    if (value === undefined || value === null || isNaN(value)) {
      return "R$ 0,00";
    }

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function clearTransactionForm() {
    valueInput.value = "";
    descriptionInput.value = "";
    transactionType.value = "receita";
    transactionCategory.value = "";
  }

  function updateTransactionsView() {
    if (!transactionsTimeline) return;
    transactionsTimeline.innerHTML = "";

    const typeFilter = filterTransactionType.value;
    const categoryFilter = filterTransactionCategory.value;

    const filteredTransactions = transactions.filter((transaction) => {
      const matchesType =
        typeFilter === "todas" || transaction.type === typeFilter;
      const matchesCategory =
        !categoryFilter || transaction.category === categoryFilter;
      return matchesType && matchesCategory;
    });

    if (filteredTransactions.length === 0) {
      transactionsTimeline.innerHTML = "<p style='text-align:center;color:#aaa;'>Nenhuma transação encontrada</p>";
      return;
    }

    filteredTransactions.forEach((transaction) => {
      const transactionElement = document.createElement("div");
      transactionElement.classList.add("transaction-item", transaction.type);

      // Ícone por tipo
      let icon = '';
      if (transaction.type === 'receita') icon = '💸';
      else if (transaction.type === 'despesa') icon = '🛒';
      else if (transaction.type === 'saldo') icon = '🏦';

      transactionElement.innerHTML = `
        <div class="transaction-content">
          <span class="transaction-icon">${icon}</span>
          <span class="transaction-value ${transaction.type}">
            ${formatCurrency(transaction.value)}
          </span>
        </div>
        <div class="transaction-meta">
          <span class="transaction-description">${transaction.description}</span><br>
          <span class="transaction-category">${transaction.category}</span> |
          <span class="transaction-date">${transaction.date}</span>
        </div>
        <div class="transaction-actions">
          <button class="delete-transaction-btn" title="Excluir">✖</button>
        </div>
      `;

      const deleteBtn = transactionElement.querySelector(
        ".delete-transaction-btn"
      );
      deleteBtn.addEventListener("click", () => {
        transactions = transactions.filter((t) => t.id !== transaction.id);
        updateFinancialSummary();
        updateTransactionsView();
      });

      transactionsTimeline.appendChild(transactionElement);
    });
  }

  function addGoal() {
    const amount = parseFloat(goalAmount.value);
    const description = goalDescription.value.trim();
    const date = goalDate.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Por favor, insira um valor válido maior que zero");
      return;
    }

    if (!description) {
      alert("Por favor, insira uma descrição para a meta");
      return;
    }

    if (!date) {
      alert("Por favor, selecione uma data");
      return;
    }

    const goal = {
      id: Date.now(),
      amount: Number(amount),
      description,
      date,
      saved: 0,
    };

    goals.push(goal);
    updateGoalsList();
    clearGoalForm();
  }

  function addBudget() {
    const category = budgetCategory.value;
    const limit = parseFloat(budgetLimit.value);

    if (!category || isNaN(limit) || limit <= 0) {
      alert("Por favor, selecione uma categoria e defina um limite válido");
      return;
    }

    const existingBudget = budgets.find((b) => b.category === category);
    if (existingBudget) {
      existingBudget.limit = limit;
    } else {
      budgets.push({
        id: Date.now(),
        category,
        limit,
        spent: 0,
      });
    }

    updateBudgetList();
    clearBudgetForm();
  }

  function updateGoalsList() {
    if (!goalsList) return;
    goalsList.innerHTML = "";
    goals.forEach((goal) => {
      const amount = parseFloat(goal.amount) || 0;
      const saved = parseFloat(goal.saved) || 0;
      const progress = (saved / amount) * 100 || 0;

      const remainingDays = Math.ceil(
        (new Date(goal.date) - new Date()) / (1000 * 60 * 60 * 24)
      );

      const goalElement = document.createElement("div");
      goalElement.classList.add("goal-item");
      goalElement.innerHTML = `
        <div>
          <strong>${goal.description}</strong>
          <div>Meta: ${formatCurrency(amount)}</div>
          <div>Poupado: ${formatCurrency(saved)} (${progress.toFixed(1)}%)</div>
          <div>Prazo: ${remainingDays} dias</div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
        </div>
        <div class="goal-actions">
          <button class="add-savings-btn">💵</button>
          <button class="delete-btn">❌</button>
        </div>
      `;

      const addSavingsBtn = goalElement.querySelector(".add-savings-btn");
      const deleteBtn = goalElement.querySelector(".delete-btn");

      addSavingsBtn.addEventListener("click", () => {
        const amount = parseFloat(
          prompt("Quanto você quer adicionar à poupança?")
        );
        if (!isNaN(amount) && amount > 0) {
          const transaction = {
            id: Date.now(),
            value: amount,
            description: `Poupança para ${goal.description}`,
            type: "saldo",
            category: "saldo",
            date: new Date().toLocaleDateString(),
          };

          transactions.push(transaction);
          goal.saved += amount;

          updateFinancialSummary();
          updateTransactionsView();
          updateGoalsList();
        }
      });

      deleteBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir esta meta?")) {
          goals = goals.filter((g) => g.id !== goal.id);
          updateGoalsList();
        }
      });

      goalsList.appendChild(goalElement);
    });

    if (goals.length === 0) {
      goalsList.innerHTML = '<p class="no-goals">Nenhuma meta cadastrada</p>';
    }
  }

  function updateBudgetList() {
    budgetList.innerHTML = "";
    budgets.forEach((budget) => {
      const spent = transactions
        .filter((t) => t.category === budget.category && t.type === "despesa")
        .reduce((sum, t) => sum + t.value, 0);

      const progress = (spent / budget.limit) * 100;
      const progressClass =
        progress >= 100 ? "danger" : progress >= 80 ? "warning" : "";

      const budgetElement = document.createElement("div");
      budgetElement.classList.add("budget-item");
      budgetElement.innerHTML = `
        <div>
          <strong>${budget.category}</strong>
          <div>Limite: ${formatCurrency(budget.limit)}</div>
          <div>Gasto: ${formatCurrency(spent)} (${progress.toFixed(1)}%)</div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill ${progressClass}" style="width: ${progress}%"></div>
            </div>
          </div>
        </div>
        <div class="budget-actions">
          <button class="add-expense-btn">💰</button>
          <button class="delete-btn">❌</button>
        </div>
      `;

      budgetList.appendChild(budgetElement);

      const addExpenseBtn = budgetElement.querySelector(".add-expense-btn");
      addExpenseBtn.addEventListener("click", () => {
        const amount = parseFloat(prompt("Qual o valor do gasto?"));
        if (!isNaN(amount) && amount > 0) {
          const transaction = {
            id: Date.now(),
            value: amount,
            description: `Gasto em ${budget.category}`,
            type: "despesa",
            category: budget.category,
            date: new Date().toLocaleDateString(),
          };

          transactions.push(transaction);
          updateFinancialSummary();
          updateTransactionsView();
          updateBudgetList();
        }
      });

      budgetElement
        .querySelector(".delete-btn")
        .addEventListener("click", () => {
          if (confirm("Tem certeza que deseja excluir este orçamento?")) {
            budgets = budgets.filter((b) => b.id !== budget.id);
            updateBudgetList();
          }
        });
    });
  }

  function clearGoalForm() {
    goalAmount.value = "";
    goalDescription.value = "";
    goalDate.value = "";
  }

  function clearBudgetForm() {
    budgetCategory.value = "";
    budgetLimit.value = "";
  }

  // Add at the end of the file
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize event listeners
    addBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = "";
      }
    });

    addTransactionBtn.addEventListener("click", addTransaction);
    addGoalBtn.addEventListener("click", addGoal);
    addBudgetBtn.addEventListener("click", addBudget);

    toggleTransactionsBtn.addEventListener("click", () => {
      cartaz2.classList.toggle("visible");
      toggleTransactionsBtn.textContent = cartaz2.classList.contains("visible")
        ? "Ocultar Transações"
        : "Consultar Transações";
    });

    toggleGoalsBtn.addEventListener("click", () => {
      cartazGoals.classList.toggle("visible");
    });
    addBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = "";
      }
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
      }
    });
    // Load saved data
    loadTasksFromLocalStorage();
    loadTransactions();
    loadGoalsAndBudgets();

    // Initial updates
    updateTasksView();
    updateTransactionsView();
    updateFinancialSummary();
    updateGoalsList();
    updateBudgetList();
  });

  // Remove everything after the closing bracket of DOMContentLoaded
  syncBtn.addEventListener("click", () => {
    syncBtn.style.transform = "rotate(360deg)";
    setTimeout(() => {
      syncBtn.style.transform = "rotate(0)";
      updateTasksView();
    }, 1000);
  });


  // Removido botão de tarefas, todas funções agora no botão de metas

  filterStatus.addEventListener("change", updateTasksView);
  filterCategory.addEventListener("change", updateTasksView);

  // Removido: Visualizar tarefas com Enter

  addTransactionBtn.addEventListener("click", addTransaction);

  valueInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTransaction();
    }
  });

  toggleTransactionsBtn.addEventListener("click", () => {
    const isVisible = cartaz2.classList.contains("visible");
    cartaz2.classList.toggle("visible");
    toggleTransactionsBtn.textContent = isVisible
      ? "Consultar Transações"
      : "Ocultar Consulta";

    if (!isVisible) {
      updateTransactionsView();
    }
  });

  filterTransactionType.addEventListener("change", updateTransactionsView);
  filterTransactionCategory.addEventListener("change", updateTransactionsView);

  addGoalBtn.addEventListener("click", () => {
    addGoal();
  });

  goalAmount.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      goalDescription.focus();
    }
  });

  goalDescription.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      goalDate.focus();
    }
  });

  goalDate.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addGoal();
    }
  });

  addBudgetBtn.addEventListener("click", addBudget);

  toggleGoalsBtn.addEventListener("click", () => {
    const isVisible = cartazGoals.classList.contains("visible");
    cartazGoals.classList.toggle("visible");
    toggleGoalsBtn.textContent = isVisible
      ? "Metas e Orçamentos"
      : "Ocultar Metas";

    if (!isVisible) {
      updateGoalsList();
      updateBudgetList();
    }
  });

  // Inicializa a visualização das tarefas ao carregar a página
  updateTasksView();
});
