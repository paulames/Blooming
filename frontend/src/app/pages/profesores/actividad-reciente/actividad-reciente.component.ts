import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RespuestaService } from '../../../services/respuestas.service';
import { ProfesorService } from '../../../services/profesores.service';
import { SesionService } from '../../../services/sesiones.service';
import { AlumnoService } from '../../../services/alumnos.service';
import * as echarts from 'echarts';
import { interval } from 'rxjs';
import { splitNsName } from '@angular/compiler';

@Component({
  selector: 'app-actividad-reciente',
  templateUrl: './actividad-reciente.component.html',
  styleUrl: './actividad-reciente.component.css'
})
export class ActividadRecienteComponent implements OnInit {
  public filPag = 5;
  public posActual = 0;
  private busqueda = '';
  private idCentro!: number;
  public recientesData: any;
  public totalActividades = 0;
  alumnosData: any;
  sesionesData: any;
  public actividadPorDia: number[] = [];
  sessionsData: any[] = [];

  private contar = 0;

  filtroNombre: string = ''; 

  constructor(private sesionService: SesionService, private alumnoService: AlumnoService, private respuestaService: RespuestaService, private profesorService: ProfesorService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.recientesData = [];
  }

  ngOnInit() {
    if(localStorage.getItem('ID_Clase')){
      localStorage.removeItem('ID_Clase');
    }

    if(localStorage.getItem('ID_Alumno')){
      localStorage.removeItem('ID_Alumno');
    }

    this.obtenerCentro();
  }

  obtenerCentro() {
    var idPorfesor = localStorage.getItem('id');
    
    this.profesorService.getProfesorID(idPorfesor).subscribe((res: any) => {
      this.idCentro = res.profesores[0].ID_Centro;
      this.obtenerRespuestasCentro();
      this.obtenerActividadReciente(this.busqueda);
      this.obtenerAlumnosCentro();
    });
  }

  obtenerAlumnosCentro(){
    this.alumnoService.getAlumnosCentro(this.idCentro).subscribe((res: any) => {
      this.alumnosData = res.alumnos;
      this.obtenerSesionesAlumnos(); 
    });
  }

  obtenerSesionesAlumnos(){
    this.sesionService.getSesionesCentro(this.idCentro).subscribe((res: any) => {
      this.sesionesData = [];
      for(let i=0; i < this.alumnosData.length ; i++){
        for(let j=0; j < res.sesiones.length; j++){
          if(res.sesiones[j].ID_Alumno === this.alumnosData[i].ID_Alumno){
            this.sesionesData.push(res.sesiones[j]);
          }
        }  
      }
      //console.log(this.sesionesData);
      this.contarSesionesPorDia();
    }); 
  }
  obtenerRespuestasCentro(){
    this.respuestaService.getRespuestasCentro(this.idCentro, 0).subscribe((res: any) => {
      //console.log(res);
    });
  }
  filtrarAlumnos() {
    this.obtenerActividadReciente(this.filtroNombre);
  }
  obtenerActividadReciente(buscar: string) {
    this.busqueda = buscar;
    this.respuestaService.getRespuestasCentro(this.idCentro, -1, this.posActual, this.filPag, this.contar, this.busqueda).subscribe((res: any) => {
      //console.log(res)
      if(res["respuestas"].length === 0){
        if(this.posActual > 0){
          this.posActual = this.posActual - this.filPag;
          if(this.posActual < 0){
            this.posActual = 0
          }
          this.obtenerActividadReciente(this.busqueda);
        }else {
          this.recientesData = [];
          this.totalActividades = 0;
        }
      }else{
        this.recientesData = res.respuestas;
        this.totalActividades = res.page.total;
        //console.log(this.recientesData)
      }
    });
  }

  cambiarPagina( pagina: any){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posActual = ((pagina - 1) * this.filPag >= 0 ? (pagina - 1) * this.filPag : 0);
    this.obtenerActividadReciente(this.busqueda);
  }

  cambiarFilasPagina(filas: any){
    this.filPag = filas;
    this.cambiarPagina(1);
  }  

  verPerfil(alumnoID: any){
    const volverPag = 0;
    localStorage.setItem('ID_Alumno', alumnoID);
    this.router.navigate(['profesores/ver-perfil-alumno'], {state: {alumnoID, volverPag}});
  }
  getAmbito(ambito: any): string {
    let color = "";
    
    if(ambito === 'Familia'){
      color = 'badge bg-familia rounded-3 fw-semibold';
    }
    if(ambito === 'Emociones'){
      color = 'badge bg-emociones rounded-3 fw-semibold';
    }
    if(ambito === 'Amigos'){
      color = 'badge bg-amigos rounded-3 fw-semibold';
    }
    if(ambito === 'Clase'){
      color = 'badge bg-clase rounded-3 fw-semibold';
    }
    if(ambito === 'Inicio'){
      color = 'badge bg-inicio rounded-3 fw-semibold';
    }
    if(ambito === 'Fuera de clase'){
      color = 'badge bg-fuera rounded-3 fw-semibold';
    }

    return color;
  }

  contarSesionesPorDia() {
    const sesionesPorDia: { [diaSemana: string]: number } = {};
  
    // Obtener la fecha actual y calcular la fecha hace 6 días
    const hoy = new Date();
    const haceSeisDias = new Date();
    haceSeisDias.setDate(hoy.getDate() - 7);
  
    this.sesionesData.forEach((sesion: any) => {
      if (sesion.FechaInicio && sesion.FechaInicio.Fecha && typeof sesion.FechaInicio.Fecha === 'string') {
        const fechaInicio = new Date(sesion.FechaInicio.Fecha);
  
        // Verificar si la fecha está dentro de los últimos 7 días
        if (fechaInicio >= haceSeisDias && fechaInicio <= hoy) {
          const diaSemana = fechaInicio.getDay(); // 0 es domingo, 6 es sábado
          sesionesPorDia[diaSemana] = (sesionesPorDia[diaSemana] || 0) + 1;
        }
      } else {
        console.error('La propiedad "FechaInicio.Fecha" no está presente o tiene un formato incorrecto:', sesion);
      }
    });
  
    // Inicializar actividadPorDia para los últimos 7 días (0 a 6, domingo a sábado)
    const actividadPorDiaTemp = [0, 0, 0, 0, 0, 0, 0];
    Object.keys(sesionesPorDia).forEach((dia) => {
      actividadPorDiaTemp[parseInt(dia)] = sesionesPorDia[dia];
    });
  
    // Reordenar actividadPorDia para que empiece desde el día actual
    const diaActual = hoy.getDay();
    this.actividadPorDia = actividadPorDiaTemp.slice(diaActual + 1).concat(actividadPorDiaTemp.slice(0, diaActual + 1));
  
    this.dibujarGrafica();
  }
  
  dibujarGrafica() {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diaActual = hoy.getDay();
    const diasReordenados = diasSemana.slice(diaActual + 1).concat(diasSemana.slice(0, diaActual + 1));
  
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option;
  
    option = {
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: diasReordenados,
          axisLabel: {
            formatter: (value: string, index: number) => {
              if (index === diaActual+1) {
                return `{bold|${value}}`;
              }
              return value;
            },
            rich: {
              bold: {
                fontWeight: 'bold',
                fontSize: 16
              }
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '',
          min: 0,
          boundaryGap: [0.2, 0.2],
          splitNumber: 5
        } 
      ],
      series: [
        {
          name: 'Actividad Bar',
          type: 'bar',
          data: this.actividadPorDia,
          itemStyle: {
            color: '#8aca69',
            barBorderRadius: [5, 5, 0, 0]
          },
          barWidth: 80,
          label: {
            show: true,
            position: 'top',
            fontWeight: 'bold',  
            formatter: '{c}', 
            fontSize: 16
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }

  onClickContar(num: number){
    if(num == 1){
      this.contar = 1;
      this.obtenerActividadReciente(this.busqueda);
    } else if(num == 2) {
      this.contar = 2;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 3) {
      this.contar = 3;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 4) {
      this.contar = 4;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 5) {
      this.contar = 5;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 6) {
      this.contar = 6;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 7) {
      this.contar = 7;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 8) {
      this.contar = 8;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 9) {
      this.contar = 9;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 10) {
      this.contar = 10;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 11) {
      this.contar = 11;
      this.obtenerActividadReciente(this.busqueda);
    }else if(num == 12) {
      this.contar = 12;
      this.obtenerActividadReciente(this.busqueda);
    }
  }
}
