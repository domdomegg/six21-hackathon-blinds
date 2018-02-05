'use strict';

// Change this to your local IP
const YOUR_IP = '192.168.1.1';

// Import Fauxmojs and Robotjs
const FauxMo = require('fauxmojs');
const robot = require("robotjs");

// Create fake Wemo device
let fauxMo = new FauxMo({
	ipAddress: YOUR_IP,
	devices: [{
		// Name of your device
		name: 'blinds',
		port: 11000,
		handler: (action) => {
			console.log('Blinds triggered: ', action);

			// Type either 'c' or 'o' depending on whether Alexa asked for 'off' or 'on'
			if (action == 'on') {
				robot.typeString("c");
			} else if (action == 'off') {
				robot.typeString("o");
			}

			// Press enter to send message
			robot.keyTap("enter");
		}
	}]
});

console.log('Ready to connect to Alexa. If it doesn\'t work, check the IP address is set correctly');
