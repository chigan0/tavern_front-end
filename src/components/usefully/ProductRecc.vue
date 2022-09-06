<template>
  <div class="product-rec">

    <link rel="stylesheet" href="/css/products_rec.css">

    <section class="basket-page-recommendations">
         <div class="container">
            <h3 class="basket-page-recommendations__title section-title">рекомендации</h3>
            <div class="" v-if="preloaderState">
              <PreloaderComp />
            </div>

            <div class="basket-page-recommendations__content" v-else>
               <a href="#" class="basket-page-recommendation" v-for="id in shuffle" v-bind:key="id"><router-link :to="'/product/'+id">
                 <picture><source :srcset="backUrl+'/'+productsList[id].icon_path" type="image/webp">
                   <img :src="backUrl+'/'+productsList[id].icon_path" alt="image" class="basket-page-recommendation__image">
                 </picture>
                 <h5 class="basket-page-recommendation__subtitle">World of Warcraft Classic</h5>
                 <h4 class="basket-page-recommendation__title">{{productsList[id].title}}</h4>
                 <div class="basket-page-recommendation__actions">
                    <p class="basket-page-recommendation__price">{{productsList[id].price_in_rub}} ₽ </p>
                    <router-link :to="'/product/'+id"><a href="#" class="basket-page-recommendation__link">Подробнее</a></router-link>
                 </div>
               </router-link></a>

             </div>
         </div>
      </section>
  </div>
</template>


<script>
  import PreloaderComp from '@/components/usefully/PreloaderComp.vue';

  export default{
    name: 'ProductRecc',
    components:{
      PreloaderComp
    },
    computed:{
      categoryList(){return this.$store.getters.CATEGORY_LIST;},
      backUrl(){return this.$store.getters.BACK_END_URL;}
    },
    data(){
      return {
        productsList: {},
        shuffle: [],
        preloaderState: true
      }
    },
    created(){
      this.getReccProducts()
    },
    methods:{
      getReccProducts: async function(){
        this.axios.get('/product/recomend')
        .then((res)=>{
          let data_keys = (Object.keys(res.data));
          this.preloaderState = false;

          if (data_keys.length > 0)
            this.shuffle = data_keys.sort(() => String(Math.random() - 0.5))

          this.productsList = res.data;
        })
      }
    }
  }
</script>
