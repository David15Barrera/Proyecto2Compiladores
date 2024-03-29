const {Error} = require("./Error");
const {DBTabla} = require("./DBTabla");

class Salida{
    /**
     * Constructor.
     */
    constructor(){
        this.limpiarSalida();
    }

    /**
     * Guarda los datos de una salida anterior. Asi como la tabla de errores.
     */
    agregarParametros(anterior){
        this.salida = anterior.salida;
        this.tablaErrores = anterior.tablaErrores;
    }
    /**
     * Limpia todos los datos de la salida
     */
    limpiarSalida(){
        this.salida = '';
        this.tablaErrores = [];
        this.cantidadTablas = [];
        this.graficos = [];
        this.expresiones = 1;
    }
    /**
     * Suma la cantidad de expresiones que se tengan.
     */
    sumarExpresion(){
        this.expresiones++;
    }
    /**
     * Retorna la salida de la consola
     * @returns 
     */
    getSalida(){
        return this.salida;
    }

    /**
     * 
     * @returns La tabla de errores de la Salida
     */
    getTablaErrores(){
        return this.tablaErrores;
    }

    /**
     * 
     * @returns Los graficos de la salida
     */
    getGraficos(){
        return this.graficos;
    }

    /**
     * 
     * @returns Los dibujos de las tablas de simbolos.
     */
    getTablasDibujadas(){
        return this.cantidadTablas;
    }

    /**
     * Agrega un error a la tabla de errrores.
     */
    agregarError(tipo, mensaje, fila, columna){
        var error = new Error(tipo, mensaje, fila+1, columna);
        this.tablaErrores.push(error);
    }

    /**
     * Agrega un valor a la salida a consola.
     */
    agregarSalida(valor){
        this.salida = this.salida + valor + "\n";
    }

    /**
     * Agrega el dibujo de una tabla al arreglo de tablas.
     */
    agregarTabla(tabla){
        this.cantidadTablas.push(tabla);
    }

    /**
     * Agrega un nuevo grafico a la lista de graficos.
     */
    agregarGrafico(textoGrafico){
        var text = 'digraph G { ' + textoGrafico + ' }';
        this.graficos.push(text); 
    }
}

module.exports = Salida;