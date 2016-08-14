/**
 * dispatch custom event of type type
 * @param type
 */
export function dispatchIhapEvent(type) {
  switch (type) {
    case "play":
      dispatchPlay();
      break;
    case "pause":
      dispatchPause();
      break;
    case "skip_next":
      dispatchSkipNext();
      break;
    case "skip_prev":
      dispatchSkipPrev();
      break;
  }
}

/**
 * TODO add actual events
 */

function dispatchPlay() {
  console.log('"play" event dispatched')
}

function dispatchPause() {
  console.log('"pause" event dispatched')
}

function dispatchSkipNext() {
  console.log('"skip_next" event dispatched')
}

function dispatchSkipPrev() {
  console.log('"skip_prev" event dispatched')
}