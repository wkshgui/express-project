# express-project接口文档

### 接口说明

1.基于RESTful API接口规范；

2.基于JWT身份认证；

3.使用CORS跨域；

4.接口基础请求地址：http://127.0.0.1:3000/api/v1；

5.使用JSON格式进行数据通信。

### 用户注册

path: /user/registers

method: post

请求体：

```
{
    "username": "kaka",
    "email": "kaka@qq.com",
    "phone": "13255467789",
    "password": "123456"
}
```
