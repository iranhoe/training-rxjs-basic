import { of, forkJoin } from "rxjs";
import { delay } from "rxjs/operators";


// streams
const numbers$ = of(1,2,3);
const letters$ = of('a', 'b', 'c');

forkJoin({
    numbers: numbers$,
    latters: letters$.pipe(delay(3000))
}).subscribe(console.log);