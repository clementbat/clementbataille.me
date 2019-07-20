<template>
    <nav>
        <ul>
            <li><a href="#me">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#projects">Projects</a></li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'Menu'
    }
</script>

<style scoped>
    nav {
        position: fixed;
        display: flex;
        flex-direction: column;
        width: 100%;
        z-index: 1;
        opacity: 0.9;
    }

    ul {
        text-align: left;
        list-style: none;
        padding: 30px;
        margin: 0;
    }

    li {
        padding-bottom: 15px;
        cursor: pointer;
    }

    a {
        color: #fff;
        text-decoration: none;
    }

    @media screen and (max-width: 1200px) {
        ul {
            display: flex;
            background-color: #282828;
            padding: 20px 30px;
        }

        li {
            margin-right: 20px;
            padding-bottom: 0;
        }
    }

</style>