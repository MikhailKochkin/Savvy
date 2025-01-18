import React from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
  display: flex;
  margin: 40px 0;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60%;
  align-items: center;
  justify-content: center;
`;

const Outer = styled.div`
  width: 100%;
  height: 600px;
  margin: 50px 0;
  display: flex;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  align-items: center;
  justify-content: center;
  /* border: 2px solid #393939; */
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const Inner = styled.div`
  width: 95%;
  height: 92%;
  display: flex;
  opacity: 1;
  /* border: 2px solid #393939; */
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .bookmark {
    height: 60px;
    width: 50px;
    padding: 0px;
    margin-top: 10px;
    -webkit-transform: rotate(0deg) skew(0deg);
    transform: rotate(0deg) skew(0deg);
    border-left: 25px solid #ee7752;
    border-right: 25px solid #ee7752;
    border-bottom: 25px solid transparent;
  }
  h2 {
    font-size: 5rem;
  }
  .name {
    font-weight: 600;
    font-size: 2.6rem;
    padding: 0px 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid black;
  }
  .course {
    font-weight: 600;
    font-size: 2.4rem;
    margin-bottom: 20px;
    border-bottom: 1px solid grey;
    padding: 20px 50px;
    width: 70%;
    line-height: 1.3;
    text-align: center;
  }
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const Data = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 10px;

  .left {
    width: 50%;
    font-style: italic;
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    font-style: italic;
  }
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

Outer.displayName = "Outer";

// const downloadPDF = async () => {
//   const certificate = document.getElementById("certificate");
//   const canvas = await html2canvas(certificate, {
//     scale: 3, // Increase scale for better quality (optional)
//   });
//   const imgData = canvas.toDataURL("image/png");

//   const pdf = new jsPDF("l", "mm", "a4");
//   const width = pdf.internal.pageSize.getWidth();
//   const height = pdf.internal.pageSize.getHeight();

//   pdf.addImage(imgData, "PNG", 0, 0, width, height);
//   pdf.save("certificate.pdf");
// };

const Certificate = () => {
  const { t } = useTranslation("course");
  return (
    <Styles>
      <Container>
        {/* <button onClick={downloadPDF}>Download Certificate as PDF</button> */}

        <Outer id="certificate">
          <Inner>
            <div className="bookmark"></div>
            <h2>{t("certificate")}</h2>
            <div>{t("certify")}</div>
            <div className="name"></div>
            <div>{t("completed")}</div>
            <div className="course">Полный курс Legal English (8 модулей)</div>
            <Data>
              <div className="left">
                <div>ID: 155sdf345e4gg </div>
                <div>{t("date")} 10.12.2024</div>
              </div>
              <div className="right">
                <div>Михаил Кочкин</div>
                <div>Директор</div>
              </div>
            </Data>
          </Inner>
        </Outer>
      </Container>
    </Styles>
  );
};

export default Certificate;
