# CSC366 Project Raythked - Create Experience Database

## Professor Dekhtyar Spring 2022

### Contributors: Jin Choi, Joao Cavalcanti, Chris Specht, Danny Nguyen

<br>

This is a group project for CSC366 Database Modeling and Design. We are working with two clients (Anya Goodman and Dan Bacharach) to create a web application that utilizes the ONET Job Database to create a recommendation engine for jobs based on a number of job characteristics.

### Code Structure

* **excel-parse** : Directory responsible for parsing all data given in excel format by the clients, including fake data to populate DB and ONET to Profile characteristics mappings.
* **onet-parse** : Directory responsible for pinging ONET Web Services API to fetch all STEM jobs and their respective relevant data. 
* **populate.py** : The script gets both directories data and populates DB tables.
