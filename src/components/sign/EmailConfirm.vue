<template>
  <div class="confrim">
    <link rel="stylesheet" href="/css/mail_confirm.css">

    <div class="mail-confirm-page-content__form mail-confirm-page-content-form log-sign-pages__form">
        <h2 class="mail-confirm-page-content-form__title log-sign-pages__title">Подтверждение<br>электронной почты</h2>
          <div class="mail-confirm-page-content-form__input-wrapper">
              <input placeholder="Код верификации" type="text" v-model="verificationCode" class="mail-confirm-page-content-form__input log-sign-pages__input">
              <div v-if="errorCodeState">
                <p class="mail-confirm-page-content-form__error log-sign-pages__error">{{errorCodeMessage}}</p>
              </div>
          </div>
          <div class="mail-confirm-page-content-form__captcha log-sign-pages__captcha">
            <vue-hcaptcha ref="invisibleHcaptcha"
               theme="dark"
                 language="ru"
                 :sitekey="siteKey"
                 @verify="onVerify"
                 @expired="onExpire">
             </vue-hcaptcha>
          </div>

          <button type="submit" @click="confirmEmail" class="mail-confirm-page-content-form__btn log-sign-pages__btn">Отправить</button>
          <a href="#" @click="shangeComp('signin')" class="mail-confirm-page-content-form__mail-confirm-link log-sign-pages__link">Вернуться на страницу входа</a>
      </div>
  </div>
</template>

<script>
  import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

  export default{
    components: { VueHcaptcha },
    props:{
      siteKey: String,
      sendUrl: String,
      methods: String,
      //719415
    },

    data(){
      return{
        errorCodeState: false,
        verificationCode: "",
        token: "",
        errorCodeMessage: "",
        methodList: {"get": this.axios.get, "post": this.axios.post, "put": this.axios.put}
      }
    },
    methods:{
      shangeComp: function(name){this.$emit("shangeComp", {"comp": name})},
      onVerify: function(token){this.token = token;},
      onExpire: function() {this.token = "";},
      confirmEmail: function() {
        this.errorCodeState = false;
        if (this.methods !== "" && this.sendUrl !== "" && this.token !== ""){
            if(this.verificationCode.length >= 6){

              this.methodList[this.methods](this.sendUrl+"?code="+this.verificationCode, {"hca_token": this.token})
              .then(async (res)=> {
                await this.$store.dispatch('signIn', {"accessToken": res.data['access_token'], "refreshToken": res.data['refresh_token']});
                this.$router.push('/catalog');
              })
              .catch((err)=>{
                let statusCode = err.response.status;
                this.errorCodeState = true;

                if (statusCode === 422)
                  this.errorCodeMessage = "Вы вели невалидные код";

                else if(statusCode === 409)
                  this.errorCodeMessage = "Такого кода не существует";
                this.$refs.invisibleHcaptcha.reset();
              })
          }
          else{
            this.errorCodeState = true;
            this.errorCodeMessage = "Длина кода не соответствует высланному коду";
          }
        }
      },
    },
    watch:{
      verificationCode(newValue, oldValue){
        let pattern = /^\d+\.?\d*$/;

        if (newValue !== "" && !pattern.test(newValue) || this.verificationCode.length > 16)
          this.verificationCode = oldValue;
      }
    }
  }
</script>


<style media="screen">
  input::-webkit-outer-spin-button,

  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
