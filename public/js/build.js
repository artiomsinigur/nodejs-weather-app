console.log('Client side JS file is loaded!');

const form = document.querySelector('form');
const content = document.getElementById('content');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputLocation = form.search.value;

    // Text decorative, just to show that data is loading
    createElm(content, 'p', 'Loading...');

    fetch('http://localhost:3000/weather?address=' + inputLocation)
        .then((response) => {
            return response.json();
        })
        .then(({location, forecast, error}) => {
            if (error) {
                createElm(content, 'p', error);
            } else {
                createElm(content, 'p', location, forecast);
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