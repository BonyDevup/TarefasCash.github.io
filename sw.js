// ================================================== 
// 📱 SERVICE WORKER TAREFASCASH MOBILE v1.0.2
// ==================================================

const CACHE_NAME = 'tarefascash-mobile-v1.0.2';
const urlsToCache = [
  '/',
  '/download.html',
  '/index.html',
  '/styles.css',
  '/styles-mobile.css',
  '/script.js',
  '/mobile-layout-manager.js',
  '/persistence-manager.js',
  '/manifest.json',
  '/build/icon.ico',
  '/build/icon.svg'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('📱 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📱 Service Worker: Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('📱 Service Worker: Arquivos cacheados');
        return self.skipWaiting();
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('📱 Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('📱 Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('📱 Service Worker: Ativado e assumindo controle');
      return self.clients.claim();
    })
  );
});

// Interceptação de requisições (estratégia Cache First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache se encontrado
        if (response) {
          return response;
        }
        
        // Senão, busca na rede
        return fetch(event.request).then((response) => {
          // Verifica se a resposta é válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clona a resposta
          const responseToCache = response.clone();
          
          // Adiciona ao cache
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // Fallback para página offline
        if (event.request.destination === 'document') {
          return caches.match('/download.html');
        }
      })
  );
});

// Notificações Push (futuro)
self.addEventListener('push', (event) => {
  console.log('📱 Service Worker: Push recebido');
  
  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: '/build/icon.svg',
    badge: '/build/icon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Abrir App',
        icon: '/build/icon.svg'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/build/icon.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('TarefasCash Mobile', options)
  );
});

// Clique em notificações
self.addEventListener('notificationclick', (event) => {
  console.log('📱 Service Worker: Notificação clicada');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sincronização em background (futuro)
self.addEventListener('sync', (event) => {
  console.log('📱 Service Worker: Sync em background');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Implementar sincronização de dados
      syncData()
    );
  }
});

// Função de sincronização de dados
async function syncData() {
  try {
    // Aqui você implementaria a sincronização real
    console.log('📱 Service Worker: Sincronizando dados...');
    
    // Exemplo: enviar dados pendentes para servidor
    const pendingData = await getPendingData();
    
    if (pendingData.length > 0) {
      // Enviar dados para servidor
      await sendDataToServer(pendingData);
      
      // Limpar dados pendentes
      await clearPendingData();
    }
    
    console.log('📱 Service Worker: Sincronização completa');
  } catch (error) {
    console.error('📱 Service Worker: Erro na sincronização:', error);
  }
}

// Funções auxiliares (implementar conforme necessário)
async function getPendingData() {
  // Implementar busca de dados pendentes no IndexedDB
  return [];
}

async function sendDataToServer(data) {
  // Implementar envio para servidor
  console.log('Enviando dados:', data);
}

async function clearPendingData() {
  // Implementar limpeza de dados pendentes
  console.log('Dados pendentes limpos');
}

// Log de status
console.log('📱 Service Worker TarefasCash Mobile v1.0.2 carregado');
