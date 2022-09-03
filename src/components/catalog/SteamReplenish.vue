<template>
  <div class="steam-replenish">
    <div class="c-page-main__tab third-tab">
       <div class="third-tab__wrapper">


       <input type="radio" checked name="third-tab-inputs" id="c-page-replenishment">

       <!-- input для пункта "выбрать игру в подрок"
        <input type="radio" name="third-tab-inputs" id="c-page-select-game"> -->
       <div class="third-tab__top-inputs third-tab-top-inputs">
          <div class="third-tab-top-inputs__input-wrapper">

             <label for="third-tab-top-inputs-login">Логин</label>
             <input placeholder="Логин" type="text" id="third-tab-top-inputs-login" v-model="login" class="third-tab-top-inputs__input">
             <p class="third-tab-top-inputs__warning-text" v-if="loginErrorState">{{loginErrorMessage}}</p>
          </div>
          <label class="third-tab-top-inputs__label" for="c-page-replenishment">
             <span></span>
             Пополнить кошелек
          </label>
          <!-- label для пункта "выбрать игру в подрок"
          <label class="third-tab-top-inputs__label" for="c-page-select-game">
             <span></span>
             Выбрать игру в подарок
          </label> -->
       </div>
       <div class="third-tab__replenishment">
          <div class="second-tab-bottom-inputs__get-give-block">
             <div class="second-tab-bottom-inputs__input-wrapper">
                <label for="third-tab-bottom-inputs-get">Получу</label>
                <input id="third-tab-bottom-inputs-get" type="number" v-model="receiveFunds" class="second-tab-bottom-inputs__input">
                <p class="third-tab-replenishment__warning-text" v-if="receiveErrorState">{{receiveErrorMessage}}</p>
             </div>
             <picture><source srcset="/img/catalog-two-way-arrows.svg" type="image/webp"><img class="second-tab-bottom-inputs__arrows" src="/img/catalog-two-way-arrows.svg" alt="arrows"></picture>
             <div class="second-tab-bottom-inputs__input-wrapper">
                <label for="third-tab-bottom-inputs-give">Заплачу</label>
                <input id="third-tab-bottom-inputs-give" readonly type="number" v-model="payFunds" class="second-tab-bottom-inputs__input">
             </div>
          </div>

          <div class="">
            <div v-if="preloaderState">
              <preloader/>
            </div>

            <div class="" v-else>
              <button v-if="authState" class="third-tab-top-inputs__btn second-tab-bottom-inputs__btn catalog-btn-1" @click="createdOrders">Купить</button>
              <router-link to="/sign" v-else><button class="third-tab-top-inputs__btn second-tab-bottom-inputs__btn catalog-btn-1">Войти</button></router-link>
            </div>
          </div>

       </div>
       <!-- блок "выбрать игру в подрок"
       <div class="third-tab__game-select third-tab-game-select">
          <div class="third-tab-game-select__top">
             <div class="third-tab-game-select__input-wrapper">
                <input placeholder="Поиск игры" type="text" class="third-tab-game-select__input">
             </div>
             <button class="third-tab-game-select__btn catalog-btn-1">Найти</button>
          </div>
          <div class="third-tab-game-select__games">
             <div class="third-tab-game-select__game third-tab-game-select-game">
                <div class="third-tab-game-select-game__image">
                   <picture><source srcset="img/catalog-page-game-image.webp" type="image/webp"><img src="img/catalog-page-game-image.png" alt="game image"></picture>
                </div>
                <div class="third-tab-game-select-game__text-block">
                   <h6 class="third-tab-game-select-game__subtitle">Warhammer</h6>
                   <h5 class="third-tab-game-select-game__title">Warhammer: Vermintide 2</h5>
                   <p class="third-tab-game-select-game__price">2299 ₽ </p>
                </div>
                <button class="third-tab-game-select-game__btn catalog-btn-1">Купить</button>
             </div>
             <div class="third-tab-game-select__game third-tab-game-select-game">
                <div class="third-tab-game-select-game__image">
                   <picture><source srcset="img/catalog-page-game-image.webp" type="image/webp"><img src="img/catalog-page-game-image.png" alt="game image"></picture>
                </div>
                <div class="third-tab-game-select-game__text-block">
                   <h6 class="third-tab-game-select-game__subtitle">Warhammer</h6>
                   <h5 class="third-tab-game-select-game__title">Warhammer: Vermintide 2 - Winds of Magic</h5>
                   <p class="third-tab-game-select-game__price">2299 ₽ </p>
                </div>
                <button class="third-tab-game-select-game__btn catalog-btn-1">Купить</button>
             </div>
             <div class="third-tab-game-select__game third-tab-game-select-game">
                <div class="third-tab-game-select-game__image">
                   <picture><source srcset="img/catalog-page-game-image.webp" type="image/webp"><img src="img/catalog-page-game-image.png" alt="game image"></picture>
                </div>
                <div class="third-tab-game-select-game__text-block">
                   <h6 class="third-tab-game-select-game__subtitle">Warhammer</h6>
                   <h5 class="third-tab-game-select-game__title">Warhammer: Vermintide 2</h5>
                   <p class="third-tab-game-select-game__price">2299 ₽ </p>
                </div>
                <button class="third-tab-game-select-game__btn catalog-btn-1">Купить</button>
             </div>
          </div>
       </div> -->
       </div>
    </div>
  </div>
</template>

<script>
  import PreloaderComp from '@/components/usefully/PreloaderComp.vue';

  export default{
    components:{
      preloader: PreloaderComp
    },
    computed:{
      steamMargin(){return this.$store.getters.STEAM_MARGIN;},
      authState(){return this.$store.getters.AUTH_STATE},
    },
    data(){
      return {
        replenish_steam_state: true,
        preloaderState: false,
        receiveErrorState: false,
        loginErrorState: false,
        receiveFunds: null,
        payFunds: null,
        login: "",
        loginErrorMessage: "",
        receiveErrorMessage: "",

      }
    },
    created(){this.$store.dispatch('getSteamMargin');},
    methods:{
      checkOrders: function(){
        let error = {'login': '', 'receive': ''};
        let checkNum = Number(this.receiveFunds);
        let status = true;

        if (this.login.length < 3){
          status = false;
          error.login = "Длина логина не может быть менее 3 символов"
        }

        if (this.receiveFunds === null){
          status = false;
          error.receive = "Вы не ввели желаемую сумму"
        }

        if (isNaN(checkNum) || checkNum === 0){
          status = false;
          error.receive = "Некорректное значения"
        }

        return {"status": status, "error": error}

      },
      createdOrders: function(){
        let validStatus = this.checkOrders()

        if (validStatus.status){
          this.preloaderState = true;
          this.axios.post('/service/steam', {"login": this.login, "amount": this.receiveFunds})
          .then((res)=>{
            this.$router.push('/oreders/result/'+res.data.order_number);
           })
          .finally(()=>{
            this.preloaderState = false;
          })

        }else{
          this.loginErrorMessage = validStatus.error.login;
          this.receiveErrorMessage = validStatus.error.receive;
          this.loginErrorState = true;
          this.receiveErrorState = true;
        }
      },
    },
    watch:{
      receiveFunds(){
        this.payFunds = (this.receiveFunds / 100 * this.steamMargin) + this.receiveFunds;
      },
    }
  }
</script>
