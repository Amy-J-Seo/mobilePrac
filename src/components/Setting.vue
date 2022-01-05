<template>
  <div>
    <div id="upperPart">
      <h4>setting</h4>
      <p>Lorem ipsum dolor sit amet consectetur</p>
    </div>

    <div id="lowerPart">
      <h4>information</h4>
      <ve-table :columns="columns" :table-data="tableData"></ve-table>
    </div>
  </div>
</template>

<script>
import "vue-easytable/libs/theme-default/index.css";

export default {
  name: "Setting",
  data() {
    return {
      // reactive data
      columns: [
        { field: "no", key: "a", title: "No" },
        { field: "isChecked", key: "b", title: "isChecked" },
        { field: "network", key: "c", title: "Network" },
        { field: "date", key: "d", title: "date" },
        { field: "mod", key: "e", title: "mod" },
      ],
      tableData: [
        {
          no: "1",
          isChecked: "y",
          network: "123",
          date: "1900-05-20",
          mod: "",
        },
        {
          no: "2",
          isChecked: "n",
          network: "123",
          date: "1900-05-20",
          mod: "",
        },
        {
          no: "3",
          isChecked: "n",
          network: "345",
          date: "1900-05-20",
          mod: "",
        },
        {
          no: "4",
          isChecked: "y",
          network: "345",
          date: "1900-05-20",
          mod: "",
        },
        {
          no: "5",
          isChecked: "y",
          network: "567",
          date: "1900-05-20",
          mod: "",
        },
        {
          no: "6",
          isChecked: "n",
          network: "567",
          date: "1900-05-20",
          mod: "",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
#upperPart {
  border: 1px solid rgb(192, 192, 192);
}
#upperPart h4 {
  background-color: rgb(197, 194, 194);
  text-align: left;
  padding-left: 20px;
  margin-top: 0;
}
</style>
