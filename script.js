// get input area from DOM
const inputArea = document.getElementById('input-area');



// create input box element

/**
 * Element class
 * constructor params - element's tag, elment's id, element's classes
 */
class Element {
    constructor(tag, id = "", classes = [], secondaryAttribs = {}, eventListeners = {}) {
        this.tag = tag;
        this.id = id;
        this.classes = classes;
        this.element;
        this.secondaryAttribs = secondaryAttribs;
        this.eventListeners = eventListeners;
    }

    // method to create and return an element
    create() {
        this.element = document.createElement(this.tag);
        this.element.classList = this.classes;
        this.element.id = this.id;

        // add event listener
        Object.entries(this.eventListeners).forEach(([eventName, eventHandler]) => {
            this.element.addEventListener(eventName, eventHandler);
        });

        // add other attributes
        for(const values in this.secondaryAttribs) {
            if(this.secondaryAttribs.hasOwnProperty(values)) {
                this.element.setAttribute(`${values}`, `${this.secondaryAttribs[values]}`);
            }
        }

        return this.element;
    }

    
}

function clickHandler() {
    console.log("clicked");
}

// function to insert smaller divs (input boxes) to the inputArea div
function insertInputBoxes() {
    // let element = new Element("div", 1, ["input-box"]);
    // console.log(element.create());

    /**
     * loop to insert input boxes
     * number of input boxes - 14400
     */
    for(let i = 1; i <= 14400; i++) {
        // create object from element class
        let elementObject = new Element("div", i, ["input-box"], {widthattrib: "5px", heightattrib: "5px"}, {click: clickHandler});

        // call create() method to create element
        let element = elementObject.create();

        // append new element to input area div
        inputArea.appendChild(element);
    }
}