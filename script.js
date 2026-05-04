export default async function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    const mensaje = req.body?.mensaje;

    if (!mensaje) {
      return res.status(400).json({ error: "Falta mensaje" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Eres técnico experto en PCs." },
          { role: "user", content: mensaje }
        ]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      respuesta: data.choices[0].message.content
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
