const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class Si{
    /**
     * Clase de la instruccion Si
     */
    constructor(id, relacion, tipoDato, cuerpo, cantOperaciones, cuerpo_else, cantElse, fila, columna){
        this.id = id;
        this.relacion = relacion;
        this.tipoDato = tipoDato;
        this.cuerpo = [];
        if(this.cuerpo != null){
            this.cuerpo = cuerpo;
        }
        this.cuerpo_else = [];
        if(cuerpo_else != null){
            this.cuerpo_else = cuerpo_else;
        }
        this.fila = fila - 1;
        this.columna = columna;
        this.cantOperaciones = cantOperaciones;
        this.cantElse = cantElse;
        this.valorCiclo = "";
        this.retorno = null;
    }
    /**
     * Opera la instruccion SI
     */
    operar(tablaSimbolos, salida){
        this.retorno = null;
        this.valorCiclo = "";
        // Opera la expresion relacional del si. / Si hay errores los agrega a la lista.
        var expresion = this.relacion.operar(tablaSimbolos, salida);
        if (expresion == null){
            salida.agregarError(Tipo.SEMANTICO, "No se puede ejecutar la instruccion (Si) porque se necesita una condicion", this.fila, this.columna);
            return null;
        }
        if(expresion.tipoDato !== Tipo.BOOLEAN){
            salida.agregarError(Tipo.SEMANTICO, "La condicion del SI debe ser booleana", this.fila, this.columna);
            return null;
        }
        // si la expresion es verdadera se ejecuta el si. Sino se ejecuta el Sino
        if(expresion.valor === true){
            var nuevaTabla = new Tabla(tablaSimbolos);
            for(var i = 0; i<this.cantOperaciones; i++){
                if (this.cuerpo[i].id === "Detener") {
                    this.valorCiclo = "Detener";
                } else if (this.cuerpo[i].id === "Continuar") {
                    this.valorCiclo = "Continuar";
                } else if (this.cuerpo[i].id === "Retorno") {
                    this.retorno = this.cuerpo[i];
                    break;
                } else {
                    this.cuerpo[i].operar(nuevaTabla, salida);
                    if(this.cuerpo[i].id == "Si"){
                        if(this.cuerpo[i].retorno != null){
                            this.retorno = this.cuerpo[i].retorno;
                            break;
                        }
                    }
                }
            }
            return true;
        } else {
            if(this.cuerpo_else != null){
                var nuevaTabla = new Tabla(tablaSimbolos);
                for(var i = 0; i<this.cantElse; i++){
                    if (this.cuerpo_else[i].id === "Detener") {
                        this.valorCiclo = "Detener";
                    } else if (this.cuerpo_else[i].id === "Continuar") {
                        this.valorCiclo = "Continuar";
                    } else if (this.cuerpo_else[i].id === "Retorno") {
                        this.retorno = this.cuerpo_else[i];
                        break;
                    } else {
                        this.cuerpo_else[i].operar(nuevaTabla, salida);
                        if(this.cuerpo_else[i].id == "Si"){
                            if(this.cuerpo_else[i].retorno != null){
                                this.retorno = this.cuerpo_else[i].retorno;
                                break;
                            }
                        }
                    }
                }
                return true;
            }
        }
    }

    /**
     * Graficas los nodos del AST de la salida.
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Si"]';
        conteo.agregarEncabezado(nodo+label);

        var nodoEXP = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelEXP = '[label = "Expresion"]';
        conteo.agregarEncabezado(nodoEXP+labelEXP);

        var nodoCuerpo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelCuerpo = '[label = "Cuerpo"]';
        conteo.agregarEncabezado(nodoCuerpo+labelCuerpo);

        var texto = nodo + "->" + nodoEXP +"\n";
        texto += nodo + "->" + nodoCuerpo + "\n";

        for(var i = 0; i < this.cuerpo.length; i++){        
            if(this.cuerpo[i].id == "Declaracion"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Asignacion"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Mostrar"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Llamada"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "DibujarAST"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            }  else if(this.cuerpo[i].id  == "DibujarEXP"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "DibujarTS"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Si"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Para"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Mientras"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Continuar"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Detener"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Retorno"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else {
                console.log("ERror")
            }           
        }

        if(this.cantElse > 0){
            var nodoElse = "node" + conteo.conteoNodo;
            conteo.sumarConteo();
            var labelElse = '[label = "Sino"]';
            conteo.agregarEncabezado(nodoElse+labelElse);
            texto += nodo + "->" + nodoElse + "\n";
            for(var i = 0; i < this.cuerpo_else.length; i++){        
                if(this.cuerpo_else[i].id == "Declaracion"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "Asignacion"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "Mostrar"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "Llamada"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "DibujarAST"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                }  else if(this.cuerpo_else[i].id  == "DibujarEXP"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "DibujarTS"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "Si"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "Para"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "Mientras"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else if(this.cuerpo_else[i].id  == "Retorno"){
                    texto += nodoElse+ "->"+ this.cuerpo_else[i].graficarAST(conteo, salida) + "\n";
                } else {
                    console.log("Error")
                }           
            }
        }
       return texto;
    }

}

module.exports = Si;