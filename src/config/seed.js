import db from "./db.js";
import bcrypt from "bcrypt";

let query = "INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)";

const adminpassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

db.run(query, [1, "admin", adminpassword, "admin"], async (err) => {
  if (err) {
    console.log("Errore nella creazione dell'utente admin");
    process.exit();
  }
  const alicepassword = await bcrypt.hash(process.env.ALICE_PASSWORD, 10);
  db.run(query, [2, "alice", alicepassword, "user"], (err) => {
    if (err) {
      console.log("Errore nella creazione dell'utente alice");
      process.exit();
    }
    db.serialize(() => {
      query =
        "INSERT INTO tickets (title, description, is_confidential, user_id) VALUES (?, ?, ?, ?)";
      db.run(query, ["test", "this is an amazing ticket", 0, 2], (err) => {
        if (err) {
          console.log("Errore nella creazione di un ticket");
          process.exit();
        }
      });
      db.run(query, ["secret", "maybe in the next ticket", 0, 1], (err) => {
        if (err) {
          console.log("Errore nella creazione di un ticket");
          process.exit();
        }
      });
      db.run(
        query,
        ["real_secret", "FLAG{1d0r_4nd_sql1_m4st3r}", 1, 1],
        (err) => {
          if (err) {
            console.log("Errore nella creazione di un ticket");
            process.exit();
          }
          console.log("Seed completed");
          db.close();
        },
      );
    });
  });
})
