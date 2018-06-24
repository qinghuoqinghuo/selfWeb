/**
 * Created by lyc on 17-5-17.
 * echarts 画图工具类, 引入jquery使用jquery的深度copy 和数据请求get方法
 * 引用 mapChartUtil 是对地图geoJson数据进行处理.
 *
 * drawLineBarChart 画这线图或者柱状图
 *
 * drawPieChart 画饼图
 *
 * drawMapChart 渲染地图
 * 地图下钻的功能不能实现可配置花,可以根据自己的调用改渲染方法时,控制逻辑来实现
 *
 * 引入d3实现关键词云图
 *
 */
import d3 from 'd3'
import {scaleLinear} from 'd3-scale'
import d3LayoutCloud from 'd3-cloud'
import $ from 'jquery'
import echarts from 'echarts'
import {mapChartUtil} from './map-chart-util'

function getTheme() {
  // let {style = ''} = JSON.parse(localStorage.getItem('systemConfig'))
  // style = style !== null && style !== '' ? style : 'blue'
  let style = 'default'
  let themeData = require('static/charts-theme/' + style + '.json')
  let {themeName = '', theme = {}} = themeData
  echarts.registerTheme(themeName, theme)
  return themeName
}

export const chart = {
  /**
   * 绘制echarts图形，除地图之外
   * @param containerId
   * @param option
   * @param events
   */
  drawChart: function (containerId, option, events) {
    echarts.dispose(document.getElementById(containerId))
    let myChart = echarts.init(document.getElementById(containerId), getTheme())
    option = $.extend(true, {}, option)
    if (events) {
      for (let i in events) {
        let event = events[i]
        if (typeof event === 'function') {
          myChart.on(i, event)
        }
      }
    }

    myChart.setOption(option)
  },
  /**
   * 绘制echarts地图
   * @param containerId
   * @param option
   * @param events
   */
  drawMapChart: function (containerId, option, events) {
    let mapType = ''
    if (option.geo) {
      mapType = option.geo.map === undefined ? 'china' : option.geo.map
    } else {
      $.each(option.series, function (i, item) {
        if (item.mapType) {
          mapType = item.mapType
        }
      })
    }
    mapType = mapType === '' ? 'china' : mapType
    let provinces = []
    for (let province in mapChartUtil._provinceMap) {
      provinces.push(province)
    }

    function getJsonUrl(mapType) {
      let geoJsonName = ''
      let mapJsonUrl = require('static/geoJson/china.json')
      if (mapType === 'china') {
        mapJsonUrl = require('static/geoJson/china.json')
      } else if ($.inArray(mapType, provinces) !== -1) {
        geoJsonName = mapChartUtil._provinceMap[mapType]
        mapJsonUrl = require('static/geoJson/geometryProvince/' + geoJsonName + '.json')
      } else {
        geoJsonName = mapChartUtil.cityMap[mapType]
        if (geoJsonName === undefined) {
          mapJsonUrl = require('static/geoJson/china.json')
        } else {
          mapJsonUrl = require('static/geoJson/geometryCounties/' + geoJsonName + '.json')
        }
      }

      return mapJsonUrl
    }

    echarts.dispose(document.getElementById(containerId))
    echarts.registerMap(mapType, getJsonUrl(mapType))
    let myChart = echarts.init(document.getElementById(containerId), getTheme())
    // 指定图表默认配置项和数据
    let defaultOption = {
      tooltip: {
        trigger: 'item'
      },
      geo: {
        map: mapType,
        label: {},
        scaleLimit: {},
        itemStyle: {}
      },
      series: [
        {
          name: '地图',
          type: 'map',
          geoIndex: 0,
          data: []
        }
      ]
    }

    if (option.series && option.series.length > 0) {
      delete defaultOption.series[0].data
    }
    $.extend(true, defaultOption, option)

    if (events) {
      for (let i in events) {
        let event = events[i]
        if (typeof event === 'function') {
          myChart.on(i, event)
        }
      }
    }

    myChart.setOption(defaultOption)
  },

  /**
   * 绘制d3关键词云图
   * @param containerId
   * @param option
   */
  drawKeyWordsCloud: function (containerId, option) {
    let item = document.getElementById(containerId)
    let defaultOption = [{
      keyword: '暂无相关数据',
      score: 10
    }]
    let data = option.data
    if (data !== undefined && data.length > 0) {
      $(item).empty()
    } else {
      data = defaultOption
    }
    let height = $(item).height()
    let width = $(item).width()
    let fill = d3.scale.category20()
    let scale = d3.scale.linear()
      .domain([0, data[0].score / 3, data[0].score])
      .range([10, 20, 50])

    let layout = d3LayoutCloud()
      .size([width, height])
      .words(data.map(function (d) {
        return {
          text: d.keyword,
          size: scale(d.score)
        }
      })).padding(2).rotate(function () {
        return ~~(Math.random() * 2) * 90
      }).font('Impact').fontSize(function (d) {
        return d.size
      }).on('end', draw)

    layout.start()

    function draw(words) {
      d3.select(item)
        .append('svg').attr('width', '100%')
        .attr('height', '100%')
        .style('border-radius', width + 'px')
        .append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        .selectAll('text')
        .data(words).enter().append('text')
        .style('font-size', function (d) {
          return d.size + 'px'
        })
        .style('font-family', '微软雅黑')
        .style('fill', function (d, i) {
          return fill[i]
        })
        .attr('text-anchor', 'middle')
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .text(function (d) {
          return d.text
        })
    }
  },
  /**
   * 绘制d3气泡图
   * @param containerId
   * @param option
   */
  drawBubbleChart: function (containerId, option) {
  },

  /**
   * 绘制d3 chord图
   * @param containerId
   * @param option
   * option {
   *   data: [{
   *      name: '售电', from: '北京', to: '上海', value: '1000'
   *   },{
   *      name: '售电', from: '北京', to: '重庆', value: '1000'
   *   },{
   *      name: '售电', from: '北京', to: '内蒙古', value: '1000'
   *   },{
   *      name: '售电', from: '北京', to: '吉林', value: '1000'
   *   }]
   * }
   * // TODO: need refine
   */
  drawChordChart: function (containerId, option) {
    let item = document.getElementById(containerId)
    $(item).empty()
    let text = []
    let dataf = []
    dataf = option.data
    var nest = d3.nest()
      .key(function (d) {
        return d.from
      })
      .entries(dataf)
      .sort(function (a, b) {
        return a.key < b.key ? -1 : 1
      })
    nest.forEach(function (d) {
      text.push(d.key)
    })
    nest = d3.nest()
      .key(function (d) {
        return d.to
      })
      .entries(dataf)
      .sort(function (a, b) {
        return a.key < b.key ? -1 : 1
      })
    nest.forEach(function (d) {
      text.push(d.key)
    })
    let values = []
    nest = d3.nest()
      .key(function (d) {
        return d.value
      })
      .entries(dataf)
      .sort(function (a, b) {
        return a.key < b.key ? -1 : 1
      })
    nest.forEach(function (d) {
      values.push(parseInt(d.key))
    })

    values = values.sort(function (a, b) {
      return b - a
    })
    var valueScale = scaleLinear()
      .domain([0, values[0]])
      .range([30, 100])
    let textnested = []
    d3.nest()
      .key(function (d) {
        return d
      })
      .entries(text)
      .forEach(function (d) {
        textnested.push(d.key)
      })
    if (textnested.length < text.length) {
      text = textnested
      text.sort(function (a, b) {
        return a < b ? -1 : 1
      })
    }
    nest = d3.nest()
      .key(function (d) {
        return d.name
      })
      .entries(dataf)
    var matrix = []
    text.forEach(function (d, i) {
      matrix[i] = d3.range(text.length).map(function () {
        return 0
      })
    })
    dataf.forEach(function (d) {
      let x = text.indexOf(d.from)
      let y = text.indexOf(d.to)
      if (nest.length < dataf.length) {
        matrix[x][y] += valueScale(parseInt(d.value))
      }
    })
    let chord = d3.layout.chord()
      .padding(0.1)
      .matrix(matrix)
    let chordHeight = $(item).height()
    let chordWidth = $(item).width()
    let innerRadius = chordWidth > chordHeight ? chordHeight / 2 : chordWidth / 2
    let center = {x: chordWidth / 2, y: chordHeight / 2}
    innerRadius = innerRadius * 0.7
    let outerRadius = innerRadius * 1.1
    let textTranslate = outerRadius + 10

    let svg = d3.select(item).append('svg')
      .attr('width', chordWidth)
      .attr('height', chordHeight)
      .append('g')
      .attr('transform', 'translate(' + center.x + ',' + center.y + ')')
    let fill = ['#ccff66', '#fbccec', '#b981bc', '#cceac4', '#ff9999', '#8dd3c8', '#ffca99', '#bebbd8', '#99cccc', '#c7ee55', '#cc99ff', '#fb8070', '#80b1d2', '#fbb367', '#99cc66']
    let g = svg.selectAll('.group')
      .data(chord.groups)
      .enter()
      .append('g')
      .attr('class', 'group')
    g.append('path')
      .attr('d', d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
      .style('fill', function (d) {
        return fill[d.index % 15]
      })
      .on('mouseover', standOut(0.1))
      .on('mouseout', standOut(1))
    g.append('text')
      .attr('class', 'chord-text')
      .each(function (d, i) {
        d.angle = (d.startAngle + d.endAngle) / 2
        d.name = text[i]
      })
      .attr('dy', '.35em')
      .attr('transform', function (d) {
        return 'rotate(' + (d.angle * 180 / Math.PI) + ')' +
          'translate(0,' + -1.0 * textTranslate + ')' +
          ((d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) ? 'rotate(180)' : '')
      })
      .text(function (d) {
        return d.name
      })
      .on('mouseover', standOut(0.1))
      .on('mouseout', standOut(1))
    svg.selectAll('.chord')
      .data(chord.chords)
      .enter()
      .append('path')
      .attr('class', 'chord')
      .attr('d', d3.svg.chord().radius(innerRadius))
      .style('fill', function (d) {
        return fill[d.source.index % 15]
      })
      .style('stroke', function (d) {
        return d3.rgb(fill[d.source.index % 15]).darker()
      })
      .on('mouseover', function (d, i) {
        d3.select(this)
          .style('fill', 'yellow')
      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .transition()
          .duration(1000)
          .style('fill', fill[d.source.index % 15])
      })

    function standOut(o) {
      return function (d, i) {
        let gstandout = []
        svg.selectAll('.chord')
          .each(function (e) {
            return e.source.index === i ? gstandout.push(e.target.index) : e.target.index === i ? gstandout.push(e.source.index) : ''
          })
          .filter(function (e) {
            return e.source.index !== i && e.target.index !== i
          })
          .style('opacity', o)
        svg.selectAll('.group')
          .filter(function (e, j) {
            return gstandout.indexOf(j) === -1 && j !== i
          })
          .style('opacity', o)
      }
    }
  }
}
