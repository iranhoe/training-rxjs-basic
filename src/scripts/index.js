import { fromEvent, interval } from "rxjs";
import { switchMap } from 'rxjs/operators';

const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

click$.pipe(
    switchMap(() => interval$)
).subscribe(console.log);