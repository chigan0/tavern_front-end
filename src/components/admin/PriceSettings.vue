<template>
  <div class="price-settings">

    <div class="" style="padding: 0 0 15px 0;">
      <h3 id="title-style">Рубль</h3>
      <span>Курс рубля <span style="font-weight: bold;">{{rubExchangeRate}}</span> при расчёте цен</span>
      <a href="#" @click="rubExchangeRateChange = !rubExchangeRateChange"><span id="block-sharp-price">Изменить</span></a>

      <div class="" v-if="rubExchangeRateChange" style="padding: 15px 0 0 0;">
        <label>Ведите курс рубля</label>
        <div class="" id="block-sharp_el">
          <input type="number" class="input_mode" v-model="rubExchangeRate">
        </div>

        <a href="#" @click="changeData('rub_exchange', rubExchangeRate).then(()=> {rubExchangeRateChange=false;})">Изменить</a>
      </div>
    </div>

    <div class="">
      <h3 id="title-style">Steam</h3>
      <span>Наценка <span style="font-weight: bold;">{{steamMargin}}%</span></span>
      <a href="#" @click="steamMarginChange = !steamMarginChange"><span id="block-sharp-price">Изменить</span></a>

      <div class="" v-if="steamMarginChange" style="padding: 15px 0 0 0;">
        <label>Введите сумму наценки</label>
        <div class="" id="block-sharp_el">
          <input type="number" class="input_mode" v-model="steamMargin">
        </div>

        <a href="#" @click="changeData('steam_margin', steamMargin).then(()=> {steamMarginChange=false;})">Изменить</a>
      </div>
    </div>
  </div>
</template>


<script>
  export default{
    name: 'PriceSettings',
    computed:{
      steam(){return this.$store.getters.STEAM_MARGIN;}
    },
    data(){
      return{
        rubExchangeRateChange: false,
        steamMarginChange: false,
        steamMargin: 0,
        rubExchangeRate: 0.0,
      }
    },
    async created(){
      this.$store.dispatch('getSteamMargin');
      this.rubExchangeRate = await this.getMargin('rub_exchange_rate');
      this.steamMargin = this.steam;
    },
    methods:{
      async getMargin(product){
        let res = await this.axios.get('/margin?product='+product)
        return res.data
      },
      changeData: async function(name, value){
        this.axios.patch(`/margin?${name}=${value}`)
      }
    },
  }
</script>


<style media="screen">

  #title-style{
    padding: 10px 0 10px 0;
    color: #f06966;
  }

  #block-sharp-price{
    padding: 0 10px 0 10px;
    color: #f06966;
  }

</style>
