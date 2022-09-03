<template id="">
  <div class="signup">
    <div class="login-page-content__form login-page-content-form log-sign-pages__form">
       <h2 class="login-page-content-form__title log-sign-pages__title">Войти</h2>
       <input placeholder="Email" type="text"  v-model="email" class="login-page-content-form__input log-sign-pages__input">
       <div class="log-sign-pages__password-wrapper">

          <input type="checkbox"  id="show-password-input">
          <input id="password-input" v-model="password" placeholder="Пароль" :type="passVisible" class="login-page-content-form__input log-sign-pages__input">
          <label for="show-password-input"  class="log-sign-pages__show-password" @click="passVisible = (passVisible === 'text') ? 'password' : 'text'"></label>

       </div>
       <div class="login-page-content-form__forgot-link-wrapper">
          <a href="#" @click="shangeComp('restore')" class="login-page-content-form__forgot-pass-link">Забыли пароль?</a>
       </div>
       <div class="login-page-content-form__captcha log-sign-pages__captcha">
         <vue-hcaptcha ref="invisibleHcaptcha"
            theme="dark"
              language="ru"
              :sitekey="siteKey"
              @verify="onVerify"
              @expired="onExpire">
          </vue-hcaptcha>
       </div>
       <div v-if="errorState">
         <p class="login-page-content-form__error log-sign-pages__error">{{errorMessage}}</p>
       </div>

       <button type="submit" class="login-page-content-form__btn log-sign-pages__btn" @click="signIn">Войти</button>
       <a href="#" @click="shangeComp('signup')" class="login-page-content-form__signup-link log-sign-pages__link">Зарегистрироваться</a>

       <div class="login-page-content-form__socials-login-block">
          <p class="login-page-content-form__text">Войти с помощью соцсетей:</p>
          <a :href="vkAuthLink"
           class="login-page-content-form__social-link"> <!--target="_blank"-->
           <picture><source srcset="img/log-in-vk.svg" type="image/webp"><img src="img/log-in-vk.svg" alt="vk"></picture>
         </a>
         <!--
          <a href="#" class="login-page-content-form__social-link">
             <picture><source srcset="img/log-in-google.svg" type="image/webp"><img src="img/log-in-google.svg" alt="google"></picture>
          </a>-->
       </div>
    </div>
  </div>
</template>


<script>
  import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

  export default{
    name: "SignIp",
    computed:{vkAuthLink(){return this.$store.getters.VK_AUTH_LINK;}},
    components: { VueHcaptcha },
    props:{
        siteKey: String,
    },
    data(){
      return{
        errorState: false,
        token:"",
        email: "",
        password: "",
        errorMessage: "",
        passVisible: "password",
      }
    },
    methods:{
      shangeComp: function(name){this.$emit("shangeComp", {"comp": name})},
      onVerify: function(token){this.token = token;},
      onExpire() {this.token = "";},
      signIn: function(){
        this.errorState = false;
        if (this.email != "" && this.password != "" && this.token !== ""){
          this.axios.post("signin", {"email": this.email, "password": this.password, "hca_token": this.token})
          .then(async (resp)=>{
            await this.$store.dispatch('signIn', {"accessToken": resp.data['access_token'], "refreshToken": resp.data['refresh_token']});
            this.$router.push('/catalog');
          })
          .catch((err)=>{
            let statusCode = err.response.status

            if (statusCode === 422)
              this.errorMessage = "Вы вели невалидные данные";

            else if(statusCode === 404)
              this.errorMessage = "Неверное имя пользователя или пароль";

            this.errorState = true;
          })

          this.$refs.invisibleHcaptcha.reset();
        }
        else{
          this.errorState = true;
          this.errorMessage = "Заполните все поля и пройдите капчу";
        }
      },
    }
  }
</script>
