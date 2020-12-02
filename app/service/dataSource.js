const Service = require('egg').Service

class DataSourceService extends Service {
  

  // 数据源列表 ======================================================================================================>
  async sourceList(payload) { 

    // 请求参数
    const { currentPage,pageSize } = payload
    // console.log('sourcelist payload',payload)

    
    // mysql 开始查询
    const res = await this.app.mysql.select('data_sources',{
      // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
      // columns: ['author', 'title'], // 要查询的表字段
      // orders: [['created_at','desc'], ['id','desc']], // 排序方式
      limit: pageSize !== undefined ? Number(pageSize) : 10, // 返回数据量
      offset: currentPage !== undefined ? Number(currentPage) : 0, // 数据偏移量
    })
    let count = res.length

    // 整理数据源格式化
    // let data = res.map((e,i) => {
    //   const jsonObject = Object.assign({}, e._doc)
    //   jsonObject.key = i
    //   jsonObject.password = 'Are you ok?'
    //   jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
    //   return jsonObject
    // })

    return {list:res,count:count,}

  }  

  

}


module.exports = DataSourceService