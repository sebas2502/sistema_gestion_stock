import mysql, { Pool } from "mysql2/promise";

// 🔹 Configuración general para conexión global
const globalDbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_GLOBAL || "sistema_global",
};

// 🔹 Cache de pools de empresas (para evitar crear conexiones repetidas)
const companyPools: Record<string, Pool> = {};

let globalPool: Pool | null = null;

// ✅ Devuelve la conexión (pool) al sistema global
export async function getGlobalConnection(): Promise<Pool> {
  if (!globalPool) {
    globalPool = mysql.createPool(globalDbConfig);
    console.log("🌍 Conectado a la base de datos global");
  }
  return globalPool;
}

// ✅ Devuelve un pool dinámico según la base de datos de la empresa
export async function getCompanyConnection(dbName: string): Promise<Pool> {
  if (companyPools[dbName]) return companyPools[dbName];

  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: dbName,
  });

  companyPools[dbName] = pool;
  console.log(`🏢 Conectado a la base de datos: ${dbName}`);
  return pool;
}
