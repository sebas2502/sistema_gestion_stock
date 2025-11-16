export default class Empresa {
  id: number;
  nombre: string;
  email_admin: string;
  db_name: string;
  db_user: string;
  db_password: string;
  db_host: string;
  estado: string;

  constructor(
    id: number,
    nombre: string,
    email_admin: string,
    db_name: string,
    db_user: string,
    db_password: string,
    db_host: string,
    estado: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.email_admin = email_admin;
    this.db_name = db_name;
    this.db_user = db_user;
    this.db_password = db_password;
    this.db_host = db_host;
    this.estado = estado;
  }
}
