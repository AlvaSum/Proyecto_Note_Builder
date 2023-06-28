
import { Component, OnInit } from '@angular/core'; 

import {FormBuilder,FormGroup, Validators} from '@angular/forms'; 

import { Notas } from 'src/app/models/datos';

import { Router } from '@angular/router'; 

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-notas',
  templateUrl: './crear-notas.component.html',
  styleUrls: ['./crear-notas.component.css']
})
export class CrearNotasComponent implements OnInit {
  notasFrom:FormGroup; 
  
  constructor(private fb: FormBuilder, private router:Router, private toastr:ToastrService){
    this.notasFrom=this.fb.group({
      titulo:['', Validators.required],
      categoria:['',Validators.required],
      descripcion:['',Validators.required]
  
    })
  }

  crearNota(){
    console.log(this.notasFrom);
    console.log(this.notasFrom);

  const NOTAS:Notas={

    titulo:this.notasFrom.get('titulo')?.value,
    categoria:this.notasFrom.get('categoria')?.value,
    descripcion:this.notasFrom.get('descripcion')?.value,
  }
  console.log(NOTAS);

  this.toastr.success(NOTAS.titulo, 'creado correctamente'); 

this.router.navigate(['/']); 
  }
  ngOnInit(): void { 
}
}
