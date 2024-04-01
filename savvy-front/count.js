let ratings = [
  {
    rating: 10,
  },
  {
    rating: 10,
  },
  {
    rating: 10,
  },
  {
    rating: 10,
  },
  {
    rating: 8,
  },
  {
    rating: 10,
  },
  {
    rating: 10,
  },
  {
    rating: 10,
  },
];

function getObjectValues(arr) {
  return arr.map((obj) => obj.rating);
}

totalCount = average = (
  getObjectValues(ratings).reduce((a, b) => a + b, 0) / ratings.length
).toFixed(2);

const medianFunc = (values) => {
  // if (values.length === 0) throw new Error("No inputs");

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};
const lessonResults = [
  {
    id: "clsrhxh8v0010xs2umrtx9d52",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Административное судопроизводство. Часть 2",
    },
    progress: 7,
    createdAt: "2024-02-18T12:40:53.647Z",
    updatedAt: "2024-02-18T12:41:00.720Z",
  },
  {
    id: "clsvlfzes0033sd0yro8ijfe4",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Модель IRAC и практическое задание № 2",
    },
    progress: 0,
    createdAt: "2024-02-21T09:30:20.548Z",
    updatedAt: "2024-02-21T09:30:20.548Z",
  },
  {
    id: "clsvlg0670034sd0yo22bq4u8",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Модель IRAC и практическое задание № 2",
    },
    progress: 0,
    createdAt: "2024-02-21T09:30:21.536Z",
    updatedAt: "2024-02-21T09:30:21.536Z",
  },
  {
    id: "clsvsk23u000axs6khxrfzaru",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 0,
    createdAt: "2024-02-21T12:49:27.978Z",
    updatedAt: "2024-02-21T12:49:27.978Z",
  },
  {
    id: "clsvsmgh1000dxs6k73fey86i",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 0,
    createdAt: "2024-02-21T12:51:19.910Z",
    updatedAt: "2024-02-21T12:51:19.910Z",
  },
  {
    id: "clsvsk21q0009xs6kw6s857ik",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 0,
    createdAt: "2024-02-21T12:49:27.902Z",
    updatedAt: "2024-02-21T12:49:27.902Z",
  },
  {
    id: "clsvsk3ck000bxs6krg3c5y64",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 4,
    createdAt: "2024-02-21T12:49:29.498Z",
    updatedAt: "2024-02-22T07:42:32.707Z",
  },
  {
    id: "clsvsmffr000cxs6k78o3sewj",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 6,
    createdAt: "2024-02-21T12:51:18.567Z",
    updatedAt: "2024-02-26T10:55:31.845Z",
  },
  {
    id: "clsvsmhcg000exs6k6iwyvy8t",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 3,
    createdAt: "2024-02-21T12:51:21.040Z",
    updatedAt: "2024-02-22T08:54:51.806Z",
  },
  {
    id: "clsvu9t5i007rsd0ywu2j3qd2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Практическое задание №3: написание юридического эссе",
    },
    progress: 11,
    createdAt: "2024-02-21T13:37:29.046Z",
    updatedAt: "2024-02-21T13:37:42.981Z",
  },
  {
    id: "clswwyodn000gxswoy7zd0ffl",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 5,
    createdAt: "2024-02-22T07:40:34.576Z",
    updatedAt: "2024-02-22T07:40:53.055Z",
  },
  {
    id: "clswx0eyi000hxswod1h6eb7j",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 4,
    createdAt: "2024-02-22T07:41:55.771Z",
    updatedAt: "2024-02-26T10:53:16.254Z",
  },
  {
    id: "clswxpek9000rxswov6ndriut",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 0,
    createdAt: "2024-02-22T08:01:21.657Z",
    updatedAt: "2024-02-22T08:01:21.657Z",
  },
  {
    id: "clswxpep8000sxswogfcrij1c",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 5,
    createdAt: "2024-02-22T08:01:21.837Z",
    updatedAt: "2024-02-22T08:01:25.051Z",
  },
  {
    id: "clswxpfx8000txswoq5ap3p23",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 13,
    createdAt: "2024-02-22T08:01:23.420Z",
    updatedAt: "2024-02-22T08:01:42.887Z",
  },
  {
    id: "clt2mjgoa002i2v0ypynob3rw",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Joint Ventures",
    },
    progress: 0,
    createdAt: "2024-02-26T07:35:25.739Z",
    updatedAt: "2024-02-26T07:35:25.739Z",
  },
  {
    id: "clt2mjhhn002j2v0yghdx822s",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Joint Ventures",
    },
    progress: 0,
    createdAt: "2024-02-26T07:35:26.795Z",
    updatedAt: "2024-02-26T07:35:26.795Z",
  },
  {
    id: "clt2p101x002r2v0yhrs9mot1",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Решение кейса",
    },
    progress: 0,
    createdAt: "2024-02-26T08:45:03.237Z",
    updatedAt: "2024-02-26T08:45:03.237Z",
  },
  {
    id: "clt2ue2gi003r2v0y722l4sby",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 3,
    createdAt: "2024-02-26T11:15:10.963Z",
    updatedAt: "2024-03-14T10:12:51.965Z",
  },
  {
    id: "clt2v2im100432v0yx8mvfm9v",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 0,
    createdAt: "2024-02-26T11:34:11.641Z",
    updatedAt: "2024-02-26T11:34:11.641Z",
  },
  {
    id: "clt2v2izi00442v0ysec7yjin",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 0,
    createdAt: "2024-02-26T11:34:12.127Z",
    updatedAt: "2024-02-26T11:34:12.127Z",
  },
  {
    id: "clt2v2jiy00452v0ylxx10m1e",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 0,
    createdAt: "2024-02-26T11:34:12.827Z",
    updatedAt: "2024-02-26T11:34:12.827Z",
  },
  {
    id: "clt2vb6f700462v0yvz1raonz",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор об оказании юридических услуг",
    },
    progress: 4,
    createdAt: "2024-02-26T11:40:55.747Z",
    updatedAt: "2024-02-26T12:10:48.048Z",
  },
  {
    id: "clt64b5ci00cixs9wbsz0avqi",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Служебные произведения",
    },
    progress: 3,
    createdAt: "2024-02-28T18:16:09.426Z",
    updatedAt: "2024-02-28T18:19:00.759Z",
  },
  {
    id: "clt6yg3pj0000xs23qs9h8nis",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 0,
    createdAt: "2024-02-29T08:19:49.064Z",
    updatedAt: "2024-02-29T08:19:49.064Z",
  },
  {
    id: "clt6yg4zc0001xs23rwgrda6b",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 0,
    createdAt: "2024-02-29T08:19:50.712Z",
    updatedAt: "2024-02-29T08:19:50.712Z",
  },
  {
    id: "clt8aupvd000gxs23y0rn4keb",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Грамматика юридического английского: сложные предложения",
    },
    progress: 0,
    createdAt: "2024-03-01T06:54:52.537Z",
    updatedAt: "2024-03-01T06:54:52.537Z",
  },
  {
    id: "clt9p09ws0014vr0ykv7seycw",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Практическое задание: составляем оферту и отказываемся от преимущественного права",
    },
    progress: 5,
    createdAt: "2024-03-02T06:18:52.588Z",
    updatedAt: "2024-03-02T06:19:01.280Z",
  },
  {
    id: "clt9qsgd40017vr0ydiwg4akr",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Правовой режим крупных сделок",
    },
    progress: 6,
    createdAt: "2024-03-02T07:08:46.936Z",
    updatedAt: "2024-03-02T07:08:57.171Z",
  },
  {
    id: "clt9qvotu0018vr0yz3shslur",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Опционы",
    },
    progress: 5,
    createdAt: "2024-03-02T07:11:17.875Z",
    updatedAt: "2024-03-02T07:11:22.688Z",
  },
  {
    id: "clta3aulj000oxk0yua08wg3m",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "OnTime Inc",
    },
    progress: 11,
    createdAt: "2024-03-02T12:59:00.584Z",
    updatedAt: "2024-03-02T13:10:38.607Z",
  },
  {
    id: "clta4wl0n0008xs0fnz472tq6",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "OnTime Inc",
    },
    progress: 10,
    createdAt: "2024-03-02T13:43:54.216Z",
    updatedAt: "2024-03-02T14:13:08.440Z",
  },
  {
    id: "cltfne79n0016amsmh1pgkzmw",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Le simulateur du Design Thinking",
    },
    progress: 12,
    createdAt: "2024-03-06T10:20:20.172Z",
    updatedAt: "2024-03-06T10:21:36.059Z",
  },
  {
    id: "cltfnmctl0021amsmjvhfoxch",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Le simulateur du Design Thinking",
    },
    progress: 12,
    createdAt: "2024-03-06T10:26:40.617Z",
    updatedAt: "2024-03-06T10:26:59.852Z",
  },
  {
    id: "clthg7k15003wjfvfzrlixu7x",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Vocabulary. Corporate law",
    },
    progress: 2,
    createdAt: "2024-03-07T16:34:45.162Z",
    updatedAt: "2024-03-11T09:11:26.260Z",
  },
  {
    id: "cltmk3gtz0000hww7p7z7m3n2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Vocabulary. Corporate law",
    },
    progress: 3,
    createdAt: "2024-03-11T06:22:23.734Z",
    updatedAt: "2024-03-11T06:27:53.363Z",
  },
  {
    id: "cltmq09vv0002hww703p93tkd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Vocabulary. Corporate law",
    },
    progress: 2,
    createdAt: "2024-03-11T09:07:52.459Z",
    updatedAt: "2024-03-12T12:27:27.171Z",
  },
  {
    id: "cltoclc6900126zqngk36c0xe",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Vocabulary. Corporate law",
    },
    progress: 4,
    createdAt: "2024-03-12T12:27:52.929Z",
    updatedAt: "2024-03-28T11:26:02.132Z",
  },
  {
    id: "cltpveraz00ok12yu2ycekja1",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 0,
    createdAt: "2024-03-13T14:02:24.827Z",
    updatedAt: "2024-03-13T14:02:24.827Z",
  },
  {
    id: "cltpverwn00ol12yut9gqilso",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 12,
    createdAt: "2024-03-13T14:02:25.608Z",
    updatedAt: "2024-03-31T16:30:09.179Z",
  },
  {
    id: "cltpxcage004vstpdn8mg6k9b",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Административное судопроизводство. Часть 1",
    },
    progress: 3,
    createdAt: "2024-03-13T14:56:28.911Z",
    updatedAt: "2024-03-13T14:56:41.186Z",
  },
  {
    id: "cltpxdnkz004wstpddh6rppdf",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Административное судопроизводство. Часть 1",
    },
    progress: 0,
    createdAt: "2024-03-13T14:57:32.580Z",
    updatedAt: "2024-03-13T14:57:32.580Z",
  },
  {
    id: "cltshwi9k002m1415ktugqjun",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Структура юридического текста",
    },
    progress: 0,
    createdAt: "2024-03-15T10:07:36.824Z",
    updatedAt: "2024-03-15T10:07:36.824Z",
  },
  {
    id: "cltshwin5002n14156s4yijj9",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Структура юридического текста",
    },
    progress: 4,
    createdAt: "2024-03-15T10:07:37.313Z",
    updatedAt: "2024-03-15T10:07:40.618Z",
  },
  {
    id: "cltyl947x0003vq7wshn181g9",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Aurora Case Study",
    },
    progress: 6,
    createdAt: "2024-03-19T16:28:01.054Z",
    updatedAt: "2024-03-21T07:44:17.778Z",
  },
  {
    id: "clu0ytmtn001rdr517ppgnjl3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 0,
    createdAt: "2024-03-21T08:23:25.644Z",
    updatedAt: "2024-03-21T08:23:25.644Z",
  },
  {
    id: "clu0z7rso0017nq3vxeiqtjs8",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 0,
    createdAt: "2024-03-21T08:34:25.272Z",
    updatedAt: "2024-03-21T08:34:25.272Z",
  },
  {
    id: "clu0z7qbg0016nq3v82ed74ap",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 0,
    createdAt: "2024-03-21T08:34:23.177Z",
    updatedAt: "2024-03-21T08:34:23.177Z",
  },
  {
    id: "clu0z7s9j0018nq3vtd6k9835",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 2,
    createdAt: "2024-03-21T08:34:25.879Z",
    updatedAt: "2024-03-21T13:37:17.602Z",
  },
  {
    id: "clu14zqj100077oiyo8dgq9oh",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Master IRAC and write a legal essay",
    },
    progress: 0,
    createdAt: "2024-03-21T11:16:08.077Z",
    updatedAt: "2024-03-21T11:16:08.077Z",
  },
  {
    id: "clu1aa4pk00187oiy27j76xpr",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Aurora Case Study",
    },
    progress: 6,
    createdAt: "2024-03-21T13:44:11.096Z",
    updatedAt: "2024-03-21T13:47:40.988Z",
  },
  {
    id: "clu2lxrpn0001nnrokmg35rk9",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Introduction to contracts",
    },
    progress: 2,
    createdAt: "2024-03-22T11:58:15.948Z",
    updatedAt: "2024-03-22T11:58:43.290Z",
  },
  {
    id: "clu31knx9003annrop44rxkoj",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 0,
    createdAt: "2024-03-22T19:15:58.366Z",
    updatedAt: "2024-03-22T19:15:58.366Z",
  },
  {
    id: "clu31koil003bnnroldutgcej",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 4,
    createdAt: "2024-03-22T19:15:59.133Z",
    updatedAt: "2024-03-22T19:16:02.113Z",
  },
  {
    id: "clu6o2txq003cpmk4fc71q7fs",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в корпоративное право",
    },
    progress: 5,
    createdAt: "2024-03-25T08:09:16.047Z",
    updatedAt: "2024-03-25T08:09:20.428Z",
  },
  {
    id: "clu9sjnw50000uiiy2e2jxx85",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Educate)",
    },
    progress: 0,
    createdAt: "2024-03-27T12:37:38.355Z",
    updatedAt: "2024-03-27T12:37:38.355Z",
  },
  {
    id: "club6sisq001r4xyo45br5u34",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Лексика. Корпоративное право. ",
    },
    progress: 8,
    createdAt: "2024-03-28T12:04:12.459Z",
    updatedAt: "2024-03-28T12:04:56.976Z",
  },
  {
    id: "clubbo4mr00344xyoi5du9m2h",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 2,
    createdAt: "2024-03-28T14:20:45.555Z",
    updatedAt: "2024-03-28T18:46:09.947Z",
  },
  {
    id: "clubenfwe001710j79l4p4ef5",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 15,
    createdAt: "2024-03-28T15:44:12.281Z",
    updatedAt: "2024-03-28T15:47:09.037Z",
  },
  {
    id: "clubemkyd001510j70zourlr2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 9,
    createdAt: "2024-03-28T15:43:32.245Z",
    updatedAt: "2024-03-28T18:56:06.717Z",
  },
  {
    id: "clubenfbw001610j7swf5gp0h",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 0,
    createdAt: "2024-03-28T15:44:11.612Z",
    updatedAt: "2024-03-28T15:44:11.612Z",
  },
  {
    id: "clubk7nhk000ufyqmj5o0cmh4",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 2,
    createdAt: "2024-03-28T18:19:53.384Z",
    updatedAt: "2024-03-28T18:52:43.525Z",
  },
  {
    id: "clubkq1jq0010fyqm7a81e8wh",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 0,
    createdAt: "2024-03-28T18:34:11.414Z",
    updatedAt: "2024-03-28T18:34:11.414Z",
  },
  {
    id: "cluccosgu0000e6p9of09zm76",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 3,
    createdAt: "2024-03-29T07:37:02.237Z",
    updatedAt: "2024-03-29T07:43:46.383Z",
  },
  {
    id: "cluccyks70002e6p9bffo5jdz",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 9,
    createdAt: "2024-03-29T07:44:38.840Z",
    updatedAt: "2024-03-29T08:04:24.347Z",
  },
  {
    id: "clucdua400007e6p917g3nlkl",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 9,
    createdAt: "2024-03-29T08:09:18.000Z",
    updatedAt: "2024-03-29T09:58:29.661Z",
  },
  {
    id: "cluce0kav000ae6p9tlaewe20",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 9,
    createdAt: "2024-03-29T08:14:11.143Z",
    updatedAt: "2024-03-29T09:56:35.925Z",
  },
  {
    id: "cluceotyy000ce6p9tpfwvock",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 9,
    createdAt: "2024-03-29T08:33:03.418Z",
    updatedAt: "2024-03-29T09:39:00.916Z",
  },
  {
    id: "clucf2isp000ge6p9wek7o0cw",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 9,
    createdAt: "2024-03-29T08:43:42.122Z",
    updatedAt: "2024-03-29T09:53:23.407Z",
  },
  {
    id: "clucg5v9s000je6p9kmyk0lc3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 0,
    createdAt: "2024-03-29T09:14:17.873Z",
    updatedAt: "2024-03-29T09:14:17.873Z",
  },
  {
    id: "cluchoj42000oe6p9o193jx76",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 0,
    createdAt: "2024-03-29T09:56:48.194Z",
    updatedAt: "2024-03-29T09:56:48.194Z",
  },
  {
    id: "cluct4n9l000qe6p9l1dypnau",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 9,
    createdAt: "2024-03-29T15:17:15.848Z",
    updatedAt: "2024-03-29T15:21:04.644Z",
  },
  {
    id: "cluctciqp000se6p9kcf9cxqm",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 3,
    createdAt: "2024-03-29T15:23:23.234Z",
    updatedAt: "2024-03-29T15:23:56.126Z",
  },
  {
    id: "cluctfil6000ve6p9wx36ato9",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 0,
    createdAt: "2024-03-29T15:25:43.002Z",
    updatedAt: "2024-03-29T15:25:43.002Z",
  },
  {
    id: "cluctfhg0000ue6p9kb00q6v0",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 0,
    createdAt: "2024-03-29T15:25:41.521Z",
    updatedAt: "2024-03-29T15:25:41.521Z",
  },
  {
    id: "cluctipl7000we6p9q7rukzr8",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 0,
    createdAt: "2024-03-29T15:28:12.044Z",
    updatedAt: "2024-03-29T15:28:12.044Z",
  },
  {
    id: "cluctvi09000ye6p96uzw11qa",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 0,
    createdAt: "2024-03-29T15:38:08.746Z",
    updatedAt: "2024-03-29T15:38:08.746Z",
  },
  {
    id: "cluctxmfp0010e6p9awwjvfo2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 9,
    createdAt: "2024-03-29T15:39:47.798Z",
    updatedAt: "2024-03-29T15:44:48.352Z",
  },
  {
    id: "clucu56zq0013e6p9hi5pp6fm",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 9,
    createdAt: "2024-03-29T15:45:41.030Z",
    updatedAt: "2024-03-31T16:43:09.921Z",
  },
  {
    id: "cludvu3p10003hxm7gcfusyo2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 3,
    createdAt: "2024-03-30T09:20:48.949Z",
    updatedAt: "2024-03-30T09:22:05.705Z",
  },
  {
    id: "cludvxoaw0006hxm77l522he3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 15,
    createdAt: "2024-03-30T09:23:35.625Z",
    updatedAt: "2024-03-30T09:49:53.660Z",
  },
  {
    id: "cludxvm6m0001ni6bvtkw4qt7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 15,
    createdAt: "2024-03-30T10:17:58.798Z",
    updatedAt: "2024-03-31T13:59:35.566Z",
  },
  {
    id: "clufqn0fw0001saskwixvdd4j",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 5,
    createdAt: "2024-03-31T16:30:52.319Z",
    updatedAt: "2024-03-31T18:22:30.750Z",
  },
  {
    id: "clufrtt3w0006saskylv58bj3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 6,
    createdAt: "2024-03-31T17:04:09.116Z",
    updatedAt: "2024-03-31T17:07:50.129Z",
  },
  {
    id: "clufuwhqb0002u6mz04614s38",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Введение в Legal English. Как писать абзацы",
    },
    progress: 3,
    createdAt: "2024-03-31T18:30:13.188Z",
    updatedAt: "2024-03-31T18:30:15.973Z",
  },
  {
    id: "clgw6tsou1001121fxky6zmenkl",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Мошенничество с объектами интеллектуальной собственности",
    },
    progress: 0,
    createdAt: "2023-04-25T11:32:28.927Z",
    updatedAt: "2023-04-25T11:32:28.927Z",
  },
  {
    id: "clgxjboxy802881ftk4eoufg5l",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Перевод служебных слов unless и once",
    },
    progress: 6,
    createdAt: "2023-04-26T10:10:05.446Z",
    updatedAt: "2023-11-24T15:28:37.605Z",
  },
  {
    id: "clgxp87qr829961ftkukzx7ud4",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое юридический английский? 🇬🇧",
    },
    progress: 0,
    createdAt: "2023-04-26T12:55:20.884Z",
    updatedAt: "2023-04-26T12:55:20.884Z",
  },
  {
    id: "clh1u4nez1269c6u9kptfc428",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "23:49 – 1 (Copy)",
    },
    progress: 0,
    createdAt: "2023-04-29T10:23:37.355Z",
    updatedAt: "2023-04-29T10:23:37.355Z",
  },
  {
    id: "clh1u4nv51278c6u9mx5bni0j",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "23:49 – 1 (Copy)",
    },
    progress: 0,
    createdAt: "2023-04-29T10:23:37.937Z",
    updatedAt: "2023-04-29T10:23:37.937Z",
  },
  {
    id: "clh1u4paj1304c6u940i9pxum",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "23:49 – 1 (Copy)",
    },
    progress: 0,
    createdAt: "2023-04-29T10:23:39.787Z",
    updatedAt: "2023-04-29T10:23:39.788Z",
  },
  {
    id: "clh1u4omx1295c6u900vnlhic",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "23:49 – 1 (Copy)",
    },
    progress: 6,
    createdAt: "2023-04-29T10:23:38.938Z",
    updatedAt: "2023-04-29T10:23:42.554Z",
  },
  {
    id: "clhhh05s6268481frsdwakkjxk",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: Акционерное соглашение",
    },
    progress: 0,
    createdAt: "2023-05-10T09:00:31.686Z",
    updatedAt: "2023-06-28T13:59:10.584Z",
  },
  {
    id: "clhgd58ui1655131fxgy42ktilk",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Физические лица (Продолжение)",
    },
    progress: 4,
    createdAt: "2023-05-09T14:24:44.298Z",
    updatedAt: "2023-05-23T17:06:58.150Z",
  },
  {
    id: "clhhghspn251351frsyi51ou36",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: Обязанности директоров компании",
    },
    progress: 3,
    createdAt: "2023-05-10T08:46:14.939Z",
    updatedAt: "2023-06-28T14:00:26.115Z",
  },
  {
    id: "clhhez28v179801frs43y3uczy",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: рассмотрение спора в арбитраже",
    },
    progress: 0,
    createdAt: "2023-05-10T08:03:41.216Z",
    updatedAt: "2023-05-10T08:03:41.216Z",
  },
  {
    id: "clhhfee1o216231frstv48yozp",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: Обязанности директоров компании",
    },
    progress: 0,
    createdAt: "2023-05-10T08:15:36.349Z",
    updatedAt: "2023-05-10T08:15:36.349Z",
  },
  {
    id: "clhlrc1ns71411fymk737ivei",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Формы сделки",
    },
    progress: 8,
    createdAt: "2023-05-13T09:00:47.080Z",
    updatedAt: "2023-05-20T15:48:40.053Z",
  },
  {
    id: "clhnkk5p2176661fv38bjdz9uz",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Основные начала и принципы гражданского права",
    },
    progress: 0,
    createdAt: "2023-05-14T15:26:40.598Z",
    updatedAt: "2023-05-14T15:26:40.598Z",
  },
  {
    id: "clhomtw4202521fxot4vjd9fo",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Уголовный процесс. Часть 3.",
    },
    progress: 0,
    createdAt: "2023-05-15T09:18:00.146Z",
    updatedAt: "2023-05-15T09:18:00.146Z",
  },
  {
    id: "clhpx9ccu989771fxoow5j2cfa",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Виды юридических лиц",
    },
    progress: 0,
    createdAt: "2023-05-16T06:57:43.374Z",
    updatedAt: "2023-05-16T06:57:43.374Z",
  },
  {
    id: "clhpy32ek1020661fxo11cyba4g",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Виды юридических лиц",
    },
    progress: 6,
    createdAt: "2023-05-16T07:20:50.156Z",
    updatedAt: "2023-06-05T07:12:45.196Z",
  },
  {
    id: "clhst1wsh79251f249o2ccfdg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Корпоративное право: как его изучать?",
    },
    progress: 0,
    createdAt: "2023-05-18T07:23:16.674Z",
    updatedAt: "2023-05-18T07:23:16.674Z",
  },
  {
    id: "clhum2np8171521fy4lgxjfwia",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Корпоративное право и M&A. Подготовка к собеседованию",
    },
    progress: 10,
    createdAt: "2023-05-19T13:43:26.588Z",
    updatedAt: "2023-08-04T07:32:15.290Z",
  },
  {
    id: "clhum2mya171391fy4qfdkb44e",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Корпоративное право и M&A. Подготовка к собеседованию",
    },
    progress: 0,
    createdAt: "2023-05-19T13:43:25.618Z",
    updatedAt: "2023-05-19T13:43:25.618Z",
  },
  {
    id: "cli1f7i5k194151f2wlydl17w5",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Промежуточное тестирование",
    },
    progress: 2,
    createdAt: "2023-05-24T08:05:38.601Z",
    updatedAt: "2023-05-24T13:44:12.597Z",
  },
  {
    id: "cli0kmbor483221fx6pfru98cj",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Сделки. Недействительность и ничтожность",
    },
    progress: 16,
    createdAt: "2023-05-23T17:49:21.964Z",
    updatedAt: "2023-10-03T07:00:25.365Z",
  },
  {
    id: "cli1es243162701f2w8j9g78wd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Объекты гражданских прав. Иные вещи",
    },
    progress: 6,
    createdAt: "2023-05-24T07:53:37.972Z",
    updatedAt: "2023-12-06T15:11:56.885Z",
  },
  {
    id: "cli1rb46r3911t8u9h7lrkfvx",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Промежуточное тестирование",
    },
    progress: 0,
    createdAt: "2023-05-24T13:44:22.516Z",
    updatedAt: "2023-05-24T13:44:22.522Z",
  },
  {
    id: "cli49j1w7219871fs7un7a8qge",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Погружение в юридический рынок Казахстана",
    },
    progress: 10,
    createdAt: "2023-05-26T07:49:58.231Z",
    updatedAt: "2023-08-04T07:31:19.290Z",
  },
  {
    id: "cli45nh2l30911fs7dc6lq4gj",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Погружение в юридический рынок Казахстана",
    },
    progress: 0,
    createdAt: "2023-05-26T06:01:26.061Z",
    updatedAt: "2023-05-26T06:01:26.061Z",
  },
  {
    id: "cli45nidu31081fs71gzwvsde",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Погружение в юридический рынок Казахстана",
    },
    progress: 6,
    createdAt: "2023-05-26T06:01:27.763Z",
    updatedAt: "2023-05-26T06:01:36.583Z",
  },
  {
    id: "cli49g0oe212471fs7t2fn8jyd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Погружение в юридический рынок Казахстана",
    },
    progress: 3,
    createdAt: "2023-05-26T07:47:36.687Z",
    updatedAt: "2023-05-26T07:47:45.915Z",
  },
  {
    id: "cli49j175219741fs7w6i1h3l8",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Погружение в юридический рынок Казахстана",
    },
    progress: 4,
    createdAt: "2023-05-26T07:49:57.330Z",
    updatedAt: "2023-05-26T07:49:59.202Z",
  },
  {
    id: "cli4n9128505391fs7v68t7ezq",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Мягкие навыки для успешной работы",
    },
    progress: 10,
    createdAt: "2023-05-26T14:14:05.216Z",
    updatedAt: "2023-08-04T07:31:42.834Z",
  },
  {
    id: "cli748ti1544591fvlu5ycp58k",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Особенности правового регулирования труда медицинских работников. Часть 1",
    },
    progress: 7,
    createdAt: "2023-05-28T07:45:21.242Z",
    updatedAt: "2023-05-28T07:46:34.995Z",
  },
  {
    id: "cli9xow39378891fwgo9u4n36t",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Адвокатское производство. Защита профессиональных прав. Противодействие легализации преступных доходов",
    },
    progress: 2,
    createdAt: "2023-05-30T07:05:12.310Z",
    updatedAt: "2023-05-30T07:05:12.310Z",
  },
  {
    id: "clihrqq4j7372hxu9xtxfzfok",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Day 5: Virtual Networking",
    },
    progress: 3,
    createdAt: "2023-06-04T18:40:49.603Z",
    updatedAt: "2023-06-04T18:41:04.395Z",
  },
  {
    id: "clij25pnc1144691f2cc893sgo7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Day 3: Picture Day",
    },
    progress: 10,
    createdAt: "2023-06-05T16:20:11.160Z",
    updatedAt: "2023-06-05T16:46:43.150Z",
  },
  {
    id: "clij1wlvx1101021f2cs08u49gg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Day 2: Lights, Camera, Action",
    },
    progress: 15,
    createdAt: "2023-06-05T16:13:06.382Z",
    updatedAt: "2023-06-05T16:42:02.407Z",
  },
  {
    id: "clisnuvbj172911fxfaft7gwwt",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Структурируем деловой email",
    },
    progress: 0,
    createdAt: "2023-06-12T09:37:32.431Z",
    updatedAt: "2023-06-12T09:37:32.431Z",
  },
  {
    id: "clisl92bc6840w7u9xc2pi9fm",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Вебинар",
    },
    progress: 0,
    createdAt: "2023-06-12T08:24:35.833Z",
    updatedAt: "2023-06-12T08:24:35.835Z",
  },
  {
    id: "cliwvhn5w443111gslxd33gqlc",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Опционы",
    },
    progress: 0,
    createdAt: "2023-06-15T08:22:16.965Z",
    updatedAt: "2023-06-15T08:22:16.965Z",
  },
  {
    id: "cliyqk3uv37491fqow2nrk01i",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: Образец кредитного договора",
    },
    progress: 0,
    createdAt: "2023-06-16T15:39:46.184Z",
    updatedAt: "2023-06-16T15:39:46.184Z",
  },
  {
    id: "cliyqkj0640071fqoxb9w06g5",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: Синдицированный кредит",
    },
    progress: 0,
    createdAt: "2023-06-16T15:40:05.815Z",
    updatedAt: "2023-06-16T15:40:05.815Z",
  },
  {
    id: "cliyqku7c41941fqobmy54ubp",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: Образец кредитного договора",
    },
    progress: 4,
    createdAt: "2023-06-16T15:40:20.328Z",
    updatedAt: "2023-10-25T15:40:46.223Z",
  },
  {
    id: "cliyqjizr31741fqofn9av233",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: Заключение договора",
    },
    progress: 4,
    createdAt: "2023-06-16T15:39:19.144Z",
    updatedAt: "2023-06-28T14:00:01.928Z",
  },
  {
    id: "cljo95682199741fzwe8grt3um",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Понятие МЧП. Введение в концепцию",
    },
    progress: 9,
    createdAt: "2023-07-04T12:14:16.515Z",
    updatedAt: "2023-07-31T08:32:52.347Z",
  },
  {
    id: "cljo95p1a205941fzwk994w39p",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Понятие, структура и виды коллизионных норм",
    },
    progress: 4,
    createdAt: "2023-07-04T12:14:40.895Z",
    updatedAt: "2023-07-31T08:19:35.650Z",
  },
  {
    id: "cljwqsbf1321341fx5jnwg0jpv",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Кейс",
    },
    progress: 0,
    createdAt: "2023-07-10T10:50:19.214Z",
    updatedAt: "2023-07-10T10:50:19.214Z",
  },
  {
    id: "cljws4tcl468521fx51b1wjp9u",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Входное тестирование",
    },
    progress: 0,
    createdAt: "2023-07-10T11:28:01.941Z",
    updatedAt: "2023-07-10T11:28:01.941Z",
  },
  {
    id: "cljws4j2z467271fx5e24dp421",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Входное тестирование",
    },
    progress: 0,
    createdAt: "2023-07-10T11:27:48.636Z",
    updatedAt: "2023-07-10T11:45:15.341Z",
  },
  {
    id: "cljwrzcoz437661fx5e9bho0sl",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Налоги и сборы, уплачиваемые российскими компаниями",
    },
    progress: 4,
    createdAt: "2023-07-10T11:23:47.075Z",
    updatedAt: "2024-02-16T10:22:22.035Z",
  },
  {
    id: "cljzisz4p248798cxsrfnpz9gj",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 3,
    createdAt: "2023-07-12T09:30:11.545Z",
    updatedAt: "2023-07-12T09:30:14.084Z",
  },
  {
    id: "cljzj6q13301028cxsq33x2c1s",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 0,
    createdAt: "2023-07-12T09:40:52.935Z",
    updatedAt: "2023-07-12T09:40:52.935Z",
  },
  {
    id: "cljzj6rd5301258cxs0o6q5vzr",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 0,
    createdAt: "2023-07-12T09:40:54.665Z",
    updatedAt: "2023-07-12T09:40:54.666Z",
  },
  {
    id: "cljzja4zr311248cxs8lhaz2ei",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 3,
    createdAt: "2023-07-12T09:43:32.295Z",
    updatedAt: "2023-07-12T09:43:41.735Z",
  },
  {
    id: "cljzpxm3e476398cxs5ioz1igt",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "ПО в праве Интеллектуальной собственности",
    },
    progress: 5,
    createdAt: "2023-07-12T12:49:45.242Z",
    updatedAt: "2023-07-12T12:49:53.579Z",
  },
  {
    id: "clk8hl178423611grb02mebyak",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Лексика. Корпоративное право. ",
    },
    progress: 0,
    createdAt: "2023-07-18T16:05:56.948Z",
    updatedAt: "2023-07-18T16:05:56.948Z",
  },
  {
    id: "clk8o80qx47229egxstg2ikxsh",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Модальные глаголы в Legal English",
    },
    progress: 7,
    createdAt: "2023-07-18T19:11:47.145Z",
    updatedAt: "2023-07-18T19:12:09.061Z",
  },
  {
    id: "clkb6p6so05161fy12vvk83ux",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Как задавать вопросы и отвечать на них?",
    },
    progress: 0,
    createdAt: "2023-07-20T13:24:33.577Z",
    updatedAt: "2023-07-20T13:24:33.577Z",
  },
  {
    id: "clkce643v7368wsxs3v1jziuv",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Урок-образец для Алруда",
    },
    progress: 0,
    createdAt: "2023-07-21T09:41:26.731Z",
    updatedAt: "2023-07-21T09:41:26.731Z",
  },
  {
    id: "clkcf2kvp8408wsxscvko3jpz",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Урок-образец для Алруда",
    },
    progress: 0,
    createdAt: "2023-07-21T10:06:41.461Z",
    updatedAt: "2023-07-21T10:06:41.461Z",
  },
  {
    id: "clkcf2loi8421wsxs3yj3ia03",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Урок-образец для Алруда",
    },
    progress: 0,
    createdAt: "2023-07-21T10:06:42.499Z",
    updatedAt: "2023-07-21T10:06:42.499Z",
  },
  {
    id: "clkgmhr44430921fuquugby1vu",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Прекращение обязательств",
    },
    progress: 2,
    createdAt: "2023-07-24T08:45:31.396Z",
    updatedAt: "2023-07-24T08:45:42.445Z",
  },
  {
    id: "clkcmbuae623701f0wi8xq8miy",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Welcome to BeSavvy Lawyer ",
    },
    progress: 0,
    createdAt: "2023-07-21T13:29:50.871Z",
    updatedAt: "2023-07-21T13:29:50.871Z",
  },
  {
    id: "clkcmcgsm626931f0wqjheloa7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "What is Legal Writing?",
    },
    progress: 0,
    createdAt: "2023-07-21T13:30:20.038Z",
    updatedAt: "2023-07-21T13:30:20.038Z",
  },
  {
    id: "clkce66457391wsxsi9mi3k59",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Урок-образец для Алруда",
    },
    progress: 11,
    createdAt: "2023-07-21T09:41:29.333Z",
    updatedAt: "2024-03-28T10:20:29.129Z",
  },
  {
    id: "clkctt6fu70231fyxasc5ok1i",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Основания возникновения представительства",
    },
    progress: 0,
    createdAt: "2023-07-21T16:59:17.082Z",
    updatedAt: "2023-07-21T16:59:17.082Z",
  },
  {
    id: "clkgmi81y434541fuqjes74hwd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Обеспечение исполнения обязательств",
    },
    progress: 2,
    createdAt: "2023-07-24T08:45:53.351Z",
    updatedAt: "2024-03-01T07:15:19.489Z",
  },
  {
    id: "clkntl36y000cxs0wboxxx5lu",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договорная работа. Подготовка к собеседованию",
    },
    progress: 15,
    createdAt: "2023-07-29T09:38:27.563Z",
    updatedAt: "2023-08-04T07:32:47.364Z",
  },
  {
    id: "clkqmgw95518491fxmtt7k049v",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Обратная отсылка, квалификация юридических понятий и обход закона в МЧП",
    },
    progress: 0,
    createdAt: "2023-07-31T08:42:33.161Z",
    updatedAt: "2023-07-31T08:42:33.161Z",
  },
  {
    id: "clktm22cm439031fx9sn947d33",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Правовое регулирование донорства и трансплантации. Часть 1",
    },
    progress: 12,
    createdAt: "2023-08-02T10:54:19.751Z",
    updatedAt: "2023-08-03T08:39:07.537Z",
  },
  {
    id: "clksjzuxx70411fx9ztfcc7n3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Отношения адвоката с доверителем ",
    },
    progress: 0,
    createdAt: "2023-08-01T17:08:51.430Z",
    updatedAt: "2023-08-01T17:08:51.430Z",
  },
  {
    id: "clksk12kf74271fx9d8f9yoha",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Профессиональная этика адвоката ",
    },
    progress: 0,
    createdAt: "2023-08-01T17:09:47.967Z",
    updatedAt: "2023-08-01T17:09:47.967Z",
  },
  {
    id: "clkskbesf89161fx91efff79h",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Ответственность адвоката и адвокатская тайна",
    },
    progress: 2,
    createdAt: "2023-08-01T17:17:50.367Z",
    updatedAt: "2024-01-30T13:46:05.281Z",
  },
  {
    id: "clkv9xh7l00lbxs5q8x1lg0br",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Право IP. Подготовка к собеседованию",
    },
    progress: 0,
    createdAt: "2023-08-03T14:50:22.690Z",
    updatedAt: "2023-08-04T07:32:35.853Z",
  },
  {
    id: "clkw9quqj211341fzaodjn4jap",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Legal English. Подготовка к собеседованию",
    },
    progress: 0,
    createdAt: "2023-08-04T07:32:59.803Z",
    updatedAt: "2023-08-04T07:32:59.803Z",
  },
  {
    id: "clkw9rrx8214801fzae60jcc0c",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Как подготовить документы для поиска работы?",
    },
    progress: 0,
    createdAt: "2023-08-04T07:33:42.812Z",
    updatedAt: "2023-08-04T07:33:42.812Z",
  },
  {
    id: "clkvdqlfk00lcxs5qwcp8myaw",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Что такое правовой режим земельного участка? ",
    },
    progress: 4,
    createdAt: "2023-08-03T16:37:00.033Z",
    updatedAt: "2023-08-03T16:37:00.033Z",
  },
  {
    id: "clkw9ouwi190781fzab4ofj944",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Мягкие навыки для успешного отбора",
    },
    progress: 0,
    createdAt: "2023-08-04T07:31:26.707Z",
    updatedAt: "2023-08-04T07:31:26.707Z",
  },
  {
    id: "clkxwa8as131601f3e3gdccsn3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Опционы",
    },
    progress: 5,
    createdAt: "2023-08-05T10:51:41.572Z",
    updatedAt: "2024-03-02T06:21:04.994Z",
  },
  {
    id: "clkw9pjk1198031fzaiyxxc9j5",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа юриста в Word",
    },
    progress: 8,
    createdAt: "2023-08-04T07:31:58.658Z",
    updatedAt: "2023-09-02T10:17:10.519Z",
  },
  {
    id: "clkyazkyk009axsg78dgjuti7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Правовое регулирование донорства и трансплантации. Часть 2",
    },
    progress: 5,
    createdAt: "2023-08-05T17:43:19.004Z",
    updatedAt: "2023-11-29T11:34:15.891Z",
  },
  {
    id: "cll3z5m4l000lxw0xzzhny2dh",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Как юристу работать с договорами на английском?",
    },
    progress: 14,
    createdAt: "2023-08-09T16:58:42.117Z",
    updatedAt: "2023-10-11T18:24:46.742Z",
  },
  {
    id: "cll6qftrk004rqx0xt3g8m0aw",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Формы адвокатских образований ",
    },
    progress: 0,
    createdAt: "2023-08-11T15:18:00.560Z",
    updatedAt: "2023-08-11T15:18:00.560Z",
  },
  {
    id: "cll6qgxp3004sqx0xqxql664k",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Гражданское право. Часть 2.",
    },
    progress: 5,
    createdAt: "2023-08-11T15:18:52.312Z",
    updatedAt: "2024-02-01T17:57:25.349Z",
  },
  {
    id: "cll9m8q950005xsitkyilzotp",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Как юристу работать с договорами на английском?",
    },
    progress: 0,
    createdAt: "2023-08-13T15:43:49.481Z",
    updatedAt: "2023-08-13T15:43:49.481Z",
  },
  {
    id: "cllcl7riy002j0a0xhzbhjlv7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Грамматика юридического английского: существительные",
    },
    progress: 0,
    createdAt: "2023-08-15T17:38:23.386Z",
    updatedAt: "2023-08-15T17:38:23.386Z",
  },
  {
    id: "cllkjjlo2000dv40xgmsyhvok",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Исполнение обязательств",
    },
    progress: 4,
    createdAt: "2023-08-21T07:13:45.842Z",
    updatedAt: "2023-10-07T17:00:52.457Z",
  },
  {
    id: "cllnya51q000axs2uvbchwvh5",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Результаты всех заданий",
    },
    progress: 7,
    createdAt: "2023-08-23T16:29:37.166Z",
    updatedAt: "2023-08-24T06:16:43.907Z",
  },
  {
    id: "clmvswiah000xxsg1xtucf1az",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Law Society",
    },
    progress: 11,
    createdAt: "2023-09-23T09:00:54.809Z",
    updatedAt: "2023-09-28T09:04:22.467Z",
  },
  {
    id: "clmvtleuw000yxsg1u4s2dmru",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Law Society",
    },
    progress: 0,
    createdAt: "2023-09-23T09:20:16.663Z",
    updatedAt: "2023-09-23T09:20:16.663Z",
  },
  {
    id: "clmvtnb9m0010xsg1wt78vevo",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Law Society",
    },
    progress: 3,
    createdAt: "2023-09-23T09:21:45.419Z",
    updatedAt: "2023-09-27T14:58:27.666Z",
  },
  {
    id: "clmvtlfjm000zxsg1gwewhisz",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Law Society",
    },
    progress: 0,
    createdAt: "2023-09-23T09:20:17.651Z",
    updatedAt: "2023-09-23T09:20:17.651Z",
  },
  {
    id: "clmvupile0013xsg1umyrc627",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Law Society",
    },
    progress: 2,
    createdAt: "2023-09-23T09:51:27.843Z",
    updatedAt: "2023-09-27T14:57:38.888Z",
  },
  {
    id: "clmut1l020005xsg14b5lo9pb",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Law Society",
    },
    progress: 11,
    createdAt: "2023-09-22T16:17:05.426Z",
    updatedAt: "2023-09-27T15:00:16.550Z",
  },
  {
    id: "cln0izxqz0005xs1yk7c4jc8p",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 12,
    createdAt: "2023-09-26T16:22:29.532Z",
    updatedAt: "2024-01-11T11:25:46.648Z",
  },
  {
    id: "clmz8ihoa009m0t0xldb107jy",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 13,
    createdAt: "2023-09-25T18:41:13.210Z",
    updatedAt: "2023-09-27T10:59:26.671Z",
  },
  {
    id: "clmz7yq7o009f0t0x0ig9odyx",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 12,
    createdAt: "2023-09-25T18:25:51.156Z",
    updatedAt: "2024-01-11T12:04:31.259Z",
  },
  {
    id: "cln7hntda000kxshwseni61aq",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор",
    },
    progress: 4,
    createdAt: "2023-10-01T13:19:27.598Z",
    updatedAt: "2023-11-14T07:13:17.837Z",
  },
  {
    id: "cln7m9xq3001axshwk1kxbb60",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор",
    },
    progress: 0,
    createdAt: "2023-10-01T15:28:38.139Z",
    updatedAt: "2023-10-01T15:28:38.139Z",
  },
  {
    id: "cln7m9yag001bxshwb1t4m2pj",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор",
    },
    progress: 0,
    createdAt: "2023-10-01T15:28:38.873Z",
    updatedAt: "2023-10-01T15:28:38.873Z",
  },
  {
    id: "cln7inw6g000oxshwl7pd9g2c",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Договор",
    },
    progress: 5,
    createdAt: "2023-10-01T13:47:30.856Z",
    updatedAt: "2024-01-15T08:00:49.348Z",
  },
  {
    id: "clndbu6en005vyn0x51njs96v",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Meet your e-mentor",
    },
    progress: 0,
    createdAt: "2023-10-05T15:23:03.791Z",
    updatedAt: "2023-10-05T15:23:03.791Z",
  },
  {
    id: "clncz2e9c004tyn0xlwg6723d",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE simulator",
    },
    progress: 7,
    createdAt: "2023-10-05T09:25:32.208Z",
    updatedAt: "2023-10-05T09:26:23.252Z",
  },
  {
    id: "clnhbp9ps0039xj0xiwsuys55",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Как избавиться от ошибок с артиклями?",
    },
    progress: 17,
    createdAt: "2023-10-08T10:30:19.505Z",
    updatedAt: "2023-10-08T10:36:27.125Z",
  },
  {
    id: "clnlomqot0013w00xhrk73wn2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Специальный правовой статус несовершеннолетних лиц",
    },
    progress: 9,
    createdAt: "2023-10-11T11:43:21.246Z",
    updatedAt: "2024-02-08T09:12:52.365Z",
  },
  {
    id: "clnlomqv90014w00x0pfx62ju",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Специальный правовой статус несовершеннолетних лиц",
    },
    progress: 6,
    createdAt: "2023-10-11T11:43:21.478Z",
    updatedAt: "2023-10-11T11:43:28.488Z",
  },
  {
    id: "clnn1i6ao0000xs94c18i10sm",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 4,
    createdAt: "2023-10-12T10:31:29.376Z",
    updatedAt: "2024-01-11T12:12:30.581Z",
  },
  {
    id: "clnrbohtc0003wt0x3ril9t2m",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Как избавиться от ошибок с артиклями?",
    },
    progress: 4,
    createdAt: "2023-10-15T10:27:25.104Z",
    updatedAt: "2024-01-18T07:56:53.827Z",
  },
  {
    id: "clnu459x10006xs94ua35bu8a",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 3,
    createdAt: "2023-10-17T09:19:49.622Z",
    updatedAt: "2023-10-17T09:21:05.351Z",
  },
  {
    id: "clnu5azq6000bxs94jmh43hho",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 3,
    createdAt: "2023-10-17T09:52:15.967Z",
    updatedAt: "2023-11-04T17:12:47.899Z",
  },
  {
    id: "clnu5tau8000fxs94gkpyfa1s",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 3,
    createdAt: "2023-10-17T10:06:30.176Z",
    updatedAt: "2023-11-23T14:23:16.643Z",
  },
  {
    id: "clnu5ho3m000dxs94p2x2pwy3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 4,
    createdAt: "2023-10-17T09:57:27.490Z",
    updatedAt: "2024-01-11T12:11:58.148Z",
  },
  {
    id: "clnu5hn81000cxs944z7xvwk7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 3,
    createdAt: "2023-10-17T09:57:26.353Z",
    updatedAt: "2024-01-11T12:07:38.508Z",
  },
  {
    id: "clnu5ayop000axs94a2yngacb",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 3,
    createdAt: "2023-10-17T09:52:14.618Z",
    updatedAt: "2024-01-11T12:08:26.994Z",
  },
  {
    id: "clnu5ta7h000exs94y09qgqbi",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 3,
    createdAt: "2023-10-17T10:06:29.358Z",
    updatedAt: "2024-01-11T12:10:54.078Z",
  },
  {
    id: "clnuh7eox00lsr60xdnmy1t1h",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Биотехнологии в медицине (Введение)",
    },
    progress: 0,
    createdAt: "2023-10-17T15:25:24.130Z",
    updatedAt: "2023-10-17T15:25:24.130Z",
  },
  {
    id: "clnuhlvze0005xslyr8osbmme",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Порядок допуска к профессиональной медицинской деятельности\u000b",
    },
    progress: 0,
    createdAt: "2023-10-17T15:36:39.722Z",
    updatedAt: "2023-10-17T15:36:39.722Z",
  },
  {
    id: "clnujh9ww00mlr60x7phjvp80",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Специальный правовой статус несовершеннолетних лиц",
    },
    progress: 6,
    createdAt: "2023-10-17T16:29:03.728Z",
    updatedAt: "2023-10-17T16:29:09.433Z",
  },
  {
    id: "clnujkcxt00mor60x9d7rsndi",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Особенности правового регулирования труда медицинских работников. Часть 2",
    },
    progress: 0,
    createdAt: "2023-10-17T16:31:27.618Z",
    updatedAt: "2023-10-17T16:31:27.618Z",
  },
  {
    id: "clnujh93n00mkr60xtnxm36a8",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Специальный правовой статус несовершеннолетних лиц",
    },
    progress: 6,
    createdAt: "2023-10-17T16:29:02.675Z",
    updatedAt: "2024-02-08T08:20:05.270Z",
  },
  {
    id: "clnuh7foc00ltr60xt5hfcnw0",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Биотехнологии в медицине (Введение)",
    },
    progress: 9,
    createdAt: "2023-10-17T15:25:25.405Z",
    updatedAt: "2024-02-13T14:21:29.645Z",
  },
  {
    id: "clnuj1g6f0008xslycc2qp87t",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Правовой статус пациента в РФ",
    },
    progress: 4,
    createdAt: "2023-10-17T16:16:45.351Z",
    updatedAt: "2024-02-08T09:54:24.772Z",
  },
  {
    id: "clo5x91oh0028xg0x2bka30gd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Юридическая лексика в сфере IP",
    },
    progress: 0,
    createdAt: "2023-10-25T15:40:02.370Z",
    updatedAt: "2023-10-25T15:40:02.370Z",
  },
  {
    id: "clo5x927c0029xg0xki1pfcl5",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Юридическая лексика в сфере IP",
    },
    progress: 5,
    createdAt: "2023-10-25T15:40:03.049Z",
    updatedAt: "2023-10-25T15:40:11.871Z",
  },
  {
    id: "clo6z0xxj0001xsfgagjq5k80",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Assess)",
    },
    progress: 5,
    createdAt: "2023-10-26T09:17:29.671Z",
    updatedAt: "2023-10-27T15:02:10.649Z",
  },
  {
    id: "clo6z0yl20002xsfg7z5cus7g",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Assess)",
    },
    progress: 3,
    createdAt: "2023-10-26T09:17:30.518Z",
    updatedAt: "2023-10-28T15:45:59.112Z",
  },
  {
    id: "clocouzet000mxsll5zcxpejx",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Educate Old)",
    },
    progress: 0,
    createdAt: "2023-10-30T09:19:32.549Z",
    updatedAt: "2023-10-30T09:19:32.549Z",
  },
  {
    id: "clocov07o000nxslltpdl0irm",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Educate Old)",
    },
    progress: 0,
    createdAt: "2023-10-30T09:19:33.588Z",
    updatedAt: "2023-10-30T09:19:33.588Z",
  },
  {
    id: "clocrlr6g000uxsnlo2sou3cd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Educate)",
    },
    progress: 6,
    createdAt: "2023-10-30T10:36:20.825Z",
    updatedAt: "2023-10-30T18:16:38.026Z",
  },
  {
    id: "clod84mi70016xsnlww8qzsjn",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Assess)",
    },
    progress: 3,
    createdAt: "2023-10-30T18:18:54.982Z",
    updatedAt: "2023-10-30T19:58:39.667Z",
  },
  {
    id: "clocrlqhq000txsnl8id26cun",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Educate)",
    },
    progress: 3,
    createdAt: "2023-10-30T10:36:19.935Z",
    updatedAt: "2023-10-31T09:39:45.582Z",
  },
  {
    id: "clod8b9xv0018xsnlwwtqos7n",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Assess)",
    },
    progress: 2,
    createdAt: "2023-10-30T18:24:05.396Z",
    updatedAt: "2023-10-31T08:06:47.401Z",
  },
  {
    id: "clozxeczz005btk0xxjyatdrc",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Программный код",
    },
    progress: 20,
    createdAt: "2023-11-15T15:37:15.600Z",
    updatedAt: "2024-01-14T08:49:54.502Z",
  },
  {
    id: "clp1hsm8o005ux60xdd6m9ul2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Процесс создания ПО",
    },
    progress: 0,
    createdAt: "2023-11-16T17:55:59.257Z",
    updatedAt: "2023-11-16T17:55:59.257Z",
  },
  {
    id: "clp1ib6da005xx60x4dah62o0",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Процесс создания ПО",
    },
    progress: 0,
    createdAt: "2023-11-16T18:10:25.150Z",
    updatedAt: "2023-11-16T18:10:25.150Z",
  },
  {
    id: "clp1ib732005yx60xq0hlgnk8",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Процесс создания ПО",
    },
    progress: 2,
    createdAt: "2023-11-16T18:10:26.078Z",
    updatedAt: "2024-03-22T11:40:53.529Z",
  },
  {
    id: "clp2g6c8g002stk0xf53r03lb",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Программный код",
    },
    progress: 2,
    createdAt: "2023-11-17T09:58:26.417Z",
    updatedAt: "2023-12-12T09:12:02.963Z",
  },
  {
    id: "clp1hsn1f005vx60xvhghca9h",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Процесс создания ПО",
    },
    progress: 3,
    createdAt: "2023-11-16T17:56:00.291Z",
    updatedAt: "2024-03-20T08:42:05.518Z",
  },
  {
    id: "clp2i9ymq00q4xsqx6a0fiyd2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "ПО в праве интеллектуальной собственности",
    },
    progress: 12,
    createdAt: "2023-11-17T10:57:14.550Z",
    updatedAt: "2023-11-20T16:21:13.504Z",
  },
  {
    id: "clp84ws2u0027xs01727on3ky",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Legal Writing Simulator",
    },
    progress: 9,
    createdAt: "2023-11-21T09:29:41.671Z",
    updatedAt: "2023-11-21T09:40:59.169Z",
  },
  {
    id: "clp9yn3ro001bsg0xmhbgj35o",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "ПО в праве интеллектуальной собственности",
    },
    progress: 5,
    createdAt: "2023-11-22T16:09:44.916Z",
    updatedAt: "2023-11-22T16:09:48.511Z",
  },
  {
    id: "clp9f6jg6007luu0xhtjdbogd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Legal Writing Simulator",
    },
    progress: 8,
    createdAt: "2023-11-22T07:04:59.383Z",
    updatedAt: "2023-11-22T07:31:54.375Z",
  },
  {
    id: "clpcqvlsr0019z30xte4fh7oj",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Страдательный и действительный залог в юридическом переводе",
    },
    progress: 10,
    createdAt: "2023-11-24T14:55:43.131Z",
    updatedAt: "2023-11-24T14:56:55.380Z",
  },
  {
    id: "clpchbbgj000tz30xb7mx5yrg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "How does the platform work",
    },
    progress: 8,
    createdAt: "2023-11-24T10:28:00.067Z",
    updatedAt: "2024-01-16T15:21:37.292Z",
  },
  {
    id: "clpjglm3m005wsz0xbfalt1pg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Происхождение государства. Основные концепции. ",
    },
    progress: 0,
    createdAt: "2023-11-29T07:42:24.034Z",
    updatedAt: "2023-11-29T07:42:24.034Z",
  },
  {
    id: "clpifucw2000jsz0xt13465i9",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Вводное испытание",
    },
    progress: 0,
    createdAt: "2023-11-28T14:33:26.211Z",
    updatedAt: "2023-11-28T14:33:26.211Z",
  },
  {
    id: "clpjkj5q5006hsz0xkdl57ehg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Правовое регулирование донорства и трансплантации. Часть 1",
    },
    progress: 5,
    createdAt: "2023-11-29T09:32:27.965Z",
    updatedAt: "2024-02-08T15:42:07.187Z",
  },
  {
    id: "clpjgln2v005xsz0xb0kgqu8d",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Происхождение государства. Основные концепции. ",
    },
    progress: 5,
    createdAt: "2023-11-29T07:42:25.303Z",
    updatedAt: "2023-11-29T07:42:33.472Z",
  },
  {
    id: "clpjklh0e006jsz0xflcwgjdw",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Правовое регулирование донорства и трансплантации. Часть 3",
    },
    progress: 5,
    createdAt: "2023-11-29T09:34:15.902Z",
    updatedAt: "2023-11-29T09:34:23.673Z",
  },
  {
    id: "clpjoxw3q0002zj0xvin5ufch",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Правовой статус пациента в РФ",
    },
    progress: 5,
    createdAt: "2023-11-29T11:35:53.798Z",
    updatedAt: "2024-02-08T08:19:44.914Z",
  },
  {
    id: "clpifudjz000ksz0x7ha0l4c6",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Вводное испытание",
    },
    progress: 2,
    createdAt: "2023-11-28T14:33:27.071Z",
    updatedAt: "2023-11-29T14:16:21.495Z",
  },
  {
    id: "clpjw0zur0016zj0xh9r0pcwg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "How does the platform work",
    },
    progress: 8,
    createdAt: "2023-11-29T14:54:15.940Z",
    updatedAt: "2024-01-16T15:27:16.043Z",
  },
  {
    id: "clpmbstzx003bt60x315num3e",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Состав преступления",
    },
    progress: 3,
    createdAt: "2023-12-01T07:51:21.309Z",
    updatedAt: "2023-12-01T07:51:23.220Z",
  },
  {
    id: "clps0q0w50004yu0xs0iezlca",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Составляем договор: наименование сторон",
    },
    progress: 6,
    createdAt: "2023-12-05T07:27:51.557Z",
    updatedAt: "2023-12-05T07:28:36.669Z",
  },
  {
    id: "clpqqc5ab002zw80xqtvse1gg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Прекращение представительства",
    },
    progress: 9,
    createdAt: "2023-12-04T09:49:21.731Z",
    updatedAt: "2023-12-04T09:49:32.144Z",
  },
  {
    id: "clpqqc4jx002yw80xj1mot1w4",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Прекращение представительства",
    },
    progress: 0,
    createdAt: "2023-12-04T09:49:20.782Z",
    updatedAt: "2023-12-04T09:49:20.782Z",
  },
  {
    id: "clps0lf4u0001yu0xqyc7lege",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Практическое задание 3. Составляем договор",
    },
    progress: 4,
    createdAt: "2023-12-05T07:24:16.734Z",
    updatedAt: "2023-12-05T07:24:21.532Z",
  },
  {
    id: "clps0rmb10005yu0xw6vw6olq",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Составляем договор: структура, предмет и цена",
    },
    progress: 3,
    createdAt: "2023-12-05T07:29:05.965Z",
    updatedAt: "2023-12-05T07:29:54.561Z",
  },
  {
    id: "clptx3yqd000j1i0xi6vgusfh",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: 'Материалы "Гражданское право"',
    },
    progress: 0,
    createdAt: "2023-12-06T15:22:15.830Z",
    updatedAt: "2023-12-06T15:22:15.830Z",
  },
  {
    id: "clptx5fur000k1i0xdxyp7ih5",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: 'Материалы "Гражданское право"',
    },
    progress: 0,
    createdAt: "2023-12-06T15:23:24.675Z",
    updatedAt: "2023-12-06T15:23:24.675Z",
  },
  {
    id: "clpzre9yx0004xsqwnwhbmqik",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 0,
    createdAt: "2023-12-10T17:28:56.313Z",
    updatedAt: "2023-12-10T17:28:56.313Z",
  },
  {
    id: "clpuuhlb500301i0xhn2bql7c",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: 'Материалы "Гражданское право"',
    },
    progress: 0,
    createdAt: "2023-12-07T06:56:38.946Z",
    updatedAt: "2023-12-07T06:56:38.946Z",
  },
  {
    id: "clpuz7mob0000xs3hx12xopkl",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Grammar of Legal English. Verbs",
    },
    progress: 0,
    createdAt: "2023-12-07T09:08:52.236Z",
    updatedAt: "2023-12-07T09:08:52.236Z",
  },
  {
    id: "clpuz7o540001xs3henv4fe0y",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Grammar of Legal English. Verbs",
    },
    progress: 0,
    createdAt: "2023-12-07T09:08:54.136Z",
    updatedAt: "2023-12-07T09:08:54.136Z",
  },
  {
    id: "clpzliqxe0004xshv2riv97wl",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 0,
    createdAt: "2023-12-10T14:44:26.793Z",
    updatedAt: "2023-12-10T14:44:26.793Z",
  },
  {
    id: "clpzekysm0001xshv1mvq9xv8",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 5,
    createdAt: "2023-12-10T11:30:13.414Z",
    updatedAt: "2023-12-10T11:30:15.244Z",
  },
  {
    id: "clpzeky0m0000xshvo5ddf83q",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 5,
    createdAt: "2023-12-10T11:30:12.407Z",
    updatedAt: "2023-12-10T11:30:57.532Z",
  },
  {
    id: "clpzf9epc0002xshvh9u20xen",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 4,
    createdAt: "2023-12-10T11:49:13.777Z",
    updatedAt: "2023-12-10T11:49:16.715Z",
  },
  {
    id: "clpzliuew0005xshvc165ykem",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 0,
    createdAt: "2023-12-10T14:44:29.933Z",
    updatedAt: "2023-12-10T14:44:29.933Z",
  },
  {
    id: "clpzf9fr90003xshvx0h72pii",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Дизайн-мышление (Copy)",
    },
    progress: 6,
    createdAt: "2023-12-10T11:49:15.141Z",
    updatedAt: "2023-12-16T08:14:14.029Z",
  },
  {
    id: "clq2ej0ii0008xscub7k7i89j",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 25,
    createdAt: "2023-12-12T13:52:00.859Z",
    updatedAt: "2024-03-22T19:07:56.499Z",
  },
  {
    id: "clq4vovw90031t50xrozbi741",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Сделки. Недействительность и ничтожность",
    },
    progress: 0,
    createdAt: "2023-12-14T07:28:00.633Z",
    updatedAt: "2023-12-14T07:28:00.633Z",
  },
  {
    id: "clq8e8lh3000bxsq818ehggx0",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Составляем меморандум: структура и введение ",
    },
    progress: 6,
    createdAt: "2023-12-16T18:30:31.864Z",
    updatedAt: "2023-12-16T18:30:39.184Z",
  },
  {
    id: "clqbve0c2004t4x0xisytm6c5",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Вопросы конфиденциальности данных и информации в медицине ",
    },
    progress: 6,
    createdAt: "2023-12-19T04:53:56.402Z",
    updatedAt: "2024-02-08T06:21:36.032Z",
  },
  {
    id: "clqbvacr7004o4x0x4lrjokj7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Биотехнологии в медицине (Патентное право)",
    },
    progress: 4,
    createdAt: "2023-12-19T04:51:05.875Z",
    updatedAt: "2023-12-19T04:51:10.286Z",
  },
  {
    id: "clqbvb9e0004p4x0xlax1h101",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Основы фармацевтического регулирования",
    },
    progress: 6,
    createdAt: "2023-12-19T04:51:48.168Z",
    updatedAt: "2023-12-19T04:52:04.192Z",
  },
  {
    id: "clqbvdzm8004s4x0xrvj0aucg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Вопросы конфиденциальности данных и информации в медицине ",
    },
    progress: 0,
    createdAt: "2023-12-19T04:53:55.472Z",
    updatedAt: "2023-12-19T04:53:55.472Z",
  },
  {
    id: "clqbvhhlg004z4x0x9lojsnst",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Основы фармацевтического регулирования",
    },
    progress: 5,
    createdAt: "2023-12-19T04:56:38.740Z",
    updatedAt: "2024-02-15T09:05:55.144Z",
  },
  {
    id: "clr507d670026ty0xfgiih6x1",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Составляем договор: права и обязанности, заверения об обстоятельствах",
    },
    progress: 8,
    createdAt: "2024-01-08T14:14:03.631Z",
    updatedAt: "2024-01-08T14:18:00.464Z",
  },
  {
    id: "clr9654gy0004xsk26lw9ofkj",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 0,
    createdAt: "2024-01-11T12:11:21.442Z",
    updatedAt: "2024-01-11T12:11:21.442Z",
  },
  {
    id: "clr9655q80005xsk2oz2lmydz",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "SQE – Legal Writing",
    },
    progress: 0,
    createdAt: "2024-01-11T12:11:23.072Z",
    updatedAt: "2024-01-11T12:11:23.072Z",
  },
  {
    id: "clr908hxj0022zn0xv18p9s6p",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "T&P Demo (Educate)",
    },
    progress: 3,
    createdAt: "2024-01-11T09:26:01.159Z",
    updatedAt: "2024-01-11T09:26:03.004Z",
  },
  {
    id: "clrd9hjv7001fza0x7fuqevgf",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Особенности создания кода работниками (Создание служебных произведений)",
    },
    progress: 2,
    createdAt: "2024-01-14T08:56:04.820Z",
    updatedAt: "2024-03-20T08:34:26.894Z",
  },
  {
    id: "clrd8tkp8000gxs26pj5r6fdb",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Регистрация прав на ПО",
    },
    progress: 0,
    createdAt: "2024-01-14T08:37:26.156Z",
    updatedAt: "2024-01-14T08:37:26.156Z",
  },
  {
    id: "clrd8tjw7000fxs264d7vfkos",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Регистрация прав на ПО",
    },
    progress: 8,
    createdAt: "2024-01-14T08:37:25.112Z",
    updatedAt: "2024-01-14T08:40:19.144Z",
  },
  {
    id: "clrd9duiq0018za0xsqlc17e7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Особенности заказной разработки",
    },
    progress: 6,
    createdAt: "2024-01-14T08:53:12.002Z",
    updatedAt: "2024-01-14T08:54:16.200Z",
  },
  {
    id: "clreyzaa9001jxz0xuaussery",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "OpenSource",
    },
    progress: 5,
    createdAt: "2024-01-15T13:37:28.786Z",
    updatedAt: "2024-01-15T13:37:44.452Z",
  },
  {
    id: "clrexlaj00013xz0xogyhszgh",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Регистрация в Роспатенте",
    },
    progress: 5,
    createdAt: "2024-01-15T12:58:36.301Z",
    updatedAt: "2024-01-15T12:59:14.201Z",
  },
  {
    id: "clrexx19w0018xz0xqotrdm8e",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Регулирование открытого ПО (open source) ",
    },
    progress: 0,
    createdAt: "2024-01-15T13:07:44.181Z",
    updatedAt: "2024-01-15T13:07:44.181Z",
  },
  {
    id: "clrexx1ub0019xz0xw88o0rol",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Регулирование открытого ПО (open source) ",
    },
    progress: 6,
    createdAt: "2024-01-15T13:07:44.915Z",
    updatedAt: "2024-01-15T13:07:55.766Z",
  },
  {
    id: "clrgezhub000wsv0x3ijt7o62",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 2,
    createdAt: "2024-01-16T13:53:18.612Z",
    updatedAt: "2024-01-29T08:53:38.738Z",
  },
  {
    id: "clrgezihf000xsv0xessqmekd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 12,
    createdAt: "2024-01-16T13:53:19.444Z",
    updatedAt: "2024-01-16T14:37:09.972Z",
  },
  {
    id: "clhhcrf8h155371frsckhd1a2r",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Работа с лексикой: рассмотрение спора в арбитраже",
    },
    progress: 15,
    createdAt: "2023-05-10T07:01:45.570Z",
    updatedAt: "2024-01-18T07:58:14.283Z",
  },
  {
    id: "cllgagjb70001yt0xxpty3zek",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Грамматика юридического английского: сложные предложения",
    },
    progress: 9,
    createdAt: "2023-08-18T07:48:21.571Z",
    updatedAt: "2024-01-18T09:15:17.565Z",
  },
  {
    id: "clrj7ykqt0054sg0xnrmokb6i",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Разбор SAFE",
    },
    progress: 3,
    createdAt: "2024-01-18T12:59:56.933Z",
    updatedAt: "2024-01-24T09:59:35.489Z",
  },
  {
    id: "clrketcuv002dw00xsx4wz0ju",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Налоги",
    },
    progress: 7,
    createdAt: "2024-01-19T08:59:36.919Z",
    updatedAt: "2024-01-19T08:59:50.617Z",
  },
  {
    id: "clrkdc46y0011w00xc7zhwy07",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Подача заявления на включение ПО в Реестр российского ПО",
    },
    progress: 0,
    createdAt: "2024-01-19T08:18:12.923Z",
    updatedAt: "2024-01-19T08:18:12.923Z",
  },
  {
    id: "clrkkgwdi0058w00x5k3r8rw3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Гражданский процесс. Часть 3",
    },
    progress: 0,
    createdAt: "2024-01-19T11:37:53.382Z",
    updatedAt: "2024-01-19T11:37:53.382Z",
  },
  {
    id: "clrkkgwsq0059w00xf0htm70e",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Гражданский процесс. Часть 3",
    },
    progress: 7,
    createdAt: "2024-01-19T11:37:53.930Z",
    updatedAt: "2024-01-19T11:38:03.739Z",
  },
  {
    id: "clrkd9c9d0010w00xat48cd5d",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Подача заявления на включение ПО в Реестр российского ПО",
    },
    progress: 2,
    createdAt: "2024-01-19T08:16:03.409Z",
    updatedAt: "2024-02-01T11:13:20.644Z",
  },
  {
    id: "clroygrfz002oxo0xznqmljvn",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Формы коммерциализации ПО",
    },
    progress: 0,
    createdAt: "2024-01-22T13:20:46.320Z",
    updatedAt: "2024-01-22T13:20:46.320Z",
  },
  {
    id: "clq2em23w0009xscubzvq0jdh",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Writing an application",
    },
    progress: 2,
    createdAt: "2023-12-12T13:54:22.892Z",
    updatedAt: "2024-02-15T13:01:13.786Z",
  },
  {
    id: "clrp9z887005wxo0xjemhbfy1",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Аудит клиентского пути продукта",
    },
    progress: 7,
    createdAt: "2024-01-22T18:43:03.655Z",
    updatedAt: "2024-01-22T18:43:24.782Z",
  },
  {
    id: "clroygsa5002pxo0x3r4c9jd7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Формы коммерциализации ПО",
    },
    progress: 10,
    createdAt: "2024-01-22T13:20:47.406Z",
    updatedAt: "2024-01-22T13:21:10.985Z",
  },
  {
    id: "clrp095u10035xo0xdvmvx2gy",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Модели облачных сервисов",
    },
    progress: 5,
    createdAt: "2024-01-22T14:10:50.953Z",
    updatedAt: "2024-01-22T14:11:09.641Z",
  },
  {
    id: "clrqfwxfh0008xsixlqo9xav1",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Основания возникновения представительства (Copy)",
    },
    progress: 0,
    createdAt: "2024-01-23T14:17:00.222Z",
    updatedAt: "2024-01-23T14:17:00.222Z",
  },
  {
    id: "clrp8szv7004wxo0x0qp9y2o8",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Коммерческая тайна и NDA",
    },
    progress: 2,
    createdAt: "2024-01-22T18:10:13.199Z",
    updatedAt: "2024-01-29T13:03:23.216Z",
  },
  {
    id: "clrq8nd7z0001xsix79g3etwa",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Проблемы согласования времен",
    },
    progress: 4,
    createdAt: "2024-01-23T10:53:36.815Z",
    updatedAt: "2024-01-23T10:53:39.052Z",
  },
  {
    id: "clrq8ndyb0002xsixxzxdooix",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Проблемы согласования времен",
    },
    progress: 11,
    createdAt: "2024-01-23T10:53:37.763Z",
    updatedAt: "2024-01-23T10:53:46.752Z",
  },
  {
    id: "clrtji9sc000eyl0xkuc1631y",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Оформление сайта компании пользовательскими документами",
    },
    progress: 13,
    createdAt: "2024-01-25T18:20:53.388Z",
    updatedAt: "2024-01-25T18:22:03.942Z",
  },
  {
    id: "clrrpgmaj006itb0xymdmbqho",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Разбор SAFE",
    },
    progress: 4,
    createdAt: "2024-01-24T11:32:01.627Z",
    updatedAt: "2024-01-26T14:57:19.821Z",
  },
  {
    id: "clrxqdosc0009xs80iby9uby0",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Гражданский процесс. Часть 1",
    },
    progress: 0,
    createdAt: "2024-01-28T16:44:21.564Z",
    updatedAt: "2024-01-28T16:44:21.564Z",
  },
  {
    id: "clrype0z1005eyf0xe32i8hb0",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 0,
    createdAt: "2024-01-29T09:04:23.917Z",
    updatedAt: "2024-01-29T09:04:23.917Z",
  },
  {
    id: "clrxqdplk000axs80dqx8qtzk",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Гражданский процесс. Часть 1",
    },
    progress: 14,
    createdAt: "2024-01-28T16:44:22.617Z",
    updatedAt: "2024-02-02T11:10:24.243Z",
  },
  {
    id: "clrxqej5i000bxs80pmzsx0dp",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Гражданский процесс. Часть 2",
    },
    progress: 6,
    createdAt: "2024-01-28T16:45:00.919Z",
    updatedAt: "2024-01-28T16:45:12.927Z",
  },
  {
    id: "clrxr0sci0010xs806m4k6ela",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Гражданский процесс. Часть 4",
    },
    progress: 0,
    createdAt: "2024-01-28T17:02:19.267Z",
    updatedAt: "2024-01-28T17:02:19.267Z",
  },
  {
    id: "clrype1hv005fyf0x5uvzg6di",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "M&A simulator",
    },
    progress: 6,
    createdAt: "2024-01-29T09:04:24.595Z",
    updatedAt: "2024-03-13T13:58:41.169Z",
  },
  {
    id: "clryxk3t3000syb0y5ud2ok2b",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Изменения программного кода",
    },
    progress: 2,
    createdAt: "2024-01-29T12:53:04.456Z",
    updatedAt: "2024-01-29T12:54:37.969Z",
  },
  {
    id: "cls050da2006byb0yrmyr1f0l",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Вводное тестирование",
    },
    progress: 0,
    createdAt: "2024-01-30T09:09:26.715Z",
    updatedAt: "2024-01-30T09:09:26.715Z",
  },
  {
    id: "cls0d95ga0028vy0yhw18jw3k",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Арбитражный процесс. Часть 2",
    },
    progress: 5,
    createdAt: "2024-01-30T13:00:13.402Z",
    updatedAt: "2024-02-18T08:20:17.087Z",
  },
  {
    id: "cls00f56m0003xs92nwnei7zg",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Промежуточное тестирование 1",
    },
    progress: 4,
    createdAt: "2024-01-30T07:00:57.982Z",
    updatedAt: "2024-01-30T09:18:08.621Z",
  },
  {
    id: "cls0d9cz5002bvy0y3gosoyaw",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Арбитражный процесс. Часть 2",
    },
    progress: 0,
    createdAt: "2024-01-30T13:00:23.153Z",
    updatedAt: "2024-01-30T13:00:23.153Z",
  },
  {
    id: "cls0d9bxs002avy0ydaf1q2x3",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Арбитражный процесс. Часть 2",
    },
    progress: 4,
    createdAt: "2024-01-30T13:00:21.809Z",
    updatedAt: "2024-01-30T13:00:23.563Z",
  },
  {
    id: "cls0dv34y002jvy0yp9akob3h",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Предмет, методы и принципы МЧП. Практический взгляд",
    },
    progress: 0,
    createdAt: "2024-01-30T13:17:16.834Z",
    updatedAt: "2024-01-30T13:17:16.834Z",
  },
  {
    id: "cls0dvpgl002kvy0yerfb53ux",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Бонусный урок. Транснациональное банкротство в российской судебной практике",
    },
    progress: 0,
    createdAt: "2024-01-30T13:17:45.765Z",
    updatedAt: "2024-01-30T13:17:45.765Z",
  },
  {
    id: "cls0f50lc0038vy0ytaj12o4d",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Семейное право",
    },
    progress: 7,
    createdAt: "2024-01-30T13:52:59.712Z",
    updatedAt: "2024-01-30T13:53:51.284Z",
  },
  {
    id: "cls0extdg0034vy0yj2u1qkjq",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Ответственность адвоката и адвокатская тайна",
    },
    progress: 4,
    createdAt: "2024-01-30T13:47:23.765Z",
    updatedAt: "2024-01-30T13:47:29.373Z",
  },
  {
    id: "cls0dvq8f002lvy0y8fcpbm8m",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Бонусный урок. Транснациональное банкротство в российской судебной практике",
    },
    progress: 7,
    createdAt: "2024-01-30T13:17:46.767Z",
    updatedAt: "2024-01-30T13:18:03.651Z",
  },
  {
    id: "cls0grd450045vy0y3q1fmmxo",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Этапы жизни юридических лиц",
    },
    progress: 4,
    createdAt: "2024-01-30T14:38:21.990Z",
    updatedAt: "2024-01-30T14:38:23.890Z",
  },
  {
    id: "cls0f2kli0037vy0yh7klurvl",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Гражданское право. Часть 1.",
    },
    progress: 0,
    createdAt: "2024-01-30T13:51:05.670Z",
    updatedAt: "2024-01-30T13:51:05.670Z",
  },
  {
    id: "cls0d94oo0026vy0yttnc539b",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Арбитражный процесс. Часть 2",
    },
    progress: 0,
    createdAt: "2024-01-30T13:00:12.408Z",
    updatedAt: "2024-01-30T13:00:12.408Z",
  },
  {
    id: "cls0d954q0027vy0yyu8qg0me",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Арбитражный процесс. Часть 2",
    },
    progress: 0,
    createdAt: "2024-01-30T13:00:12.987Z",
    updatedAt: "2024-01-30T13:00:12.987Z",
  },
  {
    id: "cls0ep6do002zvy0yxlutelk2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Процедура сдачи экзамена",
    },
    progress: 14,
    createdAt: "2024-01-30T13:40:40.716Z",
    updatedAt: "2024-01-30T13:41:00.833Z",
  },
  {
    id: "cls0grdyh0046vy0ycny5c1nd",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Этапы жизни юридических лиц",
    },
    progress: 6,
    createdAt: "2024-01-30T14:38:23.082Z",
    updatedAt: "2024-01-30T14:38:28.356Z",
  },
  {
    id: "cls3d6ugl000xu80ypicqxn25",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Российские нормативные акты, обычаи, доктрина, судебная практика",
    },
    progress: 11,
    createdAt: "2024-02-01T15:21:44.373Z",
    updatedAt: "2024-02-01T15:23:25.678Z",
  },
  {
    id: "cls3dky2z0011u80y5c8bhnvy",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Основания применения иностранного права и порядок установления его содержания",
    },
    progress: 0,
    createdAt: "2024-02-01T15:32:42.251Z",
    updatedAt: "2024-02-01T15:32:42.251Z",
  },
  {
    id: "cls3jhrqf000ixs92427p0wza",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Семейное право",
    },
    progress: 7,
    createdAt: "2024-02-01T18:18:11.752Z",
    updatedAt: "2024-02-01T18:18:52.999Z",
  },
  {
    id: "cls9zzley0059yn0y03ad2ark",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Le simulateur du Design Thinking",
    },
    progress: 15,
    createdAt: "2024-02-06T06:46:34.282Z",
    updatedAt: "2024-02-14T15:43:30.849Z",
  },
  {
    id: "clscy5wj3003ssk0yqmbcv9m7",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Правовой статус пациентов – военнослужащих",
    },
    progress: 12,
    createdAt: "2024-02-08T08:18:47.920Z",
    updatedAt: "2024-02-08T08:19:06.181Z",
  },
  {
    id: "clscu5owx001nsk0yp3grbiyo",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Вопросы конфиденциальности данных и информации в медицине ",
    },
    progress: 3,
    createdAt: "2024-02-08T06:26:39.586Z",
    updatedAt: "2024-02-08T06:26:42.107Z",
  },
  {
    id: "clscsxb42001ask0y5rnuny0x",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Программный код",
    },
    progress: 11,
    createdAt: "2024-02-08T05:52:08.835Z",
    updatedAt: "2024-02-08T05:52:23.612Z",
  },
  {
    id: "clsctds9h001csk0yv2nees1z",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Программный код",
    },
    progress: 0,
    createdAt: "2024-02-08T06:04:57.557Z",
    updatedAt: "2024-02-08T06:04:57.557Z",
  },
  {
    id: "clsctdrhr001bsk0y83gxegzr",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Программный код",
    },
    progress: 4,
    createdAt: "2024-02-08T06:04:56.559Z",
    updatedAt: "2024-02-08T06:04:58.540Z",
  },
  {
    id: "clseji0r50009xsgv30rishej",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Le simulateur du Design Thinking",
    },
    progress: 15,
    createdAt: "2024-02-09T11:03:51.378Z",
    updatedAt: "2024-02-13T12:24:09.978Z",
  },
  {
    id: "clsejhzlu0008xsgvbzrod0s2",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Le simulateur du Design Thinking",
    },
    progress: 15,
    createdAt: "2024-02-09T11:03:49.890Z",
    updatedAt: "2024-02-15T14:41:38.335Z",
  },
  {
    id: "clsn3ss5t004quv0yiio3y4a9",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Le simulateur du Design Thinking",
    },
    progress: 12,
    createdAt: "2024-02-15T10:54:15.117Z",
    updatedAt: "2024-03-06T10:10:44.027Z",
  },
  {
    id: "clsn7gdqq0063uv0yo59lmxpb",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Лексика. Корпоративное право.  (Copy)",
    },
    progress: 0,
    createdAt: "2024-02-15T12:36:35.091Z",
    updatedAt: "2024-02-15T12:36:35.091Z",
  },
  {
    id: "clsqj47eh00022j0y85rwnt4p",
    student: {
      name: "Mike",
      surname: "Kochkin",
    },
    lesson: {
      name: "Административное судопроизводство. Часть 2",
    },
    progress: 7,
    createdAt: "2024-02-17T20:26:20.922Z",
    updatedAt: "2024-02-17T20:26:36.738Z",
  },
];

console.log("lessonResults lemgth", lessonResults.length);
