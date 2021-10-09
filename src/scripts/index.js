import { fromEvent, timer } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { takeUntil, pluck, exhaustMap, tap, finalize, switchMapTo } from "rxjs/operators";

// elems
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const dogImage = document.getElementById('dog');

const pollingStatus = document.getElementById('polling-status');

// streams
const startClick$ = fromEvent(startButton, 'click');
const stopClick$ = fromEvent(stopButton, 'click');

startClick$.pipe(
    // map to interval
    exhaustMap(() => timer(0, 5000).pipe(
        tap(() => pollingStatus.innerHTML = 'Active'),
        switchMapTo(
            ajax.getJSON(
                'https://random.dog/woof.json'
            ).pipe(
                pluck('url')
            )
        ),
        takeUntil(stopClick$),
        finalize(() => pollingStatus.innerHTML = 'stopped')
    ))
).subscribe(url => dogImage.src = url);
