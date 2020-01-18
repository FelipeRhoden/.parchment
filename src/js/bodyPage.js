import * as parchment from "../class/model.js";

const head = new parchment.TElement(document.head);

for (let i = 1; i <= 2; i++){
    head.addElement('link'+i,'LINK');
    head['link'+i].addAttribute("rel","stylesheet");
}

head.link1.addAttribute("href","https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");
head.link2.addAttribute("href","https://fonts.googleapis.com/icon?family=Material+Icons");

const body = new parchment.TElement(document.body);

const title = new parchment.TElement("H1");

const botao = new parchment.TElement("BUTTON")

const icone = new parchment.TElement("I");

body.addElement('t',title);
body.addElement('botao',botao);

title.addElement('text',new parchment.TText('Novo Titulo'));
botao.addElement('text',new parchment.TText('Alterar Titulo'));
botao.addElement('icone', icone);
icone.addElement('text', new parchment.TText('favorite_border'));
icone.className = "material-icons left";


body.className = "container";
botao.className = "waves-effect waves-light btn";

botao.addEvent('click', () => {
    botao.style.color = "auto";
});

botao.addEvent('mouseenter', mouseenter);

botao.addEvent('mouseleave', mouseleave);

function mouseenter(){icone.text.text = "favorite"}

function mouseleave(){icone.text.text = "favorite_border"}

