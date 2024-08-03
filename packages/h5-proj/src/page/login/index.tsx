import { WebUtil, WebService } from "web-common";
import { Tabs, Form, Button, Input, Toast } from "antd-mobile";

const {
  Navigate: { navigate2Pre },
} = WebUtil;

const {
  Login: { useLogin },
} = WebService;

function LoginPage() {
  const {
    loginName,
    setLoginName,
    loginPassword,
    setLoginPassword,
    login,

    registName,
    setRegistName,
    registPassword,
    setRegistPassword,
    regist,

    tabs,
    curTabIndex,
    setCurTabIndex,
  } = useLogin();

  const handleClickLoginConfirmButton = async () => {
    if (!loginName) {
      Toast.show("用户名为空~");
      return;
    }
    if (!loginPassword) {
      Toast.show("密码为空~");
      return;
    }
    try {
      await login();
      Toast.show("登录成功~");
      navigate2Pre();
    } catch (err: any) {
      Toast.show(err.message);
    }
  };

  const hanndleClickRegistComfirmButton = async () => {
    try {
      await regist();
      Toast.show("注册成功");
      setCurTabIndex(0);
    } catch (err: any) {
      Toast.show(err.message);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-azure">
      <div className="rounded-12 bg-gray-100">
        <Tabs
          activeKey={String(curTabIndex)}
          onChange={(key) => setCurTabIndex(Number(key))}
          className="login-tabs"
        >
          {tabs.map((item, index) => (
            <Tabs.Tab key={index} title={item} />
          ))}
        </Tabs>
        <div className="login-form">
          {curTabIndex === 0 ? (
            <BaseForm
              name={loginName}
              password={loginPassword}
              buttonText="登录"
              onInputName={setLoginName}
              onInputPassword={setLoginPassword}
              onClickComfirmButton={handleClickLoginConfirmButton}
            />
          ) : (
            <BaseForm
              name={registName}
              password={registPassword}
              buttonText="注册"
              onInputName={setRegistName}
              onInputPassword={setRegistPassword}
              onClickComfirmButton={hanndleClickRegistComfirmButton}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface FormProps {
  name: string;
  password: string;
  buttonText: string;
  onInputName: (val: string) => void;
  onInputPassword: (val: string) => void;
  onClickComfirmButton: () => void;
}

function BaseForm({
  name,
  password,
  buttonText,
  onInputName,
  onInputPassword,
  onClickComfirmButton,
}: FormProps) {
  return (
    <Form
      layout="horizontal"
      mode="card"
      footer={
        <div className="w-full h-full flex items-center justify-center">
          <Button
            className="w-200"
            color="primary"
            onClick={onClickComfirmButton}
          >
            {buttonText}
          </Button>
        </div>
      }
    >
      <Form.Item
        label="Username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input value={name} maxLength={20} onChange={(e) => onInputName(e)} />
      </Form.Item>

      <Form.Item
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          value={password}
          type="password"
          maxLength={20}
          onChange={(e) => onInputPassword(e)}
        />
      </Form.Item>
    </Form>
  );
}

export default LoginPage;
