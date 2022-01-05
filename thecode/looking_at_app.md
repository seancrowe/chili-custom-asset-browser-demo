# 2.2 Looking at App.jsx
[App.jsx](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/App.jsx) is not a very complex. There are basically five things we should look at:
- assetViewPath
- variableName
- AssetBrowserWindow
- FolderBrowser
- AssetViewer

## assetViewPath
assetViewPath is a variable set using the [State Hook](https://reactjs.org/docs/hooks-state.html).
```javascript
const  [assetViewerPath, setAssetViewerPath]  =  useState("");
```
This variable is used to pass the path to the FolderBrowser and AssetViewer component.

At moment of writing this documentation, the assetViewerPath variable is set to the default top level directory. However, are plans to change the directory path based on the image variable (in the document) settings.

## variableName
variableName is a variable set using the [State Hook](https://reactjs.org/docs/hooks-state.html).
```javascript
const [variableName, setVariableName] = useState("");
```
This variable is used to determine if the App component should render any empty div (basically being invisible) or to render the AssetBrowserWindow component.
```javascript
if (variableName === "") {
	return <div/>;
} else {
	return (
	...
```
I also declare a global function which any other JavaScript can use to control the value of variableName.
```javascript
window.launchCustomAssetBrowser = (variableName) => {
	setVariableName(variableName);
};
```

This function is super important as is used in our buttons found in the document.
See [1.2 Add The Javascript](https://seancrowe.github.io/chili-custom-asset-browser-demo/testing/add_the_javascript.md)

## AssetBrowserWindow
This component is basically a component to hold divs used for layout and styling. It takes two parameters for the FolderBrowser and the AssetViewer components.

```jsx
<AssetBrowserWindow folderBrowser={} assetViewer={}/>
```
There is no reason to go into detail about this component as it is just a wrapper for layout.

## FolderBrowser
The FolderBrowser component is what will render the folders that can be selected. You can read more about it here:

## AssetViewer
The AssetViewer component is what will render the assets in a particular folder path. You can read more about it here:

### [Next up 2.3 Understanding FileBrowser Component](https://seancrowe.github.io/chili-custom-asset-browser-demo/thecode/understanding_fileBrowser_component.md)