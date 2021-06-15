var requestURLproductos = 'https://catalogo-cambiare-app.herokuapp.com/productos';
var requestURLtipos = 'https://catalogo-cambiare-app.herokuapp.com/tipos';
const prefixDrive = 'https://drive.google.com/uc?export=view&id=';

const requestproductos = new XMLHttpRequest();
const requesttipos = new XMLHttpRequest();

requestproductos.open('GET', requestURLproductos);
requestproductos.responseType = 'json';
requestproductos.send();

requesttipos.open('GET', requestURLtipos);
requesttipos.responseType = 'json';
requesttipos.send();

requestproductos.onload = function() {
    var current_path = window.location.pathname;
    if (current_path == '/'){
        var response = requestproductos.response;
        catalogoList = response;
        displayAll(catalogoList);
    }
}

requesttipos.onload = function() {
    var current_path = window.location.pathname;
    if (current_path == '/'){
        var response = requesttipos.response;
        tiposList = response;
        displayFiltersTabs(tiposList)
    }
}

var nav = document.querySelector('nav');

function navToggle(){
    nav.classList.toggle('show_nav');
}

function displayAll(list){
    data = '<div class="catalogo_list">';
    [].forEach.call(list,function(element){
        data += '<div class="card_product show_filter" id="'+element.sku+'" data-type="'+element.tipo.tipo.toLowerCase()+'" onCLick="openModal(this)">';
        data += '<img src="'+prefixDrive+element.imagenPortadaUrl+'" alt="" loading="lazy">';
        data += '<p class="card_name">'+element.nombre+'</p>';
        data += '<p class="card_price">'+Intl.NumberFormat("es-CR", {style: "currency", currency: "CRC"}).format(element.precio)+'</p></div>';
    });
    data += '</div>';
    document.getElementById('all_list').innerHTML = data;
}

function displayFiltersTabs(list){
    data = '<a class="tab current" name="all" onclick="filter(this)">Todos</a>';
    [].forEach.call(list, function(element){
        data += '<a class="tab" name="'+element.tipo.toLowerCase()+'" onclick="filter(this)">'+element.tipo+'</a>';
    });
    document.querySelector('.filter_list').innerHTML = data;
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
        if(tipo == 'all'){
            el.classList.add('show_filter');
        }
    });
}

function openModal(e){
    var sku = e.id;
    var data = '';
    var data_slide = '';
    [].forEach.call(catalogoList,function(producto){
        if (producto.sku == sku){
            data_slide += '<div class="splide"><div class="splide__track"><ul class="splide__list">';
            [].forEach.call(producto.galeriaImagenes, function(imagen){
                data_slide += '<li class="splide__slide"><img src="'+prefixDrive+imagen.imagenUrl+'" alt="" loading="lazy"></li>';
            });
            data_slide += '</ul></div></div>';
            data += '<h2 class="modal_name">'+producto.nombre+'</h2>';
            data += '<p class="modal_price">'+Intl.NumberFormat("es-CR", {style: "currency", currency: "CRC"}).format(producto.precio)+'<p>';
            data += '<p class="modal_descrip">'+producto.descripcion+'<p>'
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
