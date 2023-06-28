export class Usuario{
    _id?: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol: string;
    imagen: string;

    constructor(nombre: string, apellido:string, email:string, password:string, rol:string, imagen:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.imagen = imagen;
    }
}
