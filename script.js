// CONFIGURACIÓN DE LA FECHA DEL EVENTO: 20 DE DICIEMBRE DE 2026
const fechaEvento = new Date("Dec 20, 2026 18:00:00").getTime();

// ELEMENTOS DEL DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');

function actualizarContador() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    // Si ya pasó la fecha
    if (distancia < 0) {
        clearInterval(timer);
        if(daysEl) daysEl.innerText = "00";
        if(hoursEl) hoursEl.innerText = "00";
        if(minutesEl) minutesEl.innerText = "00";
        return;
    }

    // Cálculos matemáticos limpios basados en milisegundos
    const unDia = 1000 * 60 * 60 * 24;
    const unaHora = 1000 * 60 * 60;
    const unMinuto = 1000 * 60;

    const diasCalculados = Math.floor(distancia / unDia);
    const horasCalculadas = Math.floor((distancia % unDia) / unaHora);
    const minutosCalculados = Math.floor((distancia % unaHora) / unMinuto);

    // Renderizado con formato de dos dígitos (ej. 05 en vez de 5)
    if(daysEl) daysEl.innerText = diasCalculados;
    if(hoursEl) hoursEl.innerText = horasCalculadas < 10 ? '0' + horasCalculadas : horasCalculadas;
    if(minutesEl) minutesEl.innerText = minutosCalculados < 10 ? '0' + minutosCalculados : minutosCalculados;
}

// Ejecutar inmediatamente al cargar la página para evitar el "00" parpadeante
actualizarContador();

// Actualizar cada 1 segundo (1000 milisegundos) de forma activa
const timer = setInterval(actualizarContador, 1000);

// NAVEGACIÓN ENTRE APARTADOS (TABS)
function cambiarApartado(idApartado) {
    const apartados = document.querySelectorAll('.tab-content');
    apartados.forEach(tab => tab.classList.remove('active'));

    const seleccionado = document.getElementById(`apartado-${idApartado}`);
    if (seleccionado) {
        seleccionado.classList.add('active');
    }

    const botones = ['inicio', 'fotos', 'lugares'];
    botones.forEach(btn => {
        const btnEl = document.getElementById(`btn-${btn}`);
        if (btnEl) {
            if (btn === idApartado) {
                btnEl.className = "flex-1 bg-[#3d2011] text-[#e6c594] border-2 border-[#ccaa70] py-2 rounded-xl text-xs font-western-bold tracking-wider uppercase cursor-pointer text-center";
            } else {
                btnEl.className = "flex-1 bg-[#3d2011]/60 text-[#e6c594]/80 border border-[#ccaa70]/40 py-2 rounded-xl text-xs font-western-bold tracking-wider uppercase cursor-pointer text-center";
            }
        }
    });
}

// ANIMACIONES SECUENCIALES PARA LA INTRODUCCIÓN
function abrirSobre() {
    const sobre = document.getElementById('intro-sobre');
    const mensaje = document.getElementById('intro-mensaje');
    
    if(sobre) sobre.style.opacity = '0';
    setTimeout(() => {
        if(sobre) sobre.style.display = 'none';
        if(mensaje) mensaje.style.display = 'flex';
        setTimeout(() => {
            if(mensaje) mensaje.style.opacity = '1';
        }, 50);
    }, 500);
}

function verInvitacionCompleta() {
    const intro = document.getElementById('pantalla-intro');
    const principal = document.getElementById('contenido-principal');
    
    if(intro) intro.style.opacity = '0';
    setTimeout(() => {
        if(intro) intro.style.display = 'none';
        if(principal) principal.style.display = 'flex';
        setTimeout(() => {
            if(principal) principal.style.opacity = '1';
        }, 50);
    }, 700);
}

// LÓGICA DE CONTROL DEL CARRUSEL (PORCENTAJES)
let currentIndex = 0;
const slider = document.getElementById('carousel-slider');

function moveSlider(index) {
    const totalImages = slider ? slider.children.length : 0;
    
    if (index >= totalImages) currentIndex = 0;
    else if (index < 0) currentIndex = totalImages - 1;
    else currentIndex = index;
    
    if (slider) {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

document.getElementById('nextBtn')?.addEventListener('click', () => moveSlider(currentIndex + 1));
document.getElementById('prevBtn')?.addEventListener('click', () => moveSlider(currentIndex - 1));