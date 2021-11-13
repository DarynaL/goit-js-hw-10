import { debounce } from "lodash";
import { Notify } from 'notiflix';
import './css/styles.css';
import countryCardTpl from '../src/templates/country-info.hbs';
import shortInfoTpl from '../src/templates/short-info.hbs';
import { fetchCountries } from "../src/js/fetchCountries.js";

const searchbox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


searchbox.addEventListener('input', debounce(onInputEvt, DEBOUNCE_DELAY));

function onInputEvt(e) {
    const searchQuery = searchbox.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (!searchQuery) {
        return;
    }
    {
        fetchCountries (`${searchQuery}`).then(name => {
            if (name.length > 10 ) {
                Notify.info("Too many matches found. Please enter a more specific name.");
            }
            else if (name.length > 2 & name.length < 10) {
                const content = shortInfoTpl(name)
                countryInfo.innerHTML = content;
            }
            else {
                const markup = countryCardTpl(name)
                countryList.innerHTML = markup;
            }
        }).catch(() => {
            Notify.failure("Oops, there is no country with that name");
        }).finally(() => {
        
    })
};
}
