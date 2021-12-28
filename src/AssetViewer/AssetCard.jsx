import ImagePreviewCover from "./ImagePreviewCover";
import {Button, Card} from "antd";

export default function AssetCard({selectAction, previewClick, item}) {
  return (
    <Card
      style={{width: 200, margin: "15px"}}
      cover={
        <ImagePreviewCover
          onClick={previewClick}
          width={200}
          height={200}
          thumbUrl={item.thumb}
        />
      }
      actions={[<Button onClick={selectAction}>Select Image</Button>]}
    >
      <Card.Meta title={item.name}/>
    </Card>
  );
}
