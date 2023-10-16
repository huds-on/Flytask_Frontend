<template>
  <div class="log">
    <button id="SignIn" @click="active = ! active">SignIn</button>
    <div class="popup" v-if="active === false" >
        <div class="page">
            <div class="deletebtn" @click.prevent="close"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" x="0" y="0" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg></div>
            <div class="profile"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M12 23a11 11 0 1 1 11-11 11 11 0 0 1-11 11zm0-20a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm5.54 3.75a7 7 0 0 0-11.08 0 7.95 7.95 0 0 0 11.08 0z" data-name="18 User, Account, Avatar, Man, Profile" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg></div>
            <h1>Sign In</h1>
            <p>Enter your account information</p>
            <form @submit.prevent="submit" autocomplete="off">
              <div class="group">
                <label>Email:</label><br>
                <input type="email" v-model="form.email"><br>
                <p class="err" v-if="!emailValid && form.email!==null">Enter a valid Email</p>
              </div>
              <div class="group">
                <label>Password:</label><br>
                <input type="password" v-model="form.password"><br>
                <p class="err" v-if="!passwordValid && form.password!==null">You must enter atleast eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
              </div>
              <div class="click">
                <button @click.prevent="close" class="cancel">Cancel</button>
                <button class="submit" @click="sendLogIn">SignIn</button>
              </div>
            </form>
            <div class="forget">Forgot your password?<a>SignUp</a></div>
        </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
    active () {
      onn: true
    },
    form: {
      email: null,
      password: null
    }
    }
  },
  computed: {
    emailValid () {
      const regexemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/
      const check2 = regexemail.test(this.form.email)
      return check2
    },
    passwordValid () {
      const regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
      const check3 = regexpassword.test(this.form.password)
      return check3
    },
    formValid () {
     // return true
      return this.emailValid && this.passwordValid
    },
    getTasks(){
      this.$axios.get('/task')
      .then((response) => {
        this.todos = response.data.result
        this.formatcontent()
        console.log(this.todos)
      })
      .catch(error => {
        alert('there is a request problem')
      })
    }
  },
  methods: {
    close () {
      this.form.email = null
      this.form.password = null
      this.active = !this.active
    },
    Formsubmit () {
      if (this.formValid){
        console.log('form submitted', this.form);
        fetch()
      }else {
        console.log('invalid form')
      }
    },
    sendLogIn(){
      let data = {
        email: this.form.email,
        password: this.form.password
      }
      this.$axios.post('/users/login', data)
      .then((response) => {
        this.active = !this.$active
        localStorage.setItem('access_token', JSON.stringify(response.data.access_token))
      })
    },
    getProfile(){
      this.$axios.get(`/users/me`)
      .then((response) =>{
        localStorage.setItem('USER', JSON.stringify(response.data))
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.getProfile()
      this.getTasks()
      alert('User added successfull')
    }, 800);
  }
}
</script>

<style scoped>
.btn #SignIn{
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 30px;
  border: 1px solid black;
}
.log{
    width: 47%;
}
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  cursor: pointer;
}
.page{
  height: 80%;
  width: 40%;
  background-color: white;
  border-radius: 30px;
  margin: auto;
  margin-top: 5%;
}
.deletebtn{
  position: relative;
  top: 20px;
  left: 93%;
  width: 10%;
}
.page h1{
  text-align: center;
  font-size: 1rem;
}
.page p{
  text-align: center;
}
.err{
  color: red;
  font-size: smaller;
}
.page form{
  height: 45%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: 45px;
}
.group{
  height: 30%;
  width: 100%;
}
.group input{
  width: 90%;
  height: 60%;
  font-size: 1.1rem;
  border-radius: 8px;
}
.submit{
  height: 40px;
  width: 50%;
  background-color: rgb(0, 115, 255);
  color: white;
  border-radius: 5px;
  border-radius: 8px;
}
.cancel{
  height: 40px;
  width: 44%;
  border: 3px solid blacl;
  color: black;
  border-radius: 5px;
  background-color: white;
  border-radius: 8px;
}
.subshadow{
  height: 40px;
  width: 44%;
  background-color: rgb(135, 189, 255);
  color: white;
  border-radius: 5px;
  border-radius: 8px;
}
.click{
  display: flex;
  width: 100%;
  gap: 10px;
}
.profile{
  width: 30%;
  position: relative;
  left: 40%;
}
.forget{
  width: 80%;
  height: 10%;
  border-top: 2px solid rgb(122, 122, 122);
  position: relative;
  left: 10%;
  top: 10px;
  padding: 20px 0 0 100px;
  display: flex;
}
.forget a{
  color: rgb(0, 115, 255);
  width: 20%;
}
</style>