/**
 * Global variables
 */
// get input area from DOM
const inputArea = document.getElementById('input-area');

// get 'Start Writing' button from DOM
const startBtn = document.getElementById('start-btn');

// initialize variable to hold 'Drag' object
let dragObject;

// temporary storage for errors
let errLog = [];

/**
 * Event Listeners
 */
// add 'mouseup' event listener to document
inputArea.addEventListener('mouseleave', inputAreaMouseLeaveHandler);

// add 'mouseup' event listener to window to listen for the end to a 'drag' action
window.addEventListener('mouseup', mouseUpHandler);

// add 'click' event listener to 'Start Writing' button
startBtn.addEventListener('click', startBtnHandler);

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
// startBtn event handler
function startBtnHandler() {
    
    // toggle text of button depending on current state
    if(startBtn.innerText === "Start Writing") {

        // insert input boxes to input area
        insertInputBoxes();
        startBtn.innerText = "Stop Writing";

    } else if (startBtn.innerText === "Stop Writing") {

        // remove input boxes from input area
        removeInputBoxes();
        startBtn.innerText = "Start Writing";

    } else {
        // push error to error log
        errLogPush("An error occurred, please refresh the page");
    }
}

// function to handle 'mouse down' events
function mouseDownHandler(e) {
    // prevent default behaviour on 'mouse down' event
    e.preventDefault();

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

        // change colour of current-div
        (e.target).style.backgroundColor = "black";
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
// function to remove input boxes
function removeInputBoxes() {
    // check presence of input boxes
    let elements = document.querySelectorAll('.input-box');

    // iterate over each element and remove it from DOM
    if (elements.length > 0) {
        elements.forEach(element => {
            element.remove();
        });
    }
}

// function to push errors to error log
function errLogPush(msg) {
    errLog.push(msg);
}

// function to change text of an element
function changeText(element, newText) {
    element.textContent = newText;
}

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