(() => {
  //intersaction type
  type Admin = {
    name: string;
    privileges: string[];
  };

  type Employee = {
    name: string;
    startDate: Date;
  };
  //interface ElevatedEmployee extends Admin , Employee{};
  //In case of object type it is hte aggregation of all the types
  type ElevatedEmployee = Admin & Employee;

  const e1: ElevatedEmployee = {
    name: "Anwar",
    privileges: ["Admin", "dBUser"],
    startDate: new Date(),
  };

  console.log(e1);

  //In case of union type is the common type or intersaction
  type combinable = number | string;
  // type numeric = number | boolean;
  // type universal = combinable & numeric;

  /* ****************** Type guard ****************************/
  function add(a: combinable, b: combinable) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
  add(2,3);
  type UnkownEmployee = Employee | Admin;
  function printEmployee(emp: UnkownEmployee) {
    console.log(`Employee Name: ${emp.name}`);
    if ("privileges" in emp) {
      console.log(`Employee Privileges: ${emp.privileges}`);
    }
    if ("startDate" in emp) {
      console.log(`Employee start date: ${emp.startDate}`);
    }
  }
  printEmployee(e1);

  class Car {
    drive() {
      console.log("Driving");
    }
  }
  class Truck {
    drive() {
      console.log("Driving truck");
    }
    loadCargo(amount: number) {
      console.log(`Loading cargo : ${amount}`);
    }
  }
  type Vehicle = Car | Truck;

  const c1 = new Car();
  const t1 = new Truck();

  function useVehicle(v1: Vehicle) {
    v1.drive();
    if (v1 instanceof Truck) {
      //Cannot be used with interface.
      v1.loadCargo(123);
    }
  }
  useVehicle(c1);
  useVehicle(t1);

  /* ****************** Discriminated union****************************/
  interface Bird {
    type: "bird"; //Defines type of inteface.
    flyingSpeed: number;
  }
  interface Horse {
    type: "horse";
    groundSpeed: number;
  }
  type Animal = Bird | Horse;
  function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
      case "bird":
        speed = animal.flyingSpeed;
        break;
      case "horse":
        speed = animal.groundSpeed;
        break;
      default:
        break;
    }

    console.log(`Moving at speed: ${speed}`);
  }
  moveAnimal({ type: "bird", flyingSpeed: 12 });
  moveAnimal({ type: "horse", groundSpeed: 45 });
  /* ****************** type casting****************************/
  // ! means the expression will never be null
  //If use 'as' then it will never be null
  // const para = document.querySelector("p");
  // const userInput = <HTMLInputElement> document.getElementById("user-input");
  const userInput = document.getElementById("user-input")! as HTMLInputElement;
  userInput.value = "From TS";

  /* ****************** Indexed Properties****************************/

  interface ErrorContainer {
    [prop: string]: string; //properties can string, number or symbol
    id: string; //Cannot be of type different than indexed property
  }

  const errors: ErrorContainer = {
    id: "001",
    email: "Not a valid email address",
    userName: "must start with capital letter",
  };
  console.log(errors);
  for (let i in errors) {
    console.log(i, errors[i]);
  }
})()