<template>
  <div id="app">
    <div class="jsp-demo--container">
      <div id="item_left" class="item"></div>
      <div id="item_right" class="item" style="margin-left:50px;"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      instance: null
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
          radius: 5,
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
      this.instance.makeSource('item_left', {
        endpoint:"Dot",
        anchor: "Continuous"
      })
      this.instance.makeTarget('item_right', {
        endpoint:"Dot",
        anchor: "Continuous"
      })
      this.instance.draggable('item_left')
      this.instance.draggable('item_right')

      // 增加item_left、 item_right 端点
      var common = {
        isSource: true,
        isTarget: true,
        connector: ['Straight']
      }
      this.instance.addEndpoint('item_left', {
        anchors: ['Right', 'Top', 'Bottom']
      }, common)
      this.instance.addEndpoint('item_right', {
        anchors: ['Left']
      }, common)
      // 单击连接线，删除连接线
      this.instance.bind('click', (conn, originalEvent) => {
        this.instance.deleteConnection(conn)
      })
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
.item {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
}
</style>
