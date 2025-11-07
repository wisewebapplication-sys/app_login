// Variables globales
let currentView = 'login';
let verificationTimer = null;
let isInitialized = false;

// Cambiar de vista
function showView(viewName) {
    console.log('🔄 Cambiando a vista:', viewName, 'desde:', currentView);

    // Limpiar timer SOLO si no estamos en el proceso de verificación completada
    if (verificationTimer && !(currentView === 'verification' && viewName === 'dashboard')) {
        clearTimeout(verificationTimer);
        verificationTimer = null;
        console.log('🧹 Timer limpiado');
    } else if (currentView === 'verification' && viewName === 'dashboard') {
        // El timer se completó naturalmente, solo lo reseteamos
        verificationTimer = null;
        console.log('✅ Timer completado naturalmente');
    }

    // Ocultar todas las vistas
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
    });

    // Mostrar vista seleccionada
    const targetView = document.getElementById(viewName);
    if (targetView) {
        targetView.classList.add('active');
        currentView = viewName;
        console.log('✅ Vista activada:', viewName);
    } else {
        console.error('❌ Vista no encontrada:', viewName);
        return;
    }

    // Mostrar/ocultar bottom nav
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        if (viewName === 'login' || viewName === 'verification' || viewName === 'transactions-full') {
            bottomNav.style.display = 'none';
            console.log('👻 Bottom nav oculto');
        } else {
            bottomNav.style.display = 'flex';
            console.log('👁️ Bottom nav visible');
        }
    }

    // Actualizar nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const navItems = document.querySelectorAll('.nav-item');
    if (viewName === 'dashboard' && navItems[0]) navItems[0].classList.add('active');
    if (viewName === 'cards' && navItems[1]) navItems[1].classList.add('active');
    if (viewName === 'recipients' && navItems[2]) navItems[2].classList.add('active');
    if (viewName === 'payments' && navItems[3]) navItems[3].classList.add('active');
}
// Ir a verificación
function goToVerification() {
    console.log('🚀 Iniciando verificación...');
    showView('verification');

    console.log('⏱️ Timer de 3 segundos iniciado...');
    verificationTimer = setTimeout(function() {
        console.log('⏰ ¡Verificación completada! Redirigiendo al dashboard...');
        showView('dashboard');
    }, 3000);
    
    console.log('✅ Timer configurado:', verificationTimer);
}

// Volver al login
function goToLogin() {
    console.log('⬅️ Cancelando verificación...');
    if (verificationTimer) {
        clearTimeout(verificationTimer);
        verificationTimer = null;
        console.log('🧹 Timer cancelado');
    }
    showView('login');
}

// Toggle password
function togglePassword() {
    const input = document.getElementById('password');
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        console.log('👁️ Contraseña:', input.type === 'text' ? 'visible' : 'oculta');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 Página cargada - Inicializando...');

    const requiredViews = ['login', 'verification', 'dashboard', 'cards', 'recipients', 'payments', 'profile', 'transactions-full'];
    requiredViews.forEach(id => {
        const view = document.getElementById(id);
        if (view) {
            console.log('✅ Vista encontrada:', id);
        } else {
            console.error('❌ Vista NO encontrada:', id);
        }
    });

    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        console.log('✅ Bottom nav encontrado');
    } else {
        console.error('❌ Bottom nav NO encontrado');
    }

    isInitialized = true;
    showView('login');
    console.log('✅ Inicialización completada');

    setupTransactionsView();
});

function setupTransactionsView() {
    const summaryList = document.querySelector('.transaction-list');
    const fullListContainer = document.getElementById('all-transactions');

    if (!summaryList || !fullListContainer) {
        console.warn('⚠️ No se pudo inicializar el listado completo de transacciones.');
        return;
    }

    fullListContainer.innerHTML = summaryList.innerHTML;

    const additionalTransactions = getStaticTransactions();
    let lastSectionLabel = null;

    additionalTransactions.forEach(transaction => {
        if (transaction.sectionLabel && transaction.sectionLabel !== lastSectionLabel) {
            fullListContainer.appendChild(createSectionLabel(transaction.sectionLabel));
            lastSectionLabel = transaction.sectionLabel;
        }
        fullListContainer.appendChild(createTransactionElement(transaction));
    });

    console.log(`🧾 Se agregaron ${additionalTransactions.length} transacciones adicionales al listado completo.`);
}

function getStaticTransactions() {
    return [
        {
            sectionLabel: 'Noviembre 2025',
            title: 'EEGSA Servicios',
            dateLabel: 'Martes, 4 de noviembre de 2025',
            amountPrimary: '480,00 GTQ',
            amountSecondary: '61,00 USD',
            iconClass: 'fa-solid fa-bolt',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Octubre 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Viernes, 10 de octubre de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'Mercado Roma',
            dateLabel: 'Miércoles, 8 de octubre de 2025',
            amountPrimary: '1.480,00 MXN',
            amountSecondary: '85,20 USD',
            iconClass: 'fa-solid fa-cart-shopping',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: null,
            title: 'Belize Border Fees',
            dateLabel: 'Sábado, 4 de octubre de 2025',
            amountPrimary: '190,00 BZD',
            amountSecondary: '95,00 USD',
            iconClass: 'fa-solid fa-passport',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Septiembre 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Martes, 9 de septiembre de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'La Comer Reforma',
            dateLabel: 'Sábado, 6 de septiembre de 2025',
            amountPrimary: '980,00 MXN',
            amountSecondary: '56,40 USD',
            iconClass: 'fa-solid fa-basket-shopping',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Agosto 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Martes, 12 de agosto de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'OXXO Digital',
            dateLabel: 'Viernes, 8 de agosto de 2025',
            amountPrimary: '210,00 MXN',
            amountSecondary: '12,10 USD',
            iconClass: 'fa-solid fa-mobile-screen',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Julio 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Martes, 15 de julio de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'Juan Valdez Café',
            dateLabel: 'Jueves, 10 de julio de 2025',
            amountPrimary: '42.800,00 COP',
            amountSecondary: '11,05 USD',
            iconClass: 'fa-solid fa-mug-saucer',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: null,
            title: 'Superama Polanco',
            dateLabel: 'Viernes, 4 de julio de 2025',
            amountPrimary: '1.320,00 MXN',
            amountSecondary: '74,80 USD',
            iconClass: 'fa-solid fa-cart-shopping',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Junio 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Miércoles, 11 de junio de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'Éxito Chapinero',
            dateLabel: 'Sábado, 7 de junio de 2025',
            amountPrimary: '358.000,00 COP',
            amountSecondary: '92,40 USD',
            iconClass: 'fa-solid fa-store',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Mayo 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Martes, 13 de mayo de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'Supermaxi Quito',
            dateLabel: 'Jueves, 8 de mayo de 2025',
            amountPrimary: '128,40 USD',
            iconClass: 'fa-solid fa-cart-shopping',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Abril 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Miércoles, 16 de abril de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'Tía La Floresta',
            dateLabel: 'Viernes, 11 de abril de 2025',
            amountPrimary: '82,60 USD',
            iconClass: 'fa-solid fa-basket-shopping',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Marzo 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Martes, 18 de marzo de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'Wong San Isidro',
            dateLabel: 'Miércoles, 12 de marzo de 2025',
            amountPrimary: '420,00 PEN',
            amountSecondary: '111,30 USD',
            iconClass: 'fa-solid fa-cart-shopping',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Febrero 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Martes, 18 de febrero de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'Líder Providencia',
            dateLabel: 'Lunes, 10 de febrero de 2025',
            amountPrimary: '155.900,00 CLP',
            amountSecondary: '165,40 USD',
            iconClass: 'fa-solid fa-cart-shopping',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: 'Enero 2025',
            title: 'Avon Corporation Ltd.',
            dateLabel: 'Miércoles, 22 de enero de 2025',
            amountPrimary: '+ 1.100,00 USD',
            isPositive: true,
            iconClass: 'fa-solid fa-arrow-down',
            iconBg: '#1f2937'
        },
        {
            sectionLabel: null,
            title: 'Jumbo Costanera',
            dateLabel: 'Miércoles, 15 de enero de 2025',
            amountPrimary: '184.200,00 CLP',
            amountSecondary: '195,10 USD',
            iconClass: 'fa-solid fa-store',
            iconBg: '#2c2c2c'
        },
        {
            sectionLabel: null,
            title: 'Red BIP Santiago',
            dateLabel: 'Miércoles, 1 de enero de 2025',
            amountPrimary: '24.000,00 CLP',
            amountSecondary: '25,40 USD',
            iconClass: 'fa-solid fa-train-subway',
            iconBg: '#2c2c2c'
        }
    ];
}

function createSectionLabel(text) {
    const section = document.createElement('div');
    section.className = 'transactions-section-label';
    section.textContent = text;
    return section;
}

function createTransactionElement(data) {
    const item = document.createElement('div');
    item.className = 'transaction-item';

    const leftWrapper = document.createElement('div');
    leftWrapper.style.display = 'flex';
    leftWrapper.style.alignItems = 'center';

    const iconContainer = document.createElement('div');
    iconContainer.className = 'transaction-icon';
    iconContainer.style.background = data.iconBg || '#2c2c2c';

    if (data.iconType === 'image') {
        const image = document.createElement('img');
        image.src = data.iconSrc;
        image.alt = data.iconAlt || data.title;
        image.width = data.iconWidth || 36;
        image.height = data.iconHeight || 36;
        iconContainer.appendChild(image);
    } else {
        const iconElement = document.createElement('i');
        iconElement.className = data.iconClass || 'fa-solid fa-circle';
        iconElement.setAttribute('aria-hidden', 'true');
        iconContainer.appendChild(iconElement);
    }

    const info = document.createElement('div');
    info.className = 'transaction-info';

    const name = document.createElement('div');
    name.className = 'transaction-name';
    name.textContent = data.title;

    const date = document.createElement('div');
    date.className = 'transaction-date';
    date.textContent = data.dateLabel;

    info.appendChild(name);
    info.appendChild(date);

    leftWrapper.appendChild(iconContainer);
    leftWrapper.appendChild(info);

    const amountContainer = document.createElement('div');
    amountContainer.className = 'transaction-amount';

    if (data.amountSecondary) {
        const primary = document.createElement('div');
        primary.className = 'amount-primary';
        primary.textContent = data.amountPrimary;

        if (data.isPositive) {
            primary.style.color = '#9fe870';
        }

        const secondary = document.createElement('div');
        secondary.className = 'amount-secondary';
        secondary.textContent = data.amountSecondary;

        amountContainer.appendChild(primary);
        amountContainer.appendChild(secondary);
    } else {
        amountContainer.textContent = data.amountPrimary;
        if (data.isPositive) {
            amountContainer.style.color = '#9fe870';
        }
    }

    item.appendChild(leftWrapper);
    item.appendChild(amountContainer);

    return item;
}
