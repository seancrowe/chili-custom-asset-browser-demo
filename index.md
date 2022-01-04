# Asset Browser Demo

[chili-custom-asset-browser-demo](https://github.com/seancrowe/chili-custom-asset-browser-demo) is demo of a custom asset browser. It is not production ready, but it is a good example of using our JavaScript API to interact with CHILI. 

<img src="./assets/fontPage.png"/>

## 🤔 Who Is This For
This demo was created specifically for a client to show how JavaScript could be integrated into documents to create custom UI elements. Gernalically, this project can be seen as a learning tool for all users of CHILI pubisher to learn how to integrate with the editor.

This is **not** a production ready project. It is a demo, POC, example, a learning tool.

For example, this project was built in React, but in this scenario, using React for one UI element is a bit too heavy. What you would really want to do is build this in native JavaScript. However, being a demo, using React allowed me to easily implement premade compenents from [Ant Design](https://ant.design/). This saved me lots of time at the cost of 600+ KB of file size.

Again, this is a tech demo under time constraints, and thus you will find some common sense features missing. For example, there is no close button. To close the custom asset browser you must select and image. If you choose not to select an image, well unless you use the console to change the global variable VARNAME, there is no other way to close the asset browser.

## 🛠 Project Support
It may be obvious, but incase it is not, support for this project will be limited. While there may be minor updates, especially ones reported around bugs. This project is considered to be done. If you would like to see new features, then please feel free to fork and either privately add them or make a pull request.

If you find a bug, please open up an issue on the github page: [chili-custom-asset-browser-demo](https://github.com/seancrowe/chili-custom-asset-browser-demo). You can make a feature request, I cannot stop you, but expect it to not be picked up.

Some bugs may be related to the integration or certain behaviors in CHILI. For example, the call ResourceGetTreeLevel will typically cause issues when requested on folder paths that have a large number of files. These type of bugs or issues are outside of my interest to support even if techniqies could be used to mitigate the problem.

In addition, this project was built to work with CHILI publish Online (as of 2021). Trying to run this on an older version of CHILI could cause unforseen issues.

## 🥏 How To Use This Project
The goal is test the project in your BackOffice while following the guide in the documentation.

#### Section 1: Testing
- 1.1 Create your document

- 1.2 Add the JavaScript

- 1.3 Launch the customer browser

#### Section 2: The Code
- 2.1 Understanding the index.js

- 2.2 Understanding App.jsx

- 2.3 Understanding FileBroweser component

- 2.4 Understanding the AssetViewer component
