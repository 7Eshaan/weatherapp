const searchbox = document.getElementById("searchbox");
const searchbtn = document.getElementById("searchbtn");
const weatherinfo = document.querySelector(".weatherinfo");
const city = document.getElementById("city");
const date = document.getElementById("date");
const weatheremoji = document.getElementById("weatheremoji");
const currenttemp = document.getElementById("currenttemp");
const weatherstatus = document.getElementById("weatherstatus");
const maxtemp = document.getElementById("maxtemp");
const mintemp = document.getElementById("mintemp");
const humidity = document.getElementById("humidityvalue");
const windspeed = document.getElementById("windspeedvalue");
const uvindex = document.getElementById("uvindexvalue");
const visibility = document.getElementById("visibilityvalue");
const appcontainer = document.querySelector(".appcontainer");


const cityinput = searchbox.value;

const apikey = "L6G94ZNQZHTBZ8BV88S94CJRY";

function handleInput(event){
    event.preventDefault();
    getweatherdata();
}

async function getweatherdata(){

    if(searchbox.value === ""){
        window.alert("Enter a City!");
        return;
    }

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchbox.value}?key=${apikey}`);
    const result = await response.json();

    document.getElementById("searchbox").value = "";

    city.textContent = result.resolvedAddress;
    date.textContent = result.days[0].datetime;
    currenttemp.textContent = `${Math.round((result.currentConditions.temp - 32) / (9/5))} ° C`;
    maxtemp.textContent = `Max: ${Math.round((result.days[0].tempmax - 32) * 5/9)}°C`;
    mintemp.textContent = `Min: ${Math.round((result.days[0].tempmin - 32) * 5/9)}°C`;
    humidity.textContent = `${result.currentConditions.humidity}%`;
    windspeed.textContent = `${Math.round(result.currentConditions.windspeed * 1.60934)} Km/h`;
    uvindex.textContent = result.currentConditions.uvindex;
    visibility.textContent = `${Math.round(result.currentConditions.visibility * 1.60934)} Km`;
    weatherstatus.textContent = result.currentConditions.conditions;

    let weatherstatuscheck = result.currentConditions.conditions;
    if(weatherstatuscheck == "Clear"){
        weatheremoji.textContent = "☀️";
    }
    else if(weatherstatuscheck == "Partially cloudy"){
        weatheremoji.textContent = "⛅";
    }
    else if(weatherstatuscheck == "Cloudy" || weatherstatuscheck == "Overcast"){
        weatheremoji.textContent = "☁️";
    }
    else if(weatherstatuscheck == "Rain"){
        weatheremoji.textContent = "🌧️";
    }
    else if(weatherstatuscheck == "Snow"){
        weatheremoji.textContent = "❄️";
    }
    else if(weatherstatuscheck == "Fog"){
        weatheremoji.textContent = "🌁";
    }
    else if(weatherstatuscheck == "Thunder"){
        weatheremoji.textContent = "⛈️";
    }

    // Special case

    if(weatherstatuscheck.includes("Overcast")){
        appcontainer.style.background = "linear-gradient(45deg, #5A6F8A, #3B4A66)";
        weatheremoji.textContent = "☁️";
    }


    switch(weatherstatuscheck){
        case "Clear":
            appcontainer.style.background = "linear-gradient(45deg, #fd79a8, #fdcb6e)";
            break;
        case "Fog":
            appcontainer.style.background = "linear-gradient(135deg, #b2bec3 0%, #636e72 50%, #ddd6fe 100%)";
            break;
        case "Snow":
            appcontainer.style.background = "linear-gradient(45deg, #dfe6e9, #a29bfe)";
            break;
        case "Cloudy":
            appcontainer.style.background = "linear-gradient(45deg, #616161, #9bc5c3)";
            break;
        case "Partially cloudy":
            appcontainer.style.background = "radial-gradient(circle at bottom, #4A90E2, #A3BFFA, #E6F0FA)";
            break;
        case "Overcast":
            appcontainer.style.background = "linear-gradient(45deg, #5A6F8A, #3B4A66)";
            break;
        case "Rain":
            appcontainer.style.background = "linear-gradient(45deg, #4682B4, #1E90FF, #4169E1)";
            break;
        case "Thunder":
            appcontainer.style.background = "linear-gradient(45deg, #2F4F4F, #483D8B, #6A5ACD)";
            break;
    }

    weatherinfo.style.display = "block";




}