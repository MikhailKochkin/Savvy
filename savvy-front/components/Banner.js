import styled from 'styled-components';

const BannerStyle = styled.div`
    font-size: 2.2rem;
    background-color:#F8F8F8;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 3.5%;
    margin: 2% 0;
`;

const Banner = props => (
      <BannerStyle>
          Savvy - платформа, на которой можно делиться юридическими знаниями и навыками,
          создавать команды для исследования юридических вопросов и изучать все то, что
          так необходимо современным юристам. Давайте расскажу, как ей пользоваться...
      </BannerStyle>
)

export default Banner;