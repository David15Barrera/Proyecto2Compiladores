const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Valor = require('./Valor');
const Tipo = require('./Tipo');

class Retorno{
    /**
     * Clase de la instruccion retorno
     */
    constructor(id, valor, fila, columna){
        this.id = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;

    }

    /**
     * Opera la instruccion retorono
     */
    operar(tablaSimbolos, salida){
        var expresion = null;
        // Si el retorno posee un valor entonces lo opera.
        if (this.valor != null){                       
            expresion = this.valor.operar(tablaSimbolos, salida);
        }
        if (expresion == null){
            salida.agregarError(Tipo.SEMANTICO, "Error en la expresion", this.fila, this.columna);
            return null;
        }
        return new Valor("Valor", expresion.valor, expresion.tipoDato, Tipo.VALOR, this.fila, this.columna);
    }

    /**
     * Grafica los nodos del AST.
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Retorno"]';
        conteo.agregarEncabezado(nodo+label);  
        if(this.valor != null){
            var nodoValor = "node" + conteo.conteoNodo;
            conteo.sumarConteo();
            var labelValor = '[label = "Expresion"]';
            conteo.agregarEncabezado(nodoValor+labelValor); 
            nodo = nodo + "->" + nodoValor; 
        }
        var texto = nodo;
        return texto;

    }


}

module.exports = Retorno;