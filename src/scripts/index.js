import { fromEvent, interval, merge, EMPTY } from "rxjs";
import { takeWhile, startWith, scan, mapTo, switchMap } from "rxjs/operators";

const COUNTDOWN_FROM = 10;

const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const pauseButton = document.getElementById('pause');
const startButton = document.getElementById('start');

const counter$ = interval(1000);
const startClick$ = fromEvent(startButton, 'click');
const pauseClick$ = fromEvent(pauseButton, 'click');

merge(
    startClick$.pipe(mapTo(true)),
    pauseClick$.pipe(mapTo(false))
).pipe(
    switchMap(shouldStart => {
        return shouldStart ? counter$ : EMPTY
    }),
    mapTo(-1),
    scan((accumulator, current) => {
        return accumulator + current;
    }, COUNTDOWN_FROM),
    takeWhile(value => value >= 0),
    startWith(COUNTDOWN_FROM)
).subscribe(value => {
    countdown.innerHTML = value;
    if (!value) {
        message.innerHTML = 'Liftoff!!';
    }
})