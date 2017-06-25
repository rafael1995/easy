function criaForm() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            var x = 0;
            for (var i in myObj.fields) {
                var place = document.createElement("label");
                place.setAttribute('for', myObj.fields[i].id);
                place.innerHTML = myObj.fields[i].placeholder;
                if ((myObj.fields[i].class == "input") && (myObj.fields[i].name != "btnSave")) {
                    var campo = document.createElement("div");
                    campo.setAttribute('class', 'input-field');
                    campo.setAttribute('id', 'row' + x);
                    criaCampo(campo);
                    var campo = document.createElement("input");
                    if (myObj.fields[i].name == "txtCpf") {
                        campo.setAttribute('onkeypress', 'mascara(this,cpf)');
                        campo.setAttribute('maxlength', '14');
                    } else if (myObj.fields[i].name == "txtFullname") {
                        campo.setAttribute('onkeypress', 'mascara(this,maskName)');
                    }
                    campo.setAttribute('type', myObj.fields[i].type);
                    campo.setAttribute('required', 'required');
                    campo.setAttribute('name', myObj.fields[i].name);
                    campo.setAttribute('id', myObj.fields[i].id);
                    campo.setAttribute('class', 'inputText');
                    document.getElementById('row' + x).appendChild(campo);
                    document.getElementById('row' + x).appendChild(place);
                } else if (myObj.fields[i].class == "upload-button") {
                    var campo = document.createElement("div");
                    campo.setAttribute('class', 'row');
                    campo.setAttribute('id', 'row' + x);
                    criaCampo(campo);
                    campo = document.createElement("input");
                    campo.setAttribute('type', 'file');
                    document.getElementById('row' + x).appendChild(campo);

                } else if (myObj.fields[i].name == "btnSave") {
                    var campo = document.createElement("div");
                    campo.setAttribute('class', 'row');
                    campo.setAttribute('id', 'row' + x);
                    criaCampo(campo);
                    campo = document.createElement("a");
                    campo.setAttribute('class', 'waves-effect waves-light btn');
                    campo.setAttribute('id', 'btnEnviar');
                    campo.setAttribute('onCLick', 'save();');
                    document.getElementById('row' + x).appendChild(campo);
                    document.getElementById("btnEnviar").innerHTML = 'Enviar';
                }
                x++;
            } //end for
            initMask();
        }
    };
    xmlhttp.open("GET", "mock.json", true);
    xmlhttp.send();
} // end criaForm

function criaCampo(campo) {
    document.getElementById('form').appendChild(campo);
    inicilizarAutoComplete();
}
// Autocomplete Google
function inicilizarAutoComplete() {
    google.maps.event.addDomListener(window, 'load', function() {
        var places = new google.maps.places.Autocomplete(document.getElementById('txtAddress'));
        google.maps.event.addListener(places, 'place_changed', function() {
            var place = places.getPlace();
            var address = place.formatted_address;
            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();
            var mesg = "Address: " + address;
            mesg += "\nLatitude: " + latitude;
            mesg += "\nLongitude: " + longitude;
            // alert(mesg);
            //  initMap(latitude,longitude);
        });
    });
}
/* Inicializa o mapa de acordo com o que foi preenchido
function initMap(latitude,longitude) {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          scrollwheel: false,
          zoom: 15
        });
} */

// Mostrar preview Img
var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

function mtel(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que n?o ? d?gito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca par?nteses em volta dos dois primeiros d?gitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca h?fen entre o quarto e o quinto d?gitos
    return v;
}

function id(el) {
    return document.getElementById(el);
}

function initMask() {
    id('txtTelefone').onkeyup = function() {
        mascara(this, mtel);
    }
       document.getElementById("usuario").onkeyup = function() {
        this.value = this.value.replace(/[^\w\.]|\d/g, '');
    };
}



function save() {
    var name = document.getElementById("txtFullname").value;
    var cpf = document.getElementById("txtCpf").value;
    var tel = document.getElementById("txtTelefone").value;
    var endereco = document.getElementById("txtAddress").value;
    var complemento = document.getElementById("txtComplement").value;
    //var img = document.getElementById("upload").value;

    
    // Salvando dados do form - LocalStorage
    localStorage.setItem("name", name);
    localStorage.setItem("cpf", cpf);
    localStorage.setItem("tel", tel);
    localStorage.setItem("endereco", endereco);
    localStorage.setItem("complemento", complemento);
  //  localStorage.setItem("img", img);
    Materialize.toast('I am a toast!', 1000);
}
// Mask Cpf - Regex
function cpf(v) {
    v = v.replace(/\D/g, "") //Remove tudo o que nao e digito
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto d?gitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto d?gitos                                       
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um h?fen entre o terceiro e o quarto d?gitos
    return v;
}
function maskName(v) {
    return v.replace(/([0-9])/g, "");
}

function preview_image(event) 
{
 var reader = new FileReader();
 reader.onload = function()
 {
  var output = document.getElementById('output_image');
  output.src = reader.result;
 }
 reader.readAsDataURL(event.target.files[0]);
}