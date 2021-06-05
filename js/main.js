const requestURL = 'https://catalogo-cambiare-app.herokuapp.com/productos';
const request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var response = request.response;
    var catalogoList = response;
    console.log(catalogoList);
    displayAll(catalogoList);
}

var nav = document.querySelector('nav');
//var nav_toggle = document.querySelector('nav-toggle');

function navToggle(){
    nav.classList.toggle('show_nav');
}

function displayAll(list){
    console.log(list);
    data = '<div class="catalogo_list">';
    list.forEach(element => {
        data += '<div class="card_product">';
        data += '<h3>'+element.nombre+'</h3>';
        data += '<h4>'+element.sku+'</h4>';
        data += '<h4>'+element.tipo+'</h4>';
        data += '<h4>'+element.precio+'</h4>';
        // data += '<img src="https://drive.google.com/uc?id='+element.imagenPortadaUrl+'" alt="">';
        data += '<p>'+element.descripcion+'</p></div>';
    });
    data += '</div>';
    data += data + data + data + data;

    console.log(data);
    document.querySelector('main').innerHTML = data;
}   

// https://drive.google.com/uc?id=