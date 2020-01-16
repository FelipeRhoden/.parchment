/**
 * @author Felipe Rhoden
 * @version 0.1.0
 */

 /**@class Classe que criar um nó para texto */
 export class TText{

/** ============= private property ============= */

    /**
     * private property
     * 
     * @private
     * @property {nodeElement} _element - Armazena o nó gerado.
     */

    _element;

    /** ============= constructor ============= */

    /**  
     * Recebe uma string com o texto do nó e criar o nó
     * @constructor
     * @param {string} text - recebe uma string com o conteudo do texto
     */

    constructor(text){

        text = text || '';

        this._element = document.createTextNode(text);

    }

    /** ============= set method ============= */

    /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {ani} data - recebe qualquer valor;
     */

    set element (data){};

    /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} set - recebe o texto que sera armazenado;
     */

     set set (text){

        this._element.data = text;

     };

    /** ============= get method ============= */

    /**
     * get attribute
     * 
     * @public 
     * @method 
     * @returns {nodeObject} - retorna o objeto nó;
     */

    get element (){

        return this._element;

    };

    /**
     * get attribute
     * 
     * @public 
     * @method 
     * @returns {string} - retorna o texto que sera armazenado;
     */

    get get (){

        return this._element.data;

    };


 }