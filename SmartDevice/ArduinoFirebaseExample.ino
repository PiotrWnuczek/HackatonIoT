#include <WiFiNINA.h>
#include "Firebase_Arduino_WiFiNINA.h"

// Database Config
#define DATABASE_URL "smartdevice-app-default-rtdb.europe-west1.firebasedatabase.app"
#define DATABASE_SECRET "aQI84AF2i2WaSJIbN1Wrq1Puk2bhfAOSruoqpHFC"

// TO DO
// WiFi Config
#define WIFI_SSID "PiotrWnuczek"
#define WIFI_PASSWORD "PiotrWnuczek"

// Firebase Open
FirebaseData fbdo;

void setup()
{
  int status = WL_IDLE_STATUS;
  while (status != WL_CONNECTED)
  {
    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    delay(100);
  }
  Serial.println("Connected to WiFi");

  // Autntication Config
  Firebase.begin(DATABASE_URL, DATABASE_SECRET, WIFI_SSID, WIFI_PASSWORD);
  Firebase.reconnectWiFi(true);

  //TO DO
  // Device name
  String path = "/test";

  // TO DO
  // Time Stamp Sending
  if (Firebase.pushTimestamp(fbdo, path + "/stamps"))
  { Serial.println("New stamp sent"); }
  else { Serial.println(fbdo.errorReason()); }

  // TO DO
  // Liquid Level Sending
  int level = 100;
  if (Firebase.setInt(fbdo, path + "/level", level))
  { Serial.println("New level sent"); }
  else { Serial.println(fbdo.errorReason()); }

  // Firebase Close
  fbdo.clear();
}

void loop() { }
