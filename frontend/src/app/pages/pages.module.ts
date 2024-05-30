import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../commons/sidebar/sidebar.component';
import { NavbarComponent } from '../commons/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SidebarCentroComponent } from '../commons/sidebar-centro/sidebar-centro.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

import { CommonsModule } from '../commons/commons.module';
import { ComponentsModule } from '../components/components.module'

//CENTROS
import { VerProfesoresCComponent } from './centros/ver-profesores-c/ver-profesores-c.component';
import { VerClasesCComponent } from './centros/ver-clases-c/ver-clases-c.component';
import { VerAlumnosCComponent } from './centros/ver-alumnos-c/ver-alumnos-c.component';
import { CrearAlumnosCComponent } from './centros/crear-alumnos-c/crear-alumnos-c.component';
import { CrearClasesCComponent } from './centros/crear-clases-c/crear-clases-c.component';
import { CrearProfesoresCComponent } from './centros/crear-profesores-c/crear-profesores-c.component';

//ADMIN
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { VerProfesoresComponent } from './admin/ver-profesores/ver-profesores.component';
import { CrearProfesoresComponent } from './admin/crear-profesores/crear-profesores.component';
import { EditarProfesoresComponent } from './admin/editar-profesores/editar-profesores.component';
import { VerAlumnosComponent } from './admin/ver-alumnos/ver-alumnos.component';
import { CrearAlumnosComponent } from './admin/crear-alumnos/crear-alumnos.component';
import { EditarAlumnosComponent } from './admin/editar-alumnos/editar-alumnos.component';
import { VerClasesComponent } from './admin/ver-clases/ver-clases.component';
import { CrearClasesComponent } from './admin/crear-clases/crear-clases.component';
import { EditarClasesComponent } from './admin/editar-clases/editar-clases.component';
import { VerCentrosComponent } from './admin/ver-centros/ver-centros.component';
import { CrearCentrosComponent } from './admin/crear-centros/crear-centros.component';
import { EditarCentrosComponent } from './admin/editar-centros/editar-centros.component';

//PROFESORES
import { ProfesoresComponent } from './profesores/profesores.component';
import { VerAlumnosPComponent } from './profesores/ver-alumnos-p/ver-alumnos-p.component';
import { VerPerfilAlumnoComponent } from './profesores/ver-perfil-alumno/ver-perfil-alumno.component';
import { ActividadRecienteComponent } from './profesores/actividad-reciente/actividad-reciente.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarAlumnosCComponent } from './centros/editar-alumnos-c/editar-alumnos-c.component';
import { EditarProfesoresCComponent } from './centros/editar-profesores-c/editar-profesores-c.component';
import { EditarClasesCComponent } from './centros/editar-clases-c/editar-clases-c.component';
import { AlumnoLayoutComponent } from '../layouts/alumno-layout/alumno-layout.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { PerfilAdminComponent } from './admin/perfil-admin/perfil-admin.component';
import { EditarAdminComponent } from './admin/editar-admin/editar-admin.component';
import { PerfilCentroComponent } from './centros/perfil-centro/perfil-centro.component';
import { EditarCentroComponent } from './centros/editar-centro/editar-centro.component';
import { PerfilProfesorComponent } from './profesores/perfil-profesor/perfil-profesor.component';
import { EditarProfesorComponent } from './profesores/editar-profesor/editar-profesor.component';

//ALUMNOS
import { ActividadRecienteNegativaComponent } from './profesores/actividad-reciente-negativa/actividad-reciente-negativa.component';
import { ArbolEscenaComponent } from './alumnos/arbol-escena/arbol-escena.component';
import { RecompensasComponent } from './alumnos/recompensas/recompensas.component';
import { AyudaAmbitosComponent } from './profesores/ayuda-ambitos/ayuda-ambitos.component';
import { TodosAlumnosComponent } from './profesores/todos-alumnos/todos-alumnos.component';
import { VerMasPreguntasComponent } from './profesores/ver-mas-preguntas/ver-mas-preguntas.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { CookiesComponent } from './cookies/cookies.component';
import { CondicionesUsoComponent } from './condiciones-uso/condiciones-uso.component';
import { InformacionLegalComponent } from './informacion-legal/informacion-legal.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AlumnoLayoutComponent,
    AdmindashboardComponent,
    VerProfesoresCComponent,
    VerClasesCComponent,
    VerAlumnosCComponent,
    CrearAlumnosCComponent,
    CrearClasesCComponent,
    CrearProfesoresCComponent,
    EditarAlumnosComponent,
    EditarClasesComponent,
    EditarProfesoresComponent,
    EditarCentrosComponent,
    ProfesoresComponent,
    VerAlumnosPComponent,
    VerPerfilAlumnoComponent,
    ActividadRecienteComponent,
    CrearProfesoresComponent,
    CrearClasesComponent,
    CrearAlumnosComponent,
    CrearCentrosComponent,
    VerProfesoresComponent,
    VerAlumnosComponent,
    VerClasesComponent,
    VerCentrosComponent,
    EditarAlumnosCComponent,
    EditarProfesoresCComponent,
    EditarClasesCComponent,
    AlumnosComponent,
    PerfilAdminComponent,
    EditarAdminComponent,
    PerfilCentroComponent,
    EditarCentroComponent,
    PerfilProfesorComponent,
    EditarProfesorComponent,
    ArbolEscenaComponent,
    ActividadRecienteNegativaComponent,
    RecompensasComponent,
    AyudaAmbitosComponent,
    TodosAlumnosComponent,
    VerMasPreguntasComponent,
    PoliticaPrivacidadComponent,
    CookiesComponent,
    CondicionesUsoComponent,
    InformacionLegalComponent
  ],
  exports: [
    AdminLayoutComponent,
    AlumnoLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
