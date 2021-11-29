(() => {
  interface IPerson {
    name: string;
    age: number;
    greeting(phrase: string): void;
  }
  // type IPerson = {
  //   readonly name: string;
  //   age: number;
  //   greeting(phrase: string): void;
  // }

  let user1: IPerson; //used as a type.

  user1 = {
    name: "Anwar",
    age: 39,
    greeting(phrase: string) {
      console.log(`${phrase} ${this.name}`);
    },
  };
  user1.greeting("Hi there");
})();

(() => {
  interface Named {
    readonly name: string;
  }

  interface Greetable extends Named {
    // readonly name: string;  //
    greeting(phrase: string): void;
  }

  class Person implements Greetable {
    name: string;
    greeting(phrase: string): void {
      console.log(`${phrase} ${this.name}`);
    }

    constructor(n: string) {
      this.name = n;
    }
  }

  const p = new Person("Anwar");
  p.greeting("Hello from ");

  let p1: Greetable;
  p1 = new Person("Ansari");
  p1.greeting("Hello form greetable");
  //   p1.name = 'AA';        //Readonly added in inteface.
})();

//Interface as functiona type
(() => {
  // type AddFn = (a: number, b: number)=>  number;
  // let add: AddFn;
  // add = (n1: number, n2: number) => { return n1+n2; };

  //Defining intergace as a tpye
  interface AddFn {
    (a: number, b: number): number;
  }
  let add: AddFn;
  add = (n1: number, n2: number) => {
    return n1 + n2;
  };
  add(2, 4);
})();

//Optional Param
(() => {
  interface Named {
    readonly name: string;
    printableName?: string;
  }

  interface Greetable extends Named {
    // readonly name: string;  //
    greeting(phrase: string): void;
  }

  class Person implements Greetable {
    name: string;
    printableName: string;
    greeting(phrase: string): void {
      console.log(`${phrase} ${this.name}`);
    }

    constructor(n: string) {
      this.name = n;
      this.printableName = "This is " + n;
    }

    printName() {
      console.log(this.printableName);
    }
  }

  const p = new Person("Anwar");
  p.greeting("Hello from ");
  p.printName();
})();
