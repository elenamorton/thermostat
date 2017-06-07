$(document).ready(function(){
  var thermostat = new Thermostat();
  updateTemperature();

  $('#temperature-up').on('click', function() {
    thermostat.upTemperature();
    updateTemperature();
  });

  $('#temperature-down').on('click', function() {
    thermostat.downTemperature();
    updateTemperature();
  });

  $('#temperature-reset').on('click', function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#powersaving-on').on('click', function() {
    thermostat.turnPowerSavingOn();
    updateTemperature();
  });

  $('#powersaving-off').on('click', function() {
    thermostat.turnPowerSavingOff();
    updateTemperature();
  });

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  $('#current-temperature').text(data.main.temp);
})
    
  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.getCurrentEnergyUsage());
  }


});
