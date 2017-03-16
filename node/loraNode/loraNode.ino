#include <SoftwareSerial.h>

#define DEBUG 1u
#define g_fault 4500

//Pin Setting for the 3 Ultrasonic Sensors
#define g_trigPin 2
#define g_echoPin 3

SoftwareSerial loraSerial(10, 11); // RX, TX

static int ledPin = 13;
static int loraReset = 9;

void loraInitialize() {
  digitalWrite(loraReset, HIGH);
  delay(250);
  digitalWrite(loraReset, LOW);
  delay(250);
  digitalWrite(loraReset, HIGH);
  delay(250);
  loraCommand("mac pause", 1000, DEBUG);
}

void setup() {
  Serial.begin(9600);
  loraSerial.begin(57600);
  pinMode(g_trigPin, OUTPUT);
  pinMode(g_echoPin, INPUT);
  pinMode(loraReset, OUTPUT);
  loraInitialize();
  delay(500);
}

void loop() {
  //Variables to calculate the distance using the duration taken for 1 cycle of trigger and echo
  long l_duration, l_distance;

  //Distance form the Ultrasonic Sensor 1
  //Generate a high pulse on Trigger Pin with 10 micro seconds delay and wait for the echo
  digitalWrite(g_trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(g_trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(g_trigPin, LOW);

  //Once received the Echo calculate the distance from the duration
  l_duration = pulseIn(g_echoPin, HIGH);
  l_distance = (l_duration / 2) / 29.1;
  delay(300);
  //  Serial.println(l_distance);
  char l_dataToSend[30];
  memset(l_dataToSend, '\0', 30);
  sprintf(l_dataToSend, "radio tx %d", l_distance);
  loraCommand(l_dataToSend, 2000, DEBUG);
  delay(1000);
}

String loraCommand(const char* p_command, const int p_timeout, boolean p_debug)
{
  String l_response = "";
  loraSerial.println(p_command);
  Serial.println(p_command);
  long int l_time = millis();
  while ( (l_time + p_timeout) > millis())
  {
    while (loraSerial.available() > 0)
    {
      char l_buffer = loraSerial.read();
      l_response += l_buffer;
    }
  }
  if (p_debug)
  {
    Serial.print(l_response);
  }
  return l_response;
}



