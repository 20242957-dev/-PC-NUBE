// ==========================================
// LAKY PC NUBE
// Sistema principal
// ==========================================

// ===============================
// ABRIR APLICACIONES
// ===============================

function openApp(app) {
    const windowElement = document.getElementById(app);

    if (!windowElement) return;

    windowElement.style.display = "block";

    // Cerrar menú inicio
    document.getElementById("start-menu").style.display = "none";
}


// ===============================
// CERRAR APLICACIONES
// ===============================

function closeApp(app) {
    const windowElement = document.getElementById(app);

    if (!windowElement) return;

    windowElement.style.display = "none";
}


// ===============================
// MENÚ INICIO
// ===============================

function toggleStart() {
    const menu = document.getElementById("start-menu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


// ===============================
// RELOJ
// ===============================

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


// ===============================
// NAVEGADOR
// ===============================

function goToSite() {

    const input = document.getElementById("url");
    const result = document.getElementById("browser-result");

    let url = input.value.trim();

    if (!url) {
        result.textContent = "Escribe una dirección primero.";
        return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    result.innerHTML = `
        <p>🌐 Abriendo:</p>
        <br>
        <strong>${url}</strong>
        <br><br>
        <button onclick="window.open('${url}', '_blank')">
            Abrir sitio
        </button>
    `;
}


// ===============================
// TERMINAL
// ===============================

function terminalCommand(event) {

    if (event.key !== "Enter") return;

    const input = document.getElementById("terminal-command");
    const output = document.getElementById("terminal-output");

    const command = input.value.trim().toLowerCase();

    if (!command) return;

    output.innerHTML += `<br><br>user@laky:~$ ${command}`;

    let response = "";

    switch (command) {

        case "help":
            response = `
                Comandos disponibles:<br>
                ─────────────────────<br>
                help - muestra los comandos<br>
                clear - limpia la terminal<br>
                about - información del sistema<br>
                date - muestra la fecha<br>
                time - muestra la hora<br>
                status - estado del PC Nube<br>
                echo [texto] - escribe texto
            `;
            break;

        case "clear":
            output.innerHTML = "";
            input.value = "";
            return;

        case "about":
            response = `
                ☁️ LAKY PC NUBE<br>
                Sistema: LAKY Cloud OS<br>
                Versión: 1.0.0<br>
                Estado: Online
            `;
            break;

        case "date":
            response = new Date().toLocaleDateString("es-ES");
            break;

        case "time":
            response = new Date().toLocaleTimeString("es-ES");
            break;

        case "status":
            response = `
                🟢 Sistema online<br>
                💻 CPU: simulada<br>
                🧠 RAM: simulada<br>
                ☁️ Cloud: conectado
            `;
            break;

        default:

            if (command.startsWith("echo ")) {

                response = command.substring(5);

            } else {

                response = `
                    ❌ Comando no encontrado: ${command}<br>
                    Escribe <b>help</b> para ver los comandos.
                `;
            }
    }

    output.innerHTML += `<br>${response}`;

    input.value = "";

    const terminal = document.querySelector(".terminal-content");

    terminal.scrollTop = terminal.scrollHeight;
}


// ===============================
// BLOC DE NOTAS
// ===============================

const notes = document.getElementById("notes-area");

if (notes) {

    // Recuperar notas guardadas
    const savedNotes = localStorage.getItem("laky_notes");

    if (savedNotes) {
        notes.value = savedNotes;
    }

    // Guardar automáticamente
    notes.addEventListener("input", () => {

        localStorage.setItem(
            "laky_notes",
            notes.value
        );

    });
}


// ===============================
// TECLA ESC
// ===============================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        document.getElementById("start-menu").style.display = "none";

    }

});


// ===============================
// MENSAJE DE INICIO
// ===============================

console.log("☁️ LAKY PC NUBE iniciado correctamente.");
