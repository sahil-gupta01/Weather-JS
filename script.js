let target = "Agra";

// DOM code
const temperatureFiled = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateTimeField = document.querySelector(".date-time");
const conditionField = document.querySelector(".weather_condition span");
const iconField = document.querySelector(".weather_condition img");
const searchField = document.querySelector(".searchField");
const countryField = document.querySelector(".country");
const form = document.querySelector("form");

// api code
async function fetchWeaterInformation() {
    try {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=3caf06f1eecf4054b2d53017241609&q=${target}&aqi=yes`;
        const response = await fetch(apiUrl);
        // console.log(response);
        const data = await response.json();
        console.log(data);

        const currentTemp = data.current.temp_c;
        const currentCondition = data.current.condition.text;
        const locationName = data.location.name;
        const localTime = data.location.localtime;
        const conditionEmoji = data.current.condition.icon;
        const countryName = data.location.country;

        console.log(currentTemp, currentCondition, locationName, localTime, conditionEmoji, countryName);

        //update DOM to show value to user

        updateDOM(currentTemp, currentCondition, locationName, localTime, conditionEmoji, countryName);

        function updateDOM(currentTemp, currentCondition, locationName, localTime, conditionEmoji, country) {
            temperatureFiled.innerHTML = currentTemp + "° C";
            locationField.innerHTML = locationName;
            conditionField.innerHTML = currentCondition;
            dateTimeField.innerHTML = localTime;
            iconField.src = conditionEmoji;
            countryField.innerHTML = country;
            conditionField.setAttribute('style', "display:show");
            temperatureFiled.setAttribute('style', "display:show");
            countryField.setAttribute('style', "display:show");
        }

        form.addEventListener('submit', search);

        function search(event) {
            event.preventDefault();
            target = searchField.value;
            fetchWeaterInformation(target);
        }
    }
    catch (err) {
        locationField.innerHTML = "OOPS!"
        dateTimeField.innerHTML = "No location found";
        conditionField.setAttribute('style', "display:none");
        temperatureFiled.setAttribute('style', "display:none");
        countryField.setAttribute('style', "display:none");
        iconField.src = "https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png";
        iconField.setAttribute('height', '50px');
        console.log(err);
    }


}

fetchWeaterInformation(target);