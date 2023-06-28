import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';

import { CrearNotasComponent } from './componentes/crear-notas/crear-notas.component';
import { ListarNotasComponent } from './componentes/listar-notas/listar-notas.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',component:LoginUsuarioComponent},
  {path:'crear-usuario',component:CrearUsuarioComponent},
  {path:'crear-notas',component:CrearNotasComponent, canActivate: [AuthGuard]}, //canActivate: [AuthGuard]
  {path:'listar-notas',component:ListarNotasComponent, canActivate: [AuthGuard]}, //canActivate: [AuthGuard]
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
