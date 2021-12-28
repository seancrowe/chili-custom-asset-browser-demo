import FolderBrowser from "./FolderBrowser";
import AssetViewer from "./AssetViewer/AssetViewer";
import {useState} from "react";
import AssetBrowserWindow from "./AssetBrowserWindow";

export default function App({editorObject, apiKey, chiliUrl, environment}) {
  const [assetViewerPath, setAssetViewerPath] = useState("");
  const [variableName, setVariableName] = useState("");

  window.launchCustomAssetBrowser = (variableName) => {
    setVariableName(variableName);
  };

  if (variableName === "") {
    return <div/>;
  } else {
    return (
      <AssetBrowserWindow
        folderBrowser={
          <FolderBrowser
            chiliUrl={chiliUrl}
            apiKey={apiKey}
            updateAssetViewer={(path) => setAssetViewerPath(path)}
          />
        }
        assetViewer={
          <AssetViewer
            path={assetViewerPath}
            chiliUrl={chiliUrl}
            apiKey={apiKey}
            environment={environment}
            editorObject={editorObject}
            variableName={variableName}
          />
        }
      />
    );
  }
}
