import { useState } from "react";
import { Button, Form, Input, Tabs, message } from "antd";
import { navigate2Pre } from "@/util/navigate";
import { useUserLoginDispatch } from "@/context/user";

import { login, regist } from "./service";

import "./index.less";

function Login() {
  const loginDispatch = useUserLoginDispatch();

  const tabs = ["登录", "注册"];
  const [curTabIndex, setCurTabIndex] = useState(0);

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registName, setRegistName] = useState("");
  const [registPassword, setRegistPassword] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleClickLoginConfirmButton = async () => {
    if (!loginName) {
      message.error("用户名为空~");
      return;
    }
    if (!loginPassword) {
      message.error("密码为空~");
      return;
    }
    try {
      await login({ account: loginName, password: loginPassword });
      messageApi.success("登录成功~");
      await loginDispatch({ type: "refresh" });
      navigate2Pre();
    } catch (err: any) {
      messageApi.error(err.message);
    }
  };

  const hanndleClickRegistComfirmButton = async () => {
    if (!registName) {
      message.error("用户名为空~");
      return;
    }
    if (!registPassword) {
      message.error("密码为空~");
      return;
    }
    try {
      await regist({ account: registName, password: registPassword });
      messageApi.success("注册成功");
      setCurTabIndex(0);
    } catch (err: any) {
      messageApi.error(err.message);
    }
  };

  return (
    <div className="login">
      {contextHolder}
      <div className="container">
        <Tabs
          type="card"
          items={tabs.map((tab, i) => ({
            label: tab,
            key: String(i),
          }))}
          onChange={(key) => setCurTabIndex(Number(key))}
        />

        {curTabIndex === 0 && (
          <BaseForm
            key="登录"
            name={loginName}
            password={loginPassword}
            buttonText="登录"
            onInputName={setLoginName}
            onInputPassword={setLoginPassword}
            onClickComfirmButton={handleClickLoginConfirmButton}
          />
        )}

        {curTabIndex === 1 && (
          <BaseForm
            key="注册"
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
      name="basic"
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          value={name}
          maxLength={20}
          onChange={(e) => onInputName(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          value={password}
          maxLength={20}
          onChange={(e) => onInputPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={onClickComfirmButton}>
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
