export class Notas{
    _id?: number;
    id_user: string;
    titulo: string;
    descripcion: string;
    fecha?: Date;
    categoria: string;

    constructor(id_user: string, titulo:string, descripcion:string, categoria:string){
        this.id_user = id_user;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.categoria = categoria
    }
}
