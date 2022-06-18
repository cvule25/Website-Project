let firebaseUrl = "https://web-design-projekat-default-rtdb.europe-west1.firebasedatabase.app";


let cars = {}; 
getAllCars();

function getAllCars() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
       
        removeTableRows("allCars");

        cars = JSON.parse(request.responseText);
        console.log(cars);

        for (let id in cars) {
          let car = cars[id];
          console.log(car);
          appendCarRow("allCars", id, car);
        }
      } else {
        alert("Greška prilikom učitavanja svih korisnika.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/korisnici.json");
  request.send();
}


function showEditPage() {
  let clickedBtn = this;

  let carId = clickedBtn.getAttribute("data-id");
  window.location.href = "kurs_izmena.html?id=" + carId;
}

function deleteCar() {
  let clickedBtn = this;
  let carId = clickedBtn.getAttribute("data-id");

  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        getAllCars();
      } else {
        alert("Greška prilikom brisanja automobila.");
      }
    }
  };

  request.open("DELETE", firebaseUrl + "/cars/" + carId + ".json");
  request.send();
}


function appendCarRow(tBody, id, car) {
  let carRow = document.createElement("tr");

  let brandTd = document.createElement("td");
  brandTd.innerText = car.brand;
  carRow.appendChild(brandTd);

  let modelTd = document.createElement("td");
  modelTd.innerText = car.model;
  carRow.appendChild(modelTd);

  let yearTd = document.createElement("td");
  yearTd.innerText = car.year;
  carRow.appendChild(yearTd);


  let editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.innerText = "Izmeni";
  editBtn.onclick = showEditPage;
  editBtn.setAttribute("data-id", id);

  let editTd = document.createElement("td");
  editTd.appendChild(editBtn);
  carRow.appendChild(editTd);

  let deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.innerText = "Obriši";
  deleteBtn.onclick = deleteCar;
  deleteBtn.setAttribute("data-id", id);

  let deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  carRow.appendChild(deleteTd);

  document.getElementById(tBody).appendChild(carRow);
}

function removeTableRows(tBodyId) {
  let tBody = document.getElementById(tBodyId);
  while (tBody.firstChild) {
    tBody.removeChild(tBody.lastChild);
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

