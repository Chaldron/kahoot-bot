module.exports = function(logLevel, logMessage, logTag)
{
	let logLevelString
	if(logLevel == 0) logLevelString = "INFO"
	if(logLevel == 1) logLevelString = "WARN"
	if(logLevel == 2) logLevelString = "ERROR"

	if(!logTag) logTag = "Kahoot-Bot"

	console.log('[' + logTag + '] ' + logLevelString + ": " + logMessage)
}

module.exports.INFO = 0
module.exports.WARN = 1
module.exports.ERROR = 2
