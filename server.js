
//importing the Express framework
const express = require('express');

//importing mysql module
const mysql = require('mysql');

//importing body-parser module
const bodyParser = require('body-parser');

//creating an instance of the Express application
const app = express();

// Adding middleware for parse incoming request body
app.use(bodyParser.urlencoded({ extended: false }));

// Add middleware for parse incoming data in JSON
app.use(bodyParser.json());

//Make MySQL Database Connection
const connection = mysql.createConnection({
	host: 'localhost',
	database: 'curd_database',
	user: 'root',
	password: ''
});

//Check MySQL Database Connection
connection.connect((error) => {
	console.log('MySQL Database is connected Successfully');
});

//Creating a Route for Load index.html file
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/index.html");
});


// Creating a  Route  to handle  the get request
app.get("/get_data", (request, response) => {
	const sql = `SELECT * FROM emp_details`;

	connection.query(sql, (error, results) => {
		console.log(error);
		response.send(results);

	});
});

//Create Route for Insert Data Operation
app.post("/add_data", (request, response) => {

	const first_name = request.body.first_name;

	const last_name = request.body.last_name;

	const city = request.body.city;

	const sql = `
	INSERT INTO emp_details 
	(first_name, last_name, city) 
	VALUES ("${first_name}", "${last_name}", "${city}")
	`;

	connection.query(sql, (error, results) => {
		response.json({
			message: 'Data Added'
		});
	});

});

//Create Route for Update Data Operation
app.post('/update_data', (request, response) => {

	const variable_name = request.body.variable_name;

	const variable_value = request.body.variable_value;

	const id = request.body.id;

	const sql = `UPDATE emp_details SET ` + variable_name + `= "${variable_value}" WHERE id = "${id}"`;

	connection.query(sql, (error, results) => {

		response.json({
			message: 'Data Updated'
		});

	});

});

//Create Route for Delete data operation
app.post("/delete_data", (request, response) => {

	const id = request.body.id;

	const sql = `DELETE FROM emp_details WHERE id = '${id}'`;

	connection.query(sql, (error, results) => {
		response.json({
			message: 'Data Deleted'
		});
	});

});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});

