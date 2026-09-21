```javascript
// ==========================================
// ☁️ LAKY PC NUBE
// Sistema principal
// ==========================================

let highestZIndex = 100;


// ==========================================
// ABRIR APLICACIÓN
// ==========================================

function openApp(app) {
    const windowElement = document.getElementById(app);

    if (!windowElement) return;

    windowElement.style.display = "block";
    windowElement.style.zIndex = ++highestZIndex;

    // Si estaba minimizada, restaurarla
    windowElement.classList.remove("minimized");

    document.getElementById("start-menu").style.display = "none";
}


// ==========================================
// CERRAR APLICACIÓN
// ==========================================

function closeApp(app) {
    const windowElement = document.getElementById(app);

    if (!windowElement) return;

    windowElement.style.display = "none";
}


// ==========================================
// MINIMIZAR
// ==========================================

function minimizeApp(app) {
    const windowElement = document.getElementById(app);

    if (!windowElement) return;

    windowElement.classList.add("minimized");
}


// ==========================================
// MAXIMIZAR / RESTAURAR
// ==========================================

function maximizeApp(app) {

    const windowElement = document.getElementById(app);

    if (!windowElement) return;

    windowElement.classList.toggle("maximized");

    windowElement.classList.remove("minimized");

    windowElement.style.zIndex = ++highestZIndex;
}


// ==========================================
// TRAER VENTANA AL FRENTE
// ==========================================

document.addEventListener("mousedown", (event) => {

    const windowElement = event.target.closest(".window");

    if (!windowElement) return;

    windowElement.style.zIndex = ++highestZIndex;
});


// ==========================================
// MENÚ INICIO
// ==========================================

function toggleStart() {

    const menu = document.getElementById("start-menu");

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

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}`;
}

updateClock();

setInterval(updateClock, 1000);


// ==========================================
// NAVEGADOR
// ==========================================

function goToSite() {

    const input = document.getElementById("url");
    const result = document.getElementById("browser-result");

    if (!input || !result) return;

    let url = input.value.trim();

    if (!url) {

        result.innerHTML = `
            <p>⚠️ Escribe una dirección primero.</p>
        `;

        return;
    }

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {
        url = "https://" + url;
    }

    result.innerHTML = `
        <p>🌐 Dirección:</p>

        <strong>${escapeHTML(url)}</strong>

        <br><br>

        <button onclick="window.open('${escapeAttribute(url)}', '_blank')">
            Abrir sitio
        </button>
    `;
}


// ==========================================
// TERMINAL
// ==========================================

function terminalCommand(event) {

    if (event.key !== "Enter") return;

    const input = document.getElementById("terminal-command");
    const output = document.getElementById("terminal-output");

    if (!input || !output) return;

    const command = input.value.trim();

    if (!command) return;

    const commandLower = command.toLowerCase();

    output.innerHTML += `
        <br><br>
        <span>user@laky:~$ ${escapeHTML(command)}</span>
    `;

    let response = "";


    // -------------------------------
    // HELP
    // -------------------------------

    if (commandLower === "help") {

        response = `
            Comandos disponibles:<br>
            ─────────────────────────<br>
            help → muestra los comandos<br>
            clear → limpia la terminal<br>
            about → información del sistema<br>
            date → muestra la fecha<br>
            time → muestra la hora<br>
            status → estado del PC Nube<br>
            whoami → usuario actual<br>
            version → versión del sistema<br>
            echo [texto] → muestra texto
        `;

    }


    // -------------------------------
    // CLEAR
    // -------------------------------

    else if (commandLower === "clear") {

        output.innerHTML = "";

        input.value = "";

        return;

    }


    // -------------------------------
    // ABOUT
    // -------------------------------

    else if (commandLower === "about") {

        response = `
            ☁️ LAKY PC NUBE<br>
            Sistema: LAKY Cloud OS<br>
            Versión: 1.0.0<br>
            Estado: Online
        `;

    }


    // -------------------------------
    // DATE
    // -------------------------------

    else if (commandLower === "date") {

        response = new Date().toLocaleDateString("es-ES");

    }


    // -------------------------------
    // TIME
    // -------------------------------

    else if (commandLower === "time") {

        response = new Date().toLocaleTimeString("es-ES");

    }


    // -------------------------------
    // STATUS
    // -------------------------------

    else if (commandLower === "status") {

        response = `
            🟢 Sistema: Online<br>
            💻 CPU: Simulada<br>
            🧠 RAM: Simulada<br>
            ☁️ Cloud: Conectado<br>
            🔐 Seguridad: Activa
        `;

    }


    // -------------------------------
    // WHOAMI
    // -------------------------------

    else if (commandLower === "whoami") {

        response = "LAKY";

    }


    // -------------------------------
    // VERSION
    // -------------------------------

    else if (commandLower === "version") {

        response = "LAKY Cloud OS v1.0.0";

    }


    // -------------------------------
    // ECHO
    // -------------------------------

    else if (commandLower.startsWith("echo ")) {

        response = escapeHTML(
            command.substring(5)
        );

    }


    // -------------------------------
    // COMANDO DESCONOCIDO
    // -------------------------------

    else {

        response = `
            ❌ Comando no encontrado: ${escapeHTML(command)}<br>
            Escribe <b>help</b> para ver los comandos.
        `;

    }


    output.innerHTML += `<br>${response}`;

    input.value = "";

    const terminal = document.querySelector(".terminal-content");

    if (terminal) {

        terminal.scrollTop = terminal.scrollHeight;

    }
}


// ==========================================
// BLOC DE NOTAS
// ==========================================

const notes = document.getElementById("notes-area");

if (notes) {

    const savedNotes = localStorage.getItem("laky_notes");

    if (savedNotes !== null) {

        notes.value = savedNotes;

    }


    notes.addEventListener("input", () => {

        localStorage.setItem(
            "laky_notes",
            notes.value
        );

    });

}


// ==========================================
// TECLA ESC
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        const menu = document.getElementById("start-menu");

        if (menu) {

            menu.style.display = "none";

        }

    }

});


// ==========================================
// HACER VENTANAS ARRASTRABLES
// ==========================================

document.querySelectorAll(".window").forEach(windowElement => {

    const header = windowElement.querySelector(".window-header");

    if (!header) return;

    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;


    header.addEventListener("mousedown", (event) => {

        // No arrastrar al pulsar botones
        if (event.target.tagName === "BUTTON") return;

        if (windowElement.classList.contains("maximized")) {
            return;
        }

        dragging = true;

        const rect = windowElement.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        windowElement.style.zIndex = ++highestZIndex;

        event.preventDefault();

    });


    document.addEventListener("mousemove", (event) => {

        if (!dragging) return;

        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;


        // No permitir salir demasiado de la pantalla

        const maxX =
            window.innerWidth -
            windowElement.offsetWidth;

        const maxY =
            window.innerHeight -
            windowElement.offsetHeight -
            55;


        x = Math.max(0, Math.min(x, maxX));

        y = Math.max(0, Math.min(y, maxY));


        windowElement.style.left = `${x}px`;
        windowElement.style.top = `${y}px`;

        windowElement.style.transform = "none";

    });


    document.addEventListener("mouseup", () => {

        dragging = false;

    });

});


// ==========================================
// SOP
```
