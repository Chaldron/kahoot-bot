/**
 * A single player node of the player cluster. executed on its own process from app.js
 */

//Get access to the cluster
const cluster = require('cluster')

//Set this worker's ID
const id = cluster.worker.id

//Get the logger function
const log = require('./log.js')

//Set the logging tag
let LOG_TAG = 'Player ' + id

log(log.INFO, 'Started process.', LOG_TAG)


//Set the start handler so we start once we get the game data.

process.on('message', function(data)
{
	log(log.INFO, 'Recieved game data for game ' + data.gamePin + '.', LOG_TAG)

	log(log.INFO, 'Setting up Kahoot Client...', LOG_TAG)

	//Setup the Kahoot client
	const Kahoot = require('kahoot.js')
	const kClient = new Kahoot()

	//Get this player's name
	let name
	if(data.randomName) //Get a random name
		name = require('nodejs-randomnames').getRandomName()
	else //Append the player ID to the name root
		name = data.nameRoot + ' ' + id

	//Update the log tag to reflect the name
	LOG_TAG += ' - ' + name


	const gamePin = data.gamePin

	//Answers are represented 0-3, so we choose a random one to pick from that list
	let nextAnswer = Math.round(Math.random() * 3)

	//Join the game
	log(log.INFO, 'Joining game ' + gamePin, LOG_TAG)
	kClient.join(gamePin, name)

	kClient.on('joined', () =>
	{
		log(log.INFO, 'Joined game ' + gamePin + '!',LOG_TAG)
	})

	//Answer each question with the next random number.
	kClient.on('questionStart', (question) =>
	{
		log(log.INFO, 'Answering question with answer ' + nextAnswer, LOG_TAG)
		question.answer(nextAnswer)
		nextAnswer = Math.round(Math.random() * 3)
	})

	//Leave the session and exit this worker when the quiz ends.
	kClient.on('finish', () =>
	{
		log(log.INFO, 'Quiz ended, disconnecting and terminating player process.', LOG_TAG)
		kClient.leave()
		cluster.worker.process.kill()
	})

})
