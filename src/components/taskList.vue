<template>
  <div>
    <div>
      <input v-model="message" v-on:keyup.enter="addToList(message)">
      <button v-on:click="addToList(message)">Add</button>
    </div>
    <ul>
      <transition-group name="fade">
        <list-entry v-for="item in list" v-bind:key="item" :delete-item="deleteItem" :item="item"></list-entry>
      </transition-group>
    </ul>
  </div>
</template>



<script>
  import ListEntry from './ListEntry.vue'
  export default {
    props: ['list'],
    data() {
      return {
        message: ''
      }
    },
    methods: {
      addToList: function(msg) {
        this.list.push({text: msg});
      },
      deleteItem: function(item) {
        var index = this.list.indexOf(item);
        this.list.splice(index, 1);
      }
    },
    components: {
      ListEntry
    }
  }
</script>

<style scoped>
  div {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  div > div {
    height: 20px;
    margin-top: 40px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
