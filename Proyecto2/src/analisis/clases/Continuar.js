const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class Continuar{
    /**
     * Clase con la instruccion para continuar.
     */
    constructor(id,fila, columna){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * No realiza ninguna operacion
     */
    operar(tablaSimbolos, salida){
        return null;
    }

    /**
     * Grafica los nodos del AST.
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Continuar"]';
        conteo.agregarEncabezado(nodo+label);

        var texto = nodo;
        return texto;

    }

}

module.exports = Continuar;