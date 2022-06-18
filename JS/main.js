//---FIREBASE LINK---//
const firebaseUrl = "https://web-design-projekat-default-rtdb.europe-west1.firebasedatabase.app";


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
    window.location.href = "index.html"
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

//---DINACMICKI UPDATEOVANI KURSEVI---//

let courses = {};
getAllCourses();

function getAllCourses(){
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        courses = JSON.parse(request.responseText);
        const listaInformacija = Object.values(courses);
        
        for (let id in courses) {
          let course = courses[id];
          courseLink = "kurs.html?id=" + id;
          console.log("Kurs ID-a :" + id + " je uspesno upisan");

          document.getElementById("allCourses").innerHTML += `
          <div class="course-col">
          <h3>${course.naziv}</h3>
          <p>${course.opis}</p>
          <a href="${courseLink}">Informacije O Kursu</a>
            </div>
            `
        }
      }
      else {
        alert("Greska prilikom ucitavanja svih kurseva");
      }
    }
  }
  request.open("GET", firebaseUrl + "/kursevi.json");
  request.send();
}


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

//---SEARCH BAR---//

function searchButton(){ //Prikazuje search bar 
  document.getElementById("searchField").style.display = "inline-block";
};

const FIREBASE_URL = 'https://web-design-projekat-default-rtdb.europe-west1.firebasedatabase.app/kursevi.json';
const $search = document.getElementById('search');
const $matchList = document.getElementById('match-list');
const data = {};

function escape(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //prociscava
}

function search(query) {
  if (!query) return [];
  if (!data.statesList) return [];

  const matches = data.statesList.filter(state => query.test(state.autor) || query.test(state.naziv) || query.test(state.kategorija));

  return matches;
}

function render(matches, originalValue, query) {
  if (!matches.length) {
    $matchList.innerHTML = '';
    return;
  }

  const html = matches
    .map(match => {
      const replacer = `<span class="search-match">${originalValue}</span>`;
      return `
        <a href=kurs.html?id=${match.id} class="searchedLink">
          <div class="course-col" class="allCourses">  
            <h4>${match.naziv.replace(query, replacer)}</h4>
            <p>Kategorija: ${match.kategorija.replace(query, replacer)}</p>
            <p>Autor: ${match.autor.replace(query, replacer)}</p>
          </div>
        </a>`;
    })
    .join('');

    $matchList.innerHTML = html;
}

function inputHandler(event) {
    const { value } = event.target;
    let query;

    if (!value) query = null;
    else query = new RegExp(escape(value), 'i');

    const matches = search(query);

    render(matches, value, query);
}

async function init() { //dobavljanje jsona sa firebasea
  const response = await fetch(FIREBASE_URL);
  data.states = await response.json();
  data.statesList = Object.values(data.states);
  $search.addEventListener('input', inputHandler);
}

init().catch(console.error);