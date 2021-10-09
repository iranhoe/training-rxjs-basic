import { fromEvent, interval } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { switchMap, distinctUntilChanged, debounceTime, pluck } from 'rxjs/operators';

const BASE_URL = 'https://api.openbrewerydb.org/breweries';

const inputBox = document.getElementById(
    'text-input'
);
const typeaheadContainer = document.getElementById(
    'typeahead-container'
);

// streams
const input$ = fromEvent(inputBox, 'keyup');

input$.pipe(
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    switchMap(searchTerm => {
        return ajax.getJSON(
            `${BASE_URL}?by_name=${searchTerm}`
        )
    })
).subscribe(response => {
    typeaheadContainer.innerHTML = response.map(
        b => b.name
    ).join('<br>')
})