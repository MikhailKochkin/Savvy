import { useState, useEffect } from "react";
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

const Frame = styled.div`
  /* border: 2px solid #ccc; */
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Phrase = styled.div`
  margin: 0;
  text-align: center;
  font-weight: 500;
  font-size: 1.6rem;
  max-width: 450px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header {
    font-size: 1.8rem;
  }
  p {
    line-height: 1.5;
    width: 100%;
  }
`;

const LoadingText = () => {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const phrases = [
      "🇯🇵 In Japan, it's not uncommon for employees to practice 'inemuri' – sleeping while on duty. This is viewed as a sign of diligence and commitment, showing that the worker is so dedicated that they have become exhausted.",
      "🇩🇪 In Germany, there's a cultural norm known as 'Feierabend' which strictly separates work from leisure time. When the workday is over, it really is over. You're unlikely to receive work calls or emails outside of office hours.",
      "🇪🇸 In Spain, the tradition of the 'siesta' - an afternoon nap - has shaped the workday schedule. While it is becoming less common in large cities, many businesses still close for a few hours in the afternoon and operate later into the evening.",
      "🇲🇽 In Mexico, business relationships are based on personal relationships. This means that before business can be discussed, a personal relationship needs to be developed. This often takes place over meals, with business only being discussed once a rapport has been established.",
      "🇸🇪 In Sweden, 'fika' is a crucial part of everyday life. It's a designated coffee break where colleagues gather for social interaction. It's considered so important that it's built into the work schedules.",
      "🇫🇮 In Finland, it's common to take a 'forest break'. Many Finns take time out of their workday to connect with nature, go for a walk, and reset. It's seen as an important part of maintaining mental health and productivity.",
      "🇨🇳 In China, it is not uncommon for the employees to live in dormitories provided by their employers, especially in manufacturing industries. This allows employees to save on living expenses and can also foster a sense of community among workers.",
      "🇸🇬 In Singapore, it's customary to practice 'kiasu', a Hokkien term that translates to 'afraid to lose'. It's a reflection of the competitive culture, especially in the workplace, where people are driven to succeed and outperform others.",
      "🇦🇺 In Australia, there's a strong emphasis on work-life balance. Employees often start and finish early (around 7 am to 3 pm), allowing them to enjoy their leisure time in the afternoon. It's also not uncommon to have a 'bring your dog to work day'.",
      "🇮🇹 In Italy, most businesses operate on a 'riposo' schedule. This is a long break taken in the middle of the day, usually between 1 pm and 4 pm, allowing workers to rest and avoid the hottest part of the day. Similar to Spain's siesta, during riposo, many businesses will close their doors and then reopen later in the afternoon.",
    ];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setPhrase(phrases[randomIndex]);
  }, []);
  return (
    <Frame>
      <Phrase>
        <p className="header">
          <b>Do you know?</b>
        </p>
        <p>{phrase}</p>
      </Phrase>
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
    </Frame>
  );
};

export default LoadingText;
