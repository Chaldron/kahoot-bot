//Max number of Kahoot players
const MAX_PLAYERS = 2000

//Default amount of players
const DEFAULT_PLAYER_COUNT = 5

//Get the logger function
const log = require('./log.js')

//Store UI attributes here
//The activate handler shouldn't do anything with the UI.
const UI =
{
	playerCount: DEFAULT_PLAYER_COUNT,
	randomizePlayerNamesChecked: true,
	customPlayerNameRoot: null
}

$( () =>
{

	//Handles any strictly UI-related functionality
	UISetup()

	//Assign click handler for "go" button
	//which bascially starts the whole program
	$('#activate-button').click( () =>
	{
		log(log.INFO, "Checking parameters...")

		//TODO: Change this to be handled by the UI object
		//Check game pin: it should be a positive integer
		let gamePin = $('#pin-input').val()
		
		if(!isPositiveInteger(gamePin))
		{
			log(log.ERROR, "Game PIN is invalid! Cancelling...")
			return
		}

		//Check number of players: should be a positive integer less than MAX_PLAYERS
		let nPlayers = UI.playerCount
		if(!isPositiveInteger(nPlayers) || nPlayers > MAX_PLAYERS)
		{
			log(log.ERROR, "Player count is invalid! Canelling...")
			return
		}

		//Are we randomizing names?
		const usingRandomNames = UI.randomizePlayerNamesChecked
		if(usingRandomNames) log(log.INFO, "Using random player names")
		else log(log.INFO,"Using custom name root")

		//Get the user's custom name root
		const customNameRoot = UI.customPlayerNameRoot
		if(!usingRandomNames) log(log.INFO, "Custom name root set to " + customNameRoot)

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
			worker.send({gamePin: gamePin, randomName: usingRandomNames, nameRoot: customNameRoot})
			log(log.INFO, "Sent Player " + worker.id + " game data.")
		}
	})

	//At this point the application is ready to start
	log(log.INFO, "Initialized.")
	log(log.INFO, "Waiting for start...")


})


function UISetup()
{
	$('#player-count-input').val(UI.playerCount)

	//Hide the custom name entry by default
	$('#player-selected-name-setting').hide()

	//Store the number of players the user picks
	$('#player-count-input').on("input propertychange", () => 
	{
		UI.playerCount = $('#player-count-input').val()
	})

	//Toggle the custom name entry when the checkbox is clicked.
	$('#player-random-name-checkbox').click( () =>
	{
		$('#player-selected-name-setting').toggle()
		UI.randomizePlayerNamesChecked = $('#player-random-name-checkbox')[0].checked
	})
	//Store the user's custom name
	$('#player-selected-name-root').on("input propertychange", () => 
	{
		UI.customPlayerNameRoot = $('#player-selected-name-root').val()
	})


}


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


