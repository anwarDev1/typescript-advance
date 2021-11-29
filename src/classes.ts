(() => {
  class Department {
    //   private id : string;
    //   private name: string;
    //   private employee: string[] = [];
    protected employee: string[] = [];

    constructor(private readonly id: string, private name: string) {}

    //   constructor(private id: string, private name: string) {
    //     // this.name = n;
    //     // this.id = id;
    //   }

    //   constructor(id: string, name: string) {
    //     this.name = name;
    //     this.id = id;
    //   }

    describe(this: Department) {
      //Adding type safety to this so we cant call this mmethod outside froom this class
      console.log(`Department name: ${this.name} and id: ${this.id}`);
      // console.log(this);
    }

    addEmployee(employee: string) {
      this.employee.push(employee);
    }

    printEmployeeInfomation() {
      console.log("Employee length and info");
      console.log(this.employee.length);
      console.log(this.employee);
    }
  }

  const d = new Department("d1", "HR");
  // const d = new ITDepartment("d1", "HR");
  // console.log(d);
  d.describe();

  // const dCopy = {describe: d.describe};
  //dCopy.describe(); //Undefined as this - dCopy doesn't have reference to name.
  //dCopy.describe(); after addfing this typecheck in describe woont compile

  // const dCopy = {name:'DUMMY',  describe: d.describe };
  // dCopy.describe();

  d.addEmployee("Anwar");
  d.addEmployee("Ansari");

  // d.employee[2] = 'Ahtesham'; emoployee array not accessible due to private identifier
  d.printEmployeeInfomation();

  class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
      super(id, "IT");
      this.admins = admins;
    }
  }

  const it = new ITDepartment("d2", ["admin, user"]);
  console.log(it);

  class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
      super(id, "Accounting");
    }

    addReport(text: string) {
      this.reports.push(text);
    }

    printReport() {
      console.log(this.reports);
    }

    addEmployee(name: string) {
      if (name === "Anwar") {
        return;
      }
      this.employee.push(name);
    }
  }

  const accounting = new AccountingDepartment("d3", []);
  accounting.addReport("Test report");
  accounting.printReport();

  accounting.addEmployee("Anwar");
  accounting.addEmployee("Ansari");
  console.log(accounting);
})();
