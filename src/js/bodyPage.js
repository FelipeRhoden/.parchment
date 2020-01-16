import * as parchment from "../class/model.js";

const body = new parchment.TElement(document.body);

const title = new parchment.TElement("H1");

const botao = new parchment.TElement("BUTTON")

body.addElement('title',title);
body.addElement('botao',botao);

title.addElement('text',new parchment.TText('Novo Titulo'));
botao.addElement('text',new parchment.TText('Alterar Titulo'));

botao.addEvent('click', () => {
    title.text.get = prompt('Novo Titulo');
});
