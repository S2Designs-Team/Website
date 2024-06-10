// Selezione degli elementi HTML
const chatContainer = document.querySelector('.chat-container');
const chatHeader = document.querySelector('.chat-header');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');

// Variabili per gestire lo spostamento
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Funzione per gestire l'inizio del trascinamento
chatHeader.addEventListener('mousedown', (event) => {
  isDragging = true;
  offsetX = event.clientX - chatContainer.offsetLeft;
  offsetY = event.clientY - chatContainer.offsetTop;
});

// Funzione per gestire il movimento durante il trascinamento
document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;
    chatContainer.style.left = newX + 'px';
    chatContainer.style.top = newY + 'px';

    // Applica l'effetto 3D di inclinazione
    const angleX = (event.clientY - chatContainer.offsetTop) / 10;
    const angleY = (event.clientX - chatContainer.offsetLeft) / 10;
    chatContainer.style.transform = `perspective(500px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  }
});

// Funzione per gestire la fine del trascinamento
document.addEventListener('mouseup', () => {
  isDragging = false;

  // Ritorna la finestra alla posizione originale con animazione
  chatContainer.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
});

// Funzione per gestire l'invio di messaggi
function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== "") {
    // Aggiungi il messaggio dell'utente alla chat
    addMessage("user", message);

    // Genera la risposta del bot
    /*
    generateResponse(message).then(response => {
        // Aggiungi la risposta del bot alla chat
        addMessage("bot", response);
    });    
    */
  }
  messageInput.value = "";
}

// Funzione per aggiungere un messaggio alla chat
function addMessage(type, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message");
  messageElement.classList.add(type);

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble");
  messageBubble.classList.add(type);
  messageBubble.textContent = message;

  messageElement.appendChild(messageBubble);
  chatMessages.appendChild(messageElement);

  // Scorrere in basso per visualizzare il nuovo messaggio
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Inizia l'ascolto per l'evento click sul pulsante "Invia"
sendButton.addEventListener("click", sendMessage);

// Esporta le funzioni che devono essere utilizzate da altri file
export { sendMessage, addMessage };