import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import parse from "html-react-parser";

const Styles = styled.div`
  padding: 50px 0;
  background-color: #fffaf6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 95vw;
  max-height: 2000px;
  max-height: ${(props) => (props.lang == "ru" ? "2000px" : "1300px")};
  @media (max-width: 1700px) {
    max-height: ${(props) => (props.lang == "ru" ? "2200px" : "1800px")};
  }

  @media (max-width: 1500px) {
    max-height: ${(props) => (props.lang == "ru" ? "2500px" : "2000px")};
  }
  @media (max-width: 1300px) {
    max-height: 2600px;
  }
  @media (max-width: 1150px) {
    max-height: 2800px;
  }
  @media (max-width: 1050px) {
    max-height: ${(props) => (props.lang == "ru" ? "3600px" : "2600px")};
  }
  @media (max-width: 750px) {
    max-height: none;
  }
`;

const Review = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  width: 400px;
  margin-bottom: 20px;
  margin-right: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.4rem;
    margin-bottom: 10px;
    line-height: 1.6;
  }
  @media (max-width: 1500px) {
    width: 375px;
  }
  @media (max-width: 1300px) {
    width: 375px;
  }
  @media (max-width: 1150px) {
    width: 360px;
  }
  @media (max-width: 1050px) {
    width: 350px;
  }
  @media (max-width: 750px) {
    margin-right: 0px;
  }
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
  }

  div {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

// 1.Raul 2.Idin 3.Tilly 4.Pasha 5.Carla 6.P&C 7.

const WallOfLove = () => {
  const router = useRouter();

  let reviews;
  let eng_reviews = [
    {
      text: "<p>Studying Legal English on BeSavvy was a great experience. The small, varied assignments made it easy to grasp the material and apply it effectively. The platform's structured approach to presenting the information helped me develop a clear and logical way of writing legal documents. The support from the platform, including prompt responses and useful insights, was invaluable. I highly recommend it, especially for those starting out in the legal field.</p>",
      author_name: "Anastasia Rudanovskaya",
      position: "Lawyer",
      author_image:
        "https://sun9-26.userapi.com/impg/bW8uzC2OgE3N6mQ-UbGADprJjRKIozlD01DDhQ/K9y5nSC4IXM.jpg?size=1344x1792&quality=96&sign=6a0b284d5b394f7bc00e97f044a1a325&type=album",
    },
    {
      text: "<p>Finding the right educational program for learning legal English was a challenge until I discovered the BeSavvy platform. The advanced legal writing course provided me with essential skills and practical tools for drafting legal documents, which I now use in my daily work. The platform’s approach to legal writing education has been instrumental in enhancing my practice.</p>",
      author_name: "Vera Zakharova",
      position: "Lawyer",
      author_image:
        "https://sun9-48.userapi.com/impg/Eetn8cWpPY7rs__wS5FtQ9CRUylgePZ1PKSfPg/GxsQHAjsdHU.jpg?size=1080x1080&quality=96&sign=e9338491a7126108265a09b8469199f9&type=album",
    },
    {
      text: "<p>When I started the course, I had scattered knowledge of Legal English from various sources and was unsure of how to apply it. BeSavvy impressed me with its clear, concise, and well-structured approach. The practical exercises were immediately applicable, and I found it easy to engage with the material. The platform made handling complex legal texts much less intimidating and helped me identify and correct mistakes in my translations.</p>",
      author_name: "Elena Salomatina",
      position: "Lawyer",
      author_image:
        "https://scontent.ftbs5-2.fna.fbcdn.net/v/t1.6435-1/118699951_10222413074252930_1323164313634201004_n.jpg?stp=dst-jpg_s480x480&_nc_cat=103&ccb=1-7&_nc_sid=e4545e&_nc_ohc=u_mROFfzrq0Q7kNvgGypNfL&_nc_ht=scontent.ftbs5-2.fna&_nc_gid=AZZdSM3vSRlDGibGVUjWNMV&oh=00_AYCVRgqGtWoq12pipnAxVIUdAKQUA3pYtTU4gANYRulS7A&oe=67026D09",
      source: "https://www.facebook.com/elena.salomatina.3",
    },
    {
      text: "<p>Choosing to use BeSavvy was one of the best decisions I’ve made. The platform’s interactive format and networking opportunities made learning enjoyable and engaging. The casual atmosphere and the game-like elements made studying a pleasant experience.</p>",
      author_name: "Nastya Shashkina",
      position: "Lawyer",
      author_image:
        "https://sun9-15.userapi.com/impg/Qa7Iq2HVJQSMkBnBbk3H4wZUXyVZN6fPOu9TqA/REW7SpbeV68.jpg?size=1534x2160&quality=96&sign=8cd3260f7c157977cba6654d06c2c046&type=album",
    },
    {
      text: "<p>The BeSavvy platform's approach to learning was highly effective. I looked forward to every session, thanks to its engaging and interactive format. The platform’s use of games and informal elements made studying much more enjoyable.</p>",
      author_name: "Erzhena N.",
      position: "Lawyer",
      author_image: "",
    },
    {
      text: "<p>Thanks to BeSavvy, my team and I won first place in the ‘Corporate Law’ category at the ‘MGIMO Law Championship’. The platform’s resources and the community support were crucial in our preparation. I frequently referred to the platform’s materials and Discord channel, which provided valuable insights and guidance. BeSavvy was an excellent starting point for my deeper dive into corporate law.</p>",
      author_name: "Artem Korotkov",
      position: "Lawyer",
      author_image:
        "https://sun9-69.userapi.com/impf/c852128/v852128904/172e2f/DVll0kZWPU4.jpg?size=810x1080&quality=96&sign=69149605102ee09480c2ff37802e8e69&type=album",
    },
    {
      text: "<p>During my third year, I decided to explore dispute resolution. The night before the interview, I reviewed the relevant procedural codes and case law. On the day of the interview, despite my enthusiasm for disputes, I was asked why I was interviewing for corporate practice. It turned out that I was scheduled for the wrong slot. The interviewer suggested trying corporate law, and BeSavvy's courses were extremely helpful. The platform covered most of the topics I was questioned about, from options to warranties and indemnities. I was invited to the next stage, and it was clear how valuable the M&A course had been. I highly recommend BeSavvy for anyone considering a career in corporate law.</p>",
      author_name: "Vsevolod Startsev",
      position: "Lawyer",
      author_image:
        "https://sun1-22.userapi.com/impg/SFRF7vELgosrHBgPVXyjvFRulG6_MsJrVjGA6A/JwiHvFYEBF8.jpg?size=810x1080&quality=96&sign=9b3579ba9c024d2b21210f94aa9bc92e&type=album",
    },
    {
      text: "<p>BeSavvy's balanced approach to theory and practical cases was incredibly beneficial. The knowledge gained was frequently useful in interviews. I highly recommend the platform to anyone looking to solidify their understanding and stay updated with industry trends. The platform’s interaction with experienced lawyers was also a great advantage.</p>",
      author_name: "Elizaveta Tsorn",
      position: "Lawyer Legit",
      author_image:
        "https://sun9-76.userapi.com/impg/T7piXXU9qK_fcxiyx3xgqTBx041nl3-uu8kWwQ/QbKybTwvpaU.jpg?size=864x1080&quality=95&sign=7ed0f20421f4758ff237008924769d8b&type=album",
    },
    {
      text: "<p>Using the BeSavvy platform to study Legal English was incredibly useful. The platform’s well-organized content and clear structure helped me tackle the vast amount of information and write coherent legal texts in English. The platform’s universal approach to text structuring is applicable both for English and Russian legal documents. It’s a must for any lawyer looking to improve their writing skills.</p>",
      author_name: "Pavel Evsyukov",
      position: "Practicing Lawyer",
      author_image:
        "https://scontent.ftbs5-3.fna.fbcdn.net/v/t39.30808-1/271899011_1515051325547333_8977449665855787972_n.jpg?stp=dst-jpg_s480x480&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=QQt3Yyv2JIAQ7kNvgHT0xRI&_nc_ht=scontent.ftbs5-3.fna&oh=00_AYD5qdg0g3f60hoX9Zh4uAdbed2tOvFuhgagmnXNBW-_Fw&oe=66E0BC00",
      source:
        "Facebook - https://www.facebook.com/profile.php?id=100011274392064",
    },
    {
      text: "<p>Studying Legal English on BeSavvy gave me not just vocabulary but also the skills to structure texts, including contracts and business letters. The platform taught me how to think critically about legal texts, offering practical and in-depth understanding. The oral speech module was particularly helpful and something that’s hard to practice alone. The support from the mentors and the platform’s responsiveness made it easy to resolve any questions or issues. If you are committed to learning and improving, I definitely recommend this platform.</p>",
      author_name: "Evgenia Zykova",
      position: "Student",
      author_image: "",
      source: "",
    },
    {
      text: "<p>BeSavvy has been an invaluable resource for effectively learning civil law. The material is presented in a concise and engaging way, helping to systematize the knowledge acquired. I am grateful to the creators of the platform!</p>",
      author_name: "Karina Bashkurova",
      position: "Lawyer",
      author_image:
        "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1690204654/Screenshot_2023-07-24_at_17.17.27.png",
      source: "",
    },
    {
      text: "<p>Thank you for the useful platform! At times, it was quite challenging, but that was its unique feature; it made my brain work and be creative!</p>",
      author_name: "Albina Miftakhova",
      position: "Lawyer",
      author_image:
        "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/295028864_5422157594529526_3992470238005968735_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jAGHOnFwYNAQ7kNvgGD_ezw&_nc_ht=scontent.ftbs5-2.fna&_nc_gid=Ansgi6OPNgXDOMZK-oVIZri&oh=00_AYBATTQ3sckaThsDgcTQLVi8Eg5yzyl2iSducLx_7mzM-Q&oe=66E0AEAE",
      source: "https://www.facebook.com/binulka.miftakhova",
    },
    {
      text: "<p>I finished the tasks, please have a look. I must say, it is a great platform, thank you! I haven’t seen anything like it for legal English elsewhere – it’s truly unique and well-thought-out. Unfortunately, I missed some webinars, but that’s my fault as it clashed with other classes. Thanks again and good luck!</p>",
      author_name: "Vladimir",
      position: "Lawyer",
      author_image: null,
      source: "vladimir.par – Discord",
    },
  ];

  let rus_reviews = [
    {
      text: "<p>Я прошла курс по юридическому английскому про* в марте 2021 года. Благодаря небольшому объёму заданий и повторению их в разных вариациях, материал усваивается легко.</p><p> К окончанию курса у меня сформировался навык структурированного и логичного изложения своих мыслей в тексте и документах. Михаил всегда на связи, делится инсайтами и отвечает на вопросы. Это очень важно и круто. После прохождения курса, невольно возникает вопрос, почему я не сделала это раньше?) Однозначно рекомендую, особенно начинающим специалистам в юриспруденции, приобретёте много прикладных навыков.</p>",
      author_name: "Анастасия Рудановская",
      position: "Юрист",
      author_image:
        "https://sun9-26.userapi.com/impg/bW8uzC2OgE3N6mQ-UbGADprJjRKIozlD01DDhQ/K9y5nSC4IXM.jpg?size=1344x1792&quality=96&sign=6a0b284d5b394f7bc00e97f044a1a325&type=album",
    },
    {
      text: "<p>Я искала подходящую образовательную программу для изучения английского языка, где обучали бы тому, с чем ты имеешь дело в работе. Продвинутый курс legal writing  дал мне базу необходимых навыков, от которых можно отталкиваться при выполнении рабочих задач. Я получила инструменты для составления  юридических документов и сейчас реализую их на практике.</p>",
      author_name: "Вера Захарова",
      position: "Юрист",

      author_image:
        "https://sun9-48.userapi.com/impg/Eetn8cWpPY7rs__wS5FtQ9CRUylgePZ1PKSfPg/GxsQHAjsdHU.jpg?size=1080x1080&quality=96&sign=e9338491a7126108265a09b8469199f9&type=album",
    },
    {
      text: `<p>С чем я пришла на курс: с разрозненными знаниями в Legal English, полученными в разное время на разных курсах (от просто языковых до незаконченного второго высшего по переводу), с неуверенностью в их корректном применении на практике.</p>
<p>В процессе прохождения курса: меня сразу впечатлил структурный, ёмкий и продуманный подход Михаила к подаче материала, без лишней инфы я получила четкий и понятный рабочий инструментарий, который тут же можно отработать на практических упражнениях. Времени на регулярные занятия уходило немного, плюс было интересно)</p>
<p>По итогам курса: меня больше не пугают огромные тексты с профессиональной лексикой, поскольку я знаю к ним подход, я увидела ошибки, которые допускала при переводе и поняла, как переводить правильно</p>`,
      author_name: "Елена Саломатина",
      position: "Юрист",
      author_image:
        "https://scontent.ftbs5-2.fna.fbcdn.net/v/t1.6435-1/118699951_10222413074252930_1323164313634201004_n.jpg?stp=dst-jpg_s480x480&_nc_cat=103&ccb=1-7&_nc_sid=e4545e&_nc_ohc=u_mROFfzrq0Q7kNvgGypNfL&_nc_ht=scontent.ftbs5-2.fna&_nc_gid=AZZdSM3vSRlDGibGVUjWNMV&oh=00_AYCVRgqGtWoq12pipnAxVIUdAKQUA3pYtTU4gANYRulS7A&oe=67026D09",
      source: "https://www.facebook.com/elena.salomatina.3",
    },
    {
      text: "<p>Решение начать курс на BeSavvy – одно из самых правильных моих решений.</p>",
      author_name: "Настя Шашкина",
      position: "Юрист",

      author_image:
        "https://sun9-15.userapi.com/impg/Qa7Iq2HVJQSMkBnBbk3H4wZUXyVZN6fPOu9TqA/REW7SpbeV68.jpg?size=1534x2160&quality=96&sign=8cd3260f7c157977cba6654d06c2c046&type=album",
    },
    {
      text: "<p>Курс и его реализация ОЧЕНЬ КЛАССНЫЕ.</p><p>Я-тот ещё прокрастинатор, но здесь я прям жду свободную минуту, чтобы позаниматься.</p><p>Игровой формат, формат «Нетворк» очень заряжает, а неформальное фото А.Гуна разряжает «ботаническую» обстановку.</p><p>Учеба в удовольствие.</p>",
      author_name: "Эржена Н.",
      position: "Юрист",
      author_image: "",
    },
    {
      text: "<p>Я с командой в этот вторник занял первое место по направлению «Корпоративное право» в «MGIMO Law Championship».</p><p>Хочу тебе сказать большое спасибо, потому что этому в том числе поспособствовала «Школа молодого юриста» от BeSavvy.</p><p>Как ты помнишь, когда мы проводили с тобой встречу в зуме, я сказал, что одна из причин, по которой я хочу поучаствовать в программе, это понять, какая область права мне интересна и чем я хочу заниматься дальше.</p><p>Блок корпоративного права настолько мне понравился, что я стал глубже изучать эту тему, принял участие в программе «Университет АЛРУД», куда пошёл в том числе и из-за раздела по корпоративному праву, поучаствовал в Kutafin Legal Cup, где почти прошёл в финал, но не победил, и вот занял первое место в этом кейс-чемпионате.</p><p>При решении кейсов в обоих мероприятиях я частенько открывал не только наш сайт с курсом, чтобы посмотреть там полезную инфу, но и ещё наш Дискорд, где преподаватели писали комментарии по самым проблематичным вопросам и кидали ссылки на судебную практику и разъяснения высших судов.</p><p>Могу сказать, что школа стала отличным «стартом» для погружения в том числе в корпоративное право и хочу передать отдельную благодарность нашим преподавателям!</p>",
      author_name: "Артем Коротков",
      position: "Юрист",
      author_image:
        "https://sun9-69.userapi.com/impf/c852128/v852128904/172e2f/DVll0kZWPU4.jpg?size=810x1080&quality=96&sign=69149605102ee09480c2ff37802e8e69&type=album",
    },
    {
      text: `<p>На третьем курсе я решил попробовать себя в DR и подал заявку в московскую компанию. Вечером перед собеседованием повторил АПК, ГПК и изучил судебную практику.</p> <p>Наступает день Х. Я увлечённо рассказываю юристу о своём интересе к спорам, но вдруг слышу вопрос: "Зачем вы тогда собеседуетесь в корпоративную практику?" Оказалось, что HR записал меня не туда.</p> <p>Юрист предложил попробовать себя в корпоративной практике. И тут мне пригодились курсы BeSavvy, пройденные ранее. Большинство вопросов касались тем, изученных на платформе: от опционов до заверений и возмещения убытков.</p> <p>Меня пригласили на следующий этап, и я понял, как важен был курс M&A. Рекомендую его всем, кто планирует карьеру в корпоративной практике.</p>`,
      author_name: "Всеволод Старцев",
      position: "Юрист",
      author_image:
        "https://sun1-22.userapi.com/impg/SFRF7vELgosrHBgPVXyjvFRulG6_MsJrVjGA6A/JwiHvFYEBF8.jpg?size=810x1080&quality=96&sign=9b3579ba9c024d2b21210f94aa9bc92e&type=album",
    },
    {
      text: '<p>Я рада, что в обучении есть баланс между теоретическими вопросами и практическими кейсами.</p><p>За время обучения мне не раз помогли эти знания на собеседованиях!</p><p>Я с удовольствием советую Школу своим знакомым – тем, кто хочет закрепить теорию и быть в курсе "трендов" в отрасли, и тем, кто будет рад взаимодействию с юристами-практиками.</p>',
      author_name: "Елизавета Цорн",
      position: "Юрист Legit",
      author_image:
        "https://sun9-76.userapi.com/impg/T7piXXU9qK_fcxiyx3xgqTBx041nl3-uu8kWwQ/QbKybTwvpaU.jpg?size=864x1080&quality=95&sign=7ed0f20421f4758ff237008924769d8b&type=album",
    },
    {
      text: "<p>Каждый юрист должен пройти курс Михаила Кочкина “Legal English: базовый уровень” (Курс).</p><p>Объем информации, с которым сталкивается современный юрист, огромен. Как научиться раскладывать эту информацию по полочкам и готовить стройные юридические тексты на английском языке? Курс позволит вам решить эту проблему.</p><p>Курс является по своей сути универсальным образовательным инструментом. Алгоритм структурирования письменного текста одинаков как для английского, так и для русского языков. Поэтому вы легко сможете использовать полученные знания не только при написании англоязычных текстов, но и при подготовке юридических заключений на русском языке.</p><p>Умение писать стройные и логичные юридические тексты является одним из важнейших навыков для юриста. Именно поэтому Курс является “a must” для каждого из вас!</p>",
      author_name: "Павел Евсюков",
      position: "Практикующий юрист, Москва",
      author_image:
        "https://scontent.ftbs5-3.fna.fbcdn.net/v/t39.30808-1/271899011_1515051325547333_8977449665855787972_n.jpg?stp=dst-jpg_s480x480&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=QQt3Yyv2JIAQ7kNvgHT0xRI&_nc_ht=scontent.ftbs5-3.fna&oh=00_AYD5qdg0g3f60hoX9Zh4uAdbed2tOvFuhgagmnXNBW-_Fw&oe=66E0BC00",
      source:
        "Facebook - https://www.facebook.com/profile.php?id=100011274392064",
    },
    {
      text: "<p>После прохождения курса по юридическому английскому я приобрела не только знания лексики, но и умение структурирование работать с текстами: с договорами, с деловыми письмами. Я бы сказала, что курс не только про юридический английский, не только про словарный запас, а также про умение думать. При изучении учишь не только лексику, как по учебнику, но и берёшь знания о структуре юридических текстов, рассматриваешь тонкости юридической тематики.</p><p>Более всего порадовал блок, связанный с устной речью, что действительно полезно и невозможно отработать в одиночку. Радует, что преподаватель всегда идёт навстречу и оперативно отвечает на вопросы, причём, различной сложности. Поэтому несмотря на то, что уроки проходишь на платформе, всегда есть возможность задать вопрос ментору и разъяснить непонятные моменты. Если есть готовность работать самостоятельно и желание разбираться в этом нелегком деле, то курс однозначно рекомендую.</p>",
      author_name: "Евгения Зыкова",
      position: "Студентка",
      author_image: "",
      source: "",
    },
    {
      text: "<p>Данный курс стал для меня неотъемлемым помощником для эффективного изучения гражданского права. Материал изложен очень лаконично и интересно, а также помогает систематизировать полученные знания. Спасибо создателям курса!</p>",
      author_name: "Карина Башкурова",
      position: "Юрист",
      author_image:
        "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1690204654/Screenshot_2023-07-24_at_17.17.27.png",
      source: "",
    },
    {
      text: "<p>Спасибо за интересный курс! Местами, конечно, было очень сложно. Но это и было своей изюминкой, заставляло мозг работать и креативить !</p>",
      author_name: "Альбина Мифтахова",
      position: "Юрист",
      author_image:
        "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/295028864_5422157594529526_3992470238005968735_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jAGHOnFwYNAQ7kNvgGD_ezw&_nc_ht=scontent.ftbs5-2.fna&_nc_gid=Ansgi6OPNgXDOMZK-oVIZri&oh=00_AYBATTQ3sckaThsDgcTQLVi8Eg5yzyl2iSducLx_7mzM-Q&oe=66E0AEAE",
      source: "https://www.facebook.com/binulka.miftakhova",
    },
    {
      text: "<p>Задания доделал, посмотрите, пожалуйста) Скажу сразу, это был классный курс, спасибо) Я такого по юр английскому еще нигде не видел - действительно уникально и продуманно) К сожалению, не удалось посетить некоторые вебинары, но это мой косяк тк наложились пары на те дни. Еще раз спасибо большое и удачи Вам!</p>",
      author_name: "Владимир",
      position: "Юрист",
      author_image: null,
      source: "vladimir.par – Discord",
    },
  ];
  router.locale == "ru" ? (reviews = rus_reviews) : (reviews = eng_reviews);

  return (
    <Styles>
      <Container lang={router.locale}>
        {reviews.map((review, index) => (
          <Review key={index}>
            <PersonalInfo>
              <img
                src={
                  review.author_image
                    ? review.author_image
                    : "static/career.svg"
                }
                alt={review.author_name}
              />
              <div>
                <h3>{review.author_name}</h3>
                <div>{review.position}</div>
              </div>
            </PersonalInfo>
            <div>{parse(review.text)}</div>
          </Review>
        ))}
      </Container>
    </Styles>
  );
};

export default WallOfLove;
