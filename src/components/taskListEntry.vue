<template>
  <div>
    <li class="task-list-entry media" v-on:click="deleteItem(item)">{{item.text}}</li>
  </div>
</template>
<template>
  <div>
    <li v-if="!task.editing" class="task-list-entry media">
      <div class="media-body">
        <div>{{task.task}}</div>
      </div>
      <button class="btn" v-on:click="toggleEdit(task)"><span class=" glyphicon glyphicon-erase"></span> edit </button>
      <button class="btn" v-on:click="deleteTask(task)"><span class="glyphicon glyphicon-remove-circle"></span> delete</button>
    </li>

    <li v-if="task.editing" class="task-list-entry media">
      <div class="media-body">
        <input ngclass="form-control"  type="text" ng-model="task.task" />
      </div>
      <button class="btn" v-on:click="updateTask(task)"><span class=" glyphicon glyphicon-ok-circle"></span> update </button>
      <button class="btn" v-on:click="toggleEdit(task)"><span class=" glyphicon glyphicon-ban-circle"></span> cancel</button>
    </li>
  </div>
</template>

<script>
  export default {
    props: ['task', 'tasks'],
    methods: {
      toggleEdit: function(task) {
        task.editing = !task.editing;
      },
      updateTask: function(task) {
        if (!task.task) {
          return alert('please enter a task');
        }
        task.editing = false;
        fetch('/api/tasks/' + task.task._id, {
          method: 'PUT',
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
          this.toggleEdit(task);
        })
      },
      deleteTask: function(taskToDelete) {
        let deleted;
        fetch('/api/tasks/' + taskToDelete._id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((res) => res.json())
        .then((res) => {
          this.tasks.forEach(function(todo, i) {
            if (todo.task === taskToDelete.task) {
              deleted = i;
              return;
            }
          })
          this.tasks.splice(deleted, 1);
        })
      }
    },
    data() {
      return {}
    }
  }
</script>

<style>
.task-list-entry {
  font-size: 16px;
  padding: 8px;
}

.task-list-entry-title {
  font-weight: bold;
}

.task-list-entry-title:hover {
  color: #e62117;
  cursor: pointer;
}

.task-list-entry-detail {
  font-size: 12px;
  color: #999;
}

.media-body {
  padding-left: 20px;
}
</style>
