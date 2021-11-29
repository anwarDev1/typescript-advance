(() => {
  // const names: any[] = [];
  // const nameArray: Array<string> = [];
  const nameArray1: Array<string | number> = [];

  nameArray1.push("Anwar");
  nameArray1.push(1);
  console.log(nameArray1);

  // const promise = new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve('This is done');
  //   }, 1000);
  // })
  // promise.then((data) => {
  //   data.split(' ');
  // })

  const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is done");
    }, 2000);
  });

  promise.then((data) => {
    //Here TS knows the type of data promise returns
    console.log(data.toLowerCase());
  });
})();

(() => {
  function merge(objA: object, objB: object) {
    return Object.assign(objA, objB);
  }
  //const mergeObj = merge({name: 'Anwar'}, {age: 39});
  //mergeObj.name throws an error as TS does not know the type and properties of returned  object
  const mergeObj1 = merge({ name: "Anwar" }, { age: 39 }) as {
    name: string;
    age: number;
  };
  console.log(mergeObj1.name);

  function mergeObjects<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }
  const o1 = mergeObjects(
    { name: "Anwar", hobbies: ["Riding", "Reading"] },
    { age: 39 }
  );
  //console.log(o1.name, o1.age);
  console.log(o1);
  /**************** infering types ************************/
  // infering types
  mergeObjects<{ name: string; hobbies: string[] }, { age: number }>(
    { name: "Anwar", hobbies: ["Riding", "Reading"] },
    { age: 39 }
  );

  const o2 = mergeObjects({ name: "Anwar" }, 30);
  console.log(o2); //not type check for the argument. As Object.merge requires two objects

  /**************** Generic constrains ************************/
  function mergeStrict<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }

  //const o3 = mergeStrict({ name: "Anwar" }, 30);// Fails as  second argument is not of type object
  mergeStrict({ name: "Anwar", hobbies: ["Riding", "Reading"] }, { age: 39 });

  interface lengthy {
    length: Number;
  }
  function countAndPrint<T extends lengthy>(element: T): [T, string] {
    let description = "No value";
    if (element.length > 0) {
      description = `Got ${element.length} element(s)`;
    }

    return [element, description];
  }
  // console.log(countAndPrint('sdds'));
  console.log(countAndPrint([1, 2, 3])); //Pass somemthing which has a length property
})();

(() => {
  /**************** keyOf constrains ************************/

  function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
  ) {
    return "Value : " + obj[key];
  }

  // console.log(extractAndConvert({}, 'name')); throws error as name is not present in passign object
  console.log(extractAndConvert({ name: "aa" }, "name"));
})();

(() => {
  /**************** generic class ************************/
  class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
      this.data.push(item);
    }
    removeItem(item: T) {
      if (this.data.indexOf(item) === -1) {
        return;
      }
      this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
      return [...this.data];
    }
  }

  const textStorage = new DataStorage<string>();
  textStorage.addItem("AA");
  textStorage.addItem("Anwar");
  textStorage.addItem("Ansari");

  textStorage.removeItem("AA");

  console.log(textStorage.getItems());

  const numberStorage = new DataStorage<number>();
  numberStorage.addItem(12);
  numberStorage.addItem(2232);
  numberStorage.removeItem(232);
  console.log(numberStorage.getItems());

  // const objectStorage = new DataStorage<object>();
  // const o1 = {name: 'ansari'};

  // objectStorage.addItem({name: 'aa'})
  // objectStorage.addItem({ name: "anwar" });
  // objectStorage.addItem(o1);
  // objectStorage.removeItem({ name: "aa" });// doesn't remove as splice doesn't know which object
  // objectStorage.removeItem(o1); //Now works as o1 is the same reference.
  // console.log(objectStorage.getItems());
})();

(() => {
  /**************** generic utility types ************************/
  interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
  }

  function createCourseGoal(
    title: string,
    desc: string,
    completeUntil: Date
  ): CourseGoal {
    //let courseGoal: CourseGoal = {}; //Error as courseGoal is an empty object which doesn't have any props matching CourseGoal
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = desc;
    courseGoal.completeUntil = completeUntil;

    //return courseGoal; Error - Type 'Partial<CourseGoal>' is not assignable to type 'CourseGoal'.
    return courseGoal as CourseGoal;
  }

  console.log(createCourseGoal("Bond", "James bond", new Date()));

  const names: Readonly<string[]> = ["AA", "Ansari"]; //lock array
  //names.push('test');//push is not allowed
  //names.pop('AA')
  console.log(names);
})();
