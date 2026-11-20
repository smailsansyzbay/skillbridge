(function(){
'use strict';
const departments=[
  {
    "id": "marketing",
    "icon": "chart",
    "title": {
      "ru": "Маркетинг",
      "kz": "Маркетинг",
      "en": "Marketing"
    },
    "description": {
      "ru": "Контент, аудитория и коммуникации",
      "kz": "Контент, аудитория және коммуникациялар",
      "en": "Content, audiences and communications"
    }
  },
  {
    "id": "finance",
    "icon": "table",
    "title": {
      "ru": "Финансы и экономика",
      "kz": "Қаржы және экономика",
      "en": "Finance and economics"
    },
    "description": {
      "ru": "Расчёты, модели и понятные таблицы",
      "kz": "Есептеулер, модельдер және түсінікті кестелер",
      "en": "Calculations, models and clear spreadsheets"
    }
  },
  {
    "id": "it",
    "icon": "layers",
    "title": {
      "ru": "IT и программирование",
      "kz": "IT және бағдарламалау",
      "en": "IT and programming"
    },
    "description": {
      "ru": "Сайты, боты и автоматизация",
      "kz": "Сайттар, боттар және автоматтандыру",
      "en": "Websites, bots and automation"
    }
  },
  {
    "id": "management",
    "icon": "briefcase",
    "title": {
      "ru": "Менеджмент и бизнес-администрирование",
      "kz": "Менеджмент және бизнес әкімшілігі",
      "en": "Management and business administration"
    },
    "description": {
      "ru": "Процессы, планы и исследования",
      "kz": "Процестер, жоспарлар және зерттеулер",
      "en": "Processes, plans and research"
    }
  },
  {
    "id": "design",
    "icon": "spark",
    "title": {
      "ru": "Дизайн",
      "kz": "Дизайн",
      "en": "Design"
    },
    "description": {
      "ru": "Визуальный стиль и материалы бренда",
      "kz": "Визуалды стиль және бренд материалдары",
      "en": "Visual identity and branded materials"
    }
  },
  {
    "id": "hr",
    "icon": "users",
    "title": {
      "ru": "HR и психология",
      "kz": "HR және психология",
      "en": "HR and psychology"
    },
    "description": {
      "ru": "Подбор, адаптация и обратная связь",
      "kz": "Іріктеу, бейімдеу және кері байланыс",
      "en": "Recruitment, onboarding and feedback"
    }
  },
  {
    "id": "writing",
    "icon": "book",
    "title": {
      "ru": "Филология, переводы и журналистика",
      "kz": "Филология, аударма және журналистика",
      "en": "Writing, translation and journalism"
    },
    "description": {
      "ru": "Тексты, переводы и редактура",
      "kz": "Мәтіндер, аударма және редактура",
      "en": "Copy, translation and editing"
    }
  }
];
const additions=[
  {
    "id": "content-plan",
    "department": "marketing",
    "skillGroup": "marketing",
    "icon": "chart",
    "title": {
      "ru": "Контент-план для Instagram и TikTok",
      "kz": "Instagram және TikTok контент-жоспары",
      "en": "Instagram and TikTok content plan"
    },
    "subtitle": {
      "ru": "План публикаций на месяц с рубриками, темами и форматами.",
      "kz": "Айдарлар, тақырыптар мен форматтары бар бір айлық жоспар.",
      "en": "A month of post ideas, content themes and formats."
    },
    "detail": {
      "ru": "План публикаций на месяц с рубриками, темами и форматами.",
      "kz": "Айдарлар, тақырыптар мен форматтары бар бір айлық жоспар.",
      "en": "A month of post ideas, content themes and formats."
    },
    "deliverable": {
      "ru": "План публикаций на месяц с рубриками, темами и форматами.",
      "kz": "Айдарлар, тақырыптар мен форматтары бар бір айлық жоспар.",
      "en": "A month of post ideas, content themes and formats."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "План публикаций на месяц с рубриками, темами и форматами."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Айдарлар, тақырыптар мен форматтары бар бір айлық жоспар."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A month of post ideas, content themes and formats."
      ]
    },
    "price": 20000,
    "category": "marketing"
  },
  {
    "id": "audience-analysis",
    "department": "marketing",
    "skillGroup": "marketing",
    "icon": "chart",
    "title": {
      "ru": "Анализ конкурентов и целевой аудитории",
      "kz": "Бәсекелестер мен мақсатты аудиторияны талдау",
      "en": "Competitor and audience analysis"
    },
    "subtitle": {
      "ru": "Сравнение пяти конкурентов и портреты ключевых сегментов аудитории.",
      "kz": "Бес бәсекелесті салыстыру және аудитория сегменттерінің сипаттамасы.",
      "en": "A five-competitor comparison and profiles of key audience segments."
    },
    "detail": {
      "ru": "Сравнение пяти конкурентов и портреты ключевых сегментов аудитории.",
      "kz": "Бес бәсекелесті салыстыру және аудитория сегменттерінің сипаттамасы.",
      "en": "A five-competitor comparison and profiles of key audience segments."
    },
    "deliverable": {
      "ru": "Сравнение пяти конкурентов и портреты ключевых сегментов аудитории.",
      "kz": "Бес бәсекелесті салыстыру және аудитория сегменттерінің сипаттамасы.",
      "en": "A five-competitor comparison and profiles of key audience segments."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Сравнение пяти конкурентов и портреты ключевых сегментов аудитории."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Бес бәсекелесті салыстыру және аудитория сегменттерінің сипаттамасы."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A five-competitor comparison and profiles of key audience segments."
      ]
    },
    "price": 20000,
    "category": "marketing"
  },
  {
    "id": "reels-copy",
    "department": "marketing",
    "skillGroup": "marketing",
    "icon": "chart",
    "title": {
      "ru": "Сценарии Reels и рекламные тексты",
      "kz": "Reels сценарийлері мен жарнамалық мәтіндер",
      "en": "Reels scripts and ad copy"
    },
    "subtitle": {
      "ru": "Пять сценариев коротких видео и варианты рекламных текстов.",
      "kz": "Бес қысқа бейне сценарийі және жарнамалық мәтін нұсқалары.",
      "en": "Five short-video scripts and supporting ad copy variations."
    },
    "detail": {
      "ru": "Пять сценариев коротких видео и варианты рекламных текстов.",
      "kz": "Бес қысқа бейне сценарийі және жарнамалық мәтін нұсқалары.",
      "en": "Five short-video scripts and supporting ad copy variations."
    },
    "deliverable": {
      "ru": "Пять сценариев коротких видео и варианты рекламных текстов.",
      "kz": "Бес қысқа бейне сценарийі және жарнамалық мәтін нұсқалары.",
      "en": "Five short-video scripts and supporting ad copy variations."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Пять сценариев коротких видео и варианты рекламных текстов."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Бес қысқа бейне сценарийі және жарнамалық мәтін нұсқалары."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "Five short-video scripts and supporting ad copy variations."
      ]
    },
    "price": 20000,
    "category": "marketing"
  },
  {
    "id": "campaigns",
    "department": "marketing",
    "skillGroup": "marketing",
    "icon": "chart",
    "title": {
      "ru": "Email- и Telegram-рассылки",
      "kz": "Email және Telegram хабарламалары",
      "en": "Email and Telegram campaigns"
    },
    "subtitle": {
      "ru": "Серия из трёх сообщений с темами, структурой и призывами к действию.",
      "kz": "Тақырыптары, құрылымы және әрекетке шақыруы бар үш хабарлама.",
      "en": "A three-message sequence with subject lines, structure and calls to action."
    },
    "detail": {
      "ru": "Серия из трёх сообщений с темами, структурой и призывами к действию.",
      "kz": "Тақырыптары, құрылымы және әрекетке шақыруы бар үш хабарлама.",
      "en": "A three-message sequence with subject lines, structure and calls to action."
    },
    "deliverable": {
      "ru": "Серия из трёх сообщений с темами, структурой и призывами к действию.",
      "kz": "Тақырыптары, құрылымы және әрекетке шақыруы бар үш хабарлама.",
      "en": "A three-message sequence with subject lines, structure and calls to action."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Серия из трёх сообщений с темами, структурой и призывами к действию."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Тақырыптары, құрылымы және әрекетке шақыруы бар үш хабарлама."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A three-message sequence with subject lines, structure and calls to action."
      ]
    },
    "price": 20000,
    "category": "marketing"
  },
  {
    "id": "cost-pricing",
    "department": "finance",
    "skillGroup": "finance",
    "icon": "table",
    "title": {
      "ru": "Расчёт себестоимости и цен",
      "kz": "Өзіндік құн мен бағаны есептеу",
      "en": "Cost and pricing calculation"
    },
    "subtitle": {
      "ru": "Таблица затрат, себестоимости и ценовых сценариев с формулами.",
      "kz": "Формулалары бар шығындар, өзіндік құн және баға сценарийлері кестесі.",
      "en": "A formula-based breakdown of costs, unit economics and pricing scenarios."
    },
    "detail": {
      "ru": "Таблица затрат, себестоимости и ценовых сценариев с формулами.",
      "kz": "Формулалары бар шығындар, өзіндік құн және баға сценарийлері кестесі.",
      "en": "A formula-based breakdown of costs, unit economics and pricing scenarios."
    },
    "deliverable": {
      "ru": "Таблица затрат, себестоимости и ценовых сценариев с формулами.",
      "kz": "Формулалары бар шығындар, өзіндік құн және баға сценарийлері кестесі.",
      "en": "A formula-based breakdown of costs, unit economics and pricing scenarios."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Таблица затрат, себестоимости и ценовых сценариев с формулами."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Формулалары бар шығындар, өзіндік құн және баға сценарийлері кестесі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A formula-based breakdown of costs, unit economics and pricing scenarios."
      ]
    },
    "price": 20000,
    "category": "finance"
  },
  {
    "id": "financial-model",
    "department": "finance",
    "skillGroup": "finance",
    "icon": "table",
    "title": {
      "ru": "Финансовая модель на год",
      "kz": "Бір жылдық қаржы моделі",
      "en": "Annual financial model"
    },
    "subtitle": {
      "ru": "Помесячный прогноз на 12 месяцев с допущениями и сценариями.",
      "kz": "Болжамдар мен сценарийлері бар 12 айлық қаржы жоспары.",
      "en": "A 12-month forecast with assumptions and alternative scenarios."
    },
    "detail": {
      "ru": "Помесячный прогноз на 12 месяцев с допущениями и сценариями.",
      "kz": "Болжамдар мен сценарийлері бар 12 айлық қаржы жоспары.",
      "en": "A 12-month forecast with assumptions and alternative scenarios."
    },
    "deliverable": {
      "ru": "Помесячный прогноз на 12 месяцев с допущениями и сценариями.",
      "kz": "Болжамдар мен сценарийлері бар 12 айлық қаржы жоспары.",
      "en": "A 12-month forecast with assumptions and alternative scenarios."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Помесячный прогноз на 12 месяцев с допущениями и сценариями."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Болжамдар мен сценарийлері бар 12 айлық қаржы жоспары."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A 12-month forecast with assumptions and alternative scenarios."
      ]
    },
    "price": 20000,
    "category": "finance"
  },
  {
    "id": "sales-analysis",
    "department": "finance",
    "skillGroup": "finance",
    "icon": "table",
    "title": {
      "ru": "Анализ продаж и расходов в Excel",
      "kz": "Excel-де сату мен шығындарды талдау",
      "en": "Excel sales and expense analysis"
    },
    "subtitle": {
      "ru": "Сводные таблицы, диаграммы и выводы по предоставленным данным.",
      "kz": "Берілген деректер бойынша жиынтық кестелер, диаграммалар және қорытынды.",
      "en": "Pivot tables, charts and findings based on the supplied dataset."
    },
    "detail": {
      "ru": "Сводные таблицы, диаграммы и выводы по предоставленным данным.",
      "kz": "Берілген деректер бойынша жиынтық кестелер, диаграммалар және қорытынды.",
      "en": "Pivot tables, charts and findings based on the supplied dataset."
    },
    "deliverable": {
      "ru": "Сводные таблицы, диаграммы и выводы по предоставленным данным.",
      "kz": "Берілген деректер бойынша жиынтық кестелер, диаграммалар және қорытынды.",
      "en": "Pivot tables, charts and findings based on the supplied dataset."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Сводные таблицы, диаграммы и выводы по предоставленным данным."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Берілген деректер бойынша жиынтық кестелер, диаграммалар және қорытынды."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "Pivot tables, charts and findings based on the supplied dataset."
      ]
    },
    "price": 20000,
    "category": "finance"
  },
  {
    "id": "break-even",
    "department": "finance",
    "skillGroup": "finance",
    "icon": "table",
    "title": {
      "ru": "Расчёт точки безубыточности",
      "kz": "Залалсыздық нүктесін есептеу",
      "en": "Break-even calculation"
    },
    "subtitle": {
      "ru": "Модель постоянных и переменных затрат с точкой безубыточности.",
      "kz": "Тұрақты және айнымалы шығындар мен залалсыздық нүктесі моделі.",
      "en": "A fixed and variable cost model showing the break-even point."
    },
    "detail": {
      "ru": "Модель постоянных и переменных затрат с точкой безубыточности.",
      "kz": "Тұрақты және айнымалы шығындар мен залалсыздық нүктесі моделі.",
      "en": "A fixed and variable cost model showing the break-even point."
    },
    "deliverable": {
      "ru": "Модель постоянных и переменных затрат с точкой безубыточности.",
      "kz": "Тұрақты және айнымалы шығындар мен залалсыздық нүктесі моделі.",
      "en": "A fixed and variable cost model showing the break-even point."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Модель постоянных и переменных затрат с точкой безубыточности."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Тұрақты және айнымалы шығындар мен залалсыздық нүктесі моделі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A fixed and variable cost model showing the break-even point."
      ]
    },
    "price": 20000,
    "category": "finance"
  },
  {
    "id": "landing-page",
    "department": "it",
    "skillGroup": "it",
    "icon": "layers",
    "title": {
      "ru": "Лендинг на Tilda или простой сайт",
      "kz": "Tilda лендингі немесе қарапайым сайт",
      "en": "Tilda landing page or simple website"
    },
    "subtitle": {
      "ru": "Одна адаптивная страница по брифу и инструкция по публикации.",
      "kz": "Бриф бойынша бір бейімделетін бет және жариялау нұсқаулығы.",
      "en": "One responsive page based on the brief, with publishing instructions."
    },
    "detail": {
      "ru": "Одна адаптивная страница по брифу и инструкция по публикации.",
      "kz": "Бриф бойынша бір бейімделетін бет және жариялау нұсқаулығы.",
      "en": "One responsive page based on the brief, with publishing instructions."
    },
    "deliverable": {
      "ru": "Одна адаптивная страница по брифу и инструкция по публикации.",
      "kz": "Бриф бойынша бір бейімделетін бет және жариялау нұсқаулығы.",
      "en": "One responsive page based on the brief, with publishing instructions."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Одна адаптивная страница по брифу и инструкция по публикации."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Бриф бойынша бір бейімделетін бет және жариялау нұсқаулығы."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "One responsive page based on the brief, with publishing instructions."
      ]
    },
    "price": 20000,
    "category": "it"
  },
  {
    "id": "telegram-bot",
    "department": "it",
    "skillGroup": "it",
    "icon": "layers",
    "title": {
      "ru": "Telegram-бот для заявок или FAQ",
      "kz": "Өтінімдерге немесе FAQ-ға арналған Telegram-бот",
      "en": "Telegram bot for enquiries or FAQs"
    },
    "subtitle": {
      "ru": "Прототип бота с согласованными командами и инструкцией запуска.",
      "kz": "Келісілген командалары мен іске қосу нұсқаулығы бар бот прототипі.",
      "en": "A bot prototype with agreed commands and setup instructions."
    },
    "detail": {
      "ru": "Прототип бота с согласованными командами и инструкцией запуска.",
      "kz": "Келісілген командалары мен іске қосу нұсқаулығы бар бот прототипі.",
      "en": "A bot prototype with agreed commands and setup instructions."
    },
    "deliverable": {
      "ru": "Прототип бота с согласованными командами и инструкцией запуска.",
      "kz": "Келісілген командалары мен іске қосу нұсқаулығы бар бот прототипі.",
      "en": "A bot prototype with agreed commands and setup instructions."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Прототип бота с согласованными командами и инструкцией запуска."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Келісілген командалары мен іске қосу нұсқаулығы бар бот прототипі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A bot prototype with agreed commands and setup instructions."
      ]
    },
    "price": 20000,
    "category": "it"
  },
  {
    "id": "automation",
    "department": "it",
    "skillGroup": "it",
    "icon": "layers",
    "title": {
      "ru": "Автоматизация таблиц и форм",
      "kz": "Кестелер мен формаларды автоматтандыру",
      "en": "Spreadsheet and form automation"
    },
    "subtitle": {
      "ru": "Один согласованный сценарий автоматизации с тестовыми примерами.",
      "kz": "Тест мысалдары бар бір келісілген автоматтандыру сценарийі.",
      "en": "One agreed automation workflow with example test cases."
    },
    "detail": {
      "ru": "Один согласованный сценарий автоматизации с тестовыми примерами.",
      "kz": "Тест мысалдары бар бір келісілген автоматтандыру сценарийі.",
      "en": "One agreed automation workflow with example test cases."
    },
    "deliverable": {
      "ru": "Один согласованный сценарий автоматизации с тестовыми примерами.",
      "kz": "Тест мысалдары бар бір келісілген автоматтандыру сценарийі.",
      "en": "One agreed automation workflow with example test cases."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Один согласованный сценарий автоматизации с тестовыми примерами."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Тест мысалдары бар бір келісілген автоматтандыру сценарийі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "One agreed automation workflow with example test cases."
      ]
    },
    "price": 20000,
    "category": "it"
  },
  {
    "id": "qa-report",
    "department": "it",
    "skillGroup": "it",
    "icon": "layers",
    "title": {
      "ru": "Тестирование сайта или приложения",
      "kz": "Сайтты немесе қолданбаны тестілеу",
      "en": "Website or app testing"
    },
    "subtitle": {
      "ru": "Отчёт об ошибках с шагами воспроизведения и приоритетами.",
      "kz": "Қайталау қадамдары мен басымдықтары бар қателер есебі.",
      "en": "A bug report with reproduction steps, evidence and priorities."
    },
    "detail": {
      "ru": "Отчёт об ошибках с шагами воспроизведения и приоритетами.",
      "kz": "Қайталау қадамдары мен басымдықтары бар қателер есебі.",
      "en": "A bug report with reproduction steps, evidence and priorities."
    },
    "deliverable": {
      "ru": "Отчёт об ошибках с шагами воспроизведения и приоритетами.",
      "kz": "Қайталау қадамдары мен басымдықтары бар қателер есебі.",
      "en": "A bug report with reproduction steps, evidence and priorities."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Отчёт об ошибках с шагами воспроизведения и приоритетами."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Қайталау қадамдары мен басымдықтары бар қателер есебі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A bug report with reproduction steps, evidence and priorities."
      ]
    },
    "price": 20000,
    "category": "it"
  },
  {
    "id": "business-plan",
    "department": "management",
    "skillGroup": "management",
    "icon": "briefcase",
    "title": {
      "ru": "Бизнес-план небольшого проекта",
      "kz": "Шағын жобаға бизнес-жоспар",
      "en": "Small-project business plan"
    },
    "subtitle": {
      "ru": "Структурированный план с рынком, ресурсами, рисками и этапами.",
      "kz": "Нарық, ресурстар, тәуекелдер мен кезеңдері бар құрылымды жоспар.",
      "en": "A structured plan covering the market, resources, risks and milestones."
    },
    "detail": {
      "ru": "Структурированный план с рынком, ресурсами, рисками и этапами.",
      "kz": "Нарық, ресурстар, тәуекелдер мен кезеңдері бар құрылымды жоспар.",
      "en": "A structured plan covering the market, resources, risks and milestones."
    },
    "deliverable": {
      "ru": "Структурированный план с рынком, ресурсами, рисками и этапами.",
      "kz": "Нарық, ресурстар, тәуекелдер мен кезеңдері бар құрылымды жоспар.",
      "en": "A structured plan covering the market, resources, risks and milestones."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Структурированный план с рынком, ресурсами, рисками и этапами."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Нарық, ресурстар, тәуекелдер мен кезеңдері бар құрылымды жоспар."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A structured plan covering the market, resources, risks and milestones."
      ]
    },
    "price": 20000,
    "category": "management"
  },
  {
    "id": "processes",
    "department": "management",
    "skillGroup": "management",
    "icon": "briefcase",
    "title": {
      "ru": "Бизнес-процессы и должностные инструкции",
      "kz": "Бизнес-процестер мен лауазымдық нұсқаулықтар",
      "en": "Business processes and role descriptions"
    },
    "subtitle": {
      "ru": "Описание одного процесса и двух ролей с зонами ответственности.",
      "kz": "Бір процесс пен екі рөлдің міндеттері көрсетілген сипаттама.",
      "en": "One documented process and two roles with clear responsibilities."
    },
    "detail": {
      "ru": "Описание одного процесса и двух ролей с зонами ответственности.",
      "kz": "Бір процесс пен екі рөлдің міндеттері көрсетілген сипаттама.",
      "en": "One documented process and two roles with clear responsibilities."
    },
    "deliverable": {
      "ru": "Описание одного процесса и двух ролей с зонами ответственности.",
      "kz": "Бір процесс пен екі рөлдің міндеттері көрсетілген сипаттама.",
      "en": "One documented process and two roles with clear responsibilities."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Описание одного процесса и двух ролей с зонами ответственности."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Бір процесс пен екі рөлдің міндеттері көрсетілген сипаттама."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "One documented process and two roles with clear responsibilities."
      ]
    },
    "price": 20000,
    "category": "management"
  },
  {
    "id": "market-survey",
    "department": "management",
    "skillGroup": "management",
    "icon": "briefcase",
    "title": {
      "ru": "Исследование рынка и опрос клиентов",
      "kz": "Нарықты зерттеу және клиенттер сауалнамасы",
      "en": "Market research and customer survey"
    },
    "subtitle": {
      "ru": "План исследования, анкета и шаблон анализа ответов.",
      "kz": "Зерттеу жоспары, сауалнама және жауаптарды талдау үлгісі.",
      "en": "A research plan, questionnaire and response-analysis template."
    },
    "detail": {
      "ru": "План исследования, анкета и шаблон анализа ответов.",
      "kz": "Зерттеу жоспары, сауалнама және жауаптарды талдау үлгісі.",
      "en": "A research plan, questionnaire and response-analysis template."
    },
    "deliverable": {
      "ru": "План исследования, анкета и шаблон анализа ответов.",
      "kz": "Зерттеу жоспары, сауалнама және жауаптарды талдау үлгісі.",
      "en": "A research plan, questionnaire and response-analysis template."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "План исследования, анкета и шаблон анализа ответов."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Зерттеу жоспары, сауалнама және жауаптарды талдау үлгісі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A research plan, questionnaire and response-analysis template."
      ]
    },
    "price": 20000,
    "category": "management"
  },
  {
    "id": "suppliers",
    "department": "management",
    "skillGroup": "management",
    "icon": "briefcase",
    "title": {
      "ru": "Подбор и сравнение поставщиков",
      "kz": "Жеткізушілерді таңдау және салыстыру",
      "en": "Supplier comparison"
    },
    "subtitle": {
      "ru": "Сравнение пяти поставщиков по согласованным критериям со ссылками.",
      "kz": "Сілтемелермен бес жеткізушіні келісілген өлшемдер бойынша салыстыру.",
      "en": "A sourced comparison of five suppliers using agreed criteria."
    },
    "detail": {
      "ru": "Сравнение пяти поставщиков по согласованным критериям со ссылками.",
      "kz": "Сілтемелермен бес жеткізушіні келісілген өлшемдер бойынша салыстыру.",
      "en": "A sourced comparison of five suppliers using agreed criteria."
    },
    "deliverable": {
      "ru": "Сравнение пяти поставщиков по согласованным критериям со ссылками.",
      "kz": "Сілтемелермен бес жеткізушіні келісілген өлшемдер бойынша салыстыру.",
      "en": "A sourced comparison of five suppliers using agreed criteria."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Сравнение пяти поставщиков по согласованным критериям со ссылками."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Сілтемелермен бес жеткізушіні келісілген өлшемдер бойынша салыстыру."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A sourced comparison of five suppliers using agreed criteria."
      ]
    },
    "price": 20000,
    "category": "management"
  },
  {
    "id": "brand",
    "department": "design",
    "skillGroup": "design",
    "icon": "spark",
    "title": {
      "ru": "Логотип и простой фирменный стиль",
      "kz": "Логотип және қарапайым фирмалық стиль",
      "en": "Logo and simple visual identity"
    },
    "subtitle": {
      "ru": "Концепция логотипа, палитра, шрифтовая пара и мини-гайд.",
      "kz": "Логотип тұжырымдамасы, палитра, қаріптер және шағын нұсқаулық.",
      "en": "A logo concept, colour palette, font pairing and mini style guide."
    },
    "detail": {
      "ru": "Концепция логотипа, палитра, шрифтовая пара и мини-гайд.",
      "kz": "Логотип тұжырымдамасы, палитра, қаріптер және шағын нұсқаулық.",
      "en": "A logo concept, colour palette, font pairing and mini style guide."
    },
    "deliverable": {
      "ru": "Концепция логотипа, палитра, шрифтовая пара и мини-гайд.",
      "kz": "Логотип тұжырымдамасы, палитра, қаріптер және шағын нұсқаулық.",
      "en": "A logo concept, colour palette, font pairing and mini style guide."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Концепция логотипа, палитра, шрифтовая пара и мини-гайд."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Логотип тұжырымдамасы, палитра, қаріптер және шағын нұсқаулық."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A logo concept, colour palette, font pairing and mini style guide."
      ]
    },
    "price": 20000,
    "category": "design"
  },
  {
    "id": "social-templates",
    "department": "design",
    "skillGroup": "design",
    "icon": "spark",
    "title": {
      "ru": "Шаблоны постов и сторис",
      "kz": "Посттар мен сторис үлгілері",
      "en": "Post and story templates"
    },
    "subtitle": {
      "ru": "Шесть редактируемых шаблонов в согласованном формате.",
      "kz": "Келісілген форматта алты өңделетін үлгі.",
      "en": "Six editable social templates in the agreed format."
    },
    "detail": {
      "ru": "Шесть редактируемых шаблонов в согласованном формате.",
      "kz": "Келісілген форматта алты өңделетін үлгі.",
      "en": "Six editable social templates in the agreed format."
    },
    "deliverable": {
      "ru": "Шесть редактируемых шаблонов в согласованном формате.",
      "kz": "Келісілген форматта алты өңделетін үлгі.",
      "en": "Six editable social templates in the agreed format."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Шесть редактируемых шаблонов в согласованном формате."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Келісілген форматта алты өңделетін үлгі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "Six editable social templates in the agreed format."
      ]
    },
    "price": 20000,
    "category": "design"
  },
  {
    "id": "presentation",
    "department": "design",
    "skillGroup": "design",
    "icon": "spark",
    "title": {
      "ru": "Презентация для компании",
      "kz": "Компания презентациясы",
      "en": "Company presentation"
    },
    "subtitle": {
      "ru": "Презентация до 10 слайдов по готовым материалам заказчика.",
      "kz": "Тапсырыс беруші материалдары бойынша 10 слайдқа дейінгі презентация.",
      "en": "Up to 10 slides based on the customer’s existing content."
    },
    "detail": {
      "ru": "Презентация до 10 слайдов по готовым материалам заказчика.",
      "kz": "Тапсырыс беруші материалдары бойынша 10 слайдқа дейінгі презентация.",
      "en": "Up to 10 slides based on the customer’s existing content."
    },
    "deliverable": {
      "ru": "Презентация до 10 слайдов по готовым материалам заказчика.",
      "kz": "Тапсырыс беруші материалдары бойынша 10 слайдқа дейінгі презентация.",
      "en": "Up to 10 slides based on the customer’s existing content."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Презентация до 10 слайдов по готовым материалам заказчика."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Тапсырыс беруші материалдары бойынша 10 слайдқа дейінгі презентация."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "Up to 10 slides based on the customer’s existing content."
      ]
    },
    "price": 20000,
    "category": "design"
  },
  {
    "id": "print-layout",
    "department": "design",
    "skillGroup": "design",
    "icon": "spark",
    "title": {
      "ru": "Меню, визитки и листовки",
      "kz": "Мәзір, визитка және парақша",
      "en": "Menus, business cards and flyers"
    },
    "subtitle": {
      "ru": "Один макет для печати с исходником и экспортом в PDF.",
      "kz": "Бастапқы файлы және PDF экспорты бар бір баспа макеті.",
      "en": "One print layout with an editable source and PDF export."
    },
    "detail": {
      "ru": "Один макет для печати с исходником и экспортом в PDF.",
      "kz": "Бастапқы файлы және PDF экспорты бар бір баспа макеті.",
      "en": "One print layout with an editable source and PDF export."
    },
    "deliverable": {
      "ru": "Один макет для печати с исходником и экспортом в PDF.",
      "kz": "Бастапқы файлы және PDF экспорты бар бір баспа макеті.",
      "en": "One print layout with an editable source and PDF export."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Один макет для печати с исходником и экспортом в PDF."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Бастапқы файлы және PDF экспорты бар бір баспа макеті."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "One print layout with an editable source and PDF export."
      ]
    },
    "price": 20000,
    "category": "design"
  },
  {
    "id": "recruitment",
    "department": "hr",
    "skillGroup": "hr",
    "icon": "users",
    "title": {
      "ru": "Вакансии и скрининг резюме",
      "kz": "Бос жұмыс орындары және түйіндемелерді іріктеу",
      "en": "Job descriptions and CV screening"
    },
    "subtitle": {
      "ru": "Описание вакансии и матрица оценки до 10 обезличенных резюме.",
      "kz": "Бос орын сипаттамасы және 10 жасырын түйіндемеге бағалау матрицасы.",
      "en": "A job description and a screening matrix for up to 10 anonymised CVs."
    },
    "detail": {
      "ru": "Описание вакансии и матрица оценки до 10 обезличенных резюме.",
      "kz": "Бос орын сипаттамасы және 10 жасырын түйіндемеге бағалау матрицасы.",
      "en": "A job description and a screening matrix for up to 10 anonymised CVs."
    },
    "deliverable": {
      "ru": "Описание вакансии и матрица оценки до 10 обезличенных резюме.",
      "kz": "Бос орын сипаттамасы және 10 жасырын түйіндемеге бағалау матрицасы.",
      "en": "A job description and a screening matrix for up to 10 anonymised CVs."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Описание вакансии и матрица оценки до 10 обезличенных резюме."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Бос орын сипаттамасы және 10 жасырын түйіндемеге бағалау матрицасы."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A job description and a screening matrix for up to 10 anonymised CVs."
      ]
    },
    "price": 20000,
    "category": "hr"
  },
  {
    "id": "employee-survey",
    "department": "hr",
    "skillGroup": "hr",
    "icon": "users",
    "title": {
      "ru": "Анкеты и опросы сотрудников",
      "kz": "Қызметкерлер сауалнамалары",
      "en": "Employee questionnaires and surveys"
    },
    "subtitle": {
      "ru": "Анкета до 15 вопросов и шаблон сводного анализа ответов.",
      "kz": "15 сұраққа дейінгі сауалнама және жауаптарды жинақтау үлгісі.",
      "en": "A questionnaire of up to 15 items and an aggregate analysis template."
    },
    "detail": {
      "ru": "Анкета до 15 вопросов и шаблон сводного анализа ответов.",
      "kz": "15 сұраққа дейінгі сауалнама және жауаптарды жинақтау үлгісі.",
      "en": "A questionnaire of up to 15 items and an aggregate analysis template."
    },
    "deliverable": {
      "ru": "Анкета до 15 вопросов и шаблон сводного анализа ответов.",
      "kz": "15 сұраққа дейінгі сауалнама және жауаптарды жинақтау үлгісі.",
      "en": "A questionnaire of up to 15 items and an aggregate analysis template."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Анкета до 15 вопросов и шаблон сводного анализа ответов."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "15 сұраққа дейінгі сауалнама және жауаптарды жинақтау үлгісі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A questionnaire of up to 15 items and an aggregate analysis template."
      ]
    },
    "price": 20000,
    "category": "hr"
  },
  {
    "id": "onboarding",
    "department": "hr",
    "skillGroup": "hr",
    "icon": "users",
    "title": {
      "ru": "Адаптационные материалы для новичков",
      "kz": "Жаңа қызметкерлерге бейімдеу материалдары",
      "en": "New-hire onboarding materials"
    },
    "subtitle": {
      "ru": "План первой недели, памятка и список полезных контактов.",
      "kz": "Алғашқы апта жоспары, жадынама және пайдалы байланыстар тізімі.",
      "en": "A first-week plan, welcome guide and useful contacts checklist."
    },
    "detail": {
      "ru": "План первой недели, памятка и список полезных контактов.",
      "kz": "Алғашқы апта жоспары, жадынама және пайдалы байланыстар тізімі.",
      "en": "A first-week plan, welcome guide and useful contacts checklist."
    },
    "deliverable": {
      "ru": "План первой недели, памятка и список полезных контактов.",
      "kz": "Алғашқы апта жоспары, жадынама және пайдалы байланыстар тізімі.",
      "en": "A first-week plan, welcome guide and useful contacts checklist."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "План первой недели, памятка и список полезных контактов."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Алғашқы апта жоспары, жадынама және пайдалы байланыстар тізімі."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "A first-week plan, welcome guide and useful contacts checklist."
      ]
    },
    "price": 20000,
    "category": "hr"
  },
  {
    "id": "candidate-task",
    "department": "hr",
    "skillGroup": "hr",
    "icon": "users",
    "title": {
      "ru": "Тест-задания для кандидатов",
      "kz": "Үміткерлерге тест тапсырмалары",
      "en": "Candidate assessment tasks"
    },
    "subtitle": {
      "ru": "Одно практическое задание с критериями оценки и примером решения.",
      "kz": "Бағалау өлшемдері мен шешім мысалы бар бір практикалық тапсырма.",
      "en": "One practical assessment with a scoring rubric and sample solution."
    },
    "detail": {
      "ru": "Одно практическое задание с критериями оценки и примером решения.",
      "kz": "Бағалау өлшемдері мен шешім мысалы бар бір практикалық тапсырма.",
      "en": "One practical assessment with a scoring rubric and sample solution."
    },
    "deliverable": {
      "ru": "Одно практическое задание с критериями оценки и примером решения.",
      "kz": "Бағалау өлшемдері мен шешім мысалы бар бір практикалық тапсырма.",
      "en": "One practical assessment with a scoring rubric and sample solution."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Одно практическое задание с критериями оценки и примером решения."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Бағалау өлшемдері мен шешім мысалы бар бір практикалық тапсырма."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "One practical assessment with a scoring rubric and sample solution."
      ]
    },
    "price": 20000,
    "category": "hr"
  },
  {
    "id": "translation",
    "department": "writing",
    "skillGroup": "writing",
    "icon": "book",
    "title": {
      "ru": "Перевод сайта или меню",
      "kz": "Сайт немесе мәзір аудармасы",
      "en": "Website or menu translation"
    },
    "subtitle": {
      "ru": "Перевод до 1 000 слов между русским, английским и казахским языками.",
      "kz": "Орыс, ағылшын және қазақ тілдері арасында 1 000 сөзге дейін аудару.",
      "en": "Up to 1,000 words translated between Russian, English and Kazakh."
    },
    "detail": {
      "ru": "Перевод до 1 000 слов между русским, английским и казахским языками.",
      "kz": "Орыс, ағылшын және қазақ тілдері арасында 1 000 сөзге дейін аудару.",
      "en": "Up to 1,000 words translated between Russian, English and Kazakh."
    },
    "deliverable": {
      "ru": "Перевод до 1 000 слов между русским, английским и казахским языками.",
      "kz": "Орыс, ағылшын және қазақ тілдері арасында 1 000 сөзге дейін аудару.",
      "en": "Up to 1,000 words translated between Russian, English and Kazakh."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Перевод до 1 000 слов между русским, английским и казахским языками."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Орыс, ағылшын және қазақ тілдері арасында 1 000 сөзге дейін аудару."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "Up to 1,000 words translated between Russian, English and Kazakh."
      ]
    },
    "price": 20000,
    "category": "writing"
  },
  {
    "id": "articles",
    "department": "writing",
    "skillGroup": "writing",
    "icon": "book",
    "title": {
      "ru": "Статьи, посты и описания товаров",
      "kz": "Мақалалар, посттар және тауар сипаттамалары",
      "en": "Articles, posts and product copy"
    },
    "subtitle": {
      "ru": "До 1 000 слов готового текста с согласованной структурой и тоном.",
      "kz": "Келісілген құрылым мен стильде 1 000 сөзге дейін дайын мәтін.",
      "en": "Up to 1,000 words following an agreed structure and tone."
    },
    "detail": {
      "ru": "До 1 000 слов готового текста с согласованной структурой и тоном.",
      "kz": "Келісілген құрылым мен стильде 1 000 сөзге дейін дайын мәтін.",
      "en": "Up to 1,000 words following an agreed structure and tone."
    },
    "deliverable": {
      "ru": "До 1 000 слов готового текста с согласованной структурой и тоном.",
      "kz": "Келісілген құрылым мен стильде 1 000 сөзге дейін дайын мәтін.",
      "en": "Up to 1,000 words following an agreed structure and tone."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "До 1 000 слов готового текста с согласованной структурой и тоном."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Келісілген құрылым мен стильде 1 000 сөзге дейін дайын мәтін."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "Up to 1,000 words following an agreed structure and tone."
      ]
    },
    "price": 20000,
    "category": "writing"
  },
  {
    "id": "editing",
    "department": "writing",
    "skillGroup": "writing",
    "icon": "book",
    "title": {
      "ru": "Редактура и вычитка текстов",
      "kz": "Мәтіндерді редакциялау және тексеру",
      "en": "Editing and proofreading"
    },
    "subtitle": {
      "ru": "Вычитка до 2 000 слов с исправлениями и комментариями редактора.",
      "kz": "Редактор түзетулері мен түсініктемелері бар 2 000 сөзге дейінгі тексеру.",
      "en": "Up to 2,000 words proofread with tracked edits and editor comments."
    },
    "detail": {
      "ru": "Вычитка до 2 000 слов с исправлениями и комментариями редактора.",
      "kz": "Редактор түзетулері мен түсініктемелері бар 2 000 сөзге дейінгі тексеру.",
      "en": "Up to 2,000 words proofread with tracked edits and editor comments."
    },
    "deliverable": {
      "ru": "Вычитка до 2 000 слов с исправлениями и комментариями редактора.",
      "kz": "Редактор түзетулері мен түсініктемелері бар 2 000 сөзге дейінгі тексеру.",
      "en": "Up to 2,000 words proofread with tracked edits and editor comments."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Вычитка до 2 000 слов с исправлениями и комментариями редактора."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Редактор түзетулері мен түсініктемелері бар 2 000 сөзге дейінгі тексеру."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "Up to 2,000 words proofread with tracked edits and editor comments."
      ]
    },
    "price": 20000,
    "category": "writing"
  },
  {
    "id": "press-release",
    "department": "writing",
    "skillGroup": "writing",
    "icon": "book",
    "title": {
      "ru": "Пресс-релизы и тексты для рассылок",
      "kz": "Баспасөз релиздері мен хабарлама мәтіндері",
      "en": "Press releases and newsletter copy"
    },
    "subtitle": {
      "ru": "Один пресс-релиз или письмо с заголовками и ключевыми сообщениями.",
      "kz": "Тақырыптары мен негізгі хабарлары бар бір релиз немесе хат.",
      "en": "One press release or email with headlines and key messages."
    },
    "detail": {
      "ru": "Один пресс-релиз или письмо с заголовками и ключевыми сообщениями.",
      "kz": "Тақырыптары мен негізгі хабарлары бар бір релиз немесе хат.",
      "en": "One press release or email with headlines and key messages."
    },
    "deliverable": {
      "ru": "Один пресс-релиз или письмо с заголовками и ключевыми сообщениями.",
      "kz": "Тақырыптары мен негізгі хабарлары бар бір релиз немесе хат.",
      "en": "One press release or email with headlines and key messages."
    },
    "criteria": {
      "ru": [
        "Объём соответствует согласованному брифу",
        "Использованы материалы заказчика и проверяемые источники",
        "Передан редактируемый результат в согласованном формате",
        "Один пресс-релиз или письмо с заголовками и ключевыми сообщениями."
      ],
      "kz": [
        "Көлем келісілген брифке сәйкес",
        "Тапсырыс беруші материалдары мен тексерілетін дереккөздер қолданылған",
        "Келісілген форматта өңделетін нәтиже берілді",
        "Тақырыптары мен негізгі хабарлары бар бір релиз немесе хат."
      ],
      "en": [
        "The scope matches the agreed brief",
        "Customer materials and verifiable sources are used",
        "Editable work is delivered in the agreed format",
        "One press release or email with headlines and key messages."
      ]
    },
    "price": 20000,
    "category": "writing"
  }
];
const departmentTests={
  "marketing": [
    {
      "q": {
        "ru": "Что важно указать в контент-плане?",
        "kz": "Контент-жоспарда не маңызды?",
        "en": "What belongs in a content plan?"
      },
      "a": [
        {
          "ru": "Цель, аудиторию, темы и форматы",
          "kz": "Мақсат, аудитория, тақырыптар мен форматтар",
          "en": "Goals, audience, topics and formats"
        },
        {
          "ru": "Только красивое оформление",
          "kz": "Тек әдемі безендіру",
          "en": "Only attractive formatting"
        },
        {
          "ru": "Любые данные без проверки",
          "kz": "Тексерілмеген кез келген деректер",
          "en": "Any data without checking"
        }
      ],
      "correct": 0
    },
    {
      "q": {
        "ru": "В брифе не хватает данных. Что делать?",
        "kz": "Брифте дерек жетіспейді. Не істеу керек?",
        "en": "The brief lacks information. What should you do?"
      },
      "a": [
        {
          "ru": "Придумать недостающее",
          "kz": "Жетіспейтінін ойдан жазу",
          "en": "Invent the missing information"
        },
        {
          "ru": "Уточнить у заказчика и зафиксировать ответ",
          "kz": "Тапсырыс берушіден нақтылап, жауабын сақтау",
          "en": "Ask the customer and record the answer"
        },
        {
          "ru": "Скрыть проблему",
          "kz": "Мәселені жасыру",
          "en": "Hide the issue"
        }
      ],
      "correct": 1
    },
    {
      "q": {
        "ru": "Как использовать материалы клиента?",
        "kz": "Клиент материалдарын қалай қолдану керек?",
        "en": "How should customer materials be handled?"
      },
      "a": [
        {
          "ru": "Опубликовать без разрешения",
          "kz": "Рұқсатсыз жариялау",
          "en": "Publish without permission"
        },
        {
          "ru": "Разослать всем знакомым",
          "kz": "Барлық таныстарға тарату",
          "en": "Share with everyone"
        },
        {
          "ru": "Использовать только для согласованной задачи",
          "kz": "Тек келісілген тапсырмаға қолдану",
          "en": "Use only for the agreed task"
        }
      ],
      "correct": 2
    },
    {
      "q": {
        "ru": "Как проверить готовность работы?",
        "kz": "Жұмыстың дайын екенін қалай тексеру керек?",
        "en": "How should you check the work is ready?"
      },
      "a": [
        {
          "ru": "Сверить с критериями и протестировать результат",
          "kz": "Өлшемдермен салыстырып, нәтижені тексеру",
          "en": "Check the acceptance criteria and test the result"
        },
        {
          "ru": "Проверять не нужно",
          "kz": "Тексеру қажет емес",
          "en": "No check is needed"
        },
        {
          "ru": "Оценить только скорость",
          "kz": "Тек жылдамдықты бағалау",
          "en": "Judge only the speed"
        }
      ],
      "correct": 0
    }
  ],
  "finance": [
    {
      "q": {
        "ru": "На чём строится финансовая модель?",
        "kz": "Қаржы моделі неге негізделеді?",
        "en": "What should a financial model use?"
      },
      "a": [
        {
          "ru": "Исходные данные, формулы и явные допущения",
          "kz": "Бастапқы деректер, формулалар және ашық болжамдар",
          "en": "Source data, formulas and explicit assumptions"
        },
        {
          "ru": "Только красивое оформление",
          "kz": "Тек әдемі безендіру",
          "en": "Only attractive formatting"
        },
        {
          "ru": "Любые данные без проверки",
          "kz": "Тексерілмеген кез келген деректер",
          "en": "Any data without checking"
        }
      ],
      "correct": 0
    },
    {
      "q": {
        "ru": "В брифе не хватает данных. Что делать?",
        "kz": "Брифте дерек жетіспейді. Не істеу керек?",
        "en": "The brief lacks information. What should you do?"
      },
      "a": [
        {
          "ru": "Придумать недостающее",
          "kz": "Жетіспейтінін ойдан жазу",
          "en": "Invent the missing information"
        },
        {
          "ru": "Уточнить у заказчика и зафиксировать ответ",
          "kz": "Тапсырыс берушіден нақтылап, жауабын сақтау",
          "en": "Ask the customer and record the answer"
        },
        {
          "ru": "Скрыть проблему",
          "kz": "Мәселені жасыру",
          "en": "Hide the issue"
        }
      ],
      "correct": 1
    },
    {
      "q": {
        "ru": "Как использовать материалы клиента?",
        "kz": "Клиент материалдарын қалай қолдану керек?",
        "en": "How should customer materials be handled?"
      },
      "a": [
        {
          "ru": "Опубликовать без разрешения",
          "kz": "Рұқсатсыз жариялау",
          "en": "Publish without permission"
        },
        {
          "ru": "Разослать всем знакомым",
          "kz": "Барлық таныстарға тарату",
          "en": "Share with everyone"
        },
        {
          "ru": "Использовать только для согласованной задачи",
          "kz": "Тек келісілген тапсырмаға қолдану",
          "en": "Use only for the agreed task"
        }
      ],
      "correct": 2
    },
    {
      "q": {
        "ru": "Как проверить готовность работы?",
        "kz": "Жұмыстың дайын екенін қалай тексеру керек?",
        "en": "How should you check the work is ready?"
      },
      "a": [
        {
          "ru": "Сверить с критериями и протестировать результат",
          "kz": "Өлшемдермен салыстырып, нәтижені тексеру",
          "en": "Check the acceptance criteria and test the result"
        },
        {
          "ru": "Проверять не нужно",
          "kz": "Тексеру қажет емес",
          "en": "No check is needed"
        },
        {
          "ru": "Оценить только скорость",
          "kz": "Тек жылдамдықты бағалау",
          "en": "Judge only the speed"
        }
      ],
      "correct": 0
    }
  ],
  "it": [
    {
      "q": {
        "ru": "Что нужно передать вместе с кодом?",
        "kz": "Кодпен бірге не беру керек?",
        "en": "What should accompany code delivery?"
      },
      "a": [
        {
          "ru": "Инструкцию запуска и результаты тестирования",
          "kz": "Іске қосу нұсқаулығы мен тест нәтижелері",
          "en": "Setup instructions and test results"
        },
        {
          "ru": "Только красивое оформление",
          "kz": "Тек әдемі безендіру",
          "en": "Only attractive formatting"
        },
        {
          "ru": "Любые данные без проверки",
          "kz": "Тексерілмеген кез келген деректер",
          "en": "Any data without checking"
        }
      ],
      "correct": 0
    },
    {
      "q": {
        "ru": "В брифе не хватает данных. Что делать?",
        "kz": "Брифте дерек жетіспейді. Не істеу керек?",
        "en": "The brief lacks information. What should you do?"
      },
      "a": [
        {
          "ru": "Придумать недостающее",
          "kz": "Жетіспейтінін ойдан жазу",
          "en": "Invent the missing information"
        },
        {
          "ru": "Уточнить у заказчика и зафиксировать ответ",
          "kz": "Тапсырыс берушіден нақтылап, жауабын сақтау",
          "en": "Ask the customer and record the answer"
        },
        {
          "ru": "Скрыть проблему",
          "kz": "Мәселені жасыру",
          "en": "Hide the issue"
        }
      ],
      "correct": 1
    },
    {
      "q": {
        "ru": "Как использовать материалы клиента?",
        "kz": "Клиент материалдарын қалай қолдану керек?",
        "en": "How should customer materials be handled?"
      },
      "a": [
        {
          "ru": "Опубликовать без разрешения",
          "kz": "Рұқсатсыз жариялау",
          "en": "Publish without permission"
        },
        {
          "ru": "Разослать всем знакомым",
          "kz": "Барлық таныстарға тарату",
          "en": "Share with everyone"
        },
        {
          "ru": "Использовать только для согласованной задачи",
          "kz": "Тек келісілген тапсырмаға қолдану",
          "en": "Use only for the agreed task"
        }
      ],
      "correct": 2
    },
    {
      "q": {
        "ru": "Как проверить готовность работы?",
        "kz": "Жұмыстың дайын екенін қалай тексеру керек?",
        "en": "How should you check the work is ready?"
      },
      "a": [
        {
          "ru": "Сверить с критериями и протестировать результат",
          "kz": "Өлшемдермен салыстырып, нәтижені тексеру",
          "en": "Check the acceptance criteria and test the result"
        },
        {
          "ru": "Проверять не нужно",
          "kz": "Тексеру қажет емес",
          "en": "No check is needed"
        },
        {
          "ru": "Оценить только скорость",
          "kz": "Тек жылдамдықты бағалау",
          "en": "Judge only the speed"
        }
      ],
      "correct": 0
    }
  ],
  "management": [
    {
      "q": {
        "ru": "Что делает описание процесса полезным?",
        "kz": "Процесс сипаттамасын не пайдалы етеді?",
        "en": "What makes process documentation useful?"
      },
      "a": [
        {
          "ru": "Чёткие шаги, ответственные и ожидаемый результат",
          "kz": "Нақты қадамдар, жауаптылар және күтілетін нәтиже",
          "en": "Clear steps, owners and expected outcomes"
        },
        {
          "ru": "Только красивое оформление",
          "kz": "Тек әдемі безендіру",
          "en": "Only attractive formatting"
        },
        {
          "ru": "Любые данные без проверки",
          "kz": "Тексерілмеген кез келген деректер",
          "en": "Any data without checking"
        }
      ],
      "correct": 0
    },
    {
      "q": {
        "ru": "В брифе не хватает данных. Что делать?",
        "kz": "Брифте дерек жетіспейді. Не істеу керек?",
        "en": "The brief lacks information. What should you do?"
      },
      "a": [
        {
          "ru": "Придумать недостающее",
          "kz": "Жетіспейтінін ойдан жазу",
          "en": "Invent the missing information"
        },
        {
          "ru": "Уточнить у заказчика и зафиксировать ответ",
          "kz": "Тапсырыс берушіден нақтылап, жауабын сақтау",
          "en": "Ask the customer and record the answer"
        },
        {
          "ru": "Скрыть проблему",
          "kz": "Мәселені жасыру",
          "en": "Hide the issue"
        }
      ],
      "correct": 1
    },
    {
      "q": {
        "ru": "Как использовать материалы клиента?",
        "kz": "Клиент материалдарын қалай қолдану керек?",
        "en": "How should customer materials be handled?"
      },
      "a": [
        {
          "ru": "Опубликовать без разрешения",
          "kz": "Рұқсатсыз жариялау",
          "en": "Publish without permission"
        },
        {
          "ru": "Разослать всем знакомым",
          "kz": "Барлық таныстарға тарату",
          "en": "Share with everyone"
        },
        {
          "ru": "Использовать только для согласованной задачи",
          "kz": "Тек келісілген тапсырмаға қолдану",
          "en": "Use only for the agreed task"
        }
      ],
      "correct": 2
    },
    {
      "q": {
        "ru": "Как проверить готовность работы?",
        "kz": "Жұмыстың дайын екенін қалай тексеру керек?",
        "en": "How should you check the work is ready?"
      },
      "a": [
        {
          "ru": "Сверить с критериями и протестировать результат",
          "kz": "Өлшемдермен салыстырып, нәтижені тексеру",
          "en": "Check the acceptance criteria and test the result"
        },
        {
          "ru": "Проверять не нужно",
          "kz": "Тексеру қажет емес",
          "en": "No check is needed"
        },
        {
          "ru": "Оценить только скорость",
          "kz": "Тек жылдамдықты бағалау",
          "en": "Judge only the speed"
        }
      ],
      "correct": 0
    }
  ],
  "design": [
    {
      "q": {
        "ru": "Что проверить перед передачей макета?",
        "kz": "Макетті бермес бұрын не тексеру керек?",
        "en": "What should be checked before handing over a design?"
      },
      "a": [
        {
          "ru": "Формат, размеры и возможность редактирования",
          "kz": "Формат, өлшемдер және өңдеу мүмкіндігі",
          "en": "Format, dimensions and editability"
        },
        {
          "ru": "Только красивое оформление",
          "kz": "Тек әдемі безендіру",
          "en": "Only attractive formatting"
        },
        {
          "ru": "Любые данные без проверки",
          "kz": "Тексерілмеген кез келген деректер",
          "en": "Any data without checking"
        }
      ],
      "correct": 0
    },
    {
      "q": {
        "ru": "В брифе не хватает данных. Что делать?",
        "kz": "Брифте дерек жетіспейді. Не істеу керек?",
        "en": "The brief lacks information. What should you do?"
      },
      "a": [
        {
          "ru": "Придумать недостающее",
          "kz": "Жетіспейтінін ойдан жазу",
          "en": "Invent the missing information"
        },
        {
          "ru": "Уточнить у заказчика и зафиксировать ответ",
          "kz": "Тапсырыс берушіден нақтылап, жауабын сақтау",
          "en": "Ask the customer and record the answer"
        },
        {
          "ru": "Скрыть проблему",
          "kz": "Мәселені жасыру",
          "en": "Hide the issue"
        }
      ],
      "correct": 1
    },
    {
      "q": {
        "ru": "Как использовать материалы клиента?",
        "kz": "Клиент материалдарын қалай қолдану керек?",
        "en": "How should customer materials be handled?"
      },
      "a": [
        {
          "ru": "Опубликовать без разрешения",
          "kz": "Рұқсатсыз жариялау",
          "en": "Publish without permission"
        },
        {
          "ru": "Разослать всем знакомым",
          "kz": "Барлық таныстарға тарату",
          "en": "Share with everyone"
        },
        {
          "ru": "Использовать только для согласованной задачи",
          "kz": "Тек келісілген тапсырмаға қолдану",
          "en": "Use only for the agreed task"
        }
      ],
      "correct": 2
    },
    {
      "q": {
        "ru": "Как проверить готовность работы?",
        "kz": "Жұмыстың дайын екенін қалай тексеру керек?",
        "en": "How should you check the work is ready?"
      },
      "a": [
        {
          "ru": "Сверить с критериями и протестировать результат",
          "kz": "Өлшемдермен салыстырып, нәтижені тексеру",
          "en": "Check the acceptance criteria and test the result"
        },
        {
          "ru": "Проверять не нужно",
          "kz": "Тексеру қажет емес",
          "en": "No check is needed"
        },
        {
          "ru": "Оценить только скорость",
          "kz": "Тек жылдамдықты бағалау",
          "en": "Judge only the speed"
        }
      ],
      "correct": 0
    }
  ],
  "hr": [
    {
      "q": {
        "ru": "Как оценивать кандидатов по тест-заданию?",
        "kz": "Үміткерлерді тест тапсырмасы бойынша қалай бағалау керек?",
        "en": "How should candidate tasks be evaluated?"
      },
      "a": [
        {
          "ru": "По единым критериям, связанным с работой",
          "kz": "Жұмысқа қатысты ортақ өлшемдер бойынша",
          "en": "Against consistent, job-related criteria"
        },
        {
          "ru": "Только красивое оформление",
          "kz": "Тек әдемі безендіру",
          "en": "Only attractive formatting"
        },
        {
          "ru": "Любые данные без проверки",
          "kz": "Тексерілмеген кез келген деректер",
          "en": "Any data without checking"
        }
      ],
      "correct": 0
    },
    {
      "q": {
        "ru": "В брифе не хватает данных. Что делать?",
        "kz": "Брифте дерек жетіспейді. Не істеу керек?",
        "en": "The brief lacks information. What should you do?"
      },
      "a": [
        {
          "ru": "Придумать недостающее",
          "kz": "Жетіспейтінін ойдан жазу",
          "en": "Invent the missing information"
        },
        {
          "ru": "Уточнить у заказчика и зафиксировать ответ",
          "kz": "Тапсырыс берушіден нақтылап, жауабын сақтау",
          "en": "Ask the customer and record the answer"
        },
        {
          "ru": "Скрыть проблему",
          "kz": "Мәселені жасыру",
          "en": "Hide the issue"
        }
      ],
      "correct": 1
    },
    {
      "q": {
        "ru": "Как использовать материалы клиента?",
        "kz": "Клиент материалдарын қалай қолдану керек?",
        "en": "How should customer materials be handled?"
      },
      "a": [
        {
          "ru": "Опубликовать без разрешения",
          "kz": "Рұқсатсыз жариялау",
          "en": "Publish without permission"
        },
        {
          "ru": "Разослать всем знакомым",
          "kz": "Барлық таныстарға тарату",
          "en": "Share with everyone"
        },
        {
          "ru": "Использовать только для согласованной задачи",
          "kz": "Тек келісілген тапсырмаға қолдану",
          "en": "Use only for the agreed task"
        }
      ],
      "correct": 2
    },
    {
      "q": {
        "ru": "Как проверить готовность работы?",
        "kz": "Жұмыстың дайын екенін қалай тексеру керек?",
        "en": "How should you check the work is ready?"
      },
      "a": [
        {
          "ru": "Сверить с критериями и протестировать результат",
          "kz": "Өлшемдермен салыстырып, нәтижені тексеру",
          "en": "Check the acceptance criteria and test the result"
        },
        {
          "ru": "Проверять не нужно",
          "kz": "Тексеру қажет емес",
          "en": "No check is needed"
        },
        {
          "ru": "Оценить только скорость",
          "kz": "Тек жылдамдықты бағалау",
          "en": "Judge only the speed"
        }
      ],
      "correct": 0
    }
  ],
  "writing": [
    {
      "q": {
        "ru": "Что важно сохранить при переводе?",
        "kz": "Аудармада нені сақтау маңызды?",
        "en": "What matters when translating?"
      },
      "a": [
        {
          "ru": "Смысл, контекст и согласованную терминологию",
          "kz": "Мағына, контекст және келісілген терминология",
          "en": "Meaning, context and agreed terminology"
        },
        {
          "ru": "Только красивое оформление",
          "kz": "Тек әдемі безендіру",
          "en": "Only attractive formatting"
        },
        {
          "ru": "Любые данные без проверки",
          "kz": "Тексерілмеген кез келген деректер",
          "en": "Any data without checking"
        }
      ],
      "correct": 0
    },
    {
      "q": {
        "ru": "В брифе не хватает данных. Что делать?",
        "kz": "Брифте дерек жетіспейді. Не істеу керек?",
        "en": "The brief lacks information. What should you do?"
      },
      "a": [
        {
          "ru": "Придумать недостающее",
          "kz": "Жетіспейтінін ойдан жазу",
          "en": "Invent the missing information"
        },
        {
          "ru": "Уточнить у заказчика и зафиксировать ответ",
          "kz": "Тапсырыс берушіден нақтылап, жауабын сақтау",
          "en": "Ask the customer and record the answer"
        },
        {
          "ru": "Скрыть проблему",
          "kz": "Мәселені жасыру",
          "en": "Hide the issue"
        }
      ],
      "correct": 1
    },
    {
      "q": {
        "ru": "Как использовать материалы клиента?",
        "kz": "Клиент материалдарын қалай қолдану керек?",
        "en": "How should customer materials be handled?"
      },
      "a": [
        {
          "ru": "Опубликовать без разрешения",
          "kz": "Рұқсатсыз жариялау",
          "en": "Publish without permission"
        },
        {
          "ru": "Разослать всем знакомым",
          "kz": "Барлық таныстарға тарату",
          "en": "Share with everyone"
        },
        {
          "ru": "Использовать только для согласованной задачи",
          "kz": "Тек келісілген тапсырмаға қолдану",
          "en": "Use only for the agreed task"
        }
      ],
      "correct": 2
    },
    {
      "q": {
        "ru": "Как проверить готовность работы?",
        "kz": "Жұмыстың дайын екенін қалай тексеру керек?",
        "en": "How should you check the work is ready?"
      },
      "a": [
        {
          "ru": "Сверить с критериями и протестировать результат",
          "kz": "Өлшемдермен салыстырып, нәтижені тексеру",
          "en": "Check the acceptance criteria and test the result"
        },
        {
          "ru": "Проверять не нужно",
          "kz": "Тексеру қажет емес",
          "en": "No check is needed"
        },
        {
          "ru": "Оценить только скорость",
          "kz": "Тек жылдамдықты бағалау",
          "en": "Judge only the speed"
        }
      ],
      "correct": 0
    }
  ]
};
const legacyDepartments={catalog:'writing',excel:'finance',research:'marketing'};
function enrich(data){
 for(const service of data.services){
  if(legacyDepartments[service.id]&&!service.department)service.department=legacyDepartments[service.id];
 }
 for(const service of additions){
  if(!data.services.some(existing=>existing.id===service.id))data.services.push(JSON.parse(JSON.stringify(service)));
 }
 return data;
}
enrich(window.SBSeed);
for(const service of additions)window.SBTestBank[service.id]=departmentTests[service.department];
window.SBCatalog={departments,enrich};
})();
