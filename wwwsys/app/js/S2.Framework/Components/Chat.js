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
let previousX = 0;
let previousY = 0;

// Funzione per gestire l'inizio del trascinamento
chatHeader.addEventListener('mousedown', (event) => {
  isDragging = true;
  offsetX = event.clientX - chatContainer.offsetLeft;
  offsetY = event.clientY - chatContainer.offsetTop;

  // Inizializza le coordinate precedenti
  previousX = event.clientX;
  previousY = event.clientY;
});

// Funzione per gestire il movimento durante il trascinamento
document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    // Calcola la distanza percorsa dal mouse
    const distanceX = event.clientX - previousX;
    const distanceY = event.clientY - previousY;

    // Calcola l'angolo di inclinazione in gradi (separatamente per X e Y)
    const angleY = Math.atan2(distanceY, distanceX) * (180 / Math.PI); 
    const angleX = Math.atan2(distanceY, distanceX) * (180 / Math.PI); 

    // Calcola l'angolo di inclinazione in base alla distanza e alla velocità
    const angleY = Math.min(70, Math.max(-70, (event.clientX - chatContainer.offsetLeft) / 30 * (distanceX / 10)));
    const angleX = Math.min(70, Math.max(-70, (event.clientY - chatContainer.offsetTop) / 30 * (distanceY / 10)));

    // Applica l'effetto 3D di inclinazione in direzione opposta (separatamente per X e Y)
    chatContainer.style.transform = `perspective(600px) rotateX(${angleX}deg) rotateY(${angleY}deg)`; 

    // Sposta la chat in base alla posizione del mouse
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;
    chatContainer.style.left = newX + 'px';
    chatContainer.style.top = newY + 'px';

    // Aggiorna le coordinate precedenti
    previousX = event.clientX;
    previousY = event.clientY;
  }
});

// Funzione per gestire la fine del trascinamento
document.addEventListener('mouseup', () => {
  isDragging = false;

  // Ritorna la finestra alla posizione originale con animazione
  chatContainer.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
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