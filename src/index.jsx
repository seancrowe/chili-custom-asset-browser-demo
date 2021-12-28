import {StrictMode} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loadCss from "./loadCss";
import {getChiliDetails, getChiliObject} from "./getChili";

const imageUploaderContainerDiv = document.createElement("div");
imageUploaderContainerDiv.id = "image-uploader-container-div";
document.getElementsByTagName("body")[0].appendChild(imageUploaderContainerDiv);

loadCss();
const editorObject = getChiliObject();
const {url, apiKey, environment} = getChiliDetails();

console.log(url);
console.log(apiKey);
console.log(environment);

const rootElement = document.getElementById("image-uploader-container-div");
ReactDOM.render(
  <StrictMode>
    <App
      apiKey={apiKey}
      chiliUrl={url}
      environment={environment}
      editorObject={editorObject}
    />
  </StrictMode>,
  rootElement
);
