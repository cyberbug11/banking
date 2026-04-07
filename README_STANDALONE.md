# BankPros - Standalone PHP + MySQL Installation

## Quick Start

BankPros is a professional banking application that can run as a standalone PHP + MySQL application without external dependencies.

### Installation in 3 Steps

1. **Upload Files** - Upload all files to your web server
2. **Visit /install** - Open `https://your-domain.com/install` in your browser
3. **Follow Wizard** - Complete the 6-step installation wizard

That's it! The installer will:
- ✅ Check system requirements
- ✅ Configure database connection
- ✅ Create all necessary tables
- ✅ Set up your admin account
- ✅ Auto-configure the application

## System Requirements

### Required
- **PHP 8.0+** with PDO, PDO_MySQL, mbstring, JSON extensions
- **MySQL 5.7+** or PostgreSQL 11+ or MSSQL Server 2017+
- **Apache/Nginx** web server
- **Writable** `backend/config/` directory

### Recommended
- PHP 8.1 or higher
- MySQL 8.0+
- SSL certificate (HTTPS)
- 512MB RAM minimum
- Modern browser for admin panel

## Installation Wizard Steps

### 1. System Check
Automatically verifies:
- PHP version and extensions
- Database drivers
- File permissions
- Server configuration

### 2. Database Configuration
Enter your database details:
- Type (MySQL/PostgreSQL/MSSQL)
- Host and port
- Database name (must be empty)
- Username and password

### 3. Connection Test
Validates database connectivity and permissions.

### 4. Admin Account
Create administrator credentials:
- Email address
- Display name
- Secure password

### 5. Schema Installation
Automatically creates:
- User management tables
- Account and transaction tables
- Security and audit logs
- Default configurations

### 6. Complete
Redirects to login page. Installation directory is automatically disabled.

## Post-Installation

### First Login
1. Go to `https://your-domain.com/login`
2. Use the admin credentials you created
3. Navigate to Admin Settings to configure:
   - SMTP for emails
   - Payment gateways
   - Currencies
   - Account types

### Security (Important!)
After installation, the system automatically:
- Creates `backend/config/installed.flag` to prevent reinstallation
- Generates `.env.local` with your database configuration
- Protects configuration directory with `.htaccess`

**Recommended**: Set config files to read-only:
```bash
chmod 644 backend/config/installed.flag
chmod 644 .env.local
```

## Features

### Core Banking
- ✅ Account management (savings, checking, deposits)
- ✅ Internal transfers
- ✅ Wire transfers
- ✅ Other bank transfers
- ✅ Transaction history
- ✅ Virtual card generation
- ✅ Multi-currency support

### Administration
- ✅ User management
- ✅ KYC verification
- ✅ Loan processing
- ✅ Branch management
- ✅ Staff administration
- ✅ Role-based access control
- ✅ Audit logging

### Security
- ✅ Session management
- ✅ Rate limiting
- ✅ Audit trails
- ✅ Encrypted passwords
- ✅ CSRF protection
- ✅ SQL injection prevention

## File Structure

```
bankpros/
├── backend/              # PHP backend
│   ├── api/              # REST endpoints
│   ├── classes/          # Business logic
│   ├── config/           # Configuration (generated)
│   └── database/         # SQL schemas
├── public/               # Web root
│   ├── index.html        # React app entry
│   └── .htaccess         # URL rewriting
├── src/                  # React source
└── .env.local            # Environment config (generated)
```

## Troubleshooting

### Common Issues

**"System requirements not met"**
- Install missing PHP extensions
- Update PHP version
- Fix directory permissions

**"Database connection failed"**
- Verify credentials
- Check database server is running
- Ensure database exists and is empty
- Grant proper user permissions

**"Permission denied"**
- Make `backend/config/` writable:
  ```bash
  chmod 755 backend/config/
  ```

**"Installation already completed"**
- Delete `backend/config/installed.flag` to reinstall (⚠️ This will require fresh setup)

### Get Help
- Check system logs
- Review `backend/logs/` for errors
- Verify PHP error logs
- Test database connectivity

## Production Deployment

### Build Frontend
```bash
npm install
npm run build
```

### Web Server Setup

**Apache** (`.htaccess` in public/):
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx**:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Performance Tips
1. Enable PHP OPcache
2. Use MySQL query cache
3. Configure CDN for assets
4. Enable Gzip compression
5. Set up cron jobs for maintenance

### Security Hardening
1. Use HTTPS only
2. Disable PHP error display
3. Set strict file permissions
4. Enable firewall rules
5. Regular backups
6. Keep software updated

## Backup & Restore

### Backup Database
```bash
mysqldump -u user -p database_name > backup.sql
```

### Restore Database
```bash
mysql -u user -p database_name < backup.sql
```

### Backup Files
```bash
tar -czf bankpros-backup.tar.gz /path/to/bankpros/
```

## Updates

To update:
1. Backup database and files
2. Upload new files (keep `.env.local` and `backend/config/`)
3. Run migrations if provided
4. Clear cache
5. Test functionality

## License

Proprietary software. All rights reserved.

---

**Need Help?** Refer to `STANDALONE_INSTALLATION.md` for detailed installation instructions.
