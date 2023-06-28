export class Usuarios{ 

        _id?: number; 
    
        correo: string; 
    
        contraseña: string; 
    
        constructor(correo: string, contraseña:string){ 
    
            this.correo=correo; 
    
            this.contraseña=contraseña; 
    
    
        } 
    
    } 



export class NuevoUsuario{
    nombre:string;

    apellido:String;

    correo_nuevo:String;

    contraseña_nuevo: String;

    constructor(nombre:string,apellido:String,correo_nuevo:String,contraseña_nuevo:String){
        this.nombre=nombre;
        this.apellido=apellido;
        this.correo_nuevo=correo_nuevo;
        this.contraseña_nuevo=contraseña_nuevo; 


    }


}

export class Notas{

    titulo: string;

    descripcion:string;

    categoria:string;

    constructor(titulo:string,descripcion:string,categoria:string){
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.categoria=categoria;
    }

}