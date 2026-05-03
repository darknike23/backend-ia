export default async function handler(req, res) {

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
          content: "Eres un técnico experto en computadores. Ayudas a diagnosticar problemas de PC de forma simple."
        },
        {
          role: "user",
          content: req.body.mensaje
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    respuesta: data.choices[0].message.content
  });
}
