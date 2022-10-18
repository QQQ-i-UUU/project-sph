//vee-validate 表单验证插件
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
//安装插件
Vue.use(VeeValidate)

//表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        //修改内置规则的message，让确认密码和密码相同
        is: (field) => `$(field)必须与密码相同`
    }, //需要校验的属性
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        isAgree: '协议'
    }
});

//自定义校验规则
VeeValidate.Validator.extend('agree', {
    validate: (value) => {
        return value;
    },
    getMessage:(field)=>field + '必须同意',
})