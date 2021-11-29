(() => {
  // Code goes here!

  // const add = (a: number , b: number) => a+b;
  //Default value - need to be the last arguments
  // const add = (a: number, b: number = 9) => a + b;

  // // const printOutput = (a: number | string) => console.log(a);
  // const printOutput:  (a: number | string) => void = a => console.log(a);

  // printOutput(add(777,5));

  // const button = document.querySelector('button');

  // button?.addEventListener('click', event => {
  //     console.log(event);
  // });

  // printOutput(add(5));

  //Spread operator
  const hobbies: string[] = ["sports", "reading", "cooking"];
  const activeHobbies = ["Hiking"];

  activeHobbies.push(...hobbies);

  console.log(activeHobbies);

  const person = {
    name: "aa",
    age: 39,
  };

  //create clone of the ooriginal objet
//   const copiedPerson = { ...person };

  //Rest params
  const add = (...numbers: number[]) => {
    let result = 0;
    result = numbers.reduce((curResult, curValue) => {
      return curResult + curValue;
    }, result);

    return result;
  };

  console.log(add(1, 2, 3, 4, 5));

  const [hobby1, hobby2, ...hobbiesN] = hobbies;

  console.log(hobby1, hobby2, hobbiesN);

  const { name: userName, age } = person;

  console.log(userName, age);
})();