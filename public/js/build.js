const form = document.querySelector('form');
const content = document.getElementById('content');
const todayForecast = document.getElementById('todayForecast');
const getDaily = document.getElementById('daily');

import {Render} from './Render.mjs';

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

            const forecastToday = new Render(data, todayForecast);
            forecastToday.getToday();

            const forecastDaily = new Render(data, getDaily);
            forecastDaily.getDays();

            if (content.hasChildNodes()) {
                content.firstChild.remove();
            }
        });
});


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