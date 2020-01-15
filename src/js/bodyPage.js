import { TElement } from "../class/model.js";

const body = new TElement(document.body);

const title = new TElement("H1");

const botao = new TElement("BUTTON")

const texto = document.createTextNode('.parchament');

body.addElement('t',title);
body.addElement('botao',botao);

title.element.appendChild(texto);
botao.element.innerText = 'Alterar Titulo';

botao.addEvent('click', () => {
  texto.data = prompt('Novo Titulo');
});
