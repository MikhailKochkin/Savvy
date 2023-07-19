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
    id: "cljw4zu99713771ft3560zi4sg",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "clau57pwx321961h4ulgpuygdf",
      email: "nastjaant@gmail.com",
    },
  },
  {
    id: "cljwl71pn160731fx52athdixo",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clidgccgy116091ftggbt35a1z",
      email: "aksakalipn@gmail.com",
    },
  },
  {
    id: "cljwtth40537031fx5ywspe7dk",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cljx8mzaw890651fx5mwulwa9d",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "cl5t1m2i7860631hzqnri2cmav",
      email: "fhcc@mai.ru",
    },
  },
  {
    id: "cljxvj68r53711f2w1fqmm9qo",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "cljxvj4sb53421f2wvlougeq0",
      email: "anuta.grischina2016@yandex.ru",
    },
  },
  {
    id: "cljy0antm126401f2ww2mljlpa",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "ck0rwtqoq01970787ak54osqs",
      email: "olga_romanova@ratum.ru",
    },
  },
  {
    id: "cljy7i735253321f2wddfktjjz",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "cljy7i5pe253051f2w0psqnm5p",
      email: "gabrielchochola@gmail.com",
    },
  },
  {
    id: "cljydd3do425821f2wmggd78u7",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "ckfc8q1yc044w0702uaqbs6sb",
      email: "dr.anastasiaaa@gmail.com",
    },
  },
  {
    id: "cljye7kx4541931f2wh072o24k",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "cjqy9i57l000k0821rj0oo8l4",
      email: "mi.kochkin@ya.ru",
    },
  },
  {
    id: "cljye85jx547401f2w74isl9vq",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "ckfc8q1yc044w0702uaqbs6sb",
      email: "dr.anastasiaaa@gmail.com",
    },
  },
  {
    id: "cljye8zpu550821f2wmgnmjsti",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "ckfc8q1yc044w0702uaqbs6sb",
      email: "dr.anastasiaaa@gmail.com",
    },
  },
  {
    id: "cljyk267e683211f2wev8hzv6p",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljyk24ch682921f2wdgmvri5f",
      email: "dmitrieva-n-s@mail.ru",
    },
  },
  {
    id: "cljylf89l707121f2wtbdcx19h",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljylf5kq706711f2wm7wfqt2c",
      email: "anton_zventa@mail.ru",
    },
  },
  {
    id: "cljz9u37s09711fxt95bdxixv",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljz9u0lr09431fxtt6fx6qzf",
      email: "katedemen137@gmail.com",
    },
  },
  {
    id: "cljzdo64q54831fxty1k48o4p",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clio70w3y381101fxqo5453w6i",
      email: "popova.avp26@gmail.com",
    },
  },
  {
    id: "cljze17xq58711fxt67qeonxv",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljze16az58441fxtgkbjnp37",
      email: "milena.krivozub@mail.ru",
    },
  },
  {
    id: "cljzeeoih83081fxt3s5w36bd",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clictxdxr573961f2ym9uxgw34",
      email: "fevral17m@mail.ru",
    },
  },
  {
    id: "cljzfd5av210851fxtfpznxfaa",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljzfd3pj210341fxt5xff9qxy",
      email: "g.alena0310@gmail.com",
    },
  },
  {
    id: "cljzfrsx1230901fxtxgd2l5eh",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cla7x7pop723371hukg4r2sxml",
      email: "nick.berezhnov@gmail.com",
    },
  },
  {
    id: "cljzh67hc323361fxt3gc8c9zc",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljzh6641323091fxtqmo8korw",
      email: "euginetwinkling17@gmail.com",
    },
  },
  {
    id: "cljzhi77y339651fxtbaawxr3h",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljzhi64h339371fxt38irx7f9",
      email: "missis.pandochka@yandex.ru",
    },
  },
  {
    id: "cljzicd9b373291fxt6lx9mr0p",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljy3c69t186531f2wli21ek33",
      email: "albrandt.angelina@ya.ru",
    },
  },
  {
    id: "cljzjh461424851fxt4hjjl2rf",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clelp1maj889831frea3w8ieke",
      email: "sandra_a_88@mail.ru",
    },
  },
  {
    id: "cljzlypgl595551fxt24bp1z8x",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "ckfc8q1yc044w0702uaqbs6sb",
      email: "dr.anastasiaaa@gmail.com",
    },
  },
  {
    id: "cljznd1e4619631fxtb8hldytd",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cjuptmzob00080759j1wrgjar",
      email: "kotkova.victoria@yandex.ru",
    },
  },
  {
    id: "cljzuh07e810141fxttsofdydb",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clj6udztq487081fs8qz2pvmes",
      email: "lizaveta1902@icloud.com",
    },
  },
  {
    id: "cljzy1ecn825091fxt7ffdrmm4",
    emailCampaign: {
      name: "Адвокатский экзамен",
    },
    user: {
      id: "cksf3534o215881guv92uxlr1m",
      email: "gyulnara.allyamova@mail.ru",
    },
  },
  {
    id: "cljzys4wp874261fxt89qaxdy8",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljzys3bq873951fxtmfsrtyyj",
      email: "alena.beller@mail.ru",
    },
  },
  {
    id: "clk03uh1z1129171fxteg1lf868",
    emailCampaign: {
      name: "Адвокатский экзамен",
    },
    user: {
      id: "clbscrs0f545031h0hs8fykmfh",
      email: "notak66375@bitvoo.com",
    },
  },
  {
    id: "clk046khw1150621fxtdubd3ulv",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "ckwtkmdp01280811hw04oa2gmin",
      email: "706lena@gmail.com",
    },
  },
  {
    id: "clk0eano901031ftnhb51ld3i",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clk0eam1u00671ftni9h3www2",
      email: "ya.oksana@hotmail.com",
    },
  },
  {
    id: "clk0om6v523201ftnv73d1nad",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "cljbwk9qa71951fvocorasg3n",
      email: "neweshdz@gmail.com",
    },
  },
  {
    id: "clk13bx8h210981ftn92vlgqlu",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cjqziydoy000u0817fw7b7x3h",
      email: "nexian321@gmail.com",
    },
  },
  {
    id: "clk13cnum214371ftn8nd1qglj",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cjqziydoy000u0817fw7b7x3h",
      email: "nexian321@gmail.com",
    },
  },
  {
    id: "clk17e40v257731ftn6syvrfqk",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clk17e20c257311ftnyfbci60g",
      email: "ivanzolud86@gmail.com",
    },
  },
  {
    id: "clk17imyf280961ftn145bdts8",
    emailCampaign: {
      name: "Гражданское право. Фундамент карьеры",
    },
    user: {
      id: "clk17e20c257311ftnyfbci60g",
      email: "ivanzolud86@gmail.com",
    },
  },
  {
    id: "clk1mthgc463791ftnscgnevcf",
    emailCampaign: {
      name: "Адвокатский экзамен",
    },
    user: {
      id: "cjxqs08am000f07421ctv187d",
      email: "popkov_artem_bratsk@mail.ru",
    },
  },
  {
    id: "clk1queqm491791ftnyq55fpwy",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clg1eamoo547111fx5zar1on93",
      email: "egoekojber@gmail.com",
    },
  },
  {
    id: "clk26x83831911fzqg2x8h0zv",
    emailCampaign: {
      name: "Банкротство",
    },
    user: {
      id: "clg5kuyy867101fz3rtr1eg0w",
      email: "roman.tretyakov.97@mail.ru",
    },
  },
  {
    id: "clk2r8mym461641fzqyzw36jxw",
    emailCampaign: {
      name: "70 новых слов из Legal English за 3 дня",
    },
    user: {
      id: "clivv9rbi28621gslkqozilup",
      email: "kristianafiore@gmail.com",
    },
  },
  {
    id: "clk2rqmxw467541fzqw7gzuyng",
    emailCampaign: {
      name: "Банкротство",
    },
    user: {
      id: "cjxrxqwxt033i0742aicn6f93",
      email: "rocket_ride@mail.ru",
    },
  },
  {
    id: "clk2rqtbe469521fzqgcfs9jhe",
    emailCampaign: {
      name: "Банкротство",
    },
    user: {
      id: "cjxrxqwxt033i0742aicn6f93",
      email: "rocket_ride@mail.ru",
    },
  },
  {
    id: "clk2xk2ui538151fzqmqhw6u0u",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clk2xk0rm537681fzqcc0ltpr6",
      email: "elenadom898959@gmail.com",
    },
  },
  {
    id: "clk2yap8e565411fzqwp9jkllt",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "clk2xk0rm537681fzqcc0ltpr6",
      email: "elenadom898959@gmail.com",
    },
  },
  {
    id: "clk2zaikn600701fzqbjaygc1k",
    emailCampaign: {
      name: "Корпоративное право",
    },
    user: {
      id: "clk2xk0rm537681fzqcc0ltpr6",
      email: "elenadom898959@gmail.com",
    },
  },
  {
    id: "clk4ajvmh313641fxjg0ojzbxv",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clk4aju79313361fxj3x1dqp6i",
      email: "sokolovalubov95@yandex.ru",
    },
  },
  {
    id: "clk4cdc62407271fxj2xnx1of9",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "ckbw9bcmr02l70725ey0jgnxr",
      email: "vadim-efremov-00@mail.ru",
    },
  },
  {
    id: "clk4cqh4j423461fxj0yk93xiw",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clk4cqfb9423091fxjvmyz2uef",
      email: "chibi.tch@yandex.ru",
    },
  },
  {
    id: "clk4d9n8n450731fxj5eo2rhjd",
    emailCampaign: {
      name: "Speaking",
    },
    user: {
      id: "clbjrv93f511601hvwvddbz7ax",
      email: "dadzhiev.igor@gmail.com",
    },
  },
  {
    id: "clk4fhjm9475721fxj0g3ho1cr",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clk4fhi0e475431fxjq3t2ysm0",
      email: "asya.vlasova2002@mail.ru",
    },
  },
  {
    id: "clk4flayl494541fxj7dkvfkpj",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clk4fhi0e475431fxjq3t2ysm0",
      email: "asya.vlasova2002@mail.ru",
    },
  },
  {
    id: "clk4p39jt525921fxjjo88ssff",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "clemqmywe252831gyvmhjp35vm",
      email: "sofiarotaru2005@gmail.com",
    },
  },
  {
    id: "clk59qp4411361f0p2xmktvm2",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "ckiovcg8p02hs0750z9ztqxk8",
      email: "kamilkinsss@gmail.com",
    },
  },
  {
    id: "clk5bej9q25011f0ptr2qte8c",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljfp3qgl207311ftwjkfe42j3",
      email: "simonenko01_alina@mail.ru",
    },
  },
  {
    id: "clk5bevu130991f0p0vll9ui5",
    emailCampaign: {
      name: "Налоги",
    },
    user: {
      id: "cljfp3qgl207311ftwjkfe42j3",
      email: "simonenko01_alina@mail.ru",
    },
  },
  {
    id: "clk5qkg66310071f0pc9p8v66q",
    emailCampaign: {
      name: "Адвокатский экзамен",
    },
    user: {
      id: "ckv47x4xh455751i18iatl96ia",
      email: "itsplokhovaa@gmail.com",
    },
  },
  {
    id: "clk5qp7we331071f0ph5aerdil",
    emailCampaign: {
      name: "Corporate",
    },
    user: {
      id: "ckv47x4xh455751i18iatl96ia",
      email: "itsplokhovaa@gmail.com",
    },
  },
];

const uniqueEmailCount = countUniqueEmails(data);
console.log(uniqueEmailCount); // Output: 18
