const { yulia } = require("./lib");

yulia.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(r => console.log(r))
  .catch(e => console.error(e));

yulia.get('https://javarush.ru/api/1.0/rest/me')
  .then(r => console.log(r, "javarush"))
  .catch(e => console.error(e, "javarush"));  


 