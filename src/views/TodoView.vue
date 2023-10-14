
<template>
  <div id="board">
    <ProfilView></ProfilView>
    <div id="page">
      <div class="part1">
        <div class="tas">Name</div>
        <div class="dat">StartDate</div>
        <div class="end">EndDate</div>
        <div class="sta">Status</div>
        <!-- <button class="modify" @click="modify">Modify</button> -->
      </div>
      <div class="part2">
        <input id="text" type="text" v-model="task.task_name" />
        <input id="date-first" type="date" v-model="task.starting_date" />
        <input id="date-second" type="date" v-model="task.ending_date" />
        <select v-model="task.status">
          <option value="1">Pending</option>
          <option value="2">Completed</option>
          <option value="3">to Review</option>
        </select>
        <button class="create" @click="addList">Validate</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfilView from "@/views/SignUp.vue";
import axios from "axios";
export default {
  name: "TodoView",
  components: {
    ProfilView,
  },
  data() {
    return {
      task: {
        task_id: "",
        task_name: "",
        starting_date: "",
        ending_date: "",
        status: "",
        UserId: null,
        num: "",
      },
    };
  },
  methods: {
    
    addList() {
      if (this.task.task_id != "") {
        //modify
        //   fetch(`http://192.168.100.34:4000/api/task/${this.$route.params.id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     task_name: this.task.task_name,
        //     starting_date: this.task.starting_date,
        //     ending_date: this.task.ending_date,
        //     status: this.task.status
        //   })
        // })
        this.$axios
          .put(`/task/${this.task.task_id}`, {
            id: this.task.task_id,
            task_name: this.task.task_name,
            UserId: this.task.UserId,
            starting_date: this.task.starting_date,
            ending_date: this.task.ending_date,
            status: this.task.status
          })
          .then((response) => {
            this.$router.push('/')
            window.location.reload()
          })
          .catch((error) => {
            alert("An error has occured" , error);
          });
      } else {
        
        console.log("add");
        this.$axios
          .post("/task", this.task)
          .then((response) => {
            console.log(response.data);
            this.$router.push('/')
            window.location.reload()
          })
          .catch((error) => {
            alert("An error has occured");
          });
      }
    },
    GetTodoDetail() {
      this.$axios
        .get(`/task/${this.$route.params.id}`)
        .then((response) => {
          let data = response.data.result
          this.task.task_id = data.id;
          this.task.UserId = data.UserId,
          this.task.task_name = data.task_name;
          this.task.starting_date = data.starting_date.split("T")[0];
          this.task.ending_date = data.ending_date.split("T")[0];
          this.task.status = data.status;
        })
        .catch((error) => {
          alert("there is an error");
        });
      // fetch(`http://192.168.100.34:4000/api/task/${this.$route.params.id}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   }
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     this.task.task_id = data.task_id
      //     this.task.task_name = data.task_name
      //     this.task.starting_date = data.starting_date.split('T')[0]
      //     this.task.ending_date = data.ending_date.split('T')[0]
      //     this.task.status = data.status
      //     console.log(data)})
      //     .catch((error) => {
      //       alert(error)
      //     })
      // }
      //   .then((data) => {
      //       const mod = data.filter(elt => elt.id === this.$route.params.id)
      //       this.task = mod
      //       data.map(elt => {
      //   if (mod) {
      //     this.task = elt
      //   }else if ( elt == [] ){
      //     return this.task
      //   }
      // })
      //       console.log('mod',mod)})
      // const modify = JSON.parse(localStorage.getItem('todos'))
      // const mod = modify.filter(elt => elt.id === this.$route.params.id)
      // console.log('mod', mod)
      // modify.map(elt => {
      //   if (elt.id.toString().includes(this.$route.params.id)) {
      //     this.task = elt
      //   }else if ( elt == [] ){
      //     return this.task
      //   }
      // })
      // console.log('mod', this.task)
    },
  },
  mounted() {
    let paramsid = this.$route.params.id;
    if (paramsid !== "" || paramsid !== undefined) this.GetTodoDetail();
  },
};
</script>

<style>
#board {
  min-height: 90vh;
  width: 80%;
  background-color: rgb(230, 230, 230);
  border-radius: 20px;
}
#page {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  height: 50%;
  border-radius: 10px;
  padding: 80px 20px 80px 20px;
  margin: auto;
  grid-auto-flow: row;
}
.part1 {
  grid-area: 1/1/2/3;
  display: flex;
  font-size: 1.4rem;
  align-items: center;
  background-color: white;
  border-radius: 10px 10px 0 0;
}
.tas {
  display: flex;
  justify-content: left;
  padding-left: 12px;
  align-items: center;
  color: #676767;
  border-radius: 10px;
  font-weight: bolder;
  width: 36%;
}
.dat {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #676767;
  border-radius: 10px;
  font-weight: bolder;
  width: 15%;
}
.end {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #676767;
  border-radius: 10px;
  font-weight: bolder;
  width: 15%;
}
.sta {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #676767;
  font-weight: bolder;
  width: 14%;
}
.create {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  background-color: rgb(0, 115, 255);
  color: white;
  border-radius: 10px;
  font-size: 1.3rem;
}
#text {
  width: 50%;
  height: 100%;
  color: #676767;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
#date-first {
  color: #676767;
  border: 1px solid black;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 20%;
}
#date-second {
  color: #676767;
  border: 1px solid black;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 20%;
}
.part2 {
  grid-area: 2/1/3/3;
  display: flex;
  gap: 10px;
  font-size: 1.5rem;
  align-items: center;
  background-color: white;
  padding: 0 10px 10px 10px;
  border-radius: 0 0 10px 10px;
}
.part2 input {
  height: 100%;
  width: 30%;
}
select {
  width: 20%;
  height: 100%;
}
.part1 .modify {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 10%;
  background-color: rgb(0, 115, 255);
  color: white;
  border-radius: 10px;
  font-size: 1.3rem;
}
</style>
