#include <Servo.h>

// Time in miliseconds for the servo to spin for
// 4000 = 4 seconds
int TIME_TO_SPIN = 4000;

// Placeholder variables for
Servo crservo;      // our servo we want to control
int incomingByte;   // storing the input from the serial

void setup() {
  // Connect to computer
  Serial.begin(19200);
  
  // Connect to servo, and set it to 90 (off)
  crservo.attach(7);
  crservo.write(90);
}

void loop() {
  // Check if we have a message from computer
  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    
    // If message was 'c'
    if (incomingByte == 'c') {
      // Start spinning clockwise
      crservo.write(180);
      
      // Wait a set time, then stop
      delay(TIME_TO_SPIN);
      crservo.write(90);
    }
    
    // If message was 'o'
    if (incomingByte == 'o') {
      // Start spinning anticlockwise
      crservo.write(0);
      
      // Wait a set time, then stop
      delay(TIME_TO_SPIN);
      crservo.write(90);
    }
  }
}
