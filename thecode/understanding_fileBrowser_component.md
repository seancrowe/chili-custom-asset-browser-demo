# Understanding FileBrowser Component
Everything was simple up until now, but this code is a bit more messy. The [FileBrowser](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/FolderBrowser.jsx) component has two internal functions for managing data: updateTreeData and getNodeBasedOnKey. However, we will focus on the component function itself.

## Component Props
[FileBrowser](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/FolderBrowser.jsx) takes one parameter that is deconstructed into three properties: chiliUrl, apiKey, and updateAssetViewer.
```jsx
export default function FolderBrowser({chiliUrl, apiKey, updateAssetViewer})
```
- chiliUrl: used to make our API requests
- apiKey: used to make our API requests
- updateAssetViewer: a callback to push any updates to the current path

📃 Note: It is possible a fourth property will be added: basePath. This fourth property would be used to set the initial path when getting the treeData.
<br/>
## treeData
The first thing I do is define the treeData variable which will be used to store teh folder tree structure.
```javascript
const [treeData, setTreeData] = useState([]);
```
This is important because we are only loading directories by one level deep, so the treeData will expand as a user opens more subdirectories.

treeData will be an array of objects that looks like:
```typescript
{ 
  title: string,  
  key: string,
  path: string,
  children: [],  
  isLeaf: boolean,  
}
```
- title: will contain the string that is displayed in the rendered folder list
- key: a unique key for the node in the data tree (this is for lookup)
- path: the real folder path on the CHILI server
- children: all the children of this node
- isLead: whether you can open the folder to view subfolders

The treeData variable is set initially on mount in the [Effect Hook](https://reactjs.org/docs/hooks-effect.html)

```javascript
useEffect(() => {  
  const connector = new ChiliConnector(chiliUrl);  
  connector.apiKey = apiKey;  
  connector.api  
  .resourceGetTreeLevel({  
  resourceName: "Assets",  
      parentFolder: "",  
      numLevels: 1,  
      includeSubDirectories: "true",  
      includeFiles: "false",  
    })  
  .then((response) => {  
  
  response.json().then((json) => {  
  const folders = Array.isArray(json.item) ? json.item : [json.item];  
  
  setTreeData(  
  folders.map((folder, index) => {  
  return {  
  title: String.fromCodePoint("0x1F4C1") + " " + folder.name,  
              key: index,  
              path: folder.path,  
              isLeaf: folder.hasSubDirectories === "false",  
            };  
          })  
 );  
      });  
    });  
}, []);
```

The useEffect function utilizes [ChiliConnector](https://github.com/seancrowe/chili-custom-asset-browser-demo/blob/master/src/ChiliConnector.js), a custom class that wraps around some CHILI publish REST API endpoints.

We create the class, set the apiKey property with the apiKey property passed to the FileBrowser component. Then we make the call to the ResourceGetTreeLevel which returns a Promise.
```javascript
connector.api  
  .resourceGetTreeLevel({  
  resourceName: "Assets",  
    parentFolder: "",  
    numLevels: 1,  
    includeSubDirectories: "true",  
    includeFiles: "false",  
  })  
  .then(...
```
📃 Note: If we had the basePath variable, then this is where it would be used. The property *parentFolder* would be set to *basePath*.

<br/>
The rest of the call transforms the data and then sets the treeData using the function setTreeData.

## Render Tree
Skip all the middle stuff and go straight to the bottom. We pass the treeData to the Ant Design [Tree component](https://ant.design/components/tree/). At this point, Ant Design will do all the heavy lifting of rendering our treeData.
```jsx
return <Tree loadData={loadData} onSelect={onSelect} treeData={treeData}/>;
```

The component takes two other properties: loadData and onSelect.
- loadData expects a function that will be called when clicking on a node that has isLeaf=true
- onSelect expects a function that will be called when clicking on a node that has isLeaf=false

In both properties we pass function which ware declared in all that middle stuff we skipped over.

Finally, take note that if the treeData has length 0, we just pass a loading
```jsx
if (treeData.length === 0) {  
  return (  
 <div  
  style={{  
  display: "flex",  
        alignItems: "center",  
        flexDirection: "column",  
      }}  
 > <div className={"loader"}/>  
 </div>  
 );}
```
This is only possible if your environment is complete empty, the ResourceGetTreeLevel call in useEffect has yet to return a value, or the ResourceGetTreeLevel call in useEffect errors.

A good ✅ TODO would be to add an error message if ResourceGetTreeLevel fails.


## loadData
A bit of WET code here, as this looks similar to our function we passed into useEffect.

This function is called when a node (that isLeaf is true) is clicked inside the [Tree component](https://ant.design/components/tree/). The function is passed an object which we deconstruct into the key, path and children properties.

Then we take those properties and use ResourceGetTreeLevel again to get the directory of path supplied.
```jsx
const loadData = async ({key, path, children}) => {  
  if (children != null) {  
  return;  
  }  
  const connector = new ChiliConnector(chiliUrl);  
  connector.apiKey = apiKey;  
  const response = await connector.api.resourceGetTreeLevel({  
  resourceName: "Assets",  
    parentFolder: path,  
    numLevels: 1,  
    includeSubDirectories: true,  
    includeFiles: false,  
  });  
  
  if (!response.ok) {  
  return;  
  }  
  
  const responseJson = await response.json();  
  
  const newFolders = Array.isArray(responseJson.item)  
  ? responseJson.item  
  : [responseJson.item];  
  
  const treeDataUpdated = updateTreeData(  
  treeData,  
    path,  
    newFolders.map((folder, index) => {  
  return {  
  title: String.fromCodePoint("0x1F4C1") + " " + folder.name,  
        path: folder.path,  
        key: `${key}-${index}`,  
        isLeaf: folder.hasSubDirectories === "false",  
      };  
    })  
 );  
  
  setTreeData(treeDataUpdated);  
};
```
## onSelect
This function is called when a node (that isLeaf is false) is clicked inside the [Tree component](https://ant.design/components/tree/). The function is passed array of keys for selected nodes. Since we do not allow multiselect, we can always get the first index in the array.

```javascript
const onSelect = (keys) => {  
  const [key] = keys;  
  const node = getNodeBasedOnKey(treeData, key);  
  updateAssetViewer(node.path);  
};
```
We utilized getNodeBaseOnKey to get the original node, and then pass the path of that node into the callback function updateAssetViewer which will then pass it up parent component.

### [Next up 2.4 Understanding_AssetViewer_Component](https://seancrowe.github.io/chili-custom-asset-browser-demo/thecode/understanding_assetviewer_component)