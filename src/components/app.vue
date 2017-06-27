<template>
  <div id="app container" >
    <nav class="navbar">
      <div class="col-md-6 col-md-offset-3">
        <add-task v-bind:key="tasks" :tasks="tasks"></add-task>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-7">
        <task-list v-bind:key="tasks" :tasks="tasks"></task-list>
      </div>
    </div>
  </div>
</template>

<script>
  import AddTask from './addTask.vue'
  import TaskList from './taskList.vue'
  export default {
    data() {
      return {
        tasks: []
      }
    },
    created()  {
      // fetch('/api/tasks')
      //   .then((res) => res.json())
      //   .then((res) => {
      //     console.log('here is the res in GET: ', res);
      //     res.forEach((task) => {
      //       console.log('here is the task in GET: ', task);
      //       this.tasks.push({
      //         task: task.task,
      //         _id: task._id
      //       });
      //     })
      //   })
      // .catch((err) => {
      //   console.error('here is the error: ', err);
      // })
  },
    components: {
      AddTask,
      TaskList
    }
  }
</script>

<style scoped>
.navbar {
  background: #fff;
  margin-bottom: 20px;
}
</style>
