import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { CrearNotasComponent } from './componentes/crear-notas/crear-notas.component';
import { ListarNotasComponent } from './componentes/listar-notas/listar-notas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    CrearUsuarioComponent,
    CrearNotasComponent,
    ListarNotasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgIf
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
