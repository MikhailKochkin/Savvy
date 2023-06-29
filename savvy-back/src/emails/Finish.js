const FinishEmail = (name, course) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
      /* Base ------------------------------ */

      @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
      }

      a {
        color: #3869d4;
      }

      a img {
        border: none;
      }

      td {
        word-break: break-word;
      }

      .preheader {
        display: none !important;
        visibility: hidden;
        mso-hide: all;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      }
      /* Type ------------------------------ */

      body,
      td,
      th {
        font-family: Arial;
      }

      h1 {
        margin-top: 0;
        color: #333333;
        font-size: 22px;
        font-weight: bold;
        text-align: left;
      }

      h2 {
        margin-top: 0;
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }

      h3 {
        margin-top: 0;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
      }

      td,
      th {
        font-size: 16px;
      }

      p,
      ul,
      ol,
      blockquote {
        margin: 0.4em 0 1.1875em;
        font-size: 16px;
        line-height: 1.625;
      }

      p.sub {
        font-size: 13px;
      }
      /* Utilities ------------------------------ */

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .align-center {
        text-align: center;
      }
      /* Buttons ------------------------------ */

      .button {
        background-color: #3869d4;
        border-top: 10px solid #3869d4;
        border-right: 18px solid #3869d4;
        border-bottom: 10px solid #3869d4;
        border-left: 18px solid #3869d4;
        display: inline-block;
        color: #fff;
        text-decoration: none;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
      }

      .button--green {
        background-color: #22bc66;
        border-top: 10px solid #22bc66;
        border-right: 18px solid #22bc66;
        border-bottom: 10px solid #22bc66;
        border-left: 18px solid #22bc66;
      }

      .button--red {
        background-color: #ff6136;
        border-top: 10px solid #ff6136;
        border-right: 18px solid #ff6136;
        border-bottom: 10px solid #ff6136;
        border-left: 18px solid #ff6136;
      }

      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
          text-align: center !important;
        }
      }
      /* Attribute list ------------------------------ */

      .attributes {
        margin: 0 0 21px;
      }

      .attributes_content {
        background-color: #f4f4f7;
        padding: 16px;
      }

      .attributes_item {
        padding: 0;
      }
      /* Related Items ------------------------------ */

      .related {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .related_item {
        padding: 10px 0;
        color: #cbcccf;
        font-size: 15px;
        line-height: 18px;
      }

      .related_item-title {
        display: block;
        margin: 0.5em 0 0;
      }

      .related_item-thumb {
        display: block;
        padding-bottom: 10px;
      }

      .related_heading {
        border-top: 1px solid #cbcccf;
        text-align: center;
        padding: 25px 0 10px;
      }
      /* Discount Code ------------------------------ */

      .discount {
        width: 100%;
        margin: 0;
        padding: 24px;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #f4f4f7;
        border: 2px dashed #cbcccf;
      }

      .discount_heading {
        text-align: center;
      }

      .discount_body {
        text-align: center;
        font-size: 15px;
      }
      /* Social Icons ------------------------------ */

      .social {
        width: auto;
      }

      .social td {
        padding: 0;
        width: auto;
      }

      .social_icon {
        height: 20px;
        margin: 0 8px 10px 8px;
        padding: 0;
      }
      /* Data table ------------------------------ */

      .purchase {
        width: 100%;
        margin: 0;
        padding: 35px 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .purchase_content {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .purchase_item {
        padding: 10px 0;
        color: #51545e;
        font-size: 15px;
        line-height: 18px;
      }

      .purchase_heading {
        padding-bottom: 8px;
        border-bottom: 1px solid #eaeaec;
      }

      .purchase_heading p {
        margin: 0;
        color: #85878e;
        font-size: 12px;
      }

      .purchase_footer {
        padding-top: 15px;
        border-top: 1px solid #eaeaec;
      }

      .purchase_total {
        margin: 0;
        text-align: right;
        font-weight: bold;
        color: #333333;
      }

      .purchase_total--label {
        padding: 0 15px 0 0;
      }

      body {
        background-color: #f4f4f7;
        color: #51545e;
      }

      p {
        color: #51545e;
      }

      p.sub {
        color: #6b6e76;
      }

      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #f4f4f7;
      }

      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      /* Masthead ----------------------- */

      .email-masthead {
        padding: 25px 0;
        text-align: center;
      }

      .email-masthead_logo {
        width: 94px;
      }

      .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #a8aaaf;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
      }
      /* Body ------------------------------ */

      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #ffffff;
      }

      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #ffffff;
      }

      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .email-footer p {
        color: #6b6e76;
      }

      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #eaeaec;
      }

      .content-cell {
        padding: 35px;
      }
      /*Media Queries ------------------------------ */

      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
        }
      }

      @media (prefers-color-scheme: dark) {
        body,
        .email-body,
        .email-body_inner,
        .email-content,
        .email-wrapper,
        .email-masthead,
        .email-footer {
          background-color: #333333 !important;
          color: #fff !important;
        }
        p,
        ul,
        ol,
        blockquote,
        h1,
        h2,
        h3 {
          color: #fff !important;
        }
        .attributes_content,
        .discount {
          background-color: #222 !important;
        }
        .email-masthead_name {
          text-shadow: none !important;
        }
      }
    </style>
    <!--[if mso]>
      <style type="text/css">
        .f-fallback {
          font-family: Arial, sans-serif;
        }
      </style>
    <![endif]-->
  </head>
  <body>
    <span class="preheader"
      >🚀 Курс на BeSavvy пройден! Отличная работа!</span
    >
    <table
      class="email-wrapper"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
    >
      <tr>
        <td align="center">
          <table
            class="email-content"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
          >
            <tr>
              <td class="email-masthead">
                <a
                  href="https://besavvy.app"
                  class="f-fallback email-masthead_name"
                >
                  BeSavvy
                </a>
              </td>
            </tr>
            <!-- Email Body -->
            <tr>
              <td
                class="email-body"
                width="100%"
                cellpadding="0"
                cellspacing="0"
              >
                <table
                  class="email-body_inner"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <!-- Body content -->
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <h1>${name}, привет!</h1>
                        <p>Поздравялем с прохождением курса "${course}"!</p>
                        <p>
                          Я восхищаюсь каждым пользователем, который сумел
                          пройти онлайн-курс до конца. Нас так много всего
                          отвлекает, столько существует источников информации.
                          Требуется огромная самодисциплина и
                          целеустремленность, чтобы в этих условиях пройти
                          онлайн курс до конца. Спасибо, за такое отношение к
                          обучению!
                        </p>
                        <p>
                          Как и обещал, высылаю сертификат о прохождении курса.
                          Его можно скачать, нажав на кнопку ниже.
                        </p>
                        <!-- Action -->
                        <table
                          class="body-action"
                          align="center"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tr>
                            <td align="center">
                              <!-- Border based button
           https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                              <table
                                width="100%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                              >
                                <tr>
                                  <td align="center">
                                    <a
                                      href="{{action_url}}"
                                      class="f-fallback button button--green"
                                      target="_blank"
                                      >Получить сертификат</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <p>
                          Кстати ты знаешь, что у нас есть еще много интересных
                          курсов? И на каждый ты можешь получить скидку 20% и больше, если у
                          тебя уже есть 500 баллов или пройденный курс (а он у
                          тебя есть).
                        </p>
                        <table
                          class="attributes"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tr>
                            <td class="attributes_content">
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                              >
                                <tr>
                                  <td class="attributes_item">
                                    <div class="f-fallback">
                                      <strong
                                        ><a href="https://besavvy.app"
                                          >Курсы по юридическому английскому</a
                                        ></strong
                                      >
                                      - 6 проверенных годами курсов по отработке
                                      каждого из аспектов юридического
                                      английского: грамматики, лексики, письма и
                                      перевода.
                                      <br />
                                      <br />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="attributes_item">
                                    <div class="f-fallback">
                                      <strong
                                        ><a href="https://besavvy.app"
                                          >Курсы по гражданскому праву</a
                                        ></strong
                                      >
                                      - повторите общую и особенную части ГК, а
                                      также наиболее важные поставновления
                                      пленума и информационные письма. Не важно,
                                      студент вы или практикующий юрист. Эти
                                      курсы помогут вам укрепить базовые
                                      теоретические знания.
                                      <br />
                                      <br />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="attributes_item">
                                    <div class="f-fallback">
                                      <strong
                                        ><a href="https://besavvy.app"
                                          >Курс по корпоративному праву</a
                                        ></strong
                                      >
                                      - курс Дени Мурадлова по практическим
                                      аспектам работы с непубличными обществами.
                                      <br />
                                      <br />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="attributes_item">
                                     И многое другое. Для получения промокода, просто ответь на это письмо и напиши, какой курс тебе приглянулся.
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <p>
                          В любом случае спасибо за работу на нашем сайте.
                          Мы понимаем, что это стало для тебя весомым вложением времмени и сил и благодарны за старания!
                        </p>
                        <p>
                          Успехов, <br />Михаил и команда BeSavvy
                        </p>
                        <p>
                          <strong>P.S.</strong> Если у тебя есть какие-то вопросы, их всегда можно задать, просто ответив на это письмо.
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table
                  class="email-footer"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">
                        &copy; 2020 BeSavvy
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

exports.FinishEmail = FinishEmail;
