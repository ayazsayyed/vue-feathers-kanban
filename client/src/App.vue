<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-gradient-primary-custom">
      <div class="container-fluid">
        <input type="text" class="form-control search-task" placeholder="Search for tasks.." />
        <div class="na" id="navbar-primary">
          <ul class="navbar-nav ml-lg-auto">
            <!-- <li class="nav-item add-board-link">
              <button class="btn btn-icon btn-3 btn-secondary" type="button">
                <span class="btn-inner--icon">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>

                <span class="btn-inner--text">New Board</span>
              </button>
            </li>-->
            <li class="nav-item add-board-link" v-if="!user">
              <button class="btn btn-icon btn-3 btn-secondary" type="button">
                <span class="btn-inner--icon">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>

                <span class="btn-inner--text">
                  <router-link :to="{name:'signup'}">Sign Up</router-link>
                </span>
              </button>
            </li>
            <li class="nav-item add-board-link" v-if="!user">
              <button class="btn btn-icon btn-3 btn-secondary" type="button">
                <span class="btn-inner--icon">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>

                <span class="btn-inner--text">
                  <router-link :to="{name:'login'}">Login</router-link>
                </span>
              </button>
            </li>
            <li class="nav-item add-board-link" v-if="user">
              <button class="btn btn-icon btn-3 btn-secondary" type="button">
                <span class="btn-inner--icon">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>

                <span class="btn-inner--text" @click="logout">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", { user: "payload" })
  },
  mounted() {
    this.authenticate()
      .then(() => {
        // Logged in
        console.log("user already logged in..");
        this.$router.push("/boards");
      })
      .catch(e => {
        // Show login page (potentially with `e.message`)
        console.error("Authentication error", e);
      });
  },
  methods: {
    ...mapActions("auth", ["authenticate"]),
    ...mapActions("auth", { authLogout: "logout" }),
    logout() {
      this.authLogout().then(() => this.$router.push("login"));
    }
  }
};
</script>
