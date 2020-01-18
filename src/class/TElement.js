/**
 * @author Felipe Rhoden
 * @version 0.1.0
 */


/**@class Classe que criar um elemento */
export class TElement {

    /** ============= private property ============= */

    /**
     * private property
     * 
     * @private
     * @property {ObjectHTMLElement} _element - Armazena Elemento gerado.
     */

    _element;

    /**
     * private property
     * 
     * @private
     * @property {Object} _data - Armazena atributos do tipo global data-*.
     */

    _data;

    /** ============= private method ============= */

    /**
     * private method
     * 
     * @private
     * @method
     * @param {string} name - Nome da propriedade criada para o attributo
     * @param {string} value - valor do atributo
     * @description metodo para criação de atributo global data-*
     */

    _addDataAttribute (name, value) {

        value = value || '';

        this._element.setAttribute('data-'+name, value);

        Object.defineProperty(this._data, name,
            {
                set: function (value) { this._element.setAttribute('data-' + name, value) },
                get: function () { return this._element.getAttribute('data-' + name) },
                enumerable : true,
                configurable : true
            }
        )

    }

    /**
     * private method
     * 
     * @private
     * @method
     * @param {string} name - Nome da propriedade que sera removida
     * @description metodo para remoção de atributo global data-*
     */

    _removeDataAttribute (name) {

        try {

            if(this._data[name]){
                this._element.removeAttribute('data-' + name);
                delete this._data[name];

            } else 
                throw 'Atributo não encontrado';

        } catch(err) {

            console.error(err);

        }

    }

    /** ============= constructor ============= */

    /**  
     * Recebe uma string com o nome do Object HTMLElement e criar o elemento
     * @constructor
     * @param {string} element - recebe uma string com o nome de uma tag html
     */

    constructor(element){
        if (!element.tagName)
            this._element = document.createElement(element);
        else 
            this._element = element;
        this._data = { _element: this._element };
    }

    /** ============= static method ============= */

    /**
     * static method
     * 
     * @static
     * @method
     * @param {string} name - nome da propriedade dada ao atributo
     * @param {String} attribute - atributo que sera inserido 
     * @param {TElement} father - elemento pai
     * @description metodo inserção de um atributo
     */

    static addAttribute(name, attribute, father) {

        father = father || this;
        attribute = attribute || '';

        try {
            if (father[name] != undefined || father['_' + name] != undefined)
                throw 'Propriedade ja existente'

            father.element.setAttribute(name, attribute);

            Object.defineProperty(father, name,
                {
                    set : function (attr) { father.element.setAttribute(name, attr) },
                    get : function () { return father.element.getAttribute(name) },
                    enumerable : true,
                    configurable : true
                }
            )

        } catch(err) {
            console.error('erro em inserção de atributo: ' + err);
        }
    }

    /**
     * static method
     * 
     * @static
     * @method
     * @param {string} name - nome da propriedade dada ao elemento
     * @param {TElement} element - elemento que sera inserido 
     * @param {TElement} father - elemento pai
     * @description metodo inserção de um elemento filho
     */

    static addElement(name, element, father) {

        father = father || this;

        try {

            if (!element.element || element.element == undefined)
                element = new TElement(element);

            if (father[name] != undefined || father['_' + name] != undefined)
                throw 'Propriedade ja existente'
            
            father.element.appendChild(element.element);

            Object.defineProperty(father,'_' + name,
                {
                    value : element,
                    writable : true,
                    enumerable : true,
                    configurable : true
                }
            )

            Object.defineProperty(father, name,
                {
                    set : function (any) {},
                    get : function () { return father['_' + name] },
                    enumerable : true,
                    configurable : true
                }
            )

        } catch(err) {
            console.error('erro em inserção de elemento: ' + err);
        }
    }

    /**
     * static method
     * 
     * @static
     * @method
     * @param {string} name - nome da função
     * @param {function} func - função que sera executada
     * @param {TElement} father - elemento pai
     * @description metodo inserção de uma função em um elemento
     */

    static addEvent(name, func, father) {

        father = father || this;

        try {

            father.element.addEventListener(name, func, false);

        } catch(err) {
            console.error('erro em inserção evento:' + err);

        }

    }

    /**
     * static method
     * 
     * @static
     * @method
     * @param {string} key - chave de acesso que sera removida
     * @description metodo para remoção de chave de acesso do array de accesskeys
     */

    static removeAcsKey(key) {
        try {
            let accesskeys = TElement.accessKeys;
            let index = accesskeys.indexOf(key);

            if (index != -1){
                let no1 = accesskeys.slice(0,index);
                let no2 = accesskeys.slice(++index, accesskeys.length);
                TElement.accessKeys = no1.concat(no2);

            }

        } catch(err) {
            console.error('erro em remoção de accesskey /n Erro: ' + err);
        }
    }

    /**
     * static method
     * 
     * @static
     * @method
     * @param {string} id - identificador que sera removida
     * @description metodo para remoção de id do array de ids
     */

    static removeId(id) {
        try {
            let ids = TElement.ids;
            let index = ids.indexOf(id);

            if (index != -1){
                let no1 = ids.slice(0,index);
                let no2 = ids.slice(++index, ids.length);
                TElement.ids = no1.concat(no2);

            }

        } catch(err) {
            console.error('erro em remoção de id /n Erro: ' + err);
        }
    }

    /**
     * static method
     * 
     * @static
     * @method
     * @param {string} name - nome da propriedade que sera removida
     * @param {TElement} father - elemento pai
     * @description metodo para remoção de uma propriedade
     */

    static removeProperty(name, father) {
        
        father = father || this;

        if (father[name].element)
            father[name].element.remove()

        if (father.element.hasAttribute(name))
            father.element.removeAttribute(name);

            delete father[name];

            delete father['_' + name];
        
    }

    /**
     * static method
     * 
     * @static
     * @method
     * @param {string} name - nome do evento que sera removido
     * @param {function} func - função que sera removida
     * @param {TElement} father - elemento pai
     * @description metodo para remoção de uma propriedade
     */

    static removeEvent(name, func, father) {
        
        father = father || this;

        father.element.removeEventListener(name, func);
        
    }

    /**
     * static method
     * 
     * @static
     * @method
     * @param {string} tabIndex - tabIndex que sera removido
     * @description metodo para remoção de tabIndex do array de tabIndexs
     */

    static removeTabIndex(tabIndex) {
        try {
            let tabIndexs = TElement.tabIndexs;
            let index = tabIndexs.indexOf(tabIndex);

            if (index != -1){
                let no1 = tabIndexs.slice(0,index);
                let no2 = tabIndexs.slice(++index, tabIndexs.length);
                TElement.tabIndexs = no1.concat(no2);

            }

        } catch(err) {
            console.error('erro em remoção de tabIndex /n Erro: ' + err);
        }
    }

    /** ============= set method ============= */

    /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} accessKey - recebe uma string que sera chave de acesso do elemento;
     * @throws {exeption} - ocorre caso a chave inserida ja exista;
     */

     set  accessKey (accessKey) { 

        try{

            TElement.accessKeys.forEach(key => {
                if(key == accessKey) throw "accessKey ja existente!";
            });

            TElement.removeAcsKey(this._element.accessKey);
            TElement.accessKeys.push(accessKey);
            this._element.accessKey = accessKey;

        }
        catch(err){
            
            console.error(err);
            
        }

     };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {any} data - recebe qualquer valor;
     */

     set addAttribute (data) { };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {any} data - recebe qualquer valor;
     */

     set addDataAttribute (data) { };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {any} data - recebe qualquer valor;
     */

     set addElement (data) { };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {any} data - recebe qualquer valor;
     */

     set addEvent (data) { };

     /**
      * set attribute
      * 
      * @public
      * @method
      * @param {string} className - nome das classes do elemento 
      */

      set className (className) { this._element.className = className };

      /**
      * set attribute
      * 
      * @public
      * @method
      * @param {boolean} contentEditable - recebe um boolean dizendo se o atributo pode ser editado 
      */

      set contentEditable (contentEditable) { this._element.contentEditable = contentEditable };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {any} data - recebe qualquer valor;
     */

     set data (data) { };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} dir - recebe uma string com a direção do texto;
     */

     set dir (dir) { this._element.dir = dir };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} draggable - recebe uma string com indicando se é possivel arrastar o elemento;
     */

     set draggable (draggable) { this._element.setAttribute('draggable', draggable) };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} dropzone - recebe uma string com indicando se é possivel copiar um elemento arrastavel;
     */

     set dropzone (dropzone) { this._element.setAttribute('dropzone', dropzone) };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {ObjectHTMLElement} element - recebe um ObjectHTMLElement;
     */

     set element (element) { };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {boolean} hidden - recebe um boolean;
     */

     set hidden (hidden) { 
        if(hidden)
            this._element.setAttribute('hidden', '');
        else 
            this._element.removeAttribute('hidden');

      };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} id - recebe uma string que sera o identificador do elemento;
     * @throws {exeption} - ocorre caso o id inserido ja exista;
     */

     set  id (id) { 

        try{

            TElement.ids.forEach(sId => {
                if(sId == id) throw "id ja existente!";
            });

            TElement.removeId(this._element.id);
            TElement.ids.push(id);
            this._element.id = id;

        }
        catch(err){
            
            console.error(err);
            
        }

     };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} lang - recebe uma string especificando a linguagem de texto do atributo;
     */

     set lang (lang) { this._element.lang = lang };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {any} data - recebe qualquer valor;
     */

     set removeDataAttribute (data) { };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {any} data - recebe qualquer valor;
     */

     set removeEvent (data) { };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {any} data - recebe qualquer valor;
     */

     set removeProperty (data) { };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} spellCheck - recebe uma string com True caso o atrubuto possa ser 
     * verificado ortograficamente e false se não;
     */

     set spellCheck (spellCheck) { this._element.setAttribute('spellcheck', spellCheck) };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} style - recebe uma string com os parametros css do elemento;
     */

    set style (style) { this._element.setAttribute('style', style) };

    /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} style - recebe uma string com os parametros css do elemento;
     */

    set styleText (style) { this._element.setAttribute('style', style) };

    /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} tabIndex - recebe um numero que sera o numero de tabIndex do elemento;
     * @throws {exeption} - ocorre caso o tabIndex inserido ja exista;
     */

     set  tabIndex (tabIndex) { 

        try{

            TElement.tabIndexs.forEach(index => {
                if(index == tabIndex) throw "tabIndex ja utilizado!";
            });

            TElement.removeTabIndex(this._element.tabIndex);
            TElement.tabIndexs.push(tabIndex);
            this._element.tabIndex = tabIndex;

        }
        catch(err){
            
            console.error(err);
            
        }

     };

     /**
      * set attribute
      * 
      * @public
      * @method
      * @param {string} title - titulo do elemento 
      */

     set title (title) { this._element.title = title };

     /**
     * set attribute
     * 
     * @public 
     * @method 
     * @param {string} translate - recebe uma string verificando se o elemento pode ser traduzido;
     */

     set translate (translate) { this._element.setAttribute('translate', translate) };
     

    /** ============= get method ============= */

    /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna a accesskey de um elemento;
     */

     get accessKey () { return this._element.accessKey };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {function} - retorna uma função para adicionar um atributo ao elemento;
     */

     get addAttribute () { return TElement.addAttribute };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {function} - retorna uma função para adicionar um atributo data-*;
     */

     get addDataAttribute () { return this._addDataAttribute };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {function} - retorna uma função para adicionar um evento;
     */

     get addEvent () { return TElement.addEvent };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {function} - retorna uma função para adicionar elemento ao elemento;
     */

     get addElement () { return TElement.addElement };

     /**
      * get attribute
      * 
      * @public
      * @method
      * @returns {string} - retorn um string com as classes do elemento;
      */

      get className () { return this._element.className };

     /**
      * get attribute
      * 
      * @public
      * @method
      * @returns {string} - retorn uma string com True ou False;
      */

     get contentEditable () { return this._element.contentEditable };

    /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {Object} - retorna um objeto com os valores de cada attributo data;
     */

     get data () { return this._data };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna o valor do atibuto dir;
     */

     get dir () { return this._element.dir };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna o valor do atibuto draggable;
     */

     get draggable () { return this._element.getAttribute('draggable') };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna o valor do atibuto dropzone;
     */

     get dropzone () { return this._element.getAttribute('dropzone') };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {ObjectHTMLElement} - retorna o elemento da classe;
     */

     get element () { return this._element };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {boolean} - retorna verdadeiro se o atributo hidden existe e falso se não existe;
     */

     get hidden () { return this._element.hasAttribute('hidden') };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna o valor do atributo id;
     */

     get id () { return this._element.id };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna o valor do atributo lang;
     */

     get lang () { return this._element.lang };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {function} - retorna uma função para remover um atributo data-* ;
     */

     get removeDataAttribute () { return this._removeDataAttribute };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {function} - retorna uma função para remover um evento ;
     */

     get removeEvent () { return TElement.removeEvent };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {function} - retorna uma função para remover uma propriedade ;
     */

    get removeProperty () { return TElement.removeProperty };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna uma string com o True ou False;
     */

     get spellCheck () { return this._element.getAttribute('spellcheck') };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {ObjectCss} - retorna um objeto com os attributos css de cada elemento;
     */

    get style () { return this._element.style };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna uma string com css de cada elemento;
     */

    get styleText () { return this._element.getAttribute('style') };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna uma string com o numero de tab de cada elemento;
     */

    get tabIndex () { return this._element.tabIndex };

     /**
      * get attribute
      * 
      * @public
      * @method
      * @returns {string} - retorn um string com o titulo do elemento;
      */

     get title () { return this._element.title };

     /**
     * get attribute
     * 
     * @public 
     * @method
     * @returns {string} - retorna uma string com o valor do atributo translate;
     */

     get translate () { return this._element.getAttribute('translate') };

}

    /** ============= static property ============= */
    // declara-se após a classe para compatibilidade com firefox

    /**
     * static property
     * 
     * @static
     * @property {array} accesskeys - Array de strings de accesskeys para controle de chaves ja utilizadas. 
     */

     Object.defineProperty(TElement,'accessKeys',
        {
            value : [],
            writable : true,
            enumerable : true,
            configurable : true
        }
     )

     /**
     * static property
     * 
     * @static
     * @property {array} ids - Array de strings de ids para controle de indentificadores ja utilizados. 
     */

    Object.defineProperty(TElement,'ids',
        {
            value : [],
            writable : true,
            enumerable : true,
            configurable : true
        }
    )

    /**
     * static property
     * 
     * @static
     * @property {array} tabIndexs - Array de numeros de tabIndex para controle de tabIndex ja utilizados. 
     */

    Object.defineProperty(TElement,'tabIndexs',
        {
            value : [],
            writable : true,
            enumerable : true,
            configurable : true
        }
    )