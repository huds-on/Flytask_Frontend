<template>
  <div class="first-bar">
    <div class="btn" >
      <signIn></signIn>
      <button id="Sign" @click="active = ! active">SignUp</button>
        <div class="overlay" v-if="active === false" >
          <div class="page">
            <div class="deletebtn" @click.prevent="close"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" x="0" y="0" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg></div>
            <div class="profile"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M12 23a11 11 0 1 1 11-11 11 11 0 0 1-11 11zm0-20a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm5.54 3.75a7 7 0 0 0-11.08 0 7.95 7.95 0 0 0 11.08 0z" data-name="18 User, Account, Avatar, Man, Profile" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg></div>
            <h1>Sign Up</h1>
            <form @submit.prevent="Formsubmit" autocomplete="off">
              <div class="form-group">
                <label>Name:</label><br>
                <input type="text" v-model="form.name">
                <p class="Error" v-if="!nameValid && form.name!==null">The name should be at least 2 characters</p>
              </div>
              <div class="form-group">
                <label>Email:</label><br>
                <input type="email" v-model="form.email">
                <p v-if="!emailValid && form.email!==null" class="Error">Enter a valid email</p>
              </div>
              <div class="form-group">
                <label>Password:</label><br>
                <input type="password" v-model="form.password" autocomplete="onn">
                <p v-if="!passwordValid && form.password!==null" class="Error">You must enter atleast eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
              </div>
              <div class="click">
                <button @click.prevent="close" class="cancel">Cancel</button>
                <button @click="SendRegister" class="sub" >Submit</button>
              </div>
              <!-- <div class="form-group">
                <label>Confirm Password:</label><br>
                <input type="password" v-model="form.confirm" autocomplete="off">
                <p v-if="!confirmValid && form.confirm!==null" class="Error">confirm your password</p>
              </div> -->
              <div class="forget">Allready have an account?<a>SignIn</a></div>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import SignIn from '@/views/SignIn.vue'

export default {
  name: 'SignUp',
  components: {
    SignIn
  },
  data () {
    return {
    active () {
      onn: true
    },
    form: {
      name: null,
      email: null,
      password: null,
      confirm: null,
      error: true
    }
   }
  },
  computed: {
    nameValid () {
      const regexname = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/
      const check1 = regexname.test(this.form.name)
      return check1
    },
    emailValid () {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/
      const check2 = regexEmail.test(this.form.email)
      return check2
    },
    passwordValid () {
      const regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
      const check3 = regexpassword.test(this.form.password)
      return check3
    },
    // confirmValid () {
    //   if (this.form.password !== this.form.confirm){
    //     return false
    //   }
    //   return true
    // },
    formValid () {
     // return true
      return this.nameValid && this.emailValid && this.passwordValid
    }
  },
  methods: {
    close () {
      this.form.name = null
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
    SendRegister(){
      let data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      this.$axios.post('/users/register', data)
      .then((response) => {
        this.active = ! this.$active
        setTimeout(() => {
          this.getTasks()
          console.log(data);
          alert('User added successfull')
        }, 800);
        console.log(response)
      })
    }
  }
}
</script>
<style scoped>

.overlay {
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
.first-bar{
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  background-color: white;
  border-radius: 25px 25px 0 0;
  padding-right: 20px;
}
.page{
  height: 95%;
  width: 40%;
  background-color: white;
  border-radius: 30px;
  margin: auto;
  margin-top: 1.3%;
}

.deletebtn{
  position: relative;
  top: 20px;
  left: 93%;
}
.form-group .Error{
  color: red;
  font-size: smaller;
}
.page h1{
  text-align: center;
  position: relative;
  font-size: 1rem;
}
.page form{
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10%;
}
.profile{
  width: 30%;
  position: relative;
  left: 40%;
}
.form-group{
  height: 18%;
  width: 100%;
}
.form-group input{
  width: 90%;
  height: 50%;
  font-size: 1.1rem;
  border-radius: 10px;
}
.btn{
  height: 50%;
  width: 20%;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
}
.btn #Sign{
  height: 100%;
  width: 47%;
  color: white;
  background-color: rgb(0, 115, 255);
  border-radius: 30px;
}
.sub{
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
.forget{
  width: 90%;
  height: 10%;
  border-top: 2px solid rgb(122, 122, 122);
  position: relative;
  left: 0;
  top: 10px;
  padding: 20px 0 0 100px;
  display: flex;
}
.forget a{
  color: rgb(0, 115, 255);
  width: 20%;
}
</style>