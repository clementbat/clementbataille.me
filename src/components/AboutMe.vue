<template>
  <section>
    <h1>Clément Bataille</h1>
    <h2>Software engineer</h2>
    <p>
      I'm currently living in Paris and my last position was software engineer at
      <a href="https://www.actiondesk.io" target="_blank">Actiondesk</a>,
      where I built a spreadsheet in San Francisco and remotely.
    </p>
    <p>
      Before that, I was lead software engineer at
      <a href="https://www.foxintelligence.fr" target="_blank">Foxintelligence</a>
      (Paris) building
      <a href="https://foxwatch.io" target="_blank">Foxwatch</a>, a data visualization platform.
    </p>
    <p>I like new technologies, startups, traveling, reading, and learning things every day.</p>
    <p>
      Things I value in a project: long term vision, ambition, strong culture, trust, ownership,
      <a href="https://angel.co/blog/product-engineering-at-angellist-talent" target="_blank">
        product engineering
        culture
      </a>.
    </p>
  </section>
</template>

<script>
export default {
  name: "AboutMe"
};
</script>

<style scoped>
img {
  padding: 10px;
  vertical-align: middle;
}

section {
  padding-top: 120px;
  max-width: 570px;
  margin: auto;
}

h2 {
  margin-top: 10px;
  margin-bottom: 40px;
  color: #979797;
}

@media screen and (max-width: 1200px) and (min-width: 800px) {
  section {
    max-width: 60vw;
  }
}

@media screen and (max-width: 800px) {
  section {
    max-width: 80vw;
  }
}
</style>
