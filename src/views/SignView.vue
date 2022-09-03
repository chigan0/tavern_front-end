<template>
  <div class="sign-in">
    <link rel="stylesheet" href="/css/signin.css">
    <link rel="stylesheet" href="/css/signup.css">
    <link rel="stylesheet" href="/css/restore_password.css">

    <main class="login-page ">
       <div class="container">
          <div class="login-page__content login-page-content">
             <div class="login-page-content__image log-sign-pages__image-block">
                <picture><source srcset="img/log-in-image.webp" type="image/webp"><img src="img/log-in-image.png" alt="image"></picture>
             </div>

            <div>
              <transition name="fade" mode="out-in">
                <component
                  @shangeComp="change"
                  :siteKey="siteKey"
                  :sendUrl="sendUrl"
                  :methods="methods"
                  v-bind:is="component_selected"></component>
              </transition>
            </div>
          </div>
       </div>
    </main>
  </div>
</template>

<script>
import SignIn from "@/components/sign/SignIn.vue";
import SignUp from "@/components/sign/SignUp.vue";
import RestorePass from "@/components/sign/RestorePass.vue";
import EmailConfirm from "@/components/sign/EmailConfirm.vue";

export default{
  components:{
    signin: SignIn,
    signup: SignUp,
    restore: RestorePass,
    confirm: EmailConfirm
  },
  data(){
    return{
      siteKey: "fccf1b0c-3334-4695-a941-681c39ed0c7f",
      component_selected: "signin",
      sendUrl: "",
      methods: "put",
    }
  },
  methods:{
    change: function(payload){
      console.log(payload)
      this.component_selected = payload.comp

      console.log(payload.confirm)

      if (payload.confirm){
        this.sendUrl = payload.confirm.sendUrl;
        this.methods = payload.confirm.methods;

        console.log(this.sendUrl)
        console.log(this.methods)
      }

    }
  }
}

</script>
