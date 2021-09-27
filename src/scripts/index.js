import { of, fromEvent } from "rxjs";
import { take, map, takeWhile } from "rxjs/operators";

const click$ = fromEvent(document, 'click');

click$.pipe(
    map(event => ({
        x: event.clientX,
        y: event.clientY
    })),
    takeWhile(({y}) => y <= 200, true)
).subscribe({
    next: console.log,
    complete: () => console.log('complete!')
});