const FIREBASE_URL = 'https://web-design-projekat-default-rtdb.europe-west1.firebasedatabase.app/kursevi.json';
const $search = document.getElementById('search');
const $matchList = document.getElementById('match-list');
const data = {};

function escape(str) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function search(query) {
  if (!query) return [];
  if (!data.statesList) return [];

  const regex = new RegExp(escape(query), 'i');

  const matches = data.statesList.filter(state => regex.test(state.autor) || regex.test(state.naziv) || regex.test(state.kategorija));

  return matches;
}

function render(matches, query) {
  if (!matches.length) {
    $matchList.innerHTML = '';
    return;
  }

  const html = matches
    .map(match => {
      const replacer = `<span class="search-match">${query}</span>`;
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

async function init() {
  const response = await fetch(FIREBASE_URL);
  data.states = await response.json();
  data.statesList = Object.values(data.states);
  $search.addEventListener('input', e => render(search(e.target.value), e.target.value));
}

init().catch(console.error);