<template id="">
  <div class="new-order">
    <h3 style="padding: 20px 0 20px 0;">Поиск заказа</h3>
    <div class="" style="padding: 0 0 15px 0;">
      <input type="text" class="input_mode" v-model="orderNumber">
    </div>
    <span>{{orderNumber.length}}/6</span>

    <div class="" v-if="searchState" style="padding: 25px 0 25px 0;">
      <div class="" v-for="(prod, id) in productData" v-bind:key="id" style="padding: 3.5px 3.5px 0 0">
        <span class="text_corect">{{prod.title}}</span>
        <span class="text_corect">{{prod.category}}</span>
        <span class="text_corect">{{prod.price}}</span>
      </div>

      <div class="" style="padding: 25px 0 25px 0;">
        <div class="" v-if="orderData.order_completed">
          <h4>Заказ успешно выполнен</h4>
        </div>

        <div v-else>
          <h4>Статус оплатый: {{(orderData.payment_status) ? 'Оплачено': 'Не оплаченно'}}</h4>
          <h4>Статус заказа: {{(orderData.work_status) ? 'В работе' : 'Создан'}}</h4>
        </div>

        <h4>Дата созданния: {{orderData.create_data}}</h4>
        <h4>Общая стоймасть: {{orderData.total_amount}} ₽</h4>
      </div>

      <div class="" v-if="!orderData.order_completed">
        <a href="#" v-if="!orderData.payment_status && !orderData.work_status" @click="getWork(orderNumber)">Приступить к выполнению</a>
        <a href="#" v-else @click="closeOrder(orderNumber)">Завершить заказ</a>
      </div>

    </div>

  </div>
</template>

<script>
  export default{
    name: 'NewOrder',
    data(){
      return {
        orderNumber: "",
        searchState: false,
        productData: {},
        orderData: {}
      }
    },
    methods:{
      searchOrder: function(orderNumber){
        this.axios.get('/search/open/orders?order_number='+orderNumber)//5VL64X
        .then((res)=>{
          if (Object.keys(res.data).length > 0){
            this.productData = res.data.product_history;
            this.orderData = res.data.order_history;
            this.searchState = true
          }
        })
      },
      getWork: function(orderNumber){
        this.axios.get('/order/work?order_number='+orderNumber)
        .then(()=>{
          this.orderData.payment_status = true;
          this.orderData.work_status = true;
        })
      },
      closeOrder: function(orderNumber){
        this.axios.put('/order/work?order_number='+orderNumber)
        .then(()=>{
          this.orderData.order_completed = true;
        })
      },
      reseteState: function(){
        this.searchState = false;
        this.productData = {};
        this.orderData = {};
      }
    },
    watch:{
      orderNumber(newValue, oldValue){
        this.reseteState();

        if (newValue.length > 6)
          this.orderNumber = oldValue;

        if (newValue.length === 6)
          this.searchOrder(this.orderNumber);
      }
    }
  }
</script>

<style media="screen">
  .text_corect{
    padding: 0 15px 0 0;
  }
</style>
