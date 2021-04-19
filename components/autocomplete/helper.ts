import { DOWN_KEY, UP_KEY } from "../../util/constants"

export const selectedByKeyPressed = (value, keyCode) => {
  if (keyCode === DOWN_KEY) {
    return value + 1
  }

  if (keyCode === UP_KEY) {
    return value - 1
  }

  return value
}
export const selectedByMaxLen = (value, maxValue) => {
  if (value > maxValue) {
    return 0
  }

  if (value < 0) {
    return maxValue
  }

  return value
}

export const getNextSelectedIndex = (currentIndex, results, keyCode) => {
  if (currentIndex === null) {
    return 0
  }

  return selectedByMaxLen(
    selectedByKeyPressed(currentIndex, keyCode),
    results.length - 1
  )
}
