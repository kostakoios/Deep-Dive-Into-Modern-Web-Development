const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://kostat:${password}@cluster0.bqlylgr.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => console.log("connected"))
  .catch(() => console.log("error connecting"));

const personsSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personsSchema);

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()  
    })
    return;
}

let name = process.argv[3];
let number = process.argv[4]; 

const person = new Person({
    name: name,
    number: number
});

person.save().then(result => {
 console.log('note saved!')
 console.log(`added ${name} number ${number} to phonebook`)
 mongoose.connection.close()
})