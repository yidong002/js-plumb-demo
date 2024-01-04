<template>
  <div id="app">
    <div class="jsp-demo--container">
        <div id="item_left" class="item">
          <!-- table -->
          <table border >
            <thead>
              <tr>
                <th>日期</th>
                <th>姓名</th>
                <th>地址</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in table" :id="`left_row_${index+1}`" :key="`left_row_${index+1}`">
                <td>{{ item.date }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="item_right" class="item" style="margin-left:50px;">
          <!-- table -->
          <table border>
            <thead>
              <tr>
                <th>日期</th>
                <th>姓名</th>
                <th>地址</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in table" :id="`right_row_${index+1}`" :key="`right_row_${index+1}`">
                <td>{{ item.date }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      instance: null,
      table: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  beforeDestroy() {
    // 销毁实例
    this.instance && this.instance.destroy()
  },
  created() {
    this.$nextTick(() => {
      this.initJsPlumb()
    })
  },
  methods: {
    // 初始化jsPlumb
    initJsPlumb() {
      // 初始化实例
      this.instance = jsPlumb.getInstance({
        // 设置连接线样式
        PaintStyle: {
          strokeWidth: 2,
          stroke: '#61B7CF'
        },
        // 设置连接点样式
        EndpointStyle: {
          radius: 4,
          fill: '#61B7CF'
        },
        // 设置连接点位置
        Endpoint: 'Dot',
        // 设置连接线箭头
        Connector: ['Flowchart', { stub: [0.5, 0.5], gap: 0, cornerRadius: 5, alwaysRespectStubs: true }],
        // 设置连接线是否可拖动重新连接
        ConnectionsDetachable: true
      })
      
      // 将整个节点作为source或者target
      for (let i = 1; i <= this.table.length; i++) {
        this.instance.makeSource('left_row_' + i, {
          endpoint: 'Dot',
          anchor: 'Continuous'
        })
        this.instance.makeTarget('left_row_' + i, {
          endpoint: 'Dot',
          anchor: 'Continuous'
        })
        this.instance.makeTarget('right_row_' + i, {
          endpoint: 'Dot',
          anchor: 'Continuous'
        })
        this.instance.makeSource('right_row_' + i, {
          endpoint: 'Dot',
          anchor: 'Continuous'
        })
        this.instance.draggable(`left_row_${i}`)
        this.instance.draggable(`right_row_${i}`)
        // 增加item_left、 item_right 端点
        var common = {
          isSource: true,
          isTarget: true,
          connector: ['Bezier']
        }
        this.instance.addEndpoint(`left_row_${i}`, {
          anchors: ['Right', 'Top', 'Bottom']
        }, common)
        this.instance.addEndpoint(`right_row_${i}`, {
          anchors: ['Left', 'Top', 'Bottom']
        }, common)
      }
    }
  }
}
</script>

<style>
.jsp-demo--container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}

</style>
