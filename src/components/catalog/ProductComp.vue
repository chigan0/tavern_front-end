<template id="">
  <div class="product_list">

    <div class="c-page-main__tab first-tab">
      <div class="" v-if="preloaderState">
        <PreloaderComp />
      </div>

      <div class="" v-for="(product, id) in productList" v-bind:key="id" v-else>
        <div class="first-tab__item first-tab-item">
           <router-link :to="'/product/'+id"  class="first-tab-item__image">
              <picture>
                <source :srcset="backUrl+'/'+product.icon_path" type="image/webp">
                  <img :src="backUrl+'/'+product.icon_path" alt="image">
                </picture>
            </router-link>
            <h4 class="first-tab-item__subtitle">{{categoryList[product.category_id].title}}</h4>

           <h3 class="first-tab-item__title"><router-link :to="'/product/'+id">{{product.title}}</router-link></h3>
           <p class="first-tab-item__text">{{(product.description !== null) ? product.description.slice(0, 55)+'...' : 'Описание отсутствует'}}</p>
           <p class="first-tab-item__subtext">{{product.product_type}}</p>
           <div class="first-tab-item__actions">
              <p class="first-tab-item__price">{{product.price_in_rub}} ₽ </p>
              <button class="first-tab-item__buy-btn catalog-btn-1" @click="addBasket(id)">{{checkingBasket(id)}}</button>
           </div>
        </div>

       </div>

    </div>
    <button class="catalog-btn-1 c-page-main-first-tab__btn">покать больше</button>
  </div>
</template>

<script>
  import PreloaderComp from '@/components/usefully/PreloaderComp.vue';

  export default{
    components:{
      PreloaderComp
    },
    computed:{
      categoryList(){return this.$store.getters.CATEGORY_LIST;},
      backUrl(){return this.$store.getters.BACK_END_URL;},
      basket(){let basket = this.$store.getters.BASKET_ITEM; return basket}
    },
    props:{
      allProducts: Boolean,
      categoryId: String,
    },
    data(){
      return{
        productList: {},
        preloaderState: false,
      }
    },
    created(){this.getProducts()},
    methods:{
      addBasket(id){this.$store.dispatch('basketSettings', {'id': id, 'type': 'add'})},
      getProducts(){
        this.preloaderState = true;
        this.axios.get('/product?category_id='+this.categoryId)
        .then((res)=>{
          this.preloaderState = false;
          this.productList = res.data;
        })
      },
      checkingBasket: function(id){
        let status = "Добавлено" //Добавлено

        if (this.basket.indexOf(id) === -1)
          status = "В Корзину";

        return status
      },
    },
    watch:{
      categoryId(){
        this.getProducts()
      }
    }
  }
</script>
