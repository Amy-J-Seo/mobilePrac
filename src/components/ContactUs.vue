<template>
     <div>
      <h3>Data Table</h3>
      <ve-table
        :columns="columns"
        :table-data="tableData"
        :border-x="true"
        :border-y="true"
        :cell-style-option="cellStyleOption"
      />
    </div>
</template>

<script>
import "vue-easytable/libs/theme-default/index.css";


export default{
    name:'ContactUs',
    data(){
        return{
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
    }
    },
}
</script>
