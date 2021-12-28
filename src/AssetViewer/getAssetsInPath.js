import ChiliConnector from "../ChiliConnector";
import {XMLBuilder} from "fast-xml-parser";

export default async function getAssetsInPath(
  chiliUrl,
  apiKey,
  environment,
  path
) {
  const connector = new ChiliConnector(chiliUrl);
  connector.apiKey = apiKey;
  const response = await connector.api.resourceGetTreeLevel({
    resourceName: "Assets",
    parentFolder: path,
    numLevels: 1,
    includeSubDirectories: "false",
    includeFiles: "true",
  });

  const json = await response.json();

  if (json.item == null) {
    return null;
  }

  const assets = Array.isArray(json.item) ? json.item : [json.item];

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attrNodeName: false,
    attributeNamePrefix: "",
  });

  return assets.map((asset) => {
    return {
      id: asset.id,
      name: asset.name,
      path: path,
      xml: builder.build({item: asset}),
      thumb: `${chiliUrl}/${environment}/download.aspx?apiKey=${apiKey}&type=medium&page=1&async=false&id=${asset.id}&resourceName=assets`,
      src: `${chiliUrl}/${environment}/download.aspx?apiKey=${apiKey}&type=highest&page=1&async=false&id=${asset.id}&resourceName=assets`,
    };
  });
}
