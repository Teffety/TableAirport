const divWrap = document.createElement('div');
const navbar = document.createElement('div');
const nav = document.createElement('nav');
const main = document.createElement('div');
const sub = document.createElement('button');
const img  = document.createElement('img');
const table = document.createElement('table');
const input = document.createElement('input');
const tr = document.createElement('tr');
const td = document.createElement('td');
const foot = document.createElement('div');
const footer = document.createElement('footer');
const a = document.createElement('a');



//future components table
const jsonFile =
    '[{"key":"345","airplan":"nimbus-300","from":"Surgut","to":"Mos","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":2}, \
    {"key":"1ex4","airplan":"nimbus-300","from":"London","to":"Mos","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":0}, \
    {"key":"6td4","airplan":"nimbus-300","from":"Vlg","to":"Mos","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":0}, \
    {"key":"1347774","airplan":"nimbus-300","from":"SPB","to":"Mos","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":1}, \
    {"key":"124234","airplan":"nimbus-300","from":"Vladivostok","to":"Mos","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":2}, \
    {"key":"12356","airplan":"pob200","from":"Mos","to":"Surgut","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":0}, \
    {"key":"12356","airplan":"pob200","from":"Mos","to":"SPB","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":0}, \
    {"key":"12356","airplan":"pob200","from":"Mos","to":"New York","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":6}, \
    {"key":"12356","airplan":"pob200","from":"Mos","to":"Samara","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":0}, \
    {"key":"123tttt4","airplan":"nimbus-20","from":"Mos","to":"Surgut","timeArr":"13:00","timeCome":"15:00","timeAway":"10:00","timeWait":2.5}]';

//future components table too
let tablo = JSON.parse(jsonFile);
//future components Navbar
let naveMenuItems = ['Табло рейсов','Прилет','Вылет','Задержки'];
//future items links
let footMenuItems = ['+795*******','WhatsApp','Viber','FaceBook','YouTube','VK','Twitter','Instagram'];

//Create main div for grid css
creatWrapper = ()=>{
  divWrap.className = "wrapper";
  document.body.appendChild(divWrap);
  creatNav();
  createMain();
  createFooter();
}
//Create Navbar with buttons
creatNav = ()=>{
  getImageNavbar();
  divWrap.appendChild(navbar);
  navbar.appendChild(nav);
  navbar.className = "navbar";
  for (let i = 0;i<naveMenuItems.length;i++){
    if (i == 0){
          sub.innerHTML = naveMenuItems[i];
          sub.className = "sumbitNav active";
          sub.id = i;
          subs = sub.cloneNode(true);
          nav.appendChild(subs);
    }else{
        sub.innerHTML = naveMenuItems[i];
        sub.className = "sumbitNav";
        sub.id = i;
        subs = sub.cloneNode(true);
        nav.appendChild(subs);
    }
  }

  openFlyMode();
}
//Set image
getImageNavbar=()=>{
    img.src = "./file/logo.png";
    navbar.appendChild(img);
}
//give buttons listners
openFlyMode = () =>{
let btn = document.querySelectorAll('button');
for (let i = 0 ; i <btn.length; i++){
    btn[i].addEventListener('click',()=> {
         openNeedTab(event.target.id);
         submitChoose(event);
             });

    }
}

createMain =()=>{
  main.className= "main";
  table.id = "myTable";
  input.placeholder = "Поиск по номеру рейса";
  input.type = "text";
  input.id = "myInput";
  input.onkeyup  = input.onkeypress = searchTable;
  divWrap.appendChild(main);
  main.appendChild(input);
  main.appendChild(table);
  fillTable(0);
  input2 = input.cloneNode(false);
  input2.id = "mInput";
  input2.onkeyup = input.onkeypress = searchTable;
  main.appendChild(input2);
}

openNeedTab=(ids)=> fillTable(ids);

//function for filling table
fillTable = (ids) => {
        removeChildren(table);
        let input = document.getElementById('mInput');
        //Main Tablo flight
        if(ids == 0){

            for(let i = 0 ; i < tablo.length; i++){
        checkTime = () => {
            if(tablo[i].timeWait > 0){
                return " Время задрежки: "+tablo[i].timeWait+" час/а" ;
            }else{
                return ""
            };
        }

         tr.innerHTML  = "<td class='s'> <p>Номер рейса: "+tablo[i].key+ " <br>"+checkTime()+
         "</p> <p> Вылет <br>"+tablo[i].from+" "+ " "+tablo[i].timeArr+
         "</p> <p> Прибытие <br>"+tablo[i].to+" "+tablo[i].timeCome+"</p><p>   Самолет <br> "+tablo[i].airplan+"</p></td>" ;
         trNext =  tr.cloneNode(true);
         table.appendChild(trNext);
        }
        main.insertBefore(table,input);
    //Tablo flight arrival
    }else if(ids == 1){

        for(let i = 0 ; i < tablo.length; i++){
            checkTime = () => {
            if(tablo[i].timeWait > 0){
                 return " Время задрежки: "+tablo[i].timeWait+" час/а";
            }else{
                 return ""};
             }
        checkTo = () =>{
            if(tablo[i].from != "Mos"){
                return  "<td> <p>Номер рейса: "+tablo[i].key+ " <br>"+checkTime()+
                "</p> <p><br>"+tablo[i].from+"</p> <p> <br> "+" "+tablo[i].timeCome+"</p><p>   Самолет <br> "+tablo[i].airplan+"</p></td>" ;
            }else{ return ""}

         }

        tr.innerHTML  = checkTo();
        trNext =  tr.cloneNode(true);
        table.appendChild(trNext);
    }
    main.insertBefore(table,input);
    //Tablo flight departure
}else if (ids == 2){

        for(let i = 0 ; i < tablo.length; i++){
            checkTime = () => {
                if(tablo[i].timeWait > 0){ return " Время задрежки: "+tablo[i].timeWait+" час/а";
                }else{
                 return ""
                };
            }
            checkFrom = () =>{
             if(tablo[i].to != "Mos"){
                 return  "<td> <p>Номер рейса: "+tablo[i].key+ " <br>"+checkTime()+
                 "</p> <p> <br>"+tablo[i].to+" "+
                 "</p> <p> <br>"+" "+tablo[i].timeArr+"</p><p>   Самолет <br> "+tablo[i].airplan+"</p></td>" ; ;
             }else{ return ""}
         }

        tr.innerHTML  = checkFrom();
        trNext =  tr.cloneNode(true);
         table.appendChild(trNext);
    }
        main.insertBefore(table,input);
        //Tablo flight delay
    }else if (ids == 3) {

        for(let i = 0 ; i < tablo.length; i++){
            checkWait = () => {
            if(tablo[i].timeWait != 0){
                 return  "<td> <p>Номер рейса: "+tablo[i].key+ " <br>"+
                 " Время задрежки: "+tablo[i].timeWait+
                 " час/а</p> <p> Вылет <br>"+tablo[i].from+" "+ " "+tablo[i].timeArr+
                 "</p> <p> Прибытие <br>"+tablo[i].to+" "+tablo[i].timeCome+"</p><p>   Самолет <br> "+tablo[i].airplan+"</p></td>" ; ;
            }else{
                 return ""}
         }

          tr.innerHTML  = checkWait() ;
          trNext =  tr.cloneNode(true);
           table.appendChild(trNext);

    }
    main.insertBefore(table,input);
    }
}

//function clear table
removeChildren = (elem) => {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
}
//what submit choose
submitChoose = (evt) => {
    let buttons = document.getElementsByClassName("sumbitNav");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" active", "");
    }
 evt.currentTarget.className += " active";

}

//Search Table in inputs
searchTable = () => {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput")
  input2 =  document.getElementById('mInput');
  filter = input.value.toUpperCase();
  filter2 = input2.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 && txtValue.toUpperCase().indexOf(filter2)> -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//Create footer with links
createFooter = ()=> {
  a.className = "footerA";
  foot.className = "footer";
  divWrap.appendChild(foot);
  foot.appendChild(footer);
  for(let i = 0;i < footMenuItems.length; i++){
    a.innerHTML = footMenuItems[i];
    as= a.cloneNode(true);
    footer.appendChild(as);
  }
}

creatWrapper();
