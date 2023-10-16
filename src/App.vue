<template>
  <div id="app">
    <div id="header">
      <div id="logo">FlyTask</div>
      <div class="menu">
        <nav>
          <ul>
            <li><router-link to="/"><button>Home</button></router-link></li>
            <li><button id="add"  @click="nav">Create task</button></li>
          </ul>
        </nav>
      </div>
      <div class="task">
        <div id="top">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="120" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><circle cx="32" cy="32" r="31" fill="#e6ecff" opacity="1" data-original="#e6ecff" class=""></circle><g fill="#4294ff"><path d="M56.877 50.475a31.065 31.065 0 0 0-49.765-.016 30.967 30.967 0 0 0 49.765.016z" fill="#4294ff" opacity="1" data-original="#4294ff" class=""></path><circle cx="32" cy="22" r="12" fill="#4294ff" opacity="1" data-original="#4294ff" class=""></circle></g></g></svg>
          <p>{{ profile.name }}</p>
        </div>
      </div>
    </div>
    <router-view/>
    <div class="charge" v-if="showLoad">
      <div class="loader"></div>
      <h1>Loading . . . .</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
    return {
      create: false,
      showLoad: false,
      profile: null
    }
  },
  methods: {
    nav () {
      this.$router.push('/sub')
    }
  },
  mounted () {
    this.showLoad = true
    this.profile = JSON.parse(localStorage.getItem('USER'))
    setInterval(() => {
        this.showLoad = false
      },1500);
    },
    // updated () {
    //   this.showLoad = true
    // this.profile = JSON.parse(localStorage.getItem('USER'))
    // setInterval(() => {
    //     this.showLoad = false
    //   },1500);
    // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@500&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app{
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
  position: relative;
  font-family: 'Onest', sans-serif;
  background-color: rgb(0, 0, 28);
  padding: 15px;
}
#app #header{
  width: 20%;
  max-height: 100%;
  padding: 0 10px 0 0;
}
#logo{
  width: 100%;
  height: 10%;
  color: white;
  font-size: 2.5rem;
}
.menu{
  width: 100%;
  height: 60%;
  font-size: 1.5rem;
  padding-top: 25px;
}
.menu li{
  height: 40px;
  column-gap: 20px;
  margin: 10px 10px 0px 10px;
  display: flex;
}
a{
  width: 100%;
  height: 100%;
  display: flex;
  text-decoration: none;
}
li button{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: none;
  border-radius: 15px;
  width: 100%;
  background-color: rgb(53, 53, 53);
  color: aliceblue;
}

li button:active{
  background-color: aliceblue;
  color: rgb(53, 53, 53);
}

.task{
  width: 100%;
  height: 30%;
  background-color: whitesmoke;
  border-radius: 20px;
  gap: 0;
}
.task #top{
  position: relative;
  top: 10px;
  width: 100%;
  height: 100%;
}
#top svg{
  position: relative;
  left: 25%;
}
#top p{
  font-weight: bolder;
  font-size: 1.2rem;
  text-align: center;
}
.task #add{
  width: 100%;
  height: 20%;
  margin-top: 32px;
  color: aliceblue;
  font-size: 1.2rem;
  border-radius: 10px;
  text-align: center;
  padding: 5px;
}
.charge{
  background-color: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 96%;
  margin-left: -15px;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  color: white;
}
.charge h1{
  margin: 200px 0 0 0;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 150px;
  height: 150px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  position: fixed;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
