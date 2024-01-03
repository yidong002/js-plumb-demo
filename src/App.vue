<template>
  <div id="app">
    <div class="jsp-demo--container">
      <div id="item_left" class="item">
        <ul>
          <li id="item_li_1"></li>
          <li id="item_li_2"></li>
          <li id="item_li_3"></li>
          <li id="item_li_4"></li>
        </ul>
      </div>
      <div id="item_right" class="item" style="margin-left:50px;">
        <ul>
          <li id="item_right_li_1"></li>
          <li id="item_right_li_2"></li>
          <li id="item_right_li_3"></li>
          <li id="item_right_li_4"></li>
        </ul>
      </div>
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
      for (let i = 1; i <= 4; i++) {
        this.instance.makeSource('item_li_' + i, {
          endpoint: 'Dot',
          anchor: 'Continuous'
        })
        this.instance.makeTarget('item_li_' + i, {
          endpoint: 'Dot',
          anchor: 'Continuous'
        })
        this.instance.makeTarget('item_right_li_' + i, {
          endpoint: 'Dot',
          anchor: 'Continuous'
        })
        this.instance.makeSource('item_right_li_' + i, {
          endpoint: 'Dot',
          anchor: 'Continuous'
        })
        this.instance.draggable(`item_li_${i}`)
        this.instance.draggable(`item_right_li_${i}`)
        // 增加item_left、 item_right 端点
        var common = {
          isSource: true,
          isTarget: true,
          connector: ['Bezier']
        }
        this.instance.addEndpoint(`item_li_${i}`, {
          anchors: ['Right', 'Top', 'Bottom']
        }, common)
        this.instance.addEndpoint(`item_right_li_${i}`, {
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
.item {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
}
.item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  width: 100%;
  height: 20px;
  background-color: #000;
  margin-bottom: 5px;
}
</style>
