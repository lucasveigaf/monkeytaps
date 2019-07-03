const levels = {
  1: {
    validBoxCount: 2,
    boxNumberLimit: 50,
    boxCount: 36,
    winsUntilNextLevel: 1,
    boxesPerRow: 6,
    secondsToReveal: 2,
    secondsForCountdown: 1,
  },
  2: {
    validBoxCount: 2,
    boxNumberLimit: 100,
    boxCount: 25,
    winsUntilNextLevel: 1,
    boxesPerRow: 5,
    secondsToReveal: 2,
    secondsForCountdown: 1,
  },
  3: {
    validBoxCount: 2,
    boxNumberLimit: 200,
    boxCount: 36,
    winsUntilNextLevel: 1,
    boxesPerRow: 6,
    secondsToReveal: 2,
    secondsForCountdown: 1,
  },
  4: {
    validBoxCount: 2,
    boxNumberLimit: 500,
    boxCount: 49,
    winsUntilNextLevel: 1,
    boxesPerRow: 7,
    secondsToReveal: 1.5,
    secondsForCountdown: 1,
  }
}

export default levels;