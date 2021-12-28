import styled from "styled-components";
import {useState} from "react";

const CoverBackgroundDiv = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  --antd-wave-shadow-color: #1890ff;
  --scroll-bar: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
  Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 12px;
  font-variant: tabular-nums;
  line-height: 1.66667;
  list-style: none;
  font-feature-settings: "tnum";
  box-sizing: border-box;
  background-color: black;
  width: ${(props) => props.width ?? "200px"};
  height: ${(props) => props.height ?? "200px"};
  position: absolute;
  top: -1px;
  left: -1px;
  opacity: 50%;
`;

const CoverTextDiv = styled(CoverBackgroundDiv)`
  opacity: 100%;
  cursor: pointer;
  background-color: transparent;
  display: ${(props) => (props.show ? "flex" : "none")};
  color: white;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default function ImagePreviewCover({
                                            onClick,
                                            width,
                                            height,
                                            thumbUrl,
                                          }) {
  const [showPreviewText, setShowPreviewText] = useState(false);

  if (!width.toString().includes("px")) {
    width += "px";
  }

  if (!height.toString().includes("px")) {
    height += "px";
  }

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <div
        onMouseOver={() => setShowPreviewText(true)}
        onClick={onClick}
        style={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
          backgroundImage: `url(${thumbUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
      />
      <CoverBackgroundDiv
        width={width}
        height={height}
        show={showPreviewText}
      />
      <CoverTextDiv
        onClick={onClick}
        onMouseOut={() => setShowPreviewText(false)}
        width={width}
        height={height}
        show={showPreviewText}
      >
        Preview
      </CoverTextDiv>
    </div>
  );
}
