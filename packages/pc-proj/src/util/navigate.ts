export function navigate2Login() {
  location.href = `${location.origin}/login`;
}

export function navigate2Pre() {
  if (history.length <= 2) {
    location.href = location.origin;
  } else {
    history.go(-1);
  }
}
