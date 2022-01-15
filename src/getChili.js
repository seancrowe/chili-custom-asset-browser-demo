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
    params[key.toLowerCase()] = value;
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
    apiKey: apiKey != null ? apiKey : params["apikey"],
  };
}

export function getChiliVariableBasePath(editorObject, variableName) {
  const variable = editorObject.GetObject("document.variables[" + variableName + "]");

  if (variable == null) {
    throw new Error("Cannot find variable " + variableName);
  }

  if (variable.imageFromPulldown === "false") {
    return "";
  } else {

    const pathVariablePath = variable.imagePulldownDirectoryVariable;

    if (pathVariablePath == null) {

      switch (variable.imagePulldownDirectory) {
        case "%doc%":
          return editorObject.GetObject("document.documentAssetDir");
        case "%user%":
          return editorObject.GetObject("document.userAssetDir");
        case "%usergroup%":
          return editorObject.GetObject("document.usergroupAssetDir");
        default:
          return variable.imagePulldownDirectory;
      }
    }

    const pathVariable = editorObject.GetObject(pathVariablePath);

    if (pathVariable == null) {
      throw new Error("Cannot find variable that defines the path on " + pathVariable);
    }

    return pathVariable.value;

  }
}
