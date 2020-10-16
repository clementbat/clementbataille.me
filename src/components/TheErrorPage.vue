<template>
  <div class="errorPage">
    <p>
      Oups, you seem lost, why not go back to the
      <router-link to="/">home page</router-link>?
    </p>
  </div>
</template>

<script>
export default {
  name: "TheErrorPage"
};
</script>

<style scoped>
.errorPage {
  flex: 1;
  margin: auto;
  display: flex;
  align-items: center;
}

p {
}
</style>