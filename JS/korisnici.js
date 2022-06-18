let firebaseUrl = "https://web-design-projekat-default-rtdb.europe-west1.firebasedatabase.app";


let users = {}; 
getAllusers();


function getAllusers() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        removeTableRows("allUsers");

        users = JSON.parse(request.responseText);
        const listaInformacija = Object.values(users)
        console.log(listaInformacija)

        for (let id in users) {
          let user = users[id];
          console.log(user);
          console.log(id);
          appenduserRow("allUsers", id, user);
        }
      } else {
        alert("Greška prilikom učitavanja svih korisnika.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/korisnici.json");
  request.send();
}


function showProfilePage() {
    let clickedBtn = this;
    let userId = clickedBtn.getAttribute("data-id");
    window.location.href = "profil.html?id=" + userId;
}

function showEditPage() {
  let clickedBtn = this;
  // console.log(clickedBtn);
  let userId = clickedBtn.getAttribute("data-id");
  window.location.href = "profil_izmena.html?id=" + userId;
}


function deleteuser() {
    let clickedBtn = this;
    let userId = clickedBtn.getAttribute("data-id");
  
    let request = new XMLHttpRequest();
    if (confirm("Da li ste sigurni da želite obrisati korisnika?")){
      alert("Korisnik je uspešno obrisan.")
      window.location.href = "index.html"
    }
    else{
      window.location.href = "korisnici.html"
    }
    // request.onreadystatechange = function () {
    //   if (this.readyState == 4) {
    //     if (this.status == 200) {
    //       getAllusers();
    //     } else {
    //       alert("Greška prilikom brisanja automobila.");
    //     }
    //   }
    // };
  
    // request.open("DELETE", firebaseUrl + "/users/" + userId + ".json");
    // request.send();
  }




function appenduserRow(tBody, id, user) {
  let userRow = document.createElement("tr");
  userRow.id = id

  let korisnickoimeTD = document.createElement("td");
  korisnickoimeTD.innerText = user.korisnickoIme;
  console.log(user.korisnickoIme)
  userRow.appendChild(korisnickoimeTD);

  let imeTD = document.createElement("td");
  imeTD.innerText = user.ime;
  userRow.appendChild(imeTD);

  let prezimeTD = document.createElement("td");
  prezimeTD.innerText = user.prezime;
  userRow.appendChild(prezimeTD);

  let emailTD = document.createElement("td");
  emailTD.innerText = user.email;
  userRow.appendChild(emailTD);

  let datumTD = document.createElement("td");
  datumTD.innerText = user.datumRodjenja;
  userRow.appendChild(datumTD);

  let adresaTD = document.createElement("td");
  adresaTD.innerText = user.adresa;
  userRow.appendChild(adresaTD);

  let brojTD = document.createElement("td");
  brojTD.innerText = user.telefon;
  userRow.appendChild(brojTD);
  console.log(user.telefon)

  // <button type="button" onclick="showEditPage()" data-id="neki_id">Izmeni</button>
  //Profil dugme
  let profileBtn = document.createElement("td");
  profileBtn.type = "button";
  profileBtn.innerText = "Profil";
  profileBtn.onclick = showProfilePage;
  profileBtn.setAttribute("data-id", id);

  let profileTD = document.createElement("td")
  profileTD.appendChild(profileBtn);
  userRow.appendChild(profileTD);


  //Edit dugme
  let editBtn = document.createElement("td");
  editBtn.type = "button";
  editBtn.innerText = "Izmeni";
  editBtn.onclick = showEditPage;
  editBtn.setAttribute("data-id", id);

  let editTd = document.createElement("td");
  editTd.appendChild(editBtn);
  userRow.appendChild(editTd);

  
  //Delete dugme
  let deleteBtn = document.createElement("td");
  deleteBtn.type = "button";
  deleteBtn.innerText = "Obriši";
  deleteBtn.onclick = deleteuser;
  deleteBtn.setAttribute("data-id", id);

  let deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  userRow.appendChild(deleteTd);

  document.getElementById(tBody).appendChild(userRow);
}


function removeTableRows(tBodyId) {
  let tBody = document.getElementById(tBodyId);
  while (tBody.firstChild) {
    tBody.removeChild(tBody.lastChild);
  }
}


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

