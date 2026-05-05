
function sendMessage() {

  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatbox");

  const text = input.value.trim();
  if (!text) return;

  // Mostrar mensaje del usuario
  chat.innerHTML += "<p>👤 " + text + "</p>";
  input.value = "";

  // Scroll automático al final
  chat.scrollTop = chat.scrollHeight;

  fetch("https://backend-ia-rf8e.vercel.app/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mensaje: text })
  })

  .then(res => res.json())
  .then(data => {

    // ❌ Mostrar error real si existe
    if (data.error) {
      chat.innerHTML += "<p style='color:red'>❌ " + data.error + "</p>";
      return;
    }

    // 🤖 Respuesta normal del bot
    chat.innerHTML += "<p>🤖 " + (data.respuesta || "Sin respuesta") + "</p>";

    // Scroll automático
    chat.scrollTop = chat.scrollHeight;
  })

  .catch(err => {
    chat.innerHTML += "<p style='color:red'>❌ Error de conexión con el servidor</p>";
  });

}
