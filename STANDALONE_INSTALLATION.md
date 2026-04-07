# BankPros Standalone Installation Guide

## Overview
BankPros can now be deployed as a completely standalone PHP + MySQL application without requiring Supabase. This guide will walk you through the installation process.

## Prerequisites

### Server Requirements
- **PHP**: Version 8.0 or higher
- **Web Server**: Apache (with mod_rewrite) or Nginx
- **Database**: MySQL 5.7+, PostgreSQL 11+, or MSSQL Server 2017+
- **PHP Extensions**:
  - PDO
  - PDO_MySQL (or PDO_PGSQL/PDO_SQLSRV)
  - mbstring
  - JSON

### File Permissions
- The `backend/config/` directory must be writable (for creating `installed.flag` and `.env.local`)
- Recommended permissions: `755` for directories, `644` for files

## Installation Steps

### 1. Upload Files
Upload all project files to your web server's document root or a subdirectory.

```
public_html/
├── backend/
├── public/
├── src/
└── ...
```

### 2. Build the Frontend
On your local machine or server (requires Node.js 16+):

```bash
npm install
npm run build
```

This creates optimized production files in the `dist/` directory.

### 3. Configure Web Server

#### Apache Configuration
Create or update `.htaccess` in the `public/` directory:

```apache
# Enable Rewrite Engine
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle React Router
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/public;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /backend/ {
        try_files $uri $uri/ =404;
        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
            fastcgi_index index.php;
            include fastcgi_params;
        }
    }
}
```

### 4. Access Installation Wizard
Open your browser and navigate to:
```
https://your-domain.com/install
```

### 5. Follow Installation Steps

#### Step 1: System Requirements Check
The installer will automatically verify:
- PHP version compatibility
- Required PHP extensions
- Database drivers
- File write permissions

Fix any issues before proceeding.

#### Step 2: Database Configuration
Enter your database credentials:
- **Database Type**: MySQL, PostgreSQL, or MSSQL
- **Host**: Usually `localhost` or `127.0.0.1`
- **Port**: 3306 (MySQL), 5432 (PostgreSQL), or 1433 (MSSQL)
- **Database Name**: Create an empty database first
- **Username**: Database user with full privileges
- **Password**: Database password

#### Step 3: Test Connection
The installer will test the database connection and verify permissions.

#### Step 4: Administrator Account
Create your admin account:
- **Email**: Your admin email address
- **Display Name**: Administrator name
- **Password**: Strong password (minimum 8 characters)

#### Step 5: Install Schema
The installer will:
- Create all database tables
- Set up default configurations
- Create your administrator account
- Create default currency (USD) and account type
- Generate `.env.local` file
- Create `installed.flag` file

#### Step 6: Complete
You'll be automatically redirected to the login page.

## Post-Installation

### 1. Security Steps
**CRITICAL**: After successful installation:

1. Delete the installation route access (optional, as the installer is now protected by the flag file)
2. Verify that `backend/config/installed.flag` exists
3. Ensure `backend/config/.htaccess` is protecting the config directory
4. Change default file permissions to read-only:
   ```bash
   chmod 644 backend/config/installed.flag
   chmod 644 .env.local
   ```

### 2. Default Login
Use the credentials you created during installation:
- **URL**: `https://your-domain.com/login`
- **Email**: Your admin email
- **Password**: Your admin password

### 3. Configure Application
Navigate to **Admin Settings** to configure:
- SMTP settings for email notifications
- Payment gateways
- Currency settings
- Account types
- Branch information
- Wire transfer settings

## File Structure

```
BankPros/
├── backend/
│   ├── api/                    # API endpoints
│   │   ├── auth/               # Authentication endpoints
│   │   ├── install.php         # Installation handler
│   │   ├── system-check.php    # System requirements checker
│   │   └── check-installation.php
│   ├── classes/                # PHP classes
│   │   ├── Auth.php
│   │   ├── Database.php
│   │   └── SecurityUtils.php
│   ├── config/                 # Configuration files
│   │   ├── database.php
│   │   ├── installed.flag      # Installation status (created during install)
│   │   └── .htaccess
│   └── database/               # SQL schemas
│       ├── schema_mysql.sql
│       ├── schema_postgresql.sql
│       └── schema_mssql.sql
├── public/                     # Public web root
│   ├── index.html
│   └── .htaccess
├── src/                        # React source code
└── .env.local                  # Environment configuration (created during install)
```

## Environment Variables

After installation, `.env.local` contains:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bankpros_db
DB_USER=your_db_user
DB_PASS=your_db_password
INSTALLATION_DATE=2025-01-15 10:30:00
```

## Troubleshooting

### Installation Errors

#### "Failed to connect to database"
- Verify database credentials
- Ensure database exists and is empty
- Check database user permissions
- Verify database server is running

#### "Permission denied"
- Ensure `backend/config/` directory is writable
- Check file ownership and permissions
- Apache/Nginx user must have write access

#### "PHP extension not found"
- Install missing PHP extensions:
  ```bash
  # Ubuntu/Debian
  sudo apt-get install php8.0-mysql php8.0-mbstring
  
  # CentOS/RHEL
  sudo yum install php-mysql php-mbstring
  ```
- Restart web server after installing extensions

### Runtime Errors

#### "Database not configured"
- Verify `backend/config/installed.flag` exists
- Check `.env.local` file permissions and content
- Ensure database connection details are correct

#### "Session errors"
- Check PHP session configuration
- Verify session directory is writable
- Increase session timeout if needed

## Database Management

### Backup Database
```bash
# MySQL
mysqldump -u username -p database_name > backup.sql

# PostgreSQL
pg_dump -U username database_name > backup.sql
```

### Restore Database
```bash
# MySQL
mysql -u username -p database_name < backup.sql

# PostgreSQL
psql -U username database_name < backup.sql
```

## Updating

To update the application:

1. **Backup everything** (files and database)
2. Upload new files (avoid overwriting `backend/config/` and `.env.local`)
3. Run any database migrations if provided
4. Clear application cache
5. Test thoroughly

## Production Deployment

### Performance Optimization
1. Enable OPcache in PHP
2. Use PHP 8.1+ for better performance
3. Configure MySQL query cache
4. Use CDN for static assets
5. Enable Gzip compression
6. Minimize and bundle assets

### Security Hardening
1. Use HTTPS (SSL/TLS certificate)
2. Disable PHP error display in production
3. Configure strict file permissions
4. Enable rate limiting
5. Regular security updates
6. Use strong passwords
7. Enable firewall rules
8. Regular database backups

### Monitoring
1. Set up error logging
2. Monitor server resources
3. Track database performance
4. Implement uptime monitoring
5. Configure automated backups

## Support

For issues or questions:
- Check the documentation
- Review error logs in `backend/logs/`
- Verify system requirements
- Check file permissions
- Test database connectivity

## License

BankPros is proprietary software. All rights reserved.
