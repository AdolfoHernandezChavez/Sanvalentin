document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const mainCard = document.getElementById('mainCard');
    const celebrationContainer = document.getElementById('celebrationContainer');
    const garden = document.getElementById('garden');

    // --- LÓGICA DEL BOTÓN "NO" (CORREGIDA) ---
    
    // Función para mover el botón
    const runAway = (e) => {
        // Prevenir comportamiento normal (como hacer click)
        if(e) e.preventDefault(); 

        // Calcular nueva posición dentro de la ventana visible
        // Restamos el tamaño del botón (aprox 100px) para que no se salga
        const maxWidth = window.innerWidth - 100;
        const maxHeight = window.innerHeight - 100;

        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        // Aplicamos posición FIXED para que flote sobre todo y no dependa de la tarjeta
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Cambiar texto para ser gracioso
        const frases = ["¡Ups!", "¡Por aquí!", "¡Muy lenta!", "¡Inténtalo!"];
        noBtn.innerText = frases[Math.floor(Math.random() * frases.length)];
    };

    // Eventos para PC y Móvil
    noBtn.addEventListener('mouseover', runAway); // PC
    noBtn.addEventListener('touchstart', runAway); // Móvil (reacciona al tocar antes de soltar)
    noBtn.addEventListener('click', runAway); // Fallback por si acaso

    // --- LÓGICA DEL BOTÓN "SÍ" ---
    yesBtn.addEventListener('click', () => {
        // 1. Ocultar la pregunta
        mainCard.style.transform = "scale(0)";
        setTimeout(() => mainCard.classList.add('hidden'), 500);

        // 2. Mostrar la celebración (Texto y Foto)
        celebrationContainer.style.opacity = "1";

        // 3. Crecer tulipanes
        growGarden();

        // 4. Activar corazones al tocar la pantalla
        document.body.addEventListener('click', createHeart);
        document.body.addEventListener('touchstart', createHeart);
    });

    // --- FUNCIÓN JARDÍN ---
    function growGarden() {
        const colors = ['#ff4d6d', '#d90429', '#ff8fa3', '#e01e37'];
        // Ajustamos cantidad según pantalla (Móvil: 12, PC: 25)
        const count = window.innerWidth < 600 ? 12 : 25; 

        for (let i = 0; i < count; i++) {
            const tulip = document.createElement('div');
            tulip.classList.add('tulip');
            
            const height = Math.floor(Math.random() * 150) + 100; // Altura variable
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            tulip.style.setProperty('--color', color);
            tulip.innerHTML = `<div class="flower"></div><div class="stem"></div>`;
            
            garden.appendChild(tulip);

            // Crecimiento escalonado
            setTimeout(() => {
                tulip.style.height = height + 'px';
            }, Math.random() * 2000);
        }
    }

    // --- FUNCIÓN CORAZONES ---
    function createHeart(e) {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        
        // SVG de corazón
        heart.innerHTML = `<svg viewBox="0 0 24 24" fill="#ff4d6d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

        let x = e.clientX || e.touches[0].clientX;
        let y = e.clientY || e.touches[0].clientY;

        heart.style.left = (x - 25) + 'px'; // Centrar (-25 porque mide 50)
        heart.style.top = (y - 25) + 'px';

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
});