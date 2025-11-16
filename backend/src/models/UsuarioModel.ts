export default class Usuario {
  id: number;
  nombre: string;
  email: string;
  passwordHash: string;
  rol: string;
  estado: string;

  constructor(
    id: number,
    nombre: string,
    email: string,
    passwordHash: string,
    rol: string,
    estado: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.passwordHash = passwordHash;
    this.rol = rol;
    this.estado = estado;
  }
}
