jQuery.ajaxPrefilter(function (options) {
    options.url += 'http://api-breakingnews-web.itheima.net';
    console.log(options.url);
})