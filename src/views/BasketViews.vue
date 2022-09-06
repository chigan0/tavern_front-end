<template>
  <div class="basket-views">
    <link rel="stylesheet" href="css/basket.css">


    <div class="">
        <main class="basket-page">
        <section class="basket-page-first-block">
          <div class="container">
             <a href="#" @click="this.$router.push('/catalog')" class="basket-page-first-block-top__back-link _mobile">Вернуться к каталогу <picture><source srcset="img/basket-page-loong-arrow.svg" type="image/webp"><img src="img/basket-page-loong-arrow.svg" alt="arrow"></picture></a>
             <h2 class="section-title basket-page-first-block__title">корзина</h2>
             <div class="basket-page-first-block__top basket-page-first-block-top">
                <div class="basket-page-first-block-top__actions">
                   <input id="basket-page-first-block-top-select-all" @click="allProducts" v-model="allProductsState" type="checkbox">
                   <label for="basket-page-first-block-top-select-all">
                      <span></span>
                      Выбрать все
                   </label>
                   <div class="basket-page-first-block-top__text-block">
                      <p class="basket-page-first-block-top__text">Выбрано:</p>
                      <span class="basket-page-first-block-top__amount">{{productSelected.length}} товара</span>
                   </div>
                   <div class="basket-page-first-block-top__text-block">
                      <p class="basket-page-first-block-top__text">Всего в корзине:
                         </p>
                      <span class="basket-page-first-block-top__amount">{{basketCount}}</span>
                   </div>
                </div>
                <a href="#" @click="this.$router.push('/catalog')" class="basket-page-first-block-top__back-link _desk">Вернуться к каталогу <picture><source srcset="img/basket-page-loong-arrow.svg" type="image/webp"><img src="img/basket-page-loong-arrow.svg" alt="arrow"></picture></a>
             </div>
             <div class="basket-page-first-block__content basket-page-first-block-content">

               <div class="" v-if="preloaderState">
                 <preloader />
               </div>

                <div class="basket-page-first-block-content__left" v-else>

                  <div class="" v-for="(product,id) in productList" v-bind:key="id">

                     <div class="basket-page-first-block-content__item basket-page-item">
                       <input type="checkbox" :id="'basket-page-item-'+id" :value="id" v-model="productSelected">
                       <label :for="'basket-page-item-'+id">
                           <div class="basket-page-item__check"></div>
                           <div class="basket-page-item__content basket-page-item-content">
                              <div class="basket-page-item-content__image">
                                 <picture>
                                   <source :srcset="backUrl+'/'+product.icon_path" type="image/webp">
                                     <img :src="backUrl+'/'+product.icon_path" alt="item image">
                                  </picture>
                              </div>
                              <div class="basket-page-item-content__text-block">
                                 <h5 class="basket-page-item-content__subtitle">{{(categoryList[product.category_id] !== undefined) ? categoryList[product.category_id].title : 'World Of Warcraft'}}</h5>
                                 <h4 class="basket-page-item-content__title">{{product.title}}</h4>
                                 <p class="basket-page-item-content__subtext">{{product.product_type}}</p>
                                 <div class="basket-page-item__mobile-actions _mobile-1">
                                    <p class="basket-page-item-content__price ">{{product.price_in_rub}} ₽ </p>

                                    <button class="basket-page-item__delete" @click="delBasket(id)"></button>
                                 </div>
                              </div>
                              <p class="basket-page-item-content__price _desk-1">{{product.price_in_rub}} ₽ </p>
                           </div>
                        </label>

                        <button class="basket-page-item__delete _desk-1" @click="delBasket(id)"></button>
                     </div>
                   </div>

                </div>

                <div class="basket-page-first-block-content__right">
                   <div class="basket-page-first-block-content__count basket-page-first-block-content-count">
                      <h4 class="basket-page-first-block-content-count__title">Cумма к оплате</h4>
                      <div class="basket-page-first-block-content-count__text-block">
                         <p class="basket-page-first-block-content-count__text">Товаров на сумму:</p>
                         <p class="basket-page-first-block-content-count__price">{{totalAmount}} ₽ </p>
                      </div>
                      <div class="basket-page-first-block-content-count__input-wrapper">
                        <input type="text" placeholder="Код гильдии или скидочный код" v-model="guildCode" class="basket-page-first-block-content-count__input">
                        <p v-if="guildCodeWarningState" class="basket-page-first-block-content-count__input-warning">{{guildCodeWarningMessage}}</p>
                      </div>
                      <div class="">
                        <div class="" v-if="createOrderPreloader">
                          <preloader />
                        </div>

                        <div class="" v-else>

                          <button v-if="authState" type="button" class="basket-page-first-block-content-count__btn" @click="createOrder">Оформить заказ</button>
                          <router-link to="/sign" v-else><button type="button" class="basket-page-first-block-content-count__btn">Авторизоваться</button></router-link>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>
       <recc/>
     </main>
   </div>
  </div>
</template>

<script>
  import ProductRecc from '@/components/usefully/ProductRecc.vue';
  import PreloaderComp from '@/components/usefully/PreloaderComp.vue';

  export default{
    computed: {
      backUrl(){return this.$store.getters.BACK_END_URL;},
      basket(){let basket = this.$store.getters.BASKET_ITEM; return basket},
      authState(){return this.$store.getters.AUTH_STATE},
      categoryList(){console.log(this.$store.getters.CATEGORY_LIST); return this.$store.getters.CATEGORY_LIST;},
    },
    components:{
      recc: ProductRecc,
      preloader: PreloaderComp,
    },
    data(){
      return{
        componentSelected: null,
        preloaderState: true,
        createOrderPreloader: false,
        allProductsState: false,
        guildCodeWarningState: false,
        guildCodeWarningMessage: "",
        guildCode: "",
        guildCodeData: {},
        productList:{},
        productSelected:[],
        totalAmount: 0,
        basketCount: 0,
        orderNumber: "",
      }
    },
    created(){
       this.getProducts(this.basket.join());
       this.$store.dispatch('getCategory');
    },
    methods:{
      allProducts:function(){(!this.allProductsState) ? this.productSelected = this.basket : this.productSelected = [];},
      createOrder: function(){
        this.guildCodeWarningState = false;

        if (this.productSelected.length > 0){
          this.createOrderPreloader = true;
          this.axios.post('/orders/product', {"order_list": this.productSelected, "guild_code": this.guildCode})
          .then((res)=> {
            this.cleanBasket();
            this.createOrderPreloader = false;
            this.$router.push('/oreders/result/'+res.data.order_number)
          })
          .catch((err)=>{
            this.createOrderPreloader = false;
            this.guildCodeWarningState = true;

            if (err.response.status === 409)
              this.guildCodeWarningMessage = 'У вас открыто более 5 ордеров';

          })
        }

      },
      cleanBasket: function(){
        let newArray = this.basket.filter((elem)=>{
          return this.productSelected.indexOf(elem) === -1
        })
        this.$store.commit('SET_BASKET_ITEM', newArray);
      },
      getProducts:function(params){
        if (params){
          this.axios.get('/product?products_id='+params)
          .then((res)=>{
            this.preloaderState = false;
            if (Object.keys(res.data).length === 0){
              this.$store.dispatch('basketSettings', {'type': 'cleaning'});
              return
            }
            this.productList = res.data;
          })
        }
        else
          this.preloaderState = false;
      },
      checkedGuildCode: function(guildCode){
        this.guildCodeWarningState = false;
        this.axios.get('/guild/code/check?code='+guildCode)
        .then((res)=>{
          this.guildCodeData = res.data;
          this.calculateAmount(this.productSelected);
        })
        .catch((err)=>{
          if (err.response.status === 404){
            this.guildCodeWarningState = true;
            this.guildCodeWarningMessage = "Невалидный код"
          }

        })
      },
      delBasket(id){
        if (this.totalAmount !== 0)
          this.totalAmount -= this.productList[id].price_in_rub;

        this.$store.dispatch('basketSettings', {'id': id, 'type': 'del'});
        delete this.productList[id];
        this.basketCount -= 1;
      },
      calculateAmount: function(products){
        this.totalAmount = 0;
        products.forEach((elem)=>{
          this.totalAmount +=  this.productList[elem].price_in_rub;
        })
        if (Object.keys(this.guildCodeData).length > 0 && this.totalAmount !== 0)
          this.totalAmount -= this.totalAmount / 100 * this.guildCodeData.discount_percent;
          this.totalAmount = Math.ceil(this.totalAmount);
      },
    },
    watch:{
      productList(){this.basketCount = Object.keys(this.productList).length;},
      guildCode(){
        if (this.guildCode.length === 8)
          this.checkedGuildCode(this.guildCode)

        else{
          this.guildCodeData = {};
          this.calculateAmount(this.productSelected)
        }
      },
      productSelected(){
        this.totalAmount = 0;
        this.calculateAmount(this.productSelected);
      }
    }
  }
</script>

<style media="screen">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
