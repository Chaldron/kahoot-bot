/**
 * A single player node of the player cluster. executed on its own process from app.js
 */

//Get access to the cluster
const cluster = require('cluster')

//Get the logger function
const log = require('./log.js')

//Set the logging tag
const LOG_TAG = 'Player ' + cluster.worker.id

log(log.INFO, 'Started process.', LOG_TAG)


//Set the start handler so we start once we get the game PIN.

process.on('message', function(data)
{
	log(log.INFO, 'Recieved game PIN ' + data.gamePin + '.', LOG_TAG)

	log(log.INFO, 'Setting up Kahoot Client...', LOG_TAG)

	//Setup the Kahoot client
	const Kahoot = require('kahoot.js')
	const kClient = new Kahoot()

	//Get a random name
	const NameGenerator = require('nodejs-randomnames')
	const name = NameGenerator.getRandomName()

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

	//Exit this worker when the quiz ends.
	kClient.on('quizEnd', () =>
	{
		log(log.INFO, 'Quiz ended, terminating player process.', LOG_TAG)
		process.kill()
	})

})
