<template id="">
  <div class="signup">
    <div class="signup-page-content__form signup-page-content-form log-sign-pages__form">
        <h2 class="signup-page-content-form__title log-sign-pages__title">Регистрация</h2>

          <div class="signup-page-content-form__input-wrapper">
                <input placeholder="Имя пользователя" type="text" v-model="username" class="signup-page-content-form__input log-sign-pages__input">
                <div class="" v-if="errorUsernameState">
                    <p class="signup-page-content-form__error log-sign-pages__error">{{errorUsernameMessage}}</p>
                </div>
          </div>

          <div class="signup-page-content-form__input-wrapper">
                <input placeholder="Email" type="text" v-model="email" class="signup-page-content-form__input log-sign-pages__input">
                <div class="" v-if="errorEmailState">
                  <p class="signup-page-content-form__error log-sign-pages__error">{{errorEmailMessage}}</p>
                </div>
          </div>

          <div class="signup-page-content-form__input-wrapper">

              <div class="log-sign-pages__password-wrapper">
                  <input type="checkbox"  id="show-password-input"  v-model="passVisibleState">
                  <input placeholder="Пароль" id="password-input" :type="passVisible" v-model="password" class="signup-page-content-form__input log-sign-pages__input">
                  <label for="show-password-input"  class="log-sign-pages__show-password" @click="passVisible = (passVisible === 'text') ? 'password' : 'text'">></label>
              </div>

              <div class="" v-if="errorPasswordState">
                <p class="signup-page-content-form__error log-sign-pages__error">{{errorPasswordMessage}}</p>
              </div>

          </div>


               <div class="log-sign-pages__password-wrapper">
                  <input type="checkbox"  id="show-repeated-password-input" v-model="passVisibleState">
                  <input placeholder="Повторите пароль" :type="passVisible" v-model="passwordConfirm" class="signup-page-content-form__input log-sign-pages__input">
                  <label for="show-repeated-password-input"  class="log-sign-pages__show-password"  @click="passVisible = (passVisible === 'text') ? 'password' : 'text'"></label>
               </div>



               <div class="signup-page-content-form__captcha log-sign-pages__captcha">
                 <vue-hcaptcha ref="invisibleHcaptcha"
                    theme="dark"
                      language="ru"
                      :sitekey="siteKey"
                      @verify="onVerify"
                      @expired="onExpire">
                  </vue-hcaptcha>
               </div>

               <button type="submit" class="signup-page-content-form__btn log-sign-pages__btn" @click="signIn">Зарегистрироваться</button>
               <div class="signup-page-content-form__agree-block">
                  <input type="checkbox" name="" id="signup-page-content-form-checkbox">
                  <label for="signup-page-content-form-checkbox"><span></span><p class="signup-page-content-form__text">Cогласен с условиями политики конфиденциальности</p></label>

               </div>
               <div class="signup-page-content-form__login-link-wrapper">
                  <p class="signup-page-content-form__text">Уже есть аккаунт?</p>
                  <a href="#" @click="shangeComp('signin')" class="signup-page-content-form__signup-link log-sign-pages__link">Войти</a>
               </div>

               <div class="signup-page-content-form__socials-signup-block">
                  <p class="signup-page-content-form__text">Войти с помощью соцсетей:</p>
                  <a href="https://oauth.vk.com/authorize?client_id=51392990&display=page&redirect_uri=http://127.0.0.1:8000/v1/signin/vk&scope=email&response_type=code&v=5.131"
                   class="login-page-content-form__social-link"> <!--target="_blank"-->
                   <picture><source srcset="img/log-in-vk.svg" type="image/webp"><img src="img/log-in-vk.svg" alt="vk"></picture>
                 </a>
               </div>
            </div>
  </div>
</template>


<script>
  import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

  export default{
    name: "SignUp",
    components: { VueHcaptcha },
    props:{
        siteKey: String,
    },
    data(){
      return{
        passVisibleState: false,
        errorUsernameState: false,
        errorEmailState: false,
        errorPasswordState: false,
        errorState: false,
        errorEmailMessage: "",
        errorUsernameMessage: "",
        errorPasswordMessage: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        error_message: "",
        token: "",
        passVisible: "password",
      }
    },
    methods:{
      shangeComp: function(component, payload=null){this.$emit("shangeComp", {"comp": component, [component]: payload})},
      onVerify: function(token){this.token = token;},
      onExpire: function() {this.token = "";},
      signIn: function(){
        this.erroMeesage('clean', '');

        if(this.password.trim() !== this.passwordConfirm.trim())
            this.erroMeesage(['password'], "Пароль не совпадает")

        if(this.email.trim().length < 6)
          this.erroMeesage(['email'], "Не валидная почта")

        if (this.username.trim().length < 3)
          this.erroMeesage(['username'], "Слишкам короткое имя пользователя")

        if (!this.errorState && this.token){
          this.axios.post("/signup", {"username": this.username, "email": this.email, "password": this.password, "hca_token": this.token})
          .then(()=>{
            this.shangeComp('confirm', {"methods": "put", "sendUrl": "/signup"});
          })
          .catch((err)=> {
            let status = err.response.status;
            if (status === 422){
              let fieldName = [];
              err.response.data.detail.forEach((elem)=>{fieldName.push(elem.loc[1])})
              this.erroMeesage(fieldName, "Не валидные данные")
            }

            else if (status === 409)
              this.erroMeesage(err.response.data.detail.field, "Пользователь с такими данными зарегистрирован")
          })

          this.$refs.invisibleHcaptcha.reset();
        }

      },
      erroMeesage: function(inputName, message){
        if (inputName === 'clean' ){
          this.errorUsernameState = false;
          this.errorEmailState = false;
          this.errorPasswordState = false;
          this.errorState = false;
        }

        else{
        inputName.forEach((elem)=>{
          switch (elem) {
            case "password":
              this.errorPasswordState = true;
              this.errorPasswordMessage = message;
              break;

            case "email":
              this.errorEmailState = true;
              this.errorEmailMessage = message;
              break;

            case "username":
              this.errorUsernameState = true;
              this.errorUsernameMessage = message;
              break;
          }

          this.errorState = true
        })
        }
      }
    }
  }
</script>


<style media="screen">

</style>
