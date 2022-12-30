const api = {
    key: "28fd15358cdecbc1a1dfef367e71acef",
    base: "https://api.openweathermap.org/data/2.5/"
};

let tmp = document.querySelector(".search")
function pars() 
{
	let val = tmp.value;
	console.log(val);
	console.log(val.split(' ').join('').length);
	return(val.split(' ').join('').length > 0 ? tmp : null);


}

const btn = document.querySelector(".btn");
let search = pars();

// event listener
btn .addEventListener("click", getInput);

function getInput(event) {
	event.preventDefault();
	let t1 = search;
	
    if (event.type === "click" && search) {
		console.log(t1);
        getData(t1);
    }
}


function getData(search) {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => response.json())
    .then(displayData)
    .catch(err => console.log(err));
}

function displayData(response) {
    console.log(response)

    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value = "";
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFucntion(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFucntion(d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()],
        date = d.getDate(),
        month = months[d.getMonth()],
        year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;    
}