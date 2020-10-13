<template>
    <section class="projects">
        <h1 id="projects">Projects</h1>
        <div class="projectTitle" id="treemap">
            <h2>Treemap</h2>
        </div>
        <p>
            I built a treemap in JavaScript from scratch based on <a href="https://www.win.tue.nl/~vanwijk/stm.pdf" target="_blank">this algorithm</a>.
        </p>
        <div class="projectLinks">
            <a href="#treemapDemo" class="liveDemo">
                <img src="../assets/icons/play_circle.svg" alt="play icon">Live demo
            </a>
            <a href="https://medium.com/foxintelligence-inside/building-a-treemap-with-javascript-4d789ad43a85"
               target="_blank">
                <img src="../assets/icons/description.svg" alt="blog icon">How it works (blog post)
            </a>
            <a href="https://github.com/clementbat/projects/blob/master/treemap/index.html" target="_blank">
                <img src="../assets/icons/code.svg"/>Code</a>
        </div>

        <div class="projectImg">
            <img src="../assets/images/treemap.png" alt="treemap">
        </div>

        <div id="treemapDemo" class="treemapDemo"
             :style="{
                    'border': treemapOverlay ? '2px solid #fff' : '2px solid #acacac'
             }"
        >
            <div @click="treemapOverlay = false" class="treemapDemo__overlay"
                 :style="{
                        'opacity' : treemapOverlay ? 0.8 : 0,
                        'pointer-events': treemapOverlay ? 'auto' : 'none'

                     }"
            >
                <button>Live demo 🤖</button>
            </div>
            <the-treemap/>
        </div>

        <div class="divider"></div>

        <div class="projectTitle" id="treemap">
            <h2>Find my VIE</h2>
        </div>
        <p>
           It's basically a simpler (and mobile) version of the job ads on 
           <a href="https://www.civiweb.com/FR/offre-liste.aspx" target="_blank">Civiweb</a>. 
           It's scrapping the job ads, using AWS lambdas, SQS (queueing service), and Elasticsearch as a database. 
        </p>
        <div class="projectLinks">
            <a href="https://findmyvie.com" target="_blank" class="liveDemo">
                <img src="../assets/icons/play_circle.svg" alt="play icon">Live demo
            </a>
        </div>

        <div class="findMyVieDemo"
             :style="{
                    'border': '2px solid #fff'
             }"
        >
            <a href="https://findmyvie.com" target="_blank" class="treemapDemo__overlay"
                 :style="{
                        'opacity' : 0.8,
                        'pointer-events': 'auto'

                     }"
            >
                <button>Live demo 🗺</button>
            </a>
            <div class="findMyVieScreen">
                <img src="../assets/images/find-my-vie.png" alt="find my vie screenshot">
            </div>
        </div>

        <div class="divider"></div>

        <div class="projectTitle" id="fb-bday">
            <h2>Facebook birthdays extractor</h2>
        </div>
        <p>
            A small interface to extract your friend's birthday dates
        </p>
        <div class="projectLinks">
            <a href="#fbBdayDemo" class="liveDemo">
                <img src="../assets/icons/play_circle.svg" alt="play icon">Live demo
            </a>
            <a href="https://github.com/clementbat/projects/blob/master/fb-birthday-extract/index.html" target="_blank">
                <img src="../assets/icons/code.svg"/>Code</a>
        </div>

        <div class="projectImg">
            <img src="../assets/images/birthday-scraper.png" alt="treemap">
        </div>

        <div id="fbBdayDemo" class="fbBdayDemo">
            <div @click="fbExtractOverlay = false" class="fbBdayDemo__overlay"
                 :style="{
                        'opacity' : fbExtractOverlay ? 0.8 : 0,
                        'pointer-events': fbExtractOverlay ? 'auto' : 'none'

                     }"
            >
                <button>Live demo 👾</button>
            </div>
            <the-fb-birthday-extractor></the-fb-birthday-extractor>
        </div>
    </section>
</template>

<script>
    import TheTreemap from './TheTreemap'
    import TheFbBirthdayExtractor from './TheFbBirthdayExtractor'

    export default {
        name: 'Projects',
        components: {
            TheTreemap,
            TheFbBirthdayExtractor,
        },
        data () {
            return {
                fbExtractOverlay: true,
                treemapOverlay: true,
            }
        },
    }
</script>

<style scoped>

    .findMyVieScreen > img {
        width: 100%;
        height: 100%;
    }

    .projects {
        display: flex;
        flex-direction: column;
        margin-top: 64px;
    }

    h1 {
        margin-top: 20px;
        margin-bottom: 40px;
    }

    h2 {
        margin: 0;
    }

    .divider {
        width: 100%;
        height: 1px;
        background: rgb(102,102,102);
        margin-top: 120px;
        margin-bottom: 100px;
    }

    p {
        margin: 0;
        padding-bottom: 8px;
        padding-top: 8px;
    }

    section {
        max-width: 570px;
        margin-bottom: 250px;
    }

    .projectTitle {
        display: flex;
    }

    .projectLinks {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .projectLinks > a {
        color: #FFF;
        text-decoration: underline;
        display: flex;
    }

    a.liveDemoLink {
        display: none;
    }

    .projectLinks > a > img {
        margin-right: 5px;
    }

    .projectImg > img {
        width: 200%;
        margin-left: -50%;
        margin-top: 40px;
        display: none;
    }

    .treemapDemo {
        align-self: center;
        margin-top: 40px;
        width: 1000px;
        background-color: #404040;
        box-shadow: rgba(0, 0, 0, .7) 10px 15px 40px 20px;
        position: relative;
        border-radius: 4px;
        max-width: 90vw;
        min-height: 70vh;
    }

    .findMyVieDemo {
        align-self: center;
        margin-top: 40px;
        width: 1000px;
        background-color: #404040;
        box-shadow: rgba(0, 0, 0, .7) 10px 15px 40px 20px;
        position: relative;
        border-radius: 4px;
        max-width: 90vw;
        background: #f2f4f7;
    }

    .fbBdayDemo {
        align-self: center;
        margin-top: 40px;
        width: 1000px;
        box-shadow: rgba(0, 0, 0, .7) 10px 15px 40px 20px;
        position: relative;
        border-radius: 4px;
        max-width: 90vw;
        border: 2px solid #fff;
        background-color: #efefef;
    }

    .fbBdayDemo__overlay {
        background: rgba(239, 239, 239, 0.8);
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        transition: opacity 300ms ease 0s;
    }

    .treemapDemo__overlay {
        background: rgba(239, 239, 239, 0.4);
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        transition: opacity 300ms ease 0s;
    }

    .treemapDemo__overlay > button, .fbBdayDemo__overlay > button {
        position: relative;
        top: calc(50% - 25px);
        font-size: 24px;
        font-weight: 600;
        padding: 8px 24px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 24px;
        color: #FFF;
        border: none;
        cursor: pointer;
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        section {
            max-width: 60vw;
        }

        .projectImg > img {
            width: 80%;
            margin-left: 10%;
            display: none;
        }
    }

    @media screen and (max-width: 800px) {
        section {
            max-width: 80vw;
        }

        .projectLinks {
            flex-direction: column;
        }

        .projectLinks > a {
            margin-top: 15px;
        }

        .projectImg > img {
            width: 90%;
            display: block;
            margin: 30px auto 0 auto;
        }

        .treemapDemo, .fbBdayDemo {
            display: none;
        }

        a.liveDemoLink {
            display: flex;
        }

        a.liveDemo {
            display: none;
        }
    }
</style>