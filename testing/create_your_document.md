# 1.1 Create Your Document
To test this custom asset browser, you need a document to test out. For the simplest use case, you just need a document with an image variable and an image frame tied to that variable.

You will want to create two variables:
- image variable (using CHILI DAM)
- button variable

In the below image I created two variables: Front Image as an image variable and the Front Image Button as a button variable.
<img src="./assets/editor_variables.png"/>

The Front Image image variable is tied to the frame in the document (see picture above).

With our button variable, we are going to add two buttons. One for making the custom asset browser pop-up and the second for hiding the asset browser.

For each button, we can add an action...
<img src="./assets/editor_variableButtonClick.png" />

and in each action, we can add JavaScript.
<img src="./assets/editor_javascript.png" />

If you have not figured it out already, for every image variable, you will need to set up a button variable. Typically, you will set the image variable visible as "false", as the customer will only be using the button.

For example, in the image below, we have two image variables in the document. Therefore, I created two button variables for each image variable that is used. Set the original image variable to not display.
<img src="./assets/editor_image_exampleVars.png" />


### [Next up 1.2 Add The Javascript](https://seancrowe.github.io/chili-custom-asset-browser-demo/testing/add_the_javascript)
