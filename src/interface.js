$(document).ready(function(){
  var LOCAL_URL = 'http://localhost:9292';
  var thermostat = new Thermostat();
    
  getMyThermostat();
  updateTemperature();
  //displayWeather("London");
  getMyCity();

  $('#temperature-up').on('click', function() {
    thermostat.upTemperature();
    setMyThermostat();
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
    
  $('#current-city').change(function() {
    var city = $('#current-city').val();
    displayWeather(city);
  });

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class',    thermostat.getCurrentEnergyUsage());
  }
 
  function getMyCity() {
    var url = LOCAL_URL + '/city';
    $.get(url, function(data) {
      var city = JSON.parse(data);
      console.log(city);
      $('#current-city').val(city);
      $('#current-city option:contains(' + city + ')').prop({selected: true});
          
      displayWeather(city);
    }); 
  }
    
  function getMyThermostat() {
    var url = LOCAL_URL + '/temperature';
    $.get(url, function(data) {
      var data = JSON.parse(data);
      thermostat.setCurrentTemperature(data);
      updateTemperature();
    }); 
  }

  function setMyThermostat() {
    data = thermostat.temperature;
    $.post(LOCAL_URL + '/temperature', { temp: data } );
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
