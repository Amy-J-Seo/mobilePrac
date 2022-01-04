<template>
  <div class="app">
    <app-header />
    <!-- and links -->

    <div>
      <h3>Data Table</h3>
      <ve-table
        :columns="columns"
        :table-data="tableData"
        :border-around="false"
        :border-x="true"
        :border-y="true"
        :cell-style-option="cellStyleOption"
      />
    </div>
    <!-- make one chart -->

    <div class="hello" ref="chartdiv"></div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "vue-easytable/libs/theme-default/index.css";

am4core.useTheme(am4themes_animated);

import AppHeader from "./components/Header.vue";

export default {
  name: "App",
  components: { AppHeader },
  data() {
    return {
      //cell style
      cellStyleOption: {
        bodyCellClass: ({ column }) => {
          if (column.field === "hobby" || column.field === "name") {
            return "table-body-cell-class1";
          }
        },
        headerCellClass: ({ rowIndex }) => {
          if (rowIndex === 0) {
            return "table-header-cell-class";
          }
        },
      },

      // reactive data
      columns: [
        { field: "name", key: "a", title: "Name" },
        { field: "date", key: "b", title: "Date" },
        { field: "hobby", key: "c", title: "Hobby" },
        { field: "address", key: "d", title: "Address" },
      ],
      tableData: [
        {
          name: "John",
          date: "1900-05-20",
          hobby: "Reading",
          address: "Deahakro 49",
        },
        {
          name: "Dickerson",
          date: "1910-06-20",
          hobby: "singing",
          address: "Deahakro 49",
        },
        {
          name: "Larsen",
          date: "2000-07-20",
          hobby: "cooking",
          address: "Deahakro 49",
        },
        {
          name: "Geneva",
          date: "2010-08-20",
          hobby: "dancing",
          address: "Deahakro 49",
        },
        {
          name: "Jami",
          date: "2020-09-20",
          hobby: "sleeping",
          address: "Deahakro 49",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
    am4core.color("#F9F871");
    chart.paddingRight = 60;

    let data = [];
    let visits = 0;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({
        date: new Date(2021, 0, i),
        name: "name" + i,
        value: visits,
      });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 30;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.fillOpacity = 1;

    let fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;
    series.segments.template.fillModifier = fillModifier;

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  created() {},
};
</script>

<style>
.hello {
  width: 100%;
  height: 300px;
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.table-body-cell-class1 {
  background: #f0f9ff !important;
}
.table-header-cell-class {
  background: orange !important;
  color: #fff !important;
}
</style>
