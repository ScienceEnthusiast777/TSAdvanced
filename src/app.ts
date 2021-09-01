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
  // job: { title: "boss", description: "the boss" },
};

// console.log(fetchedUserData.job);
// console.log(fetchedUserData.job&&console.log(fetchedUserData.job.title)); would work with vanilla JS

// console.log(fetchedUserData?.job?.title) // this can work in later versions of TS

//nullish coalescing
const input = null;
//imagine we dont know if it is null
const storedData = input ?? "default"; //if is null or undefined then get the fallback
console.log(storedData);

//generics
const names: Array<string> = [];
names[0].split(" "); //works because it knows that it should be type string.
//<T> generic type

// const promise = new Promise<string>((resolve, /*reject*/) => {
//   setTimeout(() => {
//     resolve("finished");
//   }, 2000);
// });

// promise.then(data => {
//   data.split(' ')
// })

// only works because we provided the information that this should resolve to a string

// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }
// const merged = merge({ name: "philip" }, { age: 22 });
// let tester = merged.age
//wont work

// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }
// const merged = merge({ name: "philip" }, { age: 22 });

//now this works because TS knows more about whawt needs to be returned
//allows to be less restrictive, but still give type script more information about what is going on

//type contraints

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

//no we need objects but they can be of any content
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "no val";
  if (element.length > 0) {
    descriptionText = "Got " + element.length + "elements.";
  }

  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there")); // works

//allows you to be specific when you dont partricularly need a specific type but, for éxample here, have a more loose criteria (should have length property)

//key of constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

//here the checker will check that U is a key of T

//generic class.
//where we want unifrom data
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }
  remove(item: T) {
    this.data.splice(this.data.indexOf(item, 1));
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem("hello");

const numberStorage = new DataStorage<number>();

numberStorage.addItem(2);

// const objectStorage = new DataStorage<object>();

// objectStorage.addItem({ name: "peter" });

// console.log(objectStorage.getItems());
//objects wouldnt work (even without the extension of primitive types above) because we are using objects which are reference types.

//Utility Types
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

//Partial
function CreateGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal; //because otherwise it would have been of type partial, which is not allowed by function
}

//Readonly

const namesOfDog: Readonly<string[]> = ["bob", "ben", "tilly"];
// namesOfDog.push("phil");
//not allowed

//generics are good for locking a certain type for a certain class/ funtion or whatever


