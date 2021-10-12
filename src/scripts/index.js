import { fromEvent, interval } from 'rxjs';
import { mapTo, scan, takeWhile, takeUntil, startWith } from 'rxjs/operators'

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const abortButton = document.getElementById('abort');

// streams 
const counter$ = interval(1000);
const abortClick$ = fromEvent(abortButton, 'click')

const COUNTDOWN_FROM = 20;

counter$.pipe(
    mapTo(-1),
    scan((accumulator, current) => {
        return accumulator + current;
    }, COUNTDOWN_FROM),
    takeWhile(value => value >= 0),
    takeUntil(abortClick$),
    startWith(COUNTDOWN_FROM)
).subscribe(value => {
    countdown.innerHTML = value;
    if (!value) {
        message.innerHTML = 'Liftoff!';
    }
})