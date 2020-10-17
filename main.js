/**
 * As usual, when a project is complete I like to throw my own spin onto it.
 * Everything I've added:
 * 
 * Buttons
 *    + Add Contact button now changes colors and icon on toggle
 *    + Sorting buttons
 *      ~ Sort by type
 *      ~ Change sorting direction
 *    + Buttons now make sounds
 *    + Submit button and directional sort button have different sounds
 * 
 * New Contact
 *    ~ Moved emergency contact button to left; text is now next to button
 *    + Added ability to choose the color of the contact card.
 *      ~ Emergency contact overrides the color
 * 
 * Contacts
 *    + Contact array now holds new value: color
 *    + Contact cards have different colors
 * 
 * LocalStorage
 *    + Holds value of directional sorting preference
 *    + Holds value of sorting preference
 * 
 */

//#region MAIN REQUIREMENTS

let contacts = []
let contactAdd = false

// Adds a new contact using the form data
function addContact(event) {
  event.preventDefault();
  let results = event.target

  let newContact = {
    id: generateId(),
    name: results.name.value,
    phone: results.phone.value,
    ec: results.eContact.checked,
    // If emergency contact is checked, set color to empty string
    color: results.eContact.checked ? '' : results.color.value
  }

  document.getElementById("color-div").classList.remove("hidden")

  contacts.push(newContact)
  console.log(newContact)
  saveContacts()
  results.reset()
  submitClick()
}

// Saves contacts to localStorage
function saveContacts() {
  window.localStorage.setItem('contacts', JSON.stringify(contacts))
  drawContacts()
}

// Retrieves contact array from localStorage
function loadContacts() {
  let storedContacts = JSON.parse(window.localStorage.getItem('contacts'))
  if (storedContacts) {
    contacts = storedContacts
  }
}

// Draws the contacts onto the page
function drawContacts() {
  let template = ""

  /**
   * My personal customizations:
   *    + Added a section to hold the contact color ID
   *    + Added a double-filter to check if the sort type is emergency contact.
   *      ~ If so, ONLY draw emergency contacts. If not, draw everything.
   */
  contacts.forEach(function (contact) {

    template += (sortType != "ec") ?
      `<div class="card mt-1 mb-1 ${contact.ec ? 'emergency-contact' : ''} color-${contact.color}">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.phone}</span>
          </p>
          <i onclick="removeContact('${contact.id}')" class="action fa fa-trash text-danger"></i>
        </div>
      </div>`
      : contact.ec ?
        `<div class="card mt-1 mb-1 ${contact.ec ? 'emergency-contact' : ''} color-${contact.color}">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.phone}</span>
          </p>
          <i onclick="removeContact('${contact.id}')" class="action fa fa-trash text-danger"></i>
        </div>
      </div>`
        : ''
      ;
    ;


  })

  document.getElementById("contact-list").innerHTML = template;
  console.log(contacts)

}

// Remove selected contact
function removeContact(contactId) {
  let deletedContact = contacts.findIndex((contact) => { return contact.id == contactId })
  // After researching the different ways to alter an array, I deducted that splice was the smartest route due to .delete leaving a null value in the array
  contacts.splice(deletedContact, 1)
  saveContacts()
  deleteClick()
}

// Toggles "add contact" section and button
function toggleAddContactForm() {
  let root = document.documentElement;

  let newContact = document.getElementById("new-contact-form")
  let plusMinus = document.getElementById("plus-minus")

  if (contactAdd) {
    contactAdd = false

    newContact.classList.add("hidden")
    plusMinus.classList.remove("fa-minus-circle")
    plusMinus.classList.add("fa-plus-circle")
    root.style.setProperty("--fab-color", "#0084ff");
    root.style.setProperty("--fab-color-light", "#2392fa");
  } else {
    contactAdd = true

    newContact.classList.remove("hidden")
    plusMinus.classList.remove("fa-plus-circle")
    plusMinus.classList.add("fa-minus-circle")
    root.style.setProperty("--fab-color", "red");
    root.style.setProperty("--fab-color-light", "#fa4141");
  }

  buttonClick()
}

// Generates ID for mock database, but also used in deletion of a contact.
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

//#endregion

//#region MAJOR ADDITIONS

// Variables for sorting items, retrieved from localStorage
let sortType = window.localStorage.getItem("sortType");
let sortDirection = window.localStorage.getItem("sortDirection");

// If sorting variables have no value, go to defaults
if (sortType == null) {
  sortType = "name"
}
if (sortDirection == null) {
  sortDirection = "down"
}

// Sound for button
function buttonClick() {//@ts-ignore
  document.getElementById("click").play()
}

// Sound for submit
function submitClick() {//@ts-ignore
  document.getElementById("submit-click").play()
}

// Sound for submit
function deleteClick() {//@ts-ignore
  document.getElementById("delete-click").play()
}

// Event triggered by checking "emergency contact."
function toggleColor(event) {
  if (event.target.checked) {
    document.getElementById("color-div").classList.add("hidden")
  } else {
    document.getElementById("color-div").classList.remove("hidden")
  }
  // There is no need to remove the "color" section because emergency contact already overrides colors in addContact()
}


// Toggle direction
function toggleDirection() {
  if (sortDirection == "down") {
    sortDirection = "up"
  } else {
    sortDirection = "down"
  }

  window.localStorage.setItem("sortDirection", sortDirection)
  sortContacts(sortType)

  submitClick()
}

// Toggle sorting type
function toggleSort() {

  if (sortType == "name") {
    sortType = "color"
  } else if (sortType == "color") {
    sortType = "ec"
  } else {
    sortType = "name"
  }

  window.localStorage.setItem("sortType", sortType)
  sortContacts(sortType)

  buttonClick()
}

// Sort contacts
function sortContacts(sortType) {
  let buttonType = document.getElementById("sort-type")
  let buttonDirection = document.getElementById("sort-direction")

  // Sort by type
  if (sortType == "name") {
    // Type icon
    buttonType.className = "fa fa-user"
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      // Sort by direction
      (sortDirection == "up") ? comparison = comparison * -1 : '';
      return comparison;
    }
  } else if (sortType == "color") {
    // Type icon
    buttonType.className = "fa fa-paint-brush"
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const colorA = a.color.toUpperCase();
      const colorB = b.color.toUpperCase();

      let comparison = 0;
      if (colorA > colorB) {
        comparison = 1;
      } else if (colorA < colorB) {
        comparison = -1;
      }
      // Sort by direction
      (sortDirection == "up") ? comparison = comparison * -1 : '';
      return comparison;
    }
  } else {
    // Type icon
    buttonType.className = "fa fa-ambulance"
    function compare(a, b) {
      const eA = a.ec
      const eB = b.ec

      let comparison = 0;
      if (a.ec > b.ec) {
        comparison = 1;
      } else if (a.ec < b.ec) {
        comparison = -1;
      }

      return comparison;
    }
  }

  // Change button direction
  buttonDirection.className = (sortDirection == "up") ? "fa fa-sort-amount-asc" : "fa fa-sort-amount-desc";

  contacts.sort(compare)
  console.log("sorting " + sortDirection + " by " + sortType)
  drawContacts()
}

// Set invisible form input "color" to selected color
function setColor(color) {//@ts-ignore
  document.getElementById("color").value = color
  console.log(color)
  buttonClick()
}

//#endregion

loadContacts()
sortContacts(sortType)

/**
 * What I learned/reviewed through research and reinforced by customizing the project:
 *
 *    - How to create and altercate an object-filled array
 *    - How to save and load an object-filled array from local storage by properly using the JSON functions
 *    - How to read and use conditional operators
 *    - How to input data into the function when calling it
 *    - How to retrieve data placed into the function
 *    - How to sort through each array's value
 *    - How to retrieve form data using the .target method
 *
 */