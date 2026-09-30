const animaciones = {
    "Llamadas de Atención": {
        'latido': { 
            nombre: 'Latido (Pulse)', 
            css: `@keyframes latido { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }` 
        },
        'latido-fuerte': { 
            nombre: 'Latido Fuerte', 
            css: `@keyframes latido-fuerte { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.08); } 28% { transform: scale(1); } 42% { transform: scale(1.08); } 70% { transform: scale(1); } }` 
        },
        'rebotar': { 
            nombre: 'Rebotar (Bounce)', 
            css: `@keyframes rebotar { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }` 
        },
        'agitar-x': { 
            nombre: 'Agitar Horizontal', 
            css: `@keyframes agitar-x { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); } 20%, 40%, 60%, 80% { transform: translateX(4px); } }` 
        },
        'gelatina': { 
            nombre: 'Gelatina (Jello)', 
            css: `@keyframes gelatina { 0%, 100% { transform: scale(1) skew(0deg, 0deg); } 20% { transform: scale(0.98) skew(-3deg, -3deg); } 40% { transform: scale(1.02) skew(2deg, 2deg); } 60% { transform: scale(0.99) skew(-1deg, -1deg); } 80% { transform: scale(1.01) skew(0.5deg, 0.5deg); } }` 
        }
    },
    "Entradas: Desvanecer (Fades)": {
        'aparecer': { nombre: 'Aparecer Suave', css: `@keyframes aparecer { from { opacity: 0; } to { opacity: 1; } }` },
        'aparecer-arriba': { nombre: 'Aparecer desde Arriba', css: `@keyframes aparecer-arriba { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }` },
        'aparecer-abajo': { nombre: 'Aparecer desde Abajo', css: `@keyframes aparecer-abajo { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }` },
        'aparecer-izq': { nombre: 'Aparecer desde la Izquierda', css: `@keyframes aparecer-izq { from { opacity: 0; transform: translateX(-15px); } to { opacity: 1; transform: translateX(0); } }` },
        'aparecer-der': { nombre: 'Aparecer desde la Derecha', css: `@keyframes aparecer-der { from { opacity: 0; transform: translateX(15px); } to { opacity: 1; transform: translateX(0); } }` }
    },
    "Entradas: Zoom & Escalado": {
        'zoom-entrar': { nombre: 'Zoom de Entrada', css: `@keyframes zoom-entrar { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }` },
        'zoom-desbordante': { 
            nombre: 'Zoom con Rebote', 
            css: `@keyframes zoom-desbordante { 0% { opacity: 0; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.03); } 70% { transform: scale(0.98); } 100% { transform: scale(1); } }` 
        }
    },
    "Rotaciones (Spins & Flips)": {
        'girar': { nombre: 'Giro Constante (360º)', css: `@keyframes girar { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }` },
        'voltereta-y': { nombre: 'Voltereta 3D (Flip)', css: `@keyframes voltereta-y { from { transform: perspective(400px) rotateY(90deg); opacity: 0; } to { transform: perspective(400px) rotateY(0deg); opacity: 1; } }` }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM
    const compType = document.getElementById('comp-type');
    const compColor = document.getElementById('comp-color');
    const animType = document.getElementById('anim-type');
    const durationInput = document.getElementById('anim-duration');
    const durationVal = document.getElementById('duration-val');
    const delayInput = document.getElementById('anim-delay');
    const delayVal = document.getElementById('delay-val');
    const timingSelect = document.getElementById('anim-timing');
    const iterationSelect = document.getElementById('anim-iteration');
    const fillSelect = document.getElementById('anim-fill');
    
    const container = document.getElementById('element-container');
    const codeOutput = document.getElementById('code-output');
    const codeFilename = document.getElementById('code-filename');
    const copyBtn = document.getElementById('copy-btn');
    const replayBtn = document.getElementById('replay-btn');
    const toast = document.getElementById('toast');
    
    const tabCss = document.getElementById('tab-css');
    const tabHtml = document.getElementById('tab-html');
    let currentTab = 'css';

    // 1. Inyectar Keyframes en el DOM
    function injectGlobalKeyframes() {
        let styleTag = document.getElementById('global-keyframes');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'global-keyframes';
            document.head.appendChild(styleTag);
        }
        
        let allCSS = '';
        for (const cat of Object.values(animaciones)) {
            for (const datos of Object.values(cat)) {
                allCSS += datos.css + '\n';
            }
        }
        styleTag.innerHTML = allCSS;
    }

    injectGlobalKeyframes();

    // 2. Poblar Selector de Animaciones
    for (const [categoria, anims] of Object.entries(animaciones)) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = categoria;
        for (const [id, datos] of Object.entries(anims)) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = datos.nombre;
            optgroup.appendChild(option);
        }
        animType.appendChild(optgroup);
    }

    // 3. Renderizar Componentes con la Clase de Color Aplicada
    function renderComponent() {
        const type = compType.value;
        const color = compColor.value;
        let html = '';

        if (type === 'button') {
            html = `<button id="target-element" class="bs-button bg-${color}">¡Haz Clic Aquí!</button>`;
        } else if (type === 'card') {
            html = `<div id="target-element" class="bs-card bg-${color}">
                        <h3>Tarjeta Bootstrap</h3>
                        <p>Contenido limpio y estilizado.</p>
                    </div>`;
        } else if (type === 'alert') {
            html = `<div id="target-element" class="bs-alert bg-${color}">
                        🔔 <span>¡Notificación importante!</span>
                    </div>`;
        } else if (type === 'badge') {
            html = `<span id="target-element" class="bs-badge bg-${color}">NUEVO</span>`;
        } else {
            html = `<div id="target-element" class="bs-box bg-${color}"></div>`;
        }

        container.innerHTML = html;
    }

    // 4. Actualizar Estado, Animación y Salida de Código
    function update() {
        renderComponent();

        const target = document.getElementById('target-element');
        const animId = animType.value;
        const duration = durationInput.value + 's';
        const delay = delayInput.value + 's';
        const timing = timingSelect.value;
        const iteration = iterationSelect.value;
        const fill = fillSelect.value;

        durationVal.textContent = duration;
        delayVal.textContent = delay;

        let keyframesCSS = '';
        for (const cat of Object.values(animaciones)) {
            if (cat[animId]) keyframesCSS = cat[animId].css;
        }

        // Reinicio de animación por reflow
        target.style.animation = 'none';
        void target.offsetWidth;
        
        target.style.animationName = animId;
        target.style.animationDuration = duration;
        target.style.animationTimingFunction = timing;
        target.style.animationDelay = delay;
        target.style.animationIterationCount = iteration;
        target.style.animationFillMode = fill;

        // Mostrar Código según pestaña
        if (currentTab === 'css') {
            codeFilename.textContent = 'estilos.css';
            codeOutput.textContent = `/* Estilos de la animación CSS */
.animado {
    animation: ${animId} ${duration} ${timing} ${delay} ${iteration} ${fill};
}

${keyframesCSS}`.trim();
        } else {
            codeFilename.textContent = 'index.html';
            const tempHtml = target.outerHTML.replace('id="target-element"', 'class="animado ' + target.className + '"');
            codeOutput.textContent = `<!-- Código HTML del componente -->\n${tempHtml}`.trim();
        }
    }

    // Pestañas CSS/HTML
    tabCss.addEventListener('click', () => {
        tabCss.classList.add('active');
        tabHtml.classList.remove('active');
        currentTab = 'css';
        update();
    });

    tabHtml.addEventListener('click', () => {
        tabHtml.classList.add('active');
        tabCss.classList.remove('active');
        currentTab = 'html';
        update();
    });

    // Escuchadores de cambio
    [compType, compColor, animType, durationInput, delayInput, timingSelect, iterationSelect, fillSelect].forEach(el => {
        el.addEventListener('input', update);
        el.addEventListener('change', update);
    });

    replayBtn.addEventListener('click', update);

    // Botón de Copiar al Portapapeles
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeOutput.textContent).then(() => {
            toast.classList.add('show');
            copyBtn.textContent = '¡Copiado!';
            setTimeout(() => {
                toast.classList.remove('show');
                copyBtn.textContent = 'Copiar';
            }, 2500);
        });
    });

    update();
});