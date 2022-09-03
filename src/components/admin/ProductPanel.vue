<template id="">
  <div class="product">

    <a href="#" @click="addProductState=true;"><h3 style="margin: 10px 0 10px 10px; text-align: left;">Добавить товар</h3></a>

    <div class="product-new_product" v-if="addProductState">
      <div class="" id="block-sharp_el">
        <CategoryOption @setCategoryId="setCategoryId"/>
      </div>

      <label>Заголовок</label>
      <div class="" id="block-sharp_el">
        <input type="text" class="input_mode" v-model="title">
        <span style='display: block; padding: 10px 0 0 0;'>{{title.length}}/80</span>
      </div>

      <label>Цена в KZT</label>
      <div class="" id="block-sharp_el">
        <input type="number" class="input_mode" v-model="price_in_kzt">
      </div>


      <label>Наценка (Пример: 25% от ценый)</label>
      <div class="" id="block-sharp_el">
        <input type="number" class="input_mode" v-model="margin">
      </div>

      <label>Цена в RUB (Для фиксированной цены укажите цену только в RUB)</label>
      <div class="" id="block-sharp_el">
        <input type="number" class="input_mode" v-model="price_in_rub">
      </div>

      <label>Тип продукта (Пример: Подписка или Средства передвижения)</label>
      <div class="" id="block-sharp_el">
        <input type="text" class="input_mode" v-model="productType">
        <span style='display: block; padding: 10px 0 0 0;'>{{productType.length}}/60</span>
      </div>

      <label>Описания</label>
      <div class="" id="block-sharp_el">
        <textarea name="name" rows="6" cols="60" class="input_mode" v-model="description"></textarea>
        <span style='display: block; padding: 10px 0 0 0;'>{{description.length}}/1200</span>
      </div>

      <div class="" id="block-sharp_el">
        <AddFile :only_one="true" :only_img="true" @getFiles="addFile"/>
      </div>

      <a href="#" id="block-sharp_el" @click="createProduct" style="display: block">Добавить</a>
      <a href="#" id="block-sharp_el" @click="resetState">Закрыть</a>
    </div>

    <div class="product-all" v-else>
      <h4 style="padding: 10px 0 10px 0; color: #f06966; text-align: left; margin-left: 10px;">Список Товаров</h4>
      <div class="" v-for="(product, id) in productList" v-bind:key="id">
        <div class="" style="padding: 1.5px 0 1.5px 0;">
          <span id="block-sharp">{{product.title}}</span>
          <span>Цена в RUB: <span style="padding: 0 5px 0 5px;">{{product.price_in_rub}}</span></span>
          <a href="#" id="block-sharp" @click="getMarginData('product', id)"><span>Подробней</span></a>
          <!--<a href="#" id="block-sharp"><span>Редактировать</span></a>-->
          <a href="#" id="block-sharp" @click="deleteProduct(id)"><span style='color: #f06966;'>Удалить</span></a>

          <div class="product-list-all_more" v-if="moreId === id" style="padding: 15px 0 15px 0; margin-left: 10px;">
            <span>Категория: <span id="product-list-all_more">{{categoryList[product.category_id].title}}</span></span>
            <span>Цена в KZT: <span id="product-list-all_more">{{marginData.price_in_kzt}}</span></span>
            <span>Процент накрутки: <span id="product-list-all_more">{{marginData.margin}}%</span></span>
            <span>Картинка:
              <a :href="(product.img_path !== null) ? backUrl+'/'+product.img_path : '#'" target="blank_">
                {{(product.img_path !== null) ? 'Клик' : 'Отсутствует'}}
              </a></span>
            <a href="#" style="margin-top: 25px;" @click="resetState">Закрыть</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import CategoryOption from '@/components/usefully/CategoryOption.vue';
  import AddFile from '@/components/usefully/AddFile.vue';

  export default{
    name: 'ProductPanel',
    components:{
      CategoryOption,
      AddFile
    },
    computed:{
      backUrl(){return this.$store.getters.BACK_END_URL;},
      categoryList(){return this.$store.getters.CATEGORY_LIST;},
      serviceList(){return this.$store.getters.SERVICE_LIST;},
    },
    data(){
      return{
        addProductState: false,
        moreId: 0,
        categoryId: 0,
        title: "",
        price_in_kzt: null,
        price_in_rub: null,
        margin: null,
        productType: "",
        description: "",
        file: "",
        productList: {},
        marginData: {},
      }
    },
    created(){
      this.$store.dispatch('getCategory');
      this.getProductList();
    },
    methods:{
      getMarginData(prodcutName, id=0){
        this.axios.get('/margin?product='+prodcutName+'&entry_id='+id)
        .then((res)=>{
          this.marginData = res.data;
          this.moreId=id
        })
      },
      getProductList(){
        this.axios.get('/product')
        .then((res)=>{
          this.productList = res.data;
        })
        .catch((err)=>{
          let status = err.response.status;
          if(status === 403)
            this.$store.dispatch('logOut');

          this.$router.push('/catalog');
        })
      },
      createProduct: function(){
        if(this.checkData()){
          let formData = new FormData();
          formData.append('category_id', this.categoryId);
          formData.append('title', this.title);
          formData.append('product_type', this.productType);
          formData.append('description', this.description);
          formData.append('file', this.file);

          if (this.price_in_kzt !== null)
            formData.append('price_in_kzt', this.price_in_kzt);

          if (this.price_in_rub)
            formData.append('price_in_rub', this.price_in_rub);

          if (this.margin)
            formData.append('margin', this.margin);

          this.axios.post('/product', formData, {headers: {'Content-Type': 'multipart/form-data'}})
          .then(()=>{
            this.getProductList();
            this.resetState();
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      },
      deleteProduct: function(id){
        this.axios.delete('/product?entry_id='+id)
        delete this.productList[id];
      },
      setCategoryId(payload){this.categoryId = payload.category_id;},
      addFile(payload){this.file = payload.files[0]},
      checkData(){
        if (this.categoryId <= 0 || this.price_in_kzt <= 0 && this.price_in_rub <= 0){
          console.log(this.price_in_kzt, this.margin)
          return false;
        }


        if (this.title.length < 3 || this.title.length > 80)
          return false

        return true;
      },
      resetState: function(){
        this.addProductState = false;
        this.moreId = false;
        this.categoryId = 0;
        this.moreId = 0;
        this.price_in_kzt = 0;
        this.margin = 0;
        this.description = "";
        this.title = "";
        this.file = "";
        this.price_in_rub = "";
        this.productType = "";
      },
    },
    watch:{
      title(newValue, oldValue){
        if (newValue.length > 80)
          this.title = oldValue;
      },
      description(newValue, oldValue){
        if (newValue.length > 1200)
          this.description = oldValue;
      },
      productType(newValue, oldValue){
        if (newValue.length > 60)
          this.productType = oldValue;
      }
    }

  }
</script>

<style media="screen">
  .product-list-all_more{
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  #product-list-all_more{
    padding: 0 5px 0 5px;
    font-weight: bold;
  }

  #block-sharp{
    padding: 0 10px 0 10px;
  }

  #block-sharp_el{
    margin: 25px 0 25px 0;
  }

</style>
