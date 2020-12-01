const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = '欢迎~'
  }
}

module.exports = HomeController
