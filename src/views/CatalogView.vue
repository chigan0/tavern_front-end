<template>
  <div class="catalog-view">
    <link rel="stylesheet" href="css/catalog.css">

      <main class="c-page-main">
          <div class="container"><h1 class="section-title c-page-main__title">каталог</h1></div>
            <div class="container">
              <div class="c-page-main__content">
                <div class="c-page-main__tab-header-wrapper">
                  <div class="c-page-main__tab-btns-wrapper">

                    <button v-for="(category, id) in categoryList" v-bind:key="id"
                      class="c-page-main__tab-btn game"
                      :class="(selectedCategoryId === id) ? 'c-page-main__tab-btn game active' : 'c-page-main__tab-btn game'"
                      @click="switchComponent('product', id)">
                      {{category.title}}
                    </button>

                    <button v-if="goldState" :class="(componentSelected === 'gold') ? 'c-page-main__tab-btn gold active' : 'c-page-main__tab-btn gold'"
                      @click="switchComponent('gold')">
                      Золото
                    </button>

                    <button v-if="steamState" :class="(componentSelected === 'steam') ? 'c-page-main__tab-btn proposal active' : 'c-page-main__tab-btn proposal'"
                      @click="switchComponent('steam')">
                      steam
                    </button>

                    <button :class="(componentSelected === 'reviews') ? 'c-page-main__tab-btn steam active' : 'c-page-main__tab-btn steam'"
                      @click="switchComponent('reviews')">
                      Предложения
                    </button>


              </div>

              <search/>

            </div>
            <div class="c-page-main__tabs-wrapper">
              <transition name="fade" mode="out-in">
                <component v-bind:is="componentSelected" :categoryId="selectedCategoryId"></component>
              </transition>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import ProductComp from '@/components/catalog/ProductComp.vue';
  import GoldBuy from '@/components/catalog/GoldBuy.vue';
  import SteamReplenish from '@/components/catalog/SteamReplenish.vue';
  import UserReviews from '@/components/catalog/UserReviews.vue';
  import PreloaderComp from '@/components/usefully/PreloaderComp.vue';
  import SearchProduct from '@/components/usefully/SearchProduct.vue';

  export default{
    computed:{
      categoryList(){return this.$store.getters.CATEGORY_LIST;},
      serviceList(){return this.$store.getters.SERVICE_LIST;},
    },
    components:{
      product: ProductComp,
      gold: GoldBuy,
      steam: SteamReplenish,
      reviews: UserReviews,
      preloader: PreloaderComp,
      search: SearchProduct
    },
    data(){
      return {
        componentSelected: null,
        selectedCategoryId: 0,
        goldState: false,
        steamState: false,
        productList: {}
      }
    },
    created(){
      this.$store.dispatch('getCategory');
      document.title = 'catalog';
    },
    methods:{
      switchComponent: function(componentName, categoryId=0){
        this.selectedCategoryId = categoryId;
        this.componentSelected = componentName;
      },
    },
    watch:{
      categoryList(){
        let id = Object.keys(this.categoryList)[0]
        this.switchComponent('product',id)
      },
      serviceList(){
        let services = this.serviceList
        for(let key in services){
          switch (services[key].private_name) {
            case 'steam':
              this.steamState = services[key].is_active
              break;

            case 'gold':
              this.goldState = services[key].is_active
              break;
          }
        }
      }
    }
  }
</script>
