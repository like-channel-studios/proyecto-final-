const animaciones = {
    "Atención & Énfasis": {
        'latido': { 
            nombre: 'Pulse (Latido)', 
            css: `@keyframes latido {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.04); }\n}` 
        },
        'latido-fuerte': { 
            nombre: 'Heartbeat (Doble Latido)', 
            css: `@keyframes latido-fuerte {\n  0%, 100% { transform: scale(1); }\n  14% { transform: scale(1.07); }\n  28% { transform: scale(1); }\n  42% { transform: scale(1.07); }\n  70% { transform: scale(1); }\n}` 
        },
        'rebotar': { 
            nombre: 'Bounce (Rebote)', 
            css: `@keyframes rebotar {\n  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n  40% { transform: translateY(-8px); }\n  60% { transform: translateY(-4px); }\n}` 
        },
        'agitar-x': { 
            nombre: 'Shake X (Sacudida)', 
            css: `@keyframes agitar-x {\n  0%, 100% { transform: translateX(0); }\n  20%, 60% { transform: translateX(-4px); }\n  40%, 80% { transform: translateX(4px); }\n}` 
        },
        'gelatina': { 
            nombre: 'Jello (Gelatina)', 
            css: `@keyframes gelatina {\n  0%, 100% { transform: scale(1) skew(0deg, 0deg); }\n  20% { transform: scale(0.98) skew(-2.5deg, -2.5deg); }\n  40% { transform: scale(1.02) skew(2deg, 2deg); }\n  60% { transform: scale(0.99) skew(-1deg, -1deg); }\n  80% { transform: scale(1.01) skew(0.5deg, 0.5deg); }\n}` 
        }
    },
    "Entradas (Fade In)": {
        'aparecer': { 
            nombre: 'Fade In', 
            css: `@keyframes aparecer {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}` 
        },
        'aparecer-arriba': { 
            nombre: 'Fade In Down', 
            css: `@keyframes aparecer-arriba {\n  from { opacity: 0; transform: translateY(-12px); }\n  to { opacity: 1; transform: translateY(0); }\n}` 
        },
        'aparecer-abajo': { 
            nombre: 'Fade In Up', 
            css: `@keyframes aparecer-abajo {\n  from { opacity: 0; transform: translateY(12px); }\n  to { opacity: 1; transform: translateY(0); }\n}` 
        },
        'aparecer-izq': { 
            nombre: 'Fade In Left', 
            css: `@keyframes aparecer-izq {\n  from { opacity: 0; transform: translateX(-12px); }\n  to { opacity: 1; transform: translateX(0); }\n}` 
        },
        'aparecer-der': { 
            nombre: 'Fade In Right', 
            css: `@keyframes aparecer-der {\n  from { opacity: 0; transform: translateX(12px); }\n  to { opacity: 1; transform: translateX(0); }\n}` 
        }
    },
    "Escalado & Zoom": {
        'zoom-entrar': { 
            nombre: 'Zoom In', 
            css: `@keyframes zoom-entrar {\n  from { opacity: 0; transform: scale(0.92); }\n  to { opacity: 1; transform: scale(1); }\n}` 
        },
        'zoom-desbordante': { 
            nombre: 'Pop In (Con rebote)', 
            css: `@keyframes zoom-desbordante {\n  0% { opacity: 0; transform: scale(0.9); }\n  50% { opacity: 1; transform: scale(1.03); }\n  70% { transform: scale(0.98); }\n  100% { transform: scale(1); }\n}` 
        }
    },
    "Rotaciones": {
        'girar': { 
            nombre: 'Spin (360°)', 
            css: `@keyframes girar {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}` 
        },
        'voltereta-y': { 
            nombre: 'Flip Y (3D)', 
            css: `@keyframes voltereta-y {\n  from { transform: perspective(400px) rotateY(90deg); opacity: 0; }\n  to { transform: perspective(400px) rotateY(0deg); opacity: 1; }\n}` 
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
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
                allCSS += datos.css + '\n\n';
            }
        }
        styleTag.innerHTML = allCSS;
    }

    injectGlobalKeyframes();

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

    function renderComponent() {
        const type = compType.value;
        const color = compColor.value;
        let html = '';

        if (type === 'button') {
            html = `<button id="target-element" class="bs-button bg-${color}">Confirmar Acción</button>`;
        } else if (type === 'card') {
            html = `<div id="target-element" class="bs-card bg-${color}">
                        <span class="bs-card-title">Título del Módulo</span>
                        <span class="bs-card-desc">Descripción secundaria del elemento.</span>
                    </div>`;
        } else if (type === 'alert') {
            html = `<div id="target-element" class="bs-alert bg-${color}">
                        <span>Actualización disponible para el sistema.</span>
                    </div>`;
        } else if (type === 'badge') {
            html = `<span id="target-element" class="bs-badge bg-${color}">ACTIVO</span>`;
        } else {
            html = `<div id="target-element" class="bs-box bg-${color}"></div>`;
        }

        container.innerHTML = html;
    }

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

        target.style.animation = 'none';
        void target.offsetWidth;
        
        target.style.animationName = animId;
        target.style.animationDuration = duration;
        target.style.animationTimingFunction = timing;
        target.style.animationDelay = delay;
        target.style.animationIterationCount = iteration;
        target.style.animationFillMode = fill;

        if (currentTab === 'css') {
            codeFilename.textContent = 'styles.css';
            codeOutput.textContent = `.animated-element {\n  animation: ${animId} ${duration} ${timing} ${delay} ${iteration} ${fill};\n}\n\n${keyframesCSS}`.trim();
        } else {
            codeFilename.textContent = 'index.html';
            const tempHtml = target.outerHTML.replace('id="target-element"', 'class="animated-element ' + target.className + '"');
            codeOutput.textContent = tempHtml.trim();
        }
    }

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

    [compType, compColor, animType, durationInput, delayInput, timingSelect, iterationSelect, fillSelect].forEach(el => {
        el.addEventListener('input', update);
        el.addEventListener('change', update);
    });

    replayBtn.addEventListener('click', update);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeOutput.textContent).then(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        });
    });

    update();
});