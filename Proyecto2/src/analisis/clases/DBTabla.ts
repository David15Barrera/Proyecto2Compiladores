import { Columna } from "./Columna";

export class DBTabla{

        nombre:string;
        fila:number;
        columna:number;
        columnasTabla:Columna[];
        /**
         * Clase que guarda los datos de la tabla que se va a graficar
   */
        constructor(fila:number, columna:number) {
            this.nombre = "";
            this.fila = fila;
            this.columna = columna;
            this.columnasTabla = [];
        }
        /**
         * Agrega los valores a una nueva columna y la guarda en la lista de columnas.
         */
        agregarColumna(id:string, valor:any, tipo:any, fila:number, columna:number){
            var nuevaColumna = new Columna(id, valor, tipo, fila, columna);
            this.columnasTabla.push(nuevaColumna);
        }
        
}