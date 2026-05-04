export default async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(200).json({ ok: true, msg: "Usa POST" });
    }

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
          {
            role: "system",
            content: "Eres un técnico experto en reparación de computadores."
          },
          {
            role: "user",
            content: mensaje
          }
        ]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      respuesta: data?.choices?.[0]?.message?.content || "Sin respuesta IA"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Fallo interno",
      detalle: error.message
    });
  }
}
