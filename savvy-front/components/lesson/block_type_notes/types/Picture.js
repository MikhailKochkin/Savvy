import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Styles = styled.div`
  width: ${(props) => (!props.story ? "100%" : "100vw")};
  height: ${(props) => (!props.story ? "100%" : "95vh")};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Picture = (props) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const updateImageSrc = () => {
      if (window.innerWidth > 800) {
        setImageSrc(props.horizontal_image);
      } else {
        setImageSrc(props.vertical_image);
      }
    };

    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);

    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, []);

  if (!imageSrc) {
    return null;
  }

  return (
    <Styles story={props.story}>
      <img src={imageSrc} alt="placeholder" />
    </Styles>
  );
};

export default Picture;
