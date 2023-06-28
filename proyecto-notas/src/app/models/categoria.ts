export class Categorias{
    _id?: number;
    id_user: string;
    titulo: string;

    constructor(id_user: string, titulo:string){
        this.id_user = id_user;
        this.titulo = titulo;   
    }
}
