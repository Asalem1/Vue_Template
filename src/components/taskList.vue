<template>
  <div>
    <ul class="task-list">
      <task-list-entry v-for="task in tasks" v-bind:key="task" :tasks="tasks" :task="task"></task-list-entry>
    </ul>
  </div>
</template>



<script>
  import TaskListEntry from './taskListEntry.vue'
  export default {
    props: ['tasks'],
    data() {
      return {}
    },
    components: {
      TaskListEntry
    }
  }
</script>

<style scoped>
.task-list {
  background: #fff;
  padding: 8px;
  border: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
}
</style>
