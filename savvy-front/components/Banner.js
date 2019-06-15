import styled from 'styled-components';
import Router from 'next/router';

const BannerStyle = styled.div`
    font-size: 1.8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 12px;
    padding: 3.5%;
    @media (max-width: 900px) {
        margin-bottom: 6%;
    }
`;

const Photo = styled.div`
    width: 100%;;
    max-width: initial;
    height: auto;
    content:url("../static/city.jpg");
`;

const Text = styled.div`
    position: relative;
    margin-top: -32%;
    margin-bottom: 1%;
    color: white;
    p {
        color: white;
        font-size: 2.2rem;
        margin-bottom: 15%;
        margin-top: -2%;
    }
    button {
        padding: 1% 3%;
        border: 3px solid white;
        background: none;
        color: white;
        font-size: 2.2rem;
        cursor: pointer;
    }
    button:hover  {
        border: 3px solid #F6E095;
        color: #F6E095; 
    }
    @media (max-width: 1200px) {
        p {
            margin-bottom: 12.5%;
            margin-top: -2%;
        }
    }
    @media (max-width: 1000px) {
        p {
            margin-bottom: 10%;
            margin-top: -2%;
        }
        button {
            font-size: 1.8rem;
        }
    }
    @media (max-width: 900px) {
        margin: 0;
        color: white;
        background: #112A62;
        h2 {
            font-size: 2.4rem;
            padding: 0 4%;
        }
        p {
            font-size: 1.8rem;
            padding: 0 4%;
            margin-bottom: 4%;
        }
        button {
            margin-bottom: 4%;
        }
    }
`;

class Banner extends React.Component {
    onClick = () => {
        Router.push({
            pathname: '/training',
          })
    }
    render() {
        return (
          <BannerStyle>
            <Photo/>
            <Text>
                <h2>Изучение права, основанное на технологиях</h2>
                <p>Узнайте, как пользоваться Savvy и получить от него максимум пользы</p>
                <button onClick={this.onClick}>Узнать</button>
            </Text>
      </BannerStyle>
        )
    }
}
    
      


export default Banner;