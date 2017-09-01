/**
 * Created by Administrator on 2017/6/8.
 */
$(function(){
    //表单校验规则
    var strategies = {
        isNonEmpty: function (value, errorMsg) {
            if (value === "") {//值不能为空
                return errorMsg;
            } else {
                for (var i = 0, k = value.length; i < k; i++) {
                    if (value[i].indexOf(" ") === -1) {
                        return;
                    }
                }
                return errorMsg;
            }
        },
        minLength: function (value, length, errorMsg) {
            if (value.length < length) {//值的长度不能小于指的长度
                return errorMsg;
            }
        },
        isMobile: function (value, errorMsg) {
            if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {//值工符合手机的格式
                return errorMsg;
            }
        },
        isAZaz09: function (value, errorMsg) {
            if (!/^[0-9a-zA-Z]+$/.test(value)) {
                return errorMsg;
            }
        }
    }
    //校验函数
    var Validator = function () {
        this.cache = [];
    };
    Validator.prototype.add = function (dom, rules) {
        var self = this;
        for (var i = 0, rule; rule = rules[i++];) {
            ; (function (rule) {
                var strategyAry = rule.strategy.split(":");//获取校验规则 strategy: "minLength:6",
                var errorMsg = rule.errorMsg;     //获取错误指示信息

                self.cache.push(function () {//把校验函数放入数组中
                    var strategy = strategyAry.shift(); //提取校验规则
                    strategyAry.unshift(dom.value);     //把元素的值放到数组的第一位置中
                    strategyAry.push(errorMsg);      //把指示的信息放到数组的最后位置
                    return strategies[strategy].apply(strategies, strategyAry);//执行校验
                })
            })(rule);
        }

    }
    Validator.prototype.start = function () {
        for (var i = 0, validatorFn; validatorFn = this.cache[i++];) {
            var error = validatorFn();
            if (error) {
                return error;
            }
        }
    }

    var N = 4,
        M = 2, //随机生成的验证码长度在2-6之间
        verificationCount = Math.floor(Math.random() * N + M);

    !function () {
        var res = $("#RESwitch a"),   //注册和登录按钮
            register = $("#register"),//注册合子
            enter = $("#enter"),      //登录合子
            remember = $("#remember"), //记住我复选框
            mobileOrEmail = $("#enter input[name=mobileOrEmail]"),//手机或邮箱输入框
            passwordHide = $("#enter input[name=password]"),      //用于提交加密后的隐藏密码输入框
            password2 = $("#enter input[type =password]"),        //密码输入框不提交的
            btn2 = $("#btn2"),                                    //登录按钮
            enterVerification = $("#enter input[name =verification]"),//验证码输入框

            mTopBottom20a = $(".mTopBottom20>a"),      //社交登录按钮
            mTopBottom20div = $(".mTopBottom20 .m50"), //显示社交登录图标的合子

            registerInput = $("#register form input.removeHint"),//所有注册界面的输入框
            enterInput = $("#enter form input.removeHint"),      //所有登录界面的输入框

            verificationER = $(".verificationER"),       //显示验证元素
            Vcode2 = verificationCode(verificationCount);//获取验证码
        verificationER.text(Vcode2);
        verificationER.on('click', function () {     //换一张验证码
            verificationCount = Math.floor(Math.random() * N + M);//随机生成的验证码长度在2-6之间
            Vcode2 = verificationCode(verificationCount);
            verificationER.text(Vcode2);
        });


        mTopBottom20a.on('click', function () {
            mTopBottom20div.toggle(300);//显示隐藏社交登录图标
        });

        res.on('click', function () {
            var _this = $(this);
            var resData = _this.attr("data-rel");
            resSwith(_this);      //注册和登录高亮显示切换
            reHideShow(resData);  //注册和登录界面的切换
            if (resData === "enter") {
                getValue() //如果是登录界面，获取存储在本地的登录帐号和密码
                setTimeout(function () { inputGetFocus(enterInput); }, 500);//给最后空的输入框聚焦
                return;
            };
            setTimeout(function () { inputGetFocus(registerInput); }, 500);//给最后空的输入框聚焦
        });
        window.onload = function () {
            var data = location.hash.slice(1);
            if (data === "register") {
                reHideShow(data);   //切换到注册界面
                resSwith(res.eq(0)) //高亮显示注册按钮
                inputGetFocus(registerInput);//给最后空的输入框聚焦
                return;
            }
            if (data === "enter") {
                reHideShow(data)    //切换到登录界面
                resSwith(res.eq(1));//高亮显示登录按钮
                getValue() //如果是登录界面，获取存储在本地的登录帐号和密码
                inputGetFocus(enterInput);//给最后空的输入框聚焦
            }

        }
        function resSwith(selrf) { //注册和登录高亮显示切换
            res.removeClass("c666b2");
            selrf.addClass("c666b2");
        }
        function reHideShow(resData) { //注册和登录界面的切换
            if (resData === "register") {
                register.removeClass('hide');
                enter.addClass('hide');
                return;
            }
            if (resData === "enter") {
                enter.removeClass('hide');
                register.addClass('hide');
            }
        }

        btn2.on('click', function () { //点击登录按钮
            var bol = remember.prop("checked"),
                passValue = password2.val(),  //获取登录密码
                passValueMd5 = passValue;     //加密登录密码

            if (passValue === localStorage.getItem('password2Value')) {//如果该登录密码是加密过的就不再加密
                passwordHide.val(passValue);
            } else {
                passValueMd5 = hex_md5(passValue);//加密登录密码
                passwordHide.val(passValueMd5);
            }

            if (bol) { //是否记住密码
                if (window.localStorage) {
                    localStorage.setItem('mobileOrEmailValue', mobileOrEmail.val())
                    localStorage.setItem('password2Value', passValueMd5)
                }
            } else {
                localStorage.removeItem('mobileOrEmailValue')
                localStorage.removeItem('password2Value')
            }
            //验证数据
            var _false = verificationFn(mobileOrEmail, password2, enterVerification);
            if (!_false) return false;
            //校验验证码
            if (enterVerification.val() !== Vcode2) {
                var span = errorHintFn(enterVerification, "你输入的验证码不确");
                span.css('right', 80);
                return false;
            }else{
             // ajax请求的数据
            }
            var dologin = {'email':mobileOrEmail.val(),'pwd':passValueMd5}
            console.log(dologin)
            $.ajax({  
                type : "POST",  //提交方式  
                url : "/api/dologin",//路径  
                data : dologin, 
                success : function(data) {//返回数据根据结果进行相应的处理  
                    console.log(data);
                    if(data.err=="0"){
                        alert(data.msg);
                    }else if(data.err=="ture"){
                        window.location.href="http://127.0.0.1/admin"
                    }
                }  
            });
            // console.log({ 'formData': [mobileOrEmail.val(), '加密后密码'+passValueMd5].join() })
            return false;//返回false阻止页面跳转，因你的提交按钮type=submit，也因为这个类型按钮可以回车提交
        });

        function getValue() { //获取本地存储
            if (window.localStorage) {
                mobileOrEmail.val(localStorage.getItem('mobileOrEmailValue'))
                passwordHide.val(localStorage.getItem('password2Value'))
                password2.val(localStorage.getItem('password2Value'))
            }

        }
    }();


    !function () {
        var popup = $('#popup'),//弹窗
            div3 = $('#popup .popup3'),//弹窗第三页
            div2 = $('#popup .popup2'),//弹窗第二页
            div1 = $('#popup .popup1'),//弹窗第一页
            retrieveBtn1 = div1.find(".retrieveBtn"),         //找回密码按钮
            verificationBtn1 = div1.find(".verificationBtn"), //手机验证登录按钮
            rightBtn = $("#popup .rightBtn"),     //弹窗的关闭按钮
            cannot = $('#cannot'),                    //无法登录按钮
            registerEnterBox = $('.registerEnterBox'),//注册和登录盒子
            leftBtn2 = div2.find(".leftBtn"),         //找回密码弹窗后退按钮
            leftBtn3 = div3.find(".leftBtn"),         //手机验证登录弹窗后退按钮
            getRetrieveBtn2 = div2.find(".getRetrieveBtn"),//提交按钮
            getRetrieveBtn3 = div3.find(".getRetrieveBtn"),//提交按钮
            mobileEmail2 = $("#Mobile_or_email"),//手机或邮箱
            mobileEemailVerification2 = $("#Mobile_email_verification"),//验证码
            mobileNumber3 = $("#popup .mobileNumber"),//手机号
            mobileVerification3 = $("#popup .mobileVerification"),//验证码

            verificationPopup2 = $(".verificationPopup2"),  //显示验证元素
            verificationPopup3 = $(".verificationPopup3"),  //显示验证元素
            VcodeP2 = verificationCode(verificationCount),  //获取验证码
            VcodeP3 = verificationCode(verificationCount);  //获取验证码

        verificationPopup2.text(VcodeP2);
        verificationPopup3.text(VcodeP3);

        verificationPopup2.on('click', function () { //换一张验证码
            verificationCount = Math.floor(Math.random() * N + M); //随机生成的验证码长度在2-6之间
            VcodeP2 = verificationCode(verificationCount);
            verificationPopup2.text(VcodeP2);
        });
        verificationPopup3.on('click', function () {//换一张验证码
            verificationCount = Math.floor(Math.random() * N + M); //随机生成的验证码长度在2-6之间
            VcodeP3 = verificationCode(verificationCount);
            verificationPopup3.text(VcodeP3);
        });


        retrieveBtn1.on('click', function () { //点击找回密码
            div1div2('0', '-100%');
        });
        verificationBtn1.on('click', function () {//点击使用手机验证登录
            div1div3('0', '-100%');
        });

        popup.on('click', function (e) {
            var bol = $(e.target).hasClass('rightBtn');//点击关闭弹窗按钮
            if (bol) {
                $(this).hide(300);
                registerEnterBox.fadeTo(300, 1);
            }
        });

        leftBtn2.on('click', function () {//点击找回密码弹窗后退按钮
            div1div2('100%', '0')
        });
        leftBtn3.on('click', function () {//点击手机验证登录弹窗后退按钮
            div1div3('100%', '0')
        });
        cannot.on('click', function () {//点击无法登录按钮
            registerEnterBox.fadeTo(300,0.2);
            div3.css('left', '100%');
            div1div2('100%', '0')
            popup.show(300);
        });
        //弹窗1和2的切换
        function div1div2(value,value2) {
            div2.animate({ 'left': value }, 300);
            div1.animate({ 'left': value2 }, 300);
        }
        //弹窗1和3的切换
        function div1div3(value, value2) {
            div3.animate({ 'left': value }, 300);
            div1.animate({ 'left': value2 }, 300);
        }
        //找回密码弹窗，获取验证码提交数据
        getRetrieveBtn2.on('click', function () {
            var mobileE = mobileEmail2.val();
            if (!(/@/.test(mobileE))) {
                var varlidataFunc = function () {
                    var validator = new Validator();
                    validator.add(mobileEmail2[0], [{
                        strategy: 'isNonEmpty',
                        errorMsg: '不能为空'
                    },
                        {
                            strategy: "isMobile",
                            errorMsg: '请输入正确的手机或邮箱格式'
                        }]);
                    return validator.start();
                }
                var error1 = varlidataFunc();
                if (error1) {
                    errorHintFn(mobileEmail2, error1)
                    return false;
                };
            }
            var varlidataFunc2 = function () {
                var validator = new Validator();
                validator.add(mobileEemailVerification2[0], [{
                    strategy: 'isNonEmpty',
                    errorMsg: '不能为空'
                }]);
                return validator.start();
            }
            var error2 = varlidataFunc2();
            if (error2) {
                var span = errorHintFn(mobileEemailVerification2, error2);
                span.css('right', 80);
                return false;
            };
            //校验验证码
            if (mobileEemailVerification2.val() !== VcodeP2) {
                var span = errorHintFn(mobileEemailVerification2, '输入的验证码不正确');
                span.css('right', 80);
                return false;
            };

            //下面是提交ajax了
            // formSubmit('GET', "formDispose.ashx", { 'formData': mobileE });
            console.log({ 'formData': mobileE });
        });
        //登录弹窗获取验证码提交数据
        getRetrieveBtn3.on('click', function () {
            var varlidataFunc = function () {
                var validator = new Validator();
                validator.add(mobileNumber3[0], [{
                    strategy: 'isNonEmpty',
                    errorMsg: '不能为空'
                },
                    {
                        strategy: "isMobile",
                        errorMsg: '请输入正确的手机格式'
                    }]);
                return validator.start();
            }

            var varlidataFunc2 = function () {
                var validator = new Validator();
                validator.add(mobileVerification3[0], [{
                    strategy: 'isNonEmpty',
                    errorMsg: '不能为空'
                }]);
                return validator.start();
            }
            var error1 = varlidataFunc();
            if (error1) {
                errorHintFn(mobileNumber3, error1)
                return false;
            };
            var error2 = varlidataFunc2();
            if (error2) {
                var span = errorHintFn(mobileVerification3, error2);
                span.css('right', 80);
                return false;
            };
            //校验验证码
            if (mobileVerification3.val() !== VcodeP3) {
                var span = errorHintFn(mobileVerification3, '输入的验证码不正确');
                span.css('right', 80);
                return false;
            };
            //下面是提交ajax了
            // formSubmit('GET', "formDispose.ashx", { 'formData': mobileNumber3.val() });
            console.log({ 'formData': mobileNumber3.val() })
        });
    }();

    //注册界面
    !function () {
        var consumer1 = $("#register .consumer"),
            mobile1 = $("#register .mobile"),
            password1 = $("#register .password"),
            verification1 = $("#register .verification"),
            btn = $("#btn"),
            download = $(".download"),
            registerVn = $(".registerVn"),//显示验证元素
            VCode = verificationCode(verificationCount);//获取验证码

        registerVn.text(VCode);
        registerVn.on('click', function () {             //换一张验证码
            verificationCount = Math.floor(Math.random() * N + M);
            VCode = verificationCode(verificationCount);
            registerVn.text(VCode);
        });

        btn.on('click', function () {//点击注册
            //验证用户名
            var varlidataFunc = function () {
                var validator = new Validator();
                validator.add(consumer1[0], [{
                    strategy: 'isNonEmpty',
                    errorMsg: '不能为空'
                },
                    {
                        strategy: "minLength:2",
                        errorMsg: '用户名不能少于2位'
                    }]);
                return validator.start();
            }
            var error1 = varlidataFunc();
            if (error1) {
                errorHintFn(consumer1, error1)
                return false;
            };
            //验证其它输入框
            var bol = verificationFn(mobile1, password1, verification1);
            if (!bol) return false;
            //验证验证码
            if ( verification1.val() !== VCode) {
                var span = errorHintFn(verification1, "你输入的验证码不确");
                span.css('right', 80);
                return false;
            }
            // formSubmit('GET', "formDispose.ashx", { 'formData':[consumer1.val(), mobile1.val(), password1.val()].join() })
            // ajax请求的数据
            var doreg = {'uname':consumer1.val(),'email':mobile1.val(),'pwd':hex_md5(password1.val())}
            // console.log(a)
            $.ajax({  
                type : "POST",  //提交方式  
                url : "/api/doreg",//路径  
                data : doreg, 
                success : function(data) {//返回数据根据结果进行相应的处理  
                    // console.log(data);
                    if(data.err=='0'){
                        alert(data.msg);
                    }else if(data.err=='1'){
                        alert(data.msg);
                    }else if(data.err=='ture'){
                        alert('注册成功了请选择登录');
                    }else if(data.err=='2'){
                        alert(data.msg);
                    }
                }  
            });
            // console.log({ 'formData':[consumer1.val(), mobile1.val(), hex_md5(password1.val())].join() })
            return false;//返回false阻止页面跳转，因你的提交按钮type=submit，也因为这个类型按钮可以回车提交
        });

    }();

    //创建一个错误提示的元素
    function errorHintFn(obj, data) {
        var objParent = obj.parent(),
            span = $("<span class=errorHint></span>");
        objParent.find(".errorHint").remove();
        objParent.append(span.text(data));
        return span;
    }
    //获得焦点清除错误的提示
    $("input.removeHint").on('focus', function () {
        $(this).parent().find(".errorHint").hide(300);
    });
    //按回车键给最近的没有内容的输入框定焦
    $("input.removeHint").on('keyup', function (e) {
        if (e.which == 13) {
            var eles = $(this).parents('form').find(".removeHint");
            inputGetFocus(eles);
        }
    });
    //给最近的没有内容的输入框定焦
    function inputGetFocus(eles) {
        eles.each(function (i, value) {
            var _self = $(value);
            if (!_self.val()) {
                _self.focus();
                return false;
            }
        });
    }
    //登录数据验证
    function verificationFn(obj1, obj2, obj3) {
        var mobileE = obj1.val();
        if (!(/@/.test(mobileE))) {
            var varlidataFunc = function () {
                var validator = new Validator();
                validator.add(obj1[0], [{
                    strategy: 'isNonEmpty',
                    errorMsg: '不能为空'
                },
                    {
                        strategy: "isMobile",
                        errorMsg: '请输入正确的手机或邮箱格式'
                    }]);
                return validator.start();
            }
            var error1 = varlidataFunc();
            if (error1) {
                errorHintFn(obj1, error1)
                return false;
            };
        }
        var varlidataFunc2 = function () {
            var validator = new Validator();
            validator.add(obj2[0], [{
                strategy: 'isNonEmpty',
                errorMsg: '不能为空'
            }, {
                strategy: "minLength:6",
                errorMsg: '密码不能少于6位'
            }
            ]);
            return validator.start();
        }
        var error2 = varlidataFunc2();
        if (error2) {
            errorHintFn(obj2, error2);
            return false;
        };
        var varlidataFunc3 = function () {
            var validator = new Validator();
            validator.add(obj3[0], [{
                strategy: 'isNonEmpty',
                errorMsg: '不能为空'
            }]);
            return validator.start();
        }
        var error3 = varlidataFunc3();
        if (error3) {
            var span = errorHintFn(obj3, error3);
            span.css('right', 80);
            return false;
        };
        return true;
    }
    //生成的验证码函数
    function verificationCode(codeLength) {
        var CLength = codeLength || 4,
            code = "",
            codeChar = ['2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        for (var i = 0; i < CLength; i++) {
            var charIndex = Math.floor(Math.random() * 56);
            code += codeChar[charIndex];
        };
        return code
    }

    //ajax提交
    function formSubmit(type,url,data) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            //  dataType: "json",
            beforeSend:function(xml){

            },
            success: function (data) {
                alert(data);
            },
            error:   function(XMLHttpRequest, textStatus, errorThrown){
                //通常情况下textStatus和errorThrown只有其中一个包含信息

            },
            complete: function () {

            }
        });
    }
});