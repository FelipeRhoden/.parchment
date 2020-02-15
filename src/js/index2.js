const H1 = document.createElement('H1');
const text = document.createTextNode('Hello Word!');
document.body.appendChild(H1);
document.body.style = 'background: #000; color: #fff;';
H1.appendChild(text);
H1.addEventListener('click', (() => {
    let i = 0;
    return () => {
        i++;
        text.data = 'Hello Word! ' + i;
    }
})(), false) ;