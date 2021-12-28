import * as React from "react";
import "antd/dist/antd.css";
import {Tree} from "antd";
import {useEffect, useState} from "react";
import ChiliConnector from "./ChiliConnector";

function updateTreeData(list, path, children) {
  return list.map((node) => {
    if (node.path === path) {
      return {...node, children};
    }

    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, path, children),
      };
    }

    return node;
  });
}

function getNodeBasedOnKey(list, key) {
  const keys = Number.isInteger(key)
    ? [key]
    : key.split("-").map((key) => parseInt(key));

  //console.log(keys);

  let currentNode = {children: list};
  while (keys.length > 0) {
    const index = keys.shift();
    currentNode = currentNode.children[index];
  }

  return currentNode;
}

export default function FolderBrowser({chiliUrl, apiKey, updateAssetViewer}) {
  const [treeData, setTreeData] = useState([]);

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
        //console.log(response);

        response.json().then((json) => {
          const folders = Array.isArray(json.item) ? json.item : [json.item];

          //console.log(folders);

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

  const onSelect = (keys) => {
    const [key] = keys;
    const node = getNodeBasedOnKey(treeData, key);
    updateAssetViewer(node.path);
  };

  if (treeData.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={"loader"}/>
      </div>
    );
  }

  return <Tree loadData={loadData} onSelect={onSelect} treeData={treeData}/>;
}
