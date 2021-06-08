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

function navToggle(){
    nav.classList.toggle('show_nav');
}

function displayAll(list){
    data = '<div class="catalogo_list">';
    list.forEach(element => {
        data += '<div class="card_product" id="'+element.sku+'" data-type="'+element.tipo+'">';
        data += '<img src="https://drive.google.com/uc?id='+element.imagenPortadaUrl+'" alt="" loading="lazy">';
        data += '<p class="card_name">'+element.nombre+'</p>';
        data += '<p class="card_price">'+Intl.NumberFormat("es-CR", {style: "currency", currency: "CRC"}).format(element.precio)+'</p></div>';
        
    });
    data += '</div>';
    document.getElementById('all_list').innerHTML = data;
}   

var list = document.getElementsByClassName('card_product');
var tabs = document.getElementsByClassName('tab');

function filter(e){
    [].forEach.call(tabs,function(el){
        el.classList.remove('current');
    });
    e.classList.add('current');
    var tipo = e.name;
    [].forEach.call(list,function(el){
        if(el.getAttribute('data-type') == tipo){
            el.classList.add('show_filter');
        }else{
            el.classList.remove('show_filter');
        }
    });
}



// https://drive.google.com/uc?id=