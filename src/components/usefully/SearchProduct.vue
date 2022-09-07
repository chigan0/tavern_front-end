<template>
  <div class="search-product">

    <div  class=" search-form">
       <button class="search-form__submit " type="submit">
         <picture>
           <source srcset="/img/search-icon.svg" type="image/webp">
             <picture><source srcset="/img/search-icon.svg" type="image/webp">
               <img src="/img/search-icon.svg" alt="search"></picture></picture></button>

       <input placeholder="Поиск по магазину" type="text" class="search-form__input" v-model="searchProduct">



       <div class="search-form__dropped-menu search-form-dropped-menu" v-if="searchState">
         <div class="" v-if="preloaderState">
           <preloader/>
         </div>

         <div v-else>
           <span v-if="Object.keys(searchProductList).length === 0">Не найденно</span>

           <div v-for="(prod, id) in searchProductList" v-bind:key="id">
             <router-link :to="'/product/'+id"><a href="#" @click="clearSeatch" class="search-form-dropped-menu__item search-form-dropped-menu-item">
               <picture><source :srcset="backUrl+'/'+prod.img_path" type="image/webp">
                 <picture>
                   <source :srcset="backUrl+'/'+prod.icon_path" type="image/webp"><!--img_path-->
                     <img :src="backUrl+'/'+prod.icon_path" alt="image" class="search-form-dropped-menu-item__image">
                   </picture>
                 </picture>
                 <div class="search-form-dropped-menu-item__text">
                   <h4 class="search-form-dropped-menu-item__title">{{prod.title}}</h4>
                   <p class="search-form-dropped-menu-item__price">{{prod.price_in_rub}} ₽</p>
                 </div>
               </a></router-link>
             </div>
        </div>

       </div>

    </div>

  </div>
</template>

<script>
  import PreloaderComp from '@/components/usefully/PreloaderComp.vue';

  export default{
    name: "SearchProduct",
    components:{
      preloader: PreloaderComp
    },
    computed:{backUrl(){return this.$store.getters.BACK_END_URL;}},
    data(){
      return {
        searchState: false,
        preloaderState: false,
        requestState: false,
        searchProduct: "",
        searchProductList: {}
      }
    },
    methods:{
      searchTitle: function(title){
        this.requestState = true;
        this.axios.get('/search/product?name='+title)
        .then((res)=>{
          this.preloaderState = false;
          this.requestState = false;
          this.searchProductList = res.data;
        })
      },
      clearSeatch: function(){
        this.searchState = false;
        this.preloaderState = false;
        this.searchProductList = {};
        this.searchProduct = "";
      }
    },
    watch:{
      searchProduct(){
        if (this.searchProduct.length >= 4 && !this.requestState){
          this.searchState = true;
          this.preloaderState = true;
          this.searchTitle(this.searchProduct);
        }
        else if(!this.requestState)
          this.searchState = false;
      }
    }
  }
</script>
