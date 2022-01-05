# 1.2 Add The Javascript
## Button Variable Actions
So as we saw from [1.1 Create Your Document](https://seancrowe.github.io/chili-custom-asset-browser-demo/testing/create_your_document) we need to create button variables for each image variable. Those button variables will have at least two buttons: and add button and a remove button.

We can add an action to each button and inside the action we can add JavaScript by using the execute command.
<img src="./assets/editor_javascript.png" />

For the add button, which in 1.1 we called Set Front Image, we want our JavaScript to open the asset browser. We do this by calling the launchCustomAssetBrowser method.
```javascript
window.launchCustomAssetBrowser("Front Image");
```
For the remove button, which in 1.1 we called Remove, we just use plan CHILI JavaScript
```javascript
editorObject.SetProperty("document.variables[Front Image]", "imgXML", "");
```
In both cases, we provide the name of the image variable that we want to modify.

## Loading Demo's JavaScript
However, if you test things out now, ``window.launchCustomAssetBrowser()`` will not work and cause an error. That is because the function does not exist. We never loaded the demo's JavaScript.

We need to load the JavaScript for the entire demo before the document loads. I strongly suggest doing this in your integration. However, you would need to add the script to the window of the iframe.

📃**Note:**
*Because the demo makes REST calls directly to CHILI, the code must run inside the iframe. If you want to run this code outside the iframe, you would need to use middleware to shuttle the calls from frontend -> middleware -> CHILI. The reason is CORS. CHILI publish Online only accepts calls from the exact same origin.*

A much easier, but more tedious method is to add the JavaScript in a document event action on DocumentFullyLoaded or DocumentFullyRendered.
<img src="./assets/editor_documentEvents.png" />

You can load the full JavaScript of the custom asset browser with an execute action, but I strongly suggest storing the JavaScript externally. You can then load it by adding a ``<script>`` element to your iframe window like so:
```javascript
let tag = document.createElement("script");
tag.src = "https://demo.example.com/demoAssetBrowser.js";
document.getElementsByTagName("head")[0].appendChild(tag);
```

Loading the JavaScript externally has the benefit of being able to keep all your documents in sync during JavaScript updates. However, it has the complexity of working about CORS.

Overall you have three methods to the load the JavaScrip for the demo:
- within the integration
- in a document action using the entire script
- in a document action to create a ``<script>`` tag to load the JavaScript externally

### [Next up 1.3 Launch The Customer Browser](https://seancrowe.github.io/chili-custom-asset-browser-demo/testing/launch_the_customer_browser)