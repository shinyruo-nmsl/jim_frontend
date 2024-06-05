import { useLaunch } from "@tarojs/taro";
import { login } from "@tarojs/taro";

function App({ children }) {
  useLaunch(async () => {
    try {
      const { code } = await login();
      console.log("code", code);
    } catch (err) {}
  });

  return <>{children}</>;
}

export default App;
