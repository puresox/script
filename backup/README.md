# usage

```json
{
  "mongo": {
    "enable": true, // 是否启用
    "interval": 86400000, // 备份间隔时间 以毫秒为单位 整数
    "expired": 7, // 备份过期时间 以天为单位 整数
    "dblist": [
      {
        "database": "", // 数据库名字
        "user": "", // 数据库管理员
        "password": "", // 数据库密码
        "host": "127.0.0.1:27017", // 数据库地址
        "output": "~/mongobackup" // 输出路径
      }
    ]
  },
  "mysql": {
    "enable": false, // 是否启用
    "interval": 86400000, // 备份间隔时间 以毫秒为单位 整数
    "expired": 7, // 备份过期时间 以天为单位 整数
    "dblist": [
      {
        "database": "", // 数据库名字
        "user": "", // 数据库管理员
        "password": "", // 数据库密码
        "host": "127.0.0.1", // 数据库地址
        "output": "~/mysql" // 输出路径
      }
    ]
  }
}
```