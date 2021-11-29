(() => {
  class Department {
    protected employee: string[] = [];
    static fiscallYear = 2020;

    constructor(protected readonly id: string, private name: string) {}

    describe(this: Department) {
      console.log(`Department name: ${this.name} and id: ${this.id}`);
    }

    addEmployee(employee: string) {
      this.employee.push(employee);
    }

    printEmployeeInfomation() {
      console.log("Employee length and info");
      console.log(this.employee.length);
      console.log(this.employee);
    }

    static createEmployee(name: string) {
      return { name };
    }
  }

  const d = new Department("d1", "HR");
  d.describe();
  d.addEmployee("Anwar");
  d.addEmployee("Ansari");
  d.printEmployeeInfomation();

  console.log("Create Employee :", Department.createEmployee("Anwar A"));
  console.log("Fiscal year :", Department.fiscallYear);

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
    private lastReport: string;

    //Getter and Settters
    get getLastReport() {
      return this.lastReport;
    }
    set setLastReport(value: string) {
      if (!value) {
        throw new Error("Please pass repoort to set");
      }
      this.addReport(value);
    }

    constructor(id: string, private reports: string[]) {
      super(id, "Accounting");
      this.lastReport = reports.length > 0 ? reports[0] : "";
    }

    addReport(text: string) {
      this.reports.push(text);
      this.lastReport = text;
    }

    printReport() {
      console.log(this.reports);
      console.log(this.lastReport);
    }

    addEmployee(name: string) {
      if (name === "Anwar") {
        return;
      }
      this.employee.push(name);
    }

    describe() {
      console.log("Accounting department and id: " + this.id);
    }
  }

  const accounting = new AccountingDepartment("d3", []);

  accounting.addReport("Test report");
  accounting.printReport();
  console.log(accounting.getLastReport);

  accounting.setLastReport = "Report2";
  accounting.printReport();

  accounting.addEmployee("Anwar");
  accounting.addEmployee("Ansari");
  console.log(accounting);
  accounting.describe();
})();
