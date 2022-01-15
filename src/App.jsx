import FolderBrowser from "./FolderBrowser";
import AssetViewer from "./AssetViewer/AssetViewer";
import {useEffect, useState} from "react";
import AssetBrowserWindow from "./AssetBrowserWindow";
import {getChiliVariableBasePath} from "./getChili";

export default function App({editorObject, apiKey, chiliUrl, environment}) {
  const [assetViewerPath, setAssetViewerPath] = useState("");
  const [variableName, setVariableName] = useState("");
  const [basePath, setBasePath] = useState("");

  useEffect(() => {
    window.launchCustomAssetBrowser = (variableName) => {
      const basePath = getChiliVariableBasePath(editorObject, variableName)
      setBasePath(basePath);
      setAssetViewerPath(basePath);
      setVariableName(variableName);
    };
  }, []);


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
            basePath={basePath}
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
