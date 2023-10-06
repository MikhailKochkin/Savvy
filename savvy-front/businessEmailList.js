const emailList = [
  {
    name: "Mikhail",
    surname: "Kochkin",
    email: "test-ccv69mj10@srv1.mail-tester.com",
    comment: "CEO",
    firm: "BeSavvy",
    personalTouch: "Just a great guy",
    connection: "Just a great guy",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Tim",
    surname: "Barnden",
    email: "t.barnden@bateswells.co.uk",
    comment: "Partner",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 4", "September 19"],
  },
  {
    name: "William",
    surname: "Garnett",
    email: "w.garnett@bateswells.co.uk",
    comment: "Senior Counsel",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Paul",
    surname: "Jennings",
    email: "p.jennings@bateswells.co.uk",
    comment: "Partner",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Smruti",
    surname: "Jeyanandhan",
    email: "s.jeyanandhan@bateswells.co.uk",
    comment: "Senior Associate",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Mindy",
    surname: "Jhittay",
    email: "m.jhittay@bateswells.co.uk",
    comment: "Senior Associate",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Richard",
    surname: "Jones",
    email: "r.jones@bateswells.co.uk",
    comment: "Senior Associate",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Philip",
    surname: "Kirkpatrick",
    email: "p.kirkpatrick@bateswells.co.uk",
    comment: "Deputy Managing Partner",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Lucy",
    surname: "McLynn",
    email: "l.mclynn@bateswells.co.uk",
    comment: "Partner and Head of Employment",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Robert",
    surname: "Oakley",
    email: "r.oakley@bateswells.co.uk",
    comment: "Partner and Head of Dispute Resolution",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Chetal",
    surname: "Patel",
    email: "c.patel@bateswells.co.uk",
    comment: "Partner and Head of Immigration",
    firm: "Bates Wells",
    personalTouch:
      "Bates Wells' non-hierarchical culture and your emphasis on mentorship and employee development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Amy",
    surname: "Meyer",
    email: "amy-meyer@birketts.co.uk",
    comment: "Early Careers Manager",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Liz",
    surname: "Brownsell",
    email: "liz-brownsell@birketts.co.uk",
    comment: "Partner, Head of Charities",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Stefan",
    surname: "Harris-Wright",
    email: "stefan-harris-wright@birketts.co.uk",
    comment: "Partner, Head of Construction and Engineering",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Tom",
    surname: "Newcombe",
    email: "tom-newcombe@birketts.co.uk",
    comment: "Partner",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Sonya",
    surname: "O'Reilly",
    email: "sonya-oreilly@birketts.co.uk",
    comment: "Partner",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Dwight",
    surname: "Patten",
    email: "dwight-patten@birketts.co.uk",
    comment: "Partner",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Sara",
    surname: "Sayer",
    email: "sara-sayer@birketts.co.uk",
    comment: "Partner, Solicitor-Advocate, FRSA",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Abigail",
    surname: "Trencher",
    email: "abigail-trencher@birketts.co.uk",
    comment: "Partner",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Tom",
    surname: "Sharpe",
    email: "tom-sharpe@birketts.co.uk",
    comment: "Legal Director",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Charlotte",
    surname: "Sloan",
    email: "charlotte-sloan@birketts.co.uk",
    comment: "Legal Director",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5"],
    result: ["Spam"],
  },
  {
    name: "Edward",
    surname: "Bouckley",
    email: "edward-bouckley@birketts.co.uk",
    comment: "Senior Associate",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Jennifer",
    surname: "Marley",
    email: "jennifer-marley@birketts.co.uk",
    comment: "Senior Associate",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
  },
  {
    name: "Amanda",
    surname: "Timcke",
    email: "amanda-timcke@birketts.co.uk",
    comment: "Senior Associate",
    firm: "Birketts",
    personalTouch:
      "how your trainees confess that they not only receive high levels of responsibility but also find the work intellectually stimulating. It resonates with my own belief that challenging and meaningful work is crucial for professional development",
    sentEmailsTime: ["September 5", "September 19"],
    result: ["Spam"],
  },
  {
    name: "Isabel",
    surname: "Elsey",
    email: "Isabel.Elsey@bclplaw.com",
    comment: "Senior Emerging Talent Advisor",
    firm: "BCLP",
    personalTouch:
      "the fact that BCLP has a special Emerging Talent Team dedicated to helping lawyers grow",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Carol",
    surname: "Osborne",
    email: "carol.osborne@bclplaw.com",
    comment:
      "Training Principal, Partner and Global Practice Group Leader - Technology, Commercial and Government Affairs",
    firm: "BCLP",
    personalTouch:
      "the fact that BCLP has a special Emerging Talent Team dedicated to helping lawyers grow",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Chloe",
    surname: "Muir",
    email: "chloe.muir@bclplaw.com",
    comment: "Head of Emerging Talent EMEA & Asia",
    firm: "BCLP",
    personalTouch:
      "the fact that BCLP has a special Emerging Talent Team dedicated to helping lawyers grow",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "John",
    surname: "Bennett",
    email: "john.bennett@bclplaw.com",
    comment: "Partner, London",
    firm: "BCLP",
    personalTouch:
      "the fact that BCLP has a special Emerging Talent Team dedicated to helping lawyers grow",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Tim",
    surname: "Hellier",
    email: "tim.hellier@bclplaw.com",
    comment:
      "Partner and Practice Group Leader - Planning and Zoning UK, London",
    firm: "BCLP",
    personalTouch:
      "the fact that BCLP has a special Emerging Talent Team dedicated to helping lawyers grow",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Justine",
    surname: "Langer",
    email: "justine.langer@bclplaw.com",
    comment: "Senior Associate, Paris",
    firm: "BCLP",
    personalTouch:
      "the fact that BCLP has a special Emerging Talent Team dedicated to helping lawyers grow",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Guy",
    surname: "Swillingham",
    email: "guy.swillingham@bclplaw.com",
    comment: "Senior Associate, London",
    firm: "BCLP",
    personalTouch:
      "the fact that BCLP has a special Emerging Talent Team dedicated to helping lawyers grow",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Emerging Talent Team",
    surname: "",
    email: "Emerging.Talent@bclplaw.com",
    comment: "",
    firm: "BCLP",
    personalTouch:
      "the fact that BCLP has a special Emerging Talent Team dedicated to helping lawyers grow",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Penny",
    surname: "Bowring",
    email: "penny.bowring@burges-salmon.com",
    comment: "Resourcing Specialist",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Holly",
    surname: "Fey",
    email: "holly.fey@burges-salmon.com",
    comment: "Head of Resourcing",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Jenna",
    surname: "Hazel",
    email: "jenna.hazel@burges-salmon.com",
    comment: "Meet the recruiter",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Eleanor",
    surname: "Schamroth",
    email: "Eleanor.Schamroth@burges-salmon.com",
    comment: "Resourcing Specialist",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Amy",
    surname: "Davies",
    email: "amy.davies@burges-salmon.com",
    comment:
      "Senior Associate, Pensions Services, Pensions Legal Advice, Public Sector Pensions",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Chris",
    surname: "Jenkinson",
    email: "chris.jenkinson@burges-salmon.com",
    comment: "Resourcing Business Partner",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Matthew",
    surname: "Ramus",
    email: "matthew.ramus@burges-salmon.com",
    comment: "Partner, Head of Education, Defence, Transport",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "John",
    surname: "Houlden",
    email: "john.houlden@burges-salmon.com",
    comment:
      "Partner, Head of Public Sector, Head of Procurement and Subsidy Control, Projects",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Roger",
    surname: "Bull",
    email: "roger.bull@burges-salmon.com",
    comment: "Managing Partner, Employment Disputes, Strategic HR Projects",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Michael",
    surname: "Hayles",
    email: "michael.hayles@burges-salmon.com",
    comment:
      "Partner, Pensions, Public Sector Pension Schemes, Financial Services",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },
  {
    name: "Richard",
    surname: "Spink",
    email: "richard.spink@burges-salmon.com",
    comment:
      "Partner, Head of Corporate and Financial Institutions, Mergers and Acquisitions, Private Equity",
    firm: "Burges Salmon",
    personalTouch:
      "Burges Salmon's unique six-seat rotation model and your top-rated, practical training",
    sentEmailsTime: ["September 5"],
  },

  {
    name: "Mandy",
    surname: "Warnock ",
    email: "Mandy.Warnock@cms-cmno.com",
    comment: "Head of L&D ",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },

  {
    name: "Paul",
    surname: "Blackmore",
    email: "Paul.Blackmore@cms-cmno.com",
    comment:
      "Partner, 25 years of experience in equity capital markets transactions and mergers and acquisitions",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Richard",
    surname: "Brown",
    email: "Richard.Brown@cms-cmno.com",
    comment: "Partner, Employment team",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "David",
    surname: "Bunker",
    email: "David.Bunker@cms-cmno.com",
    comment: "Partner, advises on all aspects of corporate finance work",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Anne",
    surname: "Chitan",
    email: "Anne.Chitan@cms-cmno.com",
    comment: "Partner, Global Co-Head of Communications, TMC",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "John",
    surname: "Cloke",
    email: "John.Cloke@cms-cmno.com",
    comment: "Partner, commercial media team",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Anna",
    surname: "Cope",
    email: "anna.cope@cms-cmno.com",
    comment: "Partner, employment law specialist",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Elliot",
    surname: "Cowan",
    email: "Elliot.Cowan@cms-cmno.com",
    comment: "Partner, technology focused",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Dominic",
    surname: "Dryden",
    email: "dominic.dryden@cms-cmno.com",
    comment: "Partner, Technology and Sourcing lawyer",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Rachel",
    surname: "Free",
    email: "rachel.free@cms-cmno.com",
    comment: "Partner, Patent Attorney",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "Kelly",
    surname: "Saliger",
    email: "Kelly.Clarke@cms-cmno.com",
    comment:
      "Partner, CITMA Vice-President, Solicitor & Chartered Trade Mark Attorney",
    firm: "CMS",
    personalTouch:
      "CMS’ new common identity based on tech-savviness, anti-traditional lawyer stuffiness, and internationalism.",
    sentEmailsTime: ["September 5", "September 21"],
  },
  {
    name: "April",
    surname: "Brousseau",
    email: "april.brousseau@cliffordchance.com",
    comment: "Director, Research and Development",
    firm: "Clifford Chance",
    personalTouch:
      "Clifford Chance's forward-thinking approach, especially with the launch of their Research and Development Hub focused on digital solutions.",
    sentEmailsTime: ["September 5"],
    result: ["Unsubscribe"],
  },
  {
    name: "Anthony",
    surname: "Vigneron",
    email: "anthony.vigneron@cliffordchance.com",
    comment: "Director, Legal Technology Solutions",
    firm: "Clifford Chance",
    personalTouch:
      "Clifford Chance's forward-thinking approach, especially with the launch of their Research and Development Hub focused on digital solutions.",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Tom",
    surname: "Slate",
    email: "tom.slate@cliffordchance.com",
    comment: "Global Programme Director for Best Delivery",
    firm: "Clifford Chance",
    personalTouch:
      "Clifford Chance's forward-thinking approach, especially with the launch of their Research and Development Hub focused on digital solutions.",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Julia",
    surname: "Clarke",
    email: "julia.clarke@cliffordchance.com",
    comment:
      "Partner, Global Head of Coaching and partner, Global Learning and Development partner",
    firm: "Clifford Chance",
    personalTouch:
      "Clifford Chance's forward-thinking approach, especially with the launch of their Research and Development Hub focused on digital solutions.",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Emily",
    surname: "Holdstock",
    email: "emily.holdstock@forsters.co.uk",
    comment: "Partner, Construction",
    firm: "Forsters",
    personalTouch:
      "by Forsters' training approach. Trainees not only manage their own files but also have direct client interactions. That's so important!",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Miri",
    surname: "Stickland",
    email: "miri.stickland@forsters.co.uk",
    comment: "Head of Knowledge",
    firm: "Forsters",
    personalTouch:
      "by Forsters' training approach. Trainees not only manage their own files but also have direct client interactions. That's so important!",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Emma",
    surname: "Cooper",
    email: "emma.a.cooper@forsters.co.uk",
    comment: "Graduate Recruitment Officer",
    firm: "Forsters",
    personalTouch:
      "by Forsters' training approach. Trainees not only manage their own files but also have direct client interactions. That's so important!",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Alison",
    surname: "Fairchild",
    email: "alison.fairchild@forsters.co.uk",
    comment: "Director of HR",
    firm: "Forsters",
    personalTouch:
      "by Forsters' training approach. Trainees not only manage their own files but also have direct client interactions. That's so important!",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Rishi",
    surname: "Chudasama",
    email: "rishi.chudasama@forsters.co.uk",
    comment: "Recruitment Manager",
    firm: "Forsters",
    personalTouch:
      "by Forsters' training approach. Trainees not only manage their own files but also have direct client interactions. That's so important!",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Klaudija",
    surname: "Brami",
    email: "klaudija.brami@macfarlanes.com",
    comment: "Legal Technology and Innovation Officer",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Adam",
    surname: "Fieldgate",
    email: "adam.fieldgate@macfarlanes.com",
    comment: "Associate",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Thomas",
    surname: "Gawda",
    email: "thomas.gawda@macfarlanes.com",
    comment: "Legal Technology and Innovation Officer",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Charlie",
    surname: "Goodman",
    email: "charlie.goodman@macfarlanes.com",
    comment: "Associate",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Oliver",
    surname: "Jeffcott",
    email: "oliver.jeffcott@macfarlanes.com",
    comment: "Legal Technology and Innovation Officer",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Drew Honeywell",
    surname: "Kulow",
    email: "drew.honeywell@macfarlanes.com",
    comment: "Innovation and Engagement Manager",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5"],
    result: "Hard Bounce",
  },
  {
    name: "Sapheen",
    surname: "Meran",
    email: "sapheen.meran@macfarlanes.com",
    comment: "Legal Technology and Innovation Manager",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Joanna",
    surname: "Schmidt",
    email: "joanna.schmidt@macfarlanes.com",
    comment: "Senior Knowledge Management Officer",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "James",
    surname: "Silvester",
    email: "james.silvester@macfarlanes.com",
    comment: "Legal Technology and Innovation Officer",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Laura",
    surname: "Stafford",
    email: "laura.stafford@macfarlanes.com",
    comment: "Legal Technology and Innovation Manager",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Christopher",
    surname: "Tart-Roberts",
    email: "christopher.tart-roberts@macfarlanes.com",
    comment: "Head of Lawtech and Chief Knowledge & Innovation Officer",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Alison",
    surname: "Thorpe",
    email: "alison.thorpe@macfarlanes.com",
    comment: "Knowledge Manager",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Faisal",
    surname: "Zainal",
    email: "faisal.zainal@macfarlanes.com",
    comment: "Legal Technology and Innovation Officer",
    firm: "Macfarlanes",
    personalTouch:
      "the fact that the company has a separate lawtech practice dedicated to developing and integrating legal technologies",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Stephen",
    surname: "Smith",
    email: "stephen.smith@mayerbrown.com",
    comment: "Head of Learning and Development (Asia)",
    firm: "Mayer Brown",
    personalTouch:
      "the fact that Mayer Brown's newly qualified associates are so well-prepared that they become targets for recruitment by rival US and Magic Circle firms. It speaks volumes about the level of training here.",
    sentEmailsTime: ["September 5"],
    result: ["Unsubscribe"],
  },
  {
    name: "Iona",
    surname: "Sinclair",
    email: "iona.sinclair@mayerbrown.com",
    comment: "Head of Learning and Development",
    firm: "Mayer Brown",
    personalTouch:
      "the fact that Mayer Brown's newly qualified associates are so well-prepared that they become targets for recruitment by rival US and Magic Circle firms. It speaks volumes about the level of training here.",
    sentEmailsTime: ["September 5"],
    result: "ISP Block",
  },
  {
    name: "Charlotte",
    surname: "Hart",
    email: "charlotte.hart@mayerbrown.com",
    comment:
      "Learning & Development, Graduate Recruitment & Development, wider HR projects",
    firm: "Mayer Brown",
    personalTouch:
      "the fact that Mayer Brown's newly qualified associates are so well-prepared that they become targets for recruitment by rival US and Magic Circle firms. It speaks volumes about the level of training here.",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Grace",
    surname: "Ambrose",
    email: "grace.ambrose@mayerbrown.com",
    comment: "Graduate Recruitment & Development Manager",
    firm: "Mayer Brown",
    personalTouch:
      "the fact that Mayer Brown's newly qualified associates are so well-prepared that they become targets for recruitment by rival US and Magic Circle firms. It speaks volumes about the level of training here.",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Dana",
    surname: "Hill",
    email: "dana.hill@mayerbrown.com",
    comment: "Director of Learning & Development - U.S.",
    firm: "Mayer Brown",
    personalTouch:
      "the fact that Mayer Brown's newly qualified associates are so well-prepared that they become targets for recruitment by rival US and Magic Circle firms. It speaks volumes about the level of training here.",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Dimitri",
    surname: "Vastardis",
    email: "Dimitri.Vastardis@osborneclarke.com",
    comment: "Development Manager (Legal education and training)",
    firm: "Osborne Clarke",
    personalTouch:
      "the fact that the firm is taking steps to bolster its educational resources by partnering with BPP as its SQE legal education provider",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Alexandra",
    surname: "Gower",
    email: "alexandra.gower@osborneclarke.com",
    comment: "Partner and Training Principal",
    firm: "Osborne Clarke",
    personalTouch:
      "the fact that the firm is taking steps to bolster its educational resources by partnering with BPP as its SQE legal education provider",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Helen",
    surname: "Lewis",
    email: "helen.lewis@penningtonslaw.com",
    comment: "Senior Resourcing Manager",
    firm: "Penningtons Manches Cooper LLP",
    personalTouch:
      "the firm's proactive approach to technology; not only are you developing AI and automation tools, but you also offer a six-session 'Legal Tech' course for trainees. Fascinating",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Sheona",
    surname: "Boldero",
    email: "sheona.boldero@penningtonslaw.com",
    comment: "Head of Learning & Development",
    firm: "Penningtons Manches Cooper LLP",
    personalTouch:
      "the firm's proactive approach to technology; not only are you developing AI and automation tools, but you also offer a six-session 'Legal Tech' course for trainees. Fascinating",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Hazar",
    surname: "El-Chamaa",
    email: "hazar.el-chamaa@penningtonslaw.com",
    comment:
      "Partner, Immigration, Education, Private wealth, Retail, Sports and entertainment",
    firm: "Penningtons Manches Cooper LLP",
    personalTouch:
      "the firm's proactive approach to technology; not only are you developing AI and automation tools, but you also offer a six-session 'Legal Tech' course for trainees. Fascinating",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Anna",
    surname: "Frankum",
    email: "anna.frankum@penningtonslaw.com",
    comment:
      "Partner, Intellectual property, Commercial, Technology, Education",
    firm: "Penningtons Manches Cooper LLP",
    personalTouch:
      "the firm's proactive approach to technology; not only are you developing AI and automation tools, but you also offer a six-session 'Legal Tech' course for trainees. Fascinating",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Fiona",
    surname: "Rodgers",
    email: "fiona.rodgers@penningtonslaw.com",
    comment:
      "Senior associate, Commercial, Intellectual property, Technology, Life sciences, Education",
    firm: "Penningtons Manches Cooper LLP",
    personalTouch:
      "the firm's proactive approach to technology; not only are you developing AI and automation tools, but you also offer a six-session 'Legal Tech' course for trainees. Fascinating",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Pat",
    surname: "Saini",
    email: "pat.saini@penningtonslaw.com",
    comment:
      "Partner, Immigration, Education, India, Private wealth, Technology",
    firm: "Penningtons Manches Cooper LLP",
    personalTouch:
      "the firm's proactive approach to technology; not only are you developing AI and automation tools, but you also offer a six-session 'Legal Tech' course for trainees. Fascinating",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Chris",
    surname: "Shelley",
    email: "chris.shelley@penningtonslaw.com",
    comment:
      "Partner, Commercial, Intellectual property, Technology, Life sciences, Education",
    firm: "Penningtons Manches Cooper LLP",
    personalTouch:
      "the firm's proactive approach to technology; not only are you developing AI and automation tools, but you also offer a six-session 'Legal Tech' course for trainees. Fascinating",
    sentEmailsTime: ["September 5", "September, 21"],
  },
  {
    name: "Daff",
    surname: "Richardson",
    email: "daff.richardson@penningtonslaw.com",
    comment: "Partner, Employment, Education, Technology, Charities",
    firm: "Penningtons Manches Cooper LLP",
    personalTouch:
      "the firm's proactive approach to technology; not only are you developing AI and automation tools, but you also offer a six-session 'Legal Tech' course for trainees. Fascinating",
    sentEmailsTime: ["September 5", "September, 21"],
    result: ["Unsubscribe"],
  },
  {
    name: "Simon",
    surname: "Stubbs",
    email: "simon.stubbs@pinsentmasons.com",
    comment: "Senior Associate",
    firm: "Pinsent Masons",
    personalTouch:
      "the firm's multi-faceted approach to training; pre-recorded webinars, live sessions, and a team of lawyers ready to help",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Louise",
    surname: "Hollywood",
    email: "louise.hollywood@pinsentmasons.com",
    comment: "Head of HR",
    firm: "Pinsent Masons",
    personalTouch:
      "the firm's multi-faceted approach to training; pre-recorded webinars, live sessions, and a team of lawyers ready to help",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Khrystyna",
    surname: "Daines",
    email: "khrystyna.daines@pinsentmasons.com",
    comment: "Lean Six Sigma Manager",
    firm: "Pinsent Masons",
    personalTouch:
      "the firm's multi-faceted approach to training; pre-recorded webinars, live sessions, and a team of lawyers ready to help",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Adam",
    surname: "Marsland",
    email: "adam.marsland@pinsentmasons.com",
    comment: "Head of Lean Six Sigma",
    firm: "Pinsent Masons",
    personalTouch:
      "the firm's multi-faceted approach to training; pre-recorded webinars, live sessions, and a team of lawyers ready to help",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Martin",
    surname: "Ward",
    email: "martin.ward@pinsentmasons.com",
    comment: "Lean Six Sigma Manager",
    firm: "Pinsent Masons",
    personalTouch:
      "the firm's multi-faceted approach to training; pre-recorded webinars, live sessions, and a team of lawyers ready to help",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Nebil",
    surname: "Gaigi",
    email: "nebil.gaigi@pinsentmasons.com",
    comment: "Head of Legal Project Management",
    firm: "Pinsent Masons",
    personalTouch:
      "the firm's multi-faceted approach to training; pre-recorded webinars, live sessions, and a team of lawyers ready to help",
    sentEmailsTime: ["September 5"],
    result: "Spam Notification",
  },
  {
    name: "Matthew",
    surname: "Kay",
    email: "matthew.kay@pinsentmasons.com",
    comment: "Partner, Head of Vario",
    firm: "Pinsent Masons",
    personalTouch:
      "the firm's multi-faceted approach to training; pre-recorded webinars, live sessions, and a team of lawyers ready to help",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Jane",
    surname: "Stewart",
    email: "jane.stewart@slaughterandmay.com",
    comment: "Head of Knowledge and Innovation",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Jill",
    surname: "Hoseason",
    email: "Jill.Hoseason@SlaughterandMay.com",
    comment: "Chief Operating Officer",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Jonathan",
    surname: "Clarke",
    email: "Jonathan.Clarke@SlaughterandMay.com",
    comment: "Chief People Officer",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Emily",
    surname: "Dawson",
    email: "emily.dawson@slaughterandmay.com",
    comment: "Senior HR Manager",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Deepika",
    surname: "Tailor",
    email: "deepika.tailor@slaughterandmay.com",
    comment: "Learning & Development Manager",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Ellie",
    surname: "Blazye",
    email: "Ellie.Blazye@SlaughterandMay.com",
    comment: "Learning and Development Executive",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 22"],
  },
  {
    name: "Louisa",
    surname: "Richardson",
    email: "louisa.richardson@slaughterandmay.com",
    comment: "Senior Learning and Development Leader",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Evy",
    surname: "Sandhu",
    email: "evy.sandhu@slaughterandmay.com",
    comment: "Learning and Development Manager",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Amy",
    surname: "Choudhary",
    email: "amy.choudhary@slaughterandmay.com",
    comment: "Learning and Development Manager",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Claire",
    surname: "M.",
    email: "claire.m@slaughterandmay.com",
    comment: "Senior L&D Manager",
    firm: "Slaughter and May",
    personalTouch:
      "the fact that trainees at your firm have both partner-delivered training sessions and 1:1 training sessions with associates",
    sentEmailsTime: ["September 5", "September 22"],
  },
  {
    name: "Malcolm",
    surname: "Dowden",
    email: "malcolm.dowden@squirepb.com",
    comment: "Co-head of Knowledge Management",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Co-head of Knowledge Management at Squire Patton Boggs and are responsible for managing and disseminating legal knowledge and educational resources within the firm.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Giles",
    surname: "Chesher",
    email: "giles.chesher@squirepb.com",
    comment: "Partner, Training Principal",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Training Principal at Squire Patton Boggs and are responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Julie Arvo",
    surname: "MacKenzie",
    email: "julie.arvomackenzie@squirepb.com",
    comment: "Of Counsel",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Of Counsel at Squire Patton Boggs, advising clients in the higher education and healthcare sectors.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Michael",
    surname: "Dino",
    email: "michael.dino@squirepb.com",
    comment: "Principal",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Principal at Squire Patton Boggs, with policy experience in higher education and healthcare.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Taylor L.",
    surname: "Klavan",
    email: "taylor.klavan@squirepb.com",
    comment: "Principal",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Principal at Squire Patton Boggs, providing tax counsel for higher education and healthcare sectors.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Allison M.",
    surname: "Binkley",
    email: "allison.binkley@squirepb.com",
    comment: "Partner",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Partner at Squire Patton Boggs and are a member of the education committee of the Ohio Government Finance Officers Association.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Ryan K.",
    surname: "Callender",
    email: "ryan.callender@squirepb.com",
    comment: "Partner",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Partner at Squire Patton Boggs, focusing on public and infrastructure finance, including K-12 education.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Margaret S.",
    surname: "Callesen",
    email: "margaret.callesen@squirepb.com",
    comment: "Principal",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Principal at Squire Patton Boggs, specializing in public and infrastructure finance, including K-12 education.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Christopher J.",
    surname: "Franzmann",
    email: "chris.franzmann@squirepb.com",
    comment: "Partner",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Partner at Squire Patton Boggs and have served on the education committee of the Ohio Government Finance Officers Association.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Alexandra M.",
    surname: "MacLennan",
    email: "sandy.maclennan@squirepb.com",
    comment: "Partner",
    firm: "Squire Patton Boggs",
    connection:
      "you are working as Partner at Squire Patton Boggs, focusing on financings for healthcare and higher education projects.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Nicole",
    surname: "Alexander",
    email: "nicole.alexander@traverssmith.com",
    comment: "Graduate Recruitment Assistant",
    firm: "Travers Smith",
    connection:
      "you are working as a Graduate Recruitment Assistant at Travers Smith, aiding in the selection process for new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Victoria",
    surname: "Bramall",
    email: "victoria.bramall@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the recruitment and training of new associates and trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Samuel",
    surname: "Brewer",
    email: "samuel.brewer@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, participating in the recruitment and mentorship of new legal talent.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Tara",
    surname: "Davidson",
    email: "tara.davidson@traverssmith.com",
    comment: "Graduate Recruitment Manager",
    firm: "Travers Smith",
    connection:
      "you are the Graduate Recruitment Manager at Travers Smith, overseeing the recruitment process for new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "James",
    surname: "Longster",
    email: "james.longster@traverssmith.com",
    comment: "Partner, Co-Head of Graduate Recruitment",
    firm: "Travers Smith",
    connection:
      "you are a Partner and Co-Head of Graduate Recruitment at Travers Smith, responsible for selecting and training new legal talent.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Hannah",
    surname: "Manning",
    email: "hannah.manning@traverssmith.com",
    comment: "Partner, Co-Head of Graduate Recruitment",
    firm: "Travers Smith",
    connection:
      "you are a Partner and Co-Head of Graduate Recruitment at Travers Smith, playing a key role in the recruitment and development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Asma",
    surname: "Rashid",
    email: "asma.rashid@traverssmith.com",
    comment: "Senior Counsel, Co-Head of Graduate Recruitment",
    firm: "Travers Smith",
    connection:
      "you are a Senior Counsel and Co-Head of Graduate Recruitment at Travers Smith, involved in the selection and mentorship of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Germaine",
    surname: "VanGeyzel",
    email: "germaine.vangeyzel@traverssmith.com",
    comment: "Senior Graduate Recruitment Manager",
    firm: "Travers Smith",
    connection:
      "you are the Senior Graduate Recruitment Manager at Travers Smith, overseeing the entire recruitment process for new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Mahesh",
    surname: "Varia",
    email: "mahesh.varia@traverssmith.com",
    comment: "Head of Incentives & Remuneration",
    firm: "Travers Smith",
    connection:
      "you are the Head of Incentives & Remuneration at Travers Smith, responsible for the financial aspects of recruitment and employee benefits.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Sarah",
    surname: "Walker",
    email: "sarah.walker@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the recruitment and mentorship of new legal talent.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Joseph",
    surname: "Wren",
    email: "joseph.wren@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Fiona",
    surname: "Swords",
    email: "fiona.swords@traverssmith.com",
    comment: "Senior Counsel",
    firm: "Travers Smith",
    connection:
      "you are a Senior Counsel at Travers Smith, focusing on the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Laura",
    surname: "Smith",
    email: "laura.smith@traverssmith.com",
    comment: "Senior Counsel",
    firm: "Travers Smith",
    connection:
      "you are a Senior Counsel at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Michael",
    surname: "Ross",
    email: "michael.ross@traverssmith.com",
    comment: "Senior Counsel",
    firm: "Travers Smith",
    connection:
      "you are a Senior Counsel at Travers Smith, focusing on the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Elena",
    surname: "Rowlands",
    email: "elena.rowlands@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Polly",
    surname: "Richard",
    email: "polly.richard@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Joanna",
    surname: "Roberts",
    email: "joanna.roberts@traverssmith.com",
    comment: "Senior Counsel",
    firm: "Travers Smith",
    connection:
      "you are a Senior Counsel at Travers Smith, focusing on the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Dan",
    surname: "Reavill",
    email: "dan.reavill@traverssmith.com",
    comment: "Head of Technology & Commercial Transactions",
    firm: "Travers Smith",
    connection:
      "you are the Head of Technology & Commercial Transactions at Travers Smith, overseeing tech-related legal matters and training.",
    sentEmailsTime: ["September 11", "September 22"],
    result: ["Spam"],
  },
  {
    name: "Jon",
    surname: "Reddington",
    email: "jon.reddington@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Heather",
    surname: "Gagen",
    email: "heather.gagen@traverssmith.com",
    comment: "Partner and Co-Head of ESG and Impact",
    firm: "Travers Smith",
    connection:
      "you are a Partner and Co-Head of ESG and Impact at Travers Smith, focusing on sustainable and impactful legal practices.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Niamh",
    surname: "Hamlyn",
    email: "niamh.hamlyn@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Hugh",
    surname: "Hutchison",
    email: "hugh.hutchison@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Stephanie",
    surname: "Lee",
    email: "stephanie.lee@traverssmith.com",
    comment: "Partner",
    firm: "Travers Smith",
    connection:
      "you are a Partner at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 11", "September 22"],
  },
  {
    name: "Paul",
    surname: "Marco",
    email: "pmarco@trowers.com",
    comment: "Managing Partner",
    firm: "Paul is a Managing Partner of the firm and the Head of our Dispute Resolution department.",
    connection:
      "you are a Managing Partner at Travers Smith, involved in the mentorship and career development of new trainees.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Assad",
    surname: "Maqbool",
    email: "AMaqbool@trowers.com",
    comment: "Partner, Expertise in Education sector",
    firm: "Trowers & Hamlins",
    connection:
      "you are a Partner at Trowers & Hamlins, recognized for your expertise in the Education sector.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Paul",
    surname: "Robinson",
    email: "PRobinson@trowers.com",
    comment: "Director of Human Resources",
    firm: "Trowers & Hamlins",
    connection:
      "you are the Director of Human Resources at Trowers & Hamlins, responsible for talent acquisition and employee development.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Sarah",
    surname: "Pearce",
    email: "spearce@trowers.com",
    comment: "Head of Lateral Recruitment",
    firm: "Trowers & Hamlins",
    connection:
      "you are the Head of Lateral Recruitment at Trowers & Hamlins, focusing on hiring experienced professionals.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Lucy",
    surname: "De St Croix",
    email: "ldestcroix@trowers.com",
    comment: "Graduate Recruitment and Development Officer",
    firm: "Trowers & Hamlins",
    connection:
      "you are the Graduate Recruitment and Development Officer at Trowers & Hamlins, responsible for recruiting and developing new graduates.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Darcey",
    surname: "Burke",
    email: "dburke@trowers.com",
    comment: "Graduate Recruitment and Development Administrator",
    firm: "Trowers & Hamlins",
    connection:
      "you are the Graduate Recruitment and Development Administrator at Trowers & Hamlins, assisting in the recruitment and development of new graduates.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Rachel",
    surname: "Chapman",
    email: "rchapman@trowers.com",
    comment: "Graduate Recruitment and Development Manager",
    firm: "Trowers & Hamlins",
    connection:
      "you are the Graduate Recruitment and Development Manager at Trowers & Hamlins, overseeing the recruitment and development of new graduates.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Amanda",
    surname: "Grantham",
    email: "agrantham@willkie.com",
    comment: "Chief Administrative and Professional Development Officer",
    firm: "Willkie Farr & Gallagher (UK) LLP",
    connection:
      "you are the Chief Administrative and Professional Development Officer at Willkie Farr & Gallagher (UK) LLP, responsible for overseeing administrative functions and professional development programs.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Jane",
    surname: "Scobie",
    email: "jscobie@willkie.com",
    comment: "Partner, Training Principal, Tax Department",
    firm: "Willkie Farr & Gallagher (UK) LLP",
    connection:
      "you are the Training Principal and a Partner in the Tax Department at Willkie Farr & Gallagher (UK) LLP, advising on complex corporate and commercial tax matters and focusing on private equity transactions.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Yannis",
    surname: "Yuen",
    email: "yyuen@willkie.com",
    comment: "Associate, Litigation",
    firm: "Willkie Farr & Gallagher (UK) LLP",
    connection:
      "you are an Associate in the Litigation Department at Willkie Farr & Gallagher (UK) LLP, specializing in various litigation matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Peter",
    surname: "Burrell",
    email: "pburrell@willkie.com",
    comment: "Managing Partner of the London office",
    firm: "Willkie Farr & Gallagher (UK) LLP",
    connection:
      "you are the Managing Partner of the Willkie Farr & Gallagher London office,",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Amy",
    surname: "McCarthy",
    email: "amccarthy@akingump.com",
    comment: "Graduate Recruitment Manager",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are the Graduate Recruitment Manager at Akin Gump Strauss Hauer & Feld LLP, responsible for overseeing the recruitment process for new graduates entering the firm.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Kim",
    surname: "Koopersmith",
    email: "kkoopersmith@akingump.com",
    comment: "Partner & Chairperson",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Managing Partner at Akin Gump Strauss Hauer & Feld LLP, involved in the selection and onboarding of new graduates.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Vance",
    surname: "Chapman",
    email: "vchapman@akingump.com",
    comment: "Graduate Recruitment Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Graduate Recruitment Partner at Akin Gump Strauss Hauer & Feld LLP, involved in the selection and onboarding of new graduates.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Lauren",
    surname: "Leyden",
    email: "lleyden@akingump.com",
    comment: "Partner, Labor and Firmwide Hiring Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are the Firmwide Hiring Partner and a Partner in the Labor Department at Akin Gump Strauss Hauer & Feld LLP, overseeing firm-wide hiring initiatives.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Francine",
    surname: "Friedman",
    email: "ffriedman@akingump.com",
    comment: "Senior Policy Counsel",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are the Senior Policy Counsel at Akin Gump Strauss Hauer & Feld LLP, advising on policy matters, including those related to education.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Michael",
    surname: "Vernick",
    email: "mvernick@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Stephen",
    surname: "Baldini",
    email: "sbaldini@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "M. Scott",
    surname: "Barnard",
    email: "sbarnard@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Mark R.",
    surname: "Herring",
    email: "mherring@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Kendall B.",
    surname: "Hussey",
    email: "khussey@akingump.com",
    comment: "Senior Policy Advisor",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are the Senior Policy Advisor at Akin Gump Strauss Hauer & Feld LLP, advising on policy-related legal matters.",
    sentEmailsTime: [],
  },
  {
    name: "Hyongsoon",
    surname: "Kim",
    email: "hkim@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12"],
    result: "Hard Bounce",
  },
  {
    name: "B. Alexander",
    surname: "Kress",
    email: "akress@akingump.com",
    comment: "Consultant",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Consultant at Akin Gump Strauss Hauer & Feld LLP, providing specialized advice on various legal projects.",
    sentEmailsTime: ["September 12"],
    result: "Hard Bounce",
  },
  {
    name: "Jessica Jones",
    surname: "Mannon",
    email: "jmannon@akingump.com",
    comment: "Counsel",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Counsel at Akin Gump Strauss Hauer & Feld LLP, providing legal advice and representation.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Brennan H.",
    surname: "Meier",
    email: "bmeier@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Parvin Daphne",
    surname: "Moyne",
    email: "pmoyne@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Robert H.",
    surname: "Pees",
    email: "rpees@akingump.com",
    comment: "Partner & General Counsel",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are the Partner & General Counsel at Akin Gump Strauss Hauer & Feld LLP, responsible for overseeing the firm's legal matters and policies.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Anthony T.",
    surname: "Pierce",
    email: "apierce@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Steven H.",
    surname: "Schulman",
    email: "sschulman@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: [],
  },
  {
    name: "Angela B.",
    surname: "Styles",
    email: "astyles@akingump.com",
    comment: "Partner",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Partner at Akin Gump Strauss Hauer & Feld LLP, specializing in various legal matters.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Marta A.",
    surname: "Thompson",
    email: "mthompson@akingump.com",
    comment: "Counsel",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Counsel at Akin Gump Strauss Hauer & Feld LLP, providing legal advice and services.",
    sentEmailsTime: ["September 12", "September 25"],
    result: "Hard Bounce",
  },
  {
    name: "Geoffrey K.",
    surname: "Verhoff",
    email: "gverhoff@akingump.com",
    comment: "Senior Advisor",
    firm: "Akin Gump Strauss Hauer & Feld LLP",
    connection:
      "you are a Senior Advisor at Akin Gump Strauss Hauer & Feld LLP, providing strategic advice and guidance.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Hayley",
    surname: "Kennedy",
    email: "h.kennedy@ashfords.co.uk",
    comment:
      "Leadership | Learning | Talent | Culture & Organisational Development",
    firm: "Ashfords",
    connection:
      "you are working in organizational development at Ashfords, focusing on leadership, learning, and talent management.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Kerry",
    surname: "Morgan-Gould",
    email: "k.morgan-gould@ashfords.co.uk",
    comment: "Training Principal",
    firm: "Ashfords",
    connection:
      "you are working as Training Principal at Ashfords, responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Jessica",
    surname: "Iley",
    email: "j.iley@ashfords.co.uk",
    comment: "Talent Attraction Manager",
    firm: "Ashfords",
    connection:
      "you are working as Talent Attraction Manager at Ashfords, responsible for recruiting and onboarding new talent.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Toby",
    surname: "Tompkins",
    email: "t.tompkins@ashfords.co.uk",
    comment: "Talent Attraction Specialist",
    firm: "Ashfords",
    connection:
      "you are working as Talent Attraction Specialist at Ashfords, focusing on specialized recruitment strategies.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Alison",
    surname: "Board",
    email: "a.board@ashfords.co.uk",
    comment: "Talent Attraction Assistant",
    firm: "Ashfords",
    connection:
      "you are working as Talent Attraction Assistant at Ashfords, assisting in the recruitment process.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Louise",
    surname: "Workman",
    email: "l.workman@ashfords.co.uk",
    comment: "Partner and CEO",
    firm: "Ashfords",
    connection:
      "you are the CEO at Ashfords, overseeing all aspects of the firm including educational programs.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: "Chris",
    surname: "Dyson",
    email: "c.dyson@ashfords.co.uk",
    comment: "Partner and Head of Technology",
    firm: "Ashfords",
    connection:
      "you are the Head of Technology at Ashfords, potentially involved in tech-related educational programs.",
    sentEmailsTime: ["September 12", "September 25"],
  },
  {
    name: " Katherine",
    surname: "Wytcherley",
    email: "k.wytcherley@ashfords.co.uk",
    comment: "Head of HR Consulting & Operations",
    firm: "Ashfords",
    linkedin:
      "https://www.linkedin.com/in/katherine-wytcherley-44a7b7b8/?originalSubdomain=uk",
    connection:
      "you are the Human Resources Director at Ashfords, overseeing employee development and training programs.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Wim",
    surname: "Dejonghe",
    email: "wim.dejonghe@allenovery.com",
    comment: "Senior Partner",
    firm: "Allen & Overy",
    connection:
      "you are the Senior Partner at Allen & Overy, overseeing the firm's strategic direction and growth. your role likely involves educational and training initiatives for the firm's lawyers.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Khalid",
    surname: "Garousha",
    email: "khalid.garousha@allenovery.com",
    comment: "Managing Partner, Abu Dhabi",
    firm: "Allen & Overy",
    connection:
      "you are the Global Managing Partner for Allen & Overy, based in Abu Dhabi. your role likely involves overseeing educational and training programs for the firm's lawyers in the region.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Hervé",
    surname: "Ekué",
    email: "herve.ekue@allenovery.com",
    comment: "Managing Partner, Paris",
    firm: "Allen & Overy",
    connection:
      "you specialize in financial services regulation and have been an expert in the capital markets field for over 20 years. your role likely involves educational and training aspects for lawyers in your firm.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Sasha",
    surname: "Hardman",
    email: "Sasha.Hardman@AllenOvery.com",
    comment: "Global Chief HR Officer",
    firm: "Allen & Overy",
    connection:
      "you are the Global Chief HR Officer at Allen & Overy, responsible for human resources, including professional development and training programs for the firm's employees.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Vicki",
    surname: "Liu",
    email: "vicki.liu@allenovery.com",
    comment: "Managing Partner, Hong Kong",
    firm: "Allen & Overy",
    connection:
      "you are the Managing Partner of Allen & Overy's Hong Kong office and Co-Head of the Global Banking Practice. your role likely involves overseeing educational and training programs for the firm's lawyers in Hong Kong.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "James",
    surname: "Partridge",
    email: "james.partridge@allenovery.com",
    comment: "Graduate Recruitment Partner and Training Principal",
    firm: "Allen & Overy",
    connection:
      "you are working as Training Principal at Allen & Overy, responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Fiona",
    surname: "Colthorpe",
    email: "fiona.colthorpe@allenovery.com",
    comment: "Global Head of Talent and UK HR",
    firm: "Allen & Overy",
    connection:
      "you are the Global Head of Talent and UK HR at Allen & Overy, overseeing talent management and human resources, which includes educational programs.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Marc-Henri",
    surname: "Chamay",
    email: "marc-henri.chamay@aosphere.com",
    comment: "CEO, aosphere",
    firm: "aosphere",
    connection:
      "you are the CEO of aosphere, an online legal analysis platform, and are responsible for the overall educational content and compliance topics.",
    sentEmailsTime: [],
  },
  {
    name: "Clare",
    surname: "Godson",
    email: "clare.godson@aosphere.com",
    comment: "Executive Director, aosphere",
    firm: "aosphere",
    connection:
      "you are the Executive Director at aosphere, involved in the strategic planning and execution of educational content.",
    sentEmailsTime: [],
  },
  {
    name: "Jenny",
    surname: "Ljunghammar",
    email: "jenny.ljunghammar@aosphere.com",
    comment: "Head of Marketing Restrictions, aosphere",
    firm: "aosphere",
    connection:
      "you are the Head of Marketing Restrictions at aosphere, focusing on legal analysis related to marketing, which has educational implications.",
    sentEmailsTime: [],
  },
  {
    name: "Victoria",
    surname: "Wells",
    email: "victoria.wells@aosphere.com",
    comment: "Head of Derivatives, aosphere",
    firm: "aosphere",
    connection:
      "you are the Head of Derivatives at aosphere, responsible for legal analysis in the derivatives sector, contributing to educational content.",
    sentEmailsTime: [],
  },
  {
    name: "Faye",
    surname: "Sutherland",
    email: "faye.sutherland@aosphere.com",
    comment: "Head of Shareholding Disclosure - aosphere",
    firm: "aosphere",
    connection:
      "you are the Head of Shareholding Disclosure at aosphere, focusing on legal analysis related to shareholding, which is educational in nature.",
    sentEmailsTime: [],
  },
  {
    name: "Andrew",
    surname: "Anderson",
    email: "andrew.anderson@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in providing online legal analysis, which is educational in nature.",
    sentEmailsTime: [],
  },
  {
    name: "Penny",
    surname: "Blair",
    email: "penny.blair@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, focusing on key compliance topics that are educational for subscribers.",
    sentEmailsTime: [],
  },
  {
    name: "Rebecca",
    surname: "Clayton",
    email: "rebecca.clayton@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, contributing to the high-quality information that serves as educational content.",
    sentEmailsTime: [],
  },
  {
    name: "Kate",
    surname: "Dewire",
    email: "kate.dewire@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in legal analysis that is accessed online for educational purposes.",
    sentEmailsTime: [],
  },
  {
    name: "Bonnie",
    surname: "Turner",
    email: "bonnie.turner@aosphere.com",
    comment: "Developing talented professionals to fulfil their potential",
    firm: "aosphere",
    connection:
      "you are responsible for developing talented professionals at aosphere, which involves educational and training programs.",
    sentEmailsTime: [],
  },
  {
    name: "John",
    surname: "Dyson",
    email: "john.dyson@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in providing online legal analysis, which is educational in nature.",
    sentEmailsTime: [],
  },
  {
    name: "Sarah-Jane",
    surname: "Elsner",
    email: "sarah-jane.elsner@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, focusing on key compliance topics that are educational for subscribers.",
    sentEmailsTime: [],
  },
  {
    name: "Claire",
    surname: "Farley",
    email: "claire.farley@aosphere.com",
    comment: "Executive Director",
    firm: "aosphere",
    connection:
      "you are an Executive Director at aosphere, contributing to the high-quality information that serves as educational content.",
    sentEmailsTime: [],
  },
  {
    name: "Emily",
    surname: "Hillson",
    email: "emily.hillson@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in legal analysis that is accessed online for educational purposes.",
    sentEmailsTime: [],
  },
  {
    name: "Julia",
    surname: "Hollis",
    email: "julia.hollis@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in providing online legal analysis, which is educational in nature.",
    sentEmailsTime: [],
  },
  {
    name: "Alex",
    surname: "Matheson",
    email: "alex.matheson@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, focusing on key compliance topics that are educational for subscribers.",
    sentEmailsTime: [],
  },
  {
    name: "Serena",
    surname: "McMullen",
    email: "serena.mcmullen@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, contributing to the high-quality information that serves as educational content.",
    sentEmailsTime: [],
  },
  {
    name: "Victoria",
    surname: "McWilliam",
    email: "victoria.mcwilliam@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in legal analysis that is accessed online for educational purposes.",
    sentEmailsTime: [],
  },
  {
    name: "Claire",
    surname: "Mousley",
    email: "claire.mousley@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in providing online legal analysis, which is educational in nature.",
    sentEmailsTime: [],
  },
  {
    name: "Duncan",
    surname: "Mykura",
    email: "duncan.mykura@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, focusing on key compliance topics that are educational for subscribers.",
    sentEmailsTime: [],
  },
  {
    name: "Simon",
    surname: "Mynard",
    email: "simon.mynard@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, contributing to the high-quality information that serves as educational content.",
    sentEmailsTime: [],
  },
  {
    name: "Ann",
    surname: "O'Keeffe",
    email: "ann.okeeffe@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in legal analysis that is accessed online for educational purposes.",
    sentEmailsTime: [],
  },
  {
    name: "Fiona",
    surname: "O'Shea",
    email: "fiona.oshea@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in providing online legal analysis, which is educational in nature.",
    sentEmailsTime: [],
  },
  {
    name: "Manisha",
    surname: "Ramchurn",
    email: "manisha.ramchurn@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, focusing on key compliance topics that are educational for subscribers.",
    sentEmailsTime: [],
  },
  {
    name: "Rebecca",
    surname: "Simpson",
    email: "rebecca.simpson@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, contributing to the high-quality information that serves as educational content.",
    sentEmailsTime: [],
  },
  {
    name: "Sinead",
    surname: "Walley",
    email: "sinead.walley@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in legal analysis that is accessed online for educational purposes.",
    sentEmailsTime: [],
  },
  {
    name: "Rowena",
    surname: "Ward",
    email: "rowena.ward@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, involved in providing online legal analysis, which is educational in nature.",
    sentEmailsTime: [],
  },
  {
    name: "Katherine",
    surname: "Lunn",
    email: "katherine.lunn@aosphere.com",
    comment: "Senior Associate",
    firm: "aosphere",
    connection:
      "you are a Senior Associate at aosphere, focusing on key compliance topics that are educational for subscribers.",
    sentEmailsTime: [],
  },
  {
    name: "Cathleen",
    surname: "Butt",
    email: "cathleen.butt@aollenovery.com",
    comment: "Executive Director, A&O Consulting",
    firm: "Allen & Overy",
    connection:
      "you are the Executive Director at A&O Consulting, a part of Allen & Overy, where you likely oversee various educational and training initiatives for legal professionals.",
    sentEmailsTime: [],
  },
  {
    name: "Henrik",
    surname: "von Wehrs",
    email: "henrik.vonwehrs@aollenovery.com",
    comment: "Legal Tech Manager EU",
    firm: "Allen & Overy",
    connection:
      "you are the Legal Tech Manager for the EU at Allen & Overy, involved in the integration of technology into legal education and practice.",
    sentEmailsTime: [],
  },
  {
    name: "Brenna",
    surname: "Speiser",
    email: "brenna.speiser@aollenovery.com",
    comment: "Fuse Senior Manager",
    firm: "Allen & Overy",
    connection:
      "you are the Fuse Senior Manager at Allen & Overy, responsible for managing an innovation space that likely involves educational and training components.",
    sentEmailsTime: [],
  },
  {
    name: "Shruti",
    surname: "Ajitsaria",
    email: "shruti.ajitsaria@aollenovery.com",
    comment: "Partner, Head of Fuse",
    firm: "Allen & Overy",
    connection:
      "you are the Partner and Head of Fuse at Allen & Overy, overseeing an innovation space that likely has a strong educational and training focus.",
    sentEmailsTime: ["September 13"],
  },
  {
    name: "Kevin",
    surname: "Oliver",
    email: "kevin.oliver@allenovery.com",
    comment: "Executive Director, Legal Tech",
    firm: "Allen & Overy",
    connection:
      "you are the Executive Director of Legal Tech at Allen & Overy, where you are likely responsible for overseeing the integration of technology into legal education and practice.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Steven",
    surname: "Ng",
    email: "steven.ng@bakermckenzie.com",
    comment: "APAC Regional Head of Leadership & Learning",
    firm: "Baker McKenzie",
    connection:
      "you are the APAC Regional Head of Leadership & Learning at Baker McKenzie, responsible for overseeing leadership and educational programs in the Asia-Pacific region.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Roisin",
    surname: "Murphy",
    email: "roisin.murphy@bakermckenzie.com",
    comment: "Leadership & Learning Manager",
    firm: "Baker McKenzie",
    connection:
      "you are the Leadership & Learning Manager at Baker McKenzie, where you manage various educational and leadership development programs.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Gemma",
    surname: "Hiett",
    email: "gemma.hiett@bakermckenzie.com",
    comment: "Head of Leadership and Learning for EMEA",
    firm: "Baker McKenzie",
    connection:
      "you are the Head of Leadership and Learning for EMEA at Baker McKenzie, overseeing educational and leadership programs in Europe, the Middle East, and Africa.",
    sentEmailsTime: [],
    result: "Hard Bounce",
  },
  {
    name: "Melissa",
    surname: "Roy",
    email: "melissa.roy@bakermckenzie.com",
    comment: "Leadership and Learning Advisor",
    firm: "Baker McKenzie",
    connection:
      "you are the Leadership and Learning Advisor at Baker McKenzie, advising on educational and leadership development programs.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Marta",
    surname: "Janik",
    email: "marta.janik@bakermckenzie.com",
    comment:
      "Cultivator of high performance, continuous learning and development",
    firm: "Baker McKenzie",
    connection:
      "you are focused on cultivating high performance and continuous learning and development at Baker McKenzie.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Yeo",
    surname: "Pei Lin",
    email: "yeo.peilin@bakermckenzie.com",
    comment: "Senior Learning & Development Manager",
    firm: "Baker McKenzie",
    connection:
      "you are the Senior Learning & Development Manager at Baker McKenzie, excited to be in the evolution of the future of workplace learning.",
    sentEmailsTime: [],
    result: "Hard Bounce",
  },
  {
    name: "Amy",
    surname: "Lee",
    email: "amy.lee@bakermckenzie.com",
    comment: "Senior Manager, Leadership Development",
    firm: "Baker McKenzie",
    connection:
      "you are the Senior Manager of Leadership Development at Baker McKenzie, where you manage leadership development programs.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Stephen",
    surname: "Ratcliffe",
    email: "STEPHEN.RATCLIFFE@BAKERMCKENZIE.COM",
    comment: "Partner / London Training Principal",
    firm: "Baker McKenzie",
    connection:
      "you are the London Training Principal at Baker McKenzie, responsible for overseeing the educational and training programs for new associates and trainees in London.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Jay",
    surname: "Connolly",
    email: "Jay.Connolly@bakermckenzie.com",
    comment: "Global Chief People Officer",
    firm: "Baker McKenzie",
    connection:
      "you are the Global Chief People Officer at Baker McKenzie, overseeing human capital strategy including leadership and learning.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Sarah",
    surname: "Hopkins",
    email: "sarah.hopkins@bakermckenzie.com",
    comment: "Head of Talent - MENA",
    firm: "Baker McKenzie",
    connection:
      "you are the Head of Talent for the MENA region at Baker McKenzie, responsible for talent acquisition and development in the Middle East and North Africa.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Jennifer",
    surname: "Fox Crisp",
    email: "jennifer.foxcrisp@bakermckenzie.com",
    comment: "Global Director, Talent Management",
    firm: "Baker McKenzie",
    connection:
      "you are the Global Director of Talent Management at Baker McKenzie, overseeing talent management strategies worldwide.",
    sentEmailsTime: [],
    result: "Hard Bounce",
  },
  {
    name: "Katherine",
    surname: "Hallam",
    email: "katherine.hallam@bakermckenzie.com",
    comment: "Director of Talent Management",
    firm: "Baker McKenzie",
    connection:
      "you are the Director of Talent Management at Baker McKenzie in London, responsible for managing talent acquisition and development.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Sarah",
    surname: "Fowler",
    email: "sarah.fowler@bakermckenzie.com",
    comment: "Attracting the best talent",
    firm: "Baker McKenzie",
    connection:
      "you focus on attracting the best talent for Baker McKenzie, ensuring the firm has the highest caliber of professionals.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Torry",
    surname: "Corbett",
    email: "torry.corbett@bakermckenzie.com",
    comment: "Talent Acquisition Leader",
    firm: "Baker McKenzie",
    connection:
      "you are the Talent Acquisition Leader at Baker McKenzie, focusing on diversity and inclusion as well as being a people champion.",
    sentEmailsTime: ["September 13", "September 25"],
  },
  {
    name: "Rachel",
    surname: "Steward",
    email: "rachel.steward@bevanbrittan.com",
    comment: "Senior Recruitment Business Partner",
    firm: "Bevan Brittan LLP",
    connection:
      "you are the Senior Recruitment Business Partner at Bevan Brittan LLP, responsible for experienced hires as well as trainee and apprenticeship programs.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Annie",
    surname: "Hellberg",
    email: "annie.hellberg@bevanbrittan.com",
    comment: "Senior Early Talent Advisor",
    firm: "Bevan Brittan LLP",
    connection:
      "you are the Senior Early Talent Advisor at Bevan Brittan LLP, focusing on the recruitment and development of early-career professionals.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Kathryn",
    surname: "Sullivan",
    email: "Kathryn.Sullivan@bevanbrittan.com",
    comment: "Director of HR",
    firm: "Bevan Brittan",
    connection:
      "you are the Director of Human Resources at Bevan Brittan, overseeing the entire Human Resources function.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Laura",
    surname: "Norville",
    email: "laura.norville@bevanbrittan.com",
    comment: "HR Business Partner",
    firm: "Bevan Brittan LLP",
    connection:
      "you are an HR Business Partner at Bevan Brittan LLP, collaborating with various departments to align human resources strategy with business goals.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Ian",
    surname: "Edwards",
    email: "IAN.EDWARDS@TWOBIRDS.COM",
    comment: "Partner, Training Principal",
    firm: "Bird & Bird",
    connection:
      "you are working as Training Principal at Bird & Bird, and are also a partner in the tech transactions team.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Angela",
    surname: "Bishop",
    email: "angela.bishop@twobirds.com",
    comment: "Talent Acquisition Manager",
    firm: "Bird & Bird",
    connection:
      "you are the Talent Acquisition Manager at Bird & Bird, responsible for recruiting top talent into the firm.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Aylie",
    surname: "Ewing",
    email: "aylie.ewing@twobirds.com",
    comment: "Chief People Officer",
    firm: "Bird & Bird",
    connection:
      "you are the Chief People Officer at Bird & Bird, overseeing the firm's human resources and talent management.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Paula",
    surname: "Williams",
    email: "paula.williams@twobirds.com",
    comment: "Head Of Learning",
    firm: "Bird & Bird",
    connection:
      "you are the Head Of Learning at Bird & Bird, responsible for educational and training programs within the firm.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Leonora",
    surname: "McNabb",
    email: "leonora.mcnabb@twobirds.com",
    comment: "Learning Partner",
    firm: "Bird & Bird",
    connection:
      "you are a Learning Partner at Bird & Bird, with experience in teaching, HR, and marketing. you are also the Chair of Bird & Bird’s neurodiversity network.",
    sentEmailsTime: ["September 13", "September 27"],
    result: "Soft Bounce",
  },
  {
    name: "Simon",
    surname: "Shooter",
    email: "SIMON.SHOOTER@TWOBIRDS.COM",
    comment: "Partner",
    firm: "Bird & Bird",
    connection:
      "you are a Partner at Bird & Bird, heading the firm's International Commercial Group and established the cyber-security team in 2010.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Susan",
    surname: "McKenzie",
    email: "susan.mckenzie@brabners.com",
    comment: "Solicitor",
    firm: "Brabners",
    connection:
      "you are a Solicitor at Brabners, specializing in employment law. you regularly organize and deliver practical and interactive training to clients on employment law-related issues and also write articles and legal updates.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Colin",
    surname: "Bell",
    email: "colin.bell@brabners.com",
    comment:
      "Partner, Head of Intellectual Property, Head of Technology Sector",
    firm: "Brabners",
    connection:
      "you are the Partner and Head of Intellectual Property and Technology Sector at Brabners. your role likely involves educational initiatives within the technology and IP sectors.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Natalie",
    surname: "Smith",
    email: "natalie.smith@brabners.com",
    comment: "Talent Acquisition Advisor",
    firm: "Brabners",
    connection:
      "you are a Talent Acquisition Advisor at Brabners, responsible for recruiting and onboarding new talent, which involves educational and training programs.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Lisa",
    surname: "Thompson",
    email: "lisa.thompson@brabners.com",
    comment: "Head of People (People Operations & Enabling Functions)",
    firm: "Brabners",
    connection:
      "you are the Head of People at Brabners, overseeing people operations and enabling functions, which likely includes educational and training initiatives.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Christine",
    surname: "Hart",
    email: "christine.hart@brabners.com",
    comment: "Legal Director",
    firm: "Brabners",
    connection:
      "you are a Legal Director in the Employment and Pensions team at Brabners. you regularly provide training to businesses on key issues ranging from disciplinaries and grievances to anti-bullying and harassment.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Lee",
    surname: "Jefcott",
    email: "lee.jefcott@brabners.com",
    comment: "Partner",
    firm: "Brabners",
    connection:
      "you are a Partner in the Employment team at Brabners. you guest blog for Personnel Today and have developed innovative training for businesses on people-related matters. you are also a freelance lecturer for BPP Professional Development.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Nik",
    surname: "White",
    email: "nik.white@brabners.com",
    comment: "Managing Partner",
    firm: "Brabners",
    connection:
      "you are the Managing Partner at Brabners, responsible for overseeing the firm's operations and strategy, which likely includes educational and training initiatives for the team.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Harriet",
    surname: "Jones",
    email: "harriet.jones@bristows.com",
    comment: "HR Manager (Graduate Talent)",
    firm: "Bristows Law Firm",
    connection:
      "you are the HR Manager for Graduate Talent at Bristows Law Firm, responsible for the recruitment and development of graduate talent, which includes educational and training programs.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Morwenna",
    surname: "Scholes",
    email: "morwenna.scholes@bristows.com",
    comment: "Head of HR",
    firm: "Bristows LLP",
    connection:
      "you are the Head of HR at Bristows LLP, overseeing all human resources functions, which likely includes educational and training initiatives for the team.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Stephanie",
    surname: "Willbond-Hill",
    email: "stephanie.willbond-hill@bristows.com",
    comment: "Training & Development Manager",
    firm: "Bristows",
    connection:
      "you are the Training & Development Manager at Bristows, responsible for introducing support platforms for successful completion of professional qualifications and implementing efficient systems for training.",
    sentEmailsTime: ["September 13", "September 27"],
  },
  {
    name: "Jessica",
    surname: "Ebhomenye",
    email: "jessica.ebhomenye@bristows.com",
    comment: "Senior Associate",
    firm: "Bristows",
    connection:
      "you are a Senior Associate at Bristows, representing a diverse range of clients including educational institutions, which suggests a strong understanding of educational issues in the legal context.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Paul",
    surname: "Vissian",
    email: "paul.vissian@crsblaw.com",
    comment: "Head of Learning and Development",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are the Head of Learning and Development at Charles Russell Speechlys LLP, responsible for overseeing the educational and training programs for the team.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Karen",
    surname: "Stages",
    email: "Karen.Stages@crsblaw.com",
    comment: "Director of HR",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are the Director of HR at Charles Russell Speechlys LLP, providing executive oversight and direction to the firm’s people professionals, which likely includes educational and training initiatives.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Joanna",
    surname: "Stevens",
    email: "joanna.stevens@crsblaw.com",
    comment: "Early Talent Manager and Coach in training",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are an Early Talent Manager and Coach in training at Charles Russell Speechlys LLP, focusing on the development and coaching of early-career professionals.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Milli",
    surname: "Percival",
    email: "milli.percival@crsblaw.com",
    comment: "Senior Talent Acquisition Advisor",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are a Senior Talent Acquisition Advisor at Charles Russell Speechlys LLP, managing Business Services roles and part of the wider HR team, which likely involves educational and training programs.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Shona",
    surname: "Alexander",
    email: "shona.alexander@crsblaw.com",
    comment: "Partner",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are a Partner at Charles Russell Speechlys LLP with extensive experience in family law. you have been actively involved with Resolution and were a member of the National Committee and chair of the Training Group.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Rose",
    surname: "Carey",
    email: "rose.carey@crsblaw.com",
    comment: "Partner",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are a Partner specializing in business immigration and provide bespoke in-house training on compliance and right to work issues.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Emma",
    surname: "Humphreys",
    email: "emma.humphreys@crsblaw.com",
    comment: "Partner",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are a Partner and the former Chair of the Training and Education Committee of The Property Litigation Association, focusing on contentious property issues.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "David",
    surname: "Savage",
    email: "david.savage@crsblaw.com",
    comment: "Partner",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are a Partner who advises on construction, energy, and civil engineering matters. you have delivered training on FIDIC and the IChemE international contracts.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Kerry",
    surname: "Stares",
    email: "kerry.stares@crsblaw.com",
    comment: "Partner & Director of Responsible Business and Pro Bono",
    firm: "Charles Russell Speechlys LLP",
    connection:
      "you are a Partner and Director of Responsible Business and Pro Bono, leading efforts in disability benefits appeals work and training lawyers across the firm.",
    sentEmailsTime: ["September 14", "September 27"],
  },
  {
    name: "Matt",
    surname: "Hannaford",
    email: "matt.hannaford@clydeco.com",
    comment: "Partner, Training Principal",
    firm: "Clyde & Co",
    connection:
      "you are the Training Principal at Clyde & Co, responsible for graduate recruitment and ensuring that trainees are given all the opportunities they need to reach their full potential.",
    sentEmailsTime: ["September 14"],
    result: "Hard Bounce",
  },
  {
    name: "Susie",
    surname: "Renshaw",
    email: "susie.renshaw@clydeco.com",
    comment: "Senior Manager Early Careers Recruitment & Employer Brand",
    firm: "Clyde & Co",
    connection:
      "you are a Senior Manager focused on Early Careers Recruitment and Employer Branding at Clyde & Co, which involves educational and training programs for early-career professionals.",
    sentEmailsTime: ["September 14"],
    result: "Hard Bounce",
  },
  {
    name: "Karen",
    surname: "Begg",
    email: "karen.begg@clydeco.com",
    comment: "Partner Recruitment and Integration Director",
    firm: "Clyde & Co",
    connection:
      "you are the Partner Recruitment and Integration Director at Clyde & Co, responsible for recruiting and integrating new partners, which likely involves educational and training initiatives.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Anne-Marie",
    surname: "Lindsay",
    email: "anne-marie.lindsay@clydeco.com",
    comment: "Head of HR (UK)",
    firm: "Clyde & Co",
    connection:
      "you are the Head of HR for the UK at Clyde & Co, overseeing human resources functions, which likely includes educational and training programs.",
    sentEmailsTime: ["September 14", "October 5"],
  },
  {
    name: "Nicola",
    surname: "Shipley",
    email: "nicola.shipley@clydeco.com",
    comment: "Head of HR, Europe & LatAm",
    firm: "Clyde & Co",
    connection:
      "you are the Head of HR for Europe and LatAm at Clyde & Co, overseeing human resources functions in these regions, which likely includes educational and training programs.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Kate",
    surname: "Mathias",
    email: "kate.mathias@clydeco.com",
    comment: "Chief People Officer",
    firm: "Clyde & Co",
    connection:
      "you are the Chief People Officer at Clyde & Co, responsible for overseeing all people-related strategies, which likely includes educational and training initiatives.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Isabella",
    surname: "Wells",
    email: "isabella.wells@clydeco.com",
    comment: "L&D Advisor",
    firm: "Clyde & Co",
    connection:
      "you are an L&D Advisor at Clyde & Co, focusing on learning and development initiatives within the firm.",
    sentEmailsTime: ["September 14", "October 5"],
  },
  {
    name: "Jill",
    surname: "Kennedy",
    email: "jill.kennedy@clydeco.com",
    comment: "Global Head of Learning & Development",
    firm: "Clyde & Co",
    connection:
      "you are the Global Head of Learning & Development at Clyde & Co, responsible for overseeing the educational and training programs for the firm globally.",
    sentEmailsTime: ["September 14", "October 5"],
  },
  {
    name: "Ben",
    surname: "Parsons",
    email: "ben.parsons@clydeco.com",
    comment: "Head of Digital",
    firm: "Clyde & Co",
    connection:
      "you are the Head of Digital at Clyde & Co, focusing on digital innovations for clients and technology platforms to improve ways of working, which likely involves educational components.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Nick",
    surname: "Roberts",
    email: "nick.roberts@clydeco.com",
    comment: "Head of Legal Delivery & Innovation",
    firm: "Clyde & Co",
    connection:
      "you are the Head of Legal Delivery & Innovation at Clyde & Co, focusing on innovative ways to deliver legal services, which likely involves educational and training components.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Claire",
    surname: "Temple",
    email: "ctemple@cooley.com",
    comment: "Special Counsel & Training Principal",
    firm: "Cooley LLP",
    connection:
      "you are the Training Principal at Cooley LLP, responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Carrie",
    surname: "Wagner",
    email: "cwagner@cooley.com",
    comment: "Chief Legal Talent Officer",
    firm: "Cooley LLP",
    connection:
      "you are the Chief Legal Talent Officer at Cooley LLP, passionate about finding innovative ways to identify, recruit, develop, retain, and promote the next generation of talent, which involves educational and training programs.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Christopher",
    surname: "Poh",
    email: "cpoh@cooley.com",
    comment:
      "Regional Professional Development, Attorney Licensing and Accreditation Compliance",
    firm: "Cooley LLP",
    connection:
      "you are involved in Regional Professional Development and Attorney Licensing and Accreditation Compliance at Cooley LLP, which involves educational and training initiatives.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Shahrina",
    surname: "Choudhury",
    email: "schoudhury@cooley.com",
    comment: "Senior Legal Talent Manager",
    firm: "Cooley LLP",
    connection:
      "you are the Senior Legal Talent Manager at Cooley LLP in London, responsible for managing legal talent, which likely involves educational and training initiatives.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Anna",
    surname: "Moca",
    email: "amoca@cooley.com",
    comment: "Director of Knowledge Management & Innovation",
    firm: "Cooley LLP",
    connection:
      "you are the Director of Knowledge Management & Innovation at Cooley LLP, focusing on the management of knowledge and innovative practices within the firm, which likely involves educational components.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Monica",
    surname: "Mylordou",
    email: "mmylordou@cooley.com",
    comment: "Associate, Business Litigation",
    firm: "Cooley LLP",
    connection:
      "you are an Associate at Cooley LLP, specializing in Business Litigation. your role likely involves staying updated with legal education and training.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Joe",
    surname: "Conroy",
    email: "jconroy@cooley.com",
    comment: "Chairman and Chief Executive Officer",
    firm: "Cooley LLP",
    connection:
      "you are the Chairman and CEO at Cooley LLP, responsible for the firm's overall strategy, which likely includes educational and training initiatives.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Sarah",
    surname: "Warnes",
    email: "swarnes@cooley.com",
    comment: "Trainee Recruitment & Legal Talent Manager",
    firm: "Cooley LLP",
    connection:
      "you are the Trainee Recruitment & Legal Talent Manager at Cooley LLP, responsible for recruiting and managing legal talent, which involves educational and training programs.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Lois",
    surname: "Colquhoun",
    email: "lcolquhoun@cooley.com",
    comment: "Legal Talent Assistant",
    firm: "Cooley LLP",
    connection:
      "you are a Legal Talent Assistant at Cooley LLP, assisting in the management of legal talent, which likely involves educational and training initiatives.",
    sentEmailsTime: ["September 14"],
    result: "Hard Bounce",
  },
  {
    name: "Helen",
    surname: "Clark",
    email: "hclark@cooley.com",
    comment: "Regional Director, Europe",
    firm: "Cooley LLP",
    connection:
      "you are the Regional Director for Europe at Cooley LLP, overseeing the firm's operations in Europe, which likely includes educational and training initiatives.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Trisha",
    surname: "Weiss",
    email: "tweiss@cooley.com",
    comment: "Director of Attorney Recruiting",
    firm: "Cooley LLP",
    connection:
      "you are the Director of Attorney Recruiting at Cooley LLP, responsible for recruiting attorneys, which involves educational and training programs.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "James",
    surname: "Norris-Jones",
    email: "jnorrisjones@cgsh.com",
    comment: "Partner and Training Principal, London",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are working as Training Principal at Cleary Gottlieb Steen & Hamilton LLP, responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Sienna",
    surname: "Smallman",
    email: "ssmallman@cgsh.com",
    comment: "Associate, London",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are an Associate at Cleary Gottlieb Steen & Hamilton LLP, involved in pro bono work initiatives that are educationally relevant and led by passionate lawyers.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "David",
    surname: "Gottlieb",
    email: "dgottlieb@cgsh.com",
    comment: "Partner, London",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are a Partner at Cleary Gottlieb Steen & Hamilton LLP, emphasizing the importance of professional development and educational opportunities across a broad range of practice areas.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Polina",
    surname: "Lyadnova",
    email: "plyadnova@cgsh.com",
    comment: "Partner, London",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are a Partner at Cleary Gottlieb Steen & Hamilton LLP, advocating for a challenging environment that pushes for continuous educational and professional development.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Donna",
    surname: "Harris",
    email: "dharris@cgsh.com",
    comment: "Director of Legal Recruiting",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are the Director of Legal Recruiting at Cleary Gottlieb Steen & Hamilton LLP, focusing on talent acquisition, selection, and development strategy, which involves educational and training programs.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Sarah",
    surname: "Eagen",
    email: "seagen@cgsh.com",
    comment: "Director of Learning and Development - U.S.",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are the Director of Learning and Development at Cleary Gottlieb Steen & Hamilton LLP, responsible for overseeing educational and training programs in the U.S.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Rachelle",
    surname: "Ventura",
    email: "rventura@cgsh.com",
    comment: "Legal Learning & Development Manager",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are the Legal Learning & Development Manager at Cleary Gottlieb Steen & Hamilton LLP, managing educational and training programs for legal professionals.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Sheilah",
    surname: "Kane",
    email: "skane@cgsh.com",
    comment: "Litigation Knowledge Management Attorney",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are a Litigation Knowledge Management Attorney at Cleary Gottlieb Steen & Hamilton LLP, educating associates through a year-long training program on discovery.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Jesse",
    surname: "Klee",
    email: "jklee@cgsh.com",
    comment: "Knowledge Management | Legal Innovation | Thought Leadership",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you work in Knowledge Management at Cleary Gottlieb Steen & Hamilton LLP, focusing on legal innovation and thought leadership, which involves educational projects and training.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Shaunna",
    surname: "Jones",
    email: "shajones@cgsh.com",
    comment: "Chief Talent Officer",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are the Chief Talent Officer at Cleary Gottlieb Steen & Hamilton LLP, overseeing talent management which includes educational and training programs.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Kyle",
    surname: "Harris",
    email: "kaharris@cgsh.com",
    comment: "Partner",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are a Partner at Cleary Gottlieb Steen & Hamilton LLP and are active in the firm’s pro bono practice and educational pipeline work.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Edward",
    surname: "Aldred",
    email: "ealdred@cgsh.com",
    comment: "Partner",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are a Partner at Cleary Gottlieb Steen & Hamilton LLP and have worked closely with the Loan Market Association to develop and deliver their training.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Janine",
    surname: "Discher",
    email: "jdischer@cgsh.com",
    comment: "Associate",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are an Associate at Cleary Gottlieb Steen & Hamilton LLP and are experienced in the development and implementation of compliance trainings and programs.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Robert",
    surname: "Gruszecki",
    email: "rgruszecki@cgsh.com",
    comment: "Practice Development Lawyer",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are a Practice Development Lawyer at Cleary Gottlieb Steen & Hamilton LLP and serve as a resource for associates in their development and training.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Sonya",
    surname: "Lee",
    email: "shslee@cgsh.com",
    comment: "Practice Development Lawyer",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are a Practice Development Lawyer at Cleary Gottlieb Steen & Hamilton LLP and are responsible for the knowledge base of the real estate practice group, including the development of training tools.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Gretchen",
    surname: "Oldham",
    email: "goldham@cgsh.com",
    comment: "Practice Support Lawyer",
    firm: "Cleary Gottlieb Steen & Hamilton LLP",
    connection:
      "you are a Practice Support Lawyer at Cleary Gottlieb Steen & Hamilton LLP and focus on developing and delivering training for colleagues and clients.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Steven",
    surname: "King",
    email: "steven.king@dwf.law",
    comment: "Head Of Recruitment",
    firm: "DWF",
    connection:
      "you are the Head Of Recruitment at DWF, responsible for recruiting talent, which likely involves educational and training programs.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Kate",
    surname: "Hasluck",
    email: "kate.hasluck@dwf.law",
    comment: "Early Careers Manager",
    firm: "DWF",
    connection:
      "you are the Early Careers Manager at DWF, overseeing the development and training of individuals in the early stages of their legal careers.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Darren",
    surname: "Kenny",
    email: "darren.kenny@dwf.law",
    comment: "Partner",
    firm: "DWF",
    connection:
      "you are a Partner at DWF, and while your specific involvement in education is not mentioned, you likely have a role in mentoring and training junior staff.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Darren",
    surname: "Ormsby",
    email: "darren.ormsby@dwf.law",
    comment: "Partner",
    firm: "DWF",
    connection:
      "you are a Partner at DWF, and your role likely involves overseeing or contributing to the educational and training programs within the firm.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "JP",
    surname: "Buckley",
    email: "jp.buckley@dwf.law",
    comment: "Partner, Regional Data Protection & Cyber Security Leader",
    firm: "DWF",
    connection:
      "you are a Partner and Regional Data Protection & Cyber Security Leader at DWF, and your expertise in data protection likely involves training and educating staff on compliance.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Ben",
    surname: "Cooke",
    email: "benjamin.cooke@dwf.law",
    comment: "Partner",
    firm: "DWF",
    connection:
      "you are a Partner at DWF, and your role likely involves some level of educational or training responsibilities within the firm.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Ben",
    surname: "McLeod",
    email: "ben.mcleod@dwf.law",
    comment: "Partner",
    firm: "DWF",
    connection:
      "you are a Partner at DWF, and it's likely that you have some involvement in the educational and training aspects of your firm.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Sophie",
    surname: "Bessisso",
    email: "sophie.bessisso@davispolk.com",
    comment: "Associate",
    firm: "Davis Polk",
    connection:
      "you are an Associate at Davis Polk, and your role likely involves some level of educational or training responsibilities within the firm.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Dan",
    surname: "Hirschovits",
    email: "dan.hirschovits@davispolk.com",
    comment: "Partner and Training Partner",
    firm: "Davis Polk",
    connection:
      "you are the Training Partner at Davis Polk, responsible for supporting trainees throughout their journey to qualifying as a solicitor.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Connie I.",
    surname: "Milonakis",
    email: "connie.milonakis@davispolk.com",
    comment: "Partner",
    firm: "Davis Polk",
    connection:
      "you are a Partner at Davis Polk, and you have been offered helpful guidance along your career path, indicating a culture of mentorship and training.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Nick",
    surname: "Benham",
    email: "nick.benham@davispolk.com",
    comment: "Partner",
    firm: "Davis Polk",
    connection:
      "you are a Partner at Davis Polk, and you strongly encourage people to get involved in pro bono work, which offers a wider variety of experience early in their careers.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Lindsay",
    surname: "Tomenson",
    email: "lindsay.tomenson@davispolk.com",
    comment: "Chief Professional Development Officer",
    firm: "Davis Polk",
    connection:
      "you are the Chief Professional Development Officer at Davis Polk, overseeing the professional growth and training of the firm's staff.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Lees",
    surname: "Patriacca",
    email: "lees.patriacca@davispolk.com",
    comment:
      "Talent Acquisition | Professional Development | Staff Management | Project Management",
    firm: "Davis Polk",
    connection:
      "you are involved in Talent Acquisition and Professional Development at Davis Polk, making you integral to the educational and training aspects of the firm.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Rebecca",
    surname: "Crosby",
    email: "rebecca.crosby@davispolk.com",
    comment: "Director - Knowledge Management",
    firm: "Davis Polk",
    connection:
      "you are the Director of Knowledge Management at Davis Polk, responsible for the capture and dissemination of legal knowledge, which is a form of internal education.",
    sentEmailsTime: ["September 15", "October 5"],
  },
  {
    name: "Lara Samet",
    surname: "Buchwald",
    email: "lara.buchwald@davispolk.com",
    comment: "Partner",
    firm: "Davis Polk",
    connection:
      "you are a Partner at Davis Polk, and you were a full-fledged member of a trial team as a summer associate, indicating a culture of hands-on training and mentorship.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Roshni Banker",
    surname: "Cariello",
    email: "roshni.cariello@davispolk.com",
    comment: "Partner",
    firm: "Davis Polk",
    connection:
      "you are a Partner at Davis Polk, and you find the firm's culture to be supportive and conducive to professional development.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Jacqueline",
    surname: "Marino",
    email: "jacqueline.marino@davispolk.com",
    comment: "Counsel",
    firm: "Davis Polk",
    connection:
      "you are a Counsel at Davis Polk, and you value the mentorship and collaborative environment that helps lawyers succeed.",
    sentEmailsTime: ["September 15"],
  },

  {
    name: "Julie",
    surname: "Pickworth",
    email: "jpickworth@debevoise.com",
    comment: "International Counsel",
    firm: "Debevoise & Plimpton",
    connection:
      "you are responsible for risk, compliance, and knowledge management in the firm's London office, including managing legal training projects.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Maeve",
    surname: "O'Connor",
    email: "mloconnor@debevoise.com",
    comment: "Diversity Equity Inclusion Leadership Team Head",
    firm: "Debevoise & Plimpton",
    connection: "",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Marc",
    surname: "Grainger",
    email: "mgrainger@debevoise.com",
    comment: "Global Head of Human Resources",
    firm: "Debevoise & Plimpton",
    connection:
      "you are the Global Head of Human Resources, likely overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Timothy K.",
    surname: "Beeken",
    email: "tkbeeken@debevoise.com",
    comment: "Counsel & Managing Attorney",
    firm: "Debevoise & Plimpton",
    connection:
      "you are responsible for providing risk management, knowledge management, and quality control for the firm’s litigation matters.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Alex",
    surname: "Berrio Matamoros",
    email: "alex.berrio@debevoise.com",
    comment: "Manager of Knowledge Management",
    firm: "Debevoise & Plimpton",
    connection:
      "you are the Manager of Knowledge Management and have experience in educational technology, making you integral to the educational and training aspects of the firm.",
    sentEmailsTime: ["September 15"],
    result: "Hard Bounce",
  },
  {
    name: "Matthew D.",
    surname: "Saronson",
    email: "mdsaronson@debevoise.com",
    comment: "Partner",
    firm: "Debevoise & Plimpton",
    connection:
      "you are a Partner who has been involved in speaking engagements related to legal training.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Robert",
    surname: "Maddox",
    email: "rmaddox@debevoise.com",
    comment: "International Counsel",
    firm: "Debevoise & Plimpton",
    connection:
      "you have delivered cybersecurity training and have been featured in various publications, indicating your involvement in educational initiatives.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "David",
    surname: "Innes",
    email: "dinnes@debevoise.com",
    comment: "Of Counsel",
    firm: "Debevoise & Plimpton",
    connection:
      "you have been involved in speaking engagements related to legal training, particularly in the area of warranties and indemnities.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Shelane",
    surname: "Lomas",
    email: "shelane.lomas@dechert.com",
    comment: "Manager, Learning & Development",
    firm: "Dechert LLP",
    connection:
      "you are the Manager of Learning & Development at Dechert LLP, responsible for facilitating workplace learning and development programs.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Rosie Warren",
    surname: "Cafferty",
    email: "rosie.cafferty@dechert.com",
    comment: "Global Director of Learning and Development",
    firm: "Dechert LLP",
    connection:
      "you are the Global Director of Learning and Development at Dechert LLP, overseeing educational and training programs for the firm globally.",
    sentEmailsTime: ["September 15"],
    result: "Hard Bounce",
  },
  {
    name: "Margaret E.",
    surname: "Wilson",
    email: "margaret.wilson@dechert.com",
    comment: "Knowledge Management Lawyer",
    firm: "Dechert LLP",
    connection:
      "you are a Knowledge Management Lawyer at Dechert LLP, responsible for managing and disseminating legal knowledge within the firm.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Corey",
    surname: "Smith",
    email: "corey.smith@dechert.com",
    comment: "Chief Operating Officer",
    firm: "Dechert LLP",
    connection:
      "As the Chief Operating Officer at Dechert LLP, you oversee various functional areas including talent and human resources, which likely involves educational and training programs.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Alison Nina",
    surname: "Bernard",
    email: "alison.bernard@dechert.com",
    comment: "Chief Talent and Human Resources Officer",
    firm: "Dechert LLP",
    connection:
      "you oversee all aspects of the firm’s talent program at Dechert LLP, including recruiting, professional development, and diversity and inclusion.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Michael",
    surname: "Rinehart",
    email: "michael.rinehart@dechert.com",
    comment: "Chief Information Officer",
    firm: "Dechert LLP",
    connection:
      "you are responsible for the oversight, growth, and implementation of the firm’s information technology and innovation strategy at Dechert LLP.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Mozhgan",
    surname: "Mizban",
    email: "mozhgan.mizban@dechert.com",
    comment: "Chief Strategy Officer",
    firm: "Dechert LLP",
    connection:
      "As the Chief Strategy Officer at Dechert LLP, you work on strategic opportunities for the firm, including attracting and maintaining talent, which likely involves educational initiatives.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Jessica",
    surname: "Vanto",
    email: "jessica.vanto@dechert.com",
    comment: "Talent Team Member",
    firm: "Dechert LLP",
    connection:
      "you are a member of the talent team at Dechert LLP, likely involved in recruiting and training initiatives.",
    sentEmailsTime: ["September 15"],
    result: ["Hard Bounce"],
  },
  {
    name: "Daniel",
    surname: "Vatanaviggun",
    email: "daniel.vatanaviggun@dechert.com",
    comment: "Talent Team Member",
    firm: "Dechert LLP",
    connection:
      "you are a member of the talent team at Dechert LLP, likely involved in recruiting and training initiatives.",
    sentEmailsTime: ["September 15"],
    result: ["Hard Bounce"],
  },
  {
    name: "Tanya",
    surname: "Atkinson",
    email: "tanya.atkinson@expresssolicitors.co.uk",
    comment: "Digital Learning Manager (Assoc CIPD L&D)",
    firm: "Express Solicitors",
    connection:
      "you have over 10 years of experience in a learning and development setting. your role likely involves overseeing various educational and training programs.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "James",
    surname: "Maxey",
    email: "james.maxey@expresssolicitors.co.uk",
    comment: "Managing partner / Director",
    firm: "Express Solicitors Ltd and Ontime Reports Ltd",
    connection:
      "you are the Managing Partner at Express Solicitors, and your role likely involves overseeing the educational and training programs for the firm's lawyers.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Liam",
    surname: "Wynne",
    email: "liam.wynne@expresssolicitors.co.uk",
    comment: "Partner - Head of Operations",
    firm: "Express Solicitors",
    connection:
      "you are the Head of Operations at Express Solicitors. your role likely involves operational aspects that include educational and training programs for the firm's lawyers.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Carole",
    surname: "Jones",
    email: "carole.jones@expresssolicitors.co.uk",
    comment: "Partner - Head of HR",
    firm: "Express Solicitors",
    connection:
      "you are the Head of HR at Express Solicitors, responsible for the full employee remit including recruitment, planning, induction, training, assessment, and talent management.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Katie",
    surname: "Ellis",
    email: "katie.ellis@expresssolicitors.co.uk",
    comment: "Human Resources Manager (Chartered MCIPD)",
    firm: "Express Solicitors",
    connection:
      "you are a Human Resources Manager with a Chartered MCIPD certification. your role likely involves overseeing educational and training programs.",
    sentEmailsTime: ["September 15"],
  },
  {
    name: "Lee",
    surname: "Ranson",
    email: "lee.ranson@eversheds-sutherland.com",
    comment: "Co-Chief Executive Officer",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Co-Chief Executive Officer at Eversheds Sutherland, responsible for overseeing all aspects of the firm, including educational and training programs.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Keith",
    surname: "Froud",
    email: "keith.froud@eversheds-sutherland.com",
    comment: "Managing Partner (International)",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Managing Partner for International affairs at Eversheds Sutherland, likely overseeing educational and training programs for international branches.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Ian",
    surname: "Gray",
    email: "ian.gray@eversheds-sutherland.com",
    comment: "Executive Partner (International)",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Executive Partner for International affairs at Eversheds Sutherland, likely involved in educational and training programs for international branches.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Alison",
    surname: "Devlin",
    email: "alisondevlin@eversheds-sutherland.com",
    comment: "Head of Knowledge",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Head of Knowledge at Eversheds Sutherland, responsible for overseeing the firm's knowledge management, which likely includes educational and training programs.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Louise",
    surname: "Collins",
    email: "louise.collins@eversheds-sutherland.com",
    comment: "Knowledge Operations Manager",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Knowledge Operations Manager at Eversheds Sutherland, likely involved in managing educational and training programs.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Kristy",
    surname: "Weathers",
    email: "kristyweathers@eversheds-sutherland.com",
    comment: "Professional Development Partner",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Professional Development Partner at Eversheds Sutherland, responsible for overseeing the firm's comprehensive in-house training program.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Nathan",
    surname: "Lucas",
    email: "nathan.lucas@eversheds-sutherland.com",
    comment:
      "Principal Associate | Education | Corporate | Commercial | International | M&A",
    firm: "Eversheds Sutherland",
    connection:
      "you are a Principal Associate in the Corporate Education Team at Eversheds Sutherland, involved in educational projects and initiatives.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Dorita",
    surname: "Sheriff",
    email: "dorita.sheriff@eversheds-sutherland.com",
    comment: "Head of Learning and Development",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Head of Learning and Development at Eversheds Sutherland, responsible for all educational and training programs.",
    sentEmailsTime: ["September 25"],
    result: "Hard Bounce",
  },
  {
    name: "Sarah",
    surname: "Kingston",
    email: "sarah.kingston@eversheds-sutherland.com",
    comment: "Learning & Development Manager",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Learning & Development Manager at Eversheds Sutherland, responsible for translating the organization's overall strategy into effective and sustainable learning initiatives.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Lorraine",
    surname: "Kilborn",
    email: "lorraine.kilborn@eversheds-sutherland.com",
    comment: "Chief People Officer",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Chief People Officer at Eversheds Sutherland, overseeing human resources which likely includes educational and training programs.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Abigail",
    surname: "Fisher",
    email: "abigail.fisher@eversheds-sutherland.com",
    comment: "HR Director",
    firm: "Eversheds Sutherland",
    connection:
      "you are the HR Director at Eversheds Sutherland, likely involved in educational and training programs for employees.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Dianna",
    surname: "Hunter",
    email: "diannahunter@eversheds-sutherland.com",
    comment: "Director of Human Resources",
    firm: "Eversheds Sutherland",
    connection:
      "you are the Director of Human Resources at Eversheds Sutherland, likely overseeing educational and training programs for employees.",
    sentEmailsTime: ["September 25"],
  },
  {
    name: "Sarah",
    surname: "Donoghue",
    email: "earlycareersteam@fieldfisher.com",
    comment: "Graduate Recruitment & Development Manager",
    firm: "Fieldfisher",
    connection:
      "you are responsible for the attraction, selection, and development of Solicitor Apprentices and Trainee Solicitors across various offices. you also manage the firm's insight schemes and university relationships.",
    sentEmailsTime: ["September 27"],
  },
  {
    name: "Alison",
    surname: "Magee",
    email: "alison.magee@fieldfisher.com",
    comment: "Supports Sarah in recruitment and development",
    firm: "Fieldfisher",
    connection:
      "you support Sarah in the attraction, selection, and development of Solicitor Apprentices and Trainee Solicitors in the UK offices.",
    sentEmailsTime: ["September 27"],
  },
  {
    name: "Tom",
    surname: "Freestone",
    email: "tom.freestone@fieldfisher.com",
    comment: "Head of HR",
    firm: "Fieldfisher",
    connection:
      "you are the Head of HR at Fieldfisher, overseeing human resources which likely includes educational and training programs.",
    sentEmailsTime: ["September 27"],
  },
  {
    name: "Karen",
    surname: "Dempsey",
    email: "karen.dempsey@fieldfisher.com",
    comment: "HR Director Chartered CIPD",
    firm: "Fieldfisher",
    connection:
      "you are the HR Director at Fieldfisher, likely responsible for overseeing educational and training programs.",
    sentEmailsTime: ["September 27"],
  },
  {
    name: "Amelia",
    surname: "Spinks",
    email: "amelia.spinks@fieldfisher.com",
    comment: "Head of Recruitment",
    firm: "Fieldfisher",
    connection:
      "you are the Head of Recruitment at Fieldfisher, responsible for talent acquisition which likely includes educational and training programs.",
    sentEmailsTime: ["September 27"],
  },
  {
    name: "Ellie",
    surname: "Williamson",
    email: "ellie.williamson@fieldfisher.com",
    comment: "Talent Acquisition Advisor",
    firm: "Fieldfisher",
    connection:
      "you are responsible for all of the Apprentice and Graduate programs across Fieldfisher's Business Services and Legal Support Services areas.",
    sentEmailsTime: ["September 27"],
  },
  {
    name: "Ranjit",
    surname: "Dhindsa",
    email: "ranjit.dhindsa@fieldfisher.com",
    comment: "Birmingham Office Leader, Head of EPIC",
    firm: "Fieldfisher",
    connection:
      "you are the Birmingham Office Leader and the UK Head of EPIC at Fieldfisher, likely involved in educational and training programs.",
    sentEmailsTime: ["September 27"],
  },
  {
    name: "Robert",
    surname: "Shooter",
    email: "robert.shooter@fieldfisher.com",
    comment: "Managing Partner",
    firm: "Fieldfisher",
    connection:
      "you are the Managing Partner of Fieldfisher, responsible for the management of the firm with a special focus on innovation in law.",
    sentEmailsTime: ["September 27"],
  },
  {
    name: "Susie",
    surname: "Halliday",
    email: "susie.halliday@footanstey.com",
    comment: "Executive Director - Learning and Development",
    firm: "Foot Anstey LLP",
    connection:
      "you are the Executive Director of Learning and Development at Foot Anstey LLP, responsible for overseeing all educational and training programs within the firm.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Ina",
    surname: "Simon",
    email: "ina.simon@footanstey.com",
    comment: "Operations Director (HR)",
    firm: "Foot Anstey LLP",
    connection:
      "you are the Operations Director (HR & Resourcing) at Foot Anstey LLP, working closely with the HR Director and Group Leaders on all aspects of resourcing, leadership, and HR management.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Kerri",
    surname: "O'Driscoll",
    email: "kerri.odriscoll@footanstey.com",
    comment: "People and Reward Manager",
    firm: "Foot Anstey LLP",
    connection:
      "you are the People and Reward Manager at Foot Anstey LLP, likely involved in educational and training programs.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Jess",
    surname: "Guard",
    email: "jess.guard@footanstey.com",
    comment: "Early Careers Manager",
    firm: "Foot Anstey LLP",
    connection:
      "you focus on early careers recruitment and development at Foot Anstey LLP, supporting people in starting their careers and progressing.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Chloe",
    surname: "Stratford",
    email: "chloe.stratford@footanstey.com",
    comment: "Early Careers Advisor",
    firm: "Foot Anstey LLP",
    connection:
      "you specialize in early careers at Foot Anstey LLP, helping individuals progress and develop in their roles.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Martin",
    surname: "Hirst",
    email: "martin.hirst@footanstey.com",
    comment: "Managing Partner",
    firm: "Foot Anstey LLP",
    connection:
      "you are the Managing Partner at Foot Anstey LLP, responsible for the management of the firm and likely involved in educational and training programs.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Felix",
    surname: "Hebblethwaite",
    email: "Felix.Hebblethwaite@footanstey.com",
    comment: "Group HR Director",
    firm: "Foot Anstey LLP",
    connection:
      "you are the Group HR Director at Foot Anstey LLP, overseeing the HR function responsible for delivering the people elements of the firm’s strategy.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Helena",
    surname: "White",
    email: "helena.white@footanstey.com",
    comment: "Senior Human Resources Business Partner",
    firm: "Foot Anstey LLP",
    connection:
      "you provide proactive, commercially-driven HR advice and support at Foot Anstey LLP, likely involved in educational and training programs.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Clare",
    surname: "ROGERS",
    email: "clare.rogers@footanstey.com",
    comment: "Senior Human Resources Business Partner",
    firm: "Foot Anstey LLP",
    connection:
      "you are a Senior Human Resources Business Partner at Foot Anstey LLP, likely involved in educational and training programs.",
    sentEmailsTime: ["September 27", "October 5"],
  },
  {
    name: "Jeff",
    surname: "Wright",
    email: "jeff.wright@footanstey.com",
    comment: "Director level professional with extensive experience",
    firm: "Foot Anstey LLP",
    connection:
      "you have 30 years of experience in the legal industry and specialize in service delivery models, legal service pricing, and profitability at Foot Anstey LLP.",
    sentEmailsTime: ["September 14"],
  },
  {
    name: "Jons",
    surname: "Lehmann",
    email: "jons.lehmann@friedfrank.com",
    linkedin: "https://uk.linkedin.com/in/jons-lehmann",
    comment: "Training Principal and Partner in Corporate Practice",
    firm: "Fried Frank",
    connection:
      "you are the Training Principal at Fried Frank, responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Andrew",
    surname: "Brinkman",
    email: "andrew.brinkman@friedfrank.com",
    linkedin: "https://www.linkedin.com/in/andrew-brinkman-a0691a12/",
    comment: "Global Director of Knowledge Management",
    firm: "Fried Frank",
    connection:
      "you are the Global Director of Knowledge Management at Fried Frank, responsible for managing and disseminating knowledge resources across the firm.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Lindsay",
    surname: "Smith",
    email: "lindsay.smith@friedfrank.com",
    comment: "Knowledge Management & Innovation Attorney",
    firm: "Fried Frank",
    connection:
      "you are a Knowledge Management & Innovation Attorney at Fried Frank, involved in the management of knowledge resources and innovation initiatives.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Victor",
    surname: "Nuñez",
    email: "victor.nunez@friedfrank.com",
    comment: "Chief Operating Officer",
    firm: "Fried Frank",
    connection:
      "you are the Chief Operating Officer at Fried Frank, overseeing the operational aspects of the firm, including educational and training programs.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Annemarie",
    surname: "Crouch",
    email: "annemarie.crouch@friedfrank.com",
    linkedin: "https://www.linkedin.com/in/annemarie-crouch-63a75783/",
    comment: "Chief Human Resources Officer",
    firm: "Fried Frank",
    connection:
      "you are the Chief Human Resources Officer at Fried Frank, responsible for human resources, including training and development programs.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Ed",
    surname: "Enzor",
    email: "ed.enzor@friedfrank.com",
    comment: "Chief Operating Officer - Europe",
    firm: "Fried Frank",
    connection:
      "you are the Chief Operating Officer for Europe at Fried Frank, overseeing the operational aspects of the firm in Europe, including educational and training programs.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Evette",
    surname: "Pastoriza Clift",
    email: "evette.pastoriza@friedfrank.com",
    comment: "Chief Information Officer",
    firm: "Fried Frank",
    connection:
      "you are the Chief Information Officer at Fried Frank, responsible for the firm's information technology, which may include educational technology.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Lori Ann",
    surname: "Todd",
    email: "loriann.todd@friedfrank.com",
    comment: "Head of HR Business Services",
    firm: "Fried Frank",
    connection:
      "you are the Head of HR Business Services at Fried Frank, likely involved in educational and training programs for business services.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Sophie",
    surname: "Brookes",
    email: "Sophie.Brookes@gateleylegal.com",
    linkedin:
      "https://www.linkedin.com/in/sophie-brookes-48a93543/?originalSubdomain=uk",
    comment: "Partner PSL, leads the team of professional support lawyers",
    firm: "Gateley Plc",
    connection:
      "you lead the team of professional support lawyers at Gateley Plc and manage the firm’s Information Resources team. you are also involved in training and keeping lawyers and clients updated on new laws.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "Simon",
    surname: "Brittain",
    email: "Simon.Brittain@kiddyandpartners.com",
    linkedin: "https://www.linkedin.com/in/simon-brittain-81b07a9/",
    comment: "MANAGING PARTNER",
    firm: "Kiddy & Partners",
    connection:
      "you focus on assessment and work with leaders for their better positioning for success. you lead on both assessments for recruitment and for development/succession planning.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Charlie",
    surname: "Armitage",
    email: "Charlie.armitage@kiddyandpartners.com",
    linkedin: "https://www.linkedin.com/in/charlie-armitage-296890198/",
    comment: "PROJECT MANAGER",
    firm: "Kiddy & Partners",
    connection:
      "you support the planning and organization of client projects, delivering discrete project management activities through occupational psychology training and development of leaders and managers.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Lisa",
    surname: "Baker",
    email: "lisa.baker@kiddyandpartners.com",
    linkedin: "https://www.linkedin.com/in/lisa-baker-748a91b/",
    comment: "PRINCIPAL CONSULTANT",
    firm: "Kiddy & Partners",
    connection:
      "you focus on executive assessment, leadership development, and coaching. you bring subject matter expertise along with strong commercial judgment to support clients with appointing and developing their leaders.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Melanie",
    surname: "Duffy",
    email: "Melanie.Duffy@kiddyandpartners.com",
    linkedin: "https://www.linkedin.com/in/melanie-duffy-363291113/",
    comment: "OPERATIONS TEAM LEAD",
    firm: "Kiddy & Partners",
    connection:
      "you are responsible for ensuring the successful delivery of large-scale programs at Kiddy. you have extensive experience in executing complex, global programs.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Charlotte",
    surname: "Forsblad",
    email: "Charlotte.Forsblad@kiddyandpartners.com",
    linkedin: "",
    comment: "SENIOR CONSULTANT",
    firm: "Kiddy & Partners",
    connection:
      "your experience spans the design and delivery of processes focusing on inclusive leadership development, high potential identification, and manager/leader development using psychometrics and 360-degree feedback.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Lauren",
    surname: "Newton",
    email: "Lauren.newton@kiddyandpartners.com",
    linkedin: "https://www.linkedin.com/in/lauren-newton-46991919/",
    comment: "Client Director, Chartered Occupational Psychologist",
    firm: "Kiddy & Partners",
    connection:
      "you specialize in the assessment and development of leaders and high-potential employees, working across various sectors.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Laura",
    surname: "Whitworth",
    email: "lwhitworth@t-three.co.uk",
    linkedin: "https://www.linkedin.com/in/laurawhitworth/",
    comment: "Client Director/Cluster Lead",
    firm: "t-three",
    connection:
      "you design and deliver leadership development and management training programs. you consult with organizations to advise on learning programs and performance improvement.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Anthony",
    surname: "Walker",
    email: "awalker@t-three.co.uk",
    linkedin: "https://www.linkedin.com/in/anthony-walker-8799296/",
    comment: "Director",
    firm: "t-three",
    connection:
      "you focus on defining the leadership and culture organizations need for growth. you are involved in profiling and assessing to find the right people for organizational goals.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Rae",
    surname: "March",
    email: "Rae.March@gateleylegal.com",
    linkedin:
      "https://www.linkedin.com/in/rae-march-19aa54b5/?originalSubdomain=uk",
    comment: "Learning & Development Administrator",
    firm: "Gateley",
    connection:
      "you work with the Learning & Development team at Gateley to help create and deploy training, as well as supporting the PSLs to use the LMS effectively.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "Ruth",
    surname: "Heaton",
    email: "Ruth.Heaton@gateleylegal.com",
    linkedin: "https://www.linkedin.com/in/ruthheaton/?originalSubdomain=uk",
    comment: "Talent Development Director and Head of Thrive",
    firm: "Gateley",
    connection:
      "you shape the learning and development of people at Gateley to maximize potential and support the delivery of organizational strategic goals. you are also responsible for the health and wellbeing agenda at Gateley.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "Heidi",
    surname: "Goldstein Shepherd",
    email: "hshepherd@goodwinlaw.com",
    linkedin: "",
    comment:
      "Chief Talent Officer and Assistant General Counsel for Employment",
    firm: "Goodwin",
    connection:
      "you are the Chief Talent Officer and Assistant General Counsel for Employment at Goodwin. you oversee all professional development, diversity, equity + inclusion, leadership, recruiting, training, and human resources functions.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "Caitlin",
    surname: "Vaughn",
    email: "cvaughn@goodwinlaw.com",
    linkedin: "",
    comment: "Director, Learning & Professional Development",
    firm: "Goodwin",
    connection:
      "you work to enhance the knowledge and skills of Goodwin’s attorneys and professional staff for their personal and professional growth.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "Anne",
    surname: "Stemlar",
    email: "astemlar@goodwinlaw.com",
    linkedin: "https://www.linkedin.com/in/anne-stemlar-82154a4/",
    comment:
      "Managing Director, Knowledge Management | Legal Technology | KM Strategy | Data Strategy | Innovation",
    firm: "Goodwin",
    connection:
      "you are the Managing Director of Knowledge Management at Goodwin, focusing on legal technology, KM strategy, data strategy, and innovation.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "David",
    surname: "Hobbie",
    email: "dhobbie@goodwinlaw.com",
    linkedin: "https://www.linkedin.com/in/davidhobbie/",
    comment: "Director, Knowledge Management (Litigation)",
    firm: "Goodwin",
    connection:
      "you are the Director of Knowledge Management for Litigation at Goodwin, responsible for managing and disseminating litigation-related knowledge within the firm.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "Karen",
    surname: "Stefaney",
    email: "kstefaney@goodwinlaw.com",
    linkedin: "https://www.linkedin.com/in/karen-stefaney-372a959/",
    comment: "Director, Professional Staff Learning",
    firm: "Goodwin",
    connection:
      "you are the Director of Professional Staff Learning at Goodwin, responsible for the educational and training programs for the professional staff.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "Katie",
    surname: "Gledhill",
    email: "kgledhill@goodwinlaw.com",
    linkedin:
      "https://www.linkedin.com/in/katie-gledhill-11238639/?originalSubdomain=uk",
    comment: "Managing Director, Talent (Europe & Asia) and Operations (UK)",
    firm: "Goodwin",
    connection:
      "you are the Managing Director of Talent for Europe & Asia and Operations for the UK at Goodwin, overseeing talent management activities in these regions.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "Svetlana",
    surname: "Wright",
    email: "swright@goodwinlaw.com",
    linkedin:
      "https://www.linkedin.com/in/svetlana-wright-91586961/?originalSubdomain=uk",
    comment: "Senior Human Resources Manager",
    firm: "Goodwin",
    connection:
      "you are the Senior Human Resources Manager at Goodwin, involved in various HR functions including talent management.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Karen",
    surname: "Morita",
    email: "kmorita@goodwinlaw.com",
    linkedin: "",
    comment: "Managing Director, Human Resources - US",
    firm: "Goodwin",
    connection:
      "you are the firm’s Managing Director, Human Resources for the U.S. at Goodwin. your focus includes oversight of performance and talent management, as well as compensation for the firm’s professional staff and attorneys.",
    sentEmailsTime: ["September 28", "October 5"],
  },
  {
    name: "GINEVRA",
    surname: "SAYLOR",
    email: "ginevra.saylor@gowlingwlg.com",
    linkedin: "https://www.linkedin.com/in/ginevrasaylor/",
    comment: "Director, Innovation and Knowledge Programs",
    firm: "Gowling WLG",
    connection:
      "you are the Director of Innovation and Knowledge Programs at Gowling WLG, responsible for leading the firm's innovation, knowledge management, learning and development, legal project management, client and practice solutions, and process re-engineering strategy and initiatives.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "amanda",
    surname: "mckenzie",
    email: "amanda.mckenzie@gowlingwlg.com",
    linkedin: "",
    comment: "Legal Knowledge Management, Operations and Legal Tech Specialist",
    firm: "Gowling WLG",
    connection:
      "you specialize in Legal Knowledge Management, Operations, and Legal Tech at Gowling WLG, focusing on the implementation and management of legal technologies and knowledge resources.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Jay",
    surname: "Lutwyche",
    email: "jay.lutwyche@gowlingwlg.com",
    linkedin: "",
    comment: "Head of Learning & Development",
    firm: "Gowling WLG",
    connection:
      "you are the Head of Learning & Development at Gowling WLG, responsible for creating a culture that supports development, high performance, and innovation.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Cora",
    surname: "Hanley",
    email: "cora.hanley@gowlingwlg.com",
    linkedin: "",
    comment: "Learning and Development Manager",
    firm: "Gowling WLG",
    connection:
      "you are the Learning and Development Manager at Gowling WLG UK, responsible for managing and implementing learning and development programs.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Marva",
    surname: "Bethune",
    email: "marva.bethune@gowlingwlg.com",
    linkedin:
      "https://www.linkedin.com/in/marva-bethune-0a99667/?originalSubdomain=ca",
    comment: "Director, Human Resources",
    firm: "Gowling WLG",
    connection:
      "you are the Director of Human Resources at Gowling WLG, overseeing the firm's human resources strategies and policies.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Chris",
    surname: "Oglethorpe",
    email: "chris.oglethorpe@gowlingwlg.com",
    linkedin:
      "https://www.linkedin.com/in/chrisoglethorpe/?originalSubdomain=uk",
    comment: "HR Director",
    firm: "Gowling WLG",
    connection:
      "you are the HR Director at Gowling WLG, responsible for overseeing human resources functions and strategies.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Samantha",
    surname: "Holland",
    email: "samantha.holland@gowlingwlg.com",
    linkedin:
      "https://www.linkedin.com/in/samantha-holland-72587726/?originalSubdomain=uk",
    comment: "Partner and Training Principal",
    firm: "Gowling WLG",
    connection:
      "you are working as Training Principal at Gowling WLG, and are responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Anita",
    surname: "Bapat",
    email: "anita.bapat@harbottle.com",
    linkedin:
      "https://www.linkedin.com/in/anita-bapat-05436164/?originalSubdomain=uk",
    comment: "Partner, Training Principal",
    firm: "Harbottle & Lewis LLP",
    connection:
      "you are working as Training Principal at Harbottle & Lewis LLP, and are responsible for creating a wide-ranging training programme for lawyers.",
    sentEmailsTime: [],
  },
  {
    name: "Elizabeth",
    surname: "Noone",
    email: "Elizabeth.Noone@harbottle.com",
    linkedin: "https://www.linkedin.com/in/enoone/?originalSubdomain=uk",
    comment: "Learning & Development Manager",
    firm: "Harbottle & Lewis LLP",
    connection:
      "you are working as Learning & Development Manager at Harbottle & Lewis LLP, focusing on the end-to-end production of online learning content for legal professionals.",
    sentEmailsTime: [],
  },
  {
    name: "Chris",
    surname: "Moorcroft",
    email: "chris.moorcroft@harbottle.com",
    linkedin:
      "https://www.linkedin.com/in/chrismoorcroft/?originalSubdomain=uk",
    comment: "Partner, Training Principal",
    firm: "Harbottle & Lewis LLP",
    connection:
      "you are working as Training Principal at Harbottle & Lewis LLP, and are responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: [],
  },
  {
    name: "Georgina",
    surname: "Long",
    email: "Georgina.Long@harbottle.com",
    linkedin: "",
    comment: "Trainee Supervisor",
    firm: "Harbottle & Lewis LLP",
    connection:
      "you are working as Trainee Supervisor at Harbottle & Lewis LLP, and must be involved in the educational and training aspects for trainees.",
    sentEmailsTime: [],
  },
  {
    name: "Helen",
    surname: "Loughlin",
    email: "Helen.Loughlin@harbottle.com",
    linkedin:
      "https://www.linkedin.com/in/helen-loughlin-9a666a116/?originalSubdomain=uk",
    comment: "Director of Human Resources",
    firm: "Harbottle & Lewis LLP",
    connection:
      "you are working as Director of Human Resources at Harbottle & Lewis LLP, and are likely involved in the educational and training initiatives for the firm's staff.",
    sentEmailsTime: [],
  },
  {
    name: "Carolyn",
    surname: "Morgan",
    email: "carolyn.morgan@hilldickinson.com",
    linkedin:
      "https://www.linkedin.com/in/carolyn-morgan-255b9210/?originalSubdomain=uk",
    comment: "Director of Human Resources",
    firm: "Hill Dickinson LLP",
    connection:
      "you are responsible for the firm’s human resource management, talent, development, and engagement activity. your role focuses on developing and implementing the firm’s HR and people strategy.",
    sentEmailsTime: [],
  },
  {
    name: "Angela",
    surname: "Moore",
    email: "angela.moore@hilldickinson.com",
    linkedin:
      "https://www.linkedin.com/in/angela-moore-8bb27b58/?originalSubdomain=uk",
    comment: "Head of HR & Development",
    firm: "Hill Dickinson LLP",
    connection:
      "you are the Head of HR & Development at Hill Dickinson LLP, focusing on human resources in the professional services sector.",
    sentEmailsTime: [],
  },
  {
    name: "David",
    surname: "Smith",
    email: "david.smith@hilldickinson.com",
    linkedin:
      "https://www.linkedin.com/in/david-smith-4b84514/?originalSubdomain=uk",
    comment: "Head of Information Services",
    firm: "Hill Dickinson LLP",
    connection:
      "you specialize in legal information resources, knowledge management, and records management at Hill Dickinson LLP.",
    sentEmailsTime: [],
  },
  {
    name: "Richard",
    surname: "Capper",
    email: "richard.capper@hilldickinson.com",
    linkedin: "",
    comment: "Training Principal",
    firm: "Hill Dickinson LLP",
    connection:
      "you are working as Training Principal at Hill Dickinson LLP, specializing in banking transactions. you are responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: [],
  },
  {
    name: "Rebecca",
    surname: "Briam",
    email: "rebecca.briam@hilldickinson.com",
    linkedin: "",
    comment: "Professional Support Lawyer",
    firm: "Hill Dickinson LLP",
    connection:
      "you are a professional support lawyer at Hill Dickinson LLP, responsible for developing and maintaining precedents for the corporate team and delivering training sessions.",
    sentEmailsTime: [],
  },
  {
    name: "Siiri",
    surname: "Duddington",
    email: "siiri.duddington@hilldickinson.com",
    linkedin: "https://www.linkedin.com/in/siiri-duddington-711941b7/",
    comment: "Deputy Head of London (City) Office (Partner)",
    firm: "Hill Dickinson LLP",
    connection:
      "you are a partner in the Shipping team based in the London office of Hill Dickinson LLP.",
    sentEmailsTime: [],
  },
  {
    name: "Luke",
    surname: "Green",
    email: "luke.green@hilldickinson.com",
    linkedin: "",
    comment: "Head of Schools",
    firm: "Hill Dickinson LLP",
    connection:
      "you are the national head of schools within Hill Dickinson LLP, focusing on employment and education work, particularly in the schools sector.",
    sentEmailsTime: [],
  },
  {
    name: "Alex",
    surname: "Knight",
    email: "alex.knight@hilldickinson.com",
    linkedin: "https://www.linkedin.com/in/alex-knight-a41812154/",
    comment: "Talent and Development Manager",
    firm: "Hill Dickinson LLP",
    connection:
      "you are a talent and development manager based in the Liverpool office within the talent and development team at Hill Dickinson LLP.",
    sentEmailsTime: [],
  },
  {
    name: "Tas",
    surname: "Quayum",
    email: "Tas.quayum@hilldickinson.com",
    linkedin: "https://www.linkedin.com/in/tas-quayum-0a711948/",
    comment: "COO",
    firm: "Hill Dickinson LLP",
    connection:
      "you are the Chief Operating Officer for Hill Dickinson LLP, responsible for the day-to-day running of the firm and focused on driving profitable growth.",
    sentEmailsTime: [],
  },
  {
    name: "Emma",
    surname: "Rush",
    email: "emma.rush@irwinmitchell.com",
    linkedin:
      "https://www.linkedin.com/in/emma-rush-0a516222/?originalSubdomain=uk",
    comment: "Partner and Training Principal",
    firm: "Irwin Mitchell LLP",
    connection:
      "you are working as Training Principal at Irwin Mitchell LLP, specializing in medical law and patients' rights, particularly in birth injury cases.",
    sentEmailsTime: [],
  },
  {
    name: "John",
    surname: "Shemeld",
    email: "john.shemeld@irwinmitchell.com",
    linkedin:
      "https://www.linkedin.com/in/john-shemeld-5b75a732/?originalSubdomain=uk",
    comment: "Organisational Development Specialist",
    firm: "Irwin Mitchell LLP",
    connection:
      "you are an Organisational Development Specialist at Irwin Mitchell, focusing on the delivery of learning solutions in various formats such as podcasts, videos, and e-learning.",
    sentEmailsTime: [],
  },
  {
    name: "Eleanor",
    surname: "Windsor",
    email: "eleanor.windsor@irwinmitchell.com",
    linkedin:
      "https://www.linkedin.com/in/eleanorwindsor/?originalSubdomain=uk",
    comment: "Partner, Director of Knowledge Management",
    firm: "Irwin Mitchell LLP",
    connection:
      "you are the Partner and Director of Knowledge Management at Irwin Mitchell LLP, responsible for overseeing the firm's knowledge resources.",
    sentEmailsTime: [],
  },
  {
    name: "Kaitlyn",
    surname: "O’Neal",
    email: "kaitlyn.oneal@irwinmitchell.com",
    linkedin: "",
    comment: "Knowledge Management Specialist",
    firm: "Irwin Mitchell LLP",
    connection:
      "you are a Knowledge Management Specialist at Irwin Mitchell LLP, with experience in intranet management, knowledge sharing, and legal technical training.",
    sentEmailsTime: [],
  },
  {
    name: "Susana",
    surname: "Berlevy",
    email: "susana.berlevy@irwinmitchell.com",
    linkedin: "",
    comment: "Group Chief People Officer",
    firm: "Irwin Mitchell LLP",
    connection:
      "As Group Chief People Officer at Irwin Mitchell LLP, you are responsible for developing the people strategy to support the firm's continued growth and transformation.",
    sentEmailsTime: [],
  },
  {
    name: "Linda",
    surname: "Woolley",
    email: "lwoolley@kingsleynapley.co.uk",
    linkedin: "https://www.linkedin.com/in/linda-woolley/?originalSubdomain=uk",
    comment: "Managing Partner",
    firm: "Kingsley Napley",
    connection:
      "you are the Managing Partner at Kingsley Napley, responsible for overseeing the overall management and strategic direction of the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Jemimah",
    surname: "Cook",
    email: "jcook@kingsleynapley.co.uk",
    linkedin: "https://www.linkedin.com/in/jemimah-cook-44518615/",
    comment: "HR Director",
    firm: "Kingsley Napley",
    connection:
      "you are the HR Director at Kingsley Napley, responsible for human resources and talent management within the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Shannett",
    surname: "Thompson",
    email: "sthompson@kingsleynapley.co.uk",
    linkedin: "",
    comment: "Partner and Training Principal",
    firm: "Kingsley Napley",
    connection:
      "you are working as Training Principal at Kingsley Napley, with overall responsibility for the trainees and their educational programs.",
    sentEmailsTime: [],
  },
  {
    name: "Claire",
    surname: "Fox",
    email: "cfox@kingsleynapley.co.uk",
    linkedin: "",
    comment: "Head of Knowledge & Information Services",
    firm: "Kingsley Napley",
    connection:
      "you are the Head of Knowledge & Information Services at Kingsley Napley, managing and developing the firm's research resources and other information services such as training and knowledge sharing.",
    sentEmailsTime: [],
  },
  {
    name: "Colette",
    surname: "Stevens",
    email: "colette.stevens@michelmores.com",
    linkedin: "https://uk.linkedin.com/in/colettestevens",
    comment: "HR Director",
    firm: "Michelmores",
    connection:
      "you are the HR Director at Michelmores, responsible for the overall design and implementation of the firm's people strategy, including talent development.",
    sentEmailsTime: [],
  },
  {
    name: "Melanie",
    surname: "Palethorpe",
    email: "melanie.palethorpe@michelmores.com",
    linkedin: "",
    comment: "Learning & Talent Development Specialist",
    firm: "Michelmores",
    connection:
      "you are a Learning & Talent Development Specialist at Michelmores, focusing on the educational and training needs of the firm's employees.",
    sentEmailsTime: [],
  },
  {
    name: "Kim",
    surname: "Tomlinson",
    email: "Kim.Tomlinson@michelmores.com",
    linkedin: "https://www.linkedin.com/in/kimjtomlinson/",
    comment: "Deputy HR Director",
    firm: "Michelmores",
    connection:
      "you are the Deputy HR Director at Michelmores, responsible for shaping and implementing all aspects of the firm’s talent agenda, including Talent Development.",
    sentEmailsTime: [],
  },
  {
    name: "Alexandra",
    surname: "Watson",
    email: "alexandra.watson@michelmores.com",
    linkedin:
      "https://www.linkedin.com/in/alexandrawatson/?originalSubdomain=uk",
    comment: "Training Principal and Partner, Corporate",
    firm: "Michelmores",
    connection:
      "you are working as Training Principal at Michelmores, responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: [],
  },
  {
    name: "Helen",
    surname: "Watson",
    email: "helen.watson@michelmores.com",
    linkedin: "https://www.linkedin.com/in/helen-w-5a8a4645/",
    comment: "Knowledge & Information Manager",
    firm: "Michelmores",
    connection:
      "you are the Knowledge & Information Manager at Michelmores, responsible for managing the firm's knowledge resources and information services.",
    sentEmailsTime: [],
  },
  {
    name: "Georgie",
    surname: "Lewis",
    email: "georgie.Lewis@michelmores.com",
    linkedin: "https://www.linkedin.com/in/georgina-lewis-968a9812a/",
    comment: "Recruitment Business Partner",
    firm: "Michelmores",
    connection:
      "you are the Recruitment Business Partner at Michelmores, responsible for talent acquisition and recruitment activities within the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Patrick",
    surname: "Mccann",
    email: "patrick.mccann@linklaters.com",
    linkedin: "https://www.linkedin.com/in/patrick-mccann-066017207/",
    comment: "Director Learning",
    firm: "Linklaters",
    connection: "",
    sentEmailsTime: ["September 28"],
  },
  {
    name: "Sandy",
    surname: "Boyle",
    email: "Sandy.Boyle@mills-reeve.com",
    linkedin:
      "https://www.linkedin.com/in/sandy-boyle-3751725/?originalSubdomain=uk",
    comment: "Director of Human Resources",
    firm: "Mills & Reeve",
    connection:
      "You are working as Director of Human Resources at Mills & Reeve, overseeing personnel-related matters, potentially including the organization and implementation of educational and training programs for the staff.",
    sentEmailsTime: [],
  },
  {
    name: "Deborah",
    surname: "Swarts",
    email: "Deborah.Swarts@mills-reeve.com",
    linkedin:
      "https://www.linkedin.com/in/deborah-swarts-65134b21?originalSubdomain=uk",
    comment: "Head of Knowledge Management & Digital",
    firm: "",
    connection:
      "You are working as the Head of Knowledge Management & Digital, a role that possibly entails developing and overseeing digital educational resources and knowledge management systems to support the continuous learning and development of staff.",
    sentEmailsTime: [],
  },
  {
    name: "Annie",
    surname: "Wilton",
    email: "Annie.Wilton@mills-reeve.com",
    linkedin: "",
    comment: "L&D Manager",
    firm: "Mills & Reeve",
    connection:
      "You are working as L&D Manager at Mills & Reeve, where your primary responsibilities likely include designing, coordinating, and implementing educational and training programs to foster the development of the firm's personnel.",
    sentEmailsTime: [],
  },

  {
    name: "Katherine",
    surname: "Rathbone",
    email: "Katherine.Rathbone@charitytrustee.com",
    linkedin:
      "https://www.linkedin.com/in/katherine-rathbone-801951a/?originalSubdomain=uk",
    comment: "Head of HR / Charity Trustee",
    firm: "",
    connection:
      "You are working as Head of HR and a Charity Trustee, potentially overseeing HR policies and also engaging in charitable educational projects. Your role might involve aligning educational initiatives with organizational goals, ensuring staff and beneficiaries are well-informed and educated.",
    sentEmailsTime: [],
  },
  {
    name: "Niki",
    surname: "Lawson",
    email: "niki.lawson@addleshawgoddard.com",
    linkedin:
      "https://www.linkedin.com/in/niki-lawson-2274b134/?originalSubdomain=uk",
    comment: "Chief People Officer",
    firm: "Addleshaw Goddard",
    connection:
      "You are working as Chief People Officer at Addleshaw Goddard with a vast experience in talent development, employee engagement, and other HR realms, which necessitate a deep understanding and implementation of educational and training programs to foster talent growth and employee satisfaction.",
    sentEmailsTime: [],
  },
  {
    name: "Ian",
    surname: "Bradford",
    email: "Ian.Bradford@addleshawgoddard.com",
    linkedin: "",
    comment: "Learning & Development Manager",
    firm: "Addleshaw Goddard",
    connection:
      "You are working as Learning & Development Manager at Addleshaw Goddard, overseeing and creating educational and training programs to enhance the skills and knowledge of the firm's personnel, contributing to their professional growth.",
    sentEmailsTime: [],
  },
  {
    name: "Sophie Rose",
    surname: "Manson",
    email: "Sophie.Manson@addleshawgoddard.com",
    linkedin:
      "https://www.linkedin.com/in/sophie-rose-manson-chartered-fcipd-9a989a28/",
    comment: "Head of Learning and Development",
    firm: "",
    connection:
      "You are working as Head of Learning and Development with a history of building learning functions from the ground up. Your role is pivotal in aiding organizations to create robust educational frameworks that support the continuous professional growth of their personnel.",
    sentEmailsTime: [],
  },
  {
    name: "Elliot",
    surname: "White",
    email: "Elliot.White@addleshawgoddard.com",
    linkedin: "https://www.linkedin.com/in/elliotwhite/",
    comment: "Head of Innovation & Legal Tech Operations",
    firm: "Addleshaw Goddard",
    connection:
      "You are working as Head of Innovation & Legal Tech Operations at Addleshaw Goddard, mainly in the legal technology and SaaS space. Your role may involve the implementation of educational programs related to legal tech, helping the firm and its personnel to stay updated with the latest technological advancements.",
    sentEmailsTime: [],
  },

  {
    name: "Samantha",
    surname: "Lee",
    email: "sam.lee@wbd-uk.com",
    linkedin: "",
    comment: "Head Of Recruitment",
    firm: "WBD UK",
    connection:
      "You are working as Head Of Recruitment at WBD UK, overseeing the recruitment strategy, including early careers programmes, and ensuring best practices in the recruitment process. Your role involves supporting and training the next generation of hiring managers, aligning closely with educational and mentoring initiatives within the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Paul",
    surname: "Stewart",
    email: "paul.stewart@wbd-uk.com",
    linkedin: "",
    comment: "Managing Partner, UK",
    firm: "WBD UK",
    connection:
      "You are working as Managing Partner at WBD UK, overseeing the firm's operations and possibly engaging with educational initiatives to ensure continuous professional development and adherence to legal standards within the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Nick",
    surname: "Barwood",
    email: "nick.barwood@wbd-uk.com",
    linkedin: "",
    comment: "UK Chair, UK",
    firm: "WBD UK",
    connection:
      "You are working as UK Chair at WBD UK, likely involved in steering the firm's strategic directions, which may include educational and training programs to ensure the firm's personnel are well-equipped with the necessary knowledge and skills.",
    sentEmailsTime: [],
  },
  {
    name: "Krishna",
    surname: "Anand",
    email: "krishna.anand@wbd-uk.com",
    linkedin: "",
    comment: "Head of Learning and Development, UK",
    firm: "WBD UK",
    connection:
      "You are working as Head of Learning and Development at WBD UK, playing a crucial role in creating and implementing educational and training programs to foster continuous professional growth within the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Paul",
    surname: "Harvey",
    email: "paul.harvey@wbd-uk.com",
    linkedin: "",
    comment: "Head of Knowledge and Legal Training, UK",
    firm: "WBD UK",
    connection:
      "You are working as Head of Knowledge and Legal Training at WBD UK, overseeing the educational and training programs that ensure the firm's personnel are updated with the latest legal knowledge and best practices.",
    sentEmailsTime: [],
  },
  {
    name: "Helen",
    surname: "Marr",
    email: "helen.marr@wbd-uk.com",
    linkedin: "",
    comment: "Early Talent Development Manager, UK",
    firm: "WBD UK",
    connection:
      "You are working as Early Talent Development Manager at WBD UK, focusing on the educational and developmental programs aimed at nurturing the talents of early-career professionals within the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Charlotte",
    surname: "Hall",
    email: "charlotte.hall@wbd-uk.com",
    linkedin: "",
    comment: "Senior Recruitment Advisor, UK",
    firm: "WBD UK",
    connection:
      "You are working as Senior Recruitment Advisor at WBD UK, being part of the recruitment process which may involve educational initiatives to assess and enhance the knowledge and skills of potential recruits and existing personnel.",
    sentEmailsTime: [],
  },

  {
    name: "Natalie",
    surname: "King",
    email: "nking@wedlakebell.com",
    linkedin:
      "https://www.linkedin.com/in/natalie-king-85203b12?originalSubdomain=uk",
    comment: "Head of HR at Wedlake Bell",
    firm: "Wedlake Bell",
    connection:
      "You are working as Head of HR at Wedlake Bell, overseeing the human resources department, which likely involves coordinating educational and training programs to ensure the professional development of the firm's personnel.",
    sentEmailsTime: [],
  },
  {
    name: "Prudence",
    surname: "H.",
    email: "ph@wedlakebell.com",
    linkedin: "https://www.linkedin.com/in/prudence-h-644380139/",
    comment: "Learning and Development Manager",
    firm: "Unknown Firm",
    connection:
      "You are working as Learning and Development Manager, focusing on creating and implementing educational programs to enhance the skills and knowledge of the employees within your organization. Your expertise in education and training is essential for fostering a culture of continuous learning and development.",
    sentEmailsTime: [],
  },
  {
    name: "Martin",
    surname: "Arnold",
    email: "marnold@wedlakebell.com",
    linkedin: "https://www.linkedin.com/in/martin-arnold-0b80308/",
    comment: "Managing Partner",
    firm: "Wedlake Bell",
    connection:
      "You are working as Managing Partner at Wedlake Bell, overseeing the firm's operations and possibly engaging with educational initiatives to ensure continuous professional development and adherence to legal standards within the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Lynsey",
    surname: "McIntyre",
    email: "lynseymcintyre@bdbpitmans.com",
    linkedin: "https://www.linkedin.com/in/lynseymcintyre/",
    comment: "Professional Support Lawyer",
    firm: "BDB Pitmans",
    connection:
      "You are working as a Professional Support Lawyer at BDB Pitmans, where you might be involved in the creation and maintenance of educational resources or training programs for the firm’s lawyers.",
    sentEmailsTime: [],
  },
  {
    name: "Danielle",
    surname: "Hughes",
    email: "daniellehughes@bdbpitmans.com",
    linkedin: "https://www.linkedin.com/in/danielle-hughes-ba4b1416b/",
    comment: "Graduate Recruitment and Development",
    firm: "BDB Pitmans",
    connection:
      "You are working as a Graduate Recruitment and Development Manager at BDB Pitmans, where you might be involved in the creation and maintenance of educational resources or training programs for the firm’s lawyers.",
    sentEmailsTime: [],
  },
  {
    name: "Andrew",
    surname: "Smith",
    email: "andrewsmith@bdbpitmans.com",
    linkedin: "https://www.linkedin.com/in/andrew-smith-355b1512/",
    comment: "Managing Partner",
    firm: "BDB Pitmans",
    connection:
      "You are working as Managing Partner at BDB Pitmans, where you might oversee or engage with the firm's educational initiatives to ensure continuous professional development and adherence to legal standards within the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Sara",
    surname: "Hodges",
    email: "sarahodges@bdbpitmans.com",
    linkedin:
      "https://www.linkedin.com/in/sara-hodges-8a9747106/?originalSubdomain=uk",
    comment: "Knowledge Management",
    firm: "Unknown Firm",
    connection:
      "You are working in Knowledge Management, focusing on Intranets, KM systems, Content Management, and Information Management, which likely involves overseeing or contributing to educational and training initiatives to ensure optimal knowledge sharing and learning within your organization.",
    sentEmailsTime: [],
  },
  {
    name: "Jessica",
    surname: "Booker",
    email: "jessicabooker@bdbpitmans.com",
    linkedin:
      "https://www.linkedin.com/in/starpotentialuk/?originalSubdomain=uk",
    comment: "Talent Professional",
    firm: "Unknown Firm",
    connection:
      "You are working as a Talent Professional, covering recruitment, development, E&DI and CSR. Your role likely involves creating or overseeing educational and training programs to foster talent development within your organization.",
    sentEmailsTime: [],
  },
  {
    name: "Nicholas",
    surname: "Le Riche",
    email: "nicholasleriche@bdbpitmans.com",
    linkedin:
      "https://www.linkedin.com/in/nicholas-le-riche-5089053a/?originalSubdomain=uk",
    comment: "Partner, Training Principal",
    firm: "BDB Pitmans",
    connection:
      "You are working as Training Principal at BDB Pitmans, and are responsible for overseeing the educational and training programs for new associates and trainees.",
    sentEmailsTime: [],
  },
  {
    name: "Matthew",
    surname: "Cormack",
    email: "matthew.cormack@wardhadaway.com",
    linkedin:
      "https://www.linkedin.com/in/mattcormacklawyer/?originalSubdomain=uk",
    comment: "Partner, Training Principal",
    firm: "Ward Hadaway",
    connection:
      "You are working as Training Principal at Ward Hadaway, and are responsible for the recruitment and training of trainee solicitors in the firm.",
    sentEmailsTime: [],
  },
  {
    name: "Anna",
    surname: "Brown",
    email: "anna.brown@wardhadaway.com",
    linkedin:
      "https://www.linkedin.com/in/anna-brown-93037933/?originalSubdomain=uk",
    comment: "Director of People",
    firm: "Ward Hadaway",
    connection:
      "You are working as Director of People at Ward Hadaway, where your role likely involves overseeing or liaising with the educational and training departments to ensure the firm’s talent development aligns with its goals.",
    sentEmailsTime: [],
  },
  {
    name: "Martin",
    surname: "Hulls",
    email: "martin.hulls@wardhadaway.com",
    linkedin: "",
    comment: "Managing Partner",
    firm: "Ward Hadaway",
    connection:
      "You are working as Managing Partner at Ward Hadaway, where your focus on internal engagement likely involves ensuring effective educational and training programs to promote excellent client service and team cohesion.",
    sentEmailsTime: [],
  },
];

export default emailList;
