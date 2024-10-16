import pkg from 'pg';
const { Client } = pkg;
import dotenv from "dotenv";

dotenv.config();
const db_url = process.env.ATLAS_URI;

const createClient = () => {
    return new Client({
    connectionString: db_url,
  });
}

export default createClient;