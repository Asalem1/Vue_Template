<template>
  <div class="search-bar form-inline">
    <input class="form-control" placeholder="Add a task here!" v-model="input" type="text">
    <button class="btn" v-on:click="addTask(input)">
      <span class="glyphicon glyphicon-plus-sign"></span> add task
    </button>
  </div>
</template>

<script>
  import AddTask from './addTask.vue'
  import TaskList from './taskList.vue'
  import axios from 'axios'
  export default {
    props: ['tasks'],
    data() {
      return {
        input: ''
      }
    },
    methods: {
      addTask: function(task) {
        task = {
          task: task,
          isEditing: false
        }
        this.tasks.push(task);
        this.input = ''
        axios.post('/api/tasks', {
          body: JSON.stringify({task: task})
        })
        .then((res) => {
          console.log('here is the res: ', res);
        })
        .catch((err) => {
          console.error('here is the error: ', err);
        })
        // fetch('/api/', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     task: task
        //   })
        // })
        // .then((res) => res.json())
        // .then((res) => {
        //   console.log('here is the res in POST: ', res);
        //   this.tasks.push({
        //     task: res.task,
        //     _id: res._id
        //   });
        //   this.input = '';
        // })
        // .catch((err) => {
        //   console.error('here is the error in addTask: ', err);
        // })
      }
    },
    components: {}
  }
</script>

<style scoped>
.navbar {
  background: #fff;
  margin-bottom: 20px;
}
</style>
