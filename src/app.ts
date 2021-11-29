// (() => {
//     //Decorators used for meta programming
//   //Decorator runs bottom up.
//   //Decorator Factory run top down

//   //Decorator for properties and arguments return value will be iignored
//   //Decorator for accessor and method will used

//   // const Logger = (constructor: Function) => {
//   //     console.log('Loggin...');
//   //     console.log(constructor);
//   // }

//   //Decorator factory
//   const Logger = (logString: string) => {
//     console.log("LOGGER FACTORY");
//     return function (constructor: Function) {
//       console.log(logString);
//       console.log(constructor);
//     };
//   };

//   function WithTemmplate(template: string, hookId: string) {
//     console.log("TEMPLATE FACTORY");
//     //return function (_constructor: Function) { //adding _ to an argument says we dont need it
//     // return function (originalConstructor: any) {
//         return function<T extends {new(...args: any[]): {name: string} }> (originalConstructor: T) {
//           //console.log("Rendering template ...");

//           //adding _ to an argument says we dont need it
//           //   const el = document.getElementById(hookId);
//           //   if (el) {
//           //     const o1 = new originalConstructor();
//           //     el.innerHTML = template;
//           //     el.querySelector("h1")!.textContent += o1.name;
//           //   }
//           return class extends originalConstructor {
//             constructor( ..._args: any[]) {
//               super();
//               console.log("Rendering template ...");
//               const el = document.getElementById(hookId);
//               if (el) {
//                 //   const o1 = new originalConstructor();
//                 el.innerHTML = template;
//                 el.querySelector("h1")!.textContent += this.name;
//               }
//             }
//           };
//         };
//   }

//   @Logger("Logger for Person")
//   @WithTemmplate("<h1>Person object name: </h1>", "someDiv")
//   class Person {
//     name = "Anwar";
//     constructor() {
//       console.log("Creaating person...");
//     }
//   }
  
// //   console.log(Person);
  
//   const o1 = new Person();
//   console.log(o1);
// })();

// (() => {
//   /******************************Property decorators *****************************************/

//   function Log(target: any, propertyName: string| symbol) { //target is prototype fo the object, propertyName on which its called
//      console.log('Prop decorator');
//      console.log(target, propertyName);             
//   }

//   function LogAccessor(
//     target: any,
//     name: string,
//     descriptor: PropertyDescriptor
//   ) {
//     console.log("Accesssor decorator");
//     console.log(target);
//     console.log(name);  //name of the accessor not the property 'price' isntead of _price
//     console.log(descriptor);
//   }


//   function LogMethod(
//     target: any,
//     name: string | symbol,
//     descriptor: PropertyDescriptor
//   ) {
//       console.log("Method decorator");
//       console.log(target);
//       console.log(name); 
//       console.log(descriptor);
//   }


//   function LogParamerter(target: any, name: string | symbol, position: number) {
//       console.log("Parameter decorator");
//       console.log(target);
//       console.log(name);
//       console.log(position);
//   }

//   class Product {
//     @Log
//     title: string;
//     private _price: number;

//     @LogAccessor
//     set price(val: number){
//         if(val > 0){
//             this._price = val;
//         }else{
//             throw new Error('Price should be greater than 0');
//         }
//     }

//     constructor(t: string,  p: number) {
//         this.title = t;
//         this._price = p;
//     }

//     @LogMethod
//     getPriceWithTax (@LogParamerter taxRate: number){
//         return this._price * (1 + taxRate);
//     }
//   }

//   const o1 = new Product('Pixel 5', 599);
//   console.log(o1);
  
// })();


// (() => {

//   function AutoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     const adjustedDescriptor : PropertyDescriptor = {
//       configurable: true,
//       enumerable: true,
//       get(){
//         const boundFunction = originalMethod.bind(this);  //this here will alway refer to calling object
//         return boundFunction;
//       }
//     };

//     return adjustedDescriptor;

//   }
//   class Printer {
//     message = "Message";

//     @AutoBind
//     showMessage() {
//       console.log(this.message);
//     }
//   }

//   const p1 = new Printer();

//   const button = document.getElementById("btn1")!;
//   // button.addEventListener('click', () => {
//   //   p1.showMessage();
//   // });
//   //button.addEventListener("click", p1.showMessage); //undefined this is not present.
//   // button.addEventListener("click", p1.showMessage.bind(p1)); //undefined this is not present.
//   button.addEventListener("click", p1.showMessage);
// })();

(() => {
  /******************************************Validator decorator ***********************************/

  interface ValidatorConfig {
    [property: string]: {
      [ValidatableProp: string]: string[];
    };
  }
  const registeredValidators: ValidatorConfig = {};

  function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ["required"],
    };
  }

  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ["positive"],
    };
  }

  function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
      return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
      for (const validator of objValidatorConfig[prop]) {
        switch (validator) {
          case "required":
            isValid = isValid && !!obj[prop];
            break;
          case "positive":
            isValid = isValid && obj[prop] > 0;
            break;
        }
      }
    }
    return isValid;
  }

  class Course {
    @Required
    title: string;

    @PositiveNumber
    price: number;
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }

  const form = document.getElementById("courseForm")!;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const elTitle = document.getElementById("title") as HTMLInputElement;
    const elPrice = document.getElementById("price") as HTMLInputElement;

    const title = elTitle.value;
    const price = +elPrice.value;

    const c = new Course(title, price);

    //console.log(registeredValidators);

    if (!validate(c)) {
      alert("Invalid input");
      return;
    }
    console.log(c);
  });
})();