function countUniqueEmails(data) {
  const uniqueEmails = new Set();
  for (const item of data) {
    if (
      item.user.email !== "mi.kochkin@ya.ru" ||
      item.user.email !== "tionacorcoran@gmail.com"
    ) {
      uniqueEmails.add(item.user.email);
    }
  }
  return uniqueEmails.size;
}

// Example usage
const data = [
  {
    id: "clivq17ny41755au9ryrz52h4",
    emailCampaign: {
      name: "Global Tech Professional",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "clivygg6e80191gsl7xoarg65",
    emailCampaign: {
      name: "Legal English Global",
    },
    user: {
      id: "cl1xucnxe0009tqu9rqrqysw7",
      email: "mike@besavvy.app",
    },
  },
  {
    id: "cliw1onz8139751gslilpp44w1",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clf0ravkd84191fxdmke1k2vu",
      email: "luna200407@mail.ru",
    },
  },
  {
    id: "clivrrr9o43985au9dbn1kqbb",
    emailCampaign: {
      name: "Global Tech Professional",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "clivzxczl86671gslebuxixmr",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clbnunmxy641211h0wti6iz9ij",
      email: "karine-movsesyan.702014@yandex.ru",
    },
  },
  {
    id: "cliw81ehl191891gsl9rd0laku",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "cl5sjpu70483041hzqtfuz4sdz",
      email: "milana.daova@mail.ru",
    },
  },
  {
    id: "cliwaykfa230021gslcwxjdxva",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cliwayisg229731gslo1kjrwl2",
      email: "tigrulya2001@gmail.com",
    },
  },
  {
    id: "cliwbf7ng262741gsl7qjpvieh",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "cliwayisg229731gslo1kjrwl2",
      email: "tigrulya2001@gmail.com",
    },
  },
  {
    id: "cliwntsxx306901gslf0ow0e8v",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clgwi8yzk154981ftk2syrftv2",
      email: "tnn18@yandex.ru",
    },
  },
  {
    id: "clivv9sya28911gsl404hp2oq",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clivv9rbi28621gslkqozilup",
      email: "kristianafiore@gmail.com",
    },
  },
  {
    id: "cliw10h0k127831gsl8ppw4m3o",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clfk2nopc53571fux7kknq9gv",
      email: "anatoliy.gubin.96@mail.ru",
    },
  },
  {
    id: "clivxwrp663771gslbdfy5wb1",
    emailCampaign: {
      name: "Global Tech Professional",
    },
    user: {
      id: "clivxwq9s63371gsl2pfr5ljd",
      email: "tionacorcoran@hotmail.com",
    },
  },
  {
    id: "clisik8qa137141fxfw767zt7c",
    emailCampaign: {
      name: "Адвокатский экзамен",
    },
    user: {
      id: "clguk1hhk323321f03kf81tka0",
      email: "denis-frolov@mail.ru",
    },
  },
  {
    id: "cliu4kh270244e5u9x9azaql2",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cliu4w3io561071fxmk86u85sb",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cliu51bhn574891fxm32xdow2p",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cliugaleq94451fyftpbn0snm",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "clfk2nopc53571fux7kknq9gv",
      email: "anatoliy.gubin.96@mail.ru",
    },
  },
  {
    id: "cliuivl7e137091fyfs6uxufa3",
    emailCampaign: {
      name: "Global Tech Professional",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cliuj1864160081fyfkcm3060s",
    emailCampaign: {
      name: "Global Tech Professional",
    },
    user: {
      id: "cl9euwh55344851hs457c4ijk5",
      email: "tionacorcoran@gmail.com",
    },
  },
  {
    id: "cliuoijkj251801fyfr2m3ed8d",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cliumipgw221731fyfipdi2i2j",
      email: "kurbanovmurad@inbox.ru",
    },
  },
  {
    id: "cliupo5uu316331fyfdtufnmpl",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "clfk2nopc53571fux7kknq9gv",
      email: "anatoliy.gubin.96@mail.ru",
    },
  },
  {
    id: "cliupxbkg333291fyfm2wl7u8y",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "clfk2nopc53571fux7kknq9gv",
      email: "anatoliy.gubin.96@mail.ru",
    },
  },
  {
    id: "clivbvnzr391301fyfdc0zszyb",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clivbvmg8391071fyf4rhwoc76",
      email: "ibrayeva2003@mail.ru",
    },
  },
  {
    id: "clivdrsja429011fyfxkkzxk8d",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clivdrr5v428741fyfi4rsf0x8",
      email: "mariaamoiseeva@mail.ru",
    },
  },
  {
    id: "clivfyz2e514471fyfwblph9l4",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clivfyxq7514191fyfaqpc752u",
      email: "lia_alekseeva@mail.ru",
    },
  },
  {
    id: "clivjxlb3586941fyfmut39kqh",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clfk2nopc53571fux7kknq9gv",
      email: "anatoliy.gubin.96@mail.ru",
    },
  },
  {
    id: "clivnxsct669621fyfkpyp5gax",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clbjrv93f511601hvwvddbz7ax",
      email: "dadzhiev.igor@gmail.com",
    },
  },
  {
    id: "clivnyvbj22015au9sojerram",
    emailCampaign: {
      name: "Global Tech Professional",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cliwswecy364561gsll9cvtaoo",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cliwvygij468671gslm9mvy12r",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cliwvyezc468391gslwpycv152",
      email: "sofika.6@mail.ru",
    },
  },
  {
    id: "cliwvzx6k481431gsl2zadv93f",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cliwvyezc468391gslwpycv152",
      email: "sofika.6@mail.ru",
    },
  },
  {
    id: "cliwz0ky9538101gsllyo1krx3",
    emailCampaign: {
      name: "Legal English: чтение",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "clix4vjlt631631gslupi1kcd7",
    emailCampaign: {
      name: "Global Tech Professional",
    },
    user: {
      id: "cl9euwh55344851hs457c4ijk5",
      email: "tionacorcoran@gmail.com",
    },
  },
  {
    id: "clix64ujr645481gsl8g86yzwi",
    emailCampaign: {
      name: "Global Tech Professional",
    },
    user: {
      id: "cl9euwh55344851hs457c4ijk5",
      email: "tionacorcoran@gmail.com",
    },
  },
  {
    id: "cliys3xzd91761fqock2su0jj",
    emailCampaign: {
      name: "Legal English: чтение",
    },
    user: {
      id: "cl5sjpu70483041hzqtfuz4sdz",
      email: "milana.daova@mail.ru",
    },
  },
  {
    id: "clizodq1r183441fqon4fsy50i",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clg5kuyy867101fz3rtr1eg0w",
      email: "roman.tretyakov.97@mail.ru",
    },
  },
  {
    id: "clj1olxko06821fs85uw7go7y",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clj1olvzm06551fs8zur1adzz",
      email: "volkovde.lex@gmail.com",
    },
  },
];
const uniqueEmailCount = countUniqueEmails(data);
console.log(uniqueEmailCount); // Output: 18

// const data = [
//   {
//     id: "clivq17ny41755au9ryrz52h4",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "clivygg6e80191gsl7xoarg65",
//     user: {
//       id: "cl1xucnxe0009tqu9rqrqysw7",
//     },
//   },
//   {
//     id: "cliw1onz8139751gslilpp44w1",
//     user: {
//       id: "clf0ravkd84191fxdmke1k2vu",
//     },
//   },
//   {
//     id: "clivrrr9o43985au9dbn1kqbb",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "clivzxczl86671gslebuxixmr",
//     user: {
//       id: "clbnunmxy641211h0wti6iz9ij",
//     },
//   },
//   {
//     id: "cliw81ehl191891gsl9rd0laku",
//     user: {
//       id: "cl5sjpu70483041hzqtfuz4sdz",
//     },
//   },
//   {
//     id: "cliwaykfa230021gslcwxjdxva",
//     user: {
//       id: "cliwayisg229731gslo1kjrwl2",
//     },
//   },
//   {
//     id: "cliwbf7ng262741gsl7qjpvieh",
//     user: {
//       id: "cliwayisg229731gslo1kjrwl2",
//     },
//   },
//   {
//     id: "cliwntsxx306901gslf0ow0e8v",
//     user: {
//       id: "clgwi8yzk154981ftk2syrftv2",
//     },
//   },
//   {
//     id: "clivv9sya28911gsl404hp2oq",
//     user: {
//       id: "clivv9rbi28621gslkqozilup",
//     },
//   },
//   {
//     id: "cliw10h0k127831gsl8ppw4m3o",
//     user: {
//       id: "clfk2nopc53571fux7kknq9gv",
//     },
//   },
//   {
//     id: "clivxwrp663771gslbdfy5wb1",
//     user: {
//       id: "clivxwq9s63371gsl2pfr5ljd",
//     },
//   },
//   {
//     id: "clisik8qa137141fxfw767zt7c",
//     user: {
//       id: "clguk1hhk323321f03kf81tka0",
//     },
//   },
//   {
//     id: "cliu4kh270244e5u9x9azaql2",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "cliu4w3io561071fxmk86u85sb",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "cliu51bhn574891fxm32xdow2p",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "cliugaleq94451fyftpbn0snm",
//     user: {
//       id: "clfk2nopc53571fux7kknq9gv",
//     },
//   },
//   {
//     id: "cliuivl7e137091fyfs6uxufa3",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "cliuj1864160081fyfkcm3060s",
//     user: {
//       id: "cl9euwh55344851hs457c4ijk5",
//     },
//   },
//   {
//     id: "cliuoijkj251801fyfr2m3ed8d",
//     user: {
//       id: "cliumipgw221731fyfipdi2i2j",
//     },
//   },
//   {
//     id: "cliupo5uu316331fyfdtufnmpl",
//     user: {
//       id: "clfk2nopc53571fux7kknq9gv",
//     },
//   },
//   {
//     id: "cliupxbkg333291fyfm2wl7u8y",
//     user: {
//       id: "clfk2nopc53571fux7kknq9gv",
//     },
//   },
//   {
//     id: "clivbvnzr391301fyfdc0zszyb",
//     user: {
//       id: "clivbvmg8391071fyf4rhwoc76",
//     },
//   },
//   {
//     id: "clivdrsja429011fyfxkkzxk8d",
//     user: {
//       id: "clivdrr5v428741fyfi4rsf0x8",
//     },
//   },
//   {
//     id: "clivfyz2e514471fyfwblph9l4",
//     user: {
//       id: "clivfyxq7514191fyfaqpc752u",
//     },
//   },
//   {
//     id: "clivjxlb3586941fyfmut39kqh",
//     user: {
//       id: "clfk2nopc53571fux7kknq9gv",
//     },
//   },
//   {
//     id: "clivnxsct669621fyfkpyp5gax",
//     user: {
//       id: "clbjrv93f511601hvwvddbz7ax",
//     },
//   },
//   {
//     id: "clivnyvbj22015au9sojerram",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "cliwswecy364561gsll9cvtaoo",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "cliwvygij468671gslm9mvy12r",
//     user: {
//       id: "cliwvyezc468391gslwpycv152",
//     },
//   },
//   {
//     id: "cliwvzx6k481431gsl2zadv93f",
//     user: {
//       id: "cliwvyezc468391gslwpycv152",
//     },
//   },
//   {
//     id: "cliwz0ky9538101gsllyo1krx3",
//     user: {
//       id: "cjqy9i57l000k0821rj0oo8l4",
//     },
//   },
//   {
//     id: "clix4vjlt631631gslupi1kcd7",
//     user: {
//       id: "cl9euwh55344851hs457c4ijk5",
//     },
//   },
//   {
//     id: "clix64ujr645481gsl8g86yzwi",
//     user: {
//       id: "cl9euwh55344851hs457c4ijk5",
//     },
//   },
//   {
//     id: "cliys3xzd91761fqock2su0jj",
//     user: {
//       id: "cl5sjpu70483041hzqtfuz4sdz",
//     },
//   },
//   {
//     id: "clizodq1r183441fqon4fsy50i",
//     user: {
//       id: "clg5kuyy867101fz3rtr1eg0w",
//     },
//   },
//   {
//     id: "clj1olxko06821fs85uw7go7y",
//     user: {
//       id: "clj1olvzm06551fs8zur1adzz",
//     },
//   },
// ];

// const userIds = data.map((item) => item.user.id);
// const uniqueUserIds = new Set(userIds);

// // The size property of the Set will give you the count of unique IDs.
// const uniqueIdCount = uniqueUserIds.size;
// console.log(uniqueIdCount);
