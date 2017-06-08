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
    $('#power-saving-status').text('ON');  
    updateTemperature();
  });

  $('#powersaving-off').on('click', function() {
    thermostat.turnPowerSavingOff();
    $('#power-saving-status').text('OFF');  
    updateTemperature();
  });

  displayWeather("London");
    
  $('#current-city').change(function() {
    var city = $('#current-city').val();
    displayWeather(city);
  });


  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.getCurrentEnergyUsage());
  }
 
  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' ;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
      
    $.get(url + city + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);  
    });
  }
    
    
});
