const text = require('!raw-loader!./index.html').
    replace('${scriptFile}', !process.env.WEBSITE_INSTANCE_ID ?
        'http://localhost:7071/api/chatjs' :
        'https://wellbeingbots.azurewebsites.net/api/chatjs')

module.exports = function (context: any, req: any) {
    context.res.setHeader('content-type', 'text/html; charset=utf-8')
    context.res.isRaw = true
    context.res.body = text
    context.done()
}
