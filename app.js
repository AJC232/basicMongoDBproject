const mongoose = require('mongoose');
const Task = require('./models/tasks');
const yargs = require('yargs');
const argv = yargs.argv;

const dbURL = 'mongodb+srv://adi-232:AcessDatabase@nodejs-tasks.yhqwx.mongodb.net/Nodejs-Tasks?retryWrites=true&w=majority'

var description = yargs.argv.description;
var completed = yargs.argv.completed;
var id = yargs.argv.id;
var command = yargs.argv._[0];

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Connected to DB'))
    .catch((err) => console.log(err));

if (command === "create") {
    addTask(description, completed);
}
else if (command === "read"){
    readTask();
}
else if (command === "update"){
    updateTask();
}
else if (command === "delete"){
    deleteTask(id);
}
else {
    console.log("Please enter a valid Command.");
}    

function addTask(description, completed){
    return new Promise((resolve, reject) => {
        const task = new Task({
            description: description,
            completed: completed
        });
    
        task.save()
           .then((result) => {
               console.log('New Task added');
           })
           .catch((err) => console.log(err));
    });
}

function readTask(){
    return new Promise((resolve, reject) => {
         Task.find()
           .then((result) => {
               result.forEach((task) => {
                   if(task.completed == false){
                       console.log(task);
                   }
               })
           })
           .catch((err) => {
               console.log(err)
           });
    });
}

function updateTask(){
    return new Promise((resolve, reject) => {
        Task.find()
           .then((result) => {
               result.forEach((task) => {
                   if(task.completed == false){
                       task.completed = true;
                       task.save()
                        .then((result) => {
                        console.log('Task updated succesfully');
                        })
                        .catch((err) => console.log(err));
                    }
               })
           })
           .catch((err) => {
               console.log(err)
           });
    });
}

function deleteTask(id){
    return new Promise((resolve, reject) => {

        Task.findByIdAndDelete(id)
          .then((result) => {
              console.log("Task Deleted");            
            })
          .catch((err) => {
              console.log(err)
          });
   });
} 