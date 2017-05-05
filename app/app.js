//Max number of Kahoot players
const MAX_PLAYERS = 10

//Get the logger function
const log = require('./log.js')

$( () =>
{

	//Assign click handler for "go" button
	//which bascially starts the whole program
	$('#activate-button').click( () =>
	{
		log(log.INFO, "Checking parameters...")

		//Check game pin: it should be a positive integer
		let gamePin = $('#pin-input').val()
		
		if(!isPositiveInteger(gamePin))
		{
			log(log.ERROR, "Game PIN is invalid! Cancelling...")
			return
		}

		//Check number of players: should be a positive integer less than MAX_PLAYERS
		let nPlayers = $('#player-count-input').val()
		if(!isPositiveInteger(nPlayers) || nPlayers > MAX_PLAYERS)
		{
			log(log.ERROR, "Player count is invalid! Canelling...")
			return
		}

		//After handling error-checking, we can begin the botting process

		//We'll fork nPlayer processes and send them the initialization data.

		//Get the cluster
		var cluster = require('cluster')
		//Set the master node to execute player_cluster_node.js
		cluster.setupMaster(
		{
			exec: __dirname + '/player_cluster_node.js'
		})

		//Fork the master nPlayers times and send over the data
		for(let i = 0; i < nPlayers; i++)
		{
			let worker = cluster.fork()
			log(log.INFO, "Created new player process.")
			worker.send({gamePin: gamePin})
			log(log.INFO, "Sent Player " + worker.id + " game pin.")
		}



	})

	//At this point the application is ready to start
	log(log.INFO, "Initialized.")
	log(log.INFO, "Waiting for start...")


})




/**
 * Returns true if a string s is a positive integer
 */
function isPositiveInteger(s)
{
	//Check if s is positive
	if(Math.abs(s) / s != 1)
		return false
	//Check if s is an integer
	if(Math.floor(s) != Number(s))
		return false

	return true
}


