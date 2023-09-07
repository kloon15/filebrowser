import { disableExternal } from "@/utils/constants";
import { createApp } from "vue";
import Noty from "noty";
import VueLazyload from "vue-lazyload";
import createPinia from "@/stores";
import router from "@/router";
import i18n from "@/i18n";
import App from "@/App.vue";
import '@/css/styles.css'

// configureCompat({ RENDER_FUNCTION: false });

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
// register dayjs plugins globally
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

const pinia = createPinia(router);

const app = createApp(App);

app.use(VueLazyload);

app.use(i18n);
app.use(pinia);
app.use(router);

app.mixin({
  mounted() {
    // expose vue instance to components
    this.$el.__vue__ = this;
  },
});

// provide v-focus for components
app.directive("focus", {
  mounted: (el) => {
    // initiate focus for the element
    el.focus();
  },
});

const notyDefault: Noty.Options = {
  type: "info",
  layout: "bottomCenter",
  timeout: 1000,
  progressBar: true,
};

// app.provide("$noty", (opts) => {
//   new Noty(Object.assign({}, notyDefault, opts)).show();
// });

app.provide("$showSuccess", (message: any) => {
  new Noty(
    Object.assign({}, notyDefault, {
      text: message,
      type: "success",
    })
  ).show();
});

app.provide("$showError", (error: any, displayReport = true) => {
  let btns = [
    // @ts-ignore
    Noty.button(i18n.global.t("buttons.close"), "", function () {
      n.close();
    }),
  ];

  if (!disableExternal && displayReport) {
    btns.unshift(
      Noty.button(i18n.global.t("buttons.reportIssue"), "", function () {
        window.open(
          "https://github.com/filebrowser/filebrowser/issues/new/choose"
        );
      })
    );
  }

  let n = new Noty(
    Object.assign({}, notyDefault, {
      text: error.message || error,
      type: "error",
      timeout: null,
      buttons: btns,
    })
  );

  n.show();
});

router.isReady().then(() => app.mount("#app"));