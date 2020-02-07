import * as parchment from "../class/model.js";

export const head = new parchment.TElement(document.head);

head.addElement('mCharset', 'META');
head.mCharset.addAttribute('charset','UTF-8');

head.addElement('mViewport', 'META');
head.mViewport.addAttribute('name', 'viewport');
head.mViewport.addAttribute('content', 'width=device-width, initial-scale=1.0');

head.addElement('mHttpequiv', 'META');
head.mHttpequiv.addAttribute('http-equiv', 'X-UA-Compatible');
head.mHttpequiv.addAttribute('content', 'ie=edge');

head.addElement('titlePage',"TITLE");