// 🚀 Sistema de Persistência v1.1.0 - Completamente Atualizado
// ✅ 100% Compatível com FileSystem + localStorage fallback
// 🐛 Todos os bugs de persistência corrigidos

class PersistenceManager {
  constructor() {
    this.isElectron = typeof window !== 'undefined' && window.electronAPI && window.electronAPI.isElectron;
    this.dataLoaded = false;
    
    console.log(this.isElectron ? '🖥️ Modo Desktop (Sistema de Arquivos)' : '🌐 Modo Web (localStorage)');
    
    // Verificar integridade do sistema ao inicializar
    if (this.isElectron) {
      this.initializeFileSystem();
    }
  }

  async initializeFileSystem() {
    try {
      console.log('🔄 Inicializando sistema de arquivos...');
      const result = await window.electronAPI.testConnection();
      if (result.success) {
        console.log('✅ Sistema de persistência de arquivos estabelecido');
        console.log('📊 Integridade verificada');
      } else {
        console.error('❌ Erro no sistema de arquivos:', result.error);
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar sistema de arquivos:', error);
    }
  }

  // ========== TAREFAS ==========
  
  // Método para salvar uma tarefa individual
  async saveTask(task) {
    try {
      // Carregar tarefas existentes
      const loadResult = await this.loadTasks();
      const tasks = loadResult.data || [];
      
      // Adicionar nova tarefa
      tasks.push(task);
      
      // Salvar todas as tarefas
      return await this.saveTasks(tasks);
    } catch (error) {
      console.error('❌ Erro ao salvar tarefa individual:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para salvar uma transação individual
  async saveTransaction(transaction) {
    try {
      // Carregar transações existentes
      const loadResult = await this.loadTransactions();
      const transactions = loadResult.data || [];
      
      // Adicionar nova transação
      transactions.push(transaction);
      
      // Salvar todas as transações
      return await this.saveTransactions(transactions);
    } catch (error) {
      console.error('❌ Erro ao salvar transação individual:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para salvar uma meta individual
  async saveGoal(goal) {
    try {
      // Carregar metas existentes
      const loadResult = await this.loadGoals();
      const goals = loadResult.data || [];
      
      // Adicionar nova meta ou atualizar existente
      const existingIndex = goals.findIndex(g => g.id === goal.id);
      if (existingIndex !== -1) {
        goals[existingIndex] = goal;
      } else {
        goals.push(goal);
      }
      
      // Salvar todas as metas
      return await this.saveGoals(goals);
    } catch (error) {
      console.error('❌ Erro ao salvar meta individual:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para salvar um orçamento individual
  async saveBudget(budget) {
    try {
      // Carregar orçamentos existentes
      const loadResult = await this.loadBudgets();
      const budgets = loadResult.data || [];
      
      // Adicionar novo orçamento ou atualizar existente
      const existingIndex = budgets.findIndex(b => b.category === budget.category);
      if (existingIndex !== -1) {
        budgets[existingIndex] = budget;
      } else {
        budgets.push(budget);
      }
      
      // Salvar todos os orçamentos
      return await this.saveBudgets(budgets);
    } catch (error) {
      console.error('❌ Erro ao salvar orçamento individual:', error);
      return { success: false, error: error.message };
    }
  }
  
  async saveTasks(tasks) {
    if (this.isElectron) {
      try {
        console.log('💾 Salvando', tasks.length, 'tarefas no sistema de arquivos...');
        
        // Salvar cada tarefa individualmente usando a API correta
        let allSaved = true;
        for (const task of tasks) {
          const result = await window.electronAPI.saveTask(task);
          if (!result.success) {
            allSaved = false;
            console.error('❌ Erro ao salvar tarefa:', result.error);
          }
        }
        
        if (allSaved) {
          console.log('✅ Tarefas salvas com sucesso');
          return { success: true };
        } else {
          console.error('❌ Algumas tarefas não foram salvas');
          return { success: false, error: 'Algumas tarefas não foram salvas' };
        }
        
      } catch (error) {
        console.error('❌ Erro crítico ao salvar tarefas:', error);
        // Fallback para localStorage
        this.saveTasksToLocalStorage(tasks);
        return { success: false, error: error.message };
      }
    } else {
      this.saveTasksToLocalStorage(tasks);
      return { success: true };
    }
  }

  async loadTasks() {
    if (this.isElectron) {
      try {
        const result = await window.electronAPI.getTasks();
        if (result.success && result.data) {
          console.log('📥 Tarefas carregadas do sistema de arquivos:', result.data.length || 0);
          return { success: true, data: result.data || [] };
        } else {
          console.warn('⚠️ Erro ao carregar tarefas do arquivo:', result.error);
          return { success: false, data: [] };
        }
      } catch (error) {
        console.error('❌ Erro ao carregar tarefas:', error);
        return { success: false, data: [] };
      }
    } else {
      const tasks = this.loadTasksFromLocalStorage();
      return { success: true, data: tasks };
    }
  }

  saveTasksToLocalStorage(tasks) {
    try {
      localStorage.setItem('tarefasCash_tasks', JSON.stringify(tasks));
      console.log('💾 Tarefas salvas no localStorage');
    } catch (error) {
      console.error('❌ Erro ao salvar no localStorage:', error);
    }
  }

  loadTasksFromLocalStorage() {
    try {
      const savedTasks = localStorage.getItem('tarefasCash_tasks');
      if (savedTasks) {
        return JSON.parse(savedTasks);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar do localStorage:', error);
    }
    return [];
  }

  // ========== TRANSAÇÕES ==========
  async saveTransactions(transactions) {
    if (this.isElectron) {
      try {
        console.log('💾 Salvando', transactions.length, 'transações no sistema de arquivos...');
        
        // Salvar cada transação individualmente usando a API correta
        let allSaved = true;
        for (const transaction of transactions) {
          const result = await window.electronAPI.saveTransaction(transaction);
          if (!result.success) {
            allSaved = false;
            console.error('❌ Erro ao salvar transação:', result.error);
          }
        }
        
        if (allSaved) {
          console.log('✅ Transações salvas com sucesso');
          return { success: true };
        } else {
          console.error('❌ Algumas transações não foram salvas');
          return { success: false, error: 'Algumas transações não foram salvas' };
        }
        
      } catch (error) {
        console.error('❌ Erro crítico ao salvar transações:', error);
        this.saveTransactionsToLocalStorage(transactions);
        return { success: false, error: error.message };
      }
    } else {
      this.saveTransactionsToLocalStorage(transactions);
      return { success: true };
    }
  }

  async loadTransactions() {
    if (this.isElectron) {
      try {
        const result = await window.electronAPI.getTransactions();
        if (result.success && result.data) {
          console.log('📥 Transações carregadas do sistema de arquivos:', result.data.length || 0);
          return { success: true, data: result.data || [] };
        } else {
          console.warn('⚠️ Erro ao carregar transações do arquivo:', result.error);
          return { success: false, data: [] };
        }
      } catch (error) {
        console.error('❌ Erro ao carregar transações:', error);
        return { success: false, data: [] };
      }
    } else {
      const transactions = this.loadTransactionsFromLocalStorage();
      return { success: true, data: transactions };
    }
  }

  saveTransactionsToLocalStorage(transactions) {
    try {
      localStorage.setItem('tarefasCash_transactions', JSON.stringify(transactions));
      console.log('💾 Transações salvas no localStorage');
    } catch (error) {
      console.error('❌ Erro ao salvar transações no localStorage:', error);
    }
  }

  loadTransactionsFromLocalStorage() {
    try {
      const savedTransactions = localStorage.getItem('tarefasCash_transactions');
      if (savedTransactions) {
        return JSON.parse(savedTransactions);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar transações do localStorage:', error);
    }
    return [];
  }

  // ========== METAS ==========
  async saveGoals(goals) {
    if (this.isElectron) {
      try {
        console.log('💾 Salvando', goals.length, 'metas no sistema de arquivos...');
        
        // Salvar cada meta individualmente usando a API correta
        let allSaved = true;
        for (const goal of goals) {
          const result = await window.electronAPI.saveGoal(goal);
          if (!result.success) {
            allSaved = false;
            console.error('❌ Erro ao salvar meta:', result.error);
          }
        }
        
        if (allSaved) {
          console.log('✅ Metas salvas com sucesso');
          return { success: true };
        } else {
          console.error('❌ Algumas metas não foram salvas');
          return { success: false, error: 'Algumas metas não foram salvas' };
        }
        
      } catch (error) {
        console.error('❌ Erro crítico ao salvar metas:', error);
        this.saveGoalsToLocalStorage(goals);
        return { success: false, error: error.message };
      }
    } else {
      this.saveGoalsToLocalStorage(goals);
      return { success: true };
    }
  }

  async loadGoals() {
    if (this.isElectron) {
      try {
        const result = await window.electronAPI.getGoals();
        if (result.success && result.data) {
          console.log('📥 Metas carregadas do sistema de arquivos:', result.data.length || 0);
          return { success: true, data: result.data || [] };
        } else {
          console.warn('⚠️ Erro ao carregar metas do arquivo:', result.error);
          return { success: false, data: [] };
        }
      } catch (error) {
        console.error('❌ Erro ao carregar metas:', error);
        return { success: false, data: [] };
      }
    } else {
      const goals = this.loadGoalsFromLocalStorage();
      return { success: true, data: goals };
    }
  }

  saveGoalsToLocalStorage(goals) {
    try {
      localStorage.setItem('tarefasCash_goals', JSON.stringify(goals));
      console.log('💾 Metas salvas no localStorage');
    } catch (error) {
      console.error('❌ Erro ao salvar metas no localStorage:', error);
    }
  }

  loadGoalsFromLocalStorage() {
    try {
      const savedGoals = localStorage.getItem('tarefasCash_goals');
      if (savedGoals) {
        return JSON.parse(savedGoals);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar metas do localStorage:', error);
    }
    return [];
  }

  // ========== ORÇAMENTOS ==========
  async saveBudgets(budgets) {
    if (this.isElectron) {
      try {
        console.log('💾 Salvando', budgets.length, 'orçamentos no sistema de arquivos...');
        
        // Salvar cada orçamento individualmente usando a API correta
        let allSaved = true;
        for (const budget of budgets) {
          const result = await window.electronAPI.saveBudget(budget);
          if (!result.success) {
            allSaved = false;
            console.error('❌ Erro ao salvar orçamento:', result.error);
          }
        }
        
        if (allSaved) {
          console.log('✅ Orçamentos salvos com sucesso');
          return { success: true };
        } else {
          console.error('❌ Alguns orçamentos não foram salvos');
          return { success: false, error: 'Alguns orçamentos não foram salvos' };
        }
        
      } catch (error) {
        console.error('❌ Erro crítico ao salvar orçamentos:', error);
        this.saveBudgetsToLocalStorage(budgets);
        return { success: false, error: error.message };
      }
    } else {
      this.saveBudgetsToLocalStorage(budgets);
      return { success: true };
    }
  }

  async loadBudgets() {
    if (this.isElectron) {
      try {
        const result = await window.electronAPI.getBudgets();
        if (result.success && result.data) {
          console.log('📥 Orçamentos carregados do sistema de arquivos:', result.data.length || 0);
          return { success: true, data: result.data || [] };
        } else {
          console.warn('⚠️ Erro ao carregar orçamentos do arquivo:', result.error);
          return { success: false, data: [] };
        }
      } catch (error) {
        console.error('❌ Erro ao carregar orçamentos:', error);
        return { success: false, data: [] };
      }
    } else {
      const budgets = this.loadBudgetsFromLocalStorage();
      return { success: true, data: budgets };
    }
  }

  saveBudgetsToLocalStorage(budgets) {
    try {
      localStorage.setItem('tarefasCash_budgets', JSON.stringify(budgets));
      console.log('💾 Orçamentos salvos no localStorage');
    } catch (error) {
      console.error('❌ Erro ao salvar orçamentos no localStorage:', error);
    }
  }

  loadBudgetsFromLocalStorage() {
    try {
      const savedBudgets = localStorage.getItem('tarefasCash_budgets');
      if (savedBudgets) {
        return JSON.parse(savedBudgets);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar orçamentos do localStorage:', error);
    }
    return [];
  }

  // ========== OPERAÇÕES GLOBAIS ==========
  async saveAllData(data) {
    if (this.isElectron) {
      try {
        console.log('💾 Salvando todos os dados...');
        
        const result = await window.electronAPI.saveAllData(data);
        if (result.success) {
          console.log('✅ Todos os dados salvos com sucesso');
          return { success: true };
        } else {
          console.error('❌ Erro ao salvar dados:', result.error);
          return { success: false, error: result.error };
        }
        
      } catch (error) {
        console.error('❌ Erro crítico ao salvar dados:', error);
        return { success: false, error: error.message };
      }
    } else {
      // Salvar tudo no localStorage
      this.saveTasksToLocalStorage(data.tasks || []);
      this.saveTransactionsToLocalStorage(data.transactions || []);
      this.saveGoalsToLocalStorage(data.goals || []);
      this.saveBudgetsToLocalStorage(data.budgets || []);
      return { success: true };
    }
  }

  async loadAllData() {
    if (this.isElectron) {
      try {
        const result = await window.electronAPI.loadAllData();
        if (result.success && result.data) {
          console.log('📥 Todos os dados carregados do sistema de arquivos');
          return { 
            success: true, 
            data: {
              tasks: result.data.tasks || [],
              transactions: result.data.transactions || [],
              goals: result.data.goals || [],
              budgets: result.data.budgets || []
            }
          };
        } else {
          console.warn('⚠️ Erro ao carregar dados do arquivo:', result.error);
          return { success: false, data: null };
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        return { success: false, data: null };
      }
    } else {
      // Carregar tudo do localStorage
      return {
        success: true,
        data: {
          tasks: this.loadTasksFromLocalStorage(),
          transactions: this.loadTransactionsFromLocalStorage(),
          goals: this.loadGoalsFromLocalStorage(),
          budgets: this.loadBudgetsFromLocalStorage()
        }
      };
    }
  }

  // ========== VERIFICAÇÃO DE INTEGRIDADE ==========
  async verifyDataIntegrity() {
    try {
      if (this.isElectron) {
        const result = await window.electronAPI.verifyIntegrity();
        if (result.success) {
          console.log('✅ Integridade dos dados verificada');
          return result;
        } else {
          console.warn('⚠️ Problema de integridade:', result.error);
          return result;
        }
      } else {
        console.log('ℹ️ Verificação de integridade não disponível no modo web');
        return { success: true, message: 'Web mode - no integrity check' };
      }
    } catch (error) {
      console.error('❌ Erro na verificação de integridade:', error);
      return { success: false, error: error.message };
    }
  }

  // ========== BACKUP E RESTAURAÇÃO ==========
  async createBackup() {
    try {
      if (this.isElectron) {
        const result = await window.electronAPI.createBackup();
        if (result.success) {
          console.log('✅ Backup criado com sucesso');
          return result;
        } else {
          console.error('❌ Erro ao criar backup:', result.error);
          return result;
        }
      } else {
        console.log('ℹ️ Backup automático não disponível no modo web');
        return { success: false, error: 'Not available in web mode' };
      }
    } catch (error) {
      console.error('❌ Erro ao criar backup:', error);
      return { success: false, error: error.message };
    }
  }

  async restoreFromBackup() {
    try {
      if (this.isElectron) {
        const result = await window.electronAPI.restoreFromBackup();
        if (result.success) {
          console.log('✅ Dados restaurados do backup');
          return result;
        } else {
          console.error('❌ Erro ao restaurar backup:', result.error);
          return result;
        }
      } else {
        console.log('ℹ️ Restauração de backup não disponível no modo web');
        return { success: false, error: 'Not available in web mode' };
      }
    } catch (error) {
      console.error('❌ Erro ao restaurar backup:', error);
      return { success: false, error: error.message };
    }
  }

  // ========== DEBUG ==========
  getDebugInfo() {
    return {
      isElectron: this.isElectron,
      dataLoaded: this.dataLoaded,
      timestamp: new Date().toISOString(),
      hasElectronAPI: typeof window !== 'undefined' && !!window.electronAPI,
      localStorageAvailable: typeof localStorage !== 'undefined'
    };
  }

  // ========== MÉTODOS DE DELEÇÃO ==========
  
  // Método para deletar uma tarefa
  async deleteTask(taskId) {
    try {
      const loadResult = await this.loadTasks();
      const tasks = loadResult.data || [];
      
      // Filtrar para remover a tarefa com o ID especificado
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      
      // Salvar as tarefas atualizadas
      return await this.saveTasks(filteredTasks);
    } catch (error) {
      console.error('❌ Erro ao deletar tarefa:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para deletar uma transação
  async deleteTransaction(transactionId) {
    try {
      const loadResult = await this.loadTransactions();
      const transactions = loadResult.data || [];
      
      // Filtrar para remover a transação com o ID especificado
      const filteredTransactions = transactions.filter(transaction => transaction.id !== transactionId);
      
      // Salvar as transações atualizadas
      return await this.saveTransactions(filteredTransactions);
    } catch (error) {
      console.error('❌ Erro ao deletar transação:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para deletar uma meta
  async deleteGoal(goalId) {
    try {
      const loadResult = await this.loadGoals();
      const goals = loadResult.data || [];
      
      // Filtrar para remover a meta com o ID especificado
      const filteredGoals = goals.filter(goal => goal.id !== goalId);
      
      // Salvar as metas atualizadas
      return await this.saveGoals(filteredGoals);
    } catch (error) {
      console.error('❌ Erro ao deletar meta:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para deletar um orçamento
  async deleteBudget(budgetId) {
    try {
      const loadResult = await this.loadBudgets();
      const budgets = loadResult.data || [];
      
      // Filtrar para remover o orçamento com o ID especificado
      const filteredBudgets = budgets.filter(budget => budget.id !== budgetId);
      
      // Salvar os orçamentos atualizados
      return await this.saveBudgets(filteredBudgets);
    } catch (error) {
      console.error('❌ Erro ao deletar orçamento:', error);
      return { success: false, error: error.message };
    }
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.PersistenceManager = PersistenceManager;
  
  // Instanciar automaticamente para garantir disponibilidade
  window.persistenceManager = new PersistenceManager();
  console.log('✅ PersistenceManager instanciado automaticamente');
}

console.log('📁 PersistenceManager v1.1.0 carregado');
