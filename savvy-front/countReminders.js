// function countUniqueEmails(data) {
//   const uniqueEmails = new Set();
//   for (const item of data) {
//     if (item.user.email !== "mi.kochkin@ya.ru") {
//       uniqueEmails.add(item.user.email);
//     }
//   }
//   return uniqueEmails.size;
// }

// // Example usage
// const data = [
//   {
//     id: "cli83nn9f245551fxhqjh292cb",
//     createdAt: "2023-05-29T00:16:39.555Z",
//     emailCampaign: {
//       name: "Адвокатский экзамен",
//     },
//     user: {
//       name: "Elena",
//       surname: null,
//       number: null,
//       email: "e.gurianova@ngs.ru",
//     },
//   },
//   {
//     id: "cli8yn7dm01031fwgci1q7ebx",
//     createdAt: "2023-05-29T14:44:07.067Z",
//     emailCampaign: {
//       name: "Due Diligence in M&A",
//     },
//     user: {
//       name: "Анна",
//       surname: null,
//       number: "89134657628",
//       email: "alonnasw@gmail.com",
//     },
//   },
//   {
//     id: "cli980qqi168951fwgvtpesssj",
//     createdAt: "2023-05-29T19:06:35.227Z",
//     emailCampaign: {
//       name: "Гражданское право. Фундамент карьеры",
//     },
//     user: {
//       name: "Дмитрий",
//       surname: "Щекин",
//       number: "+79112507995",
//       email: "home1207+besavvy@yandex.ru",
//     },
//   },
//   {
//     id: "clia9b507192581fw7ahq0dwzk",
//     createdAt: "2023-05-30T12:30:26.072Z",
//     emailCampaign: {
//       name: "МЧП",
//     },
//     user: {
//       name: "Михаил",
//       surname: "Кочкин",
//       number: null,
//       email: "mi.kochkin@ya.ru",
//     },
//   },
//   {
//     id: "cliaackf8229561fw7c2fr1vaw",
//     createdAt: "2023-05-30T12:59:32.325Z",
//     emailCampaign: {
//       name: "Due Diligence in M&A",
//     },
//     user: {
//       name: "Михаил",
//       surname: "Кочкин",
//       number: null,
//       email: "mi.kochkin@ya.ru",
//     },
//   },
//   {
//     id: "clibbosgp1095381fvydyz6v14s",
//     createdAt: "2023-05-31T06:24:48.409Z",
//     emailCampaign: {
//       name: "70 новых слов из Legal English за 3 дня",
//     },
//     user: {
//       name: "Luba",
//       surname: "S",
//       number: "+9035614954",
//       email: "luba17@yandex.ru",
//     },
//   },
//   {
//     id: "clibgvbz61281051fvy9hw0dafi",
//     createdAt: "2023-05-31T08:49:51.714Z",
//     emailCampaign: {
//       name: "70 новых слов из Legal English за 3 дня",
//     },
//     user: {
//       name: "Шракп",
//       surname: null,
//       number: "+79188293374",
//       email: "cagaraev.david@gmail.com",
//     },
//   },
//   {
//     id: "clibz749779411f2ynzks7yc8",
//     createdAt: "2023-05-31T17:22:54.668Z",
//     emailCampaign: {
//       name: "МЧП",
//     },
//     user: {
//       name: "Егор Кондратенко",
//       surname: null,
//       number: null,
//       email: "egoekojber@gmail.com",
//     },
//   },
//   {
//     id: "clibzbb7b142691f2yjfojtpz3",
//     createdAt: "2023-05-31T17:26:10.296Z",
//     emailCampaign: {
//       name: "МЧП",
//     },
//     user: {
//       name: "Егор Кондратенко",
//       surname: null,
//       number: null,
//       email: "egoekojber@gmail.com",
//     },
//   },
//   {
//     id: "clic4at2e210541f2ydik14pkc",
//     createdAt: "2023-05-31T19:45:44.870Z",
//     emailCampaign: {
//       name: "Due Diligence in M&A",
//     },
//     user: {
//       name: "Милана",
//       surname: "Даова",
//       number: "+79889232795",
//       email: "milana.daova@mail.ru",
//     },
//   },
//   {
//     id: "clic4bvnp218961f2y1z2rrbw9",
//     createdAt: "2023-05-31T19:46:34.885Z",
//     emailCampaign: {
//       name: "IP",
//     },
//     user: {
//       name: "Милана",
//       surname: "Даова",
//       number: "+79889232795",
//       email: "milana.daova@mail.ru",
//     },
//   },
//   {
//     id: "clid2m14x832841f2yl1gyu0a1",
//     createdAt: "2023-06-01T11:46:15.489Z",
//     emailCampaign: {
//       name: "70 новых слов из Legal English за 3 дня",
//     },
//     user: {
//       name: "Luba",
//       surname: "S",
//       number: "+9035614954",
//       email: "luba17@yandex.ru",
//     },
//   },
//   {
//     id: "clid2ngha843971f2yrz04pdru",
//     createdAt: "2023-06-01T11:47:22.030Z",
//     emailCampaign: {
//       name: "70 новых слов из Legal English за 3 дня",
//     },
//     user: {
//       name: "Luba",
//       surname: "S",
//       number: "+9035614954",
//       email: "luba17@yandex.ru",
//     },
//   },
//   {
//     id: "clidlzqzl395371ftgn94z7flh",
//     createdAt: "2023-06-01T20:48:48.225Z",
//     emailCampaign: {
//       name: "70 новых слов из Legal English за 3 дня",
//     },
//     user: {
//       name: "Яна",
//       surname: "Никитина",
//       number: "YanaNikitina22",
//       email: "9nazebra@gmail.com",
//     },
//   },
//   {
//     id: "clie8v83y674861ftgnrxqrtn3",
//     createdAt: "2023-06-02T07:29:08.303Z",
//     emailCampaign: {
//       name: "МЧП",
//     },
//     user: {
//       name: "Илья",
//       surname: "Фурса",
//       number: "89511311879",
//       email: "heavy.coin@mail.ru",
//     },
//   },
//   {
//     id: "clie9ro6h714111ftgd7c64hwe",
//     createdAt: "2023-06-02T07:54:22.121Z",
//     emailCampaign: {
//       name: "МЧП",
//     },
//     user: {
//       name: "Илья",
//       surname: "Фурса",
//       number: "89511311879",
//       email: "heavy.coin@mail.ru",
//     },
//   },
//   {
//     id: "cliez0kq1152181fwsju74df6r",
//     createdAt: "2023-06-02T19:41:07.945Z",
//     emailCampaign: {
//       name: "Гражданское право. Фундамент карьеры",
//     },
//     user: {
//       name: "Милана",
//       surname: "Даова",
//       number: "+79889232795",
//       email: "milana.daova@mail.ru",
//     },
//   },
//   {
//     id: "clifu1qi2428531fwsv4wi5fih",
//     createdAt: "2023-06-03T10:09:50.186Z",
//     emailCampaign: {
//       name: "Due Diligence in M&A",
//     },
//     user: {
//       name: "Вадим ",
//       surname: "Магомедов",
//       number: "+79640199684",
//       email: "vadim_magomed@mail.ru",
//     },
//   },
//   {
//     id: "clig3szdk518121fws6x0lnpzl",
//     createdAt: "2023-06-03T14:42:57.945Z",
//     emailCampaign: {
//       name: "IP",
//     },
//     user: {
//       name: "Анастасия",
//       surname: "Тойбахтина",
//       number: "89081523633",
//       email: "nastya.toibahtina@mail.ru",
//     },
//   },
//   {
//     id: "cliggw3v2108121f1fdh2mfb7m",
//     createdAt: "2023-06-03T20:49:18.734Z",
//     emailCampaign: {
//       name: "Due Diligence in M&A",
//     },
//     user: {
//       name: "Милана",
//       surname: "Даова",
//       number: "+79889232795",
//       email: "milana.daova@mail.ru",
//     },
//   },
//   {
//     id: "cliglut0b157031f1funejz3pw",
//     createdAt: "2023-06-03T23:08:16.091Z",
//     emailCampaign: {
//       name: "Компетенция арбитражных судов",
//     },
//     user: {
//       name: "Рашид",
//       surname: "Фаталиев",
//       number: "89268841938",
//       email: "bmid-place@bk.ru",
//     },
//   },
// ];
// const uniqueEmailCount = countUniqueEmails(data);
// console.log(uniqueEmailCount); // Output: 18

const data = [
  {
    id: "clg0ubye50647t6u9zrnzhpen",
    user: {
      id: "clg0ubve60605t6u9pg8c99ud",
    },
  },
  {
    id: "clguxn90j92391fxkuzyqqreh",
    user: {
      id: "clguum38s799951f036dw10bni",
    },
  },
  {
    id: "clg0tt8yj1476gnu9zw9abqyr",
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
    },
  },
  {
    id: "clhm55t7s3422ynu924bxpitb",
    user: {
      id: "clhm55m4k3382ynu9akaix52v",
    },
  },
  {
    id: "clhm57rdb3832ynu9ae20pkv4",
    user: {
      id: "clhm57mqs3804ynu9m6j3t9k0",
    },
  },
  {
    id: "clg0uwzbg0133wbu9ka7icljj",
    user: {
      id: "clg0uwuk60101wbu95lkjhiu1",
    },
  },
  {
    id: "clh7i2zhp19151f50hwi1714i",
    user: {
      id: "clh7i26vp13801f50oqzl7nzn",
    },
  },
  {
    id: "clhm5ho3w0125e6u9wcftsdpg",
    user: {
      id: "clhm5hl5t0093e6u9hjuu1n4b",
    },
  },
  {
    id: "clhrxy62s221681fxhb4uv1rdn",
    user: {
      id: "clhrxy4i9221411fxhft6htrp2",
    },
  },
  {
    id: "clhry3g7y242381fxh6bg9a9ui",
    user: {
      id: "clhrxy4i9221411fxhft6htrp2",
    },
  },
  {
    id: "clhs0ecng373361fxhpnpeysjn",
    user: {
      id: "clhnjymkp135141fv32zufw2bw",
    },
  },
  {
    id: "clhs0k52r381151fxharj6i5av",
    user: {
      id: "clhnjymkp135141fv32zufw2bw",
    },
  },
  {
    id: "clhs1nmww465011fxhhqdlaxpv",
    user: {
      id: "clhnjymkp135141fv32zufw2bw",
    },
  },
  {
    id: "clhun9cta278351fy453aolsp4",
    user: {
      id: "cl5wsgqqn130581hsork3xzz42",
    },
  },
  {
    id: "clhvzlqlu191971fzylni1118f",
    user: {
      id: "ckuep0qim03311huir9oo4l44",
    },
  },
  {
    id: "clhx476qz833441fyg5lfmor02",
    user: {
      id: "cl9l85cga111511hybjgpaxh41",
    },
  },
  {
    id: "clhz36nzd647271ftrmcuad1v6",
    user: {
      id: "clhz36me6646951ftr0ftrrhlk",
    },
  },
  {
    id: "cli31z6wz334111f2gufnu46jh",
    user: {
      id: "cl267yo8d288131hy772ykva8j",
    },
  },
  {
    id: "cli335avn444491f2gqo0647wr",
    user: {
      id: "cla6o245738561hukmzzotv1t",
    },
  },
  {
    id: "cli3loxdz773531f2gusrvayka",
    user: {
      id: "cl9zt4djo122461hoodsfff3bp",
    },
  },
  {
    id: "cli77mern704471fvlqedq08pn",
    user: {
      id: "clgtnsvor96771f03d7uwnzyx",
    },
  },
  {
    id: "cli7fe80c820391fvlhxnw0axj",
    user: {
      id: "clh85eod7262061f50cvs6spp7",
    },
  },
  {
    id: "cli980qqi168951fwgvtpesssj",
    user: {
      id: "cl9zt4djo122461hoodsfff3bp",
    },
  },
  {
    id: "cliez0kq1152181fwsju74df6r",
    user: {
      id: "cl5sjpu70483041hzqtfuz4sdz",
    },
  },
];

const userIds = data.map((item) => item.user.id);
const uniqueUserIds = new Set(userIds);

// The size property of the Set will give you the count of unique IDs.
const uniqueIdCount = uniqueUserIds.size;
console.log(uniqueIdCount);
