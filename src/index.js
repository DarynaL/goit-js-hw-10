import './css/styles.css';
import countryCardTpl from '../src/templates/country-info.hbs'

const searchbox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


searchbox.addEventListener('input', e => {
    e.preventDefault();
    const name = searchbox.value;
    fetchCountries(name)
        .then(renderCountryCard);
});


function renderCountryCard(name) {
    const markup = countryCardTpl(name);
    countryInfo.innerHTML = markup;
        }

function fetchCountries (name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => response.json())
}
