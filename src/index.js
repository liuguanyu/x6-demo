import { Graph } from '@antv/x6'
import { MiniMap } from '@antv/x6-plugin-minimap'

window.__x6_instances__ = []

const graph = new Graph({
  container: document.getElementById('container'),
  width: 1200,
  height: 800,
  background: {
    color: '#f2f7fa',
  },
  grid: {
    visible: true,
    type: 'doubleMesh',
    args: [
      {
        color: '#eee', // 主网格线颜色
        thickness: 1, // 主网格线宽度
      },
      {
        color: '#ddd', // 次网格线颜色
        thickness: 1, // 次网格线宽度
        factor: 4, // 主次网格线间隔
      },
    ],
  },
  autoResize: true,
  panning: true,
  mousewheel: true
})

Graph.registerNode(
  'flow-start', {
  inherit: 'rect',
  attrs: {
    body: {
      fill: '#000',
      rx: 5,
      ry: 5
    }
  },
  ports: {
    groups: {
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 2,
          },
        },
      }
    }
  },
}
)

Graph.registerNode(
  'flow-node', {
  inherit: 'rect',
  markup: [{
    tagName: "defs",
    children: [{
      tagName: "clipPath",
      selector: "clipPathTop",
      children: [{
        tagName: "rect",
        selector: "rectClipPathTop"
      }]
    }]
  }, {
    tagName: 'rect',
    selector: 'title'
  }, {
    tagName: 'image',
    selector: 'icon'
  }, {
    tagName: 'text',
    selector: 'titleText'
  }, {
    tagName: 'rect',
    selector: 'body'
  }],
  width: 120,
  height: 113,
  attrs: {
    clipPathTop: {
      id: 'clipPathTop'
    },
    rectClipPathTop: {
      width: 120,
      height: 34,
      rx: 6,
      ry: 6,
      stroke: '#8f8f8f',
      strokeWidth: 1,
    },
    title: {
      fill: 'rgb(87, 106, 149)',
      width: 120,
      height: 28,
      stroke: '#8f8f8f',
      strokeWidth: 1,
      clipPath: "url(#clipPathTop)"
    },
    titleText: {
      refX: 40,
      refY: 14,
      textAnchor: 'middle',
      fontWeight: 'bold',
      fill: '#fff',
      fontSize: 12,
      ref: 'titleText'
    },
    icon: {
      href: 'http://10.16.125.204/bpm-designer/static/images/node_user.svg',
      width: 14,
      height: 14,
      x: 5,
      y: 6
    },
    body: {
      stroke: '#8f8f8f',
      strokeWidth: 1,
      fill: '#fff',
      refY: 28
    },
  },
  ports: {
    groups: {
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 2,
            refY: 28,
          },
        },
      },
      top: {
        position: 'top',
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 2,
          },
        },
      },
    }
  }
})

let start = graph.addNode({
  shape: 'flow-start',
  x: 410,
  y: 0,
  width: 100,
  height: 40,
  attrs: {
    label: {
      text: '开始节点',
      fill: 'white',
      fontSize: 12,
      fontWeight: 400
    }
  },
  ports: {
    items: [{
      id: 'flow0',
      group: 'bottom',
    }]
  }
})

let first = graph.addNode({
  shape: 'flow-node',
  x: 400,
  y: 100,
  width: 120,
  height: 85,
  attrs: {
    titleText: {
      text: "第一个"
    }
  },
  ports: {
    items: [
      {
        id: 'flow',
        group: 'top',
      },
      {
        id: 'flow1',
        group: 'bottom',
      }
    ],
  },
})

let sec = graph.addNode({
  shape: 'flow-node',
  x: 400,
  y: 300,
  width: 120,
  height: 85,
  attrs: {
    titleText: {
      text: "第二个"
    },
    title: {
      fill: 'rgb(255, 148, 62)'
    }
  },
  ports: {
    items: [
      {
        id: 'flow2',
        group: 'top',
      },
      {
        id: 'flow3',
        group: 'bottom',
      }
    ],
  },
})

let third = graph.addNode({
  shape: 'flow-node',
  x: 700,
  y: 80,
  width: 120,
  height: 85,
  attrs: {
    titleText: {
      text: "第三个"
    }
  },
  ports: {
    items: [
      {
        id: 'flow4',
        group: 'top',
      }, {
        id: 'flow4b',
        group: 'bottom',
      }
    ],
  },
})

let forth = graph.addNode({
  shape: 'flow-node',
  x: 600,
  y: 500,
  width: 120,
  height: 85,
  attrs: {
    titleText: {
      text: "第四个"
    }
  },
  ports: {
    items: [
      {
        id: 'flow5',
        group: 'top',
      }
    ],
  },
})

let fifth = graph.addNode({
  shape: 'flow-node',
  x: 900,
  y: 500,
  width: 120,
  height: 85,
  attrs: {
    titleText: {
      text: "第五个"
    }
  },
  ports: {
    items: [
      {
        id: 'flow6',
        group: 'top',
      }
    ],
  },
})

graph.addEdge({
  source: { cell: start, port: "flow0" },
  target: { cell: first, port: "flow" },
  attrs: {
    line: {
      stroke: "#636b86", // 指定 path 元素的填充色
    },
  },
  router: {
    name: 'manhattan',
    args: { offset: 'center' },
  }
})

graph.addEdge({
  source: { cell: first, port: "flow1" },
  target: { cell: sec, port: "flow2" },
  attrs: {
    line: {
      stroke: "#636b86", // 指定 path 元素的填充色
    },
  },
  router: {
    name: 'manhattan',
    args: { offset: 'center' },
  }
})

graph.addEdge({
  source: { cell: sec, port: "flow3" },
  target: { cell: third, port: "flow4" },
  attrs: {
    line: {
      stroke: "#636b86", // 指定 path 元素的填充色
    },
  },
  router: {
    name: 'metro',
    args: { offset: 'center' },
  }
})

graph.addEdge({
  source: { cell: third, port: "flow4b" },
  target: { cell: forth, port: "flow5" },
  attrs: {
    line: {
      stroke: "#636b86", // 指定 path 元素的填充色
    },
  },
  router: {
    name: 'er',
    args: { offset: 'center' },
  },
  tools: [
    {
      name: 'button',
      args: {
        distance: 40,
        markup: [{
          tagName: 'rect',
          selector: 'myButton',
          attrs: {
            fill: '#ecf5ff',
            width: 100,
            height: 30,
            x: -50,
            stroke: "#ccc",
            rx: 6
          },
        }, {
          tagName: 'text',
          selector: 'buttonText',
          textContent: '增加逻辑',
          attrs: {
            fill: 'rgba(0,0,0,.7)',
            fontSize: 12,
            fontWeight: 400,
            textAnchor: 'middle',
            pointerEvents: 'none',
            y: 18,
          },
        }],
        onClick({ view }) {
          alert('添加逻辑分支')
        },
      },
    },
  ],
})

graph.addEdge({
  source: { cell: third, port: "flow4b" },
  target: { cell: fifth, port: "flow6" },
  attrs: {
    line: {
      stroke: "#636b86", // 指定 path 元素的填充色
    },
  },
  router: {
    name: 'er',
    args: { offset: 'center' },
  }
})

graph.centerContent()

window.__x6_instances__.push(graph)