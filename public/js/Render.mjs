// Render type
export function Render(data, parentNode) { 
    this.location = data.location;
    this.currently = data.currently;
    this.today = data.today;
    this.parentNode = parentNode;

    this.daily = data.daily;
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}


/**
 * Create new forecast for today 
 * @param {Objects} param
 */
Render.prototype.getToday = function() {
    this.parentNode.innerHTML = '';
    const html = `
        <div class="card shadow-sm mb-2">
            <div class="card-body">
                <div class="row">
                    <div class="col-4">
                        <h2 class="forecast-place">${this.location}</h2>
                        <div class="forecast-today">
                            <h3 class="forecast-today-title">Today</h3>
                            <p class="forecast-today-temperature">${Math.ceil(this.today.temperature)}<sup>°C</sup></p>
                            <span class="forecast-today-min">Min: <strong>${Math.ceil(this.today.temperatureMin)}</strong></span>
                            <span class="forecast-today-max">Max: <strong>${Math.ceil(this.today.temperatureMax)}</strong></span>
                            <p class="forecast-today-summary">${this.today.summary}</p>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="forecast-now text-center">
                            <div class="forecast-img">
                                <img class="forecast-icon" src="../img/icons/${this.today.icon}.png" alt="">
                            </div>
                            <h3 class="forecast-now-title">Right now</h3>
                            <p class="forecast-now-precip">POP <strong>${this.currently.precipProbability}</strong></p>
                            <p class="forecast-now-summary">${this.currently.summary}</p>
                            <p class="forecast-now-temperature">${Math.ceil(this.currently.temperature)}<sup>°C</sup></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    this.parentNode.insertAdjacentHTML('afterbegin', html);
}


/**
 * Create new card for every day 
 * @param {Array of days} param 
 */
Render.prototype.getDays = function() {
    // Delete all child if exists
    while (this.parentNode.firstChild) {
        this.parentNode.removeChild(this.parentNode.firstChild);
    }
    
    // for (const day of daily) {
    this.daily.forEach((day, i) => {
        let html = `
            <div class="card shadow-sm mb-1">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h4 class="daily-title">${this.weekdays[i]}</h4>
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
        this.parentNode.insertAdjacentHTML('beforeend', html);
    });
}