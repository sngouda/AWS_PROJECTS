# Project 3: MySQL Database Deployment Using Amazon RDS and EC2

## Project Overview
Deployed a managed MySQL database using Amazon Relational Database Service (Amazon RDS) and connected it to an Amazon EC2 instance within the same VPC. Configured networking and security groups to enable secure database connectivity and performed SQL operations.

## AWS Services Used
- Amazon RDS (MySQL)
- Amazon EC2
- Amazon VPC
- Security Groups
- DB Subnet Groups
- CloudWatch Monitoring
- Automated Backups

## Architecture
1. Created an Amazon RDS MySQL database in the Mumbai region (`ap-south-1`).
2. Configured a DB subnet group across two Availability Zones.
3. Launched an Ubuntu EC2 instance in the same VPC.
4. Configured security groups to allow MySQL traffic on TCP port 3306 from the EC2 security group.
5. Installed the MySQL client on EC2.
6. Connected to the RDS database using its endpoint.
7. Created the `projectdb` database and an `employees` table.

## SQL Operations Performed

- **INSERT:** Added employee records.
- **SELECT:** Retrieved employee records.
- **UPDATE:** Modified employee salary.
- **DELETE:** Removed an employee record.
- **COUNT:** Counted database records.

## Monitoring and Backup
- Explored RDS performance metrics using the Monitoring tab.
- Reviewed automated backup configuration and retention settings.

## Key Learnings
- Understanding managed relational databases using Amazon RDS.
- Configuring VPC networking and DB subnet groups.
- Establishing EC2-to-RDS connectivity.
- Applying security group references for database access.
- Performing SQL CRUD operations.
- Exploring database monitoring and automated backups.

## Region
Asia Pacific (Mumbai) – `ap-south-1`

## Screenshots
Screenshots demonstrating the deployment, connectivity, security configuration, and SQL operations are available in the `screenshots/` folder.

## Cleanup
AWS resources were removed after completing the hands-on exercise to minimize ongoing costs.
