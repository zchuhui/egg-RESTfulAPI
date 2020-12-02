const Controller = require('egg').Controller

class DataSourceController extends Controller {
  constructor(ctx) {
    super(ctx)

  }

  // 获取所有用户(分页/模糊)
  async sourceList() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.dataSource.sourceList(payload) //.user.index(payload) 
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }


}


module.exports = DataSourceController