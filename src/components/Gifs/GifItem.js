import React, { useRef, useState, useEffect } from "react";
import "./GifList.css";
const GifItem = ({ url, width, height, title }) => {
  const gifRef = useRef(null);
  const [spans, setSpans] = useState();

  useEffect(() => {
    gifRef.current.addEventListener("load", setGifSpans);
  }, [gifRef]);

  const setGifSpans = () => {
    const height = gifRef.current.clientHeight;
    setSpans(Math.ceil(height / 10) + 1);
  };
  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img ref={gifRef} alt={title} src={url} />
    </div>
  );
};

export default GifItem;
