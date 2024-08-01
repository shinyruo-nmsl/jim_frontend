export function navigate2Pre() {
  if (history.length <= 2) {
    location.href = location.origin;
  } else {
    history.go(-1);
  }
}
