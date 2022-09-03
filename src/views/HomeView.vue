<template>
  <div class="home">
    <link rel="stylesheet" href="css/home.css">

    <aside class="aside">
       <div class="aside-content">
          <a href="#first-block" class="aside-content__number">01

             <svg class="progress-ring"  >
                <circle class="progress-ring__circle" stroke="white" stroke-width="2" fill="transparent" r="18" cx="19" cy="19"></circle>
              </svg>
          </a>
          <a href="#about" class="aside-content__number">02
                         <svg class="progress-ring"  >
                <circle class="progress-ring__circle" stroke="white" stroke-width="2" fill="transparent" r="18" cx="19" cy="19"></circle>
                </svg>
          </a>
          <a href="#advantages" class="aside-content__number">03
                         <svg class="progress-ring"  >
                <circle class="progress-ring__circle" stroke="white" stroke-width="2" fill="transparent" r="18" cx="19" cy="19"></circle>
                </svg>
          </a>
          <a href="#how-we-work" class="aside-content__number">04
                         <svg class="progress-ring"  >
                <circle class="progress-ring__circle" stroke="white" stroke-width="2" fill="transparent" r="18" cx="19" cy="19"></circle>
                </svg>
          </a>
          <a href="#reviews" class="aside-content__number">05
                         <svg class="progress-ring"  >
                <circle class="progress-ring__circle" stroke="white" stroke-width="2" fill="transparent" r="18" cx="19" cy="19"></circle>
                </svg>
          </a>
       </div>
    </aside>

    <section id="first-block" class="first-block">
       <div class="container">
          <div class="first-block__content first-block-content">
             <a :href="discordUrl" class="first-block__discord-link" target="blanl_">
               <img src="img/discord-image.svg" alt="discord-link">
             </a>
             <div class="first-block-content__text-block">
                <h1 class="first-block-content__title">azeroth tavern</h1>
                <p class="first-block-content__text">Добро пожаловать в нашу таверну путник! Присаживайся по удобней, осмотрись и выбери что тебе по душе!</p>
             </div>
             <router-link to="/catalog"><button class="first-block-content__btn green-btn">Открыть каталог</button></router-link>
          </div>
          <a  href="#about" class="first-block__scroll-link">
             Вниз
             <picture><source srcset="img/double-arrow.svg" type="image/webp"><img src="img/double-arrow.svg" alt="arrow"></picture>
          </a>
       </div>
    </section>
    <section id="about" class="about">
       <div class="container">
          <div class="about__content about-content">
             <div class="about__image"><picture><source srcset="img/about-content-image.webp" type="image/webp"><img src="img/about-content-image.png" alt="content-image"></picture></div>
             <div class="about__text-block">
                <h2 class="section-title about__title">О нас</h2>
                <p class="about__text">Мы молодая начинающая команда, целью которой является предоставление возможности простым игрокам (коими мы и сами являемся) беспрепятственную оплату подписки World of Warcraft и все сопутствующие товары, а так же пополнение Steam кошелька и покупка игр на данной платформе.  На создание этого сайта нас и подтолкнуло благородное чувство помощи  игрокам в это непростое время!</p>
                <p class="about__text"></p>
             </div>
          </div>
       </div>
    </section>
    <main class="main">


       <section id="advantages" class="advantages">
          <div class="container">
                <h2 class="section-title advantages__title">преимущества</h2>
                <div class="advantages__content advantages-content">
                   <div class="advantages-content__item advantage">
                      <div class="advantage__title-block">
                         <span class="advantage__title-block-number">01</span>
                         <h3 class="advantage__title">Гарантия качества</h3>
                      </div>
                      <p class="advantage__text">Для нас важен каждый покупатель, поэтому на все товары действует гарантия в случае бана или непредвиденных ситуаций.</p>
                   </div>
                   <div class="advantages-content__item advantage">
                      <div class="advantage__title-block">
                         <span class="advantage__title-block-number">02</span>
                         <h3 class="advantage__title">Приятная цена на все товары</h3>
                      </div>
                      <p class="advantage__text">У нас нет заоблачных цен, как на других сервисах. Потому что мы отдаем себе отчет, что не каждый может себе позволить большие затраты на любимую игру! </p>
                   </div>
                   <div class="advantages-content__item advantage">
                      <div class="advantage__title-block">
                         <span class="advantage__title-block-number">03</span>
                         <h3 class="advantage__title">Доброжелательная поддержка</h3>
                      </div>
                      <p class="advantage__text">Для нас является очень важным что думают о нас наши клиенты и мы стараемся развиваться для вас!</p>
                   </div>
                   <div class="advantages-content__item advantage">
                      <div class="advantage__title-block">
                         <span class="advantage__title-block-number">04</span>
                         <h3 class="advantage__title">Удобные способы оплаты</h3>
                      </div>
                      <p class="advantage__text">Для покупки доступны все удобные для вас возможности оплаты!</p>
                   </div>
                   <div class="advantages-content__item advantage">
                      <div class="advantage__title-block">
                         <span class="advantage__title-block-number">05</span>
                         <h3 class="advantage__title">Обратная связь с игроками</h3>
                      </div>
                      <p class="advantage__text">С учетом ваших замечаний и пожеланий мы будем развиваться вместе с вами</p>
                   </div>
                   <div class="advantages-content__item advantage">
                      <div class="advantage__title-block">
                         <span class="advantage__title-block-number">06</span>
                         <h3 class="advantage__title">Система лояльности и скидок</h3>
                      </div>
                      <p class="advantage__text">Несмотря на адекватную цену наших товаров, мы приятно удивим вас нашей системой лояльности и скидок</p>
                   </div>
                </div>
          </div>
       </section>


       <section id="how-we-work" class="how-we-work">
          <div class="container">
             <h2 class="how-we-work__title section-title">как мы работаем</h2>
             <div class="how-we-work__content how-we-work-content">
                <div class="how-we-work-content__position-block">
                   <div class="how-we-work-content__item">
                      <div class="how-we-work-content__title-block">
                         <h3 class="how-we-work-content__title">шаг </h3><span>1</span>
                      </div>
                      <p class="how-we-work-content__text">Добавляйте интересующие Вас товары в корзину</p>
                   </div>
                   <div class="how-we-work-content__item">
                      <div class="how-we-work-content__title-block">
                         <h3 class="how-we-work-content__title">шаг </h3><span>2</span>
                      </div>
                      <p class="how-we-work-content__text">Оформляете заказ и получаете номер своего заказа</p>
                   </div>
                   <div class="how-we-work-content__image">

                      <picture><source srcset="img/how-we-work-content-image.webp" type="image/webp"><img class="" src="img/how-we-work-content-image.png" alt="content-image"></picture>
                   </div>
                </div>
                <div class="how-we-work-content__position-block">
                   <div class="how-we-work-content__item">
                      <div class="how-we-work-content__title-block">
                         <h3 class="how-we-work-content__title">шаг </h3><span>3</span>
                      </div>
                      <p class="how-we-work-content__text">Переходите в наш Discord канал в комнату ожидания</p>
                   </div>
                   <div class="how-we-work-content__item">
                      <div class="how-we-work-content__title-block">
                         <h3 class="how-we-work-content__title">шаг </h3><span>4</span>
                      </div>
                      <p class="how-we-work-content__text">С вами связывается трактирщик, и вы сообщаете ему кодовое слово (номер заказа) и оплачиваете свой заказ</p>
                   </div>
                </div>
                <div class="how-we-work-content__position-block">
                   <div class="how-we-work-content__item">
                      <div class="how-we-work-content__title-block">
                         <h3 class="how-we-work-content__title">шаг </h3><span>5</span>
                      </div>
                      <p class="how-we-work-content__text">Пьете вкусный напиток, в то время как готовится ваш заказ</p>
                   </div>
                   <div class="how-we-work-content__item">
                      <div class="how-we-work-content__title-block">
                         <h3 class="how-we-work-content__title">шаг </h3><span>6</span>
                      </div>
                      <p class="how-we-work-content__text">Оставляете свой отзыв о работе сервиса и качестве работы</p>
                   </div>
                </div>
             </div>
          </div>
       </section>
    </main>

    <section id="reviews" class="reviews">

          <div class="container">

             <h2 class="section-title reviews__title">Отзывы</h2>
          </div>
          <div class="container">
             <div class="swiper reviews__content reviews-content">
                <div class="swiper-wrapper">
                   <h3 class="reviews-content__hide-title">Все Отзывы в нашем дискорд канале<br>

                   </h3>
                <!--код слайдов, если понадобится-->
                  <!-- <div class="swiper-slide review">
                      <div class="review__content">
                         <div class="review__date">21.06.2022</div>
                         <div class="review__text-block">
                            <h4 class="review__title">“Все замечательно!”</h4>
                            <p class="review__text">Первой разумной расой, упоминаемой в официальной истории вселенной, являются титаны — возникшие как «души миров». Вселенная включает множество миров, объединённых хаотической воронкой, которая носит название Круговерть Пустоты. Переход между мирами можно осуществить с помощью порталов. </p>
                            <div class="review__reviewer-name">Анастасия</div>
                         </div>
                      </div>
                  </div>
                  <div class="swiper-slide review">
                      <div class="review__content">
                         <div class="review__date">21.06.2022</div>
                         <div class="review__text-block">
                            <h4 class="review__title">“Все замечательно!”</h4>
                            <p class="review__text">Первой разумной расой, упоминаемой в официальной истории вселенной, являются титаны — возникшие как «души миров». Вселенная включает множество миров, объединённых хаотической воронкой, которая носит название Круговерть Пустоты. Переход между мирами можно осуществить с помощью порталов. </p>
                            <div class="review__reviewer-name">Анастасия</div>
                         </div>
                      </div>
                  </div>
                  <div class="swiper-slide review">
                      <div class="review__content">
                         <div class="review__date">21.06.2022</div>
                         <div class="review__text-block">
                            <h4 class="review__title">“Все замечательно!”</h4>
                            <p class="review__text">Первой разумной расой, упоминаемой в официальной истории вселенной, являются титаны — возникшие как «души миров». Вселенная включает множество миров, объединённых хаотической воронкой, которая носит название Круговерть Пустоты. Переход между мирами можно осуществить с помощью порталов. </p>
                            <div class="review__reviewer-name">Анастасия</div>
                         </div>
                      </div>
                  </div>
                  <div class="swiper-slide review">
                      <div class="review__content">
                         <div class="review__date">21.06.2022</div>
                         <div class="review__text-block">
                            <h4 class="review__title">“Все замечательно!”</h4>
                            <p class="review__text">Первой разумной расой, упоминаемой в официальной истории вселенной, являются титаны — возникшие как «души миров». Вселенная включает множество миров, объединённых хаотической воронкой, которая носит название Круговерть Пустоты. Переход между мирами можно осуществить с помощью порталов. </p>
                            <div class="review__reviewer-name">Анастасия</div>
                         </div>
                      </div>
                  </div>
                  <div class="swiper-slide review">
                      <div class="review__content">
                         <div class="review__date">21.06.2022</div>
                         <div class="review__text-block">
                            <h4 class="review__title">“Все замечательно!”</h4>
                            <p class="review__text">Первой разумной расой, упоминаемой в официальной истории вселенной, являются титаны — возникшие как «души миров». Вселенная включает множество миров, объединённых хаотической воронкой, которая носит название Круговерть Пустоты. Переход между мирами можно осуществить с помощью порталов. </p>
                            <div class="review__reviewer-name">Анастасия</div>
                         </div>
                      </div>
                  </div> -->



                </div>

                <div class="swiper-pagination review-pagination"></div>

             </div>
             <div class="swiper-button-next review-button-next">
                <picture><source srcset="img/arrow-to-right.svg" type="image/webp"><img src="img/arrow-to-right.svg" alt="arrow"></picture>
             </div>
             <div class="swiper-button-prev review-button-prev">
                <picture><source srcset="img/arrow-to-left.svg" type="image/webp"><img src="img/arrow-to-left.svg" alt="arrow"></picture>
             </div>
          </div>

    </section>
</div>
</template>



<script>
  export default{
    computed: {discordUrl(){return this.$store.getters.DISCORD_URL}},
    created(){
      let code = this.$route.query.ref;
      if (code)
        this.sendRefCode(code);

    },
    methods:{
      sendRefCode: async function(refCode){
        this.axios.get('/ref/code?code='+refCode)
      }
    }
  }
</script>
