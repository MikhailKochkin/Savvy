function countUniqueEmails(data) {
  const uniqueEmails = new Set();
  for (const item of data) {
    if (item.user.email !== "mi.kochkin@ya.ru") {
      uniqueEmails.add(item.user.email);
    }
  }
  return uniqueEmails.size;
}

// Example usage
const data = [
  {
    id: "clhyjisyu248421ftrin61amz5",
    createdAt: "2023-05-22T07:43:05.767Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Ксения",
      surname: null,
      number: null,
      email: "89104776595@yandex.ru",
    },
  },
  {
    id: "clhyugw34565641ftr8awd2zpu",
    createdAt: "2023-05-22T12:49:32.272Z",
    emailCampaign: {
      name: "IP",
    },
    user: {
      name: "Михаил",
      surname: "Кочкин",
      number: null,
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "clhz1inny636581ftrrnxqyr6z",
    createdAt: "2023-05-22T16:06:51.982Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Илья",
      surname: "Фурса",
      number: "89511311879",
      email: "heavy.coin@mail.ru",
    },
  },
  {
    id: "clhz36nzd647271ftrmcuad1v6",
    createdAt: "2023-05-22T16:53:31.754Z",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      name: "Руслан ",
      surname: null,
      number: "79169187624",
      email: "rusya.muller@mail.ru",
    },
  },
  {
    id: "clhzcnkkb691901ftrel6d0tjl",
    createdAt: "2023-05-22T21:18:37.019Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Галина",
      surname: null,
      number: "89647000734",
      email: "galina-panova72@mail.ru",
    },
  },
  {
    id: "clhzcpw02712491ftrus6jf3kz",
    createdAt: "2023-05-22T21:20:25.154Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Галина",
      surname: null,
      number: "89647000734",
      email: "galina-panova72@mail.ru",
    },
  },
  {
    id: "cli2rr3np61431f2gm4jo03k2",
    createdAt: "2023-05-25T06:44:34.501Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Михаил",
      surname: "Кочкин",
      number: null,
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cli2rs3h166081f2g3ia3fubd",
    createdAt: "2023-05-25T06:45:20.917Z",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      name: "Михаил",
      surname: "Кочкин",
      number: null,
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cli2ruix877701f2g90ula39a",
    createdAt: "2023-05-25T06:47:14.252Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Михаил",
      surname: "Кочкин",
      number: null,
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cli2rvrmc85971f2g4h3mcqa3",
    createdAt: "2023-05-25T06:48:12.181Z",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      name: "Михаил",
      surname: "Кочкин",
      number: null,
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cli2zcxpc172621f2gtv2g90q6",
    createdAt: "2023-05-25T10:17:30.528Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Роман Абу Салех",
      surname: null,
      number: null,
      email: "romanabusaleh@yandex.ru",
    },
  },
  {
    id: "cli2zdr2u175941f2g308ryukr",
    createdAt: "2023-05-25T10:18:08.599Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Olzhas",
      surname: "Abubakirov",
      number: "+77476867581",
      email: "olzhas.abubakirov@yandex.kz",
    },
  },
  {
    id: "cli2zehla177061f2gwhel6a4c",
    createdAt: "2023-05-25T10:18:42.959Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Olzhas",
      surname: "Abubakirov",
      number: "+77476867581",
      email: "olzhas.abubakirov@yandex.kz",
    },
  },
  {
    id: "cli306o26202391f2gpgdpd3fy",
    createdAt: "2023-05-25T10:40:37.711Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Юлия Маслий",
      surname: null,
      number: null,
      email: "masliyyu@yandex.ru",
    },
  },
  {
    id: "cli312vby258231f2g0nwchtdk",
    createdAt: "2023-05-25T11:05:40.127Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Злата",
      surname: null,
      number: "+79151751396",
      email: "zlatamelnikov@gmail.com",
    },
  },
  {
    id: "cli31tpka309421f2giixblhtt",
    createdAt: "2023-05-25T11:26:32.362Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Артём ",
      surname: "Быконя ",
      number: "+7 920 862 55 75",
      email: "artembyk19@yandex.ru",
    },
  },
  {
    id: "cli31z6wz334111f2gufnu46jh",
    createdAt: "2023-05-25T11:30:48.131Z",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      name: "Артём ",
      surname: "Быконя ",
      number: "+7 920 862 55 75",
      email: "artembyk19@yandex.ru",
    },
  },
  {
    id: "cli32ipos354081f2gpv1k1uzn",
    createdAt: "2023-05-25T11:45:58.924Z",
    emailCampaign: {
      name: "IP",
    },
    user: {
      name: "Милана",
      surname: "Даова",
      number: "+79889232795",
      email: "milana.daova@mail.ru",
    },
  },
  {
    id: "cli32jyrb358841f2g6xnvm7so",
    createdAt: "2023-05-25T11:46:57.335Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Милана",
      surname: "Даова",
      number: "+79889232795",
      email: "milana.daova@mail.ru",
    },
  },
  {
    id: "cli335avn444491f2gqo0647wr",
    createdAt: "2023-05-25T12:03:32.819Z",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      name: "Эллада",
      surname: "Хатова",
      number: "89248231007",
      email: "hatova.ellada@gmail.com",
    },
  },
  {
    id: "cli37gfwv545451f2glp4h1pkx",
    createdAt: "2023-05-25T14:04:11.024Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Анастасия ",
      surname: "Мырсина",
      number: null,
      email: "aamyrsina@gmail.com",
    },
  },
  {
    id: "cli3fqx6g679401f2gglvx43bp",
    createdAt: "2023-05-25T17:56:16.888Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Эмиль",
      surname: null,
      number: "89872852225",
      email: "karipove7@gmail.com",
    },
  },
  {
    id: "cli3i5rpm731311f2ghu0dp8l5",
    createdAt: "2023-05-25T19:03:48.875Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Vhvch",
      surname: "Chvbjv",
      number: "89999699321",
      email: "fhcc@mai.ru",
    },
  },
  {
    id: "cli3loxdz773531f2gusrvayka",
    createdAt: "2023-05-25T20:42:41.544Z",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      name: "Дмитрий",
      surname: "Щекин",
      number: "+79112507995",
      email: "home1207+besavvy@yandex.ru",
    },
  },
  {
    id: "cli46yhyi148571fs7cuvofwav",
    createdAt: "2023-05-26T06:38:00.042Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Ольга",
      surname: null,
      number: "",
      email: "olgamedved007@gmail.com",
    },
  },
  {
    id: "cli4c0qa7238261fs70p65j9g8",
    createdAt: "2023-05-26T08:59:42.224Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Ольга Романова",
      surname: null,
      number: null,
      email: "olga_romanova@ratum.ru",
    },
  },
  {
    id: "cli4kuo6x382791fs709wgs0lg",
    createdAt: "2023-05-26T13:06:56.121Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Милана",
      surname: "Даова",
      number: "+79889232795",
      email: "milana.daova@mail.ru",
    },
  },
  {
    id: "cli4kvusu391811fs7sb5irc7g",
    createdAt: "2023-05-26T13:07:51.343Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Милана",
      surname: "Даова",
      number: "+79889232795",
      email: "milana.daova@mail.ru",
    },
  },
  {
    id: "cli4kwfos396911fs7fvheerx5",
    createdAt: "2023-05-26T13:08:18.412Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Милана",
      surname: "Даова",
      number: "+79889232795",
      email: "milana.daova@mail.ru",
    },
  },
  {
    id: "cli4xfsl803271fttmvlwuipx",
    createdAt: "2023-05-26T18:59:16.988Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Михаил ",
      surname: null,
      number: "89513174550 ",
      email: "aion230196@yandex.ru",
    },
  },
  {
    id: "cli5yuhmg323751f0pajpmoz2x",
    createdAt: "2023-05-27T12:26:28.408Z",
    emailCampaign: {
      name: "Адвокатский экзамен",
    },
    user: {
      name: "Olga",
      surname: "Saz",
      number: "89104380918",
      email: "olgasaz_dom@mail.ru",
    },
  },
  {
    id: "cli75k01i581831fvlcbse9e7d",
    createdAt: "2023-05-28T08:22:02.551Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Милана",
      surname: "Даова",
      number: "+79889232795",
      email: "milana.daova@mail.ru",
    },
  },
  {
    id: "cli75zv78624561fvl5x84tqh2",
    createdAt: "2023-05-28T08:34:22.773Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Yuri",
      surname: null,
      number: null,
      email: "1504yura@gmail.com",
    },
  },
  {
    id: "cli77lqef697491fvllvgva54f",
    createdAt: "2023-05-28T09:19:22.600Z",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      name: "Yuri",
      surname: null,
      number: null,
      email: "1504yura@gmail.com",
    },
  },
  {
    id: "cli77mern704471fvlqedq08pn",
    createdAt: "2023-05-28T09:19:54.180Z",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      name: "Yuri",
      surname: null,
      number: null,
      email: "1504yura@gmail.com",
    },
  },
  {
    id: "cli7fe80c820391fvlhxnw0axj",
    createdAt: "2023-05-28T12:57:29.101Z",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      name: "Дарья",
      surname: null,
      number: null,
      email: "rusta25@list.ru",
    },
  },
  {
    id: "cli7sbotr177441fxhqfydiuwi",
    createdAt: "2023-05-28T18:59:25.935Z",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      name: "Ольга",
      surname: "Саликова",
      number: "+79269096105",
      email: "olga-sakova@mail.ru",
    },
  },
  {
    id: "cli83nn9f245551fxhqjh292cb",
    createdAt: "2023-05-29T00:16:39.555Z",
    emailCampaign: {
      name: "Адвокатский экзамен",
    },
    user: {
      name: "Elena",
      surname: null,
      number: null,
      email: "e.gurianova@ngs.ru",
    },
  },
];
const uniqueEmailCount = countUniqueEmails(data);
console.log(uniqueEmailCount); // Output: 18
