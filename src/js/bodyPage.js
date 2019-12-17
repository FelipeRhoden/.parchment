import { TElement } from "../class/model.js";

const body = new TElement(document.body);

const title = new TElement("H1");

body.addElement('title',t);

title.element.appendChild(document.createTextNode('.parchament'));