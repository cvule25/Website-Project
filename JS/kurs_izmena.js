//---VALIDACIJA IZMENE KURSA---//

let kursForm = document.getElementById("kursIzmena");

kursForm.addEventListener("submit", function (e) {

  e.preventDefault();
  
  let ctitle = document.getElementById("ctitle").value.trim();
  let category = document.getElementById("category").value.trim();
  let lnumber = document.getElementById("lnumber").value.trim();
  let price = document.getElementById("price").value.trim();
  let language = document.getElementById("language").value.trim();
  let description = document.getElementById("description").value.trim();
  let editDate = document.getElementById("editDate").value.trim();
  let link = document.getElementById("link").value.trim();

  if (ctitle.length <= 0){
    alert("Niste uneli naslov.")
  }
  else if (category.length <= 0){
    alert("Niste uneli kategoriju.")
  }
  else if (lnumber.length <= 0){
    alert("Niste uneli dužinu lekcije.")
  }
  else if (price.length <= 0){
    alert("Niste uneli cenu.")
  }
  else if (language.length <= 0){
    alert("Niste uneli jezik.")
  }
  else if (description.length <= 0){
    alert("Niste uneli opis.")
  }
  else if (link.length <= 0){
    alert("Niste uneli link za sliku.")
  }
  else{
    alert("Kurs je uspešno izmenjen.")
    window.location.href = "admin.html"
  }



});


//---DINAMICKO POPUNJAVANJE IZMENE KURSA ---//
let firebaseUrl = "https://web-design-projekat-default-rtdb.europe-west1.firebasedatabase.app";

let kursId = getParamValue("id");
let kurs = {};

let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function (e) {
  if (this.readyState == 4) {
    if (this.status == 200) {
      kurs = JSON.parse(getRequest.responseText);
      console.log(kurs)
      let title = document.querySelector("#ctitle").value = kurs.naziv;
      let category = document.querySelector("#category").value = kurs.kategorija;
      let lectionNumber = document.querySelector("#lnumber").value = kurs.brojLekcija;
      let price = document.querySelector("#price").value = kurs.cena;
      let language = document.querySelector("#language").value = kurs.jezik;
      let description = document.querySelector("#description").value = kurs.opis;
      let date = document.querySelector("#editDate").value = kurs.datumIzmene;
      let imageLink = document.querySelector("#link").value = kurs.slika;
      let image = document.querySelector("#levaSlika").src = kurs.slika;
      let id = document.querySelector("#leviID").textContent = kurs.id;
      let title2 = document.querySelector("#leviNaslov").textContent = kurs.naziv;
      let kavabunga = document.querySelector("#pohadjalo").textContent = kurs.brojKorisnika;
      let kavabunga2 = document.querySelector("#prosecnaOcena").textContent = kurs.prosecnaOcena;
    } else {
      alert("Greška prilikom učitavanja automobila.");
    }
  }
};

getRequest.open("GET", firebaseUrl + "/kursevi/" + kursId + ".json");
getRequest.send();

function saveButton() {
  let clickedBtn = this;
  alert("Kurs je uspešno sačuvan.")
  window.location.href = "admin.html"
}


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



//BEZI ODAVDE//

//Meni za telefone

var navLinks = document.getElementById("navLinks");

function showMenu(){
    navLinks.style.right = "0";
}

function hideMenu(){
    navLinks.style.right = "-200px";
}
//Login i Signup
function openForm() {
    document.getElementById("myModal").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
 } 

//Signup
var modal = document.getElementById('id01');



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
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

