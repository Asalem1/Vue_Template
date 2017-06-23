<template>
  <div class="search-bar form-inline">
    <input class="form-control" placeholder="Add a task here!" v-model="input" type="text">
    <p>input is {{input}}</p>
    <button class="btn" v-on:click="addTask(input)">
      <span class="glyphicon glyphicon-plus-sign"></span> add task
    </button>
  </div>
</template>

<script>
  import AddTask from './addTask.vue'
  import TaskList from './taskList.vue'
  export default {
    props: ['tasks'],
    data() {
      return {
        input: ''
      }
    },
    methods: {
      addTask: function(task) {
        console.log('here is the task in POST: ', task);
        fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            task: task
          })
        })
        .then((res) => res.json())
        .then((res) => {
          console.log('here is the res in POST: ', res);
          this.tasks.push({
            task: res.task,
            _id: res._id
          });
        })
        .catch((err) => {
          console.error('here is the error: ', err);
        })
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
