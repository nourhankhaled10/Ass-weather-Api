let searchInput =document.getElementById("search");


let todayName = document.getElementById("today-data-day-name");
let todayNumber = document.getElementById("today-data-day-number");
let todayMonth= document.getElementById("today-data-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditonImg = document.getElementById("today-conditon-img");
let todayConditonText = document.getElementById("today-conditon-text");
let percentag =document.getElementById("percentage");
let wind =document.getElementById("wind");


let nextDayName = document.getElementsByClassName("next_day_name");
let nextConditonImg = document.getElementsByClassName("next-condition-img");
let nextConditonText = document.getElementsByClassName("next-condition-text");
let nextMaxTemp =document.getElementsByClassName("next-max-temp");
let nextMinTemp =document.getElementsByClassName("next-min-temp");





 async function getWeatherData (cityName)
 {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fc5cfae954004d9992544254241901&q=${cityName}&days=3`);
    let weatherData = await weatherResponse.json();
 return weatherData ;
}
getWeatherData()


function displayTodayData(data){

  let todayDate = new Date();
todayName.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"})
todayNumber.innerHTML=todayDate.getDate()
todayMonth.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
todayLocation.innerHTML =data.location.name;
todayTemp.innerHTML=data.current.temp_c;
todayConditonImg.setAttribute("src",data.current.condition.icon);
todayConditonText.innerHTML=data.current.condition.text;
percentag.innerHTML=data.current.humidity+"%"
wind.innerHTML=data.current.wind_dir;
}

function displayNextData(data){
    let forecastData =data.forecast.forecastday;
    for( let i = 0 ; i < 2 ; i++) 
    {
      let nextDate= new Date(forecastData[i+1].date)
      nextDayName[i].innerHTML=nextDate.toLocaleDateString("en-US",{weekday:"long"})

     nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
       nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
      nextConditonImg[i].setAttribute("src" , forecastData[i+1].day.condition.icon)
      nextConditonText[i].innerHTML = forecastData[i+1].day.condition.text;
    }
}



async function startApp(city="cairo"){
    let weatherData = await getWeatherData (city)
    if(!weatherData.error){
      displayTodayData(weatherData)
      displayNextData(weatherData)
    }


}
startApp()

searchInput.addEventListener("input",function(){
 startApp(searchInput.value)
})