import { Container } from "inversify";
import { Ninja, Katana, Shuriken } from "./a";

type MemberKey = keyof typeof IOC.members;

type InferInstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;

class IOC {
  private static container: Container = new Container();

  static members = {
    Ninja,
    Katana,
    Shuriken,
  };

  static get<T extends MemberKey>(
    key: T
  ): InferInstanceType<(typeof IOC.members)[T]> {
    return IOC.container.get(key);
  }

  static init() {
    Object.keys(IOC.members).forEach((k) => {
      const key = k as MemberKey;
      IOC.container.bind(key).to(IOC.members[key]);
    });
  }
}

IOC.init();

export default IOC;
