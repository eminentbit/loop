export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function capitalizeWords(string) {
  return string
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

export function capitalizeFirstLetterOfEachWord(string) {
  return string
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

export function capitalizeEachWord(string) {
  return string
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}
