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

是否认真： 否

|   字段名  | 字段类型 | 是否必填 |
| :------: | :-----: | :-----: |
| username | string  |    是   |
|   email  | string  |    是   |
|   phone  | string  |    是   |
| password | string  |    是   |

请求示例：

```
{
    "username": "kaka",
    "email": "kaka@qq.com",
    "phone": "13255467789",
    "password": "123456"
}
```
响应示例：

```
// success
{
    "user": {
        "username": "kaka",
        "email": "kaka@qq.com",
        "phone": "13255467789",
        "image": null,
        "createAt": "2023-11-26T12:02:44.408Z",
        "updateAt": "2023-11-26T12:02:44.408Z",
        "_id": "656334868effe969299e8937",
        "__v": 0
    }
}
```

```
// error
{
    "error": [
        {
            "type": "field",
            "value": "13255467789",
            "msg": "手机号已被注册",
            "path": "phone",
            "location": "body"
        }
    ]
}
```
