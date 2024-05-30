import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { ProfesorService } from '../../../services/profesores.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrl: './editar-profesor.component.css'
})
export class EditarProfesorComponent {

  constructor(private fb:FormBuilder, private profesorService: ProfesorService, private router: Router){}

  public form = this.fb.group({
    ID_Profesor: [localStorage.getItem('id')],
    Contraseña: [''],
    newPassword: [''],
    newPassword2: ['']
  });

  cambiarPwd(){
    if(!this.form.valid){
    }else{
      this.profesorService.updateProfesorPwd(this.form.value).subscribe(
        (response: any) => {
          Swal.fire({
            icon: "success",
            title: "Contraseña cambiada con éxito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['profesores/perfil']);
          });
        },
        (error) => {
          Swal.fire(error.error.message);
        }
      );
    }
  }

}
