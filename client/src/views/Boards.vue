<template>
  <div class="main-wrapper">
    <div class="container-fluid main-container">
      <div class="row">
        <div class="col-md-12">
          <button
            class="btn btn-icon btn-3 btn-secondary d-flex ml-auto"
            type="button"
            data-toggle="modal"
            data-target="#genericPopup"
          >
            <span class="btn-inner--icon">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </span>

            <span class="btn-inner--text">New Board</span>
          </button>
        </div>
      </div>
      <div class="row equal" v-if="!loading">
        <div
          class="col-xs-12 col-sm-6 col-md-4 d-flex pb-3"
          v-for="(board, index) in boards"
          :key="index"
        >
           <router-link class="project-card" :to="{ name: 'board', params: { id: board._id } }">
            <div class="card w-100 h-100 board-item shadow-sm--hover shadow-sm">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title flex-nowrap">{{board.name}}</h5>
                </div>
                <p class="card-text text-truncate">{{board.description}}</p>
              </div>
              <div class="card-footer bg-transparent">
                <div class="details-wrapper">
                  <div class="board-info">
                    <p class="card-text">Lists :10| Items : 25</p>
                  </div>
                  <div class="date">
                    <p class="text-muted">22 July 2019</p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div v-if="loading">Loading....</div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="genericPopup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="createNewBoard">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create Board</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="newBoard.name"
                      class="form-control"
                      placeholder="Board Name"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <textarea
                      v-model="newBoard.description"
                      type="text"
                      rows="3"
                      class="form-control"
                      placeholder="Project Description"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "boards",
  data: function() {
    return {
      newBoard: {
        name: "",
        description: ""
      }
    };
  },
  mounted() {
    this.findBoards({ query: {} }).then(response => {
      const boards = response.data || response;
    });
  },
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" }),
    ...mapGetters("boards", { findBoardsInStore: "find" }),
    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    },

    ...mapState("boards", { loading: "isFindPending" })
  },
  methods: {
    ...mapActions("auth", ["authenticate"]),
    ...mapActions("boards", { findBoards: "find" }),
    createNewBoard() {
      const { Board } = this.$FeathersVuex;
      const board = new Board(this.newBoard);
      board.save().then(() => {
        $("#genericPopup").modal("hide");
        this.newBoard = {
          name: "",
          description: ""
        };
      });
    }
  }
};
</script>

<style scoped lang="scss">
.project-card {
  display: block;
  width: 100%;
}
.details-wrapper {
  display: flex;
  justify-content: space-between;
  .board-info p,
  .date p {
    font-size: 13px;
  }
}
.add-board-link {
  display: flex;
  align-items: center;
}
</style>
