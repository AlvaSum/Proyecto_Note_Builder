import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit{
  usuarioForm:FormGroup;
  loading: boolean = false;

  constructor(private fb : FormBuilder, 
    private router:Router, 
    private toastr: ToastrService, 
    private _usuarioService:UsuariosService,
    private aRouter:ActivatedRoute){
      this.usuarioForm=this.fb.group({
        nombre:['',Validators.required],
        apellido:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
        password_confirm:['',Validators.required],
      });
  }

  showLoader(): void {
    this.loading = true;
  }
  
  hideLoader(): void {
    this.loading = false;
  }

  crearUsuario(){
    this.showLoader();
    const USUARIO:Usuario={
      nombre:this.usuarioForm.get('nombre')?.value,
      apellido:this.usuarioForm.get('apellido')?.value,
      email:this.usuarioForm.get('email')?.value,
      password:this.usuarioForm.get('password')?.value,
      rol: '',
      imagen: ''
    }
    if(!(USUARIO.nombre == '' || USUARIO.apellido == '' || USUARIO.email == '' || USUARIO.password == '')){
      const user = {email:USUARIO.email}
      this._usuarioService.validaUsuario(user).subscribe(data => {
        if(data.message == 'NO'){
          this._usuarioService.registrarUsuario(USUARIO).subscribe(data => {
            this.hideLoader();
            this.router.navigate(['/']);
            this.toastr.success('Usuario creado correctamente');
          }, error => {
            console.log(error);
            this.hideLoader();
            this.usuarioForm.reset();
            this.router.navigate(['/']);
            this.toastr.error('Error al crear al usuario');
          }); 
        }else{
          this.userExist(USUARIO.email);
        };
      }, error => {
        console.log(error);
      });
    }else{
      this.toastr.warning('Ingresa todos los campos')
    } 
  }

  userExist(email:any){
    Swal.fire('Correo en uso', `Lo sentimos, el correo ${email} que intentas registrar ya está en uso. Por favor, intenta con otro`, 'error');
  }

  ngOnInit(): void {
  }
}
