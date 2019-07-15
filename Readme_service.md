To run and use the project:
1. run npm i
2. run node app.js
3. start sending request to : http://localhost:4000/

* Trello board i used for the assignment: https://trello.com/b/p5u2vd1r/mm-homeassignment

* Git repo: https://github.com/matanR2209/getGamesService

* Postman collection for testing: https://trello-attachments.s3.amazonaws.com/5d235da00afde61f6f54198a/5d2c4ad2ed8e4f885eccecd4/8c2f755956d31ef61dc985b5556dac52/MM_homeAssignment.postman_collection.json

=================================================================================================================

* UML Design: https://trello-attachments.s3.amazonaws.com/5d235da00afde61f6f54198a/5d235eea5172378ced563089/319af8edca1ed148ab18504a0512f9bf/Screen_Shot_2019-07-15_at_11.56.39.png

* UML classes design: https://trello-attachments.s3.amazonaws.com/5d235da00afde61f6f54198a/5d235f0efe0c2f37c9e9969d/50a44892b3f5caf8080b291b4fd0ae3f/Screen_Shot_2019-07-15_at_12.28.49.png

****************************************************************************************
* Explanation about handling changes in data origin
The way I managed the data handling, manipulation and reading,
is a way in which the data will always be converted into array of matchesno matter what the source is.
My purpose was that the data reading will be “black box” for the rest of the service.
The file in charge for this is the DataTransformingHandler,
which gets as input from the config file the data origin format, process the data origin, and returns array of matches.

For example, if we decide to change the data origin to remote 3rd party service, the changes that needs to be done are:
1.	Change the file type in the config file to http/Json etc
2.	Implement function that will get the new data format, parse and manipulate it, and return an array of matches.
****************************************************************************************

****************************************************************************************
* Testing agenda
When facing the testing for the service, ive decided that the testing should be focus on two things:
1. the data validity - if thinking about this service as part of a bigger service, we cant allow it to crash,
   so in order order to prevent from the service from crashing, the data should always be valid and as expected
2. the data correctness - this is actually the purpse og the service, and he would be useless if we cant get the correct data
   out of it.
from my point of view those are the two most important parts that needs to be tested, hence, i divided the testing
for each component tested, to this two parts.
****************************************************************************************


****************************************************************************************
* Explanation about filtering mechanism
Ive decided to make the filtering mechanism a bit more flexible and easy to adjust for possible changes in the data.
the way ive handled it, is by giving any value few possible keys to be found in the data origin. if for example we will add
in the future service provider where the home team there is called "host_team" (not like "home_team" now ), the only change needed is to add
the new key in the keys defined in the config file.
****************************************************************************************


****************************************************************************************
* Service logs can be found in the logs folder:
1. More technical logs regarding the request and response can be found on morgan_logs
2. More content oriented logs, can be found on general_logs
****************************************************************************************