<template>
    <div id="app">
        <Menu />
        <AboutMe id="me"/>
        <Work id="work"/>
        <Projects id="projects"/>
        <footer>
            <social-links/>
        </footer>
    </div>
</template>

<script>
    import Menu from './components/Menu.vue'
    import AboutMe from './components/AboutMe.vue'
    import Work from './components/Work.vue'
    import Projects from './components/Projects.vue'
    import SocialLinks from './components/SocialLinks'

    export default {
        name: 'app',
        components: {
            SocialLinks,
            Menu,
            AboutMe,
            Work,
            Projects,
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #FFF;
        background-color: #282828;
        font-size: 18px;
    }

    footer {
        margin-top: 200px;
    }

    html, body {
        height: 100%;
        margin: 0;
        scroll-behavior: smooth;
    }

    section {
        margin: auto;
    }

    p {
        text-align: left;
    }

    a {
        color: white;
        transition: color 120ms ease-in 0s;
    }

    a:hover {
        cursor: pointer;
        color: #ff9393;
    }

    h1 {
        font-size: 48px;
        font-weight: 400;
        margin: 0;
    }

    h2 {
        font-size: 28px;
        font-weight: normal;
    }

    @media screen and (max-width: 800px) {
        #app {
            font-size: 17px;
        }

        h1 {
            font-size: 36px;
        }

        h2 {
            font-size: 24px;
        }
    }

</style>
