import * as parchment from "../class/model.js";

let pagina1 = {
    style: 'background: #000; color: #fff;',
    $addElement: ['h1','H1', { 
        $addElement: ['nText' , new parchment.TText('Black!')],
        $addEvent: ['click', () => 
        {   
            body.removeProperty('h1');
            body = new parchment.TElement(document.body, pagina2);
        }], 
    }],
    }

let pagina2 = {
    style: 'background: #fff; color: #000;',
    $addElement: ['h1','H1', { 
        $addElement: ['nText' , new parchment.TText('White!')],
        $addEvent: ['click', () => 
        {   
            body.removeProperty('h1');
            body = new parchment.TElement(document.body, pagina1);
        }], 
    }],
    }

var body = new parchment.TElement(document.body, pagina1);