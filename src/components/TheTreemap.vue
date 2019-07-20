<template>
    <div class="treemap">
        <div class="treemap__data">
            <p>Change the data here:</p>

            <div v-for="(item, index) in data" :key="index">
                <input v-model="data[index]" @change="refreshTreemap">
                <button class="treemap__deleteData" @click="deleteDataPoint(index)">-</button>
            </div>

            <div class="treemap__addData">
                <input v-model="inputNewData" @keyup.enter="addNewData" placeholder="5">
                <button class="treemap__addDataButton" @click="addNewData">+</button>
            </div>

            <p v-if="errorText">{{errorText}}</p>

        </div>

        <div class="treemap__content">
            <svg :width="treemapWidth" :height="treemapHeight">
                <g
                        v-for="rectangle in rectangles"
                        :key="`${rectangle[0]}${rectangle[1]}`"
                        @click="clicked(getLabel(rectangle))"
                        class="treemap__rectangle"
                        :fill="getColor(rectangle)">
                    <rect
                            :x=getX(rectangle)
                            :y=getY(rectangle)
                            :width=getWidth(rectangle)
                            :height=getHeight(rectangle)
                            class="treemap__rectangleItem"
                    ></rect>
                    <text
                            :x=getXText(rectangle)
                            :y=getYText(rectangle)
                            fill="white">
                        {{getLabel(rectangle)}}
                    </text>
                </g>
                Sorry, your browser does not support inline SVG.
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TheTreemap',
        data () {
            return {
                dataset: [],
                inputNewData: '',
                data: [
                    10,
                    7,
                    4,
                    1,
                    5,
                    9,
                ],
                colors: [],
                errorText: '',
                treemapHeight: window.innerWidth > 1060 ? 600 : 510,
                treemapWidth: window.innerWidth > 1060 ? 700 : 500,
                Rectangle: {
                    data: [],
                    xBeginning: 0,
                    yBeginning: 0,
                    totalWidth: window.innerWidth > 1060 ? 700 : 500,
                    totalHeight: window.innerWidth > 1060 ? 600 : 510,
                },
            }
        },
        mounted () {
            this.getGreyColors()
            this.loadTreemap(this.data)
        },
        computed: {
            rectangles () {
                return this.dataset
            }
        },
        methods: {
            getGreyColors() {
                function componentToHex (c) {
                    const hex = c.toString()
                    return hex.length === 1 ? '0' + hex : hex
                }

                function rgbToHex (r, g, b) {
                    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
                }

                let i = 0
                while (i < 100) {
                    const greyShade = Math.round(Math.random() * 150)

                    this.colors.push(rgbToHex(greyShade, greyShade, greyShade))

                    i += 1
                }
            },
            getX (rectangle) {
                return rectangle[0]
            },
            getY (rectangle) {
                return rectangle[1]
            },
            getWidth (rectangle) {
                return rectangle[2]
            },
            getHeight (rectangle) {
                return rectangle[3]
            },
            getLabel (rectangle) {
                return rectangle[4]
            },
            getColor (rectangle) {
                return rectangle[5]
            },
            getXText (rectangle) {
                return rectangle[0] + rectangle[2] / 2
            },
            getYText (rectangle) {
                return rectangle[1] + rectangle[3] / 2
            },
            deleteDataPoint(index) {
                this.data.splice(index, 1)
                this.refreshTreemap()
            },
            addNewData () {
                this.errorText = ''
                if (this.inputNewData && !isNaN(this.inputNewData) && this.inputNewData > 0) {
                    this.data.push(Number(this.inputNewData))
                    this.refreshTreemap()
                } else {
                    this.errorText = 'Please enter strictly positive data points'
                    setTimeout(() => this.errorText = '', 3000)
                }
                this.inputNewData = ''
            },
            refreshTreemap () {
                if (!this.errorText) {
                    this.loadTreemap(JSON.parse('[' + this.data + ']'))
                }
            },
            clicked (id) {
                alert(`Data clicked: ${id}`)
            },
            resetInitialRectangle() {
                this.Rectangle.data = []
                this.Rectangle.totalHeight = this.treemapHeight
                this.Rectangle.totalWidth = this.treemapWidth
                this.Rectangle.xBeginning = 0
                this.Rectangle.yBeginning = 0
            },
            loadTreemap (data) {
                this.resetInitialRectangle()

                const dataset = data
                    .slice(0)
                    .map(el => (el * this.Rectangle.totalHeight * this.Rectangle.totalWidth) / data.reduce(this.sum))


                this.squarify(dataset, [], this.getMinWidth().width)

                this.dataset = this.Rectangle.data
            },
            squarify (children, row, width) {

                if (children.length === 1) {
                    this.layoutLastRow(row, children, width)
                    return
                }

                const rowWithChild = [...row, children[0]]

                if (row.length === 0 || this.worst(row, width) >= this.worst(rowWithChild, width)) {
                    children.shift()
                    this.squarify(children, rowWithChild, width)
                } else {
                    this.layoutRow(row, width)
                    this.squarify(children, [], this.getMinWidth().width)
                }
            },
            layoutRow (row, width, vertical = this.getMinWidth().vertical) {
                const rowHeight = row.reduce(this.sum) / width

                row.forEach((rowItem) => {
                    const rowWidth = rowItem / rowHeight
                    const xBeginning = this.Rectangle.xBeginning
                    const yBeginning = this.Rectangle.yBeginning

                    const data = []
                    if (vertical) {
                        data.push(xBeginning, yBeginning, rowHeight, rowWidth)
                        this.Rectangle.yBeginning += rowWidth
                    } else {
                        data.push(xBeginning, yBeginning, rowWidth, rowHeight)
                        this.Rectangle.xBeginning += rowWidth
                    }

                    data.push(this.data[this.Rectangle.data.length], this.colors[this.Rectangle.data.length])

                    this.Rectangle.data.push(data)
                })

                if (vertical) {
                    this.Rectangle.xBeginning += rowHeight
                    this.Rectangle.yBeginning -= width
                    this.Rectangle.totalWidth -= rowHeight
                } else {
                    this.Rectangle.xBeginning -= width
                    this.Rectangle.yBeginning += rowHeight
                    this.Rectangle.totalHeight -= rowHeight
                }
            },
            layoutLastRow (rows, children, width) {
                const currentWidth = this.getMinWidth()
                this.layoutRow(rows, width, currentWidth.vertical)
                this.layoutRow(children, width, currentWidth.vertical)
            },
            getMinWidth () {
                if ((this.Rectangle.totalHeight) ** 2 > (this.Rectangle.totalWidth) ** 2) {
                    return {width: this.Rectangle.totalWidth, vertical: false}
                }
                return {width: this.Rectangle.totalHeight, vertical: true}
            },
            worst (row, width) {
                const sum = row.reduce(this.sum, 0)
                const rPlus = this.arrayMax(row)
                const rMoins = this.arrayMin(row)
                return Math.max(Math.pow(width, 2) * rPlus / (Math.pow(sum, 2)), Math.pow(sum, 2) / (Math.pow(width, 2) * rMoins))
            },
            sum (acc, cur) {
                return acc += cur
            },
            arrayMin (arr) {
                return arr.slice(0).sort()[0]
            },
            arrayMax (arr) {
                return arr.slice(0).sort().pop()
            },
        },
    }
</script>

<style scoped>

    .treemap {
        color: #fff;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        font-size: 18px;
        padding: 40px;
    }

    svg {
        background-color: #fff;
    }

    input {
        margin: 10px 10px 0 10px;
        padding: 5px 0;
        max-width: 60px;
        font-size: 16px;
        text-align: center;
        border: 1px solid #9c9c9c;
        background-color: #565656;
        color: #fff;
        border-radius: 2px;
    }

    button {
        padding: 5px 10px;
        background-color: #565656;
        color: #fff;
        font-size: 16px;
        border: 1px solid #4DB6AC;
        cursor: pointer;
        border-radius: 2px;
    }

    button:hover {
        background-color: #4DB6AC;
        color: #FFFFFF;
    }

    button.treemap__deleteData {
        color: #FF5722;
        border-color: #FF5722;
        font-weight: bold;
    }

    button:hover.treemap__deleteData {
        color: white;
        background-color: #FF5722;
    }

    .treemap__addData {
        margin-top: 15px;
    }

    .treemap__addData > button {
        font-weight: bold;
    }

    .treemap__data {
        flex: 1;
    }

    .treemap__data > p {
        text-align: center;
    }

    .treemap__content {
        flex: 3;
    }

    .treemap__rectangle:hover {
        opacity: 1;
        cursor: pointer;
    }

    .treemap__rectangle {
        opacity: 0.4;
    }

    .treemap__rectangleItem {
        stroke-width: 1;
        stroke: white;
    }

</style>
