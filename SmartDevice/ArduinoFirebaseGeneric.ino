#include <WiFiNINA.h>
#include "Firebase_Arduino_WiFiNINA.h"

//Config
#define DATABASE_URL "arduinofirebase-app-default-rtdb.europe-west1.firebasedatabase.app"
#define DATABASE_SECRET "hlRjCtxV95FK3c6KsCsBFLYb2nGpAnLO6tYbszit"
#define WIFI_SSID "PiotrWnuczek"
#define WIFI_PASSWORD "PiotrWnuczek"

//Firebase
FirebaseData fbdo;

void setup()
{
  int status = WL_IDLE_STATUS;
  while (status != WL_CONNECTED)
  {
    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    delay(100);
  }
  Serial.println("Connected with WiFi");

  //Autntication
  Firebase.begin(DATABASE_URL, DATABASE_SECRET, WIFI_SSID, WIFI_PASSWORD);
  Firebase.reconnectWiFi(true);

  String path = "/ArduinoMKR1010WiFi";

  if (Firebase.pushTimestamp(fbdo, path + "/timestamps"))
  {
    Serial.println("Time stamp pushed");
  }

  fbdo.clear();
}

void loop(){}
