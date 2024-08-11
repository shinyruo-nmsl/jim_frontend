import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class Katana {
  public hit() {
    return "cut!";
  }
}

@injectable()
class Shuriken {
  public throw() {
    return "hit!";
  }
}

@injectable()
class Ninja {
  public constructor(
    @inject("Katana") public katana: Katana,
    @inject("Shuriken") public shuriken: Shuriken
  ) {}

  public fight() {
    return this.katana.hit();
  }
  public sneak() {
    return this.shuriken.throw();
  }
}

export { Ninja, Katana, Shuriken };
