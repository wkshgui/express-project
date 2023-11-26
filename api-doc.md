# express-project接口文档

### 接口说明

* 基于RESTful API接口规范；

* 基于JWT身份认证；

* 使用CORS跨域；

* 接口基础请求地址：http://127.0.0.1:3000/api/v1；

* 使用JSON格式进行数据通信。

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

|   字段名  | 字段类型 | 是否必填 |
| :------: | :-----: | :-----: |
| username | string  | 是       |
