<template>
    <div class="admin-panel">
      <div class="admin-panel-select-block" style="padding: 0 0 15px 0;">
        <a href="#">
          <h3 :class="(component_selected === 'refCode') ? 'selected' : false"
            @click="component_selected = 'refCode';">
            Рекламные Ссылки
          </h3>
        </a>

        <a href="#">
          <h3 :class="(component_selected === 'guild') ? 'selected' : false"
            @click="component_selected = 'guild';">
            Код Гильдии
          </h3>
        </a>

        <a href="#">
          <h3 :class="(component_selected === 'category') ? 'selected' : false"
            @click="component_selected = 'category';">
            Категории
          </h3>
        </a>

        <a href="#">
          <h3 :class="(component_selected === 'product') ? 'selected' : false"
            @click="component_selected = 'product';">
              Товары
          </h3>
        </a>

        <a href="#">
          <h3 :class="(component_selected === 'newOrders') ? 'selected' : false"
            @click="component_selected = 'newOrders';">
              Поиск заказов
          </h3>
        </a>

        <a href="#">
          <h3 :class="(component_selected === 'settings_price') ? 'selected' : false"
            @click="component_selected = 'settings_price';">
              Настройка цен
          </h3>
        </a>

    </div>
    <div class="admin-panel-selected-component">
      <transition name="fade" mode="out-in">
        <component v-bind:is="component_selected"></component>
      </transition>
    </div>
  </div>
</template>

<script>
  import RefCode from '@/components/admin/RefCode.vue';
  import CategoryPanel from '@/components/admin/CategoryPanel.vue';
  import ProductPanel from '@/components/admin/ProductPanel.vue';
  import PriceSettings from '@/components/admin/PriceSettings.vue';
  import GuildCode from '@/components/admin/GuildCode.vue';
  import NewOrder from '@/components/admin/NewOrder.vue';

  export default{
    components:{
      refCode: RefCode,
      category: CategoryPanel,
      product: ProductPanel,
      settings_price: PriceSettings,
      guild: GuildCode,
      newOrders: NewOrder,
    },
    computed:{
      accessToken(){return this.$store.getters.ACCESS_TOKEN}
    },
    data(){
      return{
        component_selected: null,
      }
    },
    created(){},
    methods:{}
  }
</script>

<style media="screen">
  .body{
    min-height: 100%;
  }

  .selected{
    color: #6abe83;
  }

  a{
    text-decoration: none;
    color:#000000;
  }

  .admin-panel{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 1100px;
    margin-top: 150px;
  }

  .admin-panel-select-block{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .admin-panel-select-block h3{
    padding-left: 18px;
  }

  .input_mode{
    border: none;
    border-bottom: 2px solid #f06966;
  }
</style>
