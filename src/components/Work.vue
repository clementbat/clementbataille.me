<template>
    <div class="workSection">
        <section>
            <h1>Work</h1>
            <div class="workTitle" id="fox">
                <h2><a href="https://foxintelligence.fr" target="_blank">Foxintelligence</a></h2>
                <div>2 years, Paris</div>
            </div>
            <p>I am a lead software engineer, working in a team with 3 other engineers</p>
            <p>I built the first iterations of Foxintelligence B2B product from scratch (a data visualization platform), that got us to attract the first paying customers</p>
            <p>I built a <router-link to="/projects#treemap">treemap</router-link> component from scratch</p>
            <p>I worked on our internal solution to aggregate our data quickly. I scaled the solution (horizontal scaling), with more than 10X faster results, tested on 10X more data than currently</p>
            <p>I <a href="https://medium.com/@clementb/what-i-learned-in-my-first-year-as-a-software-engineer-in-a-startup-c078161e5a8e" target="_blank">shared</a> what I learned in my first year as a software engineer (700+ people clapped)</p>
        </section>
        <section>
            <div class="workTitle" id="eurostar">
                <h2><a href="https://www.eurostar.com" target="_blank">Eurostar</a></h2>
                <div>6 months, London</div>
            </div>
            <p>Real time train information: an application used by operation teams and <a href="https://departures.eurostar.com/uk-en/8727100/7015400" target="_blank">here</a>. I enhanced the reliability and the precision of GPS data through APIs (analyze and test the data, did an MVP and follow up the production development and the go live with 2 different suppliers)</p>
            <p>Real time check-in dashboard: did an MVP to develop a real time dashboard with data from the check-in gates in station (number of people checked-in by train by class, flow for each gate, …) with Metabase and SQL requests</p>
            <p>Improve passport checks application security</p>
        </section>
        <section>
            <div class="workTitle">
                <h2>Movienight</h2>
                <div>6 months, Lille</div>
            </div>
            <p>I did an entrepreneurial project with 2 friends in my last year in school: we wanted to apply a yield management pricing model to cinemas (they are empty 85% of the time, the idea was to offer discounts at off-peak hours). I did the landing page and the mobile app design.</p>
            <img src="../assets/images/movienight/desktopLanding.png" class="landingImg"/>
            <div>
                <img src="../assets/images/movienight/appLanding.png" class="appImg"/>
                <img src="../assets/images/movienight/appHome.png" class="appImg"/>
                <img src="../assets/images/movienight/appMovie.png" class="appImg"/>
                <img src="../assets/images/movienight/appBooking.png" class="appImg"/>
                <img src="../assets/images/movienight/appDiscount.png" class="appImg"/>
            </div>
        </section>
        <section>
            <div class="workTitle">
                <h2><a href="https://www.jcdecaux.com" target="_blank">JCDecaux</a></h2>
                <div>3 months, Paris</div>
            </div>
            <p>Deployment of the <a href="https://www.jcdecaux.com/partners/digital" target="_blank">digital offer</a> in the world</p>
            <p>Project management (Lima Airport in Peru, Schwedenplatz subway in Austria)</p>
            <p>Drafting of project monitoring documents</p>
            <p>Subsidiaries support (Austria, Brazil, Czech Republic, China, The United Arab Emirates)</p>
        </section>
        <section>
            <div class="workTitle">
                <h2><a href="https://www.airbus.com" target="_blank">Airbus</a></h2>
                <div>1 month, Toulouse</div>
            </div>
            <p>I had the chance to discover the <a href="https://www.airbus.com/aircraft/how-is-an-aircraft-built/final-assembly-and-tests.html#a330a340" target="_blank">A330 Final Assembly Line</a> in Toulouse. I learned about the complexity of a transnational company. I also learned how a company is organized around the "safety first" Airbus motto. </p>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'Work'
    }
</script>

<style scoped>

    .workSection {
        margin-top: 64px;
    }

    section {
        margin-bottom: 50px;
    }

    h1 {
        margin-top: 20px;
        margin-bottom: 40px;
    }

    h2 {
        text-align: left;
    }

    .workTitle {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .workTitle, p {
        max-width: 570px;
        margin: auto;
    }

    p {
        padding-bottom: 8px;
        padding-top: 8px;
    }

    .workTitle > div {
        color: #8E8E8E;
    }

    .landingImg {
        width: 50%;
        padding: 24px;
    }

    .appImg {
        width: 260px;
        vertical-align: top;
        padding-left: 24px;
        padding-right: 24px;
        margin-top: 24px;
    }

    @media screen and (max-width: 1200px) and (min-width: 800px) {
        .workTitle, p {
            max-width: 60vw;
        }

        .landingImg {
            width: 80%;
        }
    }

    @media screen and (max-width: 800px) {
        .workTitle, p {
            max-width: 80vw;
        }

        .workTitle {
            flex-direction: column;
        }

        .workTitle > h2 {
            margin-bottom: 8px;
        }

        .workTitle > div {
            margin-bottom: 16px;
        }

        .appImg {
            width: 80%;
            max-width: 300px;
        }

        .landingImg {
            width: 80%;
        }
    }
</style>