<template>
  <div>
    <input type="text" name="name" v-model="name" />
    <input type="password" v-model="password" />
    <button @click="login">login</button>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  // 1 [Note] A temporary password is generated for root@localhost: (fzxoqr6?ftK
  methods: {
    login() {
      // restful 风格的 api
      axios.post('/api/V1/login', {
        name: this.name,
        password: this.password
      })
      .then(res => {
        // if (res.)
        console.log(res)
      })
    }
  }
}
</script>