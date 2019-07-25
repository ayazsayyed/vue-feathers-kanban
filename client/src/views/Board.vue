<template>
  <div>
    <div class="container-fluid main-container temp">
      <div class="row">
        <div class="col-md-12">
          <button
            class="btn btn-icon btn-3 btn-secondary d-flex ml-auto"
            type="button"
            data-toggle="modal"
            data-target="#genericPopup2"
          >
            <span class="btn-inner--icon">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </span>

            <span class="btn-inner--text">New Board</span>
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid main-container" v-if="board">
      <div class="board-wrapper">
        <div class="board-details">
          <div class="project-name mb-2">
            <!-- <h3 v-if="showName">{{getBoardName}}</h3> -->
            <input type="text" :value="board.name" class="project-name-input form-control" />
          </div>
          <!-- <p class="project-description">{{projectDescription}}</p> -->
          <input type="text" :value="board.description" class="project-desc-input form-control" />
        </div>
        <div class="row flex-nowrap mt-1 scrollable-div">
          <div class="task-board">
            <div class="board-header">
              <p class="board-name">list.name</p>
              <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
            </div>
            <div class="board-content">
              <ul class="task-list">
                <li class="task-item">
                  <div class="task-item-header">
                    <div class="task-priority High">item.priority Priority</div>
                  </div>
                  <div class="task-item-body">
                    <p class="task-title">this.item.text</p>
                    <!-- <textarea type="text" class="form-control task-title" :value="task.title" rows="2"></textarea> -->
                  </div>
                  <div class="task-item-footer">
                    <div class="comments-attachments">
                      <div class="comments">
                        <i class="far fa-comment-alt"></i> 1
                      </div>
                      <div class="attachment">
                        <i class="fa fa-paperclip"></i> 2
                      </div>
                    </div>
                    <div class="assigned-users">
                      <div class="user-avatar">
                        <img
                          src="https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg"
                          alt
                        />
                      </div>
                      <div class="add-icon">+</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="board-footer">
              <a href="#" class="add-task-btn" @click="createNewTask(0)">
                Add task
                <span>+</span>
              </a>
            </div>
          </div>
        </div>
        <!-- <draggable
          v-model="lists"
          class="row flex-nowrap mt-1 scrollable-div"
          v-bind="getDragOptions"
        >
          <TaskList
            v-for="(listItem, index) in lists"
            :key="index"
            :board="getBoard"
            :list="listItem"
          ></TaskList>
        </draggable>-->
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="genericPopup2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="createNewBoard">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create List</h5>
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
                      v-model="newList.name"
                      class="form-control"
                      placeholder="Board Name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Create</button>
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
  name: "board",
  data: function() {
    return {
        board:{},
      newList: {
        name: ""
      }
    };
  },
  mounted() {
      console.log('this.$route.params.id ', this.$route.params.id);
      
    this.getBoard(this.$route.params.id).then(response => {
      this.board = response.data || response;
    });
  },
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" }),
    ...mapGetters("boards", { getBoardInStore: "get" }),
    // board() {
    //   return this.getBoardInStore(this.$route.params.id).data;
    // },

    // ...mapState("boards", { loading: "isFindPending" })
  },
  methods: {
    ...mapActions("auth", ["authenticate"]),
    ...mapActions("boards", { getBoard: "get" }),
    createNewList() {
      const { List } = this.$FeathersVuex;
      const list = new List(this.newList);
      list.save().then(() => {
        $("#genericPopup2").modal("hide");
        this.newList = {
          name: ""
        };
      });
    },
    createNewTask() {}
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
