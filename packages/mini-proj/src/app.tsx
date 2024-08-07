import "taro-ui/dist/style/index.scss";
import "./app.css";
import { UserLoginProvider } from "./context/user";

import "../script/polyfill/text-decoder-encoder";

function App({ children }) {
  return <UserLoginProvider>{children}</UserLoginProvider>;
}

export default App;
