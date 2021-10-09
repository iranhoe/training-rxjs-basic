import { fromEvent } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from 'rxjs/operators';

// streams
const click$ = fromEvent(document, 'click');

const coordinates$ = click$.pipe(
    map(event => ({
        x: event.clientX,
        y: event.clientY
    }))
);

const coordinatesWithSave$ = coordinates$.pipe(
    mergeMap(coords => ajax.post(
        'https://www.mocky.io/v2/5185415ba171ea3a00704eed'
    ))
);

coordinatesWithSave$.subscribe(console.log);