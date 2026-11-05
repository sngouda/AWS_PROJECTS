# AWS Static Portfolio Website Hosting Using S3 and CloudFront

## 🌐 Live Website

[View My Portfolio](https://d4o87dge7unna.cloudfront.net/)
## Project Overview

This project demonstrates how to host a responsive static portfolio website using Amazon S3 and Amazon CloudFront.

The main objective was to deploy a website securely using a private S3 bucket, configure CloudFront as a Content Delivery Network (CDN), enable HTTPS, and explore DNS management using Amazon Route 53.

## Technologies and AWS Services

| Service / Technology | Purpose |
|---|---|
| Amazon S3 | Stores static website files |
| Amazon CloudFront | Global content delivery and caching |
| Origin Access Control (OAC) | Secure access between CloudFront and S3 |
| Amazon Route 53 | DNS management and hosted zone practice |
| HTML | Website structure |
| CSS | Website styling |
| JavaScript | Website functionality |
| HTTPS | Secure communication |

## Architecture Diagram

```text
              Website Visitor
                     |
                     |
                HTTPS Request
                     |
                     v
              Amazon CloudFront
                (Global CDN)
                     |
                     |
              Origin Access
               Control (OAC)
                     |
                     v
              Private S3 Bucket
                     |
             ------------------
             |        |       |
             v        v       v
          index.html style.css script.js
                     |
                     v
                Website Content
```

## AWS Configuration

**AWS Region:** Asia Pacific (Mumbai) – `ap-south-1`

**CloudFront:** Global service

**S3 Bucket:** `my-static-website-project-1231`

**CloudFront Distribution ID:** `EYVQNOGMMMDWK`

## Implementation Steps

### 1. Create an Amazon S3 Bucket

- Created an S3 general-purpose bucket in the Mumbai region.
- Enabled all Block Public Access settings.
- Kept ACLs disabled using Bucket owner enforced object ownership.
- Used the bucket to store website files.

**Security:** The S3 bucket was kept private to prevent direct public access.

### 2. Upload Website Files

Uploaded the following files into the root directory of the S3 bucket:

- `index.html`
- `style.css`
- `script.js`


The website files were stored directly in the bucket's root directory.

### 3. Create a CloudFront Distribution

Created a CloudFront distribution and configured the S3 bucket as the origin.

Configured the following settings:

| Configuration | Value |

| Origin | Amazon S3 |
| Origin access | Origin Access Control |
| Signing behavior | Sign requests |
| Signing protocol | SigV4 |
| Default root object | `index.html` |
| Viewer protocol policy | Redirect HTTP to HTTPS |
| Allowed HTTP methods | GET, HEAD |
| Cache policy | CachingOptimized |

### 4. Configure Origin Access Control (OAC)

Created an Origin Access Control to allow CloudFront to securely retrieve objects from the private S3 bucket.

- Selected Origin Access Control settings.
- Enabled request signing.
- Used AWS Signature Version 4 (SigV4).
- Attached OAC to the S3 origin.

**Benefit:** OAC allows CloudFront to access the private S3 bucket without enabling public access.

### 5. Configure the S3 Bucket Policy

Added a bucket policy to allow the CloudFront service principal to read objects.

The policy included:

- Principal: `cloudfront.amazonaws.com`
- Action: `s3:GetObject`
- Resource: All objects in the portfolio bucket.
- Condition: Restricted access to the specific CloudFront distribution ARN.

This configuration ensured that only the authorized CloudFront distribution could retrieve the website files through the configured policy.

### 6. Deploy and Test the Website

After the CloudFront distribution was deployed, accessed the website using its CloudFront distribution domain.

Verified:

- Website loaded successfully.
- HTML content displayed correctly.
- CSS styling worked correctly.
- Navigation links functioned correctly.
- HTTPS access worked successfully.

### 7. Configure CloudFront Cache Invalidation

CloudFront caches website files to improve performance.

When website files are updated in S3, CloudFront may continue serving previously cached content.

Created a cache invalidation using:

```text
/*
```

This invalidated all cached objects in the distribution.

**Practical testing:**

1. Modified the heading in `index.html`.
2. Uploaded the updated file to S3.
3. Created a CloudFront invalidation.
4. Refreshed the CloudFront distribution URL.
5. Verified that the updated heading appeared.

### 8. Explore Amazon Route 53

Practised basic DNS management using Amazon Route 53.

Activities performed:

- Created a public hosted zone named `example1.com`.
- Explored NS (Name Server) records.
- Explored SOA (Start of Authority) records.
- Explored creating an A record with Alias enabled.
- Investigated CloudFront as a possible Alias target.

**Note:** A working custom-domain integration was not completed because I did not own the practice domain. A domain that I own and can verify is required for this configuration.

The practice hosted zone was deleted after completing the exercise to avoid recurring charges.

## Challenges Faced and Solutions

| Challenge | Solution |
|---|---|
| CloudFront returned Access Denied | Verified the S3 bucket policy and CloudFront OAC configuration. |
| Incorrect HTML filename | Corrected `Index.html.html` to `index.html`. |
| Website root page was not loading | Configured `index.html` as the CloudFront default root object. |
| Website changes were not immediately visible | Created a CloudFront cache invalidation. |
| CloudFront distribution was not available as a Route 53 Alias target | Learned the requirements for custom-domain configuration and ownership verification. |

## Key Learnings

Through this project, I gained practical experience in:

1. Hosting static websites using Amazon S3.
2. Configuring CloudFront distributions.
3. Securing private S3 origins using OAC.
4. Configuring IAM-style resource access through S3 bucket policies.
5. Enabling HTTPS delivery through CloudFront.
6. Understanding CDN caching and cache invalidation.
7. Learning DNS fundamentals using Amazon Route 53.
8. Troubleshooting website deployment and access issues.
9. Monitoring AWS resource costs using AWS Budgets.

## Cost Monitoring

Created an AWS monthly cost budget to monitor resource usage.

| Configuration | Value |
|---|---|
| Budget name | Portfolio-Monthly-Budget |
| Monthly budget | $1 USD |
| First alert | 80% |
| Second alert | 100% |
| Notification | Email |

This budget helps monitor AWS spending and provides alerts when the configured thresholds are reached. It does not automatically stop resources.

## Future Enhancements

- Purchase and configure a custom domain using Route 53.
- Configure an SSL/TLS certificate using AWS Certificate Manager (ACM) in `us-east-1` for CloudFront.
- Configure a custom domain and `www` subdomain.
- Implement CI/CD automation using GitHub Actions.
- Improve website monitoring and security.

## Conclusion

Successfully deployed a responsive static portfolio website using Amazon S3 and Amazon CloudFront.

Configured a private S3 bucket, Origin Access Control, bucket policy, HTTPS redirection, and CloudFront cache invalidation.

Also explored Amazon Route 53 DNS management and AWS cost monitoring.

This project provided practical knowledge of AWS storage, content delivery, security, DNS fundamentals, and cloud cost management.
