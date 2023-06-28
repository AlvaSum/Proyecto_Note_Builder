import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/servicio/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-usuario',
  templateUrl:'./login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit{

  usuarioForm:FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, 
    private router:Router, 
    private toastr:ToastrService,
    private _usuarioService: UsuariosService){
    this.usuarioForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }

  showLoader(): void {
    this.loading = true;
  }
  
  hideLoader(): void {
    this.loading = false;
  }

  iniciarUsuario(){
    this.showLoader();

    const LOGIN = {
      email:this.usuarioForm.get('email')?.value,
      password:this.usuarioForm.get('password')?.value,
      gethash:' '  
    };
    
    if(!(LOGIN.email == '' || LOGIN.password == '')){
      this._usuarioService.acceder(LOGIN).subscribe(data => {
        this.setVariableSession(data);
        this.hideLoader();
        this.router.navigate(['listar-notas']);
        this.toastr.success('Bienvenido', '' , { timeOut: 1000 });
      }, error => {
        console.log(error);
        this.hideLoader();
        this.usuarioForm.reset();
        this.router.navigate(['/']);
        Swal.fire('Error en las credenciales', 'El correo o la contraseña son incorrectas, intenta de nuevo.', 'error');
      });
    }else{
      this.toastr.warning('Ingresa todos los campos')
    }
    //this.toastr.success(USUARIO.email, 'Inicio de sesión'); 
    //this.router.navigate(['/']); 
  }

  setVariableSession(data:any){
    localStorage.setItem('email', data.email);
    localStorage.setItem('user_id', data.user_id);
    localStorage.setItem('token', data.token);
  } 

ngOnInit(): void {
}

}
