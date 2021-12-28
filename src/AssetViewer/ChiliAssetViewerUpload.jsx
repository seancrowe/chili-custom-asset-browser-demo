import {Upload} from "antd";
import ChiliConnector from "../ChiliConnector";
import getBase64 from "./getBase64";
import getAssetsInPath from "./getAssetsInPath";

export default function ChiliAssetViewerUpload({
                                                 item,
                                                 path,
                                                 setListData,
                                                 setIsLoading,
                                                 chiliUrl,
                                                 apiKey,
                                                 environment,
                                                 children,
                                               }) {
  return (
    <Upload
      maxCount={1}
      showUploadList={false}
      customRequest={({file, onSuccess}) => {
        //console.log(item);

        setListData([]);
        setIsLoading(true);
        getBase64(file).then((base64) => {
          const connector = new ChiliConnector(chiliUrl);
          connector.apiKey = apiKey;
          connector.api
            .resourceItemAdd({
              resourceName: "Assets",
              newName: encodeURI(file.name),
              folderPath: encodeURI(item.path),
              xml: "",
              fileData: base64,
            })
            .then((addResponse) => {
              //console.log(addResponse.ok);

              if (!addResponse.ok) {
                //console.log("ERROR uploading");
                setIsLoading(false);
              } else {
                getAssetsInPath(chiliUrl, apiKey, environment, path).then(
                  (assets) => {
                    setIsLoading(false);

                    if (assets == null) return;

                    setListData([{id: "upload", path: path}].concat(assets));
                  }
                );
              }

              onSuccess();
              addResponse.text().then((text) => {
                //console.log(text);
                path = item.path;
              });
            });
        });
      }}
    >
      {children}
    </Upload>
  );
}
