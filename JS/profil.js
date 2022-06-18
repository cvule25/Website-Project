let firebaseUrl = "https://web-design-projekat-default-rtdb.europe-west1.firebasedatabase.app";

let profilId = getParamValue("id");
let profil = {};

let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function (e) {
    if (this.readyState == 4) {
        if(this.status == 200) {
            profil = JSON.parse(getRequest.responseText);
            console.log(profil);
            // let name = document.querySelector("#ime").textContent = profil.ime;
            // let prezime = document.querySelector("#prezime").textContent = profil.prezime;
            // let email = document.querySelector("#email").textContent = profil.email;
            // let rodjenje = document.querySelector("#rodjenje").textContent = profil.datumRodjenja;
            // let adresa = document.querySelector("#adresa").textContent = profil.adresa;
            // let telefon = document.querySelector("#telefon").textContent = profil.telefon;
            document.getElementById("tabela").innerHTML = `
            <tr>
                <td colspan="2" ><img id="profil-ikonica" src="../Slike/korisnik.jpeg"></td>
            </tr>
            <tr>
              <th>Ime</th>
              <td>${profil.ime}</td>
            </tr>
            <tr>
              <th>Prezime</th>
              <td>${profil.prezime}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${profil.email}</td>
            </tr>
            <tr>
                <th>Username</th>
                <td>${profil.korisnickoIme}</td>
            </tr>
            <tr>
                <th>Datum Rodjenja</th>
                <td>${profil.datumRodjenja}</td>
            </tr>
            <tr>
               <th>Adresa</th>
               <td>${profil.adresa}</td>
            </tr>
            <tr>
                <th>Broj Telefona</th>
                <td>${profil.telefon}</td>
            </tr>
            <tr>
                <td colspan="2"><a href="./korisnici.html" class="nazad">Nazad Na Korisnicu Stranicu</a></td>
            </tr>
            `
        }
        else {
            alert("greska")
        }
    }
};

getRequest.open("GET", firebaseUrl + "/korisnici/" + profilId + ".json");
getRequest.send();

function getParamValue(name) {
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("&");
  
    for (i = 0; i < splitted.length; i++) {
      let s = splitted[i].split("=");
      let pName = s[0];
      let pValue = s[1];
      if (pName == name) {
        return pValue;
      }
    }
  }

  
//---SIGNUP VALIDACIJA---//

let signupForm = document.getElementById("login12345");

signupForm.addEventListener("submit", function (e) {

  e.preventDefault();
  
  let ime = document.getElementById("ime").value.trim();
  let prezime = document.getElementById("prezime").value.trim();
  let signupUsername = document.getElementById("signupUsername").value.trim();
  let signupEmail = document.getElementById("signupEmail").value.trim();
  let phone_number = document.getElementById("phone_number").value.trim();
  let adress = document.getElementById("adress").value.trim();
  let date_of_birth = document.getElementById("date_of_birth").value.trim();
  let signupPassword = document.getElementById("signupPassword").value.trim();
  let password_repeat = document.getElementById("password_repeat").value.trim();
  const mailFormat =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
  if (ime.length <= 3){
    alert("Niste uneli važeće ime.")
  }
  else if (prezime.length <= 3){
    alert("Niste uneli važeće prezime.")
  }
  else if (signupUsername.length <= 3){
    alert("Niste uneli važeće korisničko ime.")
  }
  else if (!(mailFormat.test(signupEmail))){
    alert("Niste uneli važeću email adresu.")
  }
  else if (phone_number.length <= 0){
    alert("Niste uneli broj telefona.")
  }
  else if (phone_number.length <= 5){
    alert("Broj telefona je premali.")
  }
  else if ((isNaN(phone_number))){
    alert("Broj sadrzi karaktere koji nisu brojevi.")
  }
  else if (adress.length <= 0){
    alert("Morate uneti adresu.")
  }
  else if (date_of_birth <= 0){
    alert("Niste uneli datum rodjenja.")
  }
  else if (signupPassword.length <= 0){
    alert("Niste uneli lozinku.")
  }
  else if (signupPassword.length <= 4){
    alert("Uneta lozinka je suviše kratka.")
  }
  else if (password_repeat != signupPassword){
    alert("Unete lozinke nisu iste.")
  }
  else{
    alert("Uspešno ste napravali nalog.")
    window.location.href = "admin.html"
  } 
});
 

//---LOGIN SA FIREBASEA I VALIDACIJA LOGINA---//

let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

  e.preventDefault();
  
  let username = document.getElementById("txtUsername").value.trim();
  let password = document.getElementById("txtPassword").value.trim();
  console.log(username);
  console.log(password);

  const request = new XMLHttpRequest();
  if ((username == "") || (password == "")) {
    alert("Morate uneti sve podatke za prijavu.");
  } else {
 
    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let users = JSON.parse(request.responseText);
          console.log(users)
          const listaInformacija = Object.values(users)
          console.log(listaInformacija)
          let name = "";
          for (let i = 0; i < listaInformacija.length; i++) {

            let user = listaInformacija[i];
            console.log(user);
            if (user.email == username && user.lozinka == password) {
              name = user.name;
              break;
            }
          }
          if (name == "") {
            alert("Neispravni login podaci.");
          } else {
            alert("Uspešno ste se ulogovali.")
            window.location.replace("index.html");
          }
        } else {
          alert("GRESKA: " + this.status);
        }
      }
    };
    request.open("GET", firebaseUrl + "/korisnici.json");
    request.send();
  }
});


//---NAVBAR ZA TELEFONE---//

var navLinks = document.getElementById("navLinks");

function showMenu(){
    navLinks.style.right = "0";
}

function hideMenu(){
    navLinks.style.right = "-200px";
}

//---LOGIN OTVARANJE---//
function openForm() {
    document.getElementById("myModal").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
 } 

//---SIGNUP OTVARANJE---//
var modal = document.getElementById('id01');

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}