# Project 3: EC2-Based Web Server using Apache

## Project Overview
Deployed a custom static website on an Ubuntu EC2 instance using the Apache HTTP Server on AWS.

## Architecture
User Browser → Internet → AWS EC2 Instance → Apache Web Server → Custom HTML Website

## AWS Services Used
- Amazon EC2
- Amazon VPC
- Security Groups
- Ubuntu 24.04 LTS
- Apache HTTP Server

## Implementation Steps
1. Launched an Ubuntu 24.04 EC2 instance in the Mumbai region (ap-south-1).
2. Configured a security group to allow SSH (port 22) and HTTP (port 80).
3. Connected to the EC2 instance using SSH.
4. Updated Ubuntu packages.
5. Installed Apache using:
   `sudo apt install apache2 -y`
6. Verified Apache service status:
   `sudo systemctl status apache2`
7. Created a custom HTML website in `/var/www/html/index.html`.
8. Accessed the website through the EC2 public IPv4 address.
9. Verified the HTTP response using:
   `curl -I http://localhost`

## Screenshots
Add your project screenshots in this section.

## Key Learnings
- Launching and configuring EC2 instances.
- Connecting to Linux servers using SSH.
- Installing and managing Apache services.
- Configuring security group rules.
- Hosting a website on AWS.
- Understanding HTTP traffic on port 80.

## Outcome
Successfully deployed and accessed a custom website hosted on an AWS EC2 instance using Apache.
