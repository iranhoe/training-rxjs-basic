import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, debounceTime, mergeAll, mergeMap } from 'rxjs/operators';

// elems
const textInput = document.getElementById('text-input');

// streams
const input$ = fromEvent(textInput, 'keyup');

input$.pipe(
    debounceTime(200),
    mergeMap(event => {
        const term = event.target.value
        return ajax.getJSON(
            `https://api.github.com/users/${term}` 
        )
    })
).subscribe(console.log);