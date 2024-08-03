export function navigate2Pre() {
  console.log("navigate2Pre", history, history.length);
  if (history.length <= 2) {
    location.href = location.origin;
  } else {
    history.go(-1);
  }
}
