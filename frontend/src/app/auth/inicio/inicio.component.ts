import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.validarToken()
      .subscribe(({ valido, rol }) => {
        const aux = true;
        if (valido) {
          switch (rol) {
            case 'Admin':
              this.router.navigate(['admin/dashboard']);
              break;
            case 'Centro':
              this.router.navigate(['centros/dashboard']);
              break;
            case 'Alumno':
              this.router.navigate(['alumnos/arbol-escena'], {state: {aux}});
              break;
            case 'Profesor':
              this.router.navigate(['profesores/dashboard']);
              break;
            default:
              localStorage.removeItem('token');
          }
        }
      });
  }
}
