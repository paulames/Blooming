import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './commons/footer/footer.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CommonsModule } from './commons/commons.module';
import { ComponentsModule } from './components/components.module';

import { MotorGrafico } from './graphics/motor/motorGrafico';

@NgModule({
  declarations: [
    AppComponent,
    /*FooterComponent,
    CentrosComponent,
    CrearCentrosComponent,
    ProfesoresComponent,
    AlumnosComponent,
    ClasesComponent,
    CrearAlumnosComponent,
    CrearClasesComponent,
    CrearProfesoresComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
    CommonModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
