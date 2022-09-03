<template>
  <div class="category-panel">
    <a href="#" @click="addCategoryState = true;"><h4 style="padding-top: 15px;">Добавить категорию</h4></a>

    <div class="" v-if="addCategoryState || changeState">
      <label>Названия категории</label>
      <div class="" style="margin-top: 15px; padding-bottom: 10px;">
        <input type="text" v-model="cateName" class="input_mode">
      </div>
      <label style="margin-top: 10px;">{{cateName.length}}/50</label>


      <div class="" v-if="changeState" style="padding: 15px 0 15px 0;">
          <div class="">
            <input type="radio" :value="true"  v-model="is_active">
            <label style="padding: 0 15px 0 0;">Активно</label>

            <input type="radio" :value="false" v-model="is_active">
            <label>Не активно</label>
          </div>

          <a href="#"><h4 style="margin-top: 25px;" @click="categoryChange">Изменить</h4></a>
      </div>

      <div class="" v-else-if="addCategoryState">
        <a href="#"><h4 style="margin-top: 25px;" @click="createCategory">Создать</h4></a>
      </div>

      <a href="#" @click="resetState"><h4 style="padding: 25px 0 0 0;">Назад</h4></a>
    </div>


    <div class="" v-else>
      <h4 style="padding: 10px 0 10px 0; color: #f06966;">Список категории</h4>
      <div class="" v-for="(cate, id) in cateList" v-bind:key="id" style="padding: 1.5px 0 1.5px 0;">
        <span>{{cate.title}}</span>
        <a href="#"><span style="float: right; padding: 0 0 0 15px; color: #f06966;" @click="delCategory(id)">Удалить</span></a>
        <a href="#"><span style="float: right; padding: 0 0 0 15px;" @click="getCategoryData(id)">Редактировать</span></a>
        <span style="float: right; padding: 0 0 0 15px;">{{(cate.is_active) ? 'Активно' : 'Не активно'}}</span>
      </div>

      <h4 style="padding: 10px 0 10px 0; color: #f06966;">Список услуг</h4>
      <div class="" v-for="(service, id) in serviceList" v-bind:key="id" style="padding: 1.5px 0 1.5px 0;">
        <span>{{service.title}}</span>
        <a href="#"><span style="float: right; padding: 0 0 0 15px;" @click="getCategoryData(id)">Редактировать</span></a>
        <span style="float: right; padding: 0 0 0 15px;">{{(service.is_active) ? 'Активно' : 'Не активно'}}</span>
      </div>
    </div>
  </div>
</template>


<script>
  export default{
    name: "CategoryPanel",
    data(){
      return {
        addCategoryState: false,
        changeState: false,
        is_active: false,
        changeId: 0,
        cateName: "",
        cateList: {},
        serviceList: {},
      }
    },
    created(){
      this.axios.get('/category')
      .then((res)=> {
        this.cateList = res.data.category;
        this.serviceList = res.data.service;
      })
    },
    methods:{
      createCategory: function(){
        if(this.cateName.length > 2){
          this.axios.post('/category', {"title": this.cateName})
          .then((res)=>{
            Object.assign(this.cateList, res.data);
            this.resetState()
          })
        }
      },
      delCategory: function(id){
        this.axios.delete('/category?entry_id='+id)
        .then(()=>{
          delete this.cateList[id];
        })
        .catch((err)=>{
          if (err.response.status === 404)
            delete this.cateList[id];
        })
      },

      getCategoryData: function(id){
        this.axios.get('/category?entry_id='+id)
        .then((res)=>{
          if (res.data !== null){
            this.cateName = res.data.title;
            this.is_active = res.data.is_active;
            this.changeId = id;
            this.changeState = true;
          }
        })
        .catch((err)=>{
          let status = err.response.status;
          if(status === 403)
            this.$store.dispatch('logOut');

          this.$router.push('/catalog');
        })
      },
      categoryChange: function(){
        this.axios.patch('/category?entry_id='+this.changeId, {'title': this.cateName, 'is_active': this.is_active})
        .then((res)=>{
           if (res.data.category)
            Object.assign(this.cateList, res.data.category)

           else if (res.data.service)
             Object.assign(this.serviceList, res.data.service)

           this.resetState();
        })
      },
      resetState: function(){
        this.addCategoryState = false;
        this.changeState = false;
        this.is_active = false;
        this.cateName = "";
      },
    },
    watch:{
      cateName(newValue, oldValue){
        if (newValue.length > 50)
          this.cateName = oldValue;
      }
    }
  }
</script>
