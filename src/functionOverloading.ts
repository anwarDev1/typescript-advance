(() => {
  /* ****************** function overloading ****************************/
  type combinable = number | string;
  // type numeric = number | boolean;
  // type universal = combinable & numeric;

  // function add(a: number): number;
  function add(a: string, b: string): string;
  function add(a: number, b: string): string;
  function add(a: string, b: number): string;
  function add(a: number, b: number): number;
  function add(a: combinable, b: combinable) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
  const result = add("Anwar", "Ansari");
  console.log(result);

  /* ****************** option chaining ****************************/
  const getchedUserData = {
    id: "U1",
    name: "Anwar",
    job: {
      title: "CEO",
      description: "Chief exec officer",
    },
  };

  //console.log(getchedUserData.job.title); // throws and error
  console.log(getchedUserData?.job?.title);

  /* ****************** nullish coleascing ****************************/

  //const userInput = null;
  // let userInput = '';
  const userInput = null;
  const storedData = userInput || "DEFAULT";
  const storedData1 = userInput ?? "DEFAULT";
  console.log(storedData);
  console.log(storedData1); //Print empty string when userInput is ''
  //User input is null or undefined then prints DEFAULT
})();
