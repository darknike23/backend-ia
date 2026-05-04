function sendMessage(){

  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatbox");

  const text = input.value;
  if(!text) return;

  chat.innerHTML += "<p>👤 " + text + "</p>";

  input.value = "";

  fetch("https://backend-ia-rf8e.vercel.app/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mensaje: text })
  })
  .then(res => res.json())
  .then(data => {
    chat.innerHTML += "<p style='color:#22c55e'>🤖 " + data.respuesta + "</p>";
  })
  .catch(() => {
    chat.innerHTML += "<p style='color:red'>Error de conexión</p>";
  });

}
