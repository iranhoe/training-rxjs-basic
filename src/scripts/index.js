import { of } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

const numbers$ = of(1, 1, 2, 3, 3, 3, 4, 5, 3);

numbers$.pipe(
    distinctUntilChanged()
)
.subscribe(console.log);