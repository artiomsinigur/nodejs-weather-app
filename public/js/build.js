const form = document.querySelector('form');
const content = document.getElementById('content');
const todayForecast = document.getElementById('todayForecast');
const getDaily = document.getElementById('daily');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputLocation = form.search.value;

    // Text decorative, just to show that data is loading
    createElm(content, 'p', 'Loading...');

    fetch('/weather?address=' + inputLocation)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                createElm(content, 'p', data.error);
                return;
            }

            renderToday(data);
            renderDaily(data);

            if (content.hasChildNodes()) {
                content.firstChild.remove();
            }
        });
});


/**
 * Create new forecast for today 
 * @param {Objects} param
 */
function renderToday({location, currently, today}) {
    todayForecast.innerHTML = '';
    const html = `
        <div class="card shadow-sm mb-2">
            <div class="card-body">
                <div class="row">
                    <div class="col-4">
                        <h2 class="forecast-place">${location}</h2>
                        <div class="forecast-today">
                            <h3 class="forecast-today-title">Today</h3>
                            <p class="forecast-today-temperature">${Math.ceil(today.temperature)}<sup>°C</sup></p>
                            <span class="forecast-today-min">Min: <strong>${Math.ceil(today.temperatureMin)}</strong></span>
                            <span class="forecast-today-max">Max: <strong>${Math.ceil(today.temperatureMax)}</strong></span>
                            <p class="forecast-today-summary">${today.summary}</p>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="forecast-now text-center">
                            <div class="forecast-img">
                                <img class="forecast-icon" src="../img/icons/${today.icon}.png" alt="">
                            </div>
                            <h3 class="forecast-now-title">Right now</h3>
                            <p class="forecast-now-precip">POP <strong>${currently.precipProbability}</strong></p>
                            <p class="forecast-now-summary">${currently.summary}</p>
                            <p class="forecast-now-temperature">${Math.ceil(currently.temperature)}<sup>°C</sup></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    todayForecast.insertAdjacentHTML('afterbegin', html);
}


/**
 * Create new card for every day 
 * @param {Array of days} param 
 */
function renderDaily({daily}) {
    // Delete all child if exists
    while (getDaily.firstChild) {
        getDaily.removeChild(getDaily.firstChild);
    }

    const weekdays = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
    
    // for (const day of daily) {
    daily.forEach((day, i) => {
        let html = `
            <div class="card shadow-sm mb-1">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h4 class="daily-title">${weekdays[i]}</h4>
                            <span class="daily-summary">${day.summary}</span>
                        </div>
                        <div class="col-2">
                            <img class="daily-icon" src="../img/icons/${day.icon}.png">
                        </div>
                        <div class="col-2">
                            <span class="daily-temperature">${Math.ceil(day.temperature)}<sup>°C</sup></span>
                        </div>
                    </div>
                </div>
            </div><!-- /end card -->
        `;
        getDaily.insertAdjacentHTML('beforeend', html);
    });
}


/**
 * Create an node with given data
 * @param {parent element} existingNode
 * @param {type of node} newNode 
 * @param {one or more text node} text 
 */
function createElm(existingNode, newNode, ...text) {
    if (existingNode.hasChildNodes()) {
        while (existingNode.firstChild) {
            existingNode.removeChild(existingNode.firstChild);
        }
    }

    text.forEach(textNode => {
        const tag = document.createElement(newNode);
        tag.textContent = textNode;
        existingNode.appendChild(tag);
        // existingNode.insertAdjacentElement('afterbegin', tag);
    });
}