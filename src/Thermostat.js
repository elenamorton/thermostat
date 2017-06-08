'use strict';

function Thermostat() {
    this.powerSavingModeOn        = false;
    this.MINIMUM_TEMPERATURE      = 10;
    this.MAX_TEMPERATURE_PSM_ON   = 25;
    this.MAX_TEMPERATURE_PSM_OFF  = 32;
    this.DEFAULT_TEMPERATURE      = 20;
    this.temperature              = this.DEFAULT_TEMPERATURE;
}

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.setCurrentTemperature = function(temp) {
  this.temperature = temp;
    console.log(this.temperature);
};

Thermostat.prototype.upTemperature = function () {
  if (this.isMaximumTemperature()) {
    return;
  }
  this.temperature += 1;
};

Thermostat.prototype.downTemperature = function () {
  if (this.isMinimumTemperature()) {
    return;
  }
  this.temperature -= 1;
};

Thermostat.prototype.isMinimumTemperature = function () {
  return this.temperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.turnPowerSavingOn = function () {
  this.powerSavingModeOn = true;
};

Thermostat.prototype.turnPowerSavingOff = function () {
  this.powerSavingModeOn = false;
};

Thermostat.prototype.isMaximumTemperature = function () {
  if (this.powerSavingModeOn) {
      return this.temperature === this.MAX_TEMPERATURE_PSM_ON;
  }
  return this.temperature === this.MAX_TEMPERATURE_PSM_OFF;
};

Thermostat.prototype.reset = function () {
  this.temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.getCurrentEnergyUsage = function() {
    if (this.temperature < 18) {
        return "low";
        }
    if (this.temperature > 25) {
        return "high";
    }
    return "medium";
};
