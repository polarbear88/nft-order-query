本程序使用Node.js + TypeScript开发，使用NestJs框架。

注意事项：
程序使用Redis作为主储存，使用需要保证Redis数据持久化
使用mysql作为次要储存，可用于后台数据查询

部署方法
使用n来安装nodejs
curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s lts

克隆仓库
git clone https://github.com/polarbear88/nft-order-query

如果未安装git则使用以下命令安装
centos
    yum install git
ubuntu
    apt-get install git

安装依赖
1、设置npm镜像加速
    npm config set registry https://registry.npm.taobao.org
2、安装pnpm
    npm install -g pnpm
3、安装依赖
    pnpm i

配置环境变量
    cp .env .env.prod
    修改.env.prod文件中的配置

使用pm2启动
1、安装pm2
    npm install pm2 -g
2、启动
    pm2 start npm --name "nft-order-query" -- run start

接口：
/api/v1/order/add
{
    "ticket": "xxx",
    "mobile": "xxx",
    "platform": "xxx",
    "payUrl": "xxx",
}

/api/v1/order/query
{
    "mobile": "xxx"
}