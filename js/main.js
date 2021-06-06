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
    data = '<div class="catalogo_list">';
    list.forEach(element => {
        data += '<div class="card_product">';
        data += '<img src="https://drive.google.com/uc?id='+element.imagenPortadaUrl+'" alt="">';
        data += '<p class="card_name">'+element.nombre+'</p>';
        data += '<p class="card_price">'+Intl.NumberFormat("es-CR", {style: "currency", currency: "CRC"}).format(element.precio)+'</p></div>';
        
    });
    data += '</div>';
    document.querySelector('main').innerHTML = data;
}   

// https://drive.google.com/uc?id=