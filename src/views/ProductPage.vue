<template>
  <div class="product-page">
    <link rel="stylesheet" href="/css/product_page.css">

    <section class="product-page-first-block" :style="'background-image: url('+backUrl+'/'+productData.img_path+');'">
   <div class="container">

     <SearchProduct/>

      <div class="product-page-first-block__content product-page-first-block-content">
         <div class="product-page-first-block-content__price">{{productData.price_in_rub}} ₽</div>
         <div class="product-page-first-block-content__text-block">
            <h2 class="product-page-first-block-content__title">{{productData.title}}</h2>
            <p class="product-page-first-block-content__text">MMORPG (многопользовательская сетевая ролевая игра)</p>
         </div>

         <div class="">
            <button v-if="!addBasketState" class="product-page-first-block-content__btn product-page-btn-1" @click="addBasket(productId)">Добавить в корзину</button>
              <router-link v-else to="/basket"><button class="product-page-first-block-content__btn product-page-btn-1">
                Перейти в корзину
              </button>
            </router-link>
         </div>

      </div>
   </div>
</section>
<main class="product-page-main">
   <section class="product-page-description">
      <div class="container">
         <div class="product-page-description__content product-page-description-content">
            <h3 class="product-page-description-content__title">{{this.descriptionTitle}}</h3>

            <div v-for="(desc, id) in description" v-bind:key="id">
              <p class="product-page-description-content__text">{{desc}}</p>
            </div>

            <div class="">
              <button v-if="!addBasketState" class="product-page-description-content__btn product-page-btn-1" @click="addBasket(productId)">Добавить в корзину</button>
                <router-link v-else to="/basket"> <button class="product-page-description-content__btn product-page-btn-1">
                  Перейти в корзину
                </button>
              </router-link>
            </div>

         </div>
      </div>
   </section>

   <ProductRecc/>

</main>

  </div>
</template>

<script>
  import ProductRecc from '@/components/usefully/ProductRecc.vue';
  import SearchProduct from '@/components/usefully/SearchProduct.vue';

  export default{
    name: 'ProductPage',
    components:{
      ProductRecc,
      SearchProduct
    },
    computed: {
      backUrl(){return this.$store.getters.BACK_END_URL;},
      basket(){return this.$store.getters.BASKET_ITEM;}
    },
    data(){
      return{
        addBasketState: false,
        productData:{},
        descriptionTitle: "",
        description: [],
        productId: 0
      }
    },
    created(){this.getProduct(this.$route.params.id);},
    methods:{
      async getProduct(id){
         if (id){
          this.axios.get('/product?products_id='+id).then((res) => {
            if(Object.keys(res.data).length === 0)
              this.$router.push('/notFound');

            this.productId = this.$route.params.id;
            this.productData = res.data[Object.keys(res.data)[0]];
            let text_filter = this.productData.description.split('\r\n').filter(function (el) {
              return el != '';
            });

            this.descriptionTitle = text_filter[0];
            text_filter.shift(0,1);
            this.description = text_filter;
            this.checkBasket(id);
          });
        }
      },
      addBasket(id){
        this.$store.dispatch('basketSettings', {'id': id, 'type': 'add'})
        this.checkBasket(id);
      },
      checkBasket(id){
        if (this.basket.indexOf(id) !== -1)
          return this.addBasketState = true;

        this.addBasketState = false;
      },
    },
    watch:{
      async "$route.params.id"(newValue, oldValue){
        if (newValue !== oldValue)
          this.getProduct(newValue)

        window.scrollTo(0,0);
      }
    }
}
</script>
