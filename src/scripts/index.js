import { of, fromEvent } from "rxjs";
import { delay, concatMap } from "rxjs/operators";

const saveAnswer = answer => {
    // simulate delay request
    return of(`Saved: ${answer}`).pipe(
        delay(1500)
    );
}

// elems
const radioButtons = document.querySelectorAll(
    '.radio-option'
);

// stream
const answerChange$ = fromEvent(
    radioButtons, 'click'
);

answerChange$.pipe(
    concatMap(event => saveAnswer(
        event.target.value
    ))
).subscribe(console.log);