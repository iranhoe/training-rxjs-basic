import { fromEvent, asyncScheduler } from 'rxjs';
import { map, tap, throttleTime } from 'rxjs/operators'

// helpers
function calculateScrollPercent(element) {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elems
const progressBar = document.querySelector(
  '.progress-bar'
);

// streams
const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
  throttleTime(30, asyncScheduler, {
    leading: false,
    trailing: true
  }),
  // percent progress
  map(({target}) => calculateScrollPercent(
    target.documentElement
  ))
)

progress$.subscribe(percent => {
  progressBar.style.width = `${percent}%`;
});