/**
 * Global variables
 */
// get input area from DOM
const inputArea = document.getElementById('input-area');
// initialize variable to hold 'Drag' object
let dragObject;
// temporary storage for errors
let errLog = [];
// add 'mouseup' event listener to document
inputArea.addEventListener('mouseleave', inputAreaMouseLeaveHandler);
// variable to store ids of divs on which text to be recognized is drawn over
let divIds = [];

/**
 * Classes
 */
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

/**
 * Drag class
 */

class Drag {
    constructor() {
        this.isDragging;
        this.divIds = [];
    }

    /**
     * setter for 'isDragging' property
     * @param {boolean} value
     */
    set setIsDragging(value) {

        // constrain 'value' parameter to a boolean
        if(value === true || value === false) {
            this.isDragging = value;
        } 
    }

    /**
     * @param {number} value
     */
    set setDivIds(value) {
        // constrain 'value' parameter to a number
        if(!isNaN(value)) {
            this.divIds.push(value);
        }
    }

    // return 'divIds' property
    get getDivIds() {
        return this.divIds;
    }
}

/**
 * Event handler functions
 */
// function to handle 'mouse down' events
function mouseDownHandler() {
    // create 'dragObject' object from 'Drag' class
    dragObject = new Drag();

    // set 'isDragging' property to 'true'
    dragObject.setIsDragging = true;
}

// function to handle 'mouse move' events
function mouseMoveHandler(e) {
    if(dragObject && dragObject.isDragging) {
        // push current div to 'divIds' property of 'dragObject' object
        dragObject.setDivIds = parseInt(e.target.id);
    }
}

// function to handle 'mouse up' events
function mouseUpHandler() {
    if(dragObject) {
    // store 'divIds' property in 'divIds' global variable
    divIds = dragObject.getDivIds;

    // reset 'dragObject' variable
        dragObject = null;
    }
}

// function to handle 'mouse leave' event over the 'inputArea' div
function inputAreaMouseLeaveHandler() {
    if(dragObject) {
    // store 'divIds' property in 'divIds' global variable
    divIds = dragObject.getDivIds;

    // reset 'dragObject' variable
        dragObject = null;
    }
}

/**
 * Other functions
 */
// function to insert smaller divs (input boxes) to the inputArea div
function insertInputBoxes() {

    /**
     * loop to insert input boxes
     * number of input boxes - 14400
     */
    for(let i = 1; i <= 14400; i++) {
        // create object from element class
        let elementObject = new Element("div", i, ["input-box"], {widthattrib: "5px", heightattrib: "5px"}, {mousedown: mouseDownHandler, mousemove: mouseMoveHandler});

        // call create() method to create element
        let element = elementObject.create();

        // append new element to input area div
        inputArea.appendChild(element);
    }
}