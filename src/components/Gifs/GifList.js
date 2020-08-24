import React from "react";
import GifItem from "./GifItem";
import "./GifList.css";

const GifList = ({ gifs, isSignedIn }) => {
  const renderGifList = () => {
    if (!isSignedIn) {
      return null;
    }
    return gifs.map((gif, index) => {
      return (
        <GifItem
          url={gif.gifUrl}
          width={gif.width}
          height={gif.height}
          title={gif.title}
          key={index}
        />
      );
    });
  };

  return <div className="gif-list">{renderGifList()}</div>;
};

export default GifList;
