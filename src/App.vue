<template>
  <nav>
    <header class="header">
      <div class="container">
         <div class="header__wrapper">

            <input title="t" placeholder="" id="header-check" class="header-burger__checkbox header-burger" type="checkbox" v-model="burgerMenu">
            <label for="header-check" class="header__burger header-burger">
               <span></span>
            </label>
            <div class="header-actions header__actions">
               <a href="/" class="header__logo"><picture><source srcset="/img/header-logo-1.svg" type="image/webp"><img src="/img/header-logo-1.svg" alt="header logo"></picture></a>
               <router-link to="/basket" class="header-busket header__busket"><span>{{basketCount}}</span></router-link>
               <div class="header-actions__user header-actions-user _desk">
                  <picture><source srcset="/img/user-icon.svg" type="image/webp"><img src="/img/user-icon.svg" alt="user-icon" class="header-actions-user__icon"></picture>
                  <input id="header-user-dropp-menu-checkbox" class="header-actions-user__checkbox" type="checkbox" v-model="menuListState">
                  <div>
                    <label v-if="!authState" class="header-actions-user__arrow" for="header-user-dropp-menu-checkbox">Войти</label>
                    <label v-else class="header-actions-user__arrow" for="header-user-dropp-menu-checkbox">{{userData.username}}</label>
                  </div>

                  <ul class="header-actions-user__dropp-menu header-actions-user-dropp-menu" @click="closeBurgerMenu">
                    <div class="" v-if="authState">
                     <li v-if="adminPanel"><router-link to="/admin" class="header-actions-user-dropp-menu__item">Админ. панель</router-link></li>
                     <li v-if="authState"><router-link to="/orders" class="header-actions-user-dropp-menu__item">Заказы</router-link></li>
                   </div>

                    <div class="">
                      <li v-if="!authState"><router-link to="/sign" class="header-actions-user-dropp-menu__item" @click="menuListState = false;">Войти</router-link></li>
                      <li v-else><a href="#" class="header-actions-user-dropp-menu__item" @click="logOut">Выйти</a></li>
                    </div>
                  </ul>
               </div>
               <div class="header-actions__user header-actions-user _mobile">
                  <picture><source srcset="/img/user-icon.svg" type="image/webp"><img src="/img/user-icon.svg" alt="user-icon" class="header-actions-user__icon"></picture>
                  <router-link to="/sign" v-if="!authState"  class="header-actions-user__arrow" for="header-user-dropp-menu-checkbox">Войти</router-link>
                  <label v-else class="header-actions-user__arrow" for="header-user-dropp-menu-checkbox">{{userData.username}}</label>
               </div>
            </div>
            <nav class="header__menu ">
               <ul class="header__list" @click="closeBurgerMenu">
                  <li><a href="/#about" class="header__link">О нас</a></li>
                  <li><a href="/#advantages" class="header__link">Преимущества</a></li>
                  <li><a href="/#how-we-work" class="header__link">Как мы работаем</a></li>
                  <li><a href="/#reviews" class="header__link">Отзывы</a></li>
                  <li v-if="adminPanel"><router-link to="/admin" class="header__link _mobile">Админ. панель</router-link></li>
                  <li><router-link to="/catalog" class="header__link _mobile">Каталог</router-link></li>
                  <li v-if="authState"><router-link to="/orders" class="header__link">Заказы</router-link></li>
                  <li @click="logOut" v-if="authState" ><router-link to="/catalog" class="header__link _mobile">Выйти</router-link></li>

               </ul>
               <div class="header__socials-links">

                  <a :href="discordUrl" class="header__discord-link _mobile" target="blank_">
                     <picture><source srcset="/img/discord-image.svg" type="image/webp"><img src="/img/discord-image.svg" alt="discord"></picture>
                  </a>
                  <a href="#" class="header__vk-link _mobile">
                     <picture><source srcset="/img/vk-icon.svg" type="image/webp"><img src="/img/vk-icon.svg" alt="vk link"></picture>
                  </a>
               </div>
            </nav>
            <router-link to="/catalog" class="header__catalog _desk">Каталог</router-link>
         </div>


      </div>

   </header>

  </nav>

  <router-view v-slot="{Component}">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>

  </router-view>

  <footer class="footer">
   <div class="container">
      <div class="footer__content footer-content">
         <div class="footer-content__right">
            <picture><source srcset="/img/footer-logo.svg" type="image/webp"><img src="/img/footer-logo.svg" alt="footer-logo" class="footer-content__logo"></picture>
                <div class="footer-content__log-in _desk" v-if="authState">
                  <picture><source srcset="/img/user-icon.svg" type="image/webp"><img src="/img/user-icon.svg" alt="user"></picture>{{userData.username}}
                </div>

                <router-link v-else to="/sign" class="footer-content__log-in _desk">
                    <picture><source srcset="/img/user-icon.svg" type="image/webp"><img src="/img/user-icon.svg" alt="user"></picture>Войти
                </router-link>

         </div>
         <nav class="footer-content__center">
            <ul class="footer-content__menu">
               <li><a href="/#about" class="footer-content__menu-link">О нас</a></li>
               <li><a href="/#advantages" class="footer-content__menu-link">Преимущества</a></li>
               <li><a href="/#how-we-work" class="footer-content__menu-link">Как мы работаем</a></li>
               <li><a href="/#reviews" class="footer-content__menu-link">Отзывы</a></li>
            </ul>
         </nav>
         <div class="footer-content__social-links _desk">

            <a :href="discordUrl" class="footer-content__discord-link " target="blank_">
               <picture><source srcset="/img/discord-image.svg" type="image/webp"><img src="/img/discord-image.svg" alt="discord"></picture>
            </a>
            <a href="#" class="footer-content__vk-link">
               <picture><source srcset="/img/vk-icon.svg" type="image/webp"><img src="/img/vk-icon.svg" alt="vk"></picture>
            </a>
         </div>
         <div class="footer-content__left">
            <div class="footer-content__social-links _mobile">

               <a :href="discordUrl" class="footer-content__discord-link " target="blank_">
                  <picture><source srcset="/img/discord-image.svg" type="image/webp"><img src="/img/discord-image.svg" alt="discord"></picture>
               </a>
               <a href="#" class="footer-content__vk-link">
                  <picture><source srcset="/img/vk-icon.svg" type="image/webp"><img src="/img/vk-icon.svg" alt="vk"></picture>
               </a>
            </div>

            <div class="footer-content__log-in _mobile" v-if="authState">
              <picture><source srcset="/img/user-icon.svg" type="image/webp"><img src="/img/user-icon.svg" alt="user"></picture>{{userData.username}}
            </div>

          <router-link v-else to="/sign" class="footer-content__log-in _mobile">
            <picture><source srcset="/img/user-icon.svg" type="image/webp"><img src="/img/user-icon.svg" alt="user"></picture>
            Войти
          </router-link>
          <router-link to="/catalog" class="footer-content__catalog">Каталог</router-link>
         </div>
      </div>
   </div>
</footer>

</template>

<script>
  export default{
    computed: {
      discordUrl(){return this.$store.getters.DISCORD_URL},
      authState(){return this.$store.getters.AUTH_STATE},
      userData(){return this.$store.getters.USER_DATA},
      accessToken(){return this.$store.getters.ACCESS_TOKEN},
      adminPanel(){return this.$store.getters.ADMIN_PANEL},
      basketCount(){
        let basket = this.$store.getters.BASKET_ITEM;
        return basket.length
      }
    },
    data(){
      return{
        menuListState: false,
        burgerMenu: false
      }
    },
    async created(){
      await this.$store.dispatch('checkAuth');
      if (this.authState)
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;

    },
    methods:{
      logOut: async function(){
        await this.$store.dispatch('logOut');
        this.closeBurgerMenu()
      },
      closeBurgerMenu: function(){
        this.burgerMenu = false;
        this.menuListState = false;
      }
    },
    watch:{
      accessToken(){
        if (this.authState)
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      },
    }
  }
</script>

<style>
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.15s ease-out;
}
</style>
