import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import CenterContainer from "components/lib/center-container";

Vue.config.productionTip = false;

Vue.component("center-container", CenterContainer);


Vue.directive('sanitize', {
  bind(el, binding, vnode) {
    let itemsArr = binding.arg
    let i = 0
    let sanitizeInput
    while ( i < itemsArr.length){
      sanitizeInput = function(e) {
        let a = new RegExp('<' + itemsArr[i] + '>', 'g')
        e.target.value.replace(a, '')
        vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
        // if (e.target.value.length > maxChars) {
        //   e.target.value = e.target.value.substr(0, maxChars);
        //
        // }
      }
      i++
    }
    el.addEventListener('input', sanitizeInput);
  },
})

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
