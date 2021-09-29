import { interval, fromEvent } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { debounceTime, 
    pluck, 
    distinctUntilChanged, 
    switchMap
} from "rxjs/operators";

const BASE_URL = 'https://api.openbrewerydb.org/breweries';

// elems
const inputBox = document.getElementById(
    'text-input'
);

const typeaheadContainer = document.getElementById(
    'typeahead-container'
)

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
    // update ui
    typeaheadContainer.innerHTML = response.map(
        b => b.name
    ).join('<br>');
});