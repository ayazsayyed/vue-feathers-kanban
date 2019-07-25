<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-lg-2 ml-lg-auto">
            <div class="position-relative pl-md-5">
              <img src="./../assets/ill-2.svg" class="img-center img-fluid" />
            </div>
          </div>
          <div class="col-lg-6 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
              <div class="loading" v-if="loading">Loading ........</div>
              <form class="card-body p-lg-5" @submit.prevent="login" v-if="!loading">
                <h4 class="mb-1">{{title}}</h4>
                <p class="mt-0">To access some of the coolest & awesome projects.</p>
                <div class="form-group mt-5">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-user-run"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      placeholder="Username"
                      name="username"
                      type="text"
                      v-model="user.username"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-email-83"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      placeholder="Password"
                      name="password"
                      type="password"
                      v-model="user.password"
                    />
                  </div>
                </div>
                <div>
                  <button type="submit" class="btn btn-success btn-round btn-block btn-lg">Login</button>
                  <div class="row d-flex align-items-center mt-3">
                    <div class="col-md-6">
                      <router-link to="/signup" class="register-link">
                        <span class="nav-link-inner--text">New Registeration?</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "login",
  data: function() {
    return {
      title: "LOGIN",
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" })
  },
  methods: {
    ...mapActions("auth", ["authenticate"]),
    login() {
        console.log({...this.user});
        
      // Authenticate with the local email/password strategy
      this.authenticate({
        strategy: "local",
        username:this.user.username,
        password:this.user.password,
      })
        .then(() => {
          // Logged in
          console.log("user logged in..");
           this.$router.push("/boards");
        })
        .catch(e => {
          // Show login page (potentially with `e.message`)
          console.error("Authentication error", e);
        });
    }
  }
};
</script>

<style scoped>
section.main-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.section {
  padding-top: 0;
}

</style>
