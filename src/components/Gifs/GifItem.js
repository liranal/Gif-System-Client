import React, { useRef, useState, useEffect } from "react";
import "./GifList.css";
import Zoom from "react-reveal/Zoom";
const GifItem = ({ url, width, height, title }) => {
  const gifRef = useRef(null);
  const [spans, setSpans] = useState();

  useEffect(() => {
    if (gifRef.current) {
      console.log(gifRef.current);
      gifRef.current.addEventListener("load", setGifSpans);
    }
    //
  }, []);

  const setGifSpans = () => {
    if (gifRef.current) {
      let height = gifRef.current.clientHeight;
      setSpans(Math.ceil(height / 10) + 1);
    }
  };
  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <Zoom>
        <img
          ref={(el) => {
            console.log(el);
            gifRef.current = el;
          }}
          alt={title}
          src={url}
        />
      </Zoom>
    </div>
  );
};

export default GifItem;
