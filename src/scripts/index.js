import { fromEvent, interval } from "rxjs";
import { concatMap, take  } from "rxjs/operators";

const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

click$.pipe(
    concatMap(() => interval$.pipe(take(3)))
).subscribe(console.log);