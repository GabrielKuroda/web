 var baseUrl = "http://localhost:8081"

 var pages = ['page_home', 'page_room',
              'page_reserve','page_room_new',
              'page_room_list','page_reserve_new',
              'page_reserve_list','page_room_update'];

//-----Show Page

 function showPage(currPage){
     var found = false;
     for (var i = 0; i < pages.length; i++) {
         if (pages[i] == currPage) {
             document.getElementById(pages[i]).style.display = 'block';
             found = true;
         } else {
             document.getElementById(pages[i]).style.display = 'none';
         }
     }
     if (!found) {
         document.getElementById('loginPage').style.display = 'block';
         alert('Página não encontrada:' + currPage);
     }
 }

//-----Buscar Quartos

function searchRoom() {
 	var xhttp = new XMLHttpRequest();
 	xhttp.onreadystatechange = function() {
 		if (this.readyState == 4 && this.status == 200) {
 			var resp = JSON.parse(this.responseText);
 			showRoom(resp.object);
 		}
 	};
 	xhttp.open("GET", baseUrl + "/roomList", true);
 	xhttp.send();
 }

//-----Buscar Quartos Disponiveis

 function searchRoomT() {
  	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
  			var resp = JSON.parse(this.responseText);
  			showRoom(resp.object);
  		}
  	};
  	xhttp.open("GET", baseUrl + "/roomListF", true);
  	xhttp.send();
  }

  //-----Buscar Quartos Não Disponiveis

  function searchRoomF() {
    	var xhttp = new XMLHttpRequest();
    	xhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
    			var resp = JSON.parse(this.responseText);
    			showRoom(resp.object);
    		}
    	};
    	xhttp.open("GET", baseUrl + "/roomListT", true);
    	xhttp.send();
    }

//-----Exibir Quartos

 function showRoom(roomList) {
  	var table = '<table class="table">' +
                     '<thead class="table-info">'+
                         '<tr>'+
                             '<th scope="col">ID</th>'+
                             '<th scope="col">TIPO</th>'+
                             '<th scope="col">PRECO</th>'+
                             '<th scope="col">BLOQUEADO</th>'+
                             '<th scope="col"></th>'+
                             '<th scope="col"></th>'+
                             '<th scope="col"></th>'+
                             '<th scope="col"></th>'+
                         '</tr>'+
                     '</thead>';
  	for (var i = 0; i < roomList.length; i++) {
  		var room = roomList[i];

  		if(room.status){

  		    var line = "<tr>" +
                            "<td>"+ room.id + "</td>" +
                            "<td>" + room.type + "</td>" +
                            "<td>" + room.price + "</td>" +
                            "<td>" + room.status + "</td>" +
                            '<td><a href="javascript:void(0)" onclick="showPage(\'page_room_list\'); searchOneRoom(' + room.id + ')">Detalhes</button></td>' +
                            '<td><a href="javascript:void(0)" onclick="showPage(\'page_room_update\');searchOneRoom(' + room.id + ')" >Alterar</button></td>' +
                            '<td></td>' +
                            '<td><a href="javascript:void(0)" onclick="deleteRoom(' + room.id + ')">Excluir</a></td>' +
              		    "<tr>";

  		}else{

            var line = "<tr>" +
                            "<td>"+ room.id + "</td>" +
                            "<td>" + room.type + "</td>" +
                            "<td>" + room.price + "</td>" +
                            "<td>" + room.status + "</td>" +
                            '<td><a href="javascript:void(0)" onclick="showPage(\'page_room_list\'); searchOneRoom(' + room.id + ')">Detalhes</button></td>' +
                            '<td><a href="javascript:void(0)" onclick="showPage(\'page_room_update\');searchOneRoom(' + room.id + ')" >Alterar</button></td>' +
                            '<td><a href="javascript:void(0)" onclick="showPage(\'page_reserve_new\'); searchOneRoom(' + room.id + ');configDate()">Nova Reserva</button></td>'+
                            '<td><a href="javascript:void(0)" onclick="deleteRoom(' + room.id + ')">Excluir</a></td>' +
              		    "<tr>";

  		}



  		table += line;
  	}
  	table +="</table>";
  	document.getElementById("divMainRoom").innerHTML = table;
  }

//-----Buscar Reservas

function searchReserve() {
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
   		if (this.readyState == 4 && this.status == 200) {
   			var resp = JSON.parse(this.responseText);
   		if (resp.status != 'OK') {
   			alert(resp.messageError);
   			return;
   			}
   			showReserve(resp.object);
   		}
   	};
   	xhttp.open("GET", baseUrl + "/reserveList", true);
   	xhttp.send();
   }

//-----Buscar Reservas Data ASC

function searchReserveA() {
     var xhttp = new XMLHttpRequest();
      	xhttp.onreadystatechange = function() {
      		if (this.readyState == 4 && this.status == 200) {
      			var resp = JSON.parse(this.responseText);
      		if (resp.status != 'OK') {
      			alert(resp.messageError);
      			return;
      			}
      			showReserve(resp.object);
      		}
      	};
      	xhttp.open("GET", baseUrl + "/reserveListA", true);
      	xhttp.send();
}

//-----Buscar Reservas Data ASC

function searchReserveD() {
     var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	var resp = JSON.parse(this.responseText);
                if (resp.status != 'OK') {
            		alert(resp.messageError);
            		return;
            	}
            showReserve(resp.object);
            }
          };
    xhttp.open("GET", baseUrl + "/reserveListD", true);
    xhttp.send();
}

//-- Exibir Reservas

function showReserve(reserveList) {
    var table = '<table class="table">' +
                    '<thead class="table-info">'+
                        '<tr>'+
                            '<th scope="col">ID</th>'+
                            '<th scope="col">DATA INICIO</th>'+
                            '<th scope="col">DATA FIM</th>'+
                            '<th scope="col">ID QUARTO</th>'+
                            '<th scope="col">PREÇO TOTAL</th>'+
                            '<th scope="col"></th>'+
                            '<th scope="col"></th>'+
                            '<th scope="col"></th>'+
                        '</tr>'+
                    '</thead>';
    	for (var i = 0; i < reserveList.length; i++) {
    		var reserve = reserveList[i];

    		if(reserve.room != 0)
    		{

    		    var line = "<tr>" +
                    			"<td>"+ reserve.id + "</td>" +
                    			"<td>" + reserve.date_begin + "</td>" +
                    			"<td>" + reserve.date_end + "</td>" +
                    			"<td>" + reserve.room + "</td>" +
                    			"<td>" + reserve.full_price + "</td>" +
                    			'<td><a href="javascript:void(0)" onclick="showPage(\'page_reserve_list\'); searchOneReserve(' + reserve.id + ')">Detalhes</button></td>' +
                    			'<td><a href="javascript:void(0)" onclick="deleteReserve(' + reserve.id + ')">Excluir</a></td>' +
                    		  "<tr>";

                    		table += line;

    		}else{

    		    deleteReserve(reserve.id);

    		}

    	}
    	table +="</table>";
    	document.getElementById("divMainReserve").innerHTML = table;
    }

//Cadastro Quarto

function insertRoom() {

    var room = {};
    room.type = document.getElementById("new-type").value;
    room.price = document.getElementById("new-price").value;
    var validatesCheck = document.getElementById("new-status");

    if(validatesCheck.checked){

        room.status = true;

    }else{

        room.status = false;

    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);

            if (resp.status != 'OK') {
                alert(resp.messageError);
            return;
            }

            showPage('page_room');

            searchRoom();
        }
    };
    xhttp.open("POST", "/roomInsert", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(room));

}

function clearRoom(){

    document.getElementById("new-type").value = "";
    document.getElementById("new-price").value = "";

}

//---Cadastrar Reserva

function insertReserve() {

    var reserve = {};
    reserve.date_begin = document.getElementById("new-date-begin").value;
    reserve.date_end = document.getElementById("new-date-end").value;
    reserve.room  = document.getElementById("new-room-id").value;

    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var resp = JSON.parse(this.responseText);

                if (resp.status != 'OK') {
                    alert(resp.messageError);
                    return;
                }

                showPage('page_reserve');

                searchReserve();
            }
        };
    xhttp.open("POST", "/reserveInsert", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(reserve));

}

function clearReserve(){

    document.getElementById("new-date-begin").value = "";
    document.getElementById("new-date-end").value = "";

}


//--Excluir Quarto

function deleteRoom(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showPage('page_room');
         	searchRoom();
        }
    };
    xhttp.open("DELETE", "/roomDelete/" + id, true);
    xhttp.send();
}

//--Excluir Reserva

function deleteReserve(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showPage('page_reserve');
            searchReserve();
        }
    };
    xhttp.open("DELETE", "/reserveDelete/" + id, true);
    xhttp.send();
}

//--Buscar Reserva

function searchOneReserve(id) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);

          	showDataReserve(resp.object[0]);
        }
    };
    xhttp.open("GET", baseUrl + "/reserveListReserve/" + id, true);
    xhttp.send();
}

function showDataReserve(reserve) {

    document.getElementById("list-id-reserve").value = reserve.id;
    document.getElementById("list-date-begin").value = reserve.date_begin;
    document.getElementById("list-date-end").value = reserve.date_end;
    document.getElementById("list-room").value = reserve.room;
    document.getElementById("list-full-price").value = reserve.full_price;

}

//--Buscar Quarto

function searchOneRoom(id) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);

          	showDataRoom(resp.object[0]);
        }
    };
    xhttp.open("GET", baseUrl + "/roomListRoom/" + id, true);
    xhttp.send();
}

function showDataRoom(room) {

    document.getElementById("new-room-id").value = room.id;
    document.getElementById("list-id").value = room.id;
    document.getElementById("id").value = room.id;

    document.getElementById("list-type").value = room.type;
    document.getElementById("update-type").value = room.type;

    document.getElementById("list-price").value = room.price;
    document.getElementById("update-price").value = room.price;

    document.getElementById("list-status").checked = room.status;

}

//--Excluir Reserva

function deleteReserveRoom(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showPage('page_reserve');
        }
    };
    xhttp.open("DELETE", "/reserveDeleteRoom/" + id, true);
    xhttp.send();
}

//---Alterar Status Quarto
function updateStatus(){

    var id = document.getElementById("show-id").value;
    var room = {};

        if(document.getElementById("show-status").checked){

            room.status = false;

        }else{

            room.status = true;
            deleteReserveRoom(id);

        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var resp = JSON.parse(this.responseText);

                if (resp.status != 'OK') {
                    alert(resp.messageError);
                return;
                }

                showPage('page_room');

                searchRoom();
            }
        };
        xhttp.open("PUT", "/statusUpdate/" + id, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(room));

}

//---Alterar Quarto
function updateRoom(){

    var id = document.getElementById("id").value;

    var room = {};

        room.type = document.getElementById("update-type").value;
        room.price = document.getElementById("update-price").value;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var resp = JSON.parse(this.responseText);

                if (resp.status != 'OK') {
                    alert(resp.messageError);
                return;
                }

                showPage('page_room');

                searchRoom();
            }
        };
        xhttp.open("PUT", "/roomUpdate/" + id, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(room));

}

//--Pega Data

function configDate(){

    var date = new Date()
    var day = date.getDate();
    var month = date.getMonth();
    month = month + 1;
    if(month < 10){

        month = "0"+month;

    }
    var year = date.getFullYear();
    var dateFormattedBegin = year +"-"+ month +"-"+ day;
    var dateFormattedEnd = year +"-"+ month +"-"+ (day+1);

    document.getElementById("new-date-begin").min = dateFormattedBegin;
    document.getElementById("new-date-end").min = dateFormattedEnd;


}

