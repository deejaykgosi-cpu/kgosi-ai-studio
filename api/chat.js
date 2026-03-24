export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { message } = req.body;

  const systemPrompt = `
  You are KGOSI AI, a creative assistant for an Amapiano artist.

  Style:
  - Confident
  - Trend-aware (TikTok, music marketing)
  - Creative and catchy

  Help with:
  - Amapiano hooks
  - TikTok captions
  - Fan DM replies
  - Marketing strategies
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.choices[0].message.content
  });
}
