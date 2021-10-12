export const endpoint = `http://localhost:4444/graphql`;
export const prodEndpoint =
  `https://api.besavvy.app/graphql` || `https://api.besavvy.ru/graphql`;
export const NEXTAUTH_URL = "http://localhost:7777";

export const Unis = [
  { "Выберите вуз": "cjyimfz2e00lp07174jpder3m" },
  { ВГУ: "cjysm4jdi03oi0719phcoyk5a" },
  { ВГУЮ: "cjysm4txz03or0719bh0nag7y" },
  { ДВФУ: "cjysm51ct03p00719qv5ufokv" },
  { ИвГУ: "cjysm57pq03p907196ssoz77n" },
  { КАЗГЮА: "cjyig05tk02110784ap6ilnt6" },
  { КГУ: "cjysm5f2m03pi0719fomjppue" },
  { КубГУ: "cjysm5jlw03pr0719pgm2yykk" },
  { КФУ: "cjysm5obf03q00719audenyt2" },
  { МГАДА: "cjysm5t8m03q90719e79k390t" },
  { МГИМО: "cjyifz5k5020s0784i2mm7ple" },
  { МГПУ: "cjysm65qt03qi07196elvhcl2" },
  { МГТУ: "cjysm6bct03qr0719dylkwb34" },
  { МГУ: "cjysm6g0o03r00719j75o05xl" },
  { МГЮА: "cjysm6l9103r907198gi9cyd7" },
  { НГУ: "cjysm6pz503ri071956iiwg5h" },
  { "НИУ БелГУ": "cjysm6vys03rr0719q5j3hcxf" },
  { "НИУ ВШЭ": "cjysm70m203s00719lypsoizc" },
  { ОГУ: "cjysm757903sa0719wtra4u33" },
  { РАНХиГС: "cjysm79he03sj07194whxm56a" },
  { РГГУ: "cjysm7d9a03ss0719susstbko" },
  { РГПУ: "cjysm7hvq03t10719zoc5je2l" },
  { РГУП: "cjysm7mh403ta07199vtzh4m0" },
  { РТА: "cjysm7se903tj0719aodga7la" },
  { РУДН: "cjysm833103ty0719l0ltm8is" },
  { РШЧП: "cjysmaoeh03y707197hmfj0dn" },
  { РЭУ: "cjysm88n603u70719iwj14tle" },
  { СГЮА: "cjysm8d7o03ug0719egwxey2s" },
  { СДУ: "cjysm8h0103up0719t5vljlhb" },
  { СПбГУ: "cjysm8lfz03uy0719ywi636hj" },
  { СПбГЭУ: "cjysm8qg003v70719ull0wh04" },
  { СПбПУ: "cjysm8uvu03vg0719a56zyb2v" },
  { СФУ: "cjysm8zef03vp0719e9h5dlws" },
  { ТГУ: "cjysm94fh03vy0719332up3ky" },
  { ТулГУ: "cjysm98r903w70719op9uf7xa" },
  { ТУСУР: "cjysm9cfg03wg07193j372u02" },
  { ТюмГУ: "cjysm9gpd03wp0719omw3nxw1" },
  { УрГЮУ: "cjysma6tv03x807195lqdcp7r" },
  { Финуниверситет: "cjysmaaq803xh0719jsih24yi" },
  { ЮГУ: "cjysmafq103xp071997iaod4z" },
  { ЮУрГУ: "cjysmak2803xy0719n0d5ylws" },
  { ЮФУ: "cjysmaoeh03y707197hmfj0dn" },
  { Другой: "cjyimfz2e00lp07174jpder3m" },
];

export const Companies = [
  { "Tomashevskaya & Partners": "ck2eobfn204s80785xo66ybzw" },
  { "CyberLaw School": "ck7f4o0zf01re0736df2ivhhw" },
  { Другая: "ck7f4ooa201ro0736gzahsdhn" },
];

export const Tracks = [
  { "Корпоративное право": "cjwx78u7700rb07121pelqctm" },
  { "Право и технологии": "cjwx79iaj00rk0712tz12j7vi" },
];

export const Specials = [
  {
    courses: [
      "cjtreu3md00fp0897ga13aktp",
      "ck4n47a2j01jg0790gspxqxju",
      "ck89zsn5200790701jcpqxmiu",
    ],
    discounts: [1, 0.9, 0.8],
    teacher: false,
  },
  {
    courses: [
      "ck0pdit6900rt0704h6c5zmer",
      "ck2f2nk4007dw0785lhixfppw",
      "ck587y4kp00lf07152t0tyywl",
    ],
    discounts: [1, 1, 0.76],
    teacher: true,
  },
];

export const Levels = [
  {
    level: 500,
    text: "Когда у вас будет 500 уровень, вы сможете получить скидку 20% на любой курс.",
  },
  {
    level: 1000,
    text: "Когда у вас будет 1000 уровень, вы сможете получить скидку 50% на любой курс.",
  },
  {
    level: 2000,
    text: "Когда у вас будет 2000 уровень, вы сможете получить бесплатный доступ к одному из курсов.",
  },
  {
    level: 3000,
    text: "Когда у вас будет 3000 уровень, вы сможете получить бесплатный доступ к одному из курсов.",
  },
];

export const Reviews = [
  {
    coursePage: "ck587y4kp00lf07152t0tyywl",
    reviews: [
      {
        id: 1,
        author: "Марина Владимирова",
        text: "Прошла курс по корпоративному праву! Понравилось тем, что акцент был поставлен именно на практическую часть в виде вопросов и задач. И отличительной особенностью является именно то, что тебе не просто кидают задачу, ты пишешь ответ и высвечивается правильно/неправильно, а тебя учат , как именно нужно подступиться к решению вопроса, в какой нпа надо посмотреть. В итоге, с помощью наводящих вопросов ты сам доходишь до правильного ответа, это очень круто! Более того, Дени всегда на связи и ответит на абсолютно любые вопросы. Итого, само содержание курса, оперативные ответы от Дени и Михаила - всё это мне помогло увидеть примеры задач, которые надо решать, если работаешь в этой сфере. Спасибо Дени и Михаилу за курс! Соглашусь с другими участниками в пожелании того, что хотелось бы ещё больше материала и задач!:)",
        link: "https://vk.com/topic-165635789_40660140",
        source: "VK",
      },
      {
        id: 4,
        author: "Оля Арефьева",
        text: `Долго я хотела найти материал/информацию/актуальную литературу/практику по корпоративному праву. Более того я набирала в поисковой строке, надеясь найти что-то полезное, и мне Google выдавал только курсы повышения квалификации. Очень дорого и неэффективно в моем случае.
      Хотела что-то полезное. Как видите выбор был не ахти!
      
      Кому подойдёт этот курс? Скорее всего, тому кто мало, что знает о корпоративном праве. Взаимодействие с участниками для тех, кто любит общаться)
      
      Что в итоге имею я? Знание основ корпоративного права; чёткое понимание того, как это все работает в России и что есть к чему стремиться; оказывается корпоративное право это очень интересно.
     `,
        link: "https://vk.com/topic-165635789_40660140",
        source: "VK",
      },
      {
        id: 3,
        author: "Антон Ряхлов",
        text: "Отличный курс. Материал и подача созданы таким образом, что даже у тех, у кого обычно плохо запоминается сплошной текст, многое отложится. В основе лежат важные моменты, которые должны пригодится непосредственно в практике. Очень хорошие кейсы, особенно финальный. Но главный плюс, что это не автономный тест, всегда имеется возможность проконсультироваться, спросить и с технической точки зрения и непосредственно по материалу у автора. Также советую брать полный курс с вебинарами, они очень полезны, так как есть возможность задать свои вопросы",
        link: "https://vk.com/topic-165635789_40660140",
        source: "VK",
      },
      {
        id: 6,
        author: "Анастасия Большакова",
        text: `В курсе понравился формат заданий, все легко запоминается. Плюсом является также то, что можно задавать вопросы Дени, всегда быстро и подробно отвечал и помогал разобраться. Курс подойдёт тем, кто начинает изучать корпоративное право. Хотелось бы, чтобы в курсе темы были побольше проработаны, кое-где не хватало информации для понимания. Также, возможно, стоит охватить больше тем, чем охвачено в курсе, т.к. для хорошего понимания основ корпоративного права предложенного материала, на мой взгляд, маловато`,
        link: "https://vk.com/topic-165635789_40660140",
        source: "VK",
      },
      {
        id: 5,
        author: "Роман Присекин",
        text: "Отличный курс! Все изложено лаконично и понятным образом👌🏻",
        link: "https://vk.com/topic-165635789_40660140",
        source: "VK",
      },
      {
        id: 2,
        author: "Игорь Белов",
        text: "Очень понравился курс! Материал изложен в просто и понятной форме. Больше всего понравилось общение с Дэни и возможность задавать любые интересующие вопросы (не только про корпоративное право).",
        link: "https://vk.com/topic-165635789_40660140",
        source: "VK",
      },
    ],
  },
  {
    coursePage: "ck0pdit6900rt0704h6c5zmer",
    reviews: [
      {
        id: 1,
        author: "Лев Толстопятов",
        text: `Курс действительно очень полезный, поскольку необходимый материал всегда берется из источников по типу статей международных юридических фирм, хороших учебников и договоров. 
          (Самое главное, что не приходится изучать систему судов Великобритании и США и прочие вещи, которые в практике никогда не понадобятся - откройте любой учебник по юр английскому, 
            и Вы начнёте свое образование именно с этого). 
              Более того, курс учит не только писать простым языком (это, кстати, лично мне далось лишь раза с 5, хотя первое задание было максимально простым - для человека с юрфака писать несложно уже моветон), 
              но и структурировано и логично. Ну и, конечно же, нагрузка - на каждое задание обычно уходит не так много времени, в чем большой плюс для занятых учебой/работой людей (часто изучение языка откладывается в долгий ящик как раз из-за нехватки времени). Общее впечатление: от курса остался очень довольным и всем рекомендую)
          `,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 2,
        author: "Karina Karatamakova",
        text: `Курс очень ёмкий, полезный и интересный. Преподаватель (Михаил) обладает уникальным сочетанием навыков и старается развить их у своей аудитории, обращая внимание на то, что важна не только содержательная часть какого бы то ни было письменного документа, но и его форма. Поэтому на протяжении курса Михаил обращает особое внимание на правила построения как всего текста, так и его абзацев и отдельных предложений. Учит в каждый момент времени написания текста думать не о себе, а в первую очередь о читателе, о том, кому этот текст адресован.
        Несомненным плюсом является и то, что курс максимально адаптирован под современные реалии, нет абстрактных и отвлеченных заданий. Задания небольшие по объему, каждое из них направлено на то, чтобы быстро сформировать навык, который сразу же можно применить на практике.
     `,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 3,
        author: "Александра Жердева",
        text: `Мне очень нравится данный курс.
      В него включено множество заданий, посвященных тонкостям юридического английского (лексике, написанию договоров, правильному оформлению текстов, непосредственно юридическому переводу), а также заданий на грамматику, в частности включены такие наиболее тяжело усваиваемые темы как модальные глаголы.
      Отдельно хотелось бы отметить удобный формат занятий. Все задания выполняются дистанционно, каждый день Преподаватель (Михаил) выкладывает новые задания в группе, которые возможно выполнить в удобное время в течение дня и отправить на проверку. Преподаватель очень ответственно подходит к занятиям. Всегда быстро проверяет выполненные упражнения, отвечает на все заданные вопросы, помогает справиться со всеми возникшими трудностями.`,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 4,
        author: "Настя Шашкина",
        text: `Решение начать этот курс - одно из самых правильных моих решений.

        Во-первых, он очень мотивирующий и дающий уверенность: ты делаешь и у тебя получается. А у тебя точно получится, потому что изначально информация даётся очень понятно и доступно, а потом, разбирая свои ошибки, запоминаешь все ещё лучше.
        
        Во-вторых, очень легко воспринимать структурированную информацию с большим количеством примеров.
        
        В-третьих, если что-то непонятно, всегда можно обратиться с вопросом, даже если он не касается самого курса, но касается юридического английского или английского в целом.
        
        Мне очень нравится этот курс, ни разу у меня не возникло мысли, что мне не хочется выполнять задание, потому что они всегда полезные и, что очень важно, в адекватных объемах. Конечно, иногда не успеваешь, но всегда можно договориться с преподавателем, как лучше наверстать материал.`,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 5,
        author: "Марсель Харисов",
        text: `Курс мне очень понравился. Поначалу я смотрел на него как на очередную авантюру в стиле "Выучить/понять английский язык на уровне носителя за месяц", но курс ни разу не разочаровал (хотя признаюсь, были моменты, когда задания делать было лень. Но это уже скорее была моя вина, нежели Михаила)

        Мне понравилось то, что на курсе научили правильно выражать свои мысли. С английским это связано косвенно, но без умения грамотно и просто писать мысли просто будут запутываться, получится сложный текст из предложений длиной по полстраницы. Так же, как и Льву, мне пришлось много раз переписывать первое задание, связанное с ответом на простой вопрос. Я очень злился из-за каждого исправления в нем, но теперь понимаю, что меня учили выражать свои мысли просто и без всякой мишуры.
        
        Меня удивило то, что твои ошибки при выполнении задании не просто зачеркивают и пишут правильный ответ. В сложных случаях всегда есть обоснование правильного ответа. Если ошибку не объяснят, то всегда можно спросить.
        
        Курс советую, понравился`,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 6,
        author: "Оля Тимошенко ",
        text: `Мое прохождение этого курса оказалось очень продуктивным. Это первый формат подобного изучения английского, который мне приходилось встречать, и он получился удачным. Каждый день занятие английским, хотя бы пол часа/час в день не выходя из дома, на скучной лекции , в дороге - это то, что нужно для результата. И я его действительно ощущаю: благодаря обширной юридической лексике , нюансам переводов, отельным правилам грамматики, которые мы разбирали, я стала намного лучше читать и понимать юридические тексты. Все знания, которые были получены, я уверена, пригодятся на практике. Взять к примеру составление мотивационного письма и резюме - каждый из нас обязательно столкнётся со сложностями их составления. В общем, я очень рада, что Михаил стал инициатором этого курса и что я решила записаться на него :) Всем советую!`,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
    ],
  },
  {
    coursePage: "ck2f2nk4007dw0785lhixfppw",
    reviews: [
      {
        id: 1,
        author: "Иван Ноев",
        text: `Курс позволяет получить те навыки, которые имеют непосредственное отношение к работе юриста (умение лаконично и грамотно изъясняться, умение работать с договорами на английском языке). 
        Михаил всегда помогает при возникновении трудностей, тщательно проверяет домашние задания, с ёмкими разъяснениями. Не могу не отметить лояльное отношение к опозданиям, у вас будет возможность доделать то, что не успели, даже на следующей неделе.
        Курс подойдёт тем, кто не может самостоятельно начать работать над своим уровнем юридического английского (таким был я). После 2 месяцев занятий остались только положительные впечатления от совместной работы, и я бы с удовольствием записался на продолжение курса.`,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 4,
        author: "Танюша Прокопова",
        text: `Так рада, что подруга рассказала мне о Мише и его, не побоюсь этого слова, легендарном курсе по юридическому английскому.
        Подходит к концу второй месяц нашего курса, и я могу сказать, что если Вы хотите начать заниматься языком в своё удовольствие, то Вы знаете что делать))
        Мне очень нравится сторителлинг, потому что невероятно интересно следить за историей героя, за тем, что происходит в его жизни, как он проходит свой профессиональный путь.
        Выше уже писали, что мы учимся писать красивые, грамотные и одновременно простые тексты, это, действительно, так. Что является огромным плюсом, изучая правила, которые нам предлагались к каждому уроку по этой теме, я стараюсь применять и при выражении своих мыслей в русском языке.
        
        Надеюсь, что за оставшееся время смогу ещё лучшить свои навыки и влюбится в изучение языка окончательно.
        `,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 3,
        author: "Олеся Клешева",
        text: `
        Курс действительно будет полезен тем, кто изучает юридический английский. Теория очень хорошо структурирована, что позволяет быстро вникнуть в суть темы и быстро выполнить упражнения. Отдельное спасибо за очень интересный и современный материал. Я узнала много новой информации, не связанной с языком. Эти 2 месяца прохождения курса оставили только положительные эмоции. С удовольствием продолжу обучение!
        `,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 2,
        author: "Роман Матюшенков",
        text: `
        Я не вижу смысла описывать курс и повторять предыдущих авторов. Отмечу коротко преимущества:
1. Задания каждый день, т.е. система. ( Хотя я частенько пропускал и потом догонял, лучше делать каждый день)
2. Грамматика
3. Лексика (Пособие просто топ на мой взгляд)
4. Развитие навыка правильно, понятно, просто писать
5. Индивидуальный разбор полетов.
Я считаю, что никогда не поздно учиться, поэтому не бойтесь хотябы попробовать. Если есть вопросы, пишите в личку.
     `,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
      {
        id: 5,
        author: "Илья Казеко",
        text: `Хочу поблагодарить Мишу за хороший и доступный по цене курс.
        Для меня было полезным:
        1. Разобрать структуры юридических текстов (IRAC и др.)
        2. Понять свой уровень навыка письма и выявить слабые места
        3. Поработать с юридическими терминами.
        Многое из того, что узнал на курсе, активно применяю на учебе и на работе. Например, структура построения ответа, которая помогает более точно и емко выражать свои мысли, экономя при этом время.
        В целом, рекомендовал бы каждому пройти как минимум первый месяц, чтобы оценить свои навыки и увидеть зоны роста.`,
        link: "https://vk.com/topic-165635789_39227413",
        source: "VK",
      },
    ],
  },
];
