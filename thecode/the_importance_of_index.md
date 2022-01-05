# 2.1 The Importance of index.js
You will find index.js inside the src folder. This file is the setup file, where all the magic happens to get things to work.

Ignoring the *imports* there entire code can be seen below
```javascript
const imageUploaderContainerDiv = document.createElement("div");  
imageUploaderContainerDiv.id = "image-uploader-container-div";  
document.getElementsByTagName("body")[0].appendChild(imageUploaderContainerDiv);  
  
loadCss();  
const editorObject = getChiliObject();  
const {url, apiKey, environment} = getChiliDetails();   
  
const rootElement = document.getElementById("image-uploader-container-div");  
ReactDOM.render(  
 <StrictMode>  
 <App  
  apiKey={apiKey}  
 chiliUrl={url}  
 environment={environment}  
 editorObject={editorObject}  
 /> </StrictMode>,  
  rootElement  
);
```

Not a lot of code. There are basically 5 parts to this code:
- div creation
- loadCss function
- getChiliObject function
- getChiliDetails function
- render the App component

## div creation
```javascript
const imageUploaderContainerDiv = document.createElement("div");  
imageUploaderContainerDiv.id = "image-uploader-container-div";  
document.getElementsByTagName("body")[0].appendChild(imageUploaderContainerDiv); 
```
While we could render our React component on the body, a better method is to create a div and render the React component on that div. This is exactly what the above code does. Nothing super special to note, except that we give div an id, so we can reference easily in the future.

## loadCss function
The function call ``loadCss()`` loads a subset of the [Ant Design](https://ant.design/) CSS used for their models. It also loads some CSS used for our loading spinner.

Because our solution is purely JavaScript, we need to load the CSS with JavaScript. You will also notice that many of the React components have styles inlined or use [styled-components](https://www.npmjs.com/package/styled-components).

In a production setup (or as a general improvement), you would want to switch to loading the CSS via one way, instead of the three in this project. However, to make things simple to implement [Ant Design](https://ant.design/) styling on their components, this function exists.

## getChiliObject function
```javascript
const editorObject = getChiliObject();  
```
This function is rather simple, it just gets the editorObject object that is added by the CHILI editor and stores it in a local variable.

Stepping into the function you get this very simple code:
```javascript
if (editorObject != null) {  
  return editorObject;  
}  
  
return window.editorObject;
```
Not much to say, but that this function assumes you are running it in the CHILI editor window.

## getChiliDetails function
```javascript
const {url, apiKey, environment} = getChiliDetails();
```
If this demo breaks in your integration, this is function is probably the culprit. What this method does is it reads the URL of the window (again assuming it is being rain in the CHILI editor window) and pulls out the base URL, API key and environment.

If your integration does not use a simple subdomain CNAME, then this function will probably fail to get the right base URL. In which case, you will need to modify this function to support your specific uses case.

If your integration does not pass the API key in the URL, then this function will fail to get the API key. You will need modify this function to get the API key in another way. You could pass the API key to the iframe, but a better solution is to find it in the window.CHILI_EditorData object.

(The window.CHILI_EditorData is added to the window by the CHILI editor on each CHILI instance. It is unofficial, so it could potentially be removed at anytime.)

## render the App component
```javascript
const rootElement = document.getElementById("image-uploader-container-div");  
ReactDOM.render(  
 <StrictMode>  
 <App  
  apiKey={apiKey}  
 chiliUrl={url}  
 environment={environment}  
 editorObject={editorObject}  
 /> </StrictMode>,  
  rootElement  
);
```
Here we mount and render the React component. In retrospect, it seems silly to call getElementById when we have the element referenced earlier in the code. Really needs a ✅ TODO to simplify that.

However, the important part is that we pass all the values from getChiliObject and getChiliDetails functions into the App component.

### [Next up 2.2 Looking at App.jsx](https://seancrowe.github.io/chili-custom-asset-browser-demo/thecode/looking_at_app.md)