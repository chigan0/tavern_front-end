<template>
  <div class="code-guild">
    <a href="#" @click="createGuildCodeState=true;"><h3 style="margin: 10px 0 10px 10px; text-align: left;">Создать код</h3></a>

    <div class="" v-if="createGuildCodeState">
      <label>Названия</label>
      <div class="" id="block-sharp_el">
        <input type="text" class="input_mode" v-model="publicName">
        <span style='display: block; padding: 10px 0 0 0;'>{{publicName.length}}/80</span>
      </div>

      <label>Процент скидкий (Пример: 5 или 4.5)</label>
      <div class="" id="block-sharp_el">
        <input type="number" class="input_mode" v-model="discountPercent">
      </div>

      <label>количество использования (Для бессрочного кода оставьте поля пустым)</label>
      <div class="" id="block-sharp_el">
        <input type="number" class="input_mode" v-model="amountOfUse">
      </div>

      <label>Срок действия в Днях</label>
      <div class="" id="block-sharp_el">
        <input type="number" class="input_mode" v-model="expireDays">
      </div>

      <div class="" v-if="preloaderState">
        <PreloaderComp />
      </div>
      <a href="#" v-else id="block-sharp_el" @click="createGuildCode" style="display: block">Добавить</a>
      <a href="#" id="block-sharp_el" @click="resetState">Закрыть</a>
    </div>

    <div class="" v-else>
      <h4 style="padding: 10px 0 10px 0; color: #f06966; text-align: left; margin-left: 10px;">Список Гильд кодов</h4>

      <div class="">
        <table>
          <thead>
            <tr>
              <th>Названия</th>
              <th>Код</th>
              <th>Бессрочный</th>
              <th>Осталось использовании</th>
              <th>Процент скидкий</th>
              <th>Годен до</th>
            </tr>
          </thead>

        <tbody>
          <tr class="" v-for="(code, id) in guildCodeList" v-bind:key="id">
            <th class="text-corect">{{code.public_name}}</th>
            <th class="text-corect">{{code.guild_code}}</th>
            <th class="text-corect">{{(code.eternal)? 'Да' : 'Нет'}}</th>
            <th class="text-corect">{{(code.amount_of_use === null) ? 'Бессрочный' :  code.amount_of_use}}</th>
            <th class="text-corect">{{code.discount_percent}}%</th>
            <th class="text-corect">{{code.expire_date}}</th>
            <a href="#"><th @click="removeGuildCode(id)">Удалить</th></a>
        </tr>
      </tbody>

        </table>

        <div class="" style="margin-top: 25px; display: flex; justify-content: space-around;">
          <a href="#" @click="switchPage('previous')">Предыдущая страница</a>
          <span>{{pageNum}} / {{maxPageNum}}</span>
          <a href="#" @click="switchPage('next')">Следующая страница</a>
        </div>

      </div>
    </div>

  </div>
</template>


<script>
  import PreloaderComp from '@/components/usefully/PreloaderComp.vue';

  export default{
    name: "GuildCode",
    components: {
      PreloaderComp
    },
    data(){
      return{
        preloaderState: false,
        createGuildCodeState: false,
        guildCodeList: {},
        pageNum: 0,
        maxPageNum: 0,
        publicName: "",
        discountPercent: 5,
        amountOfUse: null,
        expireDays: 5,
      }
    },
    created(){
      this.getGuildCode()
    },
    methods:{
      removeGuildCode: function(entryId){
        this.axios.delete('/guild/code?entry_id='+entryId)
        .then(()=> {delete this.guildCodeList[entryId];})
        .catch((err)=>{
          if (err.response.status === 404)
            delete this.guildCodeList[entryId];
        })
      },
      switchPage: function(sType){
        let checkid = false;

        switch (sType) {
          case 'next':
            if (this.pageNum < this.maxPageNum){
              this.pageNum += 1;
              checkid = true;
            }
            break
          case 'previous':
            if (this.pageNum > 1){
              this.pageNum -= 1;
              checkid = true;
            }
            break;
        }

        if (checkid)
          this.getGuildCode(this.pageNum);
      },

      getGuildCode: function(page=1){
        this.axios.get("/guild/code?page="+page)
        .then((res)=>{
          this.pageNum = page;
          this.guildCodeList = res.data.result;
          this.maxPageNum = res.data.pages_num
        })
      },
      createGuildCode: function(){
        if (this.checkData()){
          this.preloaderState = true;
          this.axios.post("/guild/code", {"public_name": this.publicName,
              "discount_percent":this.discountPercent,
              "amount_of_use": this.amountOfUse,
              "expire_days": this.expireDays
            }
          ).then(()=>{
            this.preloaderState = false;
            this.resetState();

          })
        }
      },
      checkData: function(){
        if (this.publicName.length > 80)
          return false;

        if (!this.discountPercent || !this.expireDays)
          return false;

        return true
      },
      resetState: function(){
        this.createGuildCodeState = false;
        this.publicName = "";
        this.discountPercent = 5;
        this.amountOfUse = null;
        this.expireDays = 5;
      }
    },
    watch:{
      publicName(newValue, oldValue){
        if (newValue.length > 80)
          this.publicName = oldValue;
      },
    }
  }
</script>


<style>

.text-corect{
  padding: 2.5px 10px 2.5px 10px;
  font-weight: normal;
}

</style>
