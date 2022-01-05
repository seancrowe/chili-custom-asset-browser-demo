# 2.3 Understanding AssetViewer Component
The [AssetViewer](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/AssetViewer.jsx) unlike the FolderBrowser is split up into multiple components with utility functions. Thus, it gets its own folder in the src folder.

## AssetViewer Component
### Component Props
[AssetViewer](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/AssetViewer.jsx) takes one parameter that is deconstructed into six properties.
```jsx
export default function AssetViewer({  
 chiliUrl, apiKey, path, environment, editorObject,variableName,  
})
```
- chiliUrl: used to make our API requests
- apiKey: used to make our API requests
- path: used to get the assets from the particular path in our API requests
- environment: used to make our API requests
- editorObject: used to set variable in document

### States
The AssetViewer has three states set:
```javascript
const [previewState, setPreviewState] = useState({  
  visible: false,  
  title: "",  
  src: "",  
});  
  
const [listData, setListData] = useState([]);  
const [isLoading, setIsLoading] = useState(true);
```
- previewState: the state used in large preview when selecting an image
- listData: an array of assets to show
- isLoading: where to show the loading spinner

These states are set in the [Effect Hook](https://reactjs.org/docs/hooks-effect.html) when the path property (passed into the props of the component) is changed.
```javascript
useEffect(() => {  
  setIsLoading(true);  
  setListData([]);  
  
  getAssetsInPath(chiliUrl, apiKey, environment, path).then(  
 (assetsFromFolder) => {  
  setIsLoading(false);  
  
      if (assetsFromFolder == null) {  
  return null;  
      }  
  
  const assets = [{id: "upload", path: path}].concat(assetsFromFolder);  
  
      setListData(assets);  
    }  
 );  
}, [path]);
```

[getAssetsInPath](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/getAssetsInPath.js) is a utility function which wraps around the ResourceGetTreeLevel API request and returning the results in any array of objects built for the AssetViewer component.

The objects are in the format:
```typescript
{  
  id: string,  
  name: string,  
  path: string,  
  xml: string,  
  thumb: string,  
  src: string,  
}
```
- id: the unique CHILI id of the asset
- name: the name of the asset
- path: the path of the asset on the CHILI server
- xml: the definition XML of the asset
- thumb: the URL to use as a thumbnail in the ImagePreviewCover component
- src: the URL to use in the large preview in the previewState

It can also return null if the chili response does not have any items.

(There is currently no logic for handling a request error. A good ✅ TODO would be to return null if a request error is encountered.)

Take note that we always create the array *assets* with the first item in the array being an object with the id="upload". This will be used later in rendering to show the upload asset card instead of  a preview card.

### Rendering
The rendering (found in the return statement) appears to be complex, but it rather quite simple.

I map it out below
<img src="./assets/assetviewer_diagram_render.png" />

#### isLoading
For check isLoading, we are just check to see if the variable is true or false to determine if we should show the spinner.
```jsx
{isLoading ? (  
 <div  
  style={{  
  display: "flex",  
      alignItems: "center",  
      flexDirection: "column",  
    }}  
 > <div className={"loader"}/>  
 </div>  
) : (  
  <></>  
)}
```
#### map of listData
For the map of listData, it seems complicated, but it really is not. Take a glance at the full code below and then skip down for an explanation.
```jsx
{listData.map(function (item, index) {  
	 if (item.id === "upload") {  
	  return (  
		 <Card  
		  key={-1}  
		 style={{width: 200, margin: "15px"}}  
		 cover={  
		 <ChiliAssetViewerUpload  
		  item={item}  
		 path={path}  
		 setListData={setListData}  
		 setIsLoading={setIsLoading}  
		 chiliUrl={chiliUrl}  
		 apiKey={apiKey}  
		 environment={environment}  
		 > <div  
		  style={{  
		  width: 200,  
          height: 200,  
          backgroundColor: "#e0e0de",  
          display: "flex",  
          alignItems: "center",  
          justifyContent: "center",  
          cursor: "pointer",  
        }}  
		 > <div style={{fontSize: 30}}>+</div>  
		 <div style={{marginTop: 8}}>Upload</div>  
		 </div>  
		 </ChiliAssetViewerUpload>  
		 } actions={[  
		 <ChiliAssetViewerUpload  
		  item={item}  
		 path={path}  
		 setListData={setListData}  
		 setIsLoading={setIsLoading}  
		 chiliUrl={chiliUrl}  
		 apiKey={apiKey}  
		 environment={environment}  
		 > {" "}  
		 <Button>Upload Image</Button>  
		 </ChiliAssetViewerUpload>,  
		        ]}  
		 > <Card.Meta title="Upload Image"/>  
		 </Card>  
	 );  
	 }  
  
	return (  
	 <AssetCard  
	  key={index}  
	 item={item}  
	 selectAction={() => {  
		 if (editorObject != null) {  
		 editorObject.SetProperty(  
		  `document.variables[${variableName}]`,  
		            "imgXML",  
		            item.xml);  
		  }  
		 window.launchCustomAssetBrowser("");  
	 }}  
	 previewClick={() => {  
	  setPreviewState({  
		  visible: true,  
		  title: item.name,  
		  src: item.src,  
		});  
	  }}  
	 /> );  
})}
```
Again, looks complicated, but really it is not. What we are doing is calling map on listData. We go through every asset in listData, and we will either render a Card or an AssetCard component.

If we ignore all the setting of properties and inline of function callbacks, the map becomes much more understandable. See below:
```jsx
{listData.map(function (item, index) {
	if (item.id === "upload") {
	  return (
		<Card>
		  <Card.Meta title="Upload Image"/>
		</Card>
	  );
	}

	return (
	  <AssetCard/>
	);
})}
```
See! Not that complicated.

The [Card](https://ant.design/components/card/) component is a component found in Ant Design. We are only using this component directly for the uploading card. Thus, we only render it when the id == "upload".

If you look back up at function set in useEffect, you will find that we purposely set an asset item with the id of "upload" as the first element in the array. That is because we want to allow uploading in every folder.

(A good ✅ TODO would be to look at the image variable in the document and disallow this item to render or even be added to the array if the image variable does not allow uploading in default CHILI.)

We pass the [Card](https://ant.design/components/card/) component style, cover, and actions properties.
- style: just some CSS
- cover: the elements rendered in the card body, which in this case is the [ChiliAssetViewerUpload](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/ChiliAssetViewerUpload.jsx) component with some divs as children to make up the + and the Upload
- actions: elements to render underneath the card body, which is this case is the [ChiliAssetViewerUpload](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/ChiliAssetViewerUpload.jsx) component with a [Button](https://ant.design/components/button/) component as a child

[ChiliAssetViewerUpload ](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/ChiliAssetViewerUpload.jsx)  component is just a wrapper for Ant Designs' [Upload](https://ant.design/components/upload/) component. The difference being is that ChiliAssetViewerUpload provides the upload logic using the CHILI REST API.

The [AssetCard](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/AssetCard.jsx) is just a wrapper for Card passing the function calls to the image and the button.

The key properties are selectAction and previewClick.

<u>selectAction</u>
selectAction passes a function that is called when the Button in the Card's actions is clicked. The function passed will do two things:
- set the variable imgXML value based on the clicked asset item
- call ``window.launchCustomAssetBrowser("")`` hiding the asset browser
```javascript
if (editorObject != null) {
  editorObject.SetProperty(
    `document.variables[${variableName}]`,
    "imgXML",
    item.xml
  );
}
window.launchCustomAssetBrowser("");
```

<u>previewClick</u>
previewClick passes a function that is called when the image in the Card's cover is clicked. The function passed does nothing more but set the preview state, which causes the Modal to appear with the asset item's image.
```javascript
() => {
  setPreviewState({
    visible: true,
    title: item.name,
    src: item.src,
  });
}
```

If you open up [AssetCard](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/AssetCard.jsx), you will notice that the Card component has a [ImagePreviewCover](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/AssetViewer/ImagePreviewCover.jsx) component for the cover. This component is just some layouting for the image element.

#### Modal
The final rendered component is the [Modal](https://ant.design/components/modal/) component, which is from Ant Design. This component is the large image preview you get when you click on an image. It's visibility, property visible, is based on previewState.

onCancel allows us to call a function when the Modal's cancel elements are selected. In this case, it will call setPreviewState to set the previewState.visible to false.
```javascript
<Modal
  visible={previewState.visible}
  width={"820px"}
  title={previewState.title}
  footer={null}
  onCancel={() => {
    setPreviewState({
      visible: false,
      title: previewState.title,
      src: previewState.src,
    });
  }}
>
  <img alt="example" style={{width: "100%"}} src={previewState.src}/>
</Modal>
```

### [Next up 2.5 Building For Use](https://seancrowe.github.io/chili-custom-asset-browser-demo/thecode/building_for_use)