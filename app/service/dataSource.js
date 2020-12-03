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

    return {list:res,count:count,}

  }  

  // 类型列表 ======================================================================================================>
  async categories(payload) { 

    // mysql 开始查询, 用 distinct 去重，用 not null 去 null 值
    const res = await this.app.mysql.query('select distinct category from data_sources_2 where category is  not null')
    const res_sub = await this.app.mysql.query('select distinct category, sub_categor from data_sources_2 where category is  not null')

    let result = []
    res.map((i,index)=>{
      result.push({
        name:i.category,
        children:res_sub.filter((item,index)=> item.category === i.category)
      })
    })

    let count = result.length
 
    return {list:result,count:count,}

  } 
}


module.exports = DataSourceService