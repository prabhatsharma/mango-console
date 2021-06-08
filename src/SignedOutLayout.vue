<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="c_header" height-hint="8">
      <q-toolbar>
        <q-toolbar-title>
          <div class="logo_class">
            <!-- <img src="./assets/uniqin-blue.png" height="50px" width="130px" /> -->
          </div>
        </q-toolbar-title>

        <div class="headerItems">
          <q-tabs align="center">
            <q-route-tab to="/">
              <div class="col headerItem">
                <div class="q-tab__label">Home</div>
              </div>
            </q-route-tab>
            <q-route-tab to="/product">
              <div class="col">
                <div class="q-tab__label">Products</div>
              </div>
            </q-route-tab>
            <q-route-tab to="/about">
              <div class="col">
                <div class="q-tab__label">About</div>
              </div>
            </q-route-tab>
            <q-route-tab to="/pricing">
              <div class="col">
                <div class="q-tab__label">Pricing</div>
              </div>
            </q-route-tab>
            <!-- <q-route-tab to="/product" label="Products" />
            <q-route-tab to="/about" label="About" />
            <q-route-tab to="/pricing" label="Pricing" /> -->
          </q-tabs>
        </div>

        <div>
          <q-btn
            v-if="!$store.state.signedIn"
            type="a"
            :href="signInURL"
            label="Sign In"
            color="blue"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <div>
      <q-footer class="footer">
        <div class="footerHead">UniQin</div>
        <div class="copyRight">Copyright © 2021 uniQin.ai</div>
      </q-footer>
    </div>
  </q-layout>
</template>

<script>
// import awsconfig from "./aws-exports";

export default {
  name: "SignedOutLayout",
  computed: {
    signInURL() {
      return "amazon.com";
      // var client_id = awsconfig.aws_user_pools_web_client_id;

      // var justUrl = awsconfig.oauth.domain;
      // var cognitoUrl =
      //   "https://" +
      //   justUrl +
      //   "/login?response_type=code&client_id=" +
      //   client_id +
      //   "&redirect_uri=";
      // var baseURL = window.location.origin + "/auth/signin/";

      // return cognitoUrl + baseURL;
    },
  },
};
</script>
