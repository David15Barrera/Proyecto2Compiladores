import { Component, OnInit } from '@angular/core';
import {Error} from "../../../analisis/clases/Error";
import {DBTabla} from "../../../analisis/clases/DBTabla";
import {graphviz} from 'd3-graphviz';

declare var require:any;
const gramatica = require("../../../analisis/gramatica.js");
const Salida = require("../../../analisis/clases/Salida.js");

@Component({
  selector: 'app-principal-component',
  templateUrl: './principal-component.component.html',
  styleUrls: ['./principal-component.component.css']
})
export class PrincipalComponentComponent implements OnInit {
 

  texto:string = "";
  UploadfileText:string = "";
  UploadfileName:string = "";
  resultado:string = "";
  hiddenEditor:boolean = false;
  hiddenErrores:boolean = true;
  hiddenTablas:boolean = true;
  hiddenGraficos:boolean = true;
  hiddenUpload:boolean = true;
  errores:Error[] = [];
  tablas:DBTabla[] = [];
  graficos:string[] = [];
  elementos:HTMLDivElement[] = [];
  nombreArchivo = "";

  constructor() { }

  ngOnInit(): void {
    
  }
  /**
   * Se encarga de graficar todos los Dot que devuelve la aplicacion.
   */
  graficar(){ 
    var divMayor = document.getElementById("graficos");
    if(this.elementos.length > 0){
      for(var i = 0; i < this.elementos.length; i++){
        this.elementos[i].remove();
      }
    }
    this.elementos = [];
    for(var i = 0; i < this.graficos.length; i++){
      var subDiv = document.createElement("div");
      var titulo = document.createElement("h4");
      titulo.textContent = "Grafica " + (i+1);
      var elementoNuevo = document.createElement("div");
      var nameGrafico:string = "grafico"+i;
      elementoNuevo.setAttribute("id", nameGrafico);
      elementoNuevo.setAttribute("readonly", "readonly");
      elementoNuevo.setAttribute("class", "mx-auto");
      elementoNuevo.setAttribute("style", "text-align: center; width: 800px;");
      this.elementos.push(elementoNuevo);
      subDiv?.appendChild(titulo);
      subDiv?.appendChild(elementoNuevo);
      divMayor?.appendChild(subDiv);
      this.elementos.push(subDiv);
      graphviz("#"+nameGrafico).width(1000).scale(1.0).renderDot(this.graficos[i]);
    }
  }
  /**
   * Compila el proyecto. Llama al parser y obtene la salida.
   */
  compilarProyecto(){
    var outPUT = new Salida();
    try {
        outPUT = gramatica.parse(this.texto + "\n\n");
    } catch (error) {
        window.alert("Hay errores en el programa");
        console.log(error) 
    }
    this.resultado = outPUT.getSalida();
    this.errores = outPUT.getTablaErrores();
    this.tablas = outPUT.getTablasDibujadas();
    this.graficos = outPUT.getGraficos();;
    if(this.errores.length > 0){
//      window.alert("No se puede ejecutar");

    }
    if(this.graficos.length > 0){
      this.graficar();
    }
    
  }
 //Limpiar
  limpiarEditor(){
    this.texto = '';
    this.nombreArchivo = '';
  }
//Descarga el archivo
  descargarCRL(){
    const file = new Blob([this.texto], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    if(this.nombreArchivo === ""){
      link.download = "Download.crl";
    } else {
      link.download = this.nombreArchivo;
    }
    link.click();
    link.remove();
  }
//Sube un archivo
  async subirCRL(event:any){
      const file:File = event.target.files[0];
      this.UploadfileName = file.name;
      this.UploadfileText = await file.text();
  }
//Importa los datos
  importarCRL(){
    this.texto = this.UploadfileText;
    this.nombreArchivo = this.UploadfileName;
    this.hiddenUpload = true;
  }

  mostrarUpload(){
    this.hiddenUpload = false;
  }
//Muestra el editor
  mostrarEditor(){
    this.hiddenEditor = false;
    this.hiddenErrores = true;
    this.hiddenTablas = true;
    this.hiddenGraficos = true;
  }
  /**
   * Muestra el reporte de errores
   */
  mostrarErrores(){
    this.hiddenEditor = true;
    this.hiddenErrores = false;
    this.hiddenTablas = true;
    this.hiddenGraficos = true;
  }
  /**
   * Muestra reporte de tablas
   */
  mostrarTablas(){
    this.hiddenEditor = true;
    this.hiddenErrores = true;
    this.hiddenTablas = false;
    this.hiddenGraficos = true;
  }
  /**
   * Muestra el reporte de graficos
   */
  mostrarGraficos(){
    this.hiddenEditor = true;
    this.hiddenErrores = true;
    this.hiddenTablas = true;
    this.hiddenGraficos = false;
  }
  /**
   * Limpia los resultados de la consola.
   */
  limpiarConsola(){
    this.resultado = "";
  }

}
