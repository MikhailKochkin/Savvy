import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35vh;
`;

const Loading = () => {
  return (
    <Block>
      <TailSpin
        height="80"
        width="80"
        color="#2E80EC"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Block>
  );
};

export default Loading;
