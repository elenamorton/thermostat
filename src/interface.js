$(document).ready(function(){
  var LOCAL_URL = 'http://localhost:9292/temperature';
  var thermostat = new Thermostat();
    
  getMyThermostat();
  updateTemperature();

  $('#temperature-up').on('click', function() {
    thermostat.upTemperature();
    setMyTemperature()
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
    $('#temperature').attr('class',    thermostat.getCurrentEnergyUsage());
  }
 
  function getMyThermostat() {
    var url = LOCAL_URL;
    $.get(url, function(data) {
      var data = JSON.parse(data);
      thermostat.setCurrentTemperature(data);
      updateTemperature();
    }); 
  }

  function setMyTemperature() {
    data = thermostat.temperature;
    $.post(LOCAL_URL, { temp: data } );
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
