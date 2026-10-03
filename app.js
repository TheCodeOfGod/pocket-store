const API_URL = 'https://jsonplaceholder.typicode.com/users';

// 1. Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('Service Worker registrado:', reg.scope))
            .catch((err) => console.error('Error al registrar el Service Worker:', err));
    });
}

// 2. Consumir la API pública
async function fetchUsers() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    return await response.json();
}

// 3. Pintar el contenido dinámico dentro del App Shell
function renderUsers(users) {
    const container = document.getElementById('user-list');
    container.innerHTML = '';

    users.forEach((user) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p>@${user.username}</p>
            <p>📧 ${user.email}</p>
            <p>📞 ${user.phone}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        `;
        container.appendChild(card);
    });
}

function renderError(message) {
    const container = document.getElementById('user-list');
    container.innerHTML = `<p class="error">${message}</p>`;
}

// 4. Indicador de conexión en la barra superior
function updateStatus() {
    const status = document.getElementById('status');
    status.textContent = navigator.onLine ? 'Online' : 'Offline';
    status.classList.toggle('offline', !navigator.onLine);
}

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

async function initApp() {
    updateStatus();
    try {
        const users = await fetchUsers();
        renderUsers(users);
    } catch (error) {
        console.error('Error al inicializar la app:', error);
        renderError('No se pudieron cargar los usuarios. Comprueba tu conexión.');
    }
}

document.addEventListener('DOMContentLoaded', initApp);
