import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #e8eff6;
`;

export const LessonStyles = styled.div`
  width: 800px;
  min-width: 700px;
  margin: 1.5% 0;
  @media (max-width: 1000px) {
    width: 90%;
    min-width: 100px;
  }
`;

export const CourseInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Data = styled.div`
  flex: 60%;
  background: #fff;
  border-radius: 2rem;
  padding: 2% 3%;
  box-shadow: 0 4px 6px -7px rgb(0 0 0 / 5%), 0 4px 30px -9px rgb(0 0 0 / 10%);
  .description {
    margin-top: 20px;
  }
  p {
    margin: 0;
  }
  img {
    width: 55px;
    height: 55px;
    border-radius: 50px;
    object-fit: cover;
  }
  .name {
    display: flex;
    flex-direction: row;
    font-size: 1.6rem;
    font-weight: bold;
    padding-top: 4%;
    /* border-top: 1px solid #e4e4e4; */
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 4%;
    }
  }
  .company {
    font-size: 1.6rem;
    padding-bottom: 4%;
  }
  .track {
    font-size: 1.6rem;
    line-height: 1.4;
    padding-top: 4%;
    padding-bottom: 4%;
  }
  .rating {
    padding-bottom: 4%;
    font-size: 1.6rem;
  }
  .track2 {
    font-size: 1.6rem;
    line-height: 1.4;
    padding-top: 0%;
    padding-bottom: 2%;
    margin-top: 20px;
  }
  .trackName {
    font-weight: 600;
  }
`;

export const PayBox = styled.div`
  flex: 40%;
  display: flex;
  background: #fff;
  border-radius: 2rem;
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2% 2%;
  box-shadow: 0 4px 6px -7px rgb(0 0 0 / 5%), 0 4px 30px -9px rgb(0 0 0 / 10%);

  @media (max-width: 1000px) {
    margin-top: 20px;
    margin-left: 0px;
    align-items: center;
  }
`;

export const LessonImage = styled.img`
  position: relative;
  object-fit: cover;
  height: 350px;
  width: 100%;
  @media (max-width: 800px) {
    height: 200px;
  }
`;

export const Lessons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 800px) {
    /* height: 200px; */
  }
`;

export const Syllabus = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  .week_number {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 25px;
  }
  @media (max-width: 800px) {
    .week_number {
      margin: 15px 0;
    }
  }
`;

export const Header = styled.span`
  font-size: 2.4rem;
  margin: 1% 0;
  padding: 1%;
  padding-right: 1.5%;
  font-style: italic;
  -webkit-box-decoration-break: clone;
  -o-box-decoration-break: clone;
  box-decoration-break: clone;
  line-height: 1.4;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background: #ffdad7; */
  /* transform: skew(-5deg);
  -webkit-transform: skew(-5deg);
  -moz-transform: skew(-5deg);
  -o-transform: skew(-5deg); */
  /* transform: skew(10deg, 10deg); */
`;

export const Header2 = styled.div`
  font-size: 2rem;
  padding-top: 4%;
  margin-bottom: 3%;
  @media (max-width: 800px) {
    font-size: 1.8rem;
    margin-bottom: 6%;
  }
`;

export const Total = styled.div`
  font-size: 1.6rem;
  margin: 30px 0;

  @media (max-width: 800px) {
    font-size: 1.8rem;
    margin-bottom: 6%;
    line-height: 1.4;
  }
`;

export const Buttons = styled.div``;

export const Button = styled.button`
  border: none;
  background: none;
  font-size: 1.6rem;
  padding: 0;
  margin-right: 20px;
  outline: 0;
  cursor: pointer;
  font-family: Montserrat;
  padding-bottom: 10px;
  border-bottom: ${(props) =>
    props.primary ? "1px solid black" : "1px solid white"};
  &#forum {
    font-weight: bold;
  }
`;

export const ReviewsStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  margin: 2% 0;
  .header {
    font-size: 1.8rem;
    font-weight: bold;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Post = styled.div`
  width: 45%;
  border-top: 3px solid #02b3e4;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  flex-basis: 45%;
  background: #fff;
  margin-bottom: 3%;
  border-radius: 15px;
  padding: 2%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .source {
    & {
      width: 100%;
      text-align: center;
      border-bottom: 1px solid #000;
      line-height: 0.1em;
      margin: 20px 0 20px;
    }

    & span {
      background: #fff;
      padding: 0 30px;
    }
  }
  .text {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 800px) {
    width: 95%;
    padding: 4%;
  }
`;

export const Details = styled.div`
  margin: 0;
  font-size: 1.6rem;
  /* background: #fafbfc; */
  .red {
    padding: 4%;
    background: #6c4ae0;
    color: white;
    margin: 2% 0;
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .info {
    padding: 4%;
    background: #fff;
    /* box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2); */
    border-radius: 2rem;
    margin: 4% 0;
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .header {
    font-size: 1.8rem;
    margin-bottom: 1%;
    text-align: center;
    display: inline-block;
    padding: 0 5%;
    background-image: linear-gradient(90deg, #02b3e4 0, #02ccba);
    color: white;
    transform: skew(-5deg);
    -webkit-transform: skew(-5deg);
    -moz-transform: skew(-5deg);
    -o-transform: skew(-5deg);
    @media (max-width: 800px) {
      font-size: 1.6rem;
    }
  }
  .openLesson {
    margin: 3% 0;
    @media (max-width: 800px) {
      margin: 6% 0;
    }
  }
  @media (max-width: 800px) {
    margin-top: 20px;
  }
`;

export const Video = styled.div`
  .header {
    margin-bottom: 3%;
  }
  margin: 3% 0;
  iframe {
    width: 100%;
    height: 45vh;
    border: none;
  }
`;

export const Comment = styled.div`
  font-size: 1.6rem;
  background: #0268e6;
  color: white;
  padding: 2% 3%;
  margin-top: 3%;
  text-align: center;
`;
