<template>
  <div class="category-option">
    <select v-model="selectedCategory" @change="setCategoryId">
      <option disabled value="">Выберите категорию</option>
      <option v-for="(category, id) in categoryList" :value="id" v-bind:key="id">{{category.title}}</option>
  </select>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        selectedCategory: "",
        categoryList: {},
      }
    },
    created(){
      this.getCategory();
    },
    methods:{
      getCategory: function(){
        this.axios.get('/category')
        .then((res)=> {
          this.categoryList = res.data['category'];
        })
      },
      setCategoryId: function(){
        this.$emit("setCategoryId", {category_id: event.target.value})
      }
    }
  }
</script>
