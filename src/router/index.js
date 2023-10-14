import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoView from '../views/TodoView.vue'
import WorkFlow from '@/components/WorkFlow.vue'
import SignUp from '@/views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'see',
    component: WorkFlow
  },
  {
    path: '/sub',
    name: 'add',
    component: TodoView
  },
  {
    path: '/sub/:id',
    name: 'change',
    component: TodoView
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
