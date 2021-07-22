//=======================================================
let user = {};

user.name = "john";

console.log(user);  // {name: "john"}


user.surname = "Smith";

console.log(user);  // {name: "john", surname: "Smith"}


user.name = "pete";

console.log(user);  // {name: "pete", surname: "Smith"}


delete user.name;

console.log(user);  // {surname: "Smith"}
//=======================================================
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false

function isEmpty(object) {
    for(key in object) {
        return false;
    }
    return true;
}
//=======================================================
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

let sum = 0;
for(key in salaries) {
    sum += salaries[key];
}

console.log(sum);  // 390
//=======================================================
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };
  
  multiplyNumeric(menu);

  function multiplyNumeric(obj) {
      for (key in obj) {
          if (typeof obj[key] == "number") {
              obj[key] *= 2;
          }
      }
  }

  console.log(menu);  // {width: 400, height: 600, title: "My menu"}