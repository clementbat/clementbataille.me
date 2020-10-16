<template>
  <div class="treemap">
    <div class="treemap__data">
      <p>Change the data here:</p>

      <div v-for="(item, index) in data" :key="index">
        <input v-model="data[index].value" @change="refreshTreemap" />
        <button class="treemap__deleteData" @click="deleteDataPoint(index)">-</button>
      </div>

      <div class="treemap__addData">
        <input v-model="inputNewData" @keyup.enter="addNewData" placeholder="5" />
        <button class="treemap__addDataButton" @click="addNewData">+</button>
      </div>

      <p v-if="errorText">{{errorText}}</p>
    </div>

    <div class="treemap__content">
      <svg :width="treemapWidth" :height="treemapHeight">
        <g
          v-for="rectangle in rectangles"
          :key="`${rectangle.x}:${rectangle.y}`"
          @click="clicked(rectangle)"
          class="treemap__rectangle"
          :fill="getColor(rectangle)"
        >
          <rect
            :x="getX(rectangle)"
            :y="getY(rectangle)"
            :width="getWidth(rectangle)"
            :height="getHeight(rectangle)"
            class="treemap__rectangleItem"
          />
          <text
            :x="getXText(rectangle)"
            :y="getYText(rectangle)"
            fill="white"
          >{{getLabel(rectangle)}}</text>
        </g>Sorry, your browser does not support inline SVG.
      </svg>
    </div>
  </div>
</template>

<script>
const { getTreemap } = require("treemap-squarify");

export default {
  name: "TheTreemap",
  props: {
    height: {
      type: Number,
      default: 600
    },
    width: {
      type: Number,
      default: 700
    }
  },
  data() {
    return {
      dataset: [],
      inputNewData: "",
      data: [
        { value: 10, label: 10 },
        { value: 7, label: 7 },
        { value: 4, label: 4 },
        { value: 1, label: 1 },
        { value: 5, label: 5 },
        { value: 9, label: 9 }
      ],
      colors: [],
      errorText: "",
      treemapHeight: window.innerWidth > 1060 ? this.height : 510,
      treemapWidth: window.innerWidth > 1060 ? this.width : 500
    };
  },
  mounted() {
    this.getGreyColors();
    this.refreshTreemap();
  },
  computed: {
    rectangles() {
      return this.dataset;
    }
  },
  methods: {
    componentToHex(c) {
      const hex = c.toString();
      return hex.length === 1 ? "0" + hex : hex;
    },
    rgbToHex(r, g, b) {
      return (
        "#" +
        this.componentToHex(r) +
        this.componentToHex(g) +
        this.componentToHex(b)
      );
    },
    getGreyColors() {
      this.data.forEach(dataPoint => {
        const greyShade = Math.round(Math.random() * 150);
        dataPoint.color = this.rgbToHex(greyShade, greyShade, greyShade);
      });
    },
    getX(rectangle) {
      return rectangle.x;
    },
    getY(rectangle) {
      return rectangle.y;
    },
    getWidth(rectangle) {
      return rectangle.width;
    },
    getHeight(rectangle) {
      return rectangle.height;
    },
    getLabel(rectangle) {
      return rectangle.data.label;
    },
    getColor(rectangle) {
      return rectangle.data.color;
    },
    getXText(rectangle) {
      return rectangle.x + rectangle.width / 2;
    },
    getYText(rectangle) {
      return rectangle.y + rectangle.height / 2;
    },
    deleteDataPoint(index) {
      this.data.splice(index, 1);
      this.refreshTreemap();
    },
    addNewData() {
      this.errorText = "";
      if (
        this.inputNewData &&
        !isNaN(this.inputNewData) &&
        this.inputNewData > 0
      ) {
        const greyShade = Math.round(Math.random() * 150);
        this.data.push({
          value: Number(this.inputNewData),
          label: Number(this.inputNewData),
          color: this.rgbToHex(greyShade, greyShade, greyShade)
        });
        this.refreshTreemap();
      } else {
        this.errorText = "Please enter strictly positive data points";
        setTimeout(() => (this.errorText = ""), 3000);
      }
      this.inputNewData = "";
    },
    refreshTreemap() {
      if (!this.errorText) {
        this.dataset = getTreemap({
          data: this.data,
          width: this.treemapWidth,
          height: this.treemapHeight
        });
      }
    },
    clicked(rectangle) {
      alert(`Data clicked: ${this.getLabel(rectangle)}`);
    }
  }
};
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
  border: 1px solid #4db6ac;
  cursor: pointer;
  border-radius: 2px;
}

button:hover {
  background-color: #4db6ac;
  color: #ffffff;
}

button.treemap__deleteData {
  color: #ff5722;
  border-color: #ff5722;
  font-weight: bold;
}

button:hover.treemap__deleteData {
  color: white;
  background-color: #ff5722;
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
