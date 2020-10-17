My Contact List
===============

![contact-mock](resources/mock.png)

### Goals
In this app you will build a contact list management tool. This app will allow users to add and remove contacts from their list and mark some contacts as Emergency Contacts. 

### The Setup
The basic design and layout for this app has been mocked out and the names of the JavaScript functions have all been created. As the developer you will need to work accross HTML, CSS and JavaScript to complete the requirements. In the code you will see several comments intended to be used as help and guidelines on what needs to be accomplished. Once you have achieved the requirements of the app use GitHub to host the page live.

### Requirements

#### Visualization
- The add contact form can be shown or hidden when necessary
- Contacts marked as Emergency Contact must be easily distiguished
- A custom Google Font must be added
- Contacts are visible when the page reloads

#### Functionality 
- Add Contact form clears when submitted
- Add Contact form submission does not reload the page 
- Contacts are stored in local storage. 
- Contacts can be deleted


### Step by Step Guide

1. Add The extra input fields for `phone` and `emergency-contact` to the add Contact Form
  - use type checkbox for Emergency Contact
  - Don't forget the name Attribute
1. Handle the form submission
  - Prevent the page from reloading when submitting the form
  - Pull the form data to get a new contact and give that contact an id
  - Add the new contact to the contacts list
  - Reset the form
  - Save the contacts list
  - Draw the contacts list
1. Handle Page Refresh
  - Load the contacts list
  - Draw the contacts list
1. Show and Hide Form on button clicks