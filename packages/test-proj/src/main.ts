import IOC from "./ioc";
const ninja = IOC.get("Ninja");

console.log(ninja.fight());
