<template>
  <div class="orders-history">
    <link rel="stylesheet" href="/css/orders_history.css">

    <main class="orders">
      <div class="container">
         <h2 class="orders__title section-title">заказы</h2>
         <div class="orders__content">
          <div class="" v-if="preloaderState">
            <preloader/>
          </div>

          <div v-else v-for="(orderNumber, orderNum) in orderList" v-bind:key="orderNumber.id">
            <div class="order">
               <div class="order__header order-header ">
                  <p class="order-header__number">Заказ {{orderNum}}</p>
                  <p class="order-header__date">{{orderInfo[orderNum].create_data}}</p>
                  <p class="order-header__price">{{orderInfo[orderNum].total_amount}} ₽ </p>
               </div>
               <div class="order__content order-content">

                  <div class="order-content__items">
                    <div v-for="(orderData, id) in orderNumber" v-bind:key="id">

                     <div class="order-content-item">
                        <div class="order-content-item__image">

                           <picture>
                             <source :srcset="backUrl+'/'+orderData.img_path" type="image/webp">
                               <img :src="backUrl+'/'+orderData.img_path" alt="content image" >
                             </picture>
                        </div>
                        <div class="order-content-item__text-block">
                           <h5 class="order-content-item__subtitle">{{orderData.category}}</h5>
                           <h4 class="order-content-item__title">{{orderData.title}}</h4>
                           <p class="order-content-item__price">{{orderData.price}} ₽</p>
                        </div>
                     </div>
                   </div>
                  </div>

                  <div class="order-content__information order-content-information">
                        <div class="" v-if="orderInfo[orderNum].order_completed">
                          <p class="order-content-information__payment-status _completed">
                            Выполнен
                          </p>
                        </div>

                        <p v-else class="order-content-information__payment-status _completed">
                          {{(orderInfo[orderNum].work_status) ? 'В работе' : 'Создан'}}
                        </p>
                        <p class="order-content-information__status _delivered">
                          {{(!orderInfo[orderNum].payment_status) ? 'Не оплачено' : 'Оплачено'}}
                        </p>
                        <button type="button" v-if="orderInfo[orderNum].delete_state" @click="delOrder(orderNum)" class="order-content-information__delete-btn"></button>
                  </div>

               </div>
            </div>
            <br>
            </div>
         </div>
      </div>
   </main>

  </div>
</template>

<script>
  import PreloaderComp from '@/components/usefully/PreloaderComp.vue';

  export default{
    components:{
      preloader: PreloaderComp
    },
    computed:{
      categoryList(){return this.$store.getters.CATEGORY_LIST;},
      backUrl(){return this.$store.getters.BACK_END_URL;}
    },
    data(){
      return{
        preloaderState: false,
        orderList: {},
        orderInfo: {}
      }
    },
    created(){
      this.getOrdersHistory()
    },
    methods:{
      getOrdersHistory: function(){
        this.preloaderState = true;
        this.axios.get('/orders')
        .then((res)=> {
          this.orderList = res.data.order_list;
          this.orderInfo = res.data.order_info;
        })
        .finally(()=>{
          this.preloaderState = false;
        })
      },
      delOrder: function(orderNumber){
        this.axios.delete("/orders/product?order_number="+orderNumber)
        .then(()=>{
          delete this.orderList[orderNumber];
          delete this.orderInfo[orderNumber];
        })
      }
    }
  }
</script>
