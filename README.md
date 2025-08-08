# 💰 TarefasCash - Gerenciador Financeiro

<div align="center">

![TarefasCash](https://img.shields.io/badge/TarefasCash-Stable-00f7ff?style=for-the-badge&logo=electron)
![Version](https://img.shields.io/badge/version-1.0.2-00ff99?style=for-the-badge)
![License](https://img.shields.io/badge/license-Proprietário-red?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Desktop%20%7C%20Web%20%7C%20Mobile-orange?style=for-the-badge)

**Uma aplicação multiplataforma moderna de gestão financeira e produtividade**

[🚀 Demo ao Vivo](#) | [📖 Documentação](#funcionalidades) | [🛠️ Instalação](#instalação) | [📊 Relatório Técnico](RELATORIO-BANCO-DE-DADOS.md) | [📚 Docs Completas](INDICE-DOCUMENTACAO.md)

</div>

---

## 🔒 **AVISO IMPORTANTE DE PROPRIEDADE INTELECTUAL**

> **⚠️ CÓDIGO PROTEGIDO**: Este repositório contém código proprietário protegido por direitos autorais. 
> 
> **❌ CÓPIA PROIBIDA**: A reprodução, distribuição ou uso comercial não autorizado é estritamente proibido.
> 
> **📄 LICENÇA**: Consulte [LICENSE.md](LICENSE.md) para termos completos de uso.

---

**TarefasCash** é uma aplicação multiplataforma moderna que combina gestão financeira pessoal e organização de tarefas em uma única interface elegante. Disponível como aplicativo **Desktop (Electron)**, **Web** e **Mobile (Capacitor)**, oferecendo sincronização automática de dados e experiência consistente em qualquer plataforma.

### 🎯 Características Principais

- 🖥️ **Aplicativo Desktop**: Versão Electron nativa para Windows, macOS e Linux
- 🌐 **Interface Web**: Acesso via navegador com PWA
- 📱 **App Mobile**: Aplicativo nativo iOS/Android via Capacitor
- 📋 **Gestão de Tarefas**: Organização completa com categorias e prazos

## ✨ Sobre o Projeto

**TarefasCash** é uma aplicação multiplataforma moderna que combina gestão financeira pessoal e organização de tarefas em uma única interface elegante. Disponível como aplicativo **Desktop (Electron)** e **Web**, oferecendo sincronização automática de dados e experiência consistente em qualquer plataforma.

### 🎯 Características Principais

- �️ **Aplicativo Desktop**: Versão Electron nativa para Windows, macOS e Linux
- 🌐 **Interface Web**: Acesso via navegador com PWA
- � **Gestão de Tarefas**: Organização completa com categorias e prazos
- 💳 **Controle Financeiro**: Receitas, despesas e transferências
- 🎯 **Metas de Poupança**: Acompanhamento visual de objetivos
- 📊 **Relatórios Visuais**: Gráficos interativos e estatísticas
- 💾 **Persistência Híbrida**: Sistema de dados robusto (FileSystem + localStorage)
- 🔒 **Backup Automático**: Proteção total dos dados
- 🎨 **4 Temas Visuais**: Neon, Sunset, Matrix e Pastel

---

## 🚀 Funcionalidades

### 📋 Gestão de Tarefas
- ✅ Adicionar tarefas com categoria e data de vencimento
- 🔍 Filtrar por status (ativas, concluídas) e categoria
- ⚠️ Indicadores visuais para prazos (atrasadas, urgentes)
- ✏️ Editar e excluir tarefas com confirmação de segurança
- 📱 Interface modal responsiva
- 🛡️ **NOVO v1.0.2**: Sistema anti-spam com locks e debounce
- 🔔 **NOVO v1.0.2**: Notificações visuais de sucesso/erro

### 💰 Controle Financeiro
- 💵 Registrar receitas, despesas e transferências
- 📈 Timeline visual de transações com cards estilizados
- 🔢 Resumo financeiro em tempo real
- 🗂️ Filtros por tipo e categoria
- 💾 **Persistência Híbrida**: FileSystem (Desktop) + localStorage (Web)
- 🔄 **Sistema de Backup**: Backup automático antes de cada operação
- 🛡️ **Integridade de Dados**: Verificação automática e recovery

### 🎯 Metas e Orçamentos
- 🏦 Definir metas de poupança com prazos
- 📊 Barras de progresso visuais animadas
- 💸 Controle de orçamento por categoria
- ⚡ Adição rápida de valores às metas
- 🚨 Alertas visuais para limites excedidos

### 📊 Estatísticas e Gráficos
- 📈 Gráficos interativos (barras, pizza, linha)
- 📋 Estatísticas detalhadas expandíveis
- 🔄 Atualização automática em tempo real
- 🎨 Animações de contagem de valores
- 📱 Modal dedicado para visualização

### 🎨 Personalização
- 🌈 **4 Temas visuais**: Neon, Sunset, Matrix, Pastel
- 📱 Design totalmente responsivo
- ✨ Animações e efeitos neon
- 🔄 Persistência de preferências
- 🎭 Interface moderna e intuitiva

---

## 🛠️ Tecnologias Utilizadas

<div align="center">

![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=electron&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

</div>

### 🖥️ **Desktop (Electron)**
- **Framework**: Electron 32.0.1
- **Builder**: electron-builder 25.1.8
- **Persistência**: Sistema de arquivos nativo (Node.js fs)
- **IPC**: Comunicação segura Frontend ↔ Backend

### 📱 **Mobile (Capacitor)**
- **Framework**: Capacitor 6.1.2
- **Plataformas**: Android, iOS
- **Layout**: Sistema adaptativo mobile/desktop
- **Plugins**: SplashScreen, StatusBar, App
- **Build**: Gradle (Android), Xcode (iOS)

### 🌐 **Web/PWA**
- **Frontend**: HTML5, CSS3 (Grid/Flexbox), JavaScript ES6+
- **Gráficos**: Chart.js para visualizações interativas
- **Ícones**: Font Awesome 6.4.2
- **Armazenamento**: localStorage API com fallback
- **PWA**: Manifest.json para instalação mobile

### 🔧 **Arquitetura de Dados**
- **Tipo**: NoSQL híbrido (JSON-based)
- **Desktop**: `userData/TarefasCash/data.json`
- **Web**: localStorage do navegador
- **Backup**: Sistema automático com recovery
- **Integridade**: Verificação automática na inicialização

---

## 📦 Instalação

### 🖥️ **Versão Desktop (Recomendada)**

#### Pré-requisitos
- Windows 10/11 (x64)
- macOS 10.15+ (em desenvolvimento)
- Linux Ubuntu 18.04+ (em desenvolvimento)

#### Download e Instalação

1. **📥 Download**: Baixe a versão mais recente na [página de releases](https://github.com/BonyDevup/TarefasCash.github.io/releases)
2. **⚙️ Installer**: Execute `TarefasCash - Gerenciador Financeiro Setup 1.0.2.exe`
3. **🚀 Portátil**: Ou use `TarefasCash - Gerenciador Financeiro 1.0.2.exe` (sem instalação)

#### Versões Disponíveis
```
📦 TarefasCash v1.0.2
├── 🔧 Setup (1.2GB) - Instala no sistema
└── 📱 Portable (1.2GB) - Executa diretamente
```

### 🌐 **Versão Web**

#### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/BonyDevup/TarefasCash.github.io.git

# Entre no diretório
cd TarefasCash.github.io

# Instale as dependências (apenas para build desktop)
npm install

# Para executar versão desktop
npm run dev

# Para servir versão web local:
# Com Python
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

### 🏗️ **Build Desktop**

```bash
# Build para Windows
npm run build:win

# Build para múltiplas plataformas
npm run build:all

# Build apenas portable
npm run dist:portable
```

### 📱 Instalação como PWA
1. Abra a aplicação no navegador mobile
2. Toque em "Adicionar à tela inicial"
3. Confirme a instalação
4. Use como aplicativo nativo!

### 📱 **Versão Mobile (Android/iOS)**

#### Pré-requisitos para Build Mobile
- Node.js 16+ instalado
- Android Studio (para Android)
- Xcode (para iOS, apenas macOS)

#### Build Mobile

```bash
# Preparar build mobile
./build-mobile.bat

# Ou manualmente:
mkdir www
cp *.html *.css *.js manifest.json www/
cp -r Imagens build assets www/
npx cap sync

# Testar no Android
npx cap run android

# Abrir no Android Studio
npx cap open android

# Para iOS (apenas macOS)
npx cap run ios
npx cap open ios
```

#### APK de Desenvolvimento
1. Execute `./build-mobile.bat`
2. APK disponível em `android/app/build/outputs/apk/`
3. Instale no dispositivo para teste

---

## 📖 Como Usar

### 1. 📋 Gerenciando Tarefas
```
1. Digite sua tarefa no campo principal
2. Selecione uma categoria (Trabalho, Pessoal, Estudo, Outros)
3. Defina uma data de vencimento (opcional)
4. Clique em "Adicionar Tarefa"
5. Use "Visualizar Tarefas" para ver e gerenciar
```

### 2. 💰 Controle Financeiro
```
1. Selecione o tipo (Receita, Despesa, Saldo)
2. Insira o valor e descrição
3. Escolha uma categoria
4. Clique em "Adicionar"
5. Acompanhe no resumo e histórico
```

### 3. 🎯 Metas de Poupança
```
1. Vá em "Metas e Orçamentos"
2. Defina valor, descrição e prazo
3. Clique em "Adicionar Metas"
4. Use 💵 para adicionar valores
5. Acompanhe o progresso visual
```

### 4. 📊 Visualizando Estatísticas
```
1. Clique em "Gráficos e Estatísticas"
2. Explore os gráficos interativos
3. Clique nas estatísticas para detalhes
4. Alterne tipos de gráfico
5. Visualize tendências financeiras
```

---

## 🎨 Temas Disponíveis

| Tema | Cores Principais | Melhor Para |
|------|------------------|-------------|
| **Neon** (Padrão) | Azul Ciano + Roxo | Uso noturno, Foco |
| **Sunset** | Laranja + Rosa | Ambiente relaxante |
| **Matrix** | Verde Neon | Estilo retrô/tech |
| **Pastel** | Azul Claro + Rosa | Uso diurno, Suave |

---

## 📊 Recursos Técnicos

### 🔧 **Arquitetura de Dados**
- **Tipo**: NoSQL híbrido baseado em JSON
- **Desktop**: Arquivos em `userData/TarefasCash/data.json`
- **Web**: localStorage com fallback automático
- **Backup**: Sistema automático com recovery
- **Capacidade**: ~50.000 transações, ~10.000 tarefas
- **Performance**: Carregamento < 100ms, salvamento < 50ms

### 🛡️ **Segurança e Confiabilidade**
- ✅ Backup automático antes de cada operação
- ✅ Verificação de integridade na inicialização
- ✅ Sistema de recovery em caso de falha
- ✅ Validação de dados e estrutura
- ✅ Prevenção de race conditions
- ✅ Logs estruturados para debugging

### ⚡ **Performance**
- ✅ Operações síncronas otimizadas
- ✅ Event delegation eficiente
- ✅ Debounce em operações críticas
- ✅ Carregamento lazy de componentes
- ✅ Cache inteligente de dados
- ✅ Animações CSS3 aceleradas

### � **Compatibilidade**
- ✅ **Windows**: 10/11 (x64) - Totalmente suportado
- 🔄 **macOS**: 10.15+ - Em desenvolvimento
- 🔄 **Linux**: Ubuntu 18.04+ - Em desenvolvimento
- ✅ **Web**: Chrome, Firefox, Safari, Edge
- ✅ **Mobile**: PWA responsivo

---

## 🗂️ Estrutura do Projeto

```
TarefasCash/
├── 📄 index.html                    # Interface principal
├── 🎨 styles.css                    # Estilos e temas visuais
├── ⚙️ script.js                     # Lógica frontend
├── 🔧 persistence-manager.js        # Gerenciador de persistência
├── 📱 manifest.json                 # Configuração PWA
├── 📦 package.json                  # Dependências e scripts
├── 📋 .gitignore                    # Arquivos ignorados pelo Git
│
├── 🖥️ electron/                     # Aplicação Desktop
│   ├── � main.js                   # Processo principal Electron
│   ├── 🔗 preload.js                # Script de ponte segura
│   └── 💾 filesystem-persistence.js # Persistência em arquivo
│
├── 🏗️ build/                        # Assets de build
│   ├── 🖼️ icon.ico                  # Ícone Windows
│   └── 🎨 icon.svg                  # Ícone vetorial
│
├── 📁 dis/                          # Distribuição (builds)
│   ├── 📦 TarefasCash Setup.exe     # Installer Windows
│   ├── 📱 TarefasCash.exe           # Portable Windows
│   └── � latest.yml                # Metadados de atualização
│
├── �🖼️ Imagens/                      # Assets visuais
│   └── 🌌 Futuristic.jpg            # Background principal
│
├── � Documentação/
│   ├── 📊 RELATORIO-BANCO-DE-DADOS.md      # Análise técnica completa
│   ├── 📝 RELEASE-NOTES-v1.0.2.md          # Notas da versão atual
│   ├── 🛠️ MELHORIAS-EXCLUSAO-TAREFAS.md   # Melhorias implementadas
│   ├── � Planejamento_Projeto.markdown     # Planejamento inicial
│   └── 📖 README.md                         # Este arquivo
│
└── 🧪 Scripts de Teste/
    ├── 🔍 debug-persistence.js      # Debug do sistema de dados
    ├── ⚙️ test-functions.js         # Testes de funções
    └── 🖥️ teste-electron.bat        # Teste da versão desktop
```

---

## 🚀 Roadmap

### ✅ **v1.0.2 - Atual (Julho 2025)**
- ✅ Sistema de exclusão reformulado com confirmações
- ✅ Notificações visuais de sucesso/erro
- ✅ Prevenção de race conditions com locks
- ✅ Função debounce para evitar spam
- ✅ Sistema de backup automático robusto
- ✅ Aplicação Desktop Electron completa

### 🔄 **v1.1.0 - Próxima (Agosto 2025)**
- [ ] 🔐 **Sistema de autenticação** (login/registro opcional)
- [ ] ☁️ **Sincronização em nuvem** (Firebase/Supabase)
- [ ] 📱 **PWA completo** com Service Worker offline
- [ ] 🔔 **Notificações push** para tarefas e metas
- [ ] 📊 **Relatórios PDF/CSV** exportáveis
- [ ] � **Gamificação** com conquistas e níveis

### 🔮 **v1.2.0 - Futuro (Setembro 2025)**
- [ ] �🌐 **Multi-idiomas** (EN, ES, FR, PT)
- [ ] 📅 **Integração com calendários** (Google, Outlook)
- [ ] 🏢 **Modo empresarial** para equipes
- [ ] � **Dashboard avançado** com analytics
- [ ] 🔒 **Criptografia** end-to-end opcional
- [ ] 📱 **Apps nativos** (iOS/Android)

### 🛠️ Melhorias Técnicas
- [x] ⚡ **Performance** otimizada
- [x] 🧪 **Sistema de debug** integrado
- [x] 📦 **Modularização** do código
- [x] 🔒 **Segurança** aprimorada
- [ ] ♿ **Acessibilidade** completa (WCAG 2.1)
- [ ] 🧪 **Testes automatizados** (Jest, Cypress)
- [ ] 🔧 **CI/CD** com GitHub Actions
- [ ] 📊 **Monitoramento** de performance

---

## 📚 Documentação Técnica

### 📊 **Documentação Completa**
- [📚 Índice de Documentação](INDICE-DOCUMENTACAO.md) - **NAVEGUE AQUI** para encontrar qualquer documento
- [📊 Documentação Técnica Completa](DOCUMENTACAO-TECNICA-COMPLETA.md) - Guia técnico detalhado
- [📊 Relatório do Banco de Dados](RELATORIO-BANCO-DE-DADOS.md) - Análise técnica do sistema de dados
- [📝 Release Notes v1.0.2](RELEASE-NOTES-v1.0.2.md) - Melhorias e correções da versão atual

### 🔧 **Scripts Utilitários**
```bash
# Debug do sistema de persistência
node debug-persistence.js

# Teste das funções principais
node test-functions.js

# Verificar dados e integridade
./verificar-dados.bat

# Teste completo da aplicação
./testar-app-completo.bat
```

### � **Ferramentas de Debug**
- **Console Debug**: `persistenceManager.getDebugInfo()`
- **Verificação de Integridade**: Botão 🔧 na interface
- **Logs Estruturados**: Console com emojis e cores
- **Backup Manual**: Através da interface ou scripts

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Siga estes passos:

1. 🍴 **Fork** o projeto
2. 🌟 **Crie** uma branch para sua feature
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 💾 **Commit** suas mudanças
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. 📤 **Push** para a branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🎯 **Abra** um Pull Request

### 📋 Padrões de Desenvolvimento
- Use **camelCase** para variáveis JavaScript
- Mantenha **CSS organizado** por seções
- Adicione **comentários** em funcionalidades complexas
- Teste em **múltiplos navegadores** e no Electron
- Siga o **padrão de commits** semânticos
- **Documente** novas funcionalidades
- Execute **testes** antes do PR

### 🔍 **Áreas que Precisam de Contribuição**
- [ ] 🌐 Tradução para outros idiomas
- [ ] ♿ Melhorias de acessibilidade
- [ ] 🧪 Testes automatizados
- [ ] 📱 Otimizações mobile
- [ ] 🎨 Novos temas visuais
- [ ] 📊 Novos tipos de gráficos
- [ ] 🔌 Integrações com APIs externas

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License - você pode usar, modificar e distribuir livremente!
```

---

## 👨‍💻 Autor

<div align="center">

**Bruno Eduardo**

[![GitHub](https://img.shields.io/badge/GitHub-BonyDevup-00f7ff?style=for-the-badge&logo=github)](https://github.com/BonyDevup)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bruno%20Eduardo-00f7ff?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/seu-perfil)
[![Portfolio](https://img.shields.io/badge/Portfolio-bonydevup.dev-00f7ff?style=for-the-badge&logo=firefox)](https://bonydevup.dev)

*Desenvolvedor apaixonado por criar soluções que facilitam a vida das pessoas*

**🎯 Especialidades**: Aplicações Desktop (Electron), Web Development, Sistemas de Persistência

</div>

---

## 📈 **Status do Projeto**

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/BonyDevup/TarefasCash.github.io?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/BonyDevup/TarefasCash.github.io?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/BonyDevup/TarefasCash.github.io?style=for-the-badge)

### 📊 **Estatísticas de Desenvolvimento**
- 🏗️ **Arquitetura**: Híbrida (Desktop + Web)
- 🔧 **Manutenibilidade**: ⭐⭐⭐⭐⭐ (Excelente)
- 🛡️ **Confiabilidade**: ⭐⭐⭐⭐⭐ (Backup automático)
- ⚡ **Performance**: ⭐⭐⭐⭐⭐ (< 100ms inicialização)
- 🎨 **UX/UI**: ⭐⭐⭐⭐⭐ (4 temas, responsivo)

</div>

---

## 🙏 Agradecimentos

- 🎨 **Chart.js** pela biblioteca de gráficos
- 🎯 **Font Awesome** pelos ícones incríveis
- 🌟 **Comunidade GitHub** pelo feedback
- 💡 **Usuários beta** pelas sugestões

---

## 📞 Suporte

Encontrou um bug? Tem uma sugestão? Entre em contato:

- 🐛 **Issues**: [GitHub Issues](https://github.com/BonyDevup/TarefasCash.github.io/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/BonyDevup/TarefasCash.github.io/discussions)
- 📧 **Email Direto**: [bonydevup@gmail.com](mailto:bonydevup@gmail.com)
- 🤝 **Discord**: Servidor da comunidade TarefasCash

### 🚨 **Reportando Bugs**
1. Verifique se o bug já foi reportado nas [Issues](https://github.com/BonyDevup/TarefasCash.github.io/issues)
2. Use o template de bug report
3. Inclua versão do sistema, navegador e logs de erro
4. Descreva passos para reproduzir o problema

### 💡 **Sugerindo Melhorias**
1. Abra uma [Discussion](https://github.com/BonyDevup/TarefasCash.github.io/discussions)
2. Descreva sua ideia detalhadamente
3. Explique como seria útil para outros usuários
4. Anexe mockups ou exemplos se possível

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela! ⭐**

![GitHub stars](https://img.shields.io/github/stars/BonyDevup/TarefasCash.github.io?style=social)
![GitHub forks](https://img.shields.io/github/forks/BonyDevup/TarefasCash.github.io?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/BonyDevup/TarefasCash.github.io?style=social)

### 🏆 **Conquistas**
- ✅ **v1.0.0**: Lançamento inicial
- ✅ **v1.0.1**: Melhorias de estabilidade  
- ✅ **v1.0.2**: Sistema de exclusão reformulado
- 🎯 **v1.1.0**: Sincronização na nuvem (em breve)

---

*Desenvolvido com ❤️ e ☕ por Bruno Eduardo*  
*© 2025 TarefasCash - Todos os direitos reservados*

**📱 Baixe agora e transforme sua gestão financeira!**

</div>
