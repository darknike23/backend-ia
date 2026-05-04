async function sendMessage(){

  let input = document.getElementById("userInput").value;
  let chat = document.getElementById("chatbox");

  chat.innerHTML += "<p>👤 " + input + "</p>";

  let res = await fetch("https://backend-ia-rf8e.vercel.app/api/chat", {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({ mensaje: input })
  });

  let data = await res.json();

  chat.innerHTML += "<p style='color:#22c55e'>🤖 " + data.respuesta + "</p>";
}
