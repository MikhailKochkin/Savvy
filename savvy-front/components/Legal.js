import React, { Component } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const TextBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 65%;
  font-size: 1.8rem;
  padding: 0 2%;
  @media (max-width: 800px) {
    width: 100%;
  }
  p {
    margin: 0.5%;
    line-height: 1.5;
  }
  li {
    margin: 0.5%;
    line-height: 1.5;
  }
`;

const Center = styled.div`
  /* border-top: 1px solid #0A2342; */
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  iframe {
    width: 70%;
    height: 80vh;
  }
`;

const Legal = (props) => {
  const router = useRouter();

  return (
    <div>
      {props.name === "privacy" ? (
        <Center>
          {router.locale == "ru" ? (
            <TextBar>
              <h3>Политика обработки персональных данных</h3>
              <p>От 23 июля 2021 года</p>
              <p>
                Настоящая Политика обработки персональных данных (далее —
                Политика) регламентирует отношения, связанные с обработкой ООО
                "БиСэвви" (далее — Администрация) персональных данных лиц,
                использующих Сайт www.besavvy.app.
              </p>
              <p>
                Текст Политики доступен в сети Интернет по адресу{" "}
                <a href="https://www.besavvy.app/legal?name=privacy">
                  www.besavvy.app/legal?name=privacy
                </a>
                . В случае несогласия с условиями Политики Пользователь должен
                немедленно прекратить использование Сайта.
              </p>
              <h3>1. Основные понятия</h3>
              <p>
                Персональные данные — любая информация, относящаяся к
                Пользователю.
              </p>
              <p>Пользователь — физическое лицо, использующее Сайт.</p>
              <p>
                Сайт — автоматизированная информационная система, доступная в
                сети Интернет по сетевому адресу: www.besavvy.app
              </p>
              <p>
                Обработка персональных данных — любое действие (операция) или
                совокупность действий (операций), совершаемых с использованием
                средств автоматизации или без использования таких средств с
                персональными данными, включая сбор, запись, систематизацию,
                накопление, хранение, уточнение (обновление, изменение),
                извлечение, использование, передачу (распространение,
                предоставление, доступ), обезличивание, блокирование, удаление,
                уничтожение персональных данных.
              </p>
              <p>
                Автоматизированная обработка персональных данных — обработка
                персональных данных с помощью средств вычислительной техники.
              </p>
              <p>
                Социальная сеть — сайт в информационно-телекоммуникационной сети
                Интернет, принадлежащий третьим Лицам, предназначенный для
                дистанционной коммуникации людей.
              </p>
              <p>
                Сервис — продукты, услуги, объекты авторского права,
                предоставляемые Администрацией заинтересованным лицам для
                приобретения, использования через Сайт на условиях
                гражданско-правовых договоров.
              </p>
              <p>
                Пользовательское соглашение — гражданско-правовой договор на
                использование Сайта.
              </p>
              <p>
                Способ платежа — информация о банке, платежной системе, средстве
                платежа, применяемых Пользователем для оплаты Сервиса.
              </p>
              <h3>2. Согласие Пользователя на обработку персональных данных</h3>
              <p>
                2.1. Пользователь принимает решение о предоставлении своих
                персональных данных Администрации, принимает условия настоящей
                Политики и дает согласие на обработку своих персональных
                свободно, своей волей и в своем интересе.
              </p>
              <p>
                2.2. Согласие Пользователя на обработку его персональных данным
                считается предоставленным Администрации, если оно направлено при
                регистрации на Сайте путём заполнения формы, доступной на Сайте
                после нажатия кнопки «Регистрация». Пользователь считается
                предоставившим согласие на обработку своих персональных в момент
                нажатия кнопки «Зарегистрироваться».
              </p>
              <p>
                2.2. Согласие Пользователя на обработку Администрацией его
                персональных данных действует со дня предоставления согласия на
                их обработку, определяемого в соответствии с п. 2.1. Политики, в
                течение срока, необходимого для достижения целей обработки
                персональных данных.
              </p>
              <h3>3. Персональные данные, обрабатываемые Администрацией</h3>
              <p>
                3.1. Администрация обрабатывает следующие персональные данные
                Пользователей:
              </p>
              <p>а) При регистрации Пользователя на Сайте:</p>
              <li>адрес электронной почты;</li>
              <li>имя</li>
              <li>фамилия</li>
              <li>файлы куки.</li>
              <p>
                б) При любом использовании Сайта, в том числе в отсутствие
                регистрации Пользователя на Сайте:
              </p>
              <li>файлы куки;</li>
              <li>системы по сбору статистики посещений;</li>
              <li>другие системы сбора обезличенной информации.</li>
              <p>в) При оплате Сервиса:</p>
              <li>адрес электронной почты;</li>
              <li>имя;</li>
              <li>фамилия;</li>
              <li>отчество;</li>
              <li>
                дата, время и сумма исполненного Пользователем денежного
                обязательства;
              </li>
              <li>
                размер и сроки исполнения неисполненного денежного обязательства
                Пользователя;
              </li>
              <li>Кассовый чек и данные Кассового чека;</li>
              <li>Способ платежа;</li>
              <li>файлы куки.</li>
              <p>
                4. Цели и правовые основания обработки Администрацией
                персональных данных
              </p>
              <p>
                4.1. Администрация обрабатывает персональные данные
                Пользователей исключительно в следующих целях:
              </p>
              <p>
                а) При использовании Сайта Пользователем, как при регистрации
                Пользователя на Сайте, так и в отсутствие таковой, Администрация
                обрабатывает персональные данные Пользователя в целях исполнения
                договора на использование Сайта (Пользовательское соглашение). С
                этой целью Администрация обрабатывает персональные данные,
                поименованные в п.п. a) и б) п. 3.1. настоящей Политики.
              </p>
              <p>
                в) В целях заключения и исполнения договоров на использование
                Сервиса зарегистрированным на Сайте Пользователем Администрация
                обрабатывает персональные данные, указанные в п.п. в) п.3.1.
                настоящей Политики.
              </p>
              <h3>5. Общие условия обработки персональных данных</h3>
              <p>
                5.1. Администрация, основываясь на презумпции добросовестности
                Пользователя, исходит из того, что при предоставлении
                персональных данных на Сайте Пользователь:
              </p>
              <p>
                5.1.1. Является дееспособным лицом. В случае недееспособности
                такого лица согласие на обработку персональных данных
                предоставляется законным представителем Пользователя,
                ознакомившемся и согласным с условиями обработки персональных
                данных, указанными в настоящей Политике.
              </p>
              <p>
                5.1.2. Указывает достоверную информацию о себе в объемах,
                необходимых для использования Сайта, и поддерживает
                предоставленные персональные данные в актуальном состоянии.
              </p>
              <p>
                5.1.3. Осознает, что информация на Сайте, размещаемая
                Пользователем о себе, может становиться доступной для других
                Пользователей Сайта, может быть скопирована и распространена
                такими Пользователями.
              </p>
              <p>
                5.1.4. Осознает, что обработка некоторых персональных данных
                основывается на требованиях действующего законодательства
                Российской Федерации, также обработка персональных данных
                необходима в целях исполнения договора с таким Пользователем.
              </p>
              <p>
                5.1.5. В целях правовой защиты интересов Администрации,
                Пользователя или третьих лиц, в целях исполнения требований
                действующего законодательства, либо исполнения договора с
                Пользователем Администрация вправе обрабатывать лог-файлы о
                действиях, совершенных Пользователем в рамках использования
                Сайта, иных персональных данных, необходимых для указанных
                целей, в течение срока, определяемого соответствующей целью.
              </p>
              <p>
                5.1.6. Ознакомлен с настоящей Политикой, выражает свое
                информированное и осознанное согласие с ней.
              </p>
              <p>
                5.2. Персональные данные обрабатываются с использованием
                автоматизированных систем, за исключением случаев, когда
                неавтоматизированная обработка персональных данных необходима в
                связи с исполнением требований действующего законодательства
                Российской Федерации.
              </p>
              <p>
                5.3. Хранение персональных данных Пользователей осуществляется
                на электронных носителях. При обработке персональных данных с
                целью исполнения обязательств по договорам с Пользователем,
                Администрация может извлекать персональные данные и хранить их
                на материальных носителях. Хранение таких персональных данных
                осуществляется в течение срока, установленного законодательством
                Российской Федерации об образовании и архивном деле.
              </p>
              <p>
                5.4. Уточнение, изменение персональных данных может
                осуществляться Пользователем самостоятельно с использованием
                Личного кабинета.{" "}
              </p>
              <p>
                5.5. Прекращение обработки персональных данных Пользователя,
                блокировка и уничтожение персональных данных осуществляется в
                следующих случаях:
              </p>
              <p>
                а) удаление Пользователем персональных данных в Личном кабинете;
              </p>
              <p>
                б) получение Администрацией от Пользователя отзыва согласия на
                обработку персональных данных;
              </p>
              <p>
                в) получение Администрацией от Пользователя требования об
                уничтожении или блокировке персональных данных;
              </p>
              <p>
                г) истечение срока действия согласия Пользователя на обработку
                его персональных данных.
              </p>
              <p>
                5.10. Администрация принимает необходимые и достаточные
                правовые, организационные и технические меры для защиты
                персональных данных от неправомерного или случайного доступа,
                уничтожения, изменения, блокирования, копирования,
                распространения, а также от иных неправомерных действий третьих
                лиц, направленных в отношении персональных данных. В частности,
                Администрация применяет организационные и технические меры по
                обеспечению безопасности персональных данных при их обработке,
                контроль фактов несанкционированного доступа к персональным
                данным и принятие мер по недопущению подобных инцидентов в
                дальнейшем, контроль за принимаемыми мерами по обеспечению
                безопасности персональных данных и уровнем защищенности
                персональных данных. Для авторизации доступа к Личному кабинету
                Пользователь использует логин (адрес электронной почты) и пароль
                Пользователя. Ответственность за сохранность данной информации
                несет Пользователь. Пользователь не вправе передавать
                собственный логин и пароль третьим лицам, а также обязан
                предпринимать меры по обеспечению их конфиденциальности.
              </p>
              <h3>6. Права Пользователя в отношении персональных данных</h3>
              <p>6.1. Пользователь вправе:</p>
              <p>
                6.1.1. По своему усмотрению, своей волей и в своём интересе
                предоставлять Администрации персональные данные для их обработки
                на условиях, указанных в настоящей Политике;
              </p>
              <p>
                6.1.2. Самостоятельно предоставлять, изменять и удалять
                персональные данные в Личном кабинете при условии, что такие
                изменения и исправления содержат актуальную и достоверную
                информацию;
              </p>
              <p>
                6.1.3. Обращаться к Администрации с требованиями, в том числе об
                уничтожении персональных данных, отзыве согласия на обработку,
                блокировке персональных данных. Требование предъявляется в
                порядке, предусмотренном в п.6.2. Политики.
              </p>
              <p>
                6.2. Пользователь вправе направлять Администрации свои
                требования и запросы в форме удобочитаемого электронного образа
                документа. Документ должен быть направлен с адреса электронной
                почты Пользователя, указанного им при регистрации на Сайте или в
                договоре на использование Сервиса, по адресу электронной почты
                Администрации mail@besavvy.app.
              </p>
              <p>
                6.3. Направляемые Пользователем требования и запросы должны
                содержать следующую информацию:
              </p>
              <p>а) Фамилия, имя, отчество Пользователя;</p>
              <p>
                б) Регистрационные данные Пользователя на Сайте (если
                Пользователь зарегистрирован на момент направления требования
                или запроса);
              </p>
              <p>в) суть требования или запроса Пользователя;</p>
              <p>
                6.4. Администрация рассматривает полученные от Пользователя
                требования и запросы на предмет наличия обязательных реквизитов,
                обоснованности требования или обращения. В случае обоснованности
                требования Пользователя Администрация удовлетворяет его в
                течение 30 дней с даты поступления. В любом случае Администрация
                направляет ответ Пользователю в срок, не превышающий 30 дней с
                даты поступления требования или обращения. Ответ направляется
                Пользователю в форме, соответствующей форме требования или
                обращения Пользователя.
              </p>
              <h3>7. Изменение Политики</h3>
              <p>
                7.1. Администрация оставляет за собой право вносить изменения в
                Политику. На Пользователе лежит обязанность при каждом
                использовании Сайта знакомиться с текстом Политики.
              </p>
            </TextBar>
          ) : (
            <TextBar>
              <h1>Privacy Policy</h1>
              <p>Last updated: March 11, 2023</p>
              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You.
              </p>
              <p>
                We use Your Personal data to provide and improve the Service. By
                using the Service, You agree to the collection and use of
                information in accordance with this Privacy Policy. This Privacy
                Policy has been created with the help of the{" "}
                <a
                  href="https://www.privacypolicies.com/blog/privacy-policy-template/"
                  target="_blank"
                >
                  Privacy Policy Template
                </a>
                .
              </p>
              <h1>Interpretation and Definitions</h1>
              <h2>Interpretation</h2>
              <p>
                The words of which the initial letter is capitalized have
                meanings defined under the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
              </p>
              <h2>Definitions</h2>
              <p>For the purposes of this Privacy Policy:</p>
              <ul>
                <li>
                  <p>
                    <strong>Account</strong> means a unique account created for
                    You to access our Service or parts of our Service.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cookies</strong> are small files that are placed on
                    Your computer, mobile device or any other device by a
                    website, containing the details of Your browsing history on
                    that website among its many uses.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Device</strong> means any device that can access the
                    Service such as a computer, a cellphone or a digital tablet.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Personal Data</strong> is any information that
                    relates to an identified or identifiable individual.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Service</strong> refers to the Website.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Service Provider</strong> means any natural or legal
                    person who processes the data on behalf of the Company. It
                    refers to third-party companies or individuals employed by
                    the Company to facilitate the Service, to provide the
                    Service on behalf of the Company, to perform services
                    related to the Service or to assist the Company in analyzing
                    how the Service is used.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Usage Data</strong> refers to data collected
                    automatically, either generated by the use of the Service or
                    from the Service infrastructure itself (for example, the
                    duration of a page visit).
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Website</strong> refers to BeSavvy, accessible from{" "}
                    <a
                      href="https://besavvy.app/en"
                      rel="external nofollow noopener"
                      target="_blank"
                    >
                      https://besavvy.app/
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>You</strong> means the individual accessing or using
                    the Service, or the company, or other legal entity on behalf
                    of which such individual is accessing or using the Service,
                    as applicable.
                  </p>
                </li>
              </ul>
              <h1>Collecting and Using Your Personal Data</h1>
              <h2>Types of Data Collected</h2>
              <h3>Personal Data</h3>
              <p>
                While using Our Service, We may ask You to provide Us with
                certain personally identifiable information that can be used to
                contact or identify You. Personally identifiable information may
                include, but is not limited to:
              </p>
              <ul>
                <li>
                  <p>Email address</p>
                </li>
                <li>
                  <p>First name and last name</p>
                </li>
                <li>
                  <p>Usage Data</p>
                </li>
              </ul>
              <h3>Usage Data</h3>
              <p>
                Usage Data is collected automatically when using the Service.
              </p>
              <p>
                Usage Data may include information such as Your Device's
                Internet Protocol address (e.g. IP address), browser type,
                browser version, the pages of our Service that You visit, the
                time and date of Your visit, the time spent on those pages,
                unique device identifiers and other diagnostic data.
              </p>
              <p>
                When You access the Service by or through a mobile device, We
                may collect certain information automatically, including, but
                not limited to, the type of mobile device You use, Your mobile
                device unique ID, the IP address of Your mobile device, Your
                mobile operating system, the type of mobile Internet browser You
                use, unique device identifiers and other diagnostic data.
              </p>
              <p>
                We may also collect information that Your browser sends whenever
                You visit our Service or when You access the Service by or
                through a mobile device.
              </p>
              <h3>Tracking Technologies and Cookies</h3>
              <p>
                We use Cookies and similar tracking technologies to track the
                activity on Our Service and store certain information. Tracking
                technologies used are beacons, tags, and scripts to collect and
                track information and to improve and analyze Our Service. The
                technologies We use may include:
              </p>
              <ul>
                <li>
                  <strong>Cookies or Browser Cookies.</strong> A cookie is a
                  small file placed on Your Device. You can instruct Your
                  browser to refuse all Cookies or to indicate when a Cookie is
                  being sent. However, if You do not accept Cookies, You may not
                  be able to use some parts of our Service. Unless you have
                  adjusted Your browser setting so that it will refuse Cookies,
                  our Service may use Cookies.
                </li>

                <li>
                  <strong>Web Beacons.</strong> Certain sections of our Service
                  and our emails may contain small electronic files known as web
                  beacons (also referred to as clear gifs, pixel tags, and
                  single-pixel gifs) that permit the Company, for example, to
                  count users who have visited those pages or opened an email
                  and for other related website statistics (for example,
                  recording the popularity of a certain section and verifying
                  system and server integrity).
                </li>
              </ul>
              <p>
                Cookies can be "Persistent" or "Session" Cookies. Persistent
                Cookies remain on Your personal computer or mobile device when
                You go offline, while Session Cookies are deleted as soon as You
                close Your web browser. Learn more about cookies:{" "}
                <a
                  href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                  target="_blank"
                >
                  Cookies by PrivacyPolicies Generator
                </a>
                .
              </p>
              <p>
                We use both Session and Persistent Cookies for the purposes set
                out below:
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Necessary / Essential Cookies</strong>
                  </p>
                  <p>Type: Session Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies are essential to provide You with
                    services available through the Website and to enable You to
                    use some of its features. They help to authenticate users
                    and prevent fraudulent use of user accounts. Without these
                    Cookies, the services that You have asked for cannot be
                    provided, and We only use these Cookies to provide You with
                    those services.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cookies Policy / Notice Acceptance Cookies</strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies identify if users have accepted the
                    use of cookies on the Website.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Functionality Cookies</strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies allow us to remember choices You make
                    when You use the Website, such as remembering your login
                    details or language preference. The purpose of these Cookies
                    is to provide You with a more personal experience and to
                    avoid You having to re-enter your preferences every time You
                    use the Website.
                  </p>
                </li>
              </ul>
              <p>
                For more information about the cookies we use and your choices
                regarding cookies, please visit our Cookies Policy or the
                Cookies section of our Privacy Policy.
              </p>
              <h2>Use of Your Personal Data</h2>
              <p>
                The Company may use Personal Data for the following purposes:
              </p>
              <ul>
                <li>
                  <p>
                    <strong>To provide and maintain our Service</strong>,
                    including to monitor the usage of our Service.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>To manage Your Account:</strong> to manage Your
                    registration as a user of the Service. The Personal Data You
                    provide can give You access to different functionalities of
                    the Service that are available to You as a registered user.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>For the performance of a contract:</strong> the
                    development, compliance and undertaking of the purchase
                    contract for the products, items or services You have
                    purchased or of any other contract with Us through the
                    Service.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>To contact You:</strong> To contact You by email,
                    telephone calls, SMS, or other equivalent forms of
                    electronic communication, such as a mobile application's
                    push notifications regarding updates or informative
                    communications related to the functionalities, products or
                    contracted services, including the security updates, when
                    necessary or reasonable for their implementation.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>To provide You</strong> with news, special offers
                    and general information about other goods, services and
                    events which we offer that are similar to those that you
                    have already purchased or enquired about unless You have
                    opted not to receive such information.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>To manage Your requests:</strong> To attend and
                    manage Your requests to Us.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>For business transfers:</strong> We may use Your
                    information to evaluate or conduct a merger, divestiture,
                    restructuring, reorganization, dissolution, or other sale or
                    transfer of some or all of Our assets, whether as a going
                    concern or as part of bankruptcy, liquidation, or similar
                    proceeding, in which Personal Data held by Us about our
                    Service users is among the assets transferred.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>For other purposes</strong>: We may use Your
                    information for other purposes, such as data analysis,
                    identifying usage trends, determining the effectiveness of
                    our promotional campaigns and to evaluate and improve our
                    Service, products, services, marketing and your experience.
                  </p>
                </li>
              </ul>
              <p>
                We may share Your personal information in the following
                situations:
              </p>
              <ul>
                <li>
                  <strong>With Service Providers:</strong> We may share Your
                  personal information with Service Providers to monitor and
                  analyze the use of our Service, to contact You.
                </li>
                <li>
                  <strong>For business transfers:</strong> We may share or
                  transfer Your personal information in connection with, or
                  during negotiations of, any merger, sale of Company assets,
                  financing, or acquisition of all or a portion of Our business
                  to another company.
                </li>
                <li>
                  <strong>With Affiliates:</strong> We may share Your
                  information with Our affiliates, in which case we will require
                  those affiliates to honor this Privacy Policy. Affiliates
                  include Our parent company and any other subsidiaries, joint
                  venture partners or other companies that We control or that
                  are under common control with Us.
                </li>
                <li>
                  <strong>With business partners:</strong> We may share Your
                  information with Our business partners to offer You certain
                  products, services or promotions.
                </li>
                <li>
                  <strong>With other users:</strong> when You share personal
                  information or otherwise interact in the public areas with
                  other users, such information may be viewed by all users and
                  may be publicly distributed outside.
                </li>
                <li>
                  <strong>With Your consent</strong>: We may disclose Your
                  personal information for any other purpose with Your consent.
                </li>
              </ul>
              <h2>Retention of Your Personal Data</h2>
              <p>
                The Company will retain Your Personal Data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use Your Personal Data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p>
                The Company will also retain Usage Data for internal analysis
                purposes. Usage Data is generally retained for a shorter period
                of time, except when this data is used to strengthen the
                security or to improve the functionality of Our Service, or We
                are legally obligated to retain this data for longer time
                periods.
              </p>
              <h2>Transfer of Your Personal Data</h2>
              <p>
                Your information, including Personal Data, is processed at the
                Company's operating offices and in any other places where the
                parties involved in the processing are located. It means that
                this information may be transferred to — and maintained on —
                computers located outside of Your state, province, country or
                other governmental jurisdiction where the data protection laws
                may differ than those from Your jurisdiction.
              </p>
              <p>
                Your consent to this Privacy Policy followed by Your submission
                of such information represents Your agreement to that transfer.
              </p>
              <p>
                The Company will take all steps reasonably necessary to ensure
                that Your data is treated securely and in accordance with this
                Privacy Policy and no transfer of Your Personal Data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of Your data and other
                personal information.
              </p>
              <h2>Disclosure of Your Personal Data</h2>
              <h3>Business Transactions</h3>
              <p>
                If the Company is involved in a merger, acquisition or asset
                sale, Your Personal Data may be transferred. We will provide
                notice before Your Personal Data is transferred and becomes
                subject to a different Privacy Policy.
              </p>
              <h3>Law enforcement</h3>
              <p>
                Under certain circumstances, the Company may be required to
                disclose Your Personal Data if required to do so by law or in
                response to valid requests by public authorities (e.g. a court
                or a government agency).
              </p>
              <h3>Other legal requirements</h3>
              <p>
                The Company may disclose Your Personal Data in the good faith
                belief that such action is necessary to:
              </p>
              <ul>
                <li>Comply with a legal obligation</li>
                <li>
                  Protect and defend the rights or property of the Company
                </li>
                <li>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service
                </li>
                <li>
                  Protect the personal safety of Users of the Service or the
                  public
                </li>
                <li>Protect against legal liability</li>
              </ul>
              <h2>Security of Your Personal Data</h2>
              <p>
                The security of Your Personal Data is important to Us, but
                remember that no method of transmission over the Internet, or
                method of electronic storage is 100% secure. While We strive to
                use commercially acceptable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
              </p>
              <h1>Children's Privacy</h1>
              <p>
                Our Service does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 13. If You are a parent or guardian and
                You are aware that Your child has provided Us with Personal
                Data, please contact Us. If We become aware that We have
                collected Personal Data from anyone under the age of 13 without
                verification of parental consent, We take steps to remove that
                information from Our servers.
              </p>
              <p>
                If We need to rely on consent as a legal basis for processing
                Your information and Your country requires consent from a
                parent, We may require Your parent's consent before We collect
                and use that information.
              </p>
              <h1>Links to Other Websites</h1>
              <p>
                Our Service may contain links to other websites that are not
                operated by Us. If You click on a third party link, You will be
                directed to that third party's site. We strongly advise You to
                review the Privacy Policy of every site You visit.
              </p>
              <p>
                We have no control over and assume no responsibility for the
                content, privacy policies or practices of any third party sites
                or services.
              </p>
              <h1>Changes to this Privacy Policy</h1>
              <p>
                We may update Our Privacy Policy from time to time. We will
                notify You of any changes by posting the new Privacy Policy on
                this page.
              </p>
              <p>
                We will let You know via email and/or a prominent notice on Our
                Service, prior to the change becoming effective and update the
                "Last updated" date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
              <h1>Contact Us</h1>
              <p>
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <ul>
                <li>Email: mike@besavvy.app</li>
              </ul>
            </TextBar>
          )}
        </Center>
      ) : null}
      {props.name === "terms" ? (
        <Center>
          {router.locale == "en" ? (
            <TextBar>
              <h2>Website Terms of Use</h2>

              <p>Version 1.0</p>

              <p>
                The BeSavyy website located at https://besavvy.app/ is a
                copyrighted work belonging to BeSavyy. Certain features of the
                Site may be subject to additional guidelines, terms, or rules,
                which will be posted on the Site in connection with such
                features.
              </p>

              <p>
                All such additional terms, guidelines, and rules are
                incorporated by reference into these Terms.
              </p>

              <p>
                These Terms of Use described the legally binding terms and
                conditions that oversee your use of the Site. BY LOGGING INTO
                THE SITE, YOU ARE BEING COMPLIANT THAT THESE TERMS and you
                represent that you have the authority and capacity to enter into
                these Terms. YOU SHOULD BE AT LEAST 18 YEARS OF AGE TO ACCESS
                THE SITE. IF YOU DISAGREE WITH ALL OF THE PROVISION OF THESE
                TERMS, DO NOT LOG INTO AND/OR USE THE SITE.
              </p>

              <p>
                These terms require the use of arbitration Section 10.2 on an
                individual basis to resolve disputes and also limit the remedies
                available to you in the event of a dispute. These Terms of Use
                were created with the help of the{" "}
                <a href="[https://www.termsofusegenerator.net](https://www.termsofusegenerator.net/)">
                  Terms Of Use Generator
                </a>
                .
              </p>

              <h2>Access to the Site</h2>

              <p>
                <strong>Subject to these Terms.</strong> Company grants you a
                non-transferable, non-exclusive, revocable, limited license to
                access the Site solely for your own personal, noncommercial use.
              </p>

              <p>
                <strong>Certain Restrictions.</strong> The rights approved to
                you in these Terms are subject to the following restrictions:
                (a) you shall not sell, rent, lease, transfer, assign,
                distribute, host, or otherwise commercially exploit the Site;
                (b) you shall not change, make derivative works of, disassemble,
                reverse compile or reverse engineer any part of the Site; (c)
                you shall not access the Site in order to build a similar or
                competitive website; and (d) except as expressly stated herein,
                no part of the Site may be copied, reproduced, distributed,
                republished, downloaded, displayed, posted or transmitted in any
                form or by any means unless otherwise indicated, any future
                release, update, or other addition to functionality of the Site
                shall be subject to these Terms.  All copyright and other
                proprietary notices on the Site must be retained on all copies
                thereof.
              </p>

              <p>
                Company reserves the right to change, suspend, or cease the Site
                with or without notice to you.  You approved that Company will
                not be held liable to you or any third-party for any change,
                interruption, or termination of the Site or any part.
              </p>

              <p>
                <strong>No Support or Maintenance.</strong> You agree that
                Company will have no obligation to provide you with any support
                in connection with the Site.
              </p>

              <p>
                Excluding any User Content that you may provide, you are aware
                that all the intellectual property rights, including copyrights,
                patents, trademarks, and trade secrets, in the Site and its
                content are owned by Company or Company’s suppliers. Note that
                these Terms and access to the Site do not give you any rights,
                title or interest in or to any intellectual property rights,
                except for the limited access rights expressed in Section 2.1.
                Company and its suppliers reserve all rights not granted in
                these Terms.
              </p>

              <h2>Third-Party Links & Ads; Other Users</h2>

              <p>
                <strong>Third-Party Links & Ads.</strong> The Site may contain
                links to third-party websites and services, and/or display
                advertisements for third-parties.  Such Third-Party Links & Ads
                are not under the control of Company, and Company is not
                responsible for any Third-Party Links & Ads.  Company provides
                access to these Third-Party Links & Ads only as a convenience to
                you, and does not review, approve, monitor, endorse, warrant, or
                make any representations with respect to Third-Party Links &
                Ads.  You use all Third-Party Links & Ads at your own risk, and
                should apply a suitable level of caution and discretion in doing
                so. When you click on any of the Third-Party Links & Ads, the
                applicable third party’s terms and policies apply, including the
                third party’s privacy and data gathering practices.
              </p>

              <p>
                <strong>Other Users.</strong> Each Site user is solely
                responsible for any and all of its own User Content.  Because we
                do not control User Content, you acknowledge and agree that we
                are not responsible for any User Content, whether provided by
                you or by others.  You agree that Company will not be
                responsible for any loss or damage incurred as the result of any
                such interactions.  If there is a dispute between you and any
                Site user, we are under no obligation to become involved.
              </p>

              <p>
                You hereby release and forever discharge the Company and our
                officers, employees, agents, successors, and assigns from, and
                hereby waive and relinquish, each and every past, present and
                future dispute, claim, controversy, demand, right, obligation,
                liability, action and cause of action of every kind and nature,
                that has arisen or arises directly or indirectly out of, or that
                relates directly or indirectly to, the Site. If you are a
                California resident, you hereby waive California civil code
                section 1542 in connection with the foregoing, which states: "a
                general release does not extend to claims which the creditor
                does not know or suspect to exist in his or her favor at the
                time of executing the release, which if known by him or her must
                have materially affected his or her settlement with the debtor."
              </p>

              <p>
                <strong>Cookies and Web Beacons.</strong> Like any other
                website, BeSavyy uses ‘cookies’. These cookies are used to store
                information including visitors’ preferences, and the pages on
                the website that the visitor accessed or visited. The
                information is used to optimize the users’ experience by
                customizing our web page content based on visitors’ browser type
                and/or other information.
              </p>

              <h2>Disclaimers</h2>

              <p>
                The site is provided on an "as-is" and "as available" basis, and
                company and our suppliers expressly disclaim any and all
                warranties and conditions of any kind, whether express, implied,
                or statutory, including all warranties or conditions of
                merchantability, fitness for a particular purpose, title, quiet
                enjoyment, accuracy, or non-infringement.  We and our suppliers
                make not guarantee that the site will meet your requirements,
                will be available on an uninterrupted, timely, secure, or
                error-free basis, or will be accurate, reliable, free of viruses
                or other harmful code, complete, legal, or safe.  If applicable
                law requires any warranties with respect to the site, all such
                warranties are limited in duration to ninety (90) days from the
                date of first use.
              </p>

              <p>
                Some jurisdictions do not allow the exclusion of implied
                warranties, so the above exclusion may not apply to you.  Some
                jurisdictions do not allow limitations on how long an implied
                warranty lasts, so the above limitation may not apply to you.
              </p>

              <h2>Limitation on Liability</h2>

              <p>
                To the maximum extent permitted by law, in no event shall
                company or our suppliers be liable to you or any third-party for
                any lost profits, lost data, costs of procurement of substitute
                products, or any indirect, consequential, exemplary, incidental,
                special or punitive damages arising from or relating to these
                terms or your use of, or incapability to use the site even if
                company has been advised of the possibility of such damages. 
                Access to and use of the site is at your own discretion and
                risk, and you will be solely responsible for any damage to your
                device or computer system, or loss of data resulting therefrom.
              </p>

              <p>
                To the maximum extent permitted by law, notwithstanding anything
                to the contrary contained herein, our liability to you for any
                damages arising from or related to this agreement, will at all
                times be limited to a maximum of fifty U.S. dollars (u.s. $50).
                The existence of more than one claim will not enlarge this
                limit.  You agree that our suppliers will have no liability of
                any kind arising from or relating to this agreement.
              </p>

              <p>
                Some jurisdictions do not allow the limitation or exclusion of
                liability for incidental or consequential damages, so the above
                limitation or exclusion may not apply to you.
              </p>

              <p>
                <strong>Term and Termination.</strong> Subject to this Section,
                these Terms will remain in full force and effect while you use
                the Site.  We may suspend or terminate your rights to use the
                Site at any time for any reason at our sole discretion,
                including for any use of the Site in violation of these Terms. 
                Upon termination of your rights under these Terms, your Account
                and right to access and use the Site will terminate
                immediately.  You understand that any termination of your
                Account may involve deletion of your User Content associated
                with your Account from our live databases.  Company will not
                have any liability whatsoever to you for any termination of your
                rights under these Terms.  Even after your rights under these
                Terms are terminated, the following provisions of these Terms
                will remain in effect: Sections 2 through 2.5, Section 3 and
                Sections 4 through 10.
              </p>

              <h2>Copyright Policy.</h2>

              <p>
                Company respects the intellectual property of others and asks
                that users of our Site do the same.  In connection with our
                Site, we have adopted and implemented a policy respecting
                copyright law that provides for the removal of any infringing
                materials and for the termination of users of our online Site
                who are repeated infringers of intellectual property rights,
                including copyrights.  If you believe that one of our users is,
                through the use of our Site, unlawfully infringing the
                copyright(s) in a work, and wish to have the allegedly
                infringing material removed, the following information in the
                form of a written notification (pursuant to 17 U.S.C. § 512(c))
                must be provided to our designated Copyright Agent:
              </p>

              <ul>
                <li>your physical or electronic signature;</li>
                <li>
                  identification of the copyrighted work(s) that you claim to
                  have been infringed;
                </li>
                <li>
                  identification of the material on our services that you claim
                  is infringing and that you request us to remove;
                </li>
                <li>
                  sufficient information to permit us to locate such material;
                </li>
                <li>your address, telephone number, and e-mail address;</li>
                <li>
                  a statement that you have a good faith belief that use of the
                  objectionable material is not authorized by the copyright
                  owner, its agent, or under the law; and
                </li>
                <li>
                  a statement that the information in the notification is
                  accurate, and under penalty of perjury, that you are either
                  the owner of the copyright that has allegedly been infringed
                  or that you are authorized to act on behalf of the copyright
                  owner.
                </li>
              </ul>

              <p>
                Please note that, pursuant to 17 U.S.C. § 512(f), any
                misrepresentation of material fact in a written notification
                automatically subjects the complaining party to liability for
                any damages, costs and attorney’s fees incurred by us in
                connection with the written notification and allegation of
                copyright infringement.
              </p>

              <h2>General</h2>

              <p>
                These Terms are subject to occasional revision, and if we make
                any substantial changes, we may notify you by sending you an
                e-mail to the last e-mail address you provided to us and/or by
                prominently posting notice of the changes on our Site.  You are
                responsible for providing us with your most current e-mail
                address.  In the event that the last e-mail address that you
                have provided us is not valid our dispatch of the e-mail
                containing such notice will nonetheless constitute effective
                notice of the changes described in the notice.  Any changes to
                these Terms will be effective upon the earliest of thirty (30)
                calendar days following our dispatch of an e-mail notice to you
                or thirty (30) calendar days following our posting of notice of
                the changes on our Site.  These changes will be effective
                immediately for new users of our Site.  Continued use of our
                Site following notice of such changes shall indicate your
                acknowledgement of such changes and agreement to be bound by the
                terms and conditions of such changes. Dispute Resolution. Please
                read this Arbitration Agreement carefully. It is part of your
                contract with Company and affects your rights.  It contains
                procedures for MANDATORY BINDING ARBITRATION AND A CLASS ACTION
                WAIVER.
              </p>

              <p>
                <strong>Applicability of Arbitration Agreement.</strong> All
                claims and disputes in connection with the Terms or the use of
                any product or service provided by the Company that cannot be
                resolved informally or in small claims court shall be resolved
                by binding arbitration on an individual basis under the terms of
                this Arbitration Agreement.  Unless otherwise agreed to, all
                arbitration proceedings shall be held in English.  This
                Arbitration Agreement applies to you and the Company, and to any
                subsidiaries, affiliates, agents, employees, predecessors in
                interest, successors, and assigns, as well as all authorized or
                unauthorized users or beneficiaries of services or goods
                provided under the Terms.
              </p>

              <p>
                <strong>
                  Notice Requirement and Informal Dispute Resolution.
                </strong>{" "}
                Before either party may seek arbitration, the party must first
                send to the other party a written Notice of Dispute describing
                the nature and basis of the claim or dispute, and the requested
                relief.  A Notice to the Company should be sent to:
                [https://besavvy.app/](https://besavvy.app/). After the Notice
                is received, you and the Company may attempt to resolve the
                claim or dispute informally.  If you and the Company do not
                resolve the claim or dispute within thirty (30) days after the
                Notice is received, either party may begin an arbitration
                proceeding.  The amount of any settlement offer made by any
                party may not be disclosed to the arbitrator until after the
                arbitrator has determined the amount of the award to which
                either party is entitled.
              </p>

              <p>
                <strong>Arbitration Rules.</strong> Arbitration shall be
                initiated through the American Arbitration Association, an
                established alternative dispute resolution provider that offers
                arbitration as set forth in this section.  If AAA is not
                available to arbitrate, the parties shall agree to select an
                alternative ADR Provider.  The rules of the ADR Provider shall
                govern all aspects of the arbitration except to the extent such
                rules are in conflict with the Terms.  The AAA Consumer
                Arbitration Rules governing the arbitration are available online
                at [adr.org](http://adr.org/) or by calling the AAA at
                1-800-778-7879.  The arbitration shall be conducted by a single,
                neutral arbitrator.  Any claims or disputes where the total
                amount of the award sought is less than Ten Thousand U.S.
                Dollars (US $10,000.00) may be resolved through binding
                non-appearance-based arbitration, at the option of the party
                seeking relief.  For claims or disputes where the total amount
                of the award sought is Ten Thousand U.S. Dollars (US $10,000.00)
                or more, the right to a hearing will be determined by the
                Arbitration Rules.  Any hearing will be held in a location
                within 100 miles of your residence, unless you reside outside of
                the United States, and unless the parties agree otherwise.  If
                you reside outside of the U.S., the arbitrator shall give the
                parties reasonable notice of the date, time and place of any
                oral hearings. Any judgment on the award rendered by the
                arbitrator may be entered in any court of competent
                jurisdiction.  If the arbitrator grants you an award that is
                greater than the last settlement offer that the Company made to
                you prior to the initiation of arbitration, the Company will pay
                you the greater of the award or $2,500.00.  Each party shall
                bear its own costs and disbursements arising out of the
                arbitration and shall pay an equal share of the fees and costs
                of the ADR Provider.
              </p>

              <p>
                <strong>
                  Additional Rules for Non-Appearance Based Arbitration.
                </strong>{" "}
                If non-appearance based arbitration is elected, the arbitration
                shall be conducted by telephone, online and/or based solely on
                written submissions; the specific manner shall be chosen by the
                party initiating the arbitration.  The arbitration shall not
                involve any personal appearance by the parties or witnesses
                unless otherwise agreed by the parties.
              </p>

              <p>
                <strong>Time Limits.</strong> If you or the Company pursues
                arbitration, the arbitration action must be initiated and/or
                demanded within the statute of limitations and within any
                deadline imposed under the AAA Rules for the pertinent claim.
              </p>

              <p>
                <strong>Authority of Arbitrator.</strong> If arbitration is
                initiated, the arbitrator will decide the rights and liabilities
                of you and the Company, and the dispute will not be consolidated
                with any other matters or joined with any other cases or
                parties.  The arbitrator shall have the authority to grant
                motions dispositive of all or part of any claim.  The arbitrator
                shall have the authority to award monetary damages, and to grant
                any non-monetary remedy or relief available to an individual
                under applicable law, the AAA Rules, and the Terms.  The
                arbitrator shall issue a written award and statement of decision
                describing the essential findings and conclusions on which the
                award is based.  The arbitrator has the same authority to award
                relief on an individual basis that a judge in a court of law
                would have.  The award of the arbitrator is final and binding
                upon you and the Company.
              </p>

              <p>
                <strong>Waiver of Jury Trial.</strong> THE PARTIES HEREBY WAIVE
                THEIR CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND
                HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY, instead electing
                that all claims and disputes shall be resolved by arbitration
                under this Arbitration Agreement.  Arbitration procedures are
                typically more limited, more efficient and less expensive than
                rules applicable in a court and are subject to very limited
                review by a court.  In the event any litigation should arise
                between you and the Company in any state or federal court in a
                suit to vacate or enforce an arbitration award or otherwise, YOU
                AND THE COMPANY WAIVE ALL RIGHTS TO A JURY TRIAL, instead
                electing that the dispute be resolved by a judge.
              </p>

              <p>
                <strong>Waiver of Class or Consolidated Actions.</strong> All
                claims and disputes within the scope of this arbitration
                agreement must be arbitrated or litigated on an individual basis
                and not on a class basis, and claims of more than one customer
                or user cannot be arbitrated or litigated jointly or
                consolidated with those of any other customer or user.
              </p>

              <p>
                <strong>Confidentiality.</strong> All aspects of the arbitration
                proceeding shall be strictly confidential.  The parties agree to
                maintain confidentiality unless otherwise required by law.  This
                paragraph shall not prevent a party from submitting to a court
                of law any information necessary to enforce this Agreement, to
                enforce an arbitration award, or to seek injunctive or equitable
                relief.
              </p>

              <p>
                <strong>Severability.</strong> If any part or parts of this
                Arbitration Agreement are found under the law to be invalid or
                unenforceable by a court of competent jurisdiction, then such
                specific part or parts shall be of no force and effect and shall
                be severed and the remainder of the Agreement shall continue in
                full force and effect.
              </p>

              <p>
                <strong>Right to Waive.</strong> Any or all of the rights and
                limitations set forth in this Arbitration Agreement may be
                waived by the party against whom the claim is asserted.  Such
                waiver shall not waive or affect any other portion of this
                Arbitration Agreement.
              </p>

              <p>
                <strong>Survival of Agreement.</strong> This Arbitration
                Agreement will survive the termination of your relationship with
                Company.
              </p>

              <p>
                <strong>Small Claims Court.</strong> Nonetheless the foregoing,
                either you or the Company may bring an individual action in
                small claims court.
              </p>

              <p>
                <strong>Emergency Equitable Relief.</strong> Anyhow the
                foregoing, either party may seek emergency equitable relief
                before a state or federal court in order to maintain the status
                quo pending arbitration.  A request for interim measures shall
                not be deemed a waiver of any other rights or obligations under
                this Arbitration Agreement.
              </p>

              <p>
                <strong>Claims Not Subject to Arbitration.</strong>{" "}
                Notwithstanding the foregoing, claims of defamation, violation
                of the Computer Fraud and Abuse Act, and infringement or
                misappropriation of the other party’s patent, copyright,
                trademark or trade secrets shall not be subject to this
                Arbitration Agreement.
              </p>

              <p>
                In any circumstances where the foregoing Arbitration Agreement
                permits the parties to litigate in court, the parties hereby
                agree to submit to the personal jurisdiction of the courts
                located within Netherlands County, California, for such
                purposes.
              </p>

              <p>
                The Site may be subject to U.S. export control laws and may be
                subject to export or import regulations in other countries. You
                agree not to export, re-export, or transfer, directly or
                indirectly, any U.S. technical data acquired from Company, or
                any products utilizing such data, in violation of the United
                States export laws or regulations.
              </p>

              <p>
                Company is located at the address in Section 10.8. If you are a
                California resident, you may report complaints to the Complaint
                Assistance Unit of the Division of Consumer Product of the
                California Department of Consumer Affairs by contacting them in
                writing at 400 R Street, Sacramento, CA 95814, or by telephone
                at (800) 952-5210.
              </p>

              <p>
                <strong>Electronic Communications.</strong> The communications
                between you and Company use electronic means, whether you use
                the Site or send us emails, or whether Company posts notices on
                the Site or communicates with you via email. For contractual
                purposes, you (a) consent to receive communications from Company
                in an electronic form; and (b) agree that all terms and
                conditions, agreements, notices, disclosures, and other
                communications that Company provides to you electronically
                satisfy any legal obligation that such communications would
                satisfy if it were be in a hard copy writing.
              </p>

              <p>
                <strong>Entire Terms.</strong> These Terms constitute the entire
                agreement between you and us regarding the use of the Site. Our
                failure to exercise or enforce any right or provision of these
                Terms shall not operate as a waiver of such right or provision.
                The section titles in these Terms are for convenience only and
                have no legal or contractual effect. The word "including" means
                "including without limitation". If any provision of these Terms
                is held to be invalid or unenforceable, the other provisions of
                these Terms will be unimpaired and the invalid or unenforceable
                provision will be deemed modified so that it is valid and
                enforceable to the maximum extent permitted by law.  Your
                relationship to Company is that of an independent contractor,
                and neither party is an agent or partner of the other.  These
                Terms, and your rights and obligations herein, may not be
                assigned, subcontracted, delegated, or otherwise transferred by
                you without Company’s prior written consent, and any attempted
                assignment, subcontract, delegation, or transfer in violation of
                the foregoing will be null and void.  Company may freely assign
                these Terms.  The terms and conditions set forth in these Terms
                shall be binding upon assignees.
              </p>

              <p>
                <strong>Your Privacy.</strong> Please read our Privacy Policy.
              </p>

              <p>
                <strong>Copyright/Trademark Information.</strong> Copyright ©.
                All rights reserved.  All trademarks, logos and service marks
                displayed on the Site are our property or the property of other
                third-parties. You are not permitted to use these Marks without
                our prior written consent or the consent of such third party
                which may own the Marks.
              </p>

              <h2>Contact Information</h2>

              <p>Address: https://besavvy.app</p>
              <p>Email: mike@besavvy.app</p>
            </TextBar>
          ) : (
            <iframe src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1678448680/%D0%9E%D1%84%D0%B5%D1%80%D1%82%D0%B0_BeSavvy_1.pdf" />
          )}
        </Center>
      ) : null}
      {props.name === "cookie" ? (
        <Center>
          <TextBar>
            <h1>Cookie Policy for BeSavvy</h1>

            <p>
              This is the Cookie Policy for BeSavvy, accessible from
              https://besavvy.app/
            </p>

            <p>
              <strong>What Are Cookies</strong>
            </p>

            <p>
              As is common practice with almost all professional websites this
              site uses cookies, which are tiny files that are downloaded to
              your computer, to improve your experience. This page describes
              what information they gather, how we use it and why we sometimes
              need to store these cookies. We will also share how you can
              prevent these cookies from being stored however this may downgrade
              or 'break' certain elements of the sites functionality.
            </p>

            <p>
              <strong>How We Use Cookies</strong>
            </p>

            <p>
              We use cookies for a variety of reasons detailed below.
              Unfortunately in most cases there are no industry standard options
              for disabling cookies without completely disabling the
              functionality and features they add to this site. It is
              recommended that you leave on all cookies if you are not sure
              whether you need them or not in case they are used to provide a
              service that you use.
            </p>

            <p>
              <strong>Disabling Cookies</strong>
            </p>

            <p>
              You can prevent the setting of cookies by adjusting the settings
              on your browser (see your browser Help for how to do this). Be
              aware that disabling cookies will affect the functionality of this
              and many other websites that you visit. Disabling cookies will
              usually result in also disabling certain functionality and
              features of the this site. Therefore it is recommended that you do
              not disable cookies. This Cookies Policy was created with the help
              of the{" "}
              <a href="https://www.cookiepolicygenerator.com/cookie-policy-generator/">
                Cookies Policy Generator from CookiePolicyGenerator.com
              </a>
              .
            </p>
            <p>
              <strong>The Cookies We Set</strong>
            </p>

            <ul>
              <li>
                <p>Account related cookies</p>
                <p>
                  If you create an account with us then we will use cookies for
                  the management of the signup process and general
                  administration. These cookies will usually be deleted when you
                  log out however in some cases they may remain afterwards to
                  remember your site preferences when logged out.
                </p>
              </li>

              <li>
                <p>Login related cookies</p>
                <p>
                  We use cookies when you are logged in so that we can remember
                  this fact. This prevents you from having to log in every
                  single time you visit a new page. These cookies are typically
                  removed or cleared when you log out to ensure that you can
                  only access restricted features and areas when logged in.
                </p>
              </li>

              <li>
                <p>Email newsletters related cookies</p>
                <p>
                  This site offers newsletter or email subscription services and
                  cookies may be used to remember if you are already registered
                  and whether to show certain notifications which might only be
                  valid to subscribed/unsubscribed users.
                </p>
              </li>

              <li>
                <p>Orders processing related cookies</p>
                <p>
                  This site offers e-commerce or payment facilities and some
                  cookies are essential to ensure that your order is remembered
                  between pages so that we can process it properly.
                </p>
              </li>
            </ul>

            <p>
              <strong>Third Party Cookies</strong>
            </p>

            <p>
              In some special cases we also use cookies provided by trusted
              third parties. The following section details which third party
              cookies you might encounter through this site.
            </p>

            <ul>
              <li>
                <p>
                  This site uses Google Analytics which is one of the most
                  widespread and trusted analytics solution on the web for
                  helping us to understand how you use the site and ways that we
                  can improve your experience. These cookies may track things
                  such as how long you spend on the site and the pages that you
                  visit so we can continue to produce engaging content.
                </p>
                <p>
                  For more information on Google Analytics cookies, see the
                  official Google Analytics page.
                </p>
              </li>
            </ul>

            <p>
              <strong>More Information</strong>
            </p>

            <p>
              Hopefully that has clarified things for you and as was previously
              mentioned if there is something that you aren't sure whether you
              need or not it's usually safer to leave cookies enabled in case it
              does interact with one of the features you use on our site.
            </p>

            <p>
              For more general information on cookies, please read{" "}
              <a href="https://www.generateprivacypolicy.com/#cookies%22">
                " article from the Privacy Policy Generator
              </a>
              .
            </p>

            <p>
              However if you are still looking for more information then you can
              contact us through one of our preferred contact methods:
            </p>

            <li>Email: mike@besavvy.app</li>
          </TextBar>
        </Center>
      ) : null}
    </div>
  );
};

export default Legal;
