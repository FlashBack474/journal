<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Авторизация</h1>
      <label>Имя</label>
      <input required v-model="username" type="text" placeholder="Имя"/>
      <label>Пароль</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Пароль"
      />
      <hr />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
  import { AUTH_REQUEST } from "actions/auth";

  export default {
    name: "login",
    data() {
      return {
        username: "test",
        password: "1234"
      };
    },
    methods: {
      login: function() {
        const { username, password } = this;
        this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
          this.$router.push("/");
        });
      }
    }
  };
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
}
</style>


