<template>
    <div id="appFbBirthdayExtractor">
        <div class="header-container">
            <div class="header">
                Extract your Facebook friend's birthday dates
            </div>
        </div>
        <div class="header-container">
            <div class="text">
                <ol>
                    <li>
                        Login to facebook and go to <a href="https://www.facebook.com/events/birthdays/">https://www.facebook.com/events/birthdays/</a>
                    </li>
                    <li>
                        Scroll the page until all the months are loaded
                    </li>
                    <li>
                        Right click on the page, and save the page as html <br><code>Save Page As...</code>
                    </li>
                    <li>
                        Then upload the page here
                    </li>
                </ol>
            </div>
        </div>
        <div class="btn-container">
            <input id="file" type="file" class="browse-btn" accept=".html" @change="uploadRawHtml"/>
            <label for="file" class="btn">Upload</label>
        </div>
        <div v-if="birthdayList.length > 0" class="checkbox-container">
            <div class="checkbox-container-lines">
                <div class="checkbox-line">
                    <input type="checkbox" id="all" v-model="selectAll" @click="allSelected = !allSelected">
                    <label for="all">Select all</label>
                </div>
                <div v-for="item in birthdayList" :key="item.name" class="checkbox-line">
                    <input type="checkbox" :id="item.name" :value="item" v-model="arrayChecked">
                    <label :for="item.name">{{item.name}}: {{item.birthday}}</label>
                </div>
            </div>
            <div v-if="birthdayList.length > 0" class="btn-container">
                <button class="btn" @click="generateIcal">Generate ICS</button>
                <button class="btn" @click="generateCSV">Generate CSV</button>
            </div>
        </div>
    </div>
</template>

<script>
const moment = require('moment')

export default {
    data () {
        return {
            birthdayList: [],
            arrayChecked: [],
            allSelected: false,
        }
    },
    methods: {
        moment,
        uploadRawHtml (event) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onload = e => {
                const rawString = e.target.result

                const partRegExp = /id="birthdays_content".+/

                const htmlInterestingPart = rawString.match(partRegExp)[0]

                const friendRegExp = /data-tooltip-content=".{0,50}\(\d{2}\/\d{2}\)/g

                const birthdayObject = htmlInterestingPart.match(friendRegExp).reduce((acc, item) => {
                    item = item.replace('data-tooltip-content="', '')
                    const itemLength = item.length
                    const name = item.substring(0, itemLength - 8)
                    if (!acc.hasOwnProperty(name)) {
                        acc[name] = item.substring(itemLength - 6, itemLength)
                    }
                    return acc
                }, {})

                for (let key in birthdayObject) {
                    this.birthdayList.push({
                        name: key,
                        birthday: birthdayObject[key],
                    })
                }

                this.arrayChecked = []
            }

            reader.readAsText(file)
        },
        generateCSV () {
            let csv = 'Subject, Start date\n'
            this.arrayChecked.forEach(person => {
                // add manually all birthday for 30 years
                // for (let year = 0; year < 30; year += 1) {
                //     csv += `Birthday ${person.name}, ${moment(person.birthday, 'DD/MM').add(year, 'years').format('MM/DD/YYYY')}\n`
                // }
                csv += `Birthday ${person.name}, ${moment(person.birthday, 'DD/MM').format('MM/DD/YYYY')}\n`
            })
            this.download(csv, 'birthday.csv', 'csv')
        },
        generateIcal () {
            let iCal = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH`

            this.arrayChecked.forEach(person => {
                iCal += `
BEGIN:VEVENT
DTSTART;VALUE=DATE:${moment(person.birthday, 'DD/MM').format('YYYYMMDD')}
DTEND;VALUE=DATE:${moment(person.birthday, 'DD/MM').add(1, 'days').format('YYYYMMDD')}
STATUS:CONFIRMED
SUMMARY: Birthday ${person.name}
RRULE:FREQ=YEARLY
END:VEVENT
`
            })

            iCal += 'END:VCALENDAR'

            this.download(iCal, 'birthday.ics', 'calendar')
        },
        download (data, fileName, format) {
            const downloadLink = document.createElement('a')
            const blob = new Blob([data], {type: `text/${format};charset=utf-8;`})
            downloadLink.href = URL.createObjectURL(blob)
            downloadLink.download = fileName
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
        },
    },
    watch: {
        selectAll() {
            this.allSelected = this.selectAll
        },
    },
    computed: {
        selectAll: {
            get () {
                return this.arrayChecked.length === this.birthdayList.length
            },
            set () {
                if (this.allSelected) {
                    this.arrayChecked = this.birthdayList
                } else {
                    this.arrayChecked = []
                }
            }
        },
    }
}
</script>


<style scoped>
    #appFbBirthdayExtractor {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #3c4043;
        display: flex;
        flex-direction: column;
        text-align: left;
        font-size: 14px;
    }

    .header-container {
        display: flex;
        justify-content: center;
    }

    .header {
        margin-bottom: 40px;
        margin-top: 40px;
        font-size: 30px;
        text-align: center;
    }

    .text {
        width: 50%;
    }

    .btn {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #3c4043;
        padding: 0 50px;
        margin: 20px;
        font-size: 14px;
        display: flex;
        align-items: center;
        border-radius: 25px;
        font-weight: 500;
        height: 48px;
        width: auto;
        border: none;
        background: linear-gradient(#fafafa, #d7d7d7);
        transition: all .3s cubic-bezier(0.4, 0.0, 0.2, 1);
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    }

    .btn:hover {
        cursor: pointer;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .btn-container {
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
        margin-top: 20px;
    }

    .browse-btn {
        display: none;
    }

    .checkbox-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px;
    }

    .checkbox-container-lines {
        padding: 16px;
        background-color: #fafafa;
        border-radius: 8px;
        box-shadow: 0 6px 19px 3px rgba(0, 0, 0, 0.07), 0 4px 23px 4px rgba(0, 0, 0, 0.06), 0 5px 7px -3px rgba(0, 0, 0, 0.1);
        height: 400px;
        overflow-y: scroll;
    }

    .checkbox-line {
        width: 400px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    input[type=checkbox] {
        transform: scale(1.3);
        margin-right: 10px;
    }

    code {
        color: #bd4147;
        background-color: #f5f5f5;
        border: 1px solid #cdcdcd;
        border-radius: 3px;
        padding: 3px;
        font-size: 12px;
    }

    a {
        color: #565656;
    }
</style>