<template>
  <div>
    <div class="headline">
      <h1>Профиль:</h1>
    </div>
    <p v-if="profile.name">
      <strong>Имя:</strong> {{ profile.title }} {{ profile.name }}
    </p>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "account",
    computed: mapState({ profile: state => state.user.profile })
  };
</script>

<style lang="scss" scoped>
.headline {
  margin-top: 1em;
  display: flex;
  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
}
</style>


