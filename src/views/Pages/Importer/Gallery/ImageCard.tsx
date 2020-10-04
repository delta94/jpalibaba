import React from "react";

import product2 from "assets/img/product-2.jpg";
import { Card, CardHeader, CardContent, IconButton } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import { ImageItem } from "provider/models";

interface ImageCardProp {
  item: ImageItem;
}
export const ImageCard = ({ item }: ImageCardProp) => {
  return (
    <Card style={styles.imageCard}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <HighlightOff color="error" />
          </IconButton>
        }
        title={item.title}
        titleTypographyProps={{ variant: "body2" }}
        subheader={item.created}
        subheaderTypographyProps={{ variant: "overline" }}
      />
      <CardContent style={styles.content}>
        <img src={item.mediumUrl} title={item.title} style={styles.image} />
      </CardContent>
    </Card>
  );
};

const styles = {
  imageCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "space-between",
  },
  image: {
    maxWidth: "100%",
  },
  content: {
    paddingTop: 0,
  },
};
