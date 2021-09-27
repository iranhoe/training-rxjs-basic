import { from } from "rxjs";
import { reduce, scan, map, distinctUntilKeyChanged } from 'rxjs/operators';

const numbers = [1,2,3,4,5];
const user = [
  { name: 'Brian', loggedIn: false, token: null },
  { name: 'Brian', loggedIn: false, token: 'abc' },
  { name: 'Brian', loggedIn: false, token: '123' }
]

const state$ = from(user).pipe(
  scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  }, {})
);

const name$ = state$.pipe(
  distinctUntilKeyChanged('name'),
  map(state => state.name)
);

name$.subscribe(console.log);