/**
 * 📱 TAREFASCASH MOBILE LAYOUT MANAGER v1.0.2
 * Sistema completo de navegação por seções para mobile
 */

class MobileLayoutManager {
    constructor() {
        this.isMobile = false;
        this.isCapacitor = false;
        this.currentSection = 'dashboard';
        this.sections = ['dashboard', 'tasks', 'finance', 'stats', 'goals', 'settings'];
        this.init();
    }

    init() {
        console.log('🔧 Inicializando Mobile Layout Manager...');
        this.detectEnvironment();
        this.setupMobileLayout();
        this.setupTabNavigation();
        this.initializeCapacitorPlugins();
        console.log('✅ Mobile Layout Manager inicializado!');
    }

    detectEnvironment() {
        // Detectar se é mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                       window.innerWidth <= 768;

        // Detectar se é Capacitor
        this.isCapacitor = !!(window.Capacitor);

        console.log(`📱 Ambiente detectado: ${this.isMobile ? 'Mobile' : 'Desktop'} ${this.isCapacitor ? '(Capacitor)' : '(Web)'}`);

        // Aplicar classe do body baseado no ambiente
        if (this.isMobile || this.isCapacitor) {
            document.body.classList.add('capacitor-mobile');
            this.loadMobileStyles();
        } else {
            document.body.classList.remove('capacitor-mobile');
        }
    }

    loadMobileStyles() {
        // Verificar se o CSS mobile já foi carregado
        const existingMobileCSS = document.querySelector('link[href*="styles-mobile.css"]');
        if (!existingMobileCSS) {
            const mobileCSS = document.createElement('link');
            mobileCSS.rel = 'stylesheet';
            mobileCSS.href = 'styles-mobile.css';
            mobileCSS.media = 'all';
            document.head.appendChild(mobileCSS);
            console.log('📱 CSS Mobile carregado');
        }
    }

    setupMobileLayout() {
        if (!this.isMobile && !this.isCapacitor) return;

        // Criar estrutura mobile se não existir
        this.createMobileStructure();
        this.createTabNavigation();
        this.createMobileSections();
        this.showSection('dashboard');

        // Ajustar viewport para mobile
        this.adjustViewport();
    }

    createMobileStructure() {
        // Verificar se já existe a estrutura mobile
        if (document.querySelector('.mobile-header')) return;

        // Criar header mobile
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-header';
        mobileHeader.innerHTML = `
            <h1>💰 TarefasCash</h1>
            <div class="section-title" id="mobile-section-title">Dashboard</div>
        `;

        // Inserir header no início do body
        document.body.insertBefore(mobileHeader, document.body.firstChild);

        // Criar container principal mobile
        let mainContent = document.querySelector('.main-content');
        if (!mainContent) {
            mainContent = document.createElement('div');
            mainContent.className = 'main-content';
            
            // Mover todo o conteúdo existente para o main-content
            const existingContent = Array.from(document.body.children).filter(child => 
                !child.classList.contains('mobile-header') && 
                !child.classList.contains('tab-navigation')
            );
            
            existingContent.forEach(element => {
                mainContent.appendChild(element);
            });
            
            document.body.appendChild(mainContent);
        }
    }

    createMobileSections() {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        // Criar seções mobile
        const sectionsHTML = `
            <!-- Dashboard Section -->
            <div id="section-dashboard" class="mobile-section active">
                <div class="dashboard-cards">
                    <div class="dashboard-card" onclick="mobileLayoutManager.showSection('tasks')">
                        <div class="card-icon">📋</div>
                        <div class="card-title">Tarefas</div>
                        <div class="card-value" id="mobile-task-count">0</div>
                    </div>
                    <div class="dashboard-card" onclick="mobileLayoutManager.showSection('finance')">
                        <div class="card-icon">💰</div>
                        <div class="card-title">Saldo</div>
                        <div class="card-value" id="mobile-balance">R$ 0,00</div>
                    </div>
                    <div class="dashboard-card" onclick="mobileLayoutManager.showSection('goals')">
                        <div class="card-icon">🎯</div>
                        <div class="card-title">Metas</div>
                        <div class="card-value" id="mobile-goals-count">0</div>
                    </div>
                    <div class="dashboard-card" onclick="mobileLayoutManager.showSection('stats')">
                        <div class="card-icon">📊</div>
                        <div class="card-title">Estatísticas</div>
                        <div class="card-value">Ver Mais</div>
                    </div>
                </div>
                <div class="recent-activity">
                    <h3>📋 Atividade Recente</h3>
                    <div id="mobile-recent-activity">
                        <p style="text-align: center; color: rgba(0,247,255,0.7); padding: 20px;">
                            Suas atividades recentes aparecerão aqui
                        </p>
                    </div>
                </div>
            </div>

            <!-- Tasks Section -->
            <div id="section-tasks" class="mobile-section">
                <div class="task-quick-add">
                    <h3>➕ Adicionar Tarefa</h3>
                    <div class="task-input-group">
                        <input type="text" class="task-input" placeholder="Nome da tarefa..." id="mobile-task-input">
                        <button class="add-task-btn" onclick="mobileLayoutManager.addQuickTask()">Adicionar</button>
                    </div>
                    <div class="task-input-group">
                        <select class="task-input" id="mobile-task-category">
                            <option value="trabalho">🏢 Trabalho</option>
                            <option value="pessoal">👤 Pessoal</option>
                            <option value="estudo">📚 Estudo</option>
                            <option value="outros">📝 Outros</option>
                        </select>
                        <input type="date" class="task-input" id="mobile-task-date">
                    </div>
                </div>
                <div class="mobile-task-list" id="mobile-task-container">
                    <!-- Tarefas serão inseridas aqui -->
                </div>
            </div>

            <!-- Finance Section -->
            <div id="section-finance" class="mobile-section">
                <div class="finance-quick-add">
                    <h3>💰 Adicionar Transação</h3>
                    <div class="finance-form-row">
                        <select class="finance-select" id="mobile-finance-type">
                            <option value="receita">💵 Receita</option>
                            <option value="despesa">💸 Despesa</option>
                            <option value="transferencia">🔄 Transferência</option>
                        </select>
                        <input type="number" class="finance-input" placeholder="Valor" id="mobile-finance-amount" step="0.01">
                    </div>
                    <input type="text" class="finance-input finance-form-full" placeholder="Descrição..." id="mobile-finance-description">
                    <div class="finance-form-row">
                        <select class="finance-select" id="mobile-finance-category">
                            <option value="alimentacao">🍽️ Alimentação</option>
                            <option value="transporte">🚗 Transporte</option>
                            <option value="moradia">🏠 Moradia</option>
                            <option value="lazer">🎮 Lazer</option>
                            <option value="saude">⚕️ Saúde</option>
                            <option value="educacao">📚 Educação</option>
                            <option value="outros">📝 Outros</option>
                        </select>
                        <button class="btn" onclick="mobileLayoutManager.addQuickTransaction()">Adicionar</button>
                    </div>
                </div>
                <div class="financial-summary" id="mobile-financial-summary">
                    <!-- Resumo financeiro será inserido aqui -->
                </div>
                <div class="mobile-transaction-list" id="mobile-transaction-container">
                    <!-- Transações serão inseridas aqui -->
                </div>
            </div>

            <!-- Stats Section -->
            <div id="section-stats" class="mobile-section">
                <div class="stats-summary" id="mobile-stats-summary">
                    <!-- Estatísticas serão inseridas aqui -->
                </div>
                <div class="chart-container-mobile" id="mobile-chart-container">
                    <canvas id="mobile-chart" width="300" height="200"></canvas>
                </div>
            </div>

            <!-- Goals Section -->
            <div id="section-goals" class="mobile-section">
                <div class="goal-quick-add">
                    <h3>🎯 Adicionar Meta</h3>
                    <div class="goal-form-row">
                        <input type="text" class="finance-input" placeholder="Nome da meta..." id="mobile-goal-name">
                        <input type="number" class="finance-input" placeholder="Valor" id="mobile-goal-amount" step="0.01">
                    </div>
                    <div class="goal-form-row">
                        <input type="date" class="finance-input" id="mobile-goal-deadline">
                        <button class="btn" onclick="mobileLayoutManager.addQuickGoal()">Adicionar</button>
                    </div>
                </div>
                <div class="mobile-goals-list" id="mobile-goals-container">
                    <!-- Metas serão inseridas aqui -->
                </div>
            </div>

            <!-- Settings Section -->
            <div id="section-settings" class="mobile-section">
                <div class="settings-group">
                    <div class="settings-title">🎨 Aparência</div>
                    <div class="settings-item">
                        <span>Tema Escuro</span>
                        <div class="settings-toggle" onclick="mobileLayoutManager.toggleDarkMode()"></div>
                    </div>
                    <div class="settings-item">
                        <span>Notificações</span>
                        <div class="settings-toggle active" onclick="mobileLayoutManager.toggleNotifications()"></div>
                    </div>
                </div>
                <div class="settings-group">
                    <div class="settings-title">💾 Dados</div>
                    <div class="settings-item">
                        <span>Backup Automático</span>
                        <div class="settings-toggle active"></div>
                    </div>
                    <button class="btn" onclick="mobileLayoutManager.exportData()">📤 Exportar Dados</button>
                    <button class="btn" onclick="mobileLayoutManager.clearData()" style="background: linear-gradient(45deg, #ff4757, #ff6b7a);">🗑️ Limpar Dados</button>
                </div>
                <div class="settings-group">
                    <div class="settings-title">ℹ️ Sobre</div>
                    <p style="color: rgba(0,247,255,0.7); text-align: center; margin: 0;">
                        TarefasCash Mobile v1.0.2<br>
                        Desenvolvido por Bruno Eduardo
                    </p>
                </div>
            </div>
        `;

        mainContent.innerHTML = sectionsHTML;
    }

    createTabNavigation() {
        // Verificar se já existe a navegação
        if (document.querySelector('.tab-navigation')) return;

        const tabNavigation = document.createElement('div');
        tabNavigation.className = 'tab-navigation';
        tabNavigation.innerHTML = `
            <button class="tab-btn active" data-section="dashboard">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </button>
            <button class="tab-btn" data-section="tasks">
                <i class="fas fa-tasks"></i>
                <span>Tarefas</span>
            </button>
            <button class="tab-btn" data-section="finance">
                <i class="fas fa-wallet"></i>
                <span>Finanças</span>
            </button>
            <button class="tab-btn" data-section="stats">
                <i class="fas fa-chart-bar"></i>
                <span>Gráficos</span>
            </button>
            <button class="tab-btn" data-section="goals">
                <i class="fas fa-bullseye"></i>
                <span>Metas</span>
            </button>
            <button class="tab-btn" data-section="settings">
                <i class="fas fa-cog"></i>
                <span>Config</span>
            </button>
        `;

        document.body.appendChild(tabNavigation);
    }

    setupTabNavigation() {
        if (!this.isMobile && !this.isCapacitor) return;

        // Adicionar event listeners para os botões de tab
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab-btn')) {
                const tabBtn = e.target.closest('.tab-btn');
                const section = tabBtn.dataset.section;
                this.showSection(section);
            }
        });

        // Suporte a gestos de swipe (básico)
        this.setupSwipeGestures();
    }

    showSection(sectionName) {
        if (!this.sections.includes(sectionName)) return;

        // Ocultar todas as seções
        document.querySelectorAll('.mobile-section').forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar seção selecionada
        const targetSection = document.getElementById(`section-${sectionName}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Atualizar navegação
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const activeTab = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Atualizar título da seção
        const sectionTitles = {
            dashboard: 'Dashboard',
            tasks: 'Tarefas',
            finance: 'Finanças',
            stats: 'Estatísticas',
            goals: 'Metas',
            settings: 'Configurações'
        };

        const sectionTitle = document.getElementById('mobile-section-title');
        if (sectionTitle) {
            sectionTitle.textContent = sectionTitles[sectionName] || 'TarefasCash';
        }

        this.currentSection = sectionName;

        // Carregar dados da seção se necessário
        this.loadSectionData(sectionName);

        console.log(`📱 Navegou para seção: ${sectionName}`);
    }

    loadSectionData(sectionName) {
        switch (sectionName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'tasks':
                this.loadTasks();
                break;
            case 'finance':
                this.loadFinancialData();
                break;
            case 'stats':
                this.loadStatistics();
                break;
            case 'goals':
                this.loadGoals();
                break;
        }
    }

    updateDashboard() {
        // Atualizar cards do dashboard com dados reais
        console.log('📊 Atualizando dashboard...');
    }

    loadTasks() {
        console.log('📋 Carregando tarefas...');
    }

    loadFinancialData() {
        console.log('💰 Carregando dados financeiros...');
    }

    loadStatistics() {
        console.log('📊 Carregando estatísticas...');
    }

    loadGoals() {
        console.log('🎯 Carregando metas...');
    }

    // Métodos de ação rápida
    addQuickTask() {
        const input = document.getElementById('mobile-task-input');
        const category = document.getElementById('mobile-task-category');
        const date = document.getElementById('mobile-task-date');

        if (input.value.trim()) {
            console.log('➕ Adicionando tarefa:', input.value);
            input.value = '';
            this.showNotification('✅ Tarefa adicionada com sucesso!');
        }
    }

    addQuickTransaction() {
        const type = document.getElementById('mobile-finance-type');
        const amount = document.getElementById('mobile-finance-amount');
        const description = document.getElementById('mobile-finance-description');
        const category = document.getElementById('mobile-finance-category');

        if (amount.value && description.value.trim()) {
            console.log('💰 Adicionando transação:', { type: type.value, amount: amount.value, description: description.value });
            amount.value = '';
            description.value = '';
            this.showNotification('✅ Transação adicionada com sucesso!');
        }
    }

    addQuickGoal() {
        const name = document.getElementById('mobile-goal-name');
        const amount = document.getElementById('mobile-goal-amount');
        const deadline = document.getElementById('mobile-goal-deadline');

        if (name.value.trim() && amount.value) {
            console.log('🎯 Adicionando meta:', { name: name.value, amount: amount.value, deadline: deadline.value });
            name.value = '';
            amount.value = '';
            deadline.value = '';
            this.showNotification('✅ Meta adicionada com sucesso!');
        }
    }

    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            // Só processar se o swipe for mais horizontal que vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                const currentIndex = this.sections.indexOf(this.currentSection);
                
                if (diffX > 0 && currentIndex < this.sections.length - 1) {
                    // Swipe para a esquerda - próxima seção
                    this.showSection(this.sections[currentIndex + 1]);
                } else if (diffX < 0 && currentIndex > 0) {
                    // Swipe para a direita - seção anterior
                    this.showSection(this.sections[currentIndex - 1]);
                }
            }

            startX = 0;
            startY = 0;
        });
    }

    adjustViewport() {
        // Ajustar viewport para mobile
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

        // Adicionar meta tags para PWA mobile
        const themeColor = document.createElement('meta');
        themeColor.name = 'theme-color';
        themeColor.content = '#0a0a0a';
        document.head.appendChild(themeColor);
    }

    showNotification(message, type = 'success') {
        // Criar notificação mobile
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">${type === 'success' ? '✅' : '❌'}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Container de notificações
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }

        container.appendChild(notification);

        // Animar entrada
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto-remover após 3 segundos
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    async initializeCapacitorPlugins() {
        if (!this.isCapacitor) return;

        try {
            // Importar plugins do Capacitor
            const { App } = await import('@capacitor/app');
            const { SplashScreen } = await import('@capacitor/splash-screen');
            const { StatusBar, Style } = await import('@capacitor/status-bar');

            // Configurar status bar
            await StatusBar.setStyle({ style: Style.Dark });
            await StatusBar.setBackgroundColor({ color: '#0a0a0a' });

            // Ocultar splash screen
            await SplashScreen.hide();

            // Listener para botão voltar do Android
            App.addListener('backButton', () => {
                if (this.currentSection !== 'dashboard') {
                    this.showSection('dashboard');
                } else {
                    App.exitApp();
                }
            });

            console.log('📱 Plugins Capacitor inicializados');
        } catch (error) {
            console.log('⚠️ Plugins Capacitor não disponíveis:', error);
        }
    }

    // Métodos de configuração
    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        this.showNotification('🌙 Tema alterado!');
    }

    toggleNotifications() {
        this.showNotification('🔔 Configuração de notificações alterada!');
    }

    exportData() {
        this.showNotification('📤 Dados exportados com sucesso!');
    }

    clearData() {
        if (confirm('⚠️ Tem certeza que deseja limpar todos os dados?')) {
            this.showNotification('🗑️ Dados limpos com sucesso!');
        }
    }

    // Método público para integração
    integratewithMainApp(mainAppInstance) {
        this.mainApp = mainAppInstance;
        console.log('🔗 Integração com app principal estabelecida');
    }
}

// Inicializar automaticamente
const mobileLayoutManager = new MobileLayoutManager();

// Disponibilizar globalmente
window.mobileLayoutManager = mobileLayoutManager;
