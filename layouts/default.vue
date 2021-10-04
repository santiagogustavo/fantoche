<template>
  <v-app dark>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <a target="_blank" class="github-link" href="https://github.com/santiagogustavo">@santiagogustavo</a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  layout: 'default',
};
</script>

<style lang="scss">
.github-link {
  margin-left: 8px;
  color: white !important;
  text-decoration: none;
  font-weight: bold;
}
</style>
