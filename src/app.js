import express from "express";
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import path from "node:path";

const PORT = process.env.PORT;
const app = express();
const publicPath = path.join(import.meta.dirname, '..', 'public');

app.use(express.json());
app.use(express.static(publicPath));
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/api/status", (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      status: "ok",
    },
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("errore nell'avvio del server : ", err);
  } else {
    console.log(`Serve in ascolto sulla porta ${PORT}`);
  }
});
