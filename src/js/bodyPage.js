import { TElement } from "../class/model.js";

const body = new TElement(document.body);

const title = new TElement("H1");

body.addElement('t',title);

title.element.appendChild(document.createTextNode('.parchament'));