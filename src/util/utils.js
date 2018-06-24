/**
 * Created by lyc on 17-6-6.
 */
import $ from 'jquery'

export const utils = {
  /**
   * 动态加载css文件
   * @param path
   */
  dynamicLoadingCss: function (path) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !')
    }
    let head = document.getElementsByTagName('head')[0]
    let link = document.createElement('link')
    link.id = 'theme'
    link.href = path
    link.rel = 'stylesheet'
    link.type = 'text/css'
    head.appendChild(link)
  },
  /**
   * 动态加载css文件
   * @param path
   */
  deleteThemeCss: function () {
    let head = document.getElementsByTagName('head')[0]
    let link = document.getElementById('theme')
    if (link) {
      head.removeChild(link)
    }
  },
  /**
   * 动态加载js文件
   * @param path
   */
  dynamicLoadingJs: function (path) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !')
    }
    let head = document.getElementsByTagName('head')[0]
    let script = document.createElement('script')
    script.src = path
    script.type = 'text/javascript'
    head.appendChild(script)
  },
  /**
   * 获取项目根路径
   * @returns {*|string}
   */
  getBasePath: function () {
    let href = window.location.href
    let pathname = window.location.pathname
    let index = href.indexOf(pathname)

    return href.substring(0, index)
  },
  /**
   * 获取URL中的变量
   * @param letiable
   * @returns {*}
   */
  getQueryVariable: function (letiable) {
    let query = ''
    if (window.location.hash) {
      query = window.location.hash.split('?')[1]
    } else if (window.location.search) {
      query = window.location.search.substring(1)
    }
    let lets = query.split('&')
    for (let i = 0; i < lets.length; i++) {
      let pair = lets[i].split('=')
      if (pair[0] === letiable) {
        return pair[1]
      }
    }
    return (false)
  },
  /**
   * 获取对象数组统计结果
   * @param array 数组
   * @param type 统计属性名称
   * @returns []
   */
  getArrayDistinctCount: function (array, type) {
    let dataName = []
    let renderData = []
    $.each(array, function (i, item) {
      if ($.inArray(item[type], dataName) === -1) {
        let node = {}
        node.name = item[type]
        node.value = 1
        renderData.push(node)
        dataName.push(item[type])
      } else {
        $.each(renderData, function (i, obj) {
          if (item[type] === obj.name) {
            obj.value++
          }
        })
      }
    })
    renderData = renderData.sort(function (a, b) {
      return b.value - a.value
    })
    return renderData
  }
}
