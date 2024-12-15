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
  console.log(props);
  const [imageSrc, setImageSrc] = useState("");
  let vertical_image =
    "https://images.unsplash.com/photo-1721332153282-3be1f363074d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let horizontal_image =
    "https://plus.unsplash.com/premium_photo-1673240159028-1ddae0a75009?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    const updateImageSrc = () => {
      if (window.innerWidth > 800) {
        setImageSrc(horizontal_image);
      } else {
        setImageSrc(vertical_image);
      }
    };

    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);

    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, []);

  return (
    <Styles story={props.story}>
      <img src={imageSrc} alt="placeholder" />
    </Styles>
  );
};

export default Picture;
