<template>
    <div class="grid">
      <div class="lab">
        <div class="lab0">Task</div>
        <div class="lab1" v-for="(item, n) in todos" :key="n">
          {{ item.task_name }}
        </div>
      </div>
      <div class="date">
        <div class="date0">startedDate</div>
        <div class="date1" v-for="(item, n) in todos" :key="n">
          {{ item.starting_date }}
        </div>
      </div>
      <div class="stat">
        <div class="stat0">Status</div>
        <div class="stat1" v-for="(item, n) in todos" :key="n">
          <div v-if="item.status === '1'" class="One">pending</div>
          <div v-if="item.status === '2'" class="two">completed</div>
          <div v-if="item.status === '3'" class="three">to review</div>
        </div>
      </div>
      <div class="act">
        <div class="act0">Action</div>
        <div class="act1" v-for="(item, n) in todos" :key="n">
          <button class="modify" @click="update(item.id)">Modify</button>
          <button class="delete" @click="remove(item.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="20"
              height="20"
              x="0"
              y="0"
              viewBox="0 0 427 427.001"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
              class=""
            >
              <g>
                <path
                  d="M232.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zM114.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0"
                  fill="white"
                  opacity="1"
                  data-original="#000000"
                  class=""
                ></path>
                <path
                  d="M28.398 127.121V373.5c0 14.563 5.34 28.238 14.668 38.05A49.246 49.246 0 0 0 78.796 427H268a49.233 49.233 0 0 0 35.73-15.45c9.329-9.812 14.668-23.487 14.668-38.05V127.121c18.543-4.922 30.559-22.836 28.079-41.863-2.485-19.024-18.692-33.254-37.88-33.258h-51.199V39.5a39.289 39.289 0 0 0-11.539-28.031A39.288 39.288 0 0 0 217.797 0H129a39.288 39.288 0 0 0-28.063 11.469A39.289 39.289 0 0 0 89.398 39.5V52H38.2C19.012 52.004 2.805 66.234.32 85.258c-2.48 19.027 9.535 36.941 28.078 41.863zM268 407H78.797c-17.098 0-30.399-14.688-30.399-33.5V128h250v245.5c0 18.813-13.3 33.5-30.398 33.5zM109.398 39.5a19.25 19.25 0 0 1 5.676-13.895A19.26 19.26 0 0 1 129 20h88.797a19.26 19.26 0 0 1 13.926 5.605 19.244 19.244 0 0 1 5.675 13.895V52h-128zM38.2 72h270.399c9.941 0 18 8.059 18 18s-8.059 18-18 18H38.199c-9.941 0-18-8.059-18-18s8.059-18 18-18zm0 0"
                  fill="white"
                  opacity="1"
                  data-original="#000000"
                  class=""
                ></path>
                <path
                  d="M173.398 154.703c-5.523 0-10 4.477-10 10v189c0 5.52 4.477 10 10 10 5.524 0 10-4.48 10-10v-189c0-5.523-4.476-10-10-10zm0 0"
                  fill="white"
                  opacity="1"
                  data-original="#000000"
                  class=""
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "TaskView",
  props: {
    todos: {
      type: Array,
    },
    task_id: {
      type: Number,
    },
    task_name: {
      type: Text,
    },
    starting_date: {
      type: Number,
    },
    status: {
      type: Number,
    },
  },
  methods: {
    update(id) {
      // this.$router.push('/sub')
      // this.remove()
      // console.log('id', id)
      // fetch(`http://192.168.100.34:4000/api/task/${id}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   }
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     this.todos = data
      //     console.log(this.todos)})
      this.$router.push({ name: "change", params: { id: id } });
    },
    remove(id) {
      if (confirm("Are you sure, you want to delete this data ?")) {
        // console.log(id)
        this.$axios.delete(`/task/${id}`)
        .then((response) => {
          this.todos = response.data.result
          this.formatcontent()
          window.location.reload(id);
      })
      }
    },
  },
};
</script>

<style>
.grid {
  display: flex;
  flex-direction: row;
  width: 97%;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  gap: 10px;
  padding: 10px 10px 10px 20px;
  margin: 10px auto 0 auto;
}
.lab {
  border-radius: 10px;
  min-width: 40vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.date {
  min-width: 40vh;
  display: flex;
  gap: 10px;
  flex-direction: column;
  border-radius: 10px;
}
.stat {
  min-width: 30vh;
  display: flex;
  gap: 10px;
  flex-direction: column;
  border-radius: 10px;
}
.act {
  border-radius: 10px;
  padding: 5px;
  min-width: 40vh;
  display: flex;
  gap: 10px;
  flex-direction: column;
  border-radius: 10px;
}
.lab0 {
  background-color: rgb(230, 230, 230);
  display: flex;
  height: 15%;
  justify-content: center;
  align-items: center;
  color: #676767;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bolder;
}
.date0 {
  background-color: rgb(230, 230, 230);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  color: #676767;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bolder;
}
.stat0 {
  background-color: rgb(230, 230, 230);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  color: #676767;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bolder;
}
.act0 {
  background-color: rgb(230, 230, 230);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  color: #676767;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bolder;
}
.lab1 {
  background-color: rgb(230, 230, 230);
  color: #676767;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bolder;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.date1 {
  background-color: rgb(230, 230, 230);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #676767;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bolder;
  height: 15%;
}
.stat1 {
  background-color: rgb(230, 230, 230);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  color: #676767;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bolder;
}
.act1 {
  background-color: rgb(230, 230, 230);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 15%;
  color: #676767;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bolder;
}
.modify {
  height: 60%;
  width: 60%;
  background-color: rgb(0, 115, 255);
  border-radius: 5px;
  color: white;
}
.delete {
  height: 60%;
  width: 20%;
  background-color: #434343;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.stat1 select {
  height: 100%;
  width: 100%;
}
.Zero {
  background-color: rgb(255, 210, 127);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.One {
  background-color: bisque;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.two {
  background-color: lightgreen;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.three {
  background-color: lightblue;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
</style>
