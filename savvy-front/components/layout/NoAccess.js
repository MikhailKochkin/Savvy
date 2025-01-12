import styled from "styled-components";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35vh;
  font-size: 1.8rem;
  img {
    margin-top: 250px;
    margin-bottom: 25px;

    width: 300px;
  }
`;

const Loading = () => {
  return (
    <Block>
      <img src="static/no_access_image.svg" />
      <div>You have no access to this page. </div>
      <div>Help is in the bottom right corner. </div>
    </Block>
  );
};

export default Loading;
