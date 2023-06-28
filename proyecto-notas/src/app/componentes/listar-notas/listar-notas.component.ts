import { Component, ElementRef, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { NotasService } from 'src/app/servicio/notas.service';
import { CategoriasService } from 'src/app/servicio/categorias.service';
import { Notas } from 'src/app/models/notas';
import { Categorias } from 'src/app/models/categoria';
import { ToastrService } from 'ngx-toastr';
import UIkit from 'uikit';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.css']
})
export class ListarNotasComponent implements OnInit{
  titulo = 'Administrar mis notas';
  noteForm:FormGroup;
  categoryForm:FormGroup;
  usuario?: string;
  opcionSeleccionada: string = '';
  listCategory:Categorias[]=[];
  listNotes:any[]=[];
  loading: boolean = false;
  editarIDCategory: string = '';
  editarIDNote: string = '';

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService, 
    private _categoriaService:CategoriasService,
    private _notaService:NotasService
    ){
      this.noteForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required]
      });
      this.categoryForm = this.fb.group({
        title: ['', Validators.required],
      })
    }

  cambiarOpcion(opcion: string) {
    if(opcion === 'misNotas' ){
      this.titulo = 'Administrar mis notas';
    }else{
      this.titulo = 'Administrar notas de grupo'; 
    }
    this.opcionSeleccionada = opcion;
  }

  editarNota(note:any){
    this.editarIDNote = note._id;
    this.noteForm.patchValue({
      title: note.titulo,
      description: note.descripcion,
      category: note.categoria
    });
    UIkit.modal('#my-modal-edit-note').show();    
  }

  eliminarNota(note:any){
    Swal.fire({
      title: `¿Estas seguro de eliminar la nota ${note.titulo}`,
      text: 'Este proceso es irreversible, la nota quedará eliminada permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.deleteNota(note._id);
        Swal.fire('Eliminada!', 'Nota eliminada correctamente', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  deleteNota(id:any){
    this.showLoader();
    this._notaService.eliminarNota(id).subscribe(data => {
      this.obtenerCategorias();
      this.hideLoader();
    }, error => {
      console.log(error);
      this.hideLoader();
    })
  }

  editarCategoria(catego:any) {
    this.editarIDCategory = catego._id;
    this.categoryForm.patchValue({
      title: catego.titulo,
    });
    UIkit.modal('#my-modal-edit-category').show();
  }

  eliminarCategoria(categoria:any){
    Swal.fire({
      title: `¿Estas seguro de eliminar la categoria ${categoria.titulo}`,
      text: 'Este proceso es irreversible y todas las notas de la categoría serán eliminadas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.deleteCategoria(categoria._id);
        Swal.fire('Eliminada!', 'Categoria eliminada correctamente', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  deleteCategoria(id:any){
    this.showLoader();
    this._categoriaService.eliminarCategoria(id).subscribe(data => {
      this.obtenerCategorias();
      this.hideLoader();
    }, error => {
      console.log(error);
      this.hideLoader();
    })
  }

  obtenerNotas(id:any){
    const notas = {
      id_user: localStorage.getItem('user_id')!,
      categoria: id
    }
    this._notaService.obtenerNotas(notas).subscribe(data => {
      this.listNotes = data;
      this.listNotes.forEach((nota) => {
        nota.fecha = new Date(nota.fecha).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      });
    }, error => {
      console.log(error);
    });

  }
  
  saveNote(){
    this.showLoader()
    if(this.editarIDNote == ''){
      const NOTA:Notas={
        id_user: localStorage.getItem('user_id')!,
        titulo: this.noteForm.get('title')?.value,
        descripcion: this.noteForm.get('description')?.value,
        categoria: this.noteForm.get('category')?.value
      };
  
      if(!(NOTA.id_user == '' || NOTA.titulo == '' || NOTA.descripcion == '' || NOTA.categoria == '')) {
        this._notaService.registrarNota(NOTA).subscribe(data => {
          this.obtenerCategorias();
          this.noteForm.reset();
          this.noteForm.reset();
          this.successNotification('Nota');
          UIkit.modal('#my-modal-note').hide()
          this.hideLoader();
        },error => {
          console.log(error);
          this.noteForm.reset();
          this.hideLoader();
        })
      }else{
        this.toastr.warning('Introduce todos los campos', '' ,{ timeOut: 1000 })
      }
    }else{
      const nota = {        
        titulo: this.noteForm.get('title')?.value,
        descripcion: this.noteForm.get('description')?.value,
        categoria: this.noteForm.get('category')?.value
      }
      if(!(nota.titulo == '' || nota.descripcion == '' || nota.categoria == '')) {
        this._notaService.actualizarNota(this.editarIDNote, nota).subscribe(data => {
          this.obtenerCategorias();
          this.noteForm.reset();
          this.noteForm.reset();
          this.updateNotifications('Nota');
          UIkit.modal('#my-modal-edit-note').hide()
          this.editarIDNote = ''; //important
          this.hideLoader();
        }, error => {
          console.log(error);
          this.noteForm.reset();
          this.hideLoader();
        });
      }else{
        this.toastr.warning('Introduce todos los campos', '' ,{ timeOut: 1000 })
      }
    }
    
  }

  saveCategory(){
    this.showLoader();
    if(this.editarIDCategory == ''){
      const CATEGORIA:Categorias={
        id_user: localStorage.getItem('user_id')!,
        titulo: this.categoryForm.get('title')?.value
      }
      if(!(CATEGORIA.titulo == '')){
        this._categoriaService.registrarCategoria(CATEGORIA).subscribe(data => {
          this.obtenerCategorias();
          this.categoryForm.reset();
          this.successNotification('Categoria');
          UIkit.modal('#my-modal-category').hide();
          this.hideLoader();
        }, error => {
          console.log(error);
          this.categoryForm.reset();
          this.hideLoader();
        });
      }else{
        this.toastr.warning('Ingresa el titulo de la categoria', '' ,{ timeOut: 1000 })
      } 
    }else{
      const titulo = {
        titulo: this.categoryForm.get('title')?.value
      }
      if(!(titulo.titulo == '')){
        this._categoriaService.actualizarCategoria(this.editarIDCategory, titulo).subscribe(data => {
          this.obtenerCategorias();
          this.categoryForm.reset();
          this.updateNotifications('Categoria');
          UIkit.modal('#my-modal-edit-category').hide();
          this.editarIDCategory = ''; //important
          this.hideLoader();
        }, error => {
          console.log(error);
          this.categoryForm.reset();
          this.hideLoader();
        });
      }else{
        this.toastr.warning('Ingresa el titulo de la categoria', '' ,{ timeOut: 1000 })
      } 
    }
    
  }

  logout(){
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/']);
  }

  showLoader(): void {
    this.loading = true;
  }
  
  hideLoader(): void {
    this.loading = false;
  }

  obtenerCategorias() {
    const user = {
      user_id: localStorage.getItem('user_id')
    }
    this._categoriaService.obtenerCategorias(user).subscribe(data => {
      this.listCategory = data;
    }, error => {
      console.log(error);
    });
  }

  crearCategoria() {
    this.categoryForm.reset();
    UIkit.modal('#my-modal-category').show();
  }

  crearNota() {
    this.noteForm.reset();
    UIkit.modal('#my-modal-note').show();
  }

  successNotification(msg:any) {
    Swal.fire(`${msg} creada correctamente`, '', 'success');
  }

  updateNotifications(msg:any) {
    Swal.fire(`${msg} actualizada correctamente`, '', 'success');
  }


  ngOnInit(): void {
    this.usuario = localStorage.getItem('email')!;
    this.obtenerCategorias();
  }
}
