/**
 * Created by Administrator on 2017/6/6.
 */
    // 高亮代码
    $('pre code').each(function(){
        texts = $(this).text().replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;')
        var codetext = texts.split('\n');
        var code = '';
        $(codetext).each(function(v){
            code += '<li>'+codetext[v]+'</li>';
        })
        code = '<ol>'+code+'</ol>';
        $(this).html(code);
    });

    
