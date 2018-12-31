import styled, { keyframes } from 'styled-components';

const NavButton = styled.button`
    color: white; 
    background: #0B78C6; 
    border: none;
    border-radius: 6px;
    padding: 1%;
    margin-bottom: 1%;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 600;
    &:hover {
        background: #112A62;
    }
`;

const SubmitButton = styled.button`
    background-color: #008CBA;
    border: none;
    border-radius: 6px;
    color: white;
    padding: 1%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background: #0B3954;
    }
`;

const Message = styled.p`
    background-color: #00FF7F;
    font-size: 1.8rem;
    padding: 1% 2%;
    border-radius: 10px;
    width: 30%;
    display: none;
`;

const ChooseButtons = styled.div`
    display: flex;
    flex-direction: row;
    Button:active {
        background-color: #00008B;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ChooseButton = styled.button`
    border: ${props => props.active ? "2px solid #0E78C6" : "2px solid #fff"};
    color: ${props => props.active ? "#0E78C6" : "white"};
    background-color: ${props => props.active ? "white" : "#0E78C6"};
    padding: 1% 1%;
    margin: 0 0.5%;
    width: 200px;
    @media (max-width: 800px) {
        margin: 1% 0;
        padding: 2% 1%;
    }
`;

export { NavButton, SubmitButton, Message, ChooseButtons, ChooseButton };