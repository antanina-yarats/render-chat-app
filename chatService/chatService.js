import { sql } from "../database/database.js";

const create = async (sender, message) => {
   await sql `INSERT INTO messages (sender, message) VALUES (${sender}, ${message})`;
};

const showMessages = async () => {
   const result = await sql `SELECT sender, message FROM messages ORDER BY id ASC LIMIT 5`;
   return  result;
};


export { create, showMessages };
