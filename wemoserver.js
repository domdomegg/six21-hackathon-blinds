'use strict';

// Change this to your local IP - this may change every time you connect to Wi-Fi
// You can find this out by alt-clicking the Wifi icon on a Mac and looking at "IP address"
// It should probably start with 192 or 172 - if it doesn't it might be your external one
// If this works then it's fine, it won't do any harm to use your external IP
const YOUR_IP = '192.168.1.1';

// Import Fauxmojs and Robotjs
// Fauxmojs handles Wemo emulation, so Alexa can detect our comptuter and communicate with it
// Robotjs controls your computer, so when Alexa asks something it can type and send something in the Arduino Serial Monitor
const FauxMo = require('fauxmojs');
const robot = require("robotjs");
// NB: You must have these in the node_modules folder
// To install, do:
//		npm install fauxmojs
//		npm install robotjs

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

console.log('Ready to connect to Alexa. If it doesn't work, check the IP address is set correctly');
