//---DINACMICKI UPDATEOVANI KURSEVI---//
let firebaseUrl = "https://web-design-projekat-default-rtdb.europe-west1.firebasedatabase.app";

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
          //appendCourse("allCourses", id, course);

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

// let courseId = document.getAttribute("data-id");
//   console.log(courseId)

// function appendCourse(tBody, id, course) {
//   let firstDiv = document.querySelector(".allCourses")
//   let divCreate = document.createElement("div");
//   firstDiv.appendChild(id, course);
  

// }


//---SIGNUP VERIFIKACIJA---//
const signUp = document.getElementById("form")
const ime = document.getElementById("ime")
const prezime = document.getElementById("prezime")
const username = document.getElementById("username")
const email = document.getElementById("email")
const phone_number = document.getElementById("phone_number")
const adress = document.getElementById("adress")
const date_of_birth = document.getElementById("date_of_birth")
const password = document.getElementById("password")
const password_repeat = document.getElementById("password_repeat")
console.log(ime)

signUp.addEventListener("submit", (e) => {
  let messages = []
  if (ime.value === ''){
    alert("Treba ime")
  }
  e.preventDefault();

  //checkInputs();
})

function checkInputs() {
  const imeValue = ime.value.trim();
  const prezimeValue = prezime.value.trim(); 
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim(); 
  const phone_numberValue = phone_number.value.trim(); 
  const adressValue = adress.value.trim(); 
  const date_of_birthValue = date_of_birth.value.trim();
  const passwordValue = password.value.trim(); 
  const password_repeatValue = password_repeat.value.trim();

  if(imeValue === ""){
    alert("Niste uneli ime.")
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

//-------VALIDACIJA-------//

// function validateform(){  
//   var name=document.myform.name.value;  
//   var password=document.myform.password.value;  
    
//   if (name==null || name==""){  
//     alert("Name can't be blank");  
//     return false;  
//   }else if(password.length<6){  
//     alert("Password must be at least 6 characters long.");  
//     return false;  
//     }  
//   }  