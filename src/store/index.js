import { createStore } from 'vuex'
import jwt_decode from "jwt-decode";
import {time_in_milliseconds} from "@/util/utils";
import axios from 'axios'

export default createStore({
  state: {
    authState: false,
    adminPanel: false,
    steamMargin: 0,
    basketItem: localStorage.basketItem || {'basket': []} ,
    accessToken: localStorage.accessToken || "",
    refreshToken: localStorage.refreshToken || "",
    categoryList: {},
    serviceList: {},
    userData: {},
    backEndUrl: "https://api.azeroth-tavern.com",//"http://127.0.0.1:8000",//"https://api.azeroth-tavern.com",
    discordUrl: "https://discord.gg/PX94sGTAcu",
    vkAuthLink: "https://oauth.vk.com/authorize?client_id=51392990&display=page&redirect_uri=https://api.azeroth-tavern.com/v1/signin/vk&scope=email&response_type=code&v=5.131",

  },
  getters: {
    ADMIN_PANEL: state=> {return state.adminPanel},
    STEAM_MARGIN: state=> {return state.steamMargin},
    USER_DATA: state=> {return state.userData},
    AUTH_STATE: state=> {return state.authState},
    BACK_END_URL: state =>{return state.backEndUrl;},
    DISCORD_URL: state =>{return state.discordUrl;},
    VK_AUTH_LINK: state =>{return state.vkAuthLink;},
    ACCESS_TOKEN: state=>{return state.accessToken;},
    REFRESH_TOKEN: state=>{return state.refreshToken;},
    CATEGORY_LIST: state=>{return state.categoryList},
    SERVICE_LIST: state=>{return state.serviceList},
    BASKET_ITEM: state =>{
      let basketItem = state.basketItem
      if (typeof state.basketItem === 'string'){
        basketItem = JSON.parse(state.basketItem)
      }
      return basketItem.basket;
    },
  },
  mutations: {
    SET_ADMIN_PANEL: (state, payload)=> {state.adminPanel = payload},
    SET_STEAM_MARGIN: (state, payload)=> {state.steamMargin = payload},
    SET_AUTH_STATE: (state, payload)=>{state.authState = payload},
    SET_USER_DATA: (state, payload)=>{state.userData = payload;},
    SET_CATEGORY_LIST: (state, payload)=>{state.categoryList = payload},
    SET_SERVICE_LIST: (state, payload)=> {state.serviceList = payload},
    SET_BASKET_ITEM: (state, payload)=>{
      state.basketItem = {'basket': payload};
      localStorage.basketItem = JSON.stringify(state.basketItem);
    },
    SET_ACCESS_TOKEN: (state, payload)=>{
      state.accessToken = payload;
      localStorage.accessToken = payload;
    },
    SET_REFRESH_TOKEN: (state, payload)=>{
      state.refreshToken = payload;
      localStorage.refreshToken = payload;
    },
  },
  actions: {
    checkStaff: async({commit,getters})=>{
      axios.get('/check/permission', {headers: {
        'Authorization': `Bearer ${getters.ACCESS_TOKEN}`
      }})
      .then(()=>{
        commit('SET_ADMIN_PANEL', true);
      })
      .catch(()=>{
        commit('SET_ADMIN_PANEL', false);
      })
    },

    getCategory: async({commit})=>{
      axios.get('/category')
      .then((res)=>{
        commit('SET_CATEGORY_LIST', res.data.category);
        commit('SET_SERVICE_LIST', res.data.service);
      })
    },

    delBaket: ({commit, getters}, payload)=>{
      let basketItem = getters.BASKET_ITEM;
      let index = basketItem.indexOf(payload);

      if (index !== -1){
        basketItem.splice(index, 1)
        commit('SET_BASKET_ITEM', basketItem)
      }
    },

    getSteamMargin: async({commit})=>{
      axios.get('/steam/margin').then((res)=>{
        commit('SET_STEAM_MARGIN', res.data);
      })
    },

    updateJwtToken: async({getters, dispatch}, exp)=>{
      await setTimeout(()=>{
          console.log("UPDATE TOKEN")
          if (getters.REFRESH_TOKEN){
            axios.put("/refresh",{},{headers: {
                    'Authorization': `Bearer ${getters.REFRESH_TOKEN}`
            }})
            .then((resp)=>{
              dispatch('signIn', {"accessToken": resp.data['access_token'],
                "refreshToken": resp.data['refresh_token']
              })
            })
            .catch(()=>{
              dispatch('cleanAuthData')
            })
          }
          else
            dispatch('cleanAuthData')
      }, exp)
    },

    logOut: async({getters, dispatch})=>{
      if (getters.REFRESH_TOKEN){
        axios.delete('/logout', {
          headers: {
            'Authorization': `Bearer ${getters.REFRESH_TOKEN}`
          }
        })
      }
      dispatch('cleanAuthData')
    },

    checkAuth: async({getters, dispatch})=>{
      if (getters.ACCESS_TOKEN && getters.REFRESH_TOKEN)
        dispatch('signIn', {"accessToken": getters.ACCESS_TOKEN, "refreshToken": getters.REFRESH_TOKEN});

      else
        console.log("NOT TOKEN")
    },

    basketSettings: ({commit, getters}, payload)=>{
      let basketItem = getters.BASKET_ITEM;
      let index = basketItem.indexOf(payload.id);
      let status = true

      switch (payload.type) {
        case 'add':
          if (index === -1)
            basketItem.push(payload.id);

          break;

        case 'del':
          basketItem.splice(index, 1);
          break;

        case 'cleaning':
          basketItem = [];
          break;

        default:
          status = false;
      }

      if (status)
        commit('SET_BASKET_ITEM', basketItem);
    },

    signIn: async({commit, dispatch}, payload)=>{
      let tokenPayload = jwt_decode(payload.accessToken);
      let exp = await time_in_milliseconds(tokenPayload.exp);

      commit('SET_ACCESS_TOKEN', payload.accessToken);
      commit('SET_REFRESH_TOKEN', payload.refreshToken);
      commit('SET_USER_DATA', tokenPayload);
      commit('SET_AUTH_STATE', true);

      dispatch('checkStaff');
      dispatch('updateJwtToken', exp);
    },
    cleanAuthData: async({commit})=>{
      commit('SET_ACCESS_TOKEN', "");
      commit('SET_REFRESH_TOKEN', "");
      commit('SET_USER_DATA', {});
      commit('SET_AUTH_STATE', false);

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  modules: {
  }
})
