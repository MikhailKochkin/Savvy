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
    id: "clkqbkjyl406341fxmkhvl6zup",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkqbkic3406021fxmfj47zht3",
      email: "letokyky@mail.ru",
    },
  },
  {
    id: "clkqh30ls439111fxmt82gbvwi",
    emailCampaign: {
      name: "МЧП",
    },
    user: {
      id: "cljh58611484771f12uv4rmnlw",
      email: "keyliabash@gmail.com",
    },
  },
  {
    id: "clkqjyhhi464671fxmsgj8esbg",
    emailCampaign: {
      name: "МЧП",
    },
    user: {
      id: "clkqjyfy4464221fxmquwkuir3",
      email: "vladvettel@gmail.com",
    },
  },
  {
    id: "clkqq67hg578741fxmwzbwol3g",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "clkqroqz4600061fxm7wndy429",
    emailCampaign: {
      name: "Компетенция арбитражных судов",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "clkqrqb4i605891fxmmr1bnd3m",
    emailCampaign: {
      name: "Арбитражный процесс",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "clkqsg3ov617381fxmduvto9wv",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "clkqvhoy2635631fxms2ezrb14",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkqvhmih635221fxmpooblomw",
      email: "andrey.tolstik.mail@gmail.com",
    },
  },
  {
    id: "clkr2w6kr04631fwd1s9le6bg",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cksf3534o215881guv92uxlr1m",
      email: "gyulnara.allyamova@mail.ru",
    },
  },
  {
    id: "clkr35uql33101fwdd95mq76b",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cljbwk9qa71951fvocorasg3n",
      email: "neweshdz@gmail.com",
    },
  },
  {
    id: "clkr36ho740391fwd3t1qck7c",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clf2srmj342771f0cilrdsgr3",
      email: "daryakiselevskaya@yandex.ru",
    },
  },
  {
    id: "clkr3d9y252931fwdyyam3jjl",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cljh58611484771f12uv4rmnlw",
      email: "keyliabash@gmail.com",
    },
  },
  {
    id: "clkr3he1176671fwd0swc5db7",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cljyk24ch682921f2wdgmvri5f",
      email: "dmitrieva-n-s@mail.ru",
    },
  },
  {
    id: "clkr3l2bn81911fwdb6j35y4u",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cljbwk9qa71951fvocorasg3n",
      email: "neweshdz@gmail.com",
    },
  },
  {
    id: "clkr3rmdw93951fwdz4wssali",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkr3rkzu93641fwdxcqvznwe",
      email: "chffgjt@mail.ru",
    },
  },
  {
    id: "clkr76avf136371fwdxcmdhkzn",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkauroz1531761fzref96uvtt",
      email: "bbziev@mail.ru",
    },
  },
  {
    id: "clkray7fd201811fwdm2zrrvc5",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cljab583l163421fyz13rbmx2j",
      email: "marimir433@gmail.com",
    },
  },
  {
    id: "clkrzidf2352081fwd8sxmf0cs",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "ckbw9bcmr02l70725ey0jgnxr",
      email: "vadim-efremov-00@mail.ru",
    },
  },
  {
    id: "clksefdw5469091fwd48dz3y0e",
    emailCampaign: {
      name: "МЧП",
    },
    user: {
      id: "clksedkxo464001fwd1uqg15of",
      email: "ilshunkov@gmail.com",
    },
  },
  {
    id: "clksin0vl502381fwdtbx94bt9",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cljaa13hf26921fyzmvwdv9c9",
      email: "aazarya777@yandex.ru",
    },
  },
  {
    id: "clksir9ad504661fwds6dsxwyy",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clksir7s9504371fwdacf99lau",
      email: "dmitriy0039@gmail.com",
    },
  },
  {
    id: "clksj1inx510831fwd1yqrqg0o",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "ckvduq9l306671hxnn5g5qrqx",
      email: "gozakharov@edu.hse.ru",
    },
  },
  {
    id: "clksj2etl515411fwd2uqs3xat",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "ckvduq9l306671hxnn5g5qrqx",
      email: "gozakharov@edu.hse.ru",
    },
  },
  {
    id: "clksjbzyp03641fx9svcg8ir4",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl26whnsl390591hwzv4wwo6ld",
      email: "elenabekareva03@gmail.com",
    },
  },
  {
    id: "clksjovi622671fx9o1t6dabu",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl26whnsl390591hwzv4wwo6ld",
      email: "elenabekareva03@gmail.com",
    },
  },
  {
    id: "clksjxza153541fx9o61n59r0",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkbctt68285951fy1fs2q297u",
      email: "abror.rsgov@gmail.com",
    },
  },
  {
    id: "clksuuxml238451fx9vxio8mnq",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cljplplgl243611fys2tygenrf",
      email: "aina-pererva@mail.ru",
    },
  },
  {
    id: "clktf8mng270711fx92jio3ivi",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "cjxqs08am000f07421ctv187d",
      email: "popkov_artem_bratsk@mail.ru",
    },
  },
  {
    id: "clktfnfa3292941fx9sjz392tn",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "cjxqs08am000f07421ctv187d",
      email: "popkov_artem_bratsk@mail.ru",
    },
  },
  {
    id: "clktst6fw531471fx9jxofs9c9",
    emailCampaign: {
      name: "Корпоративное право",
    },
    user: {
      id: "cjywzu83702tw0753sftzwnux",
      email: "www.wladusha@mail.ru",
    },
  },
  {
    id: "clktthg4g543041fx969kefbyb",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "clh7i26vp13801f50oqzl7nzn",
      email: "bulavin.1997@yandex.ru",
    },
  },
  {
    id: "clku0drvh740441fx96z0e8vs4",
    emailCampaign: {
      name: "Арбитражный процесс",
    },
    user: {
      id: "cljabxtps219341fyz4gdu5mkc",
      email: "ti2001@inbox.ru",
    },
  },
  {
    id: "clku10g7e11111f1388gql0cm",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clhouvw1b202681fxo42p1higd",
      email: "jahancoolbest@gmail.com",
    },
  },
  {
    id: "clku1mckk50351f133hvk7u8m",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl318a5rr122091h0g5fatrhbt",
      email: "d.tatyana@gmail.com",
    },
  },
  {
    id: "clku2nezy89731f13wkmfr6zo",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clguv68d0838901f032cxt3hyw",
      email: "vesennea@yandex.ru",
    },
  },
  {
    id: "clku2t5ff97241f135siw5au8",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clguv68d0838901f032cxt3hyw",
      email: "vesennea@yandex.ru",
    },
  },
  {
    id: "clku58peb131151f1304vfmtqi",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clku58nsq130871f13l7xgvev1",
      email: "fiorela@mail.ru",
    },
  },
  {
    id: "clku79vm9182361f13hcgxzqd5",
    emailCampaign: {
      name: "Корпоративное право",
    },
    user: {
      id: "cjxqs08am000f07421ctv187d",
      email: "popkov_artem_bratsk@mail.ru",
    },
  },
  {
    id: "clku7cmrl186941f1312hc4mux",
    emailCampaign: {
      name: "Арбитражный процесс",
    },
    user: {
      id: "cjxqs08am000f07421ctv187d",
      email: "popkov_artem_bratsk@mail.ru",
    },
  },
  {
    id: "clku8bjwn193171f138jtufa0t",
    emailCampaign: {
      name: "Due Diligence in M&A",
    },
    user: {
      id: "cljabxtps219341fyz4gdu5mkc",
      email: "ti2001@inbox.ru",
    },
  },
  {
    id: "clkujsgfw198621f13akx7p3nx",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkujsexw198381f13r76rc1wa",
      email: "marina.borisowna2010@yandex.ru",
    },
  },
  {
    id: "clkul5p7c203491f13f6cfk4ng",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkul5nno203221f13v90wxneh",
      email: "aleksandrina_vtu@mail.ru",
    },
  },
  {
    id: "clkuse2af244271f1393yfjkvi",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "cl5ax380f620331hpa9msto923",
      email: "saburova.oksana@yandex.ru",
    },
  },
  {
    id: "clkuvdetz291031f13x3fkkbo0",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cljsj9oqb334061f23cc8mklgg",
      email: "annavikenteva@gmail.com",
    },
  },
  {
    id: "clkuz2uvd458901f13hfxa93la",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clhouvw1b202681fxo42p1higd",
      email: "jahancoolbest@gmail.com",
    },
  },
  {
    id: "clkv9swl6785821f13z9vulbyk",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "clkv9sv8m785531f13xw53tqr9",
      email: "s0139934@msal.edu.ru",
    },
  },
  {
    id: "clkvdg6pu841341f13msvdv0m9",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkvdew14837181f13vcbbcw0x",
      email: "newuser@besavvy.app",
    },
  },
  {
    id: "clkvdmmwm843391f138hap2mh5",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkvdmlid843111f13enb60ik6",
      email: "artemmoskvichev05@mail.ru",
    },
  },
  {
    id: "clkveih7z858011f13yxtuisly",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clk4aju79313361fxj3x1dqp6i",
      email: "sokolovalubov95@yandex.ru",
    },
  },
  {
    id: "clkvmm90c28951fzarjjuqmo8",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cjxqs08am000f07421ctv187d",
      email: "popkov_artem_bratsk@mail.ru",
    },
  },
  {
    id: "clkvxo5mm88771fzafm46p7o9",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkul5nno203221f13v90wxneh",
      email: "aleksandrina_vtu@mail.ru",
    },
  },
  {
    id: "clkw4mcez111291fza9b44m811",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkw4mb14111001fzalf1aahia",
      email: "demitrieva99@mail.ru",
    },
  },
  {
    id: "clkwdho4x283571fzaddk9mv9g",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clkauroz1531761fzref96uvtt",
      email: "bbziev@mail.ru",
    },
  },
  {
    id: "clkwfl3g4387251fza89322j6s",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkvdmlid843111f13enb60ik6",
      email: "artemmoskvichev05@mail.ru",
    },
  },
  {
    id: "clkwfl9wb391661fzad3bmo9p2",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkvdmlid843111f13enb60ik6",
      email: "artemmoskvichev05@mail.ru",
    },
  },
  {
    id: "clkwg9mc3415471fza12zg386a",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkvdmlid843111f13enb60ik6",
      email: "artemmoskvichev05@mail.ru",
    },
  },
  {
    id: "clkwizmyf426311fzaqtthf2t9",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clivv9rbi28621gslkqozilup",
      email: "kristianafiore@gmail.com",
    },
  },
  {
    id: "clkxtdnf8370441fvn2u8uc15p",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkxtdlot369871fvnr5ehkgxf",
      email: "shekhanin.vova18@yandex.ru",
    },
  },
  {
    id: "clkxtzy5e397561fvnipju9azu",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkxtdlot369871fvnr5ehkgxf",
      email: "shekhanin.vova18@yandex.ru",
    },
  },
  {
    id: "clkxu10z8402721fvnqw1rnyrf",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkxtdlot369871fvnr5ehkgxf",
      email: "shekhanin.vova18@yandex.ru",
    },
  },
  {
    id: "clkxu1hzb405131fvny6qu674c",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkxtdlot369871fvnr5ehkgxf",
      email: "shekhanin.vova18@yandex.ru",
    },
  },
  {
    id: "clkxu53wy408991fvnt8pz71mx",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clkxtdlot369871fvnr5ehkgxf",
      email: "shekhanin.vova18@yandex.ru",
    },
  },
  {
    id: "clkxxtj6a215371f3ek9c7xmkp",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cjyli0kzn000t0794395y84md",
      email: "mikhaylovkm24@gmail.com",
    },
  },
  {
    id: "clky12f26361231f3e8uexwrqi",
    emailCampaign: {
      name: "Банкротство",
    },
    user: {
      id: "clky12dgw360951f3ei6p0rm8u",
      email: "denproc98@mail.ru",
    },
  },
  {
    id: "clky14peu369561f3erqvpdqex",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clky12dgw360951f3ei6p0rm8u",
      email: "denproc98@mail.ru",
    },
  },
  {
    id: "clky83lva440981f3egg78j2ym",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "cl56mc4kv79391h0mlc7795xh",
      email: "nvfineyes@gmail.com",
    },
  },
  {
    id: "clky8hiqp502081f3eodwp54r5",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "clky8hh91501651f3eosmu8bbs",
      email: "larag238r@gmail.com",
    },
  },
  {
    id: "clky8l4dl525241f3ei0zdjl63",
    emailCampaign: {
      name: "IP",
    },
    user: {
      id: "clky8hh91501651f3eosmu8bbs",
      email: "larag238r@gmail.com",
    },
  },
  {
    id: "clkycko71537281f3e22dri0ps",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "clkbesh5z446171fy1nqx15b3n",
      email: "what_splat0a@icloud.com",
    },
  },
  {
    id: "clkyjz3og561711f3eod7nt2rk",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "ck2gl7mzp03ks0757gae9vxo0",
      email: "akievvvv@mail.ru",
    },
  },
  {
    id: "clkz55k4o627621f3ei0a0ug8a",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clkz55im9627341f3ej3jlq17a",
      email: "79476494055@yandex.ru",
    },
  },
  {
    id: "cll00p2n5419611fvxiu6mg220",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clbv5u7cs673311hxnq3i5ufqg",
      email: "vilgelminavishnevskaya@yandex.ru",
    },
  },
];

const uniqueEmailCount = countUniqueEmails(data);
console.log(uniqueEmailCount); // Output: 18
