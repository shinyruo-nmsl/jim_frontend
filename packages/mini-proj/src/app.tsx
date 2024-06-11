import 'taro-ui/dist/style/index.scss'
import { UserLoginProvider } from "./context/user";

function App({ children }) {
  return <UserLoginProvider>{children}</UserLoginProvider>;
}

export default App;