function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    var el = document.getElementById(data);
    el.parentNode.removeChild(el);
    stevec--;
}

var stevec = 5;

function dodaj() {
    'use strict';
    var ime = document.getElementById("ime").value, priimek = document.getElementById("priimek").value, telefon = document.getElementById("telefon").value, naslov = document.getElementById("naslov").value;
    
    if(ime !== "" && priimek !== "" && telefon.length==9 && naslov !== "" && ime.length<=10 && priimek.length<=10 && naslov.length<=13){
        var x = document.getElementById('meni').insertRow(stevec);
        document.getElementById("ime").value = "";
        document.getElementById("priimek").value = "";
        document.getElementById("telefon").value = "";
        document.getElementById("naslov").value = "";
    
        x.setAttribute("id",stevec);
        x.setAttribute("draggable","true");
        x.setAttribute("ondragstart","drag(event)");
        stevec = stevec + 1;
        var ii = x.insertCell(0), z = x.insertCell(1), i = x.insertCell(2), y = x.insertCell(3);
        ii.innerHTML = ime;
        z.innerHTML = priimek;
        i.innerHTML = telefon;
        y.innerHTML = naslov;   
    }
}

function iskanje() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("isci");
  filter = input.value.toUpperCase();
  table = document.getElementById("meni");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}