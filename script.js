```javascript
// ==========================================
// ☁️ LAKY PC NUBE
// ==========================================

let highestZIndex = 100;


// ==========================================
// NOMBRES DE APLICACIONES
// ==========================================

const appNames = {

    files: "📁 Archivos",

    browser: "🌐 Navegador",

    terminal: "💻 Terminal",

    notes: "📝 Notas",

    settings: "⚙️ Configuración"

};


// ==========================================
// ABRIR APLICACIÓN
// ==========================================

function openApp(app) {

    const windowElement =
        document.getElementById(app);

    if (!windowElement) return;


    windowElement.style.display = "block";

    windowElement.classList.remove("minimized");

    windowElement.style.zIndex =
        ++highestZIndex;


    document
        .getElementById("start-menu")
        .style.display = "none";


    updateTaskbar();


    // Enfocar terminal automáticamente

    if (app === "terminal") {

        setTimeout(() => {

            const input =
                document.getElementById(
                    "terminal-command"
                );

            if (input) input.focus();

        }, 100);

    }

}


// ==========================================
// CERRAR
// ==========================================

function closeApp(app) {

    const windowElement =
        document.getElementById(app);

    if (!windowElement) return;


    windowElement.style.display = "none";

    windowElement.classList.remove("minimized");

    windowElement.classList.remove("maximized");

    updateTaskbar();

}


// ==========================================
// MINIMIZAR
// ==========================================

function minimizeApp(app) {

    const windowElement =
        document.getElementById(app);

    if (!windowElement) return;


    windowElement.classList.add("minimized");

    updateTaskbar();

}


// ==========================================
// MAXIMIZAR
// ==========================================

function maximizeApp(app) {

    const windowElement =
        document.getElementById(app);

    if (!windowElement) return;


    windowElement.classList.toggle("maximized");

    windowElement.classList.remove("minimized");

    windowElement.style.zIndex =
        ++highestZIndex;

}


// ==========================================
// TRAER AL FRENTE
// ==========================================

document.addEventListener(
    "mousedown",
    event => {

        const windowElement =
            event.target.closest(".window");

        if (!windowElement) return;


        windowElement.style.zIndex =
            ++highestZIndex;

    }
);


// ==========================================
// MENÚ INICIO
// ==========================================

function toggleStart() {

    const menu =
        document.getElementById(
            "start-menu"
        );

    if (!menu) return;


    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }

}


// ==========================================
// RELOJ
// ==========================================

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;


    const now = new Date();


    const hours =
        String(now.getHours())
            .padStart(2, "0");


    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");


    clock.textContent =
        `${hours}:${minutes}`;

}


updateClock();

setInterval(updateClock, 1000);


// ==========================================
// NAVEGADOR
// ==========================================

function goToSite() {

    const input =
        document.getElementById("url");

    const result =
        document.getElementById(
            "browser-result"
        );


    if (!input || !result) return;


    let url =
        input.value.trim();


    if (!url) {

        result.innerHTML = `
            <h2>⚠️ Dirección vacía</h2>
            <p>Escribe una dirección primero.</p>
        `;

        return;

    }


    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {

        url = "https://" + url;

    }


    const safeURL =
        escapeHTML(url);


    result.innerHTML = `

        <h2>🌐 Sitio listo</h2>

        <p>${safeURL}</p>

        <br>

        <button
            onclick="openExternalSite('${escapeAttribute(url)}')"
        >
            Abrir sitio
        </button>

    `;

}


function openExternalSite(url) {

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


// ==========================================
// TERMINAL
// ==========================================

function terminalCommand(event) {

    if (event.key !== "Enter") return;


    const input =
        document.getElementById(
            "terminal-command"
        );

    const output =
        document.getElementById(
            "terminal-output"
        );


    if (!input || !output) return;


    const command =
        input.value.trim();


    if (!command) return;


    const lower =
        command.toLowerCase();


    output.innerHTML += `

        <br><br>

        <span>
            user@laky:~$
            ${escapeHTML(command)}
        </span>

    `;


    let response = "";


    if (lower === "help") {

        response = `

            Comandos disponibles:
            <br>
            ───────────────────────
            <br>
            help → comandos
            <br>
            clear → limpiar terminal
            <br>
            about → información
            <br>
            date → fecha
            <br>
            time → hora
            <br>
            status → estado
            <br>
            whoami → usuario
            <br>
            version → versión
            <br>
            echo [texto] → mostrar texto

        `;

    }


    else if (lower === "clear") {

        output.innerHTML = "";

        input.value = "";

        return;

    }


    else if (lower === "about") {

        response = `

            ☁️ LAKY PC NUBE
            <br>
            Sistema: LAKY Cloud OS
            <br>
            Versión: 1.0.0
            <br>
            Estado: Online

        `;

    }


    else if (lower === "date") {

        response =
            new Date()
                .toLocaleDateString(
                    "es-ES"
                );

    }


    else if (lower === "time") {

        response =
            new Date()
                .toLocaleTimeString(
                    "es-ES"
                );

    }


    else if (lower === "status") {

        response = `

            🟢 Sistema: Online
            <br>
            💻 CPU: Simulada
            <br>
            🧠 RAM: Simulada
            <br>
            ☁️ Cloud: Conectado
            <br>
            🔐 Seguridad: Activa

        `;

    }


    else if (lower === "whoami") {

        response = "LAKY";

    }


    else if (lower === "version") {

        response =
            "LAKY Cloud OS v1.0.0";

    }


    else if (
        lower.startsWith("echo ")
    ) {

        response =
            escapeHTML(
                command.substring(5)
            );

    }


    else {

        response = `

            ❌ Comando no encontrado:
            ${escapeHTML(command)}

            <br>

            Escribe
            <b>help</b>
            para ver los comandos.

        `;

    }


    output.innerHTML +=
        `<br>${response}`;


    input.value = "";


    const terminal =
        document.querySelector(
            ".terminal-content"
        );


    if (terminal) {

        terminal.scrollTop =
            terminal.scrollHeight;

    }

}


// ==========================================
// BLOC DE NOTAS
// ==========================================

const notes =
    document.getElementById(
        "notes-area"
    );


if (notes) {

    const savedNotes =
        localStorage.getItem(
            "laky_notes"
        );


    if (savedNotes !== null) {

        notes.value =
            savedNotes;

    }


    notes.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "laky_notes",
                notes.value
            );

        }
    );

}


// ==========================================
// ARRASTRAR VENTANAS
// ==========================================

document
    .querySelectorAll(".window")
    .forEach(windowElement => {


        const header =
            windowElement.querySelector(
                ".window-header"
            );


        if (!header) return;


        let dragging = false;

        let offsetX = 0;

        let offsetY = 0;


        header.addEventListener(
            "mousedown",
            event => {


                if (
                    event.target.closest(
                        ".window-controls"
                    )
                ) {
                    return;
                }


                if (
                    windowElement.classList
                        .contains("maximized")
                ) {
                    return;
                }


                dragging = true;


                const rect =
                    windowElement
                        .getBoundingClientRect();


                offsetX =
                    event.clientX -
                    rect.left;


                offsetY =
                    event.clientY -
                    rect.top;


                windowElement.style.zIndex =
                    ++highestZIndex;


                windowElement.style.transform =
                    "none";


                event.preventDefault();

            }
        );


        document.addEventListener(
            "mousemove",
            event => {


                if (!dragging) return;


                let x =
                    event.clientX -
                    offsetX;


                let y =
                    event.clientY -
                    offsetY;


                const maxX =
                    window.innerWidth -
                    windowElement.offsetWidth;


                const maxY =
                    window.innerHeight -
                    windowElement.offsetHeight -
                    55;


                x =
                    Math.max(
                        0,
                        Math.min(x, maxX)
                    );


                y =
                    Math.max(
                        0,
                        Math.min(y, maxY)
                    );


                windowElement.style.left =
                    `${x}px`;


                windowElement.style.top =
                    `${y}px`;

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                dragging = false;

            }
        );


    });


// ==========================================
// ESC
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape")
            return;


        const menu =
            document.getElementById(
                "start-menu"
            );


        if (menu) {

            menu.style.display =
                "none";

        }

    }
);


// ==========================================
// TASKBAR
// ==========================================

function updateTaskbar() {

    const taskbar =
        document.getElementById(
            "taskbar-apps"
        );


    if (!taskbar) return;


    taskbar.innerHTML = "";


    Object.keys(appNames).forEach(
        app => {

            const windowElement =
                document.getElementById(
                    app
                );


            if (!windowElement)
                return;


            const visible =
                windowElement.style.display ===
                "block";


            if (!visible)
                return;


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "taskbar-app";


            button.textContent =
                appNames[app];


            button.onclick = () => {

                if (
                    windowElement.classList
                        .contains("minimized")
                ) {

                    openApp(app);

                } else {

                    windowElement.style.zIndex =
                        ++highestZIndex;

                }

            };


            taskbar.appendChild(button);

        }
    );

}


// ==========================================
// SEGURIDAD
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


function escapeAttribute(text) {

    return text

        .replace(/\\/g, "\\\\")

        .replace(/'/g, "\\'")

        .replace(/"/g, "&quot;");

}


// ==========================================
// INICIO
// ==========================================

console.log(
    "☁️ LAKY PC NUBE iniciado correctamente."
);

```
