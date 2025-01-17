/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes', 'no', or 'search traits'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple /////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            let personSpouse = findSpouse(person[0], people);
            let personSibling = findSiblings(person[0], people)
            displayRelation(personFamily);
            displaySpouseRelation(personSpouse);
            displaySiblingRelation(personSibling);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            displayPeople(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `Descendants: ${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`
    personInfo += `dob: ${person.dob}\n`
    personInfo += `Height: ${person.height}\n`
    personInfo += `Weight: ${person.weight}\n`
    personInfo += `Eye Color: ${person.eyeColor}\n`
    personInfo += `Occupation: ${person.occupation}\n`
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no" || input.toLocaleLowerCase() === "";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonFamily(one, all){
    let parents = all.filter(function(el){
        if (one.parents[0] === el.id || one.parents[1] === el.id) {
            return true
        }else {
            return false
        }
    })
    return parents
}

function displayRelation(person) {
    let parentRelation = `Parent 1: ${person[0].firstName} ${person[0].lastName}\nParent 2: ${person[1].firstName} ${person[1].lastName}`;
    alert(parentRelation);
}

function findSpouse(one, all) {
    let spouse = all.filter(function(el){
        if (one.currentSpouse === el.id) {
            return true
        } else {
            return false
        }
    })
    return spouse
}

function displaySpouseRelation(person){
    let spouseRelation = `Spouse: ${person[0].firstName} ${person[0].lastName}`;
    alert(spouseRelation);
}

function findSiblings(one, all){
    let sibling = all.filter(function(el){
        if (one.parents[0] === el.parents[0] && one.parents[1] === el.parents[1]){
            return true
        } else {
            return false
        }
    })
    return sibling
}

function displaySiblingRelation(person) {
    let siblingRelation = `Sibling(s): ${person[0].firstName} ${person[0].lastName}\n${person[1].firstName} ${person[1].lastName}\n${person[2].firstName} ${person[2].lastName}`
    alert(siblingRelation)
}

function findPersonDescendants(one, all){
    let descendants = all.filter(function(el){
        if (el.parents.includes(one.id)){
            return true
        } else {
            return false
        }
    })
    return descendants
}

function displayDescendants(person){
    let descendantRelation = `Descendant(s): ${person[0].firstName} ${person[0].lastName}\n${person[1].firstName} ${person[1].lastName}\n${person[2].firstName} ${person[2].lastName}`
    alert(descendantRelation)
}

function searchByTraits(){
    let searchType = promptFor(
        "Do you want to search by 'multiple traits' up to 5, or by a 'singular trait?' (Id, First Name, Last Name, Date of Birth, Gender, height, weight, Eye Color, Occupation)",
        yesNo
    ).toLowerCase();
    let searchResults;
    switch(searchType) {
        case "multiple traits":
            break;

        case "single trait":
            searchResults = searchBySingleTrait(people);
            break;
    }
}

function searchBySingleTrait(people){
    let userInput = promptFor("What trait do you want to search by?", chars)
    let userProperty = promptFor("What property do you know?", chars)
    let foundPeople = people.filter(function(person){
        if (person[userInput] === userProperty){
            return true
        }
    })
}
