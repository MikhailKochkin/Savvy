import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import styled from "styled-components";
import gql from "graphql-tag";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import { CURRENT_USER_QUERY } from "../User";
import { Unis, Companies, Tracks } from "../../config";
import Error from "../ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $number: String
    $surname: String!
    $password: String!
    $isFamiliar: Boolean!
    $status: Status!
    $company: String
    $country: String
    $uniID: String
    $careerTrackID: String
    $traffic_sources: Visits
  ) {
    signup(
      email: $email
      name: $name
      number: $number
      surname: $surname
      password: $password
      isFamiliar: $isFamiliar
      status: $status
      company: $company
      uniID: $uniID
      country: $country
      careerTrackID: $careerTrackID
      traffic_sources: $traffic_sources
    ) {
      token
      user {
        id
      }
    }
  }
`;

const Form = styled.form`
  min-width: 450px;
  font-size: 1.6rem;
  overflow-y: scroll;

  @media (max-width: 800px) {
    min-width: 100px;
    max-width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4%;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  .condition {
    font-size: 1.4rem;
    line-height: 1.4;
    margin-top: 4%;
  }
  #standard-select-currency {
    width: 87%;
    font-size: 1.6rem;
    font-family: Montserrat;
  }
  #standard-select-currency-label {
    display: none;
  }
`;

const Comment = styled.div`
  font-size: 1.2rem;
  line-height: 1.4;
  max-width: 450px;
  margin-bottom: 10px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  input {
    width: 48%;
    background: none;
    font-size: 1.6rem;
    border: 1px solid #d6d6d6;
    font-family: Montserrat;
    outline: 0;
    padding: 10px;
    margin-bottom: 15px;
    &:hover {
      border: 1px solid #999999;
    }
    &:focus {
      border: 1px solid #1a2a81;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 15px;
  &:hover {
    border: 1px solid #999999;
  }
  &:focus {
    border: 1px solid #1a2a81;
  }
`;

const PhoneInput = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 5px;
  &:hover {
    border: 1px solid #999999;
  }
  &:focus {
    border: 1px solid #1a2a81;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 15px;
  &:hover {
    border: 1px solid #999999;
  }
  &:focus {
    border: 1px solid #1a2a81;
  }
`;

const Transit = styled.div`
  margin-top: 3%;
  font-size: 1.4rem;
  width: 100%;

  span {
    color: #112a62;
    font-weight: 600;
    cursor: pointer;
  }
`;

const useStyles = makeStyles({
  button: {
    width: "100%",
    margin: "2% 0",
    fontSize: "1.7rem",
    fontFamily: "Montserrat",
    fontSize: "1.4rem",
    textTransform: "none",
  },
  root: {
    width: "100%",
  },
  labelRoot: {
    fontSize: "1.5rem",
    width: "100%",
  },
  formControl: {
    fontSize: "1.5rem",
  },
});

const WideSignUp = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("LAWYER");
  const [country, setCountry] = useState("");
  const [uniID, setUniID] = useState("ckhxpu4sj0000k8rkthw1no3o");
  const [company, setCompany] = useState("ckhxpvj4b0040k8rkag97bkza");
  const [careerTrackID, setCareerTrackID] = useState(
    "ckhxpur6r0017k8rkw0qp2rp2"
  );
  const [isFamiliar, setIsFamiliar] = useState(true);
  const router = useRouter();

  const classes = useStyles();

  const move = (e) => {
    const name = e.target.getAttribute("name");
    props.getData(name);
  };

  const { t } = useTranslation("auth");

  let visits = [
    {
      date: new Date(),
      utm_source: getCookie("traffic_source"),
    },
  ];

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={{
        name: name,
        surname: surname,
        password: password,
        email: email,
        number: number,
        status: status,
        uniID: uniID,
        company: company,
        country: country,
        careerTrackID: careerTrackID,
        isFamiliar: isFamiliar,
        traffic_sources: { visitsList: visits },
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async (e) => {
            e.preventDefault();
            if (country == "") {
              alert("Choose country");
              return;
            }
            if (!isFamiliar) {
              alert("Не забыли про согласие на обработку персональных данных?");
              return;
            } else if (status === "") {
              alert("Укажите свой статус на сайте!");
              return;
            } else if (surname === "") {
              alert("Укажите свою фамилию!");
              return;
            }
            await signup();
            // (status === "AUTHOR" || status === "HR") &&
            //   setTimeout(() => Router.push({ pathname: "/educator" }), 2000);
          }}
        >
          <Fieldset disabled={loading} aria-busy={loading}>
            <Title>{t("c2a")}</Title>
            <Error error={error} />
            <Group>
              <input
                className="name"
                type="text"
                name="name"
                placeholder={t("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="surname"
                type="text"
                name="surname"
                placeholder={t("surname")}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Group>
            <Input
              className="email"
              type="email"
              name="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Электронная почта"
            />
            <Select
              id="country"
              name="country"
              defaultValue={""}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">{t("select_country")}</option>
              <option value="CA">Canada</option>
              <option value="KZ">Kazakhstan</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="RU">Russian Federation</option>
              <option value="AF">Afghanistan</option>
              <option value="AX">Aland Islands</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AS">American Samoa</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AI">Anguilla</option>
              <option value="AQ">Antarctica</option>
              <option value="AG">Antigua and Barbuda</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AW">Aruba</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BM">Bermuda</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>
              <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
              <option value="BA">Bosnia and Herzegovina</option>
              <option value="BW">Botswana</option>
              <option value="BV">Bouvet Island</option>
              <option value="BR">Brazil</option>
              <option value="IO">British Indian Ocean Territory</option>
              <option value="BN">Brunei Darussalam</option>
              <option value="BG">Bulgaria</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="KH">Cambodia</option>
              <option value="CM">Cameroon</option>
              <option value="CA">Canada</option>
              <option value="CV">Cape Verde</option>
              <option value="KY">Cayman Islands</option>
              <option value="CF">Central African Republic</option>
              <option value="TD">Chad</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CX">Christmas Island</option>
              <option value="CC">Cocos (Keeling) Islands</option>
              <option value="CO">Colombia</option>
              <option value="KM">Comoros</option>
              <option value="CG">Congo</option>
              <option value="CD">
                Congo, Democratic Republic of the Congo
              </option>
              <option value="CK">Cook Islands</option>
              <option value="CR">Costa Rica</option>
              <option value="CI">Cote D'Ivoire</option>
              <option value="HR">Croatia</option>
              <option value="CU">Cuba</option>
              <option value="CW">Curacao</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czech Republic</option>
              <option value="DK">Denmark</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="DO">Dominican Republic</option>
              <option value="EC">Ecuador</option>
              <option value="EG">Egypt</option>
              <option value="SV">El Salvador</option>
              <option value="GQ">Equatorial Guinea</option>
              <option value="ER">Eritrea</option>
              <option value="EE">Estonia</option>
              <option value="ET">Ethiopia</option>
              <option value="FK">Falkland Islands (Malvinas)</option>
              <option value="FO">Faroe Islands</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="GF">French Guiana</option>
              <option value="PF">French Polynesia</option>
              <option value="TF">French Southern Territories</option>
              <option value="GA">Gabon</option>
              <option value="GM">Gambia</option>
              <option value="GE">Georgia</option>
              <option value="DE">Germany</option>
              <option value="GH">Ghana</option>
              <option value="GI">Gibraltar</option>
              <option value="GR">Greece</option>
              <option value="GL">Greenland</option>
              <option value="GD">Grenada</option>
              <option value="GP">Guadeloupe</option>
              <option value="GU">Guam</option>
              <option value="GT">Guatemala</option>
              <option value="GG">Guernsey</option>
              <option value="GN">Guinea</option>
              <option value="GW">Guinea-Bissau</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haiti</option>
              <option value="HM">Heard Island and Mcdonald Islands</option>
              <option value="VA">Holy See (Vatican City State)</option>
              <option value="HN">Honduras</option>
              <option value="HK">Hong Kong</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IR">Iran, Islamic Republic of</option>
              <option value="IQ">Iraq</option>
              <option value="IE">Ireland</option>
              <option value="IM">Isle of Man</option>
              <option value="IL">Israel</option>
              <option value="IT">Italy</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japan</option>
              <option value="JE">Jersey</option>
              <option value="JO">Jordan</option>
              <option value="KZ">Kazakhstan</option>
              <option value="KE">Kenya</option>
              <option value="KI">Kiribati</option>
              <option value="KP">Korea, Democratic People's Republic of</option>
              <option value="KR">Korea, Republic of</option>
              <option value="XK">Kosovo</option>
              <option value="KW">Kuwait</option>
              <option value="KG">Kyrgyzstan</option>
              <option value="LA">Lao People's Democratic Republic</option>
              <option value="LV">Latvia</option>
              <option value="LB">Lebanon</option>
              <option value="LS">Lesotho</option>
              <option value="LR">Liberia</option>
              <option value="LY">Libyan Arab Jamahiriya</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MO">Macao</option>
              <option value="MK">
                Macedonia, the Former Yugoslav Republic of
              </option>
              <option value="MG">Madagascar</option>
              <option value="MW">Malawi</option>
              <option value="MY">Malaysia</option>
              <option value="MV">Maldives</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MH">Marshall Islands</option>
              <option value="MQ">Martinique</option>
              <option value="MR">Mauritania</option>
              <option value="MU">Mauritius</option>
              <option value="YT">Mayotte</option>
              <option value="MX">Mexico</option>
              <option value="FM">Micronesia, Federated States of</option>
              <option value="MD">Moldova, Republic of</option>
              <option value="MC">Monaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MS">Montserrat</option>
              <option value="MA">Morocco</option>
              <option value="MZ">Mozambique</option>
              <option value="MM">Myanmar</option>
              <option value="NA">Namibia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NL">Netherlands</option>
              <option value="AN">Netherlands Antilles</option>
              <option value="NC">New Caledonia</option>
              <option value="NZ">New Zealand</option>
              <option value="NI">Nicaragua</option>
              <option value="NE">Niger</option>
              <option value="NG">Nigeria</option>
              <option value="NU">Niue</option>
              <option value="NF">Norfolk Island</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="NO">Norway</option>
              <option value="OM">Oman</option>
              <option value="PK">Pakistan</option>
              <option value="PW">Palau</option>
              <option value="PS">Palestinian Territory, Occupied</option>
              <option value="PA">Panama</option>
              <option value="PG">Papua New Guinea</option>
              <option value="PY">Paraguay</option>
              <option value="PE">Peru</option>
              <option value="PH">Philippines</option>
              <option value="PN">Pitcairn</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="PR">Puerto Rico</option>
              <option value="QA">Qatar</option>
              <option value="RE">Reunion</option>
              <option value="RO">Romania</option>
              <option value="RU">Russian Federation</option>
              <option value="RW">Rwanda</option>
              <option value="BL">Saint Barthelemy</option>
              <option value="SH">Saint Helena</option>
              <option value="KN">Saint Kitts and Nevis</option>
              <option value="LC">Saint Lucia</option>
              <option value="MF">Saint Martin</option>
              <option value="PM">Saint Pierre and Miquelon</option>
              <option value="VC">Saint Vincent and the Grenadines</option>
              <option value="WS">Samoa</option>
              <option value="SM">San Marino</option>
              <option value="ST">Sao Tome and Principe</option>
              <option value="SA">Saudi Arabia</option>
              <option value="SN">Senegal</option>
              <option value="RS">Serbia</option>
              <option value="CS">Serbia and Montenegro</option>
              <option value="SC">Seychelles</option>
              <option value="SL">Sierra Leone</option>
              <option value="SG">Singapore</option>
              <option value="SX">Sint Maarten</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="SB">Solomon Islands</option>
              <option value="SO">Somalia</option>
              <option value="ZA">South Africa</option>
              <option value="GS">
                South Georgia and the South Sandwich Islands
              </option>
              <option value="SS">South Sudan</option>
              <option value="ES">Spain</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudan</option>
              <option value="SR">Suriname</option>
              <option value="SJ">Svalbard and Jan Mayen</option>
              <option value="SZ">Swaziland</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
              <option value="SY">Syrian Arab Republic</option>
              <option value="TW">Taiwan, Province of China</option>
              <option value="TJ">Tajikistan</option>
              <option value="TZ">Tanzania, United Republic of</option>
              <option value="TH">Thailand</option>
              <option value="TL">Timor-Leste</option>
              <option value="TG">Togo</option>
              <option value="TK">Tokelau</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad and Tobago</option>
              <option value="TN">Tunisia</option>
              <option value="TR">Turkey</option>
              <option value="TM">Turkmenistan</option>
              <option value="TC">Turks and Caicos Islands</option>
              <option value="TV">Tuvalu</option>
              <option value="UG">Uganda</option>
              <option value="UA">Ukraine</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="UM">United States Minor Outlying Islands</option>
              <option value="UY">Uruguay</option>
              <option value="UZ">Uzbekistan</option>
              <option value="VU">Vanuatu</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Viet Nam</option>
              <option value="VG">Virgin Islands, British</option>
              <option value="VI">Virgin Islands, U.s.</option>
              <option value="WF">Wallis and Futuna</option>
              <option value="EH">Western Sahara</option>
              <option value="YE">Yemen</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabwe</option>
            </Select>
            <PhoneInput
              className="number"
              type="tel"
              name="number"
              placeholder={t("number")}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              label="Number"
            />
            <Comment>
              We need your phone number to send personalized feedback to your
              WhatsApp
            </Comment>
            <Input
              className="password"
              type="password"
              name="password"
              placeholder={t("create_password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {loading ? t("signing_up") : t("button")}
            </Button>
            <Comment>
              By clicking Sign Up, I agree to the the Terms of Service and
              Privacy Policy.
            </Comment>
            <Transit>
              {t("already_registered")}{" "}
              <span name="signin" onClick={move}>
                {t("login")}
              </span>
            </Transit>
          </Fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default WideSignUp;
export { SIGNUP_MUTATION };
