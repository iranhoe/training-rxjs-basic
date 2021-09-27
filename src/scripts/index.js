import { interval, fromEvent } from "rxjs";
import { debounceTime, 
    pluck, 
    distinctUntilChanged, 
    debounce } from "rxjs/operators";

// elems
const inputBox = document.getElementById(
    'text-input'
);

// streams
const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup');

input$.pipe(
    debounce(() => interval(1000)),
    pluck('target', 'value'),
    distinctUntilChanged()
).subscribe(console.log);