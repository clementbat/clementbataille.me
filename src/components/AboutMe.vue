<template>
    <section>
        <h1>
            Clément Bataille
        </h1>
        <h2>
            Product engineer
        </h2>
        <p>
            I'm currently living in Paris and working as a lead software engineer at <a href="https://www.foxintelligence.fr" target="_blank">Foxintelligence</a> building <a href="https://foxwatch.io" target="_blank">Foxwatch</a>, a data vizualization platform. I like new technologies, startups, travelling, reading and learning things everyday.
        </p>
        <p>
            Things I value in a project: long term vision, ambition, strong culture, trust, ownership, <a href="https://angel.co/blog/product-engineering-at-angellist-talent" target="_blank">product engineering culture</a>.
        </p>
    </section>
</template>

<script>
    export default {
        name: 'AboutMe',
    }
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