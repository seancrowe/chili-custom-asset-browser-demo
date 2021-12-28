import * as React from "react";
import {Button, Card, Modal} from "antd";
import {useEffect, useState} from "react";
import ChiliAssetViewerUpload from "./ChiliAssetViewerUpload";
import getAssetsInPath from "./getAssetsInPath";
import AssetCard from "./AssetCard";

export default function AssetViewer({
                                      chiliUrl,
                                      apiKey,
                                      path,
                                      environment,
                                      editorObject,
                                      variableName,
                                    }) {
  const [previewState, setPreviewState] = useState({
    visible: false,
    title: "",
    src: "",
  });

  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "flex-start",
      }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className={"loader"}/>
        </div>
      ) : (
        <></>
      )}
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
                >
                  <div
                    style={{
                      width: 200,
                      height: 200,
                      backgroundColor: "#e0e0de",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{fontSize: 30}}>+</div>
                    <div style={{marginTop: 8}}>Upload</div>
                  </div>
                </ChiliAssetViewerUpload>
              }
              actions={[
                <ChiliAssetViewerUpload
                  item={item}
                  path={path}
                  setListData={setListData}
                  setIsLoading={setIsLoading}
                  chiliUrl={chiliUrl}
                  apiKey={apiKey}
                  environment={environment}
                >
                  {" "}
                  <Button>Upload Image</Button>
                </ChiliAssetViewerUpload>,
              ]}
            >
              <Card.Meta title="Upload Image"/>
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
                  item.xml
                );
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
          />
        );
      })}
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
    </div>
  );
}
