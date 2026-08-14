const fechaEvento = new Date("Oct 18, 2026 14:45:00").getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');

function actualizarContador() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia < 0) {
        clearInterval(timer);
        if (daysEl) daysEl.innerText = "00";
        if (hoursEl) hoursEl.innerText = "00";
        if (minutesEl) minutesEl.innerText = "00";
        return;
    }

    const unDia = 1000 * 60 * 60 * 24;
    const unaHora = 1000 * 60 * 60;
    const unMinuto = 1000 * 60;

    const diasCalculados = Math.floor(distancia / unDia);
    const horasCalculadas = Math.floor((distancia % unDia) / unaHora);
    const minutosCalculados = Math.floor((distancia % unaHora) / unMinuto);

    if (daysEl) daysEl.innerText = diasCalculados < 10 ? '0' + diasCalculados : diasCalculados;
    if (hoursEl) hoursEl.innerText = horasCalculadas < 10 ? '0' + horasCalculadas : horasCalculadas;
    if (minutesEl) minutesEl.innerText = minutosCalculados < 10 ? '0' + minutosCalculados : minutosCalculados;
}

actualizarContador();
const timer = setInterval(actualizarContador, 1000);

function cambiarApartado(idApartado) {
    const apartados = document.querySelectorAll('.tab-content');
    apartados.forEach(tab => tab.classList.remove('active'));

    const seleccionado = document.getElementById(`apartado-${idApartado}`);
    if (seleccionado) {
        seleccionado.classList.add('active');
        // Asegura que al cambiar de pestaña la vista suba al inicio de la tarjeta
        seleccionado.scrollTop = 0;
    }

    const botones = ['inicio', 'fotos', 'lugares'];
    botones.forEach(btn => {
        const btnEl = document.getElementById(`btn-${btn}`);
        if (btnEl) {
            if (btn === idApartado) {
                btnEl.className = "flex-1 tab-placa text-[#d9b885] py-3 rounded-lg text-xs font-western-bold tracking-wider uppercase cursor-pointer text-center";
            } else {
                btnEl.className = "flex-1 tab-placa inactive text-[#d9b885]/80 py-3 rounded-lg text-xs font-western-bold tracking-wider uppercase cursor-pointer text-center";
            }
        }
    });
}

function abrirSobre() {
    const sobre = document.getElementById('intro-sobre');
    const mensaje = document.getElementById('intro-mensaje');
    
    if (sobre) sobre.style.opacity = '0';
    setTimeout(() => {
        if (sobre) sobre.style.display = 'none';
        if (mensaje) mensaje.style.display = 'flex';
        setTimeout(() => {
            if (mensaje) mensaje.style.opacity = '1';
        }, 50);
    }, 500);
}

function verInvitacionCompleta() {
    const intro = document.getElementById('pantalla-intro');
    const principal = document.getElementById('contenido-principal');
    
    if (intro) intro.style.opacity = '0';
    setTimeout(() => {
        if (intro) intro.style.display = 'none';
        if (principal) principal.style.display = 'flex';
        setTimeout(() => {
            if (principal) principal.style.opacity = '1';
        }, 50);
    }, 700);
}

const captions = [
    '"Donde todo comenzó..."',
    '"Creciendo juntos año tras año..."',
    '"Familia, amor y grandes momentos..."',
    '"Siempre con la mejor sonrisa..."',
    '"Construyendo nuestra historia..."',
    '"¡Rumbo a los 25 años juntos!"'
];

let currentIndex = 0;
const slider = document.getElementById('carousel-slider');
const captionEl = document.getElementById('polaroid-caption');
const polaroidFrame = document.getElementById('polaroid-frame');
const dots = document.querySelectorAll('.dot');

const rotacionesPolaroid = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1'];

function updateCarousel(index) {
    const totalSlides = slider ? slider.children.length : 0;
    if (totalSlides === 0) return;

    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    if (slider) {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (captionEl) {
        captionEl.innerText = captions[currentIndex] || captions[0];
    }

    if (polaroidFrame) {
        polaroidFrame.className = `bg-[#fcfaf7] p-4 pb-6 rounded-md shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-[#d4c5b2] transition-transform duration-500 relative overflow-hidden ${rotacionesPolaroid[currentIndex % rotacionesPolaroid.length]}`;
    }

    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.className = "dot w-3 h-3 rounded-full bg-[#3d2011] transition-all cursor-pointer scale-125";
        } else {
            dot.className = "dot w-3 h-3 rounded-full bg-[#3d2011]/30 transition-all cursor-pointer";
        }
    });
}

document.getElementById('prevBtn')?.addEventListener('click', () => updateCarousel(currentIndex - 1));
document.getElementById('nextBtn')?.addEventListener('click', () => updateCarousel(currentIndex + 1));

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateCarousel(idx));
});
