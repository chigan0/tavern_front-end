<template>
  <div class="restore-pass">
    <div class="recovery-page-content__form recovery-page-content-form log-sign-pages__form">
      <h2 class="recovery-page-content-form__title log-sign-pages__title">Восстановление пароля</h2>
      <div class="recovery-page-content-form__input-wrapper">
          <input placeholder="Email" type="text" v-model="email" class="recovery-page-content-form__input log-sign-pages__input">
          <div v-if="errorEmailState">
            <p class="recovery-page-content-form__error log-sign-pages__error">{{emailErrorMessage}}</p>
          </div>
      </div>

      <div class="recovery-page-content-form__input-wrapper">

        <div class="log-sign-pages__password-wrapper">
          <input type="checkbox"  id="recovery-page-show-password-input" v-model="passVisibleState">
          <input id="recovery-page-show-password" placeholder="Новый пароль" :type="passVisible" v-model="password" class="recovery-page-content-form__input log-sign-pages__input">
          <label for="recovery-page-show-password-input" @click="passVisible = (passVisible === 'text') ? 'password' : 'text'" class="log-sign-pages__show-password"></label>
        </div>
        <div v-if="errorPasswordState">
          <p class="recovery-page-content-form__error log-sign-pages__error">{{passErrorMessage}}</p>
        </div>
      </div>

      <div class="log-sign-pages__password-wrapper">
        <input type="checkbox"  id="recovery-page-show-repeated-password-input" v-model="passVisibleState">
        <input id="recovery-page-show-repeated-password" placeholder="Повторите пароль" :type="passVisible" v-model="passwordConfirm" class="recovery-page-content-form__input log-sign-pages__input">
        <label for="recovery-page-show-repeated-password-input" @click="passVisible = (passVisible === 'text') ? 'password' : 'text'"  class="log-sign-pages__show-password"></label>
      </div>

      <div class="recovery-page-content-form__captcha log-sign-pages__captcha">
        <vue-hcaptcha ref="invisibleHcaptcha"
            theme="dark"
            language="ru"
            :sitekey="siteKey"
            @verify="onVerify"
            @expired="onExpire">
        </vue-hcaptcha>
      </div>

      <button type="submit" class="recovery-page-content-form__btn log-sign-pages__btn" @click="restorePassword">Отправить</button>
      <a href="#" class="recovery-page-content-form__recovery-link log-sign-pages__link" @click="shangeComp('signin')">Вернуться на страницу входа</a>
    </div>
  </div>
</template>

<script>
  import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

  export default{
    name: "RestorePass",
    components: { VueHcaptcha },
    props:{
        siteKey: String,
    },
    data(){
      return {
        errorEmailState: false,
        errorPasswordState: false,
        passVisibleState: false,
        passVisible: "password",
        passErrorMessage: "",
        emailErrorMessage: "",
        email: "",
        password: "",
        passwordConfirm: "",
        token: "",
      }
    },
    methods:{
      shangeComp: function(component, payload=null){this.$emit("shangeComp", {"comp": component, [component]: payload})},
      onVerify: function(token){this.token = token;},
      onExpire() {this.token = "";},
      checkInput: function(){
        let error = {'email': '', 'password': ''};
        let status = true

        if (this.email.length < 5){
          error.email = "Не валидная почта";
          status = false;
        }

        if (this.password.length < 5){
          error.password = "Пароль не может быть менее 5 символов";
          status = false;
        }

        if (this.password.trim() !== this.passwordConfirm.trim()){
          error.password = "Пароль не совподает";
          status = false;
        }

        return {
          'status': status,
          'error': error
        }
      },
      restorePassword: function(){
        this.restoreState();
        let validData = this.checkInput();

        if (validData.status && this.token !== ""){
          this.axios.post('/restore/password', {'email': this.email, 'password': this.password, "hca_token": this.token})
          .then(()=>{
            this.shangeComp('confirm', {"methods": "put", "sendUrl": "/restore/password"});
          })
          .catch((err)=> {
            let status = err.response.status;
            if (status === 422)
              this.emailErrorMessage = "Не валидная почта"

            else if (status === 404)
              this.emailErrorMessage = "Пользователь с такой почтой не найден";

            this.restoreState(true);
          })

          this.$refs.invisibleHcaptcha.reset();
        }
        else{
          this.passErrorMessage = validData.error.password;
          this.emailErrorMessage = validData.error.email;
          this.restoreState(true);
        }
      },
      restoreState: function(status=false){
        this.errorPasswordState = status;
        this.errorEmailState = status;
        if (!status){
          this.passErrorMessage = '';
          this.emailErrorMessage = '';
        }
      }
    }
  }
</script>
