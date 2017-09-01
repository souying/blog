/**
 * @file 可定制的分享组件
 * @author musicode
 */
(function () {

    'use strict';

    /**
     * ## 平台配置
     *
     * 不同平台需要不同的分享文本，比如微博需要 @ 但其他平台不需要，图片同样也有类似需求
     *
     * {
     *     tsina: {
     *         title: '',
     *         content: '',
     *         url: '',
     *         img: ''
     *     },
     *     tqq: {
     *         结构同 tsina
     *     },
     *     qzone: {
     *         结构同 tsina
     *     },
     *     renren: {
     *         结构同 tsina
     *     },
     *     tieba: {
     *         结构同 tsina
     *     },
     *     douban: {
     *         结构同 tsina
     *     }
     * }
     *
     * ## 自定义
     *
     * 对于非跳转的分享，比如微信，对外暴露接口，可自行实现
     *
     * {
     *     custom: {
     *         weixin: function (data) {
     *             // 比如弹窗显示二维码
     *         }
     *     }
     * }
     *
     */

    /**
     * 各个平台的配置
     *
     * @inner
     * @type {Object}
     */
    var platform = {
        tsina: {
            url: 'http://service.weibo.com/share/share.php',
            data: {
                url: 'url',
                title: 'title',
                img: 'pic'
            },
            extra: {
                appkey: '2598258908',
                searchPic: 'false'
            }
        },
        qzone: {
            url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
            data: {
                url: 'url',
                title: 'title',
                content: 'desc',
                img: 'pics'
            }
        },
        tqq: {
            url: 'http://share.v.t.qq.com/index.php',
            data: {
                url: 'url',
                title: 'title',
                img: 'pic'
            },
            extra: {
                c: 'share',
                a: 'index'
            }
        },
        // QQ 好友
        qq: {
            url: 'http://connect.qq.com/widget/shareqq/index.html',
            data: {
                url: 'url',
                title: 'title',
                content: 'desc',
                img: 'pics'
            }
        },
        renren: {
            url: 'http://widget.renren.com/dialog/share',
            data: {
                url: 'resourceUrl',
                title: 'title',
                content: 'description',
                img: 'pic'
            }
        },
        tieba: {
            url: 'http://tieba.baidu.com/f/commit/share/openShareApi',
            data: {
                url: 'url',
                title: 'title',
                content: 'desc',
                img: 'pic'
            }
        },
        douban: {
            url: 'http://www.douban.com/share/service',
            data: {
                url: 'href',
                title: 'name',
                content: 'text',
                img: 'image'
            }
        }
    };

    function share(options) {

        var element = options.element;
        var config = options.config;
        var custom = options.custom;
        var iconSelector = options.iconSelector;

        element.on('click', iconSelector, function (e) {

            // 平台名称
            var name = $(this).data('name');
            // 平台配置
            var data = config[name] || {};

            if (!data.url) {
                data.url = document.URL;
            }

            if (custom && $.isFunction(custom[name])) {
                custom[name](data);
            }
            else {
                var conf = platform[name];
                if (!conf) {
                    return;
                }

                var query = {};

                $.each(conf.data, function (key, value) {
                    if (data[key]) {
                        query[value] = data[key];
                    }
                });

                if (conf.extra) {
                    $.extend(query, conf.extra);
                }

                var url = conf.url + '?' + $.param(query);

                window.open(url);
            }

        });

    }

    if (typeof define === 'function' && define.amd) {
        define('share', [], function () {
            return share;
        });
    }
    else {
        window.share = share;
    }

})();


