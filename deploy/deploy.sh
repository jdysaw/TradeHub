#!/bin/bash
# ============================================
# 新蜂商城一键部署脚本
# 适用于阿里云 Ubuntu 22.04 / CentOS 7+
# 使用方法: sudo bash deploy.sh
# ============================================

set -e

# ========== 配置区（请根据实际情况修改） ==========
DB_PASSWORD="123456"           # 数据库密码
SERVER_IP=""                   # 服务器公网IP（留空则自动获取）
# ==================================================

echo "========================================="
echo "  新蜂商城 - 一键部署脚本"
echo "========================================="

# 检测操作系统
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo "无法检测操作系统"
    exit 1
fi

echo "检测到操作系统: $OS"

# ---------- 1. 安装基础依赖 ----------
echo ""
echo ">>> [1/7] 安装基础依赖..."

if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
    apt update -y
    apt install -y curl wget git unzip
elif [ "$OS" = "centos" ] || [ "$OS" = "rhel" ]; then
    yum install -y curl wget git unzip
fi

# ---------- 2. 安装 JDK 17 ----------
echo ""
echo ">>> [2/7] 安装 JDK 17..."

if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | cut -d'.' -f1)
    if [ "$JAVA_VERSION" = "17" ]; then
        echo "JDK 17 已安装，跳过"
    else
        echo "当前 Java 版本不是 17，需要安装"
        if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
            apt install -y openjdk-17-jdk
        elif [ "$OS" = "centos" ] || [ "$OS" = "rhel" ]; then
            yum install -y java-17-openjdk java-17-openjdk-devel
        fi
    fi
else
    if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        apt install -y openjdk-17-jdk
    elif [ "$OS" = "centos" ] || [ "$OS" = "rhel" ]; then
        yum install -y java-17-openjdk java-17-openjdk-devel
    fi
fi

echo "Java 版本: $(java -version 2>&1 | head -1)"

# ---------- 3. 安装 MySQL 8 ----------
echo ""
echo ">>> [3/7] 安装 MySQL 8..."

if command -v mysql &> /dev/null; then
    echo "MySQL 已安装，跳过"
else
    if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        # Ubuntu 安装 MySQL
        DEBIAN_FRONTEND=noninteractive apt install -y mysql-server
        systemctl start mysql
        systemctl enable mysql
        # 设置 root 密码
        mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_PASSWORD';"
        mysql -e "FLUSH PRIVILEGES;"
    elif [ "$OS" = "centos" ] || [ "$OS" = "rhel" ]; then
        # CentOS 安装 MySQL
        yum install -y https://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm
        yum install -y mysql-community-server
        systemctl start mysqld
        systemctl enable mysqld
        # 获取临时密码
        TEMP_PASSWORD=$(grep 'temporary password' /var/log/mysqld.log | tail -1 | awk '{print $NF}')
        mysql --connect-expired-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$DB_PASSWORD';" -p"$TEMP_PASSWORD" 2>/dev/null || true
    fi
fi

# ---------- 4. 安装 Node.js 18 ----------
echo ""
echo ">>> [4/7] 安装 Node.js 18..."

if command -v node &> /dev/null; then
    echo "Node.js 已安装: $(node -v)，跳过"
else
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        apt install -y nodejs
    elif [ "$OS" = "centos" ] || [ "$OS" = "rhel" ]; then
        curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
        yum install -y nodejs
    fi
fi

echo "Node.js 版本: $(node -v)"
echo "npm 版本: $(npm -v)"

# ---------- 5. 安装 Nginx ----------
echo ""
echo ">>> [5/7] 安装 Nginx..."

if command -v nginx &> /dev/null; then
    echo "Nginx 已安装，跳过"
else
    if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        apt install -y nginx
    elif [ "$OS" = "centos" ] || [ "$OS" = "rhel" ]; then
        yum install -y epel-release
        yum install -y nginx
    fi
    systemctl start nginx
    systemctl enable nginx
fi

echo "Nginx 版本: $(nginx -v 2>&1)"

# ---------- 6. 构建项目 ----------
echo ""
echo ">>> [6/7] 构建项目..."

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# 构建后端
echo "  构建后端 JAR 包..."
cd "$PROJECT_DIR/newbee-mall-api"

# 检查 Maven Wrapper
if [ -f "./mvnw" ]; then
    chmod +x ./mvnw
    ./mvnw clean package -DskipTests
else
    # 使用系统 Maven 或下载
    if ! command -v mvn &> /dev/null; then
        echo "  下载 Maven..."
        wget -q https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz -O /tmp/maven.tar.gz
        tar -xzf /tmp/maven.tar.gz -C /opt/
        ln -sf /opt/apache-maven-3.9.6/bin/mvn /usr/local/bin/mvn
    fi
    mvn clean package -DskipTests
fi

# 构建H5前端
echo "  构建H5商城前端..."
cd "$PROJECT_DIR/newbee-mall-vue3-app"
npm install --registry=https://registry.npmmirror.com
npm run build

# 构建管理后台
echo "  构建管理后台前端..."
cd "$PROJECT_DIR/vue3-admin"
npm install --registry=https://registry.npmmirror.com
npm run build

# ---------- 7. 部署 ----------
echo ""
echo ">>> [7/7] 部署服务..."

# 创建部署目录
mkdir -p /opt/newbee-mall
mkdir -p /usr/share/nginx/html/h5
mkdir -p /usr/share/nginx/html/admin

# 部署后端 JAR
cp "$PROJECT_DIR/newbee-mall-api/target/newbee-mall-api-3.0.0-SNAPSHOT.jar" /opt/newbee-mall/newbee-mall-api.jar

# 部署生产配置
cp "$SCRIPT_DIR/config/application-prod.properties" /opt/newbee-mall/application-prod.properties

# 修改生产配置中的数据库密码
sed -i "s/请修改为你的数据库密码/$DB_PASSWORD/g" /opt/newbee-mall/application-prod.properties

# 部署前端
cp -r "$PROJECT_DIR/newbee-mall-vue3-app/dist/"* /usr/share/nginx/html/h5/
cp -r "$PROJECT_DIR/vue3-admin/dist/"* /usr/share/nginx/html/admin/

# 部署 Nginx 配置
cp "$SCRIPT_DIR/nginx/default.conf" /etc/nginx/conf.d/newbee-mall.conf
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# 替换 server_name
if [ -n "$SERVER_IP" ]; then
    sed -i "s/your-server-ip/$SERVER_IP/g" /etc/nginx/conf.d/newbee-mall.conf
fi

# 测试 Nginx 配置
nginx -t

# 部署 systemd 服务
cp "$SCRIPT_DIR/service/newbee-mall.service" /etc/systemd/system/newbee-mall.service
# 修改服务文件中的数据库密码
sed -i "s/请修改为你的数据库密码/$DB_PASSWORD/g" /etc/systemd/system/newbee-mall.service
systemctl daemon-reload

# ---------- 初始化数据库 ----------
echo ""
echo ">>> 初始化数据库..."
mysql -uroot -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS newbee_mall_db_v2 DEFAULT CHARACTER SET utf8mb4;" 2>/dev/null || \
mysql -uroot -p"$DB_PASSWORD" newbee_mall_db_v2 < "$PROJECT_DIR/newbee-mall-api/src/main/resources/newbee_mall_db_v2_schema.sql" 2>/dev/null || \
echo "  注意：请手动导入数据库SQL文件"

# ---------- 启动服务 ----------
echo ""
echo ">>> 启动服务..."

# 重启 Nginx
systemctl restart nginx

# 启动后端服务
systemctl restart newbee-mall
systemctl enable newbee-mall

# 等待后端启动
echo "  等待后端服务启动..."
sleep 15

# 检查服务状态
if systemctl is-active --quiet newbee-mall; then
    echo "  ✅ 后端服务启动成功"
else
    echo "  ❌ 后端服务启动失败，请查看日志: journalctl -u newbee-mall -n 50"
fi

if systemctl is-active --quiet nginx; then
    echo "  ✅ Nginx 启动成功"
else
    echo "  ❌ Nginx 启动失败"
fi

# ---------- 防火墙配置 ----------
echo ""
echo ">>> 配置防火墙..."
if command -v ufw &> /dev/null; then
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 22/tcp
    echo "  UFW 防火墙已配置"
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-port=80/tcp
    firewall-cmd --permanent --add-port=443/tcp
    firewall-cmd --reload
    echo "  Firewalld 防火墙已配置"
fi

# ---------- 完成 ----------
echo ""
echo "========================================="
echo "  🎉 部署完成！"
echo "========================================="
echo ""
echo "  H5商城:    http://$(curl -s ifconfig.me 2>/dev/null || echo '你的服务器IP')/"
echo "  管理后台:  http://$(curl -s ifconfig.me 2>/dev/null || echo '你的服务器IP')/admin"
echo "  后端API:   http://$(curl -s ifconfig.me 2>/dev/null || echo '你的服务器IP'):28019"
echo ""
echo "  管理员账号: admin"
echo "  管理员密码: 123456"
echo ""
echo "  常用命令:"
echo "    查看后端日志:  journalctl -u newbee-mall -f"
echo "    重启后端:      systemctl restart newbee-mall"
echo "    重启Nginx:     systemctl restart nginx"
echo "========================================="
