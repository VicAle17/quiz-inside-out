#include <Arduino.h>
#include <String.h>

const int pinRosso = 3;
const int pinVerde = 5;
const int pinBlu = 6;

void setup() {
  Serial.begin(9600);
  pinMode(pinRosso, OUTPUT);
  pinMode(pinVerde, OUTPUT);
  pinMode(pinBlu, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    String personaggio = Serial.readStringUntil('\n');
    personaggio.trim();

    if (personaggio == "Gioia") {
      setColor(255, 255, 0); // Giallo
    } else if (personaggio == "Invidia") {
      setColor(0, 255, 255); // Verde Acqua
    } else if (personaggio == "Rabbia") {
      setColor(255, 0, 0); // Rosso
    } else if (personaggio == "Ansia") {
      setColor(255, 165, 0); // Arancione
    } else if (personaggio == "Disgusto") {
      setColor(0, 255, 0); // Verde
    } else if (personaggio == "Ennui") {
      setColor(128, 0, 128); // Viola
    } else if (personaggio == "Imbarazzo") {
      setColor(255, 192, 203); // Rosa
    } else if (personaggio == "Tristezza") {
      setColor(0, 0, 255); // Blu
    } else if (personaggio == "Paura") {
      setColor(230, 230, 250); // Lilla
    }
  }
}

void setColor(int rosso, int verde, int blu) {
  analogWrite(pinRosso, rosso);
  analogWrite(pinVerde, verde);
  analogWrite(pinBlu, blu);
}
