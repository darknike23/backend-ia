export default async function handler(req, res) {

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

    // 🔥 MOSTRAR ERROR REAL SI EXISTE
    if (data.error) {
      return res.status(500).json({
        error: data.error.message
      });
    }

    // 🔥 VALIDACIÓN FUERTE
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
        error: "OpenAI no devolvió respuesta válida",
        debug: data
      });
    }

    return res.status(200).json({
      respuesta: data.choices[0].message.content
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
