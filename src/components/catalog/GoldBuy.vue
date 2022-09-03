<template>
  <div class="gold">
    <div class="c-page-main__tab second-tab">
       <div class="second-tab__wrapper">
       <div class="second-tab__top-inputs-wrapper">
          <div class="second-tab__selects">

             <div class="second-tab__select-wrapper">
                <label for="select-server">Сервер</label>
                <select name="server" id="select-server" class="second-tab__select" v-model="server_selected">
                   <option disabled value="">Выберите Сервер</option>
                </select>
                <span class="second-tab__select-arrow"></span>
             </div>
             <div class="second-tab__select-wrapper">
                <label for="select-side">Сторона</label>
                <select name="server" id="select-side" class="second-tab__select" v-model="side_selected">
                   <option disabled value="">Выберите сторону</option>
                   <option value="1">Альянс</option>
                   <option value="2">Орда</option>
                </select>
                <span class="second-tab__select-arrow"></span>
             </div>
          </div>
          <button class="second-tab__top-btn catalog-btn-1">Найти</button>
       </div>
       <div class="second-tab__bottom-inputs">
          <div class="second-tab-bottom-inputs__availability">
             <h4 class="second-tab-bottom-inputs__availability-title">Наличие</h4>
             <p class="second-tab-bottom-inputs__availability-amount"><span>111</span> ед. золота</p>
          </div>
          <div class="second-tab-bottom-inputs__get-give-block">
             <div class="second-tab-bottom-inputs__input-wrapper">
                <label for="second-tab-bottom-inputs-get">Получу</label>
                <input id="second-tab-bottom-inputs-get" type="text" class="second-tab-bottom-inputs__input">
             </div>
             <picture><source srcset="img/catalog-two-way-arrows.svg" type="image/webp"><img class="second-tab-bottom-inputs__arrows" src="img/catalog-two-way-arrows.svg" alt="arrows"></picture>
             <div class="second-tab-bottom-inputs__input-wrapper">
                <label for="second-tab-bottom-inputs-give">Заплачу</label>
                <input id="second-tab-bottom-inputs-give" type="text" class="second-tab-bottom-inputs__input">
             </div>
          </div>
          <div class="second-tab-bottom-inputs__input-wrapper">
             <label for="second-tab-bottom-inputs-name">Имя персонажа</label>
             <input id="second-tab-bottom-inputs-name" type="text" class="second-tab-bottom-inputs__input">
          </div>
          <button class="second-tab-bottom-inputs__btn catalog-btn-1">Купить</button>
       </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        server_selected: "",
        side_selected: ""
      }
    }
  }
</script>
