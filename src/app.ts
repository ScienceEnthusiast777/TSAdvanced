//intersection types
type Admin = {
  name: string;
  priveleges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Alex",
  priveleges: ["all"],
  startDate: new Date(),
};
//similar to interfaces. could have achieved the same thing wiht interfaces, and extends.
type Combinable = string | number;
type Numeric = number | boolean;
type Unioversal = Combinable & Numeric;

//type guards
//help with union types .
//function overload
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add(1, 2);

type UnknownEmployee = Employee | Admin;

function PrintEmployeeInfo(emp: UnknownEmployee) {
  if ("priveleges" in emp) {
    console.log(emp.name, emp.priveleges);
  }
}

PrintEmployeeInfo(e1);

class Car {
  drive() {
    console.log("drive");
  }
}

class Truck {
  drive() {
    console.log("truckin");
  }
  load() {
    console.log("loading");
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if ("load" in vehicle) {
    vehicle.load;
  }
  //or, because we are using classes we can use JS instanceof
  if (vehicle instanceof Truck) {
    vehicle.load;
  }
}

//discriminated union
//makes type guards easier

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  if (animal.type === "bird") {
    animal.flyingSpeed = 10;
  }
  if (animal.type === "horse") {
    animal.runningSpeed = 20;
  }
}

//this means that there is one common property that describes the object and lets you perform type checking .,

//type casting
const paragraph = document.getElementById(
  "message-output"
)! as HTMLParagraphElement;
//! means will never return null
//or
const userInput = <HTMLInputElement>document.getElementById("user-input");

userInput.value = "enter email ";
paragraph.innerHTML = "HOWDY PARTNERRRRRRRR";

//index types

interface ErrorContainer {
  id: string;
  [prop: string]: string;
}
//every property name has to have a string key name
const errorBag: ErrorContainer = {
  id: "email",
  message: "wrong email mate",
};

// function overloads
//see above in add function
//allows to be more specific about the behaviour with different types.

const fetchedUserData = {
  id: "u1",
  name: "alex",
  job: { title: "boss", description: "the boss" },
};
