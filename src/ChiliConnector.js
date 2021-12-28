import {ChiliConnector as ChiliConnectorBase} from "@seancrowe/chiliconnector-base";

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
        resolve(value);
      });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

class ChiliRestInterfaceV1 {
  constructor(chiliFetch) {
    this._version = "1.1";
    this._chiliFetch = chiliFetch;
  }

  fetch(path, chiliRequestConfig) {
    return this._chiliFetch.fetch(path, chiliRequestConfig);
  }

  resourceItemAdd(methodParameters, requestOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      const queryData = {};
      queryData["newName"] = methodParameters.newName.toString();
      if (methodParameters.folderPath != null) {
        queryData["folderPath"] = methodParameters.folderPath.toString();
      }
      const bodyData = {};
      bodyData["xml"] = methodParameters.xml.toString();
      bodyData["fileData"] = methodParameters.fileData.toString();
      const chiliRequestConfig = {
        method: "POST",
        body: bodyData,
        parameters: queryData,
      };
      if (requestOptions != null && requestOptions.timeout != null) {
        chiliRequestConfig["timeout"] = requestOptions.timeout;
      }
      if (requestOptions != null && requestOptions.mode != null) {
        chiliRequestConfig["mode"] = requestOptions.mode;
      }
      return this.fetch(
        `/rest-api/v${this._version}/resources/${methodParameters.resourceName}/items`,
        chiliRequestConfig
      );
    });
  }

  resourceGetTreeLevel(methodParameters, requestOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      const queryData = {};
      if (methodParameters.parentFolder != null) {
        queryData["parentFolder"] = methodParameters.parentFolder.toString();
      }
      if (methodParameters.numLevels != null) {
        queryData["numLevels"] = methodParameters.numLevels.toString();
      }
      if (methodParameters.includeSubDirectories != null) {
        queryData["includeSubDirectories"] =
          methodParameters.includeSubDirectories.toString();
      }
      if (methodParameters.includeFiles != null) {
        queryData["includeFiles"] = methodParameters.includeFiles.toString();
      }
      const bodyData = null;
      const chiliRequestConfig = {
        method: "GET",
        body: bodyData,
        parameters: queryData,
      };
      if (requestOptions != null && requestOptions.timeout != null) {
        chiliRequestConfig["timeout"] = requestOptions.timeout;
      }
      if (requestOptions != null && requestOptions.mode != null) {
        chiliRequestConfig["mode"] = requestOptions.mode;
      }
      return this.fetch(
        `/rest-api/v${this._version}/resources/${methodParameters.resourceName}/treelevel`,
        chiliRequestConfig
      );
    });
  }
}

export default class ChiliConnector extends ChiliConnectorBase {
  constructor(basePath, baseRequestSettings) {
    super(basePath, baseRequestSettings);
    this.api = new ChiliRestInterfaceV1(this._chiliFetch);
  }

  isConnectionGood(throwError = false) {
    return __awaiter(this, void 0, void 0, function* () {
      return chiliconnectorBase.isConnectionGoodV1(this._basePath, throwError);
    });
  }
}
