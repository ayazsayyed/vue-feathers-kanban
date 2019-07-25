<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center justify-content-md-center">
          <div class="col-lg-8 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
                <div class="loading" v-if="loading">............</div>
              <form class="card-body p-lg-5" @submit.prevent="signUp" v-if="!loading">
                <h4 class="mb-1">Register</h4>
                <p class="mt-0">To access some of the coolest & awesome projects.</p>
                <div class="form-group mt-3">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="username"
                      type="text"
                      v-model="user.username"
                      required
                    />
                  </div>
                </div>
                <div class="form-group mt-3">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="password"
                      type="password"
                      v-model="user.password"
                      required
                    />
                  </div>
                </div>
                <div class="form-group mt-3">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Confirm password"
                      type="password"
                      v-model="user.confirmPassword"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Display Name"
                      type="text"
                      v-model="user.displayName"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="imageUrl"
                      type="text"
                      v-model="user.imgUrl"
                      required
                    />
                  </div>
                </div>
                <div>
                  <button type="submit" class="btn btn-success btn-round btn-block btn-lg">Sign up</button>
                </div>
                <router-link to="/login" class="register-link">
                  <span class="nav-link-inner--text">Already Registered?</span>
                </router-link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "signup",
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        displayName: "",
        imgUrl: ""
      }
    };
  },
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    signUp() {
      console.log("submit...");
      const { User } = this.$FeathersVuex;
      const user = new User(this.user);
      user.save().then(user => {
        this.$router.push("/login");
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
.register-link {
  float: right;
  margin-top: 15px;
}
</style>