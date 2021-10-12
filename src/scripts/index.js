import { interval, EMPTY } from 'rxjs';
import { concat, startWith, delay } from 'rxjs/operators';

const delayed$ = EMPTY.pipe(delay(1000));

delayed$.pipe(
    concat(
        delayed$.pipe(startWith('3...')),
        delayed$.pipe(startWith('2...')),
        delayed$.pipe(startWith('1...')),
        delayed$.pipe(startWith('Go!'))
    ),
    startWith('Get Ready!')
).subscribe(console.log);