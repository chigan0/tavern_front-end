<template>
  <div class="ref-code">
    <a href="#" @click="createRefState = !createRefState;"><h4 style="margin-bottom: 10px;">Создать новую ссылку</h4></a>

    <div class="" v-if="createRefState">
      <label>Рекламное имя</label>
      <div class="" style="margin-top: 15px; padding-bottom: 10px;">
        <input type="text" v-model="title" class="input_mode">
      </div>
      <label style="margin-top: 10px;">{{title.length}}/60</label>

      <a href="#"><h4 style="margin-top: 25px;" @click="createRefCode">Создать</h4></a>
    </div>

    <div v-else>
      <h4 style="color: #f06966;">Список ссылок</h4>
      <div class="ref-code-link_list">
        <div class="" v-for="(ref, id) in refList" v-bind:key="id" style="padding: 2.5px 0 2.5px 0;">
          <a href="#"  @click="removeRefCode(id)" style="padding-right: 25px; float: left; color: #f06966;"><span>Удалить</span></a>
          <span style="padding-right: 25px; float: left;">{{ref.title}}</span>
          <span style="float: center;">{{ref.link}}</span>
          <span style="padding-left: 25px; float: right;">{{ref.count}}</span>
        </div>
      </div>
    </div>


  </div>
</template>


<script>
  export default{
    data(){
      return{
        createRefState: false,
        title: "",
        refList: {},
      }
    },
    created(){
      document.execCommand("Copy")
      this.axios.get('/advertising/link')
      .then((res)=>{
        this.refList = res.data;
      })
      .catch((err)=>{
        let status = err.response.status;
        if(status === 403)
          this.$store.dispatch('logOut');

        this.$router.push('/catalog');
      })
    },
    methods:{
      createRefCode: function(){
        if (this.title.length >= 3){
          this.axios.post('/advertising/link', {"title": this.title})
          .then((res)=> {
            console.log(res.data)
            console.log(this.refList)
            Object.assign(this.refList, res.data);
            this.createRefState = false;
          })
          .catch(()=> {console.log("ERR")})
        }
      },
      removeRefCode: function(id){
        this.axios.delete("/advertising/link?ref_id="+id,)
        .then(()=>{
          delete this.refList[id];
        })
        .catch((err)=>{
          if (err.response.status === 404)
            delete this.refList[id];
        })
      },
    },
    watch:{
      title(newValue, oldValue){
        if (newValue.length > 60)
          this.title = oldValue;
      }
    }
  }
</script>


<style media="screen">
  .ref-code{
    margin-top: 15px;
  }

  .ref-code-link_list{
    margin-top: 15px;
  }
</style>
