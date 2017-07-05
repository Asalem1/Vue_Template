<template>
  <div>
    <li class="task-list-entry media" v-on:click="deleteItem(item)">{{item.text}}</li>
  </div>
</template>
<template>
  <div>
    <li v-if="!task.isEditing" class="task-list-entry media">
      <div class="media-body">
        <div>{{task.task}}</div>
      </div>
      <button class="btn" v-on:click="toggleEdit(task)"><span class=" glyphicon glyphicon-erase"></span> edit </button>
      <button class="btn" v-on:click="deleteTask(task)"><span class="glyphicon glyphicon-remove-circle"></span> delete</button>
    </li>

    <li v-if="task.isEditing" class="task-list-entry media">
      <div class="media-body">
        <input class="form-control" v-model="input" type="text">
      </div>
      <button class="btn" v-on:click="updateTask()"><span class=" glyphicon glyphicon-ok-circle"></span> update </button>
      <button class="btn" v-on:click="toggleEdit(task)"><span class=" glyphicon glyphicon-ban-circle"></span> cancel</button>
    </li>
  </div>
</template>

<script>
  export default {
    props: ['task', 'tasks'],
    data() {
      return {
        input: ''
      }
    },
    updated() {
      if (!this.task.isEditing) {
        return {}
      } else {
        return {
          input: ''
        }
      }
    },
    methods: {
      toggleEdit: function(task) {
        task.isEditing = !task.isEditing;
      },
      updateTask: function() {
        if (!this.input) {
          return alert('please enter a task');
        }
        console.log('here is the task: ', this.task)
        this.task.task = this.input,
        // this.toggleEdit(this.task);
        // task.isEditing = false;
        fetch('/api/tasks/' + this.task._id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            task: this.input
          })
        })
        .then((res) => res.json())
        .then((res) => {
          this.toggleEdit(this.task);
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
