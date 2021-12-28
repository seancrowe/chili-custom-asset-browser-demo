export function getChiliObject(editorObject) {
  if (editorObject != null) {
    return editorObject;
  }

  return window.editorObject;
}

export function getChiliDetails(options) {
  const {chiliUrl, apiKey, environment} = options ?? {};

  const url = window.location.href;

  let params = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    params[key] = value;
  });

  let indexOfEditor = url.indexOf("editor") - 1;

  let smallUrl = url.slice(0, indexOfEditor);

  let indexOfSlash = smallUrl.lastIndexOf("/") + 1;

  // if (params["apiKey"] == null) {
  //   // TODO: use CHILI_EditorData
  // }

  return {
    url: chiliUrl != null ? chiliUrl : smallUrl.slice(0, indexOfSlash),
    environment:
      environment != null
        ? environment
        : smallUrl.slice(indexOfSlash, smallUrl.length),
    apiKey: apiKey != null ? apiKey : params["apiKey"],
  };
}
