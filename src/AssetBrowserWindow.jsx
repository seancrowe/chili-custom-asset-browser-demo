import * as React from "react";

export default function AssetBrowserWindow({folderBrowser, assetViewer}) {
  return (
    <div>
      <div
        style={{
          backgroundColor: "black",
          position: "absolute",
          opacity: "60%",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}

      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "85%",
              height: "600px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "20%",
                height: "100%",
              }}
            >
              <div style={{height: "20px", width: "100%"}}/>
              <div
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                  overflowY: "scroll",
                }}
              >
                {folderBrowser}
              </div>
              <div style={{height: "20px", width: "100%"}}/>
            </div>
            <div
              style={{
                backgroundColor: "grey",
                width: "80%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                overflowY: "scroll",
              }}
            >
              {assetViewer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
