export class TRecurso {
  private nombre: string;
  public gl: WebGL2RenderingContext

  constructor() {
    this.nombre = '';
    var canvas = <HTMLCanvasElement>document.getElementById('canvasWebGL');
    var context = canvas.getContext('webgl2');
    if (context === null) {
      throw new Error('Unable to get WebGL2 context');
    }
    this.gl = context;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  async cargarRecurso(nombre: string): Promise<void> {
  }
}
