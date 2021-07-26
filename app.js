// ## Agrega la dependencia de express ##
var express = require("express");

var animals = [
   {
     animalType: "dog",
     pet: true,
     fierceness: 4
   }, {
     pet: true,
     fierceness: 10
   }, {
     animalType: "giraffe",
     pet: false,
     fierceness: 4
   }, {
     animalType: "zebra",
     pet: false,
     fierceness: 8
   }, {
     animalType: "lion",
     pet: false,
     fierceness: 10
   }
 ];


// ## Inicializa express ##
var app = express();

// ## Inicializa el motor de plantillas con EJS ##
app.set('view engine', 'ejs')

// ## Agrega el middleware de express para que el servidor soporte json ##
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ############## RUTAS ################  */

/* (1)  Crea una ruta GET que: 
   - escuche en /all-pets  
   - renderice la página 'pages/all-pets' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor "All" 
      b) animals: con referencia al arreglo animals. 
*/

app.get("/all-pets", (req,res)=>{
  //res.send("all-animals");
  res.render("pages/all-pets",{title:"All",animals:animals});
})

/* (2)  Crea una ruta POST que: 
   - escuche en /api/addAnimal 
   - obtenga el valor recibido del body
   - lo agregue al arreglo animals
*/
app.post("/api/addAnimal", (req,res)=>{
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newAnimal = req.body;
  //newAnimal.animalType = newAnimal.any.replace(/\s+/g, "").toLowerCase();
  console.log(newAnimal);

  animals.push(newAnimal);
  res.json(newAnimal);  
})

/* (3)  Crea una ruta GET que: 
   - escuche en /dog  
   - renderice la página 'pages/dog' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor "Dog" 
      b) animals: con el valor del indice[0]
*/ 
app.get("/dog", (req,res)=>{
  //res.send(animals[0])
  res.render("pages/dog", {title:"Dog", dog: animals[0]})
})

/* (4)  Crea una ruta GET que: 
   - escuche en /api/getAnimal/:animal
   - obtenga el valor de la ruta dinámica
   - Realice una busqueda en el arreglo 'animals' vs el valor dinámico.
   - Si hay coincidencia almacena ese objeto en alguna variable
   - renderice la página 'pages/any' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor obtenido de la ruta dinámica
      b) animal: con la variable que almacena el objeto encontrado. Si no lo encuentra la variable se va vacía
*/ 
app.get("/api/getAnimal/:animal", (req,res)=>{
  var animal = req.params.animal;
  console.log(animal);
  for (var i = 0; i < animals.length; i++) {
    if (animal === animals[i].animalType) {
      return res.json(animals[i]);
    }
  }

  return res.json("no animal found");
})   


//  Agrega el código necesario para que el servidor escuche en el puerto 5000
var PORT= process.env.PORT || 5000
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
})