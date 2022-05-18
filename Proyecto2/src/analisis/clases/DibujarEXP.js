const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Conteo = require('../Conteo')

class DibujarEXP{
    /**
     * Clase de la instruccion DibujarEXP
     */
    constructor(id, expresion, fila, columna){
        this.id = id;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * Opera la instruccion de Dibujar EXP

     */
    operar(tablaSimbolos, salida){
        // Crea el nodo con si etiqueta y la agrega a la lista de encabezados
        var textoGrafico = "";
        var conteo = new Conteo();
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
//        var label = '[label = "Grafica de Expresion No.'+salida.expresiones+'" shape="rectangle"]';
        conteo.agregarEncabezado(nodo);
        // Obtiene el dot de todas las expresiones que estan allí.
        if(this.expresion.id === "Operacion" || this.expresion.id === "Valor"){
            textoGrafico = textoGrafico + this.expresion.obtenerDot(salida, conteo);
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Solo operaciones Aritmeticas", this.fila, this.columna);
        }
        //console.log(conteo.encabezado + textoGrafico);
        salida.agregarGrafico(conteo.encabezado + textoGrafico);
        salida.sumarExpresion();
    }

    /**
     * Crea el nodo y la etiqueta de dibujarEXP.
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "DibujarEXP"]';
        conteo.agregarEncabezado(nodo+label);

        var nodoEXP = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelEXP = '[label = "Expresion"]';
        conteo.agregarEncabezado(nodoEXP+labelEXP);

        var texto = nodo + "->" + nodoEXP;
        return texto;

    }

}

module.exports = DibujarEXP;