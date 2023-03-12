// Install mongoose
const mongoose = require("mongoose");

// Run main function and catch error
main().catch((err) => console.log(err));

// async function
async function main() {
	//localhost ain't working because in config it's binding to 127.0.0.1
	const url = "mongodb://127.0.0.1:27017/fruitsDB";
	await mongoose.connect(url, {
		useNewUrlParser: true,
	});

	// The fruit schema
	const fruitSchema = new mongoose.Schema({
		name: String,
		rating: Number,
		review: String,
	});

	const Fruit = new mongoose.model("Fruit", fruitSchema);

	const fruit = new Fruit({
		name: "Apple",

		rating: 7.0,

		review: "pretty solid as a fruit",
	});

	//   await fruit.save(); // insert one item into the collection

	const personSchema = new mongoose.Schema({
		name: String,
		age: Number,
	});

	const Person = new mongoose.model("Person", personSchema);

	const person = new Person({
		name: "John",
		age: 37,
	});

	// await person.save();

	const fruits = [
		{ name: "Orange", rating: 7, review: "Great fruit" },
		{ name: "Banana", rating: 8, review: "Awesome fruit" },
		{ name: "Kiwi", rating: 9, review: "Wonderful fruit" },
	];

	Fruit.insertMany(fruits)
		.then(() => console.log("Successfully added fruits to database"))
		.catch((error) => console.log(error))
		.finally(() => mongoose.connection.close()); // close the mongoose connection

	//   mongoose.connection.close(); // close the mongoose connection
}
