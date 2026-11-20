(function(){
'use strict';
const banks={
  "marketing": [
    {
      "scenario": {
        "ru": "Магазин хочет продвигать новую коллекцию в Instagram и TikTok. Аудитория — люди, которые выбирают товары для дома, а цель — получить заявки на покупку.",
        "kz": "Дүкен жаңа коллекцияны Instagram мен TikTok-та таныстырғысы келеді. Аудиториясы — үй тауарларын таңдайтындар, мақсаты — сатып алу өтінімдері.",
        "en": "A store wants to launch a homeware collection on Instagram and TikTok. The goal is purchase enquiries from people furnishing their homes."
      },
      "q": {
        "ru": "С чего вы начнёте месячный контент-план, чтобы он помог решить задачу бизнеса?",
        "kz": "Контент-жоспар бизнес мақсатына көмектесуі үшін неден бастайсыз?",
        "en": "How would you start a monthly content plan so it supports the business goal?"
      },
      "a": [
        {
          "ru": "Сначала распределю красивые публикации по датам, а аудиторию уточню после публикации.",
          "kz": "Алдымен әдемі посттарды күндерге бөлемін, аудиторияны кейін анықтаймын.",
          "en": "Schedule attractive posts first and work out the audience after publishing."
        },
        {
          "ru": "Свяжу цель с сегментами аудитории, рубриками и форматами; затем предложу темы и способ оценить отклик.",
          "kz": "Мақсатты аудитория сегменттерімен, айдарлармен және форматтармен байланыстырып, тақырыптар мен нәтижені бағалау тәсілін ұсынамын.",
          "en": "Connect the goal to audience segments, themes and formats, then propose topics and a way to measure response."
        },
        {
          "ru": "Скопирую самый популярный план конкурента, чтобы сохранить уже работающий подход.",
          "kz": "Тиімді тәсілді сақтау үшін бәсекелестің танымал жоспарын көшіремін.",
          "en": "Copy a popular competitor’s plan to reuse an approach that already works."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Контент-план связывает публикации с задачей бизнеса и потребностями аудитории. Темы и метрики стоит согласовать до запуска.",
        "kz": "Контент-жоспар жарияланымдарды бизнес мақсатымен және аудитория қажеттілігімен байланыстырады. Тақырыптар мен өлшемдерді іске қосуға дейін келіскен дұрыс.",
        "en": "A content plan connects posts to business goals and audience needs. Agree topics and success measures before launch."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "finance": [
    {
      "scenario": {
        "ru": "Кафе просит прогноз прибыли на год. Есть данные о продажах за три месяца, аренде и закупках. Сезонность и будущие цены пока не подтверждены.",
        "kz": "Кафеге бір жылдық пайда болжамы қажет. Үш айлық сату, жалдау және сатып алу деректері бар. Маусымдылық пен болашақ бағалар расталмаған.",
        "en": "A café needs a one-year profit forecast. You have three months of sales, rent and purchasing data. Seasonality and future prices are uncertain."
      },
      "q": {
        "ru": "Как построить модель, которой заказчик сможет пользоваться и которую сможет проверить?",
        "kz": "Тапсырыс беруші қолдана алатын және тексере алатын модельді қалай құрасыз?",
        "en": "How would you build a model the customer can use and verify?"
      },
      "a": [
        {
          "ru": "Умножу прибыль последнего месяца на 12 и назову это точным прогнозом.",
          "kz": "Соңғы ай пайдасын 12-ге көбейтіп, нақты болжам деп көрсетемін.",
          "en": "Multiply last month’s profit by 12 and present it as a precise forecast."
        },
        {
          "ru": "Подберу выручку так, чтобы модель показывала желаемую прибыль.",
          "kz": "Модель қалаған пайданы көрсетуі үшін түсімді бейімдеймін.",
          "en": "Adjust revenue until the model shows the desired profit."
        },
        {
          "ru": "Разделю исходные данные и допущения, покажу формулы и подготовлю несколько сценариев с пояснениями.",
          "kz": "Бастапқы деректер мен болжамдарды бөліп, формулаларды және түсіндірмелері бар бірнеше сценарийді көрсетемін.",
          "en": "Separate source data from assumptions, show formulas and provide several explained scenarios."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Проверяемая модель показывает, откуда взяты числа и как допущения влияют на результат. Сценарии помогают обсудить неопределённость.",
        "kz": "Тексерілетін модель сандардың көзін және болжамдардың нәтижеге әсерін көрсетеді. Сценарийлер белгісіздікті талқылауға көмектеседі.",
        "en": "An auditable model shows where figures come from and how assumptions affect the outcome. Scenarios make uncertainty visible."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "it": [
    {
      "scenario": {
        "ru": "Вы сделали Telegram-бота для заявок. На вашем компьютере он работает, но запускать его будет другой человек. Токен хранится в локальном файле.",
        "kz": "Өтінімдерге арналған Telegram-бот өз компьютеріңізде жұмыс істейді, бірақ оны басқа адам іске қосады. Токен жергілікті файлда сақталған.",
        "en": "You built an enquiry bot that works on your computer. Someone else will run it, and its token is currently stored in a local file."
      },
      "q": {
        "ru": "Что передать вместе с кодом, чтобы заказчик смог безопасно запустить и проверить бота?",
        "kz": "Тапсырыс беруші ботты қауіпсіз іске қосып тексеруі үшін кодпен бірге не бересіз?",
        "en": "What should accompany the code so the customer can safely run and test the bot?"
      },
      "a": [
        {
          "ru": "Инструкцию запуска, список зависимостей, пример настроек без секретов и результаты проверки основных сценариев.",
          "kz": "Іске қосу нұсқаулығын, тәуелділіктер тізімін, құпия дерексіз баптау үлгісін және негізгі сценарийлер тестін беремін.",
          "en": "Setup instructions, dependencies, a configuration example without secrets, and results for the main test scenarios."
        },
        {
          "ru": "Только папку с кодом и действующим токеном, чтобы заказчику не пришлось разбираться в настройках.",
          "kz": "Тапсырыс беруші баптаумен айналыспауы үшін код пен жұмыс токенін ғана беремін.",
          "en": "Just send the code folder with the live token to spare the customer configuration work."
        },
        {
          "ru": "Видеозапись работы бота вместо инструкции и исходников.",
          "kz": "Нұсқаулық пен код орнына бот жұмысының бейнесін беремін.",
          "en": "Send a video of the bot running instead of setup instructions and source code."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Передаваемый результат должен воспроизводиться у заказчика. Секреты хранятся отдельно, а инструкция и тесты помогают проверить запуск.",
        "kz": "Нәтиже тапсырыс берушіде де іске қосылуы керек. Құпия деректер бөлек сақталады, нұсқаулық пен тесттер іске қосуды тексеруге көмектеседі.",
        "en": "The delivery should be reproducible on the customer’s system. Keep secrets separate and include setup instructions and test evidence."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "management": [
    {
      "scenario": {
        "ru": "Небольшая компания просит описать обработку заказов. Сейчас заявки приходят в чат, а несколько сотрудников считают, что за ответ отвечает коллега.",
        "kz": "Шағын компания тапсырыстарды өңдеу процесін сипаттауды сұрайды. Өтінімдер чатқа келеді, қызметкерлер жауап беру басқа әріптестің міндеті деп ойлайды.",
        "en": "A small company needs its order process documented. Enquiries arrive in chat and several employees assume someone else is responsible for answering."
      },
      "q": {
        "ru": "Какое описание процесса поможет устранить эту неопределённость?",
        "kz": "Қандай процесс сипаттамасы осы белгісіздікті жояды?",
        "en": "Which process description would address this ambiguity?"
      },
      "a": [
        {
          "ru": "Общий текст о важности быстрого ответа без распределения ответственности.",
          "kz": "Жауапкершілікті бөлмей, жылдам жауаптың маңызы туралы жалпы мәтін.",
          "en": "A general statement about quick responses without assigning responsibility."
        },
        {
          "ru": "Последовательность шагов с входными данными, ответственным на каждом шаге, сроками и ожидаемым результатом.",
          "kz": "Кіріс деректері, әр қадамның жауаптысы, мерзімі және күтілетін нәтижесі бар қадамдар тізбегі.",
          "en": "A sequence of steps with inputs, an owner at each step, timing and expected outputs."
        },
        {
          "ru": "Список сотрудников и должностей без связи с этапами обработки заказа.",
          "kz": "Тапсырыс кезеңдерімен байланыспайтын қызметкерлер мен лауазымдар тізімі.",
          "en": "A list of employees and job titles unrelated to the order stages."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Процесс становится рабочим, когда понятно, кто, что и когда делает, кому передаёт результат и по каким признакам этап завершён.",
        "kz": "Кімнің нені қашан жасайтыны, нәтижені кімге беретіні және кезеңнің аяқталуы түсінікті болса, процесс жұмыс істейді.",
        "en": "A useful process explains who does what and when, how work is handed over, and what makes each stage complete."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "design": [
    {
      "scenario": {
        "ru": "Заказчику нужны шаблоны постов, которые его команда будет редактировать самостоятельно. Макеты красиво выглядят на вашем экране.",
        "kz": "Тапсырыс берушіге командасы өзі өңдейтін пост үлгілері қажет. Макеттер өз экраныңызда әдемі көрінеді.",
        "en": "A customer needs post templates their team can edit themselves. The layouts look good on your screen."
      },
      "q": {
        "ru": "Что необходимо проверить перед передачей шаблонов?",
        "kz": "Үлгілерді берер алдында нені тексеру қажет?",
        "en": "What should you verify before handing over the templates?"
      },
      "a": [
        {
          "ru": "Только внешний вид превью — исходники можно передать позже, если попросят.",
          "kz": "Тек алдын ала көріністі; бастапқы файлдарды сұраса кейін беремін.",
          "en": "Only the preview appearance; send source files later if requested."
        },
        {
          "ru": "Увеличить насыщенность всех цветов, чтобы макеты выглядели ярче на любом устройстве.",
          "kz": "Кез келген құрылғыда жарқын болу үшін барлық түстерді қанықтырамын.",
          "en": "Increase every colour’s saturation so the designs look brighter on any device."
        },
        {
          "ru": "Согласованные размеры, читаемость, доступ к редактированию, шрифты и корректность экспорта.",
          "kz": "Келісілген өлшемдер, оқылымдылық, өңдеуге қолжетімділік, қаріптер және экспорт дұрыстығы.",
          "en": "Agreed dimensions, readability, edit access, fonts and correct exports."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Заказчик получает рабочий инструмент, а не только красивое превью. Поэтому важны редактируемость, размеры и корректные файлы.",
        "kz": "Тапсырыс берушіге тек әдемі көрініс емес, жұмыс құралы қажет. Өңдеу мүмкіндігі, өлшемдер мен дұрыс файлдар маңызды.",
        "en": "The customer needs a usable tool as well as an attractive preview. Editability, dimensions and valid files are part of the result."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "hr": [
    {
      "scenario": {
        "ru": "Вы сравниваете десять обезличенных резюме для одной вакансии. Опыт кандидатов описан по-разному, а в части резюме есть информация, не связанная с работой.",
        "kz": "Бір бос орынға он жасырын түйіндемені салыстырасыз. Тәжірибе әртүрлі сипатталған, кейбірінде жұмысқа қатысы жоқ мәлімет бар.",
        "en": "You are comparing ten anonymised CVs for one role. Experience is described differently and some details are unrelated to the job."
      },
      "q": {
        "ru": "Как организовать первичный скрининг, чтобы выводы были последовательными и объяснимыми?",
        "kz": "Қорытынды бірізді әрі түсінікті болуы үшін алғашқы іріктеуді қалай ұйымдастырасыз?",
        "en": "How would you make the screening consistent and explainable?"
      },
      "a": [
        {
          "ru": "Создам единую матрицу требований вакансии, отмечу подтверждения и пробелы, не буду использовать личные признаки вне требований работы.",
          "kz": "Вакансия талаптарының ортақ матрицасын жасап, дәлелдер мен жетіспейтін мәліметті белгілеймін; жұмысқа қатысы жоқ жеке белгілерді қолданбаймын.",
          "en": "Use one job-requirements matrix, record supporting evidence and gaps, and exclude personal traits unrelated to the role."
        },
        {
          "ru": "Выберу кандидатов с самым привлекательным оформлением резюме.",
          "kz": "Безендірілуі ең тартымды түйіндемелерді таңдаймын.",
          "en": "Choose the candidates with the most attractive CV layouts."
        },
        {
          "ru": "Составлю общий рейтинг по первому впечатлению, не фиксируя критерии.",
          "kz": "Өлшемдерді жазбай, алғашқы әсер бойынша рейтинг жасаймын.",
          "en": "Rank candidates by first impression without recording criteria."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Матрица критериев помогает сравнивать релевантные навыки на одинаковой основе и объяснять выводы. Недостающие сведения нужно отмечать отдельно.",
        "kz": "Өлшемдер матрицасы қажетті дағдыларды бірдей негізде салыстырып, қорытындыны түсіндіруге көмектеседі. Жетіспейтін мәлімет бөлек белгіленеді.",
        "en": "A consistent rubric compares relevant skills on the same basis and makes decisions explainable. Flag missing evidence separately."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "writing": [
    {
      "scenario": {
        "ru": "Вы переводите меню на английский. В нём есть локальные названия блюд, а одно слово может обозначать разные ингредиенты. Состав блюда пока не уточнён.",
        "kz": "Мәзірді ағылшынша аударасыз. Жергілікті тағам атаулары бар, бір сөз әртүрлі ингредиентті білдіруі мүмкін. Құрамы нақтыланбаған.",
        "en": "You are translating a menu into English. It includes local dish names and an ambiguous ingredient. The recipe has not been clarified."
      },
      "q": {
        "ru": "Как сохранить точность перевода и не исказить информацию для гостя?",
        "kz": "Аударманың дәлдігін қалай сақтап, қонаққа қате ақпарат бермеуге болады?",
        "en": "How would you keep the translation accurate for the guest?"
      },
      "a": [
        {
          "ru": "Выберу самое распространённое значение слова без уточнения состава.",
          "kz": "Құрамын нақтыламай, ең кең тараған мағынаны таңдаймын.",
          "en": "Use the most common meaning without checking the recipe."
        },
        {
          "ru": "Уточню состав и контекст, согласую терминологию, затем проверю единообразие перевода.",
          "kz": "Құрам мен контексті нақтылап, терминдерді келісемін, кейін аударма бірізділігін тексеремін.",
          "en": "Clarify the ingredients and context, agree terminology and check consistency across the menu."
        },
        {
          "ru": "Уберу спорное слово из перевода, чтобы не задерживать сдачу.",
          "kz": "Мерзімді кешіктірмеу үшін даулы сөзді алып тастаймын.",
          "en": "Omit the ambiguous word to avoid delaying delivery."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Точность важнее догадки. Контекст, согласованная терминология и финальная вычитка помогают сохранить смысл оригинала.",
        "kz": "Дәлдік болжамнан маңызды. Контекст, келісілген терминдер және соңғы тексеру түпнұсқа мағынасын сақтайды.",
        "en": "Accuracy depends on context rather than guesswork. Agreed terminology and proofreading preserve the original meaning."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "catalog": [
    {
      "scenario": {
        "ru": "Магазин передал таблицу для 20 товарных карточек. У трёх товаров нет цены, у двух совпадает SKU. Срок сдачи — завтра.",
        "kz": "Дүкен 20 тауар карточкасына кесте берді. Үшеуінің бағасы жоқ, екеуінің SKU коды бірдей. Ертең тапсыру керек.",
        "en": "A shop supplied data for 20 product listings. Three prices are missing and two SKUs are duplicated. Delivery is due tomorrow."
      },
      "q": {
        "ru": "Как подготовить каталог, сохранив точность исходных данных?",
        "kz": "Бастапқы деректердің дәлдігін сақтап, каталогты қалай дайындайсыз?",
        "en": "How would you prepare the catalog while preserving data accuracy?"
      },
      "a": [
        {
          "ru": "Поставлю похожие цены и автоматически заменю SKU.",
          "kz": "Ұқсас бағаларды қойып, SKU кодтарын автоматты өзгертемін.",
          "en": "Insert similar prices and automatically replace the SKUs."
        },
        {
          "ru": "Отмечу проблемные строки, запрошу уточнения и сохраню исходные значения до согласования.",
          "kz": "Мәселелі жолдарды белгілеп, нақтылау сұраймын және келісілгенше бастапқы мәндерді сақтаймын.",
          "en": "Flag the affected rows, request clarification and preserve original values until changes are agreed."
        },
        {
          "ru": "Удалю эти товары, чтобы в файле не осталось пустых полей.",
          "kz": "Файлда бос өріс қалмауы үшін тауарларды жоямын.",
          "en": "Delete those products to eliminate empty fields."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Каталог должен отражать данные заказчика. Пробелы и конфликты отмечают, а изменения согласовывают и сохраняют в журнале.",
        "kz": "Каталог тапсырыс беруші деректерін көрсетуі керек. Бос орындар мен қайшылықтар белгіленіп, өзгерістер келісіліп журналға жазылады.",
        "en": "A catalog should reflect customer data. Flag gaps and conflicts, agree corrections and keep a change log."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "excel": [
    {
      "scenario": {
        "ru": "В таблице продаж 100 строк. Некоторые записи выглядят одинаково, но у них различаются дата или номер заказа. Заказчик просит убрать дубликаты.",
        "kz": "Сату кестесінде 100 жол бар. Кейбір жазбалар ұқсас, бірақ күні немесе тапсырыс нөмірі өзгеше. Қайталанатындарды жою сұралды.",
        "en": "A 100-row sales sheet contains similar-looking records with different dates or order IDs. The customer wants duplicates removed."
      },
      "q": {
        "ru": "Какой порядок действий позволит не потерять корректные продажи?",
        "kz": "Дұрыс сату жазбаларын жоғалтпау үшін қандай ретпен жұмыс істейсіз?",
        "en": "Which approach avoids deleting valid sales?"
      },
      "a": [
        {
          "ru": "Сохраню копию, уточню ключ уникальности, отмечу совпадения и удалю только согласованные дубликаты с журналом изменений.",
          "kz": "Көшірме сақтап, бірегейлік кілтін нақтылаймын, сәйкестіктерді белгілеп, тек келісілген қайталауларды журналмен жоямын.",
          "en": "Keep a copy, agree the unique-record key, flag matches and remove only confirmed duplicates with a change log."
        },
        {
          "ru": "Удалю все строки с одинаковой суммой, независимо от даты и заказа.",
          "kz": "Күні мен тапсырысқа қарамай, сомасы бірдей барлық жолды жоямын.",
          "en": "Delete every row with the same amount, regardless of date or order ID."
        },
        {
          "ru": "Отсортирую таблицу и оставлю по одной строке на каждого клиента.",
          "kz": "Кестені сұрыптап, әр клиентке бір жол қалдырамын.",
          "en": "Sort the sheet and keep one row per customer."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Совпадающая сумма не делает продажи дубликатами. Правила уникальности нужно согласовать, а изменения сделать проверяемыми.",
        "kz": "Бірдей сома жазбаны қайталау етпейді. Бірегейлік ережесін келісіп, өзгерістерді тексерілетін ету керек.",
        "en": "Equal amounts do not make records duplicates. Agree the uniqueness rule and make changes auditable."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ],
  "research": [
    {
      "scenario": {
        "ru": "Нужно сравнить пять конкурентов. У одного нет публичного прайса, у другого цена включает дополнительные услуги. Заказчик ожидает сопоставимую таблицу.",
        "kz": "Бес бәсекелесті салыстыру қажет. Біреуінің ашық бағасы жоқ, екіншісінің бағасына қосымша қызметтер кіреді. Салыстырмалы кесте күтілуде.",
        "en": "You need to compare five competitors. One has no public price; another bundles extra services. The customer expects a comparable table."
      },
      "q": {
        "ru": "Как отразить эти различия без выдуманных данных?",
        "kz": "Осы айырмашылықтарды деректерді ойдан шығармай қалай көрсетесіз?",
        "en": "How should these differences be represented without inventing data?"
      },
      "a": [
        {
          "ru": "Возьму среднюю цену по рынку и запишу её как цену первого конкурента.",
          "kz": "Нарықтағы орташа бағаны бірінші бәсекелестің бағасы ретінде жазамын.",
          "en": "Use the market average as the first competitor’s price."
        },
        {
          "ru": "Укажу отсутствие публичной цены, состав пакетов, ссылки и дату проверки; отмечу ограничения сравнения.",
          "kz": "Ашық бағаның жоқтығын, пакет құрамын, сілтемелер мен тексеру күнін көрсетіп, салыстыру шектеулерін белгілеймін.",
          "en": "Mark the missing public price, list bundle contents, sources and check dates, and explain comparison limits."
        },
        {
          "ru": "Сравню только числа, не учитывая, что входит в предложения.",
          "kz": "Ұсыныс құрамын ескермей, тек сандарды салыстырамын.",
          "en": "Compare just the numbers without considering what each offer includes."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Исследование должно отделять факты от неизвестного. Источники и ограничения помогают заказчику корректно прочитать сравнение.",
        "kz": "Зерттеуде деректер мен белгісіз мәліметтер бөлінуі керек. Дереккөздер мен шектеулер салыстыруды дұрыс түсінуге көмектеседі.",
        "en": "Research should distinguish known facts from missing information. Sources and limitations keep the comparison honest."
      }
    },
    {
      "scenario": {
        "ru": "Заказчик согласовал общий результат, но не указал формат файла и точный объём. В чате он пишет: «Сделайте как лучше».",
        "kz": "Жалпы нәтиже келісілді, бірақ файл форматы мен нақты көлемі көрсетілмеді. Чатта «Өзіңіз дұрыс деп жасаңыз» делінген.",
        "en": "The customer agreed the broad outcome but not the file format or exact scope. In chat they say, “Use your judgement.”"
      },
      "q": {
        "ru": "Что вы сделаете до начала основной работы?",
        "kz": "Негізгі жұмысты бастамас бұрын не істейсіз?",
        "en": "What would you do before starting the main work?"
      },
      "a": [
        {
          "ru": "Начну в удобном мне формате и обсудим детали после сдачи.",
          "kz": "Өзіме ыңғайлы форматта бастап, мәліметтерді тапсырған соң талқылаймын.",
          "en": "Start in my preferred format and discuss details after delivery."
        },
        {
          "ru": "Задам конкретные вопросы об объёме, формате и критериях готовности, затем зафиксирую договорённость в чате.",
          "kz": "Көлем, формат және дайындық өлшемдері туралы нақты сұрап, келісімді чатта сақтаймын.",
          "en": "Ask specific questions about scope, format and acceptance criteria, then record the agreement in chat."
        },
        {
          "ru": "Добавлю максимум материалов без согласования, чтобы точно превзойти ожидания.",
          "kz": "Күткеннен асыру үшін келіспей барынша көп материал қосамын.",
          "en": "Add as much extra material as possible without agreement to exceed expectations."
        }
      ],
      "correct": 1,
      "explanation": {
        "ru": "Уточнение требований уменьшает риск переделок. Важно согласовать проверяемый результат и оставить понятную запись договорённостей.",
        "kz": "Талаптарды нақтылау қайта жасауды азайтады. Тексерілетін нәтижені келісіп, түсінікті жазба қалдыру маңызды.",
        "en": "Clarifying requirements prevents avoidable revisions. Agree an observable outcome and keep a clear record."
      }
    },
    {
      "scenario": {
        "ru": "Для выполнения задачи вам передали внутренние материалы компании. Вы хотите показать знакомому пример, чтобы попросить совет.",
        "kz": "Тапсырмаға компанияның ішкі материалдары берілді. Кеңес алу үшін танысыңызға мысал көрсеткіңіз келеді.",
        "en": "You have been given internal company materials. You would like to show a sample to a contact for advice."
      },
      "q": {
        "ru": "Как поступить с материалами клиента?",
        "kz": "Клиент материалдарымен қалай әрекет етесіз?",
        "en": "How should you handle the customer’s materials?"
      },
      "a": [
        {
          "ru": "Отправлю исходники в личный чат, потому что знакомому можно доверять.",
          "kz": "Танысыма сенетіндіктен бастапқы файлды жеке чатқа жіберемін.",
          "en": "Send the originals in a private chat because I trust the contact."
        },
        {
          "ru": "Опубликую часть материалов без имени компании, не уточняя разрешение.",
          "kz": "Рұқсат сұрамай, компания атауын алып материалдың бір бөлігін жариялаймын.",
          "en": "Publish a sample without the company name and without asking."
        },
        {
          "ru": "Сначала согласую внешнюю передачу; при необходимости использую вымышленный пример без клиентских данных.",
          "kz": "Алдымен сыртқа беруді келісемін; қажет болса клиент деректерінсіз ойдан алынған мысал қолданамын.",
          "en": "Get permission before any external sharing; use a fictional example without customer data if needed."
        }
      ],
      "correct": 2,
      "explanation": {
        "ru": "Материалы используются в пределах согласованной задачи. Удаление названия компании само по себе не даёт разрешения делиться её данными.",
        "kz": "Материал келісілген тапсырма шегінде қолданылады. Компания атауын өшіру деректерін бөлісуге рұқсат бермейді.",
        "en": "Use materials only within the agreed scope. Removing a company name does not itself authorise sharing the data."
      }
    },
    {
      "scenario": {
        "ru": "Работа готова к сдаче. Внешне всё выглядит аккуратно, но вы ещё не сверили результат с брифом и не проверили открытие файлов.",
        "kz": "Жұмыс дайын әрі сырттай ұқыпты көрінеді, бірақ брифпен салыстыру және файлдардың ашылуын тексеру жасалмады.",
        "en": "The work looks polished and ready to submit, but you have not checked it against the brief or verified that the files open."
      },
      "q": {
        "ru": "Как подготовить результат к проверке QA-менеджером?",
        "kz": "Нәтижені QA-менеджер тексеруіне қалай дайындайсыз?",
        "en": "How should you prepare the delivery for the QA manager?"
      },
      "a": [
        {
          "ru": "Сверю каждый критерий, проверю файлы и доступы, приложу краткое описание выполненного и отмечу ограничения.",
          "kz": "Әр өлшеммен салыстырып, файлдар мен қолжетімділікті тексеремін, орындалғанын қысқаша жазып, шектеулерді белгілеймін.",
          "en": "Check every criterion, verify files and access, summarise the work and note any limitations."
        },
        {
          "ru": "Отправлю сразу — все проверки выполнит QA-менеджер.",
          "kz": "Бірден жіберемін, барлық тексеруді QA-менеджер жасайды.",
          "en": "Submit immediately and leave every check to the QA manager."
        },
        {
          "ru": "Приложу только красивый скриншот, чтобы быстрее получить одобрение.",
          "kz": "Тез мақұлдату үшін тек әдемі скриншот қосамын.",
          "en": "Attach only an attractive screenshot to get approval faster."
        }
      ],
      "correct": 0,
      "explanation": {
        "ru": "Самопроверка — часть выполнения задачи. QA оценивает результат по критериям, а понятная передача файлов помогает избежать лишних возвратов.",
        "kz": "Өзіндік тексеру — тапсырманың бөлігі. QA нәтижені өлшемдермен бағалайды, түсінікті файл беру артық қайтаруды азайтады.",
        "en": "Self-review is part of doing the work. QA checks the agreed criteria, and a clear handover reduces unnecessary returns."
      }
    }
  ]
};
for(const service of window.SBSeed.services){
 const key=service.skillGroup||service.id;
 if(banks[key])window.SBTestBank[service.id]=banks[key];
}
})();
