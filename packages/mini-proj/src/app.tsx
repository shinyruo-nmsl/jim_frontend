import "taro-ui/dist/style/index.scss";
import "./app.css";
import "../script/polyfill/text-decoder-encoder";
import { UserLoginProvider } from "./context/user";


function App({ children }) {
  return <UserLoginProvider>{children}</UserLoginProvider>;
}

export default App;
