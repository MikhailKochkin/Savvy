import Main from "../components/corporate_lawyer/Main";
import Problem from "../components/corporate_lawyer/Problem";
import Audience from "../components/corporate_lawyer/Audience";
import Syllabus from "../components/corporate_lawyer/Syllabus";
import Perks from "../components/corporate_lawyer/Perks";
import Call1 from "../components/corporate_lawyer/Call1";
import Price from "../components/corporate_lawyer/Price";
import Teachers from "../components/corporate_lawyer/Teachers";
import Apply from "../components/corporate_lawyer/Apply";
import Questions from "../components/corporate_lawyer/Questions";
import Partners from "../components/corporate_lawyer/Partners";
import Results from "../components/corporate_lawyer/Results";
import Projects from "../components/corporate_lawyer/Projects";
const corporate_lawyer = () => {
  return (
    <>
      <Main />
      <Problem />
      <Audience />
      <Syllabus />
      <Perks />
      <Projects />
      <Call1 />
      <Teachers />
      <Apply />
      {/* <Partners /> */}
      <Price />
      <Results />
      <Call1 />
      <Questions />
    </>
  );
};

export default corporate_lawyer;
