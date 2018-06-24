/**
 * Created by lyc on 17-6-1.
 */

export const typeUtil = {
  /**
   * 报告类型
   * @param type
   * @returns {string}
   */
  briefingType: function (type) {
    let briefingType = ''
    type = type.toUpperCase()
    switch (type) {
      case 'DAILY':
        briefingType = '日报'
        break
      case 'WEEKLY':
        briefingType = '周报'
        break
      case 'MONTHLY':
        briefingType = '月报'
        break
      case 'QUARTERLY':
        briefingType = '季报'
        break
      case 'SEMIANNUAL':
        briefingType = '半年报'
        break
      case 'ANNUAL':
        briefingType = '年报'
        break
      case 'SPECIAL':
        briefingType = '专报'
        break
    }

    return briefingType
  },
  /**
   * 情感值类型
   * @param type
   * @returns {string}
   */
  sentimentType: function (type) {
    let sentimentType = ''
    type = type.toLowerCase()
    switch (type) {
      case 'pos':
        sentimentType = '正面'
        break
      case 'neg':
        sentimentType = '负面'
        break
      case 'neu':
        sentimentType = '中性'
        break
    }
    return sentimentType
  },
  /**
   * 将显示的情感值转化为数据库存储的对应值
   * @param type
   * @returns {string}
   */
  encodeSentimentType: function (type) {
    let sentimentType = ''
    switch (type) {
      case '正面':
        sentimentType = 'POS'
        break
      case '负面':
        sentimentType = 'NEG'
        break
      case '中性':
        sentimentType = 'NEU'
        break
    }

    return sentimentType
  },
  weiboType: function (type) {
    let sentimentType = ''
    switch (type) {
      case '1':
        sentimentType = '原微博'
        break
      case '0':
        sentimentType = '转发微博'
        break
    }

    return sentimentType
  },
  encodeWeiboType: function (type) {
    let sentimentType = ''
    switch (type) {
      case '原微博':
        sentimentType = 1
        break
      case '转发微博':
        sentimentType = 0
        break
    }

    return sentimentType
  },

  verifyType: function (type) {
    let sentimentType = ''
    switch (type) {
      case '0':
        sentimentType = '未认证'
        break
      case '1':
        sentimentType = '个人认证'
        break
      case '2':
        sentimentType = '企业认证'
        break
    }

    return sentimentType
  },
  encodeVerifyType: function (type) {
    let sentimentType = ''
    switch (type) {
      case '未认证':
        sentimentType = 0
        break
      case '个人认证':
        sentimentType = 1
        break
      case '企业认证':
        sentimentType = 2
        break
    }

    return sentimentType
  },

  gender: function (type) {
    let sentimentType = ''
    switch (type) {
      case '0':
        sentimentType = '未知'
        break
      case '1':
        sentimentType = '男'
        break
      case '2':
        sentimentType = '女'
        break
    }

    return sentimentType
  },
  encodeGender: function (type) {
    let sentimentType = ''
    switch (type) {
      case '未知':
        sentimentType = 0
        break
      case '男':
        sentimentType = 1
        break
      case '女':
        sentimentType = 2
        break
    }

    return sentimentType
  },
  /**
   * 文章类型
   * @param type
   * @returns {string}
   */
  articleType: function (type) {
    let articleType = ''
    type = type.toLowerCase()
    switch (type) {
      case 'news':
        articleType = '新闻'
        break
      case 'weibo':
        articleType = '微博'
        break
      case 'bbs':
        articleType = '论坛'
        break
      case 'bar':
        articleType = '贴吧'
        break
      case 'comments':
        articleType = '评论'
        break
      case 'article':
        articleType = '报道'
        break
      default:
        articleType = type
        break
    }
    return articleType
  },
  /**
   * 将显示的文章类型转化为数据库存储的对应值
   * @param type
   * @returns {string}
   */
  encodeArticleType: function (type) {
    let articleType = ''
    switch (type) {
      case '新闻':
        articleType = 'news'
        break
      case '微博':
        articleType = 'weibo'
        break
      case '论坛':
        articleType = 'bbs'
        break
      case '贴吧':
        articleType = 'bar'
        break
      case '评论':
        articleType = 'comments'
        break
    }

    return articleType
  },
  /**
   * 显示星期对应值
   * @param week
   * @returns {string}
   */
  unCodeWeekly: function (week) {
    let weekDay = ''
    let weekMap = [{key: '1', value: '星期二'}, {key: '2', value: '星期三'}, {key: '3', value: '星期四'},
      {key: '4', value: '星期五'}, {key: '5', value: '星期六'}, {key: '6', value: '星期日'}, {key: '7', value: '星期一'}]
    for (let item of weekMap) {
      if (week === item.key) {
        weekDay = item.value
      }
    }

    return weekDay
  }
}
