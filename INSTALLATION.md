# BankPros - Installation Guide

## Installation Options

BankPros supports two deployment modes:

1. **Supabase Cloud** (Recommended) - Fully managed backend with automatic scaling
2. **Standalone Database** - Self-hosted with your own MySQL, PostgreSQL, or SQL Server

## Option 1: Supabase Cloud (Recommended)

### Prerequisites
- Node.js 16+ and npm
- Supabase account

### Quick Setup
1. Clone or download the project
2. Install dependencies: `npm install`
3. The application is pre-configured for Supabase
4. Run: `npm run dev`
5. Access at `http://localhost:5173`

### Features Included
- ✅ Automatic database management
- ✅ Real-time updates
- ✅ Built-in authentication
- ✅ File storage
- ✅ Edge functions
- ✅ Automatic backups

## Option 2: Standalone Database Installation

### Prerequisites
- **Web Server**: Apache/Nginx with PHP 8.0+
- **Database**: MySQL 8.0+, PostgreSQL 13+, or MS SQL Server 2019+
- **PHP Extensions**: PDO, PDO_MySQL/PDO_PGSQL, JSON, OpenSSL
- **Node.js**: 16+ for building frontend

### Installation Steps

#### 1. Database Setup
Create a new database on your server:

**MySQL:**
```sql
CREATE DATABASE bankpros_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'bankpros_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON bankpros_db.* TO 'bankpros_user'@'localhost';
FLUSH PRIVILEGES;
```

**PostgreSQL:**
```sql
CREATE DATABASE bankpros_db;
CREATE USER bankpros_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE bankpros_db TO bankpros_user;
```

#### 2. Upload Files
Upload all files to your web server's document root or subdirectory.

#### 3. Run Installation Wizard
Navigate to `https://yourdomain.com/install/` and follow the wizard:

1. **Database Configuration**: Enter your database credentials
2. **Connection Test**: Verify database connectivity  
3. **Admin Account**: Create your administrator account
4. **Schema Installation**: Automatically create all tables
5. **Completion**: Installation finished

#### 4. Build Frontend
```bash
# Install dependencies
npm install

# Build for production
npm run build

# The built files will be in the 'dist' directory
```

#### 5. Security (Critical!)
After installation:
- **Delete the `/install/` directory** for security
- Set file permissions (644 for files, 755 for directories)
- Configure SSL/HTTPS
- Set up regular database backups

## Configuration

### Environment Variables
For standalone installations, configure these in your web server:

```
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bankpros_db
DB_USER=bankpros_user
DB_PASS=secure_password
```

### Switching Between Modes

**To use Supabase:** No configuration needed - works out of the box

**To use Standalone Database:** Complete the installation wizard at `/install/`

The application automatically detects which mode to use based on installation status.

## Features Comparison

| Feature | Supabase | Standalone |
|---------|----------|------------|
| Setup Time | Instant | 15-30 minutes |
| Database Management | Automatic | Manual |
| Scaling | Automatic | Manual |
| Backups | Automatic | Manual |
| Real-time Updates | Built-in | Limited |
| File Storage | Built-in | Manual setup |
| Security Updates | Automatic | Manual |
| Custom Domain | Supported | Native |
| Self-hosted | No | Yes |
| Cost | Usage-based | Server costs |

## System Requirements

### Supabase Mode
- Modern web browser
- Internet connection
- Node.js 16+ (for development)

### Standalone Mode
- **PHP**: 8.0+ with extensions (PDO, JSON, OpenSSL)
- **Database**: MySQL 8.0+, PostgreSQL 13+, or SQL Server 2019+
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **Memory**: 512MB+ RAM
- **Storage**: 1GB+ disk space
- **SSL Certificate**: Required for production

## Default Admin Credentials

After installation, use the credentials you created during setup.

**Security Note**: Change the default password immediately after first login.

## Features Included

### Core Banking Features
- ✅ User Management (Create, Edit, Suspend users)
- ✅ Multi-account Support per user
- ✅ Transaction Processing (Credits, Debits, Transfers)
- ✅ Money Transfers (Internal, External, Wire)
- ✅ Loan Applications & Management
- ✅ KYC (Know Your Customer) verification
- ✅ Branch Management
- ✅ Currency Support
- ✅ Account Types Management

### Admin Features  
- ✅ Admin Dashboard with analytics
- ✅ User role management
- ✅ Transaction monitoring
- ✅ Audit logs
- ✅ System settings
- ✅ Email/SMS notifications
- ✅ Report generation

### Security Features
- ✅ Multi-factor authentication
- ✅ Session management
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection protection
- ✅ CSRF protection
- ✅ Audit trails

### User Features
- ✅ User Dashboard
- ✅ Account overview
- ✅ Transaction history
- ✅ Money transfers
- ✅ Loan applications
- ✅ Profile management
- ✅ Document upload

## Production Deployment

### Domain Configuration
1. Point your domain to your server
2. Configure SSL certificate
3. Update any hardcoded URLs in configuration
4. Test all functionality

### Performance Optimization
- Enable caching (Redis recommended)
- Optimize database queries
- Configure CDN for static assets
- Set up monitoring

### Backup Strategy
- Database: Daily automated backups
- Files: Regular file system backups
- Test restore procedures monthly

## Troubleshooting

### Installation Issues

**"Database Connection Failed"**
- Verify database credentials
- Check database server is running
- Ensure user has proper permissions
- Test connection from command line

**"Permission Denied"**
- Set correct file permissions (644/755)
- Check web server user ownership
- Verify PHP has write access to required directories

**"Installation Already Complete"**
- Installation can only be run once
- Delete browser cache and try again
- Check for existing installation files

### Runtime Issues

**"Login Failed"**
- Verify admin credentials created during installation
- Check database connection
- Review error logs

**"Page Not Found"**
- Check web server configuration
- Verify .htaccess rules (Apache)
- Ensure all files uploaded correctly

**"Database Errors"**
- Check database server status
- Verify connection credentials
- Review database error logs

## Support

For technical support:
1. Check this documentation
2. Review error logs
3. Verify system requirements
4. Contact your system administrator

## Security Best Practices

1. **Regular Updates**: Keep PHP, database, and web server updated
2. **Strong Passwords**: Enforce strong password policies
3. **SSL/TLS**: Always use HTTPS in production
4. **Database Security**: Use dedicated database users with minimal permissions
5. **File Permissions**: Set restrictive file permissions
6. **Monitoring**: Set up logging and monitoring
7. **Backups**: Implement regular backup procedures
8. **Firewall**: Configure server firewall rules

## File Structure

```
/
├── backend/
│   ├── api/              # REST API endpoints
│   ├── config/           # Database configuration
│   ├── classes/          # PHP classes
│   ├── database/         # SQL schema files
│   └── install/          # Installation wizard
├── src/                  # React frontend source
├── dist/                 # Built frontend (after npm run build)
├── public/               # Static assets
└── README.md
```

## API Documentation

The standalone installation provides RESTful APIs at `/api/` endpoints:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration  
- `GET /api/users/{id}` - Get user details
- `POST /api/transactions` - Create transaction
- `GET /api/accounts` - List accounts
- And many more...

Full API documentation is available after installation.