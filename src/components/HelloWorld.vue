<template>
  <div class="login_" style="height: 100%">
    <div id="main" style="height: 500px;width: 500px"></div>
  </div>
</template>

<script>


export default {



  data(){
    return{

    }
  },
  props: ['msg']
  ,
  methods: {
    animal(){
      let myChart = this.$echarts.init(document.getElementById('main'));
      //显示加载中
      myChart.showLoading();
      //异步加载完成关闭loading
      setTimeout(function (){myChart.hideLoading();},1000)

      myChart.setOption({
        // title: {
        //   text: 'ECharts 入门示例'
        // },
        // tooltip: {},
        // xAxis: {
        //   data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        // },
        // legend: {
        //   data:['销量']
        // },
        // yAxis: {},
        // series: [{
        //   name: '销量',
        //   type: 'bar',
        //   data: [5, 20, 36, 10, 10, 20]
        // }]
      //  -----------------------------------------------------------------------
      //   series : [
        //     {
        //       name: '访问来源',
        //       //背景
        //       backgroundColor: '#2c343c',
        //     //文字样式
        //       textStyle: {
        //         color: 'rgba(255, 255, 255, 0.3)'
        //       },
        //       //标签的视觉引导线的颜色设为浅色。
        //       labelLine: {
        //         lineStyle: {
        //           color: 'rgba(255, 255, 255, 0.3)'
        //         }
        //       },
        //       //南丁格尔图
        //       roseType: 'angle',
        //       //阴影设置
        //       itemStyle: {
        //         // 阴影的大小
        //         shadowBlur: 200,
        //         // 阴影水平方向上的偏移
        //         shadowOffsetX: 0,
        //         // 阴影垂直方向上的偏移
        //         shadowOffsetY: 0,
        //         // 阴影颜色
        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
        //       },
        //       type: 'pie',
        //       radius: '55%',
        //       data:[
        //         {value:235, name:'视频广告'},
        //         {value:274, name:'联盟广告'},
        //         {value:310, name:'邮件营销'},
        //         {value:335, name:'直接访问'},
        //         {value:400, name:'搜索引擎'}
        //       ]
        //     }
        //   ]
        //----------------------------------------------------------------------
        //使用dataset
        // legend: {},
        // tooltip: {},
        // dataset: {
        //   // 提供一份数据。
        //   source: [
        //     ['product', '2015', '2016', '2017'],
        //     ['Matcha Latte', 43.3, 85.8, 93.7],
        //     ['Milk Tea', 83.1, 73.4, 55.1],
        //     ['Cheese Cocoa', 86.4, 65.2, 82.5],
        //     ['Walnut Brownie', 72.4, 53.9, 39.1]
        //   ]
        // },
        // // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        // xAxis: {type: 'category'},
        // // 声明一个 Y 轴，数值轴。
        // yAxis: {},
        // // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        // series: [
        //   {type: 'bar'},
        //   {type: 'bar'},
        //   {type: 'bar'}
        // ]
        //-------------------------------------------------------------

//         legend: {},
//         tooltip: {},
//         dataset: {
//           source: [
//             ['product', '2012', '2013', '2014', '2015'],
//             ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
//             ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
//             ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
//           ]
//         },
//         xAxis: [
//           {type: 'category', gridIndex: 0},
//           {type: 'category', gridIndex: 1},
//           // {type: 'category', gridIndex: 2}
//         ],
//         yAxis: [
//           {gridIndex: 0},
//           {gridIndex: 1},
//           // {gridIndex: 2}
//         ],
//         grid: [
//           {bottom: '55%'},
//           {top: '55%'}
//         ],
//         series: [
//           // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
//           {type: 'bar', seriesLayoutBy: 'row'},
//           {type: 'bar', seriesLayoutBy: 'row'},
//           {type: 'bar', seriesLayoutBy: 'row'},
//           // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
//           {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
//           {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
//           {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
//           {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
// //错误
//           // {type: 'bar', xAxisIndex: 2, yAxisIndex: 2},
//           // {type: 'bar', xAxisIndex: 2, yAxisIndex: 2},
//           // {type: 'bar', xAxisIndex: 2, yAxisIndex: 2},
//           // {type: 'bar', xAxisIndex: 2, yAxisIndex: 2}
//
//
//         ]

        //--------------------------------------------------

        dataset: [{
          // 这个 dataset 的 index 是 `0`。
          source: [
            ['Product', 'Sales', 'Price', 'Year'],
            ['Cake', 123, 32, 2011],
            ['Cereal', 231, 14, 2011],
            ['Tofu', 235, 5, 2011],
            ['Dumpling', 341, 25, 2011],
            ['Biscuit', 122, 29, 2011],
            ['Cake', 143, 30, 2012],
            ['Cereal', 201, 19, 2012],
            ['Tofu', 255, 7, 2012],
            ['Dumpling', 241, 27, 2012],
            ['Biscuit', 102, 34, 2012],
            ['Cake', 153, 28, 2013],
            ['Cereal', 181, 21, 2013],
            ['Tofu', 395, 4, 2013],
            ['Dumpling', 281, 31, 2013],
            ['Biscuit', 92, 39, 2013],
            ['Cake', 223, 29, 2014],
            ['Cereal', 211, 17, 2014],
            ['Tofu', 345, 3, 2014],
            ['Dumpling', 211, 35, 2014],
            ['Biscuit', 72, 24, 2014],
          ],
          // id: 'a'
        }, {
          // 这个 dataset 的 index 是 `1`。
          // 这个 `transform` 配置，表示，此 dataset 的数据，来自于此 transform 的结果。
          transform: {
            type: 'filter',
            config: { dimension: 'Year', value: 2011 }
          },
          // 我们还可以设置这些可选的属性： `fromDatasetIndex` 或 `fromDatasetId`。
          // 这些属性，指定了，transform 的输入，来自于哪个 dataset。例如，
          // `fromDatasetIndex: 0` 表示输入来自于 index 为 `0` 的 dataset 。又例如，
          // `fromDatasetId: 'a'` 表示输入来自于 `id: 'a'` 的 dataset。
          // 当这些属性都不指定时，默认认为，输入来自于 index 为 `0` 的 dataset 。
        }, {
          // 这个 dataset 的 index 是 `2`。
          // 同样，这里因为 `fromDatasetIndex` 和 `fromDatasetId` 都没有被指定，
          // 那么输入默认来自于 index 为 `0` 的 dataset 。
          transform: {
            // 这个类型为 "filter" 的 transform 能够遍历并筛选出满足条件的数据项。
            type: 'filter',
            // 每个 transform 如果需要有配置参数的话，都须配置在 `config` 里。
            // 在这个 "filter" transform 中，`config` 用于指定筛选条件。
            // 下面这个筛选条件是：选出维度（ dimension ）'Year' 中值为 2012 的所有
            // 数据项。
            config: { dimension: 'Year', value: 2012 }
          }
        }, {
          // 这个 dataset 的 index 是 `3`。
          transform: {
            type: 'filter',
            config: { dimension: 'Year', value: 2013 }
          }
        }],
        series: [{
          type: 'pie', radius: 50, center: ['25%', '50%'],
          // 这个饼图系列，引用了 index 为 `1` 的 dataset 。也就是，引用了上述
          // 2011 年那个 "filter" transform 的结果。
          datasetIndex: 1
        }, {
          //x,y轴位置
          type: 'pie', radius: 50, center: ['50%', '50%'],
          datasetIndex: 2
        }, {
          type: 'pie', radius: 50, center: ['75%', '50%'],
          datasetIndex: 3
        }]
        });
    }
  },
  mounted() {
   this.animal();
  }

}
</script>

<style scoped lang="scss">
.login_{
  display: flex;
}
#main{
  margin: auto;
}
</style>
