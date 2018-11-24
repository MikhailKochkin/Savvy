import styled from 'styled-components';

const BannerStyle = styled.div`
    font-size: 2.2rem;
    background-color:#F8F8F8;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 3.5%;

`;

const Banner = props => (
      <BannerStyle>
          Savvy is a platfrom where you can share your
              legal knowledge and skills, create teams to
              explore new ideas and study new information 
              to gain the skills modern lawyers needs.
      </BannerStyle>
)

export default Banner;