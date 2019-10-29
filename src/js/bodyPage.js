import { TElement } from "../class/model.js";

const body = new TElement(document.body);

const corpo = new TElement('DIV');

const texto = new TElement('H1');

corpo.addElement('texto', texto);
body.addElement('corpo',corpo);

document.documentElement.style.height = '100%';
body.style.height = '100%'

corpo.style.borderRadius = '0';
corpo.style.transition = '0.2s';
corpo.style.width = '100%';
corpo.style.height = '100%';

texto.style.color = '#fff';
texto.style.position = 'absolute';
texto.style.top = '50%';
texto.style.left = '50%';
texto.style.margin = '0';
texto.style.padding = '0';
texto.style.size = '38px';
texto.style.transform = 'translate(-50%,-50%)';
texto.element.innerText = 'Faça Você a Diferença!';

var rgb = [ 0, 0, 0 ];
var cont = [true,true,true];

function escolha(valor, index){

    if (cont[index]) {

    if(valor < 9)
        valor++;
    
    else
        switch (valor) {
            case 'a':
                valor = 'b';
                break;
            case 'b':
                valor = 'c';
                break;
            case 'c':
                valor = 'd';
                break;
            case 'd':
                valor = 'e';
                break;
            case 'e':
                valor = 'f';
                break;
            case 'f':
                if (rgb.length != (index + 1))
                    rgb[index+1] = escolha(rgb[index+1], index+1);

                    cont[index] = false;

                break;
            default:
                valor = 'a';
                break;
        }

    } else {
    
    if(valor <= 9) {
        valor--;
        if (valor == 0){

            if (rgb.length != (index + 1))
                 rgb[index+1] = escolha(rgb[index+1], index+1);

            cont[index] = true;
        }
    
    } else
        switch (valor) {
            case 'a':
                valor = 9;
                break;
            case 'b':
                valor = 'a';
                break;
            case 'c':
                valor = 'b';
                break;
            case 'd':
                valor = 'c';
                break;
            case 'e':
                valor = 'd';
                break;
            case 'f':
                valor = 'e';
                break;
            default:
                valor = 'f';
                break;
        }
    }

    return valor;

}

setInterval(() => {
    let cor = '#';

    rgb.forEach(num => cor+= num);

    rgb[0] = escolha(rgb[0],0);

    console.log(cor);

    corpo.style.background = cor;
}, 230);
