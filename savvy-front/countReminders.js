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
    id: "cllai5v95002cty0xiyljsd4r",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "ck2gl7mzp03ks0757gae9vxo0",
      email: "akievvvv@mail.ru",
    },
  },
  {
    id: "cllai5vah002dty0xyjcwihh6",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "ck2gl7mzp03ks0757gae9vxo0",
      email: "akievvvv@mail.ru",
    },
  },
  {
    id: "cllapjphg002qty0xaktb4e5c",
    emailCampaign: {
      name: "Банкротство",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cllav2mwy002vty0xocp5h09j",
    emailCampaign: {
      name: "Адвокатский экзамен",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cllazw5xm004uty0x3uuhe6ja",
    emailCampaign: {
      name: "Legal English: чтение",
    },
    user: {
      id: "clbnunmxy641211h0wti6iz9ij",
      email: "karine-movsesyan.702014@yandex.ru",
    },
  },
  {
    id: "cllazw5yx004vty0xwmq4pvgx",
    emailCampaign: {
      name: "Legal English: чтение",
    },
    user: {
      id: "clbnunmxy641211h0wti6iz9ij",
      email: "karine-movsesyan.702014@yandex.ru",
    },
  },
  {
    id: "cllb10svq0052ty0xd51eolao",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cllb10r820050ty0xnheszpyl",
      email: "sima.kholina@yandex.ru",
    },
  },
  {
    id: "cllb89jgz005kty0xt6k1xlvq",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "cllb89hov005ity0xbk9d0xn7",
      email: "a_khachaturova00@list.ru",
    },
  },
  {
    id: "cllb8nsdk005rty0xjqptsqar",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "cllb89hov005ity0xbk9d0xn7",
      email: "a_khachaturova00@list.ru",
    },
  },
  {
    id: "cllb8nsf6005sty0x6ym6w3il",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "cllb89hov005ity0xbk9d0xn7",
      email: "a_khachaturova00@list.ru",
    },
  },
  {
    id: "cllbbmuyc006qty0x2jfg5hoi",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cllbbmsmo006oty0xpajzwfcc",
      email: "ramazanova_nargiz@mail.ru",
    },
  },
  {
    id: "cllbfg64d007wty0x7qdiwpbq",
    emailCampaign: {
      name: "Компетенция арбитражных судов",
    },
    user: {
      id: "clk8jimno506921grb3bncxxpg",
      email: "juliakoryakinaaaa@mail.ru",
    },
  },
  {
    id: "clldl7l29000jrr0x5fks3jxn",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl318a5rr122091h0g5fatrhbt",
      email: "d.tatyana@gmail.com",
    },
  },
  {
    id: "clldn3y4p000prr0xq4fd2yiu",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cliemhx0k1242891ftgtitxtp08",
      email: "nero.sk@mail.ru",
    },
  },
  {
    id: "clldn3y56000qrr0xh6l0ze5f",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cliemhx0k1242891ftgtitxtp08",
      email: "nero.sk@mail.ru",
    },
  },
  {
    id: "clle11vgl002arr0x990assjj",
    emailCampaign: {
      name: "Банкротство",
    },
    user: {
      id: "clc253337261511hyseorwwxxe",
      email: "sergey-loginov-2001@mail.ru",
    },
  },
  {
    id: "cllepz4t60007ry0x1c3yy95o",
    emailCampaign: {
      name: "Корпоративное право",
    },
    user: {
      id: "cjz2gtn6l00ip07355o7ydfhc",
      email: "mutyanov00@gmail.com",
    },
  },
  {
    id: "cllf9q0nq000xry0xp01ulj23",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl6d7jbsq542041ht8i50sq8jq",
      email: "dianagalieva291020031@gmail.com",
    },
  },
  {
    id: "cllf9r4e1000zry0x4idfx3ld",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "cl6d7jbsq542041ht8i50sq8jq",
      email: "dianagalieva291020031@gmail.com",
    },
  },
  {
    id: "cllfgdrfl0013ry0xn4v7d3zl",
    emailCampaign: {
      name: "Банкротство",
    },
    user: {
      id: "cljbq6vtf10761fvoxbjpv9sk",
      email: "lika.balkany@mail.ru",
    },
  },
  {
    id: "cllhwimr90005yl0xucglp70b",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cl3qyecvo142561hw9eu9uqtiy",
      email: "yuliya_svidlo@icloud.com",
    },
  },
  {
    id: "clli5dxod000syl0xb3geyvt7",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cljbwk9qa71951fvocorasg3n",
      email: "neweshdz@gmail.com",
    },
  },
  {
    id: "clli5tdry000uyl0x9a87gxf3",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "cl2kln5j887011ivz92xf0gad",
      email: "ukhinovans@yandex.ru",
    },
  },
  {
    id: "clliisnp5001byl0xx4tvwk3u",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "clliislw30019yl0x0ajxt3ia",
      email: "dallora2000@mail.ru",
    },
  },
  {
    id: "cllimiatx001gyl0xz3v0sh4b",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cllimi9dy001eyl0xik7ntunz",
      email: "asadullin.aleksander@yandex.ru",
    },
  },
  {
    id: "cllj5ixhz0005zr0xgrt3dh2u",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cllj5iw0u0003zr0x11njk3rg",
      email: "darya.shumakova.03@inbox.ru",
    },
  },
  {
    id: "cllj5vjuy000fzr0xfas3iw8f",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cllj5iw0u0003zr0x11njk3rg",
      email: "darya.shumakova.03@inbox.ru",
    },
  },
  {
    id: "cllj7wwxh000tzr0xob0p1oh3",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl6d7jbsq542041ht8i50sq8jq",
      email: "dianagalieva291020031@gmail.com",
    },
  },
  {
    id: "cllj7x78z000wzr0xfvq6qmtp",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "cl6d7jbsq542041ht8i50sq8jq",
      email: "dianagalieva291020031@gmail.com",
    },
  },
  {
    id: "cllj7x75u000vzr0x1teqox8a",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "cl6d7jbsq542041ht8i50sq8jq",
      email: "dianagalieva291020031@gmail.com",
    },
  },
  {
    id: "clljaqwco001dzr0xsvclqc49",
    emailCampaign: {
      name: "Компетенция арбитражных судов",
    },
    user: {
      id: "cl641sfep475551hxhacnuj66w",
      email: "nikusha1054@mail.ru",
    },
  },
  {
    id: "clljfq7p6003vzr0xo5jqh3ya",
    emailCampaign: {
      name: "Компетенция арбитражных судов",
    },
    user: {
      id: "clg5kuyy867101fz3rtr1eg0w",
      email: "roman.tretyakov.97@mail.ru",
    },
  },
  {
    id: "clljfq7pl003wzr0x5n7re52l",
    emailCampaign: {
      name: "Компетенция арбитражных судов",
    },
    user: {
      id: "clg5kuyy867101fz3rtr1eg0w",
      email: "roman.tretyakov.97@mail.ru",
    },
  },
  {
    id: "clljgdume0045zr0x400gcnmr",
    emailCampaign: {
      name: "Компетенция арбитражных судов",
    },
    user: {
      id: "cl2p2swe9326601hy9kr9fxcsy",
      email: "victoriya.panova.2003.vict@mail.ru",
    },
  },
  {
    id: "clljgdumf0046zr0xtl74v516",
    emailCampaign: {
      name: "Компетенция арбитражных судов",
    },
    user: {
      id: "cl2p2swe9326601hy9kr9fxcsy",
      email: "victoriya.panova.2003.vict@mail.ru",
    },
  },
  {
    id: "clljh6gmr004ezr0x7imt71bh",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "cjxrxqwxt033i0742aicn6f93",
      email: "rocket_ride@mail.ru",
    },
  },
  {
    id: "clljozlt40051zr0xui4iyics",
    emailCampaign: {
      name: "МЧП",
    },
    user: {
      id: "clhouvw1b202681fxo42p1higd",
      email: "jahancoolbest@gmail.com",
    },
  },
  {
    id: "clljpbnzg0058zr0x1jplxo3r",
    emailCampaign: {
      name: "МЧП",
    },
    user: {
      id: "clhouvw1b202681fxo42p1higd",
      email: "jahancoolbest@gmail.com",
    },
  },
  {
    id: "clljrtvqa005gzr0xlq8s1e75",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clljuisdw006bzr0xurlw833r",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clljuisve006czr0xp1sgehr1",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clljuisyh006dzr0xz0s8p59q",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clljuitho006fzr0x4cc2wt1k",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clljuitfo006ezr0x02qjd7cd",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clljuitr5006gzr0x7u1u0xb8",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clljuiu0m006hzr0xjz1t9r6c",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clljuiua6006izr0xdgukmsgx",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
];

const uniqueEmailCount = countUniqueEmails(data);
console.log(uniqueEmailCount); // Output: 18
