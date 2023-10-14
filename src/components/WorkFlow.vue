<template>
    <div id="main">
      <SignUp/>
      <TaskView
      :todos="todos"
      />
      <!-- <div>{{ todos }}</div> -->
  </div>
</template>

<script>
import TaskView from '@/components/TaskView.vue'
import SignUp from '@/views/SignUp.vue'
import TodoView from '@/views/TodoView.vue'

export default {
  name: 'WorkFlow',
  components: {
    TaskView,
    SignUp,
    TodoView
  },
  data () {
    return {
      todos: []
    }
  },
  methods: {
    formatcontent (n) {
      this.todos.map(elt => {
        elt.starting_date = elt.starting_date != null ? elt.starting_date.split('T')[0] : ''
        return elt.starting_date
      })
    },
    Getfetch () {
      console.log('execution')
     this.$axios.get('task')
      .then((response) => {
        this.todos = response.data.result
        this.formatcontent()
      })
      .catch(error => {
        alert('there is a request problem')
      })
      // fetch('http://192.168.100.186:4000/api/task', {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   }
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     this.todos = data
      //     this.formatcontent()
      //     console.log(data)})
    }
    },
    mounted () {
    // this.formatcontent()
    // axios
    // .get('http://192.168.100.34:4000/api/task/1')
    // .then((res)=>this.todos = res.data)
    // .then((res) => console.log(res.data))
    this.Getfetch()
    }
  }
</script>

<style>
#main{
  width: 80%;
  max-height: 100%;
  background-color: rgb(230, 230, 230);
  border-radius: 20px;
}
</style>
