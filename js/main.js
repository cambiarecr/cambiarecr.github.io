const requestURL = 'https://catalogo-cambiare-app.herokuapp.com/productos';
const request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
var catalogoList;

request.onload = function() {
    var response = request.response;
    catalogoList = response;
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
        data += '<div class="card_product" id="'+element.sku+'" data-type="'+element.tipo+'" onCLick="openModal(this)">';
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

function openModal(e){
    var sku = e.id;
    var data = '';
    var data_slide = '';
    console.log(sku);
    [].forEach.call(catalogoList,function(producto){
        if (producto.sku == sku){
            data_slide += '<div class="splide"><div class="splide__track"><ul class="splide__list">';
            [].forEach.call(producto.galeriaImagenes, function(imagen){
                data_slide += '<li class="splide__slide"><img src="https://drive.google.com/uc?id='+imagen.imagenUrl+'" alt="" loading="lazy"></li>';
            });
            data_slide += '</ul></div></div>';
            
            data += '<p class="modal_name">'+producto.nombre+'<p>';
            data += '<p class="modal_price">'+Intl.NumberFormat("es-CR", {style: "currency", currency: "CRC"}).format(producto.precio)+'<p>';
            console.log(data_slide);
            console.log(data);
        }
    });
    document.querySelector('.modal_slide').innerHTML = data_slide;
    document.querySelector('.modal_content').innerHTML = data;
    var elms = document.getElementsByClassName( 'splide' );
    for ( var i = 0, len = elms.length; i < len; i++ ) {
        new Splide( elms[ i ] ).mount();
    }
    var modal = document.querySelector('.product_modal');
    modal.classList.toggle('show_modal');
}

function closeModal(){
    var modal = document.querySelector('.product_modal');
    modal.classList.toggle('show_modal');
}

// https://drive.google.com/uc?id=