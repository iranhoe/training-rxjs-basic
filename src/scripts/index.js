import { fromEvent, EMPTY } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { 
    debounceTime,
    pluck,
    distinctUntilChanged,
    switchMap,
    catchError 
} from "rxjs";

const BASE_URL ='https://api.openbrewerydb.org/breweries';

const input = document.getElementById('input-text');
const typeaheadContainer = document.getElementById('typeahead-container');

const input$ = fromEvent(input, 'keyup');

input$.pipe(
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    switchMap(searchTerm => {
        return ajax.getJSON(
            `${BASE_URL}?by_name=${searchTerm}`
        ).pipe(
            catchError((error, caught) => {
                // throw, return obs
                return caught
            })
        )
    })
).subscribe(response => {
    typeaheadContainer.innerHTML = response.map(
        b => b.name
    ).join('<br>');
});