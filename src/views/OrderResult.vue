<template>
  <div class="order_result">
    <link rel="stylesheet" href="/css/order_result.css">

    <main class="order-result">
        <div class="container">
           <div class="order-result__content">
              <div class="order-result__text-block">
                 <h2 class="order-result__title section-title">Спасибо за заказ</h2>
                 <div class="order-result__inf-block">
                    <p class="order-result__text">№ заказа
                       </p>
                    <p class="order-result__bold-text">{{orderNumber}}</p>
                 </div>
                 <div class="order-result__inf-block">
                    <p class="order-result__text">Статус заказа
                       </p>
                    <p class="order-result__bold-text">Создан</p>
                 </div>
                 <div class="order-result__instructions order-result-instructions">
                    <h3 class="order-result-instructions__title">Инструкция по оплате</h3>
                    <p class="order-result-instructions__text order-result__text">
                          Поздравляем! Ваш заказ был успешно создан! Пожалуйста перейдите в наш дискорд канал и сообщите свой номер заказа! Эта процедура необходима для начала выполнения вашего заказа!
                       </p>
                    <p class="order-result-instructions__text order-result__text">Просим вас обратить внимание, что после создания заказа у вас есть двое суток для связи с трактирщиком. В противном случае ваш заказ будет автоматически удалён!</p>
                 </div>
                 <router-link to="/catalog"><button class="order-result__btn">Перейти в каталог</button></router-link>
              </div>
              <div class="order-result__image">
                 <picture><source srcset="/img/order-result-page-image.webp" type="image/webp"><img src="/img/order-result-page-image.png" alt="content image"></picture>
              </div>
           </div>
        </div>
     </main>

  </div>
</template>

<script>

  export default{
    data(){
      return {
        orderNumber: ""
      }
    },
    created(){this.orderNumber = this.$route.params.orderNumber;}
  }

</script>
