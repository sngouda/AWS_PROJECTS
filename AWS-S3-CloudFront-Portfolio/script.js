/**
 * Suhas Gowda | AWS DevOps Engineer Portfolio
 * Interactive Architecture Visualizer, DevOps Cloud Console,
 * Active Nav Underline Scroll Tracker, Section Reveal & Motion Physics
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Hero Word-By-Word Slide Down Entrance Animation (Landing)
  // ==========================================================================
  function initHeroWordSlideAnimation() {
    const title = document.getElementById('hero-title');
    if (!title) return;

    // Structured tokens guarantees zero-clipping and 100% visible gradient rendering
    const tokens = [
      { text: 'Architecting', gradient: false },
      { text: 'resilient', gradient: false },
      { text: 'AWS', gradient: true },
      { text: 'cloud', gradient: true },
      { text: 'systems', gradient: true },
      { text: '&', gradient: false },
      { text: 'automating', gradient: false },
      { text: 'reliable', gradient: true },
      { text: 'deployments.', gradient: true }
    ];

    title.innerHTML = '';
    tokens.forEach(function (token, idx) {
      const span = document.createElement('span');
      span.className = 'hero-word' + (token.gradient ? ' gradient-text' : '');
      span.style.setProperty('--w-delay', `${idx * 65 + 100}ms`);
      span.textContent = token.text;
      title.appendChild(span);

      if (idx < tokens.length - 1) {
        title.appendChild(document.createTextNode(' '));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroWordSlideAnimation);
  } else {
    initHeroWordSlideAnimation();
  }

  // ==========================================================================
  // 2. Active Section Navbar Indicator & Scroll Tracking
  // ==========================================================================
  function initNavScrollTracking() {
    const navMenu = document.getElementById('nav-menu');
    const indicator = document.getElementById('nav-indicator');
    const navLinks = document.querySelectorAll('.nav-link-item');
    if (!navMenu || !indicator || navLinks.length === 0) return;

    const sections = [
      document.getElementById('architecture'),
      document.getElementById('projects'),
      document.getElementById('terminal'),
      document.getElementById('skills'),
      document.getElementById('experience'),
      document.getElementById('certifications'),
      document.getElementById('contact')
    ].filter(Boolean);

    let activeLink = null;
    let isHovering = false;

    function moveIndicatorTo(link) {
      if (!link) {
        indicator.style.opacity = '0';
        return;
      }
      const left = link.offsetLeft;
      const width = link.offsetWidth;
      indicator.style.left = left + 'px';
      indicator.style.width = width + 'px';
      indicator.style.opacity = '1';
    }

    function checkActiveSection() {
      const scrollY = window.scrollY;
      const scrollThreshold = scrollY + 160;
      let currentSectionId = '';

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollThreshold) {
          currentSectionId = sec.getAttribute('id');
          break;
        }
      }

      navLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === '#' + currentSectionId && currentSectionId) {
          link.classList.add('active');
          activeLink = link;
        } else {
          link.classList.remove('active');
        }
      });

      if (!isHovering) {
        moveIndicatorTo(activeLink);
      }
    }

    // Scroll listener with throttle
    let scrollTimer = null;
    window.addEventListener('scroll', function () {
      if (!scrollTimer) {
        scrollTimer = setTimeout(function () {
          checkActiveSection();
          scrollTimer = null;
        }, 50);
      }
    }, { passive: true });

    // Hover interactions on nav links
    navLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        isHovering = true;
        moveIndicatorTo(this);
      });
    });

    navMenu.addEventListener('mouseleave', function () {
      isHovering = false;
      moveIndicatorTo(activeLink);
    });

    // Resize listener
    window.addEventListener('resize', function () {
      if (activeLink) moveIndicatorTo(activeLink);
    });

    // Initial positioning
    setTimeout(checkActiveSection, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavScrollTracking);
  } else {
    initNavScrollTracking();
  }

  // ==========================================================================
  // 3. Scroll-Driven Section Reveal Animations
  // ==========================================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback
      revealElements.forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }

  // ==========================================================================
  // 4. Interactive Cursor-Reactive Particle Network Engine
  // ==========================================================================
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let particles = [];
    const PARTICLE_COUNT = 75;
    const CONNECT_DIST = 95;
    const MOUSE_RADIUS = 150;

    const mouse = {
      x: -9999,
      y: -9999,
      isActive: false
    };

    const colors = [
      '#000000', // Pure Black
      '#0f172a', // Deep Slate
      '#1e293b', // Dark Charcoal
      '#334155'  // Neutral Slate
    ];

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = init ? Math.random() * width : (Math.random() < 0.5 ? 0 : width);
        this.y = init ? Math.random() * height : Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.radius = Math.random() * 1.5 + 1.2;
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.35 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;

        // Cursor Interaction
        if (mouse.isActive) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.85;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 2.2;
            this.y += Math.sin(angle) * force * 2.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.globalAlpha = this.alpha;
        ctx.shadowColor = this.baseColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    function initParticles() {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    });

    window.addEventListener('mouseleave', function () {
      mouse.isActive = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    window.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.isActive = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', function () {
      mouse.isActive = false;
    });

    // Shockwave pulse on click
    window.addEventListener('mousedown', function (e) {
      particles.forEach(function (p) {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (1 - dist / 180) * 12;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
        }
      });
    });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const lineAlpha = (1 - dist / CONNECT_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(15, 23, 42, ${lineAlpha * 0.16})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        if (mouse.isActive) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < MOUSE_RADIUS) {
            const beamAlpha = (1 - mdist / MOUSE_RADIUS) * 0.55;
            const grad = ctx.createLinearGradient(p1.x, p1.y, mouse.x, mouse.y);
            grad.addColorStop(0, `rgba(0, 0, 0, ${beamAlpha * 0.45})`);
            grad.addColorStop(1, `rgba(51, 65, 85, ${beamAlpha * 0.45})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    initParticles();
    requestAnimationFrame(animateParticles);
  }

  // ==========================================================================
  // 5. Architecture Topologies Data Store
  // ==========================================================================
  const ARCHITECTURES = {
    's3-cloudfront-oac': {
      title: 'AWS S3 + CloudFront Global CDN with Origin Access Control (OAC)',
      nodes: [
        {
          id: 'cf-visitor',
          type: 'Global Ingress',
          title: 'Website Visitors (Global)',
          subtitle: 'Sub-second HTTPS edge requests from anywhere in the world',
          meta: 'HTTPS (Port 443)',
          specs: {
            'Protocols': 'HTTPS / TLS 1.2+ (Enforced)',
            'Viewer Policy': 'Redirect HTTP to HTTPS',
            'Compression': 'Gzip / Brotli auto-compression',
            'Edge Route': 'Anycast DNS to nearest CloudFront PoP'
          },
          troubleshooting: 'Configured CloudFront viewer protocol policies so any unencrypted HTTP request on port 80 is immediately redirected via 301 to secure HTTPS.'
        },
        {
          id: 'cf-edge',
          type: 'Edge Delivery Network',
          title: 'Amazon CloudFront CDN',
          subtitle: 'Global Edge Distribution & Optimized Caching',
          meta: 'ID: EYVQNOGMMMDWK',
          specs: {
            'Distribution Domain': 'd20dw1jkxfe8yj.cloudfront.net',
            'Distribution ID': 'EYVQNOGMMMDWK',
            'Default Root Object': 'index.html',
            'Cache Policy': 'CachingOptimized (TTL 86400s)',
            'Status': 'Deployed & Globally Enabled'
          },
          troubleshooting: 'Diagnosed and fixed root path loading errors by setting default root object to index.html; verified edge cache hit ratio via CloudFront telemetry.'
        },
        {
          id: 'cf-oac',
          type: 'Zero-Trust Auth',
          title: 'Origin Access Control (OAC)',
          subtitle: 'Cryptographic SigV4 Request Signing between CDN & S3',
          meta: 'SigV4 Protocol',
          specs: {
            'Signing Protocol': 'AWS Signature Version 4 (SigV4)',
            'Signing Behavior': 'Sign requests on-the-fly',
            'Origin Type': 'Amazon S3 Bucket Origin',
            'Principal': 'cloudfront.amazonaws.com'
          },
          troubleshooting: 'Resolved 403 Access Denied errors by attaching modern OAC rather than legacy OAI, validating that request headers carry valid AWS SigV4 auth tokens.'
        },
        {
          id: 'cf-s3',
          type: 'Secure Storage Origin',
          title: 'Private Amazon S3 Bucket',
          subtitle: 'Zero Public Access Storage in Mumbai (ap-south-1)',
          meta: 'my-static-website-project-1231',
          specs: {
            'Bucket Name': 'my-static-website-project-1231',
            'Region': 'ap-south-1 (Mumbai)',
            'Block Public Access': 'All 4 settings strictly ENABLED',
            'Access Policy': 'Restricted to EYVQNOGMMMDWK ARN'
          },
          troubleshooting: 'Hardened bucket policy with aws:SourceArn condition matching only the CloudFront distribution ARN, completely preventing direct internet S3 reads.'
        },
        {
          id: 'cf-invalidation',
          type: 'CI/CD & DNS Management',
          title: 'Edge Invalidation & Route 53',
          subtitle: 'Automated Cache Flushing & DNS Zone Management',
          meta: 'Path: /* | Route 53',
          specs: {
            'Invalidation Path': '/* (All Edge PoPs)',
            'DNS Service': 'Amazon Route 53 Public Hosted Zone',
            'Cost Monitoring': 'AWS Budgets ($1/mo, 80% & 100% alerts)',
            'Deployment Test': 'Zero-stale instant edge refresh verified'
          },
          troubleshooting: 'Validated that modifying code in S3 immediately reflected globally after dispatching a /* cache invalidation, bypassing CDN edge TTL delay.'
        }
      ]
    },

    'alb-multiaz': {
      title: 'AWS Application Load Balancer with Dual EC2 Backend & Multi-AZ RDS',
      nodes: [
        {
          id: 'client',
          type: 'External Ingress',
          title: 'Internet Gateway',
          subtitle: 'Public HTTP/S traffic routing',
          meta: 'Port 80 / 443',
          specs: {
            'Ingress': '0.0.0.0/0 (Internet)',
            'Protocols': 'HTTP (80), HTTPS (443)',
            'VPC Routing': 'Internet Gateway (igw-09a8f)'
          },
          troubleshooting: 'Configured route tables and subnet associations to ensure clean packet flow from public subnets into the Application Load Balancer.'
        },
        {
          id: 'alb',
          type: 'Load Balancer',
          title: 'AWS Application Load Balancer',
          subtitle: 'Cross-Zone HTTP Traffic Balancing',
          meta: 'tg-python-backends',
          specs: {
            'Scheme': 'Internet-Facing',
            'Listener': 'HTTP:80 -> Forward to Target Group',
            'Health Path': '/health (Interval 30s)',
            'Algorithm': 'Round Robin with Target Health Tracking'
          },
          troubleshooting: 'Troubleshot HTTP 502 Bad Gateway responses by validating health check path response codes (HTTP 200) and opening backend security group ports.'
        },
        {
          id: 'ec2-a',
          type: 'Compute Node A',
          title: 'EC2 Instance 1 (AZ-1)',
          subtitle: 'Python Web Server on Ubuntu',
          meta: 'ap-south-1a (10.0.1.42)',
          specs: {
            'OS': 'Ubuntu 24.04 LTS',
            'Security Group': 'sg-ec2-backend (Ingress from ALB only)',
            'Application': 'Python Gunicorn Server',
            'Target Status': 'Healthy (200 OK)'
          },
          troubleshooting: 'Target groups verified using continuous curl loops to validate equal request distribution across both availability zones.'
        },
        {
          id: 'ec2-b',
          type: 'Compute Node B',
          title: 'EC2 Instance 2 (AZ-2)',
          subtitle: 'Python Web Server on Ubuntu',
          meta: 'ap-south-1b (10.0.2.89)',
          specs: {
            'OS': 'Ubuntu 24.04 LTS',
            'Security Group': 'sg-ec2-backend (Ingress from ALB only)',
            'Application': 'Python Gunicorn Server',
            'Target Status': 'Healthy (200 OK)'
          },
          troubleshooting: 'Multi-AZ compute resilience ensures zero downtime even if one Availability Zone experiences infrastructure maintenance.'
        },
        {
          id: 'rds',
          type: 'Database Engine',
          title: 'AWS RDS MySQL (Multi-AZ)',
          subtitle: 'Synchronous Standby Replication',
          meta: 'Port 3306 (Private)',
          specs: {
            'Engine': 'MySQL 8.0 Community',
            'Deployment': 'Multi-AZ (Primary: 1a, Standby: 1b)',
            'Storage': 'General Purpose SSD (gp3)',
            'Security Group': 'sg-rds (Allow Port 3306 ONLY from sg-ec2-backend)'
          },
          troubleshooting: 'Database endpoints were isolated in private DB subnet groups, completely blocked from public IP access to satisfy zero-trust security standards.'
        }
      ]
    },

    'docker-reverse-proxy': {
      title: 'Dockerized Multi-Tier Monitoring API with Nginx Reverse Proxy',
      nodes: [
        {
          id: 'proxy-client',
          type: 'Client Gateway',
          title: 'Host Ingress',
          subtitle: 'EC2 Host Port Mapping',
          meta: 'Host: 80 / 443',
          specs: {
            'Host IP': 'Public EC2 Elastic IP',
            'Firewall': 'AWS Security Group (Port 80/443)',
            'Host OS': 'Ubuntu Linux 24.04 LTS'
          },
          troubleshooting: 'Mapped standard public ports to internal Nginx container while keeping internal microservice ports shielded.'
        },
        {
          id: 'nginx',
          type: 'Reverse Proxy',
          title: 'Nginx Container',
          subtitle: 'Reverse Proxy & Header Forwarding',
          meta: 'bridge-frontend',
          specs: {
            'Image': 'nginx:alpine-slim',
            'Proxy Pass': 'http://flask-api:5000',
            'Buffers': 'proxy_buffer_size 128k',
            'Headers': 'X-Real-IP, X-Forwarded-For'
          },
          troubleshooting: 'Fixed 502 Bad Gateway proxy errors by ensuring upstream hostname DNS resolution matched Docker service names.'
        },
        {
          id: 'flask-api',
          type: 'App Container',
          title: 'Flask REST API',
          subtitle: 'Python 3 Containerized Backend',
          meta: 'Internal Port 5000',
          specs: {
            'Image': 'python:3.11-slim',
            'Networks': 'bridge-frontend & bridge-backend',
            'Environment': 'ENV loaded from .env config file',
            'Restart Policy': 'unless-stopped'
          },
          troubleshooting: 'Implemented dual network bridging so Flask API connects both to public-facing Nginx and private MySQL without exposing the database.'
        },
        {
          id: 'mysql-container',
          type: 'Data Store',
          title: 'MySQL Container',
          subtitle: 'Named Persistent Docker Volume',
          meta: 'bridge-backend (Port 3306)',
          specs: {
            'Image': 'mysql:8.0',
            'Volume': 'mysql_data:/var/lib/mysql',
            'Persistence': 'Zero-loss container recreate lifecycle',
            'Network': 'bridge-backend (Isolated from external traffic)'
          },
          troubleshooting: 'Configured named volumes and health check wait conditions to prevent the API container from crashing during initial DB boot.'
        }
      ]
    },

    'campuscare-gitops': {
      title: 'Campus Care — Production Cloud Architecture & CI/CD Pipeline',
      nodes: [
        {
          id: 'git-repo',
          type: 'Version Control',
          title: 'Git & GitHub Repository',
          subtitle: 'Continuous Deployment Source',
          meta: 'Branch: main',
          specs: {
            'VCS': 'Git & GitHub',
            'Auto Deploy': 'Webhook trigger on push to main',
            'Codebase': 'Java Servlets, HTML5, CSS3, JS'
          },
          troubleshooting: 'Set up strict Git commit workflows and branch protection to automate zero-downtime deployment triggers.'
        },
        {
          id: 'render-runtime',
          type: 'Application Host',
          title: 'Render Docker Runtime',
          subtitle: 'Apache Tomcat 10 Container',
          meta: 'Live in Production',
          specs: {
            'Runtime': 'Docker (Tomcat 10 / OpenJDK 17)',
            'Artifact': 'WAR Application Deployment',
            'Auto-Healing': 'Automatic health restart upon failure',
            'URL': 'campuscomplaints.onrender.com'
          },
          troubleshooting: 'Engineered specialized servlet session invalidation for clean student and admin logout routines.'
        },
        {
          id: 'aiven-mysql',
          type: 'Cloud Database',
          title: 'Aiven Cloud MySQL',
          subtitle: 'Managed High-Availability Database',
          meta: 'SSL Encrypted (ca.pem)',
          specs: {
            'Platform': 'Aiven Managed Cloud Services',
            'Database': 'MySQL 8.0 Cloud Instance',
            'Migration': 'Transferred from local WAMP environment',
            'Backup': 'Automated Point-in-Time Recovery'
          },
          troubleshooting: 'Structured database schema with Chen notation ERDs and normalized tables to handle student complaint ticketing.'
        },
        {
          id: 'brevo-api',
          type: 'Notification Service',
          title: 'Brevo Email Gateway',
          subtitle: 'Automated Ticket Notifications',
          meta: 'RESTful Email API',
          specs: {
            'Service': 'Brevo (Sendinblue) Transactional API',
            'Trigger': 'Complaint status changes & registrations',
            'Format': 'HTML alert email notifications'
          },
          troubleshooting: 'Integrated REST API calls within Java servlets to send real-time confirmation emails upon complaint submission.'
        }
      ]
    }
  };

  // ==========================================================================
  // 6. Architecture Carousel Visualizer Engine
  // ==========================================================================
  let currentArchKey = 's3-cloudfront-oac';
  let selectedNodeIndex = 1;
  let slideDirection = 'next';
  let carouselAutoTimer = null;
  let isAutoPlayActive = true;

  const archCanvas = document.getElementById('arch-canvas');
  const tabs = document.querySelectorAll('.arch-tab');

  function renderArchitecture(archKey) {
    if (!archCanvas) return;
    const arch = ARCHITECTURES[archKey];
    if (!arch) return;

    if (selectedNodeIndex >= arch.nodes.length) {
      selectedNodeIndex = 0;
    } else if (selectedNodeIndex < 0) {
      selectedNodeIndex = arch.nodes.length - 1;
    }

    const selectedNode = arch.nodes[selectedNodeIndex];

    // 1. Build Clickable Stage Stepper Pills
    let pillsHtml = '';
    arch.nodes.forEach(function (node, idx) {
      const isActive = idx === selectedNodeIndex;
      pillsHtml += `
        <button class="carousel-pill ${isActive ? 'active' : ''}" data-stage-idx="${idx}" type="button" aria-pressed="${isActive}">
          <span class="pill-num">${idx + 1}</span>
          <span class="pill-label">${node.title}</span>
        </button>
      `;
    });

    // 2. Build Specifications Grid HTML
    let specsRowsHtml = '';
    for (const [key, val] of Object.entries(selectedNode.specs)) {
      specsRowsHtml += `
        <div class="carousel-spec-item">
          <span class="spec-label">${key}</span>
          <span class="spec-value">${val}</span>
        </div>
      `;
    }

    // 3. Build Mini-Pipeline Interactive Nodes HTML
    let minirailHtml = '';
    arch.nodes.forEach(function (node, idx) {
      const isCurrent = idx === selectedNodeIndex;
      const isPast = idx < selectedNodeIndex;
      minirailHtml += `
        <button class="rail-node ${isCurrent ? 'active' : ''} ${isPast ? 'completed' : ''}" data-rail-idx="${idx}" type="button" title="${node.title}">
          <span class="rail-dot"></span>
          <span class="rail-text">${node.title}</span>
        </button>
      `;
      if (idx < arch.nodes.length - 1) {
        minirailHtml += `<span class="rail-arrow" aria-hidden="true">→</span>`;
      }
    });

    // 4. Construct Complete Carousel DOM
    const animClass = slideDirection === 'next' ? 'slide-from-right' : 'slide-from-left';

    archCanvas.innerHTML = `
      <div class="arch-carousel-wrap">
        <!-- Carousel Controls & Stepper Header -->
        <div class="arch-carousel-header">
          <div class="carousel-meta-block">
            <span class="carousel-step-counter">STAGE 0${selectedNodeIndex + 1} OF 0${arch.nodes.length}</span>
            <span class="carousel-system-title">${arch.title}</span>
          </div>

          <div class="carousel-nav-actions">
            <button class="btn-carousel-nav" id="btn-carousel-prev" type="button" aria-label="Previous Architecture Stage">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              <span>Previous</span>
            </button>
            <button class="btn-carousel-nav primary" id="btn-carousel-next" type="button" aria-label="Next Architecture Stage">
              <span>Next Stage</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        <!-- Interactive Stage Pills -->
        <div class="carousel-pills-bar">
          ${pillsHtml}
        </div>

        <!-- Active Carousel Showcase Card (The Slide) -->
        <div class="arch-carousel-card ${animClass}" id="arch-slide-card">
          <div class="slide-card-topbar">
            <div class="slide-tag-group">
              <span class="slide-type-badge">${selectedNode.type}</span>
              <span class="slide-status-healthy">
                <span class="pulse-green"></span> Live Operational Target
              </span>
            </div>
            <div class="slide-endpoint-meta">${selectedNode.meta}</div>
          </div>

          <div class="slide-card-content">
            <!-- Left Column: Stage Details & Matched Alert Callout -->
            <div class="slide-info-col">
              <h3 class="slide-main-title">${selectedNode.title}</h3>
              <p class="slide-lead-desc">${selectedNode.subtitle}</p>

              <!-- Color-Harmonized Alert Box -->
              <div class="arch-harmonized-alert">
                <div class="alert-topbar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>DEV-OPS ROOT CAUSE ANALYSIS & RESOLUTION</span>
                </div>
                <div class="alert-content-text">
                  ${selectedNode.troubleshooting}
                </div>
              </div>
            </div>

            <!-- Right Column: Live Infrastructure Specifications -->
            <div class="slide-specs-col">
              <div class="specs-col-header">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
                <span>CONFIGURATION & TELEMETRY</span>
              </div>
              <div class="specs-data-grid">
                ${specsRowsHtml}
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom End-to-End Architecture Flow Rail -->
        <div class="arch-rail-container">
          <div class="rail-header-label">END-TO-END TRAFFIC FLOW (CLICK TO JUMP):</div>
          <div class="arch-flow-rail">
            ${minirailHtml}
          </div>
        </div>
      </div>
    `;

    // Attach Event Listeners
    const prevBtn = document.getElementById('btn-carousel-prev');
    const nextBtn = document.getElementById('btn-carousel-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        slideDirection = 'prev';
        selectedNodeIndex = (selectedNodeIndex - 1 + arch.nodes.length) % arch.nodes.length;
        renderArchitecture(currentArchKey);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        slideDirection = 'next';
        selectedNodeIndex = (selectedNodeIndex + 1) % arch.nodes.length;
        renderArchitecture(currentArchKey);
      });
    }

    // Stage Pills Click
    const pillButtons = archCanvas.querySelectorAll('.carousel-pill');
    pillButtons.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const targetIdx = parseInt(this.getAttribute('data-stage-idx'), 10);
        slideDirection = targetIdx >= selectedNodeIndex ? 'next' : 'prev';
        selectedNodeIndex = targetIdx;
        renderArchitecture(currentArchKey);
      });
    });

    // Flow Rail Nodes Click
    const railNodes = archCanvas.querySelectorAll('.rail-node');
    railNodes.forEach(function (rNode) {
      rNode.addEventListener('click', function () {
        const targetIdx = parseInt(this.getAttribute('data-rail-idx'), 10);
        slideDirection = targetIdx >= selectedNodeIndex ? 'next' : 'prev';
        selectedNodeIndex = targetIdx;
        renderArchitecture(currentArchKey);
      });
    });
  }

  // Handle Architecture System Tabs Switch
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      currentArchKey = this.getAttribute('data-arch');
      selectedNodeIndex = 0;
      slideDirection = 'next';
      renderArchitecture(currentArchKey);
    });
  });

  // Auto-advance Carousel every 5 seconds (pauses on hover)
  function startAutoAdvance() {
    stopAutoAdvance();
    carouselAutoTimer = setInterval(function () {
      if (!isAutoPlayActive) return;
      const arch = ARCHITECTURES[currentArchKey];
      if (!arch) return;
      slideDirection = 'next';
      selectedNodeIndex = (selectedNodeIndex + 1) % arch.nodes.length;
      renderArchitecture(currentArchKey);
    }, 5500);
  }

  function stopAutoAdvance() {
    if (carouselAutoTimer) {
      clearInterval(carouselAutoTimer);
      carouselAutoTimer = null;
    }
  }

  if (archCanvas) {
    archCanvas.addEventListener('mouseenter', function () {
      isAutoPlayActive = false;
    });
    archCanvas.addEventListener('mouseleave', function () {
      isAutoPlayActive = true;
    });
  }

  renderArchitecture(currentArchKey);
  startAutoAdvance();

  // ==========================================================================
  // 7. Interactive DevOps Terminal Console Simulator
  // ==========================================================================
  const terminalBody = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const terminalSubmit = document.getElementById('terminal-submit');
  const chips = document.querySelectorAll('.terminal-chip');

  const COMMANDS = {
    'help': `Available DevOps commands:
  • aws cloudfront              : Inspect CloudFront distribution, origin (OAC) & CDN status
  • aws s3 ls                   : List files in private portfolio S3 bucket (ap-south-1)
  • aws ec2 describe-instances  : Inspect running EC2 instances & availability zones
  • docker ps                   : List active Docker containers, images & ports
  • cat skills.sh               : Output exported DevOps & Cloud skill environment
  • status                      : Show infrastructure health, AWS region & uptime
  • projects                    : Summary of engineered cloud architectures
  • exp                         : Review industry experience & Cravita internship
  • certs                       : Display Escbash Labs certifications & degree
  • contact                     : Print direct contact communication details
  • clear                       : Reset console screen`,

    'aws cloudfront': `{
  "Distribution": {
    "Id": "EYVQNOGMMMDWK",
    "DomainName": "d20dw1jkxfe8yj.cloudfront.net",
    "Status": "Deployed",
    "Enabled": true,
    "Origins": [
      {
        "Id": "my-static-website-project-1231.s3.ap-south-1.amazonaws.com",
        "DomainName": "my-static-website-project-1231.s3.ap-south-1.amazonaws.com",
        "OriginAccessControlId": "E3VQNOG12345OAC",
        "S3OriginConfig": { "OriginAccessIdentity": "" }
      }
    ],
    "DefaultCacheBehavior": {
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6 (CachingOptimized)",
      "AllowedMethods": ["GET", "HEAD"]
    },
    "DefaultRootObject": "index.html",
    "HttpVersion": "http2and3"
  }
}`,

    'aws s3 ls': `2026-11-05 18:22:10 s3://my-static-website-project-1231 (Region: ap-south-1)
  ↳ index.html  (42.6 KB) - Content-Type: text/html
  ↳ style.css   (43.0 KB) - Content-Type: text/css
  ↳ script.js   (38.1 KB) - Content-Type: application/javascript
[Security Status] Block Public Access: All 4 settings ENABLED. Read access granted to CloudFront OAC only.`,

    'aws ec2 describe-instances': `{
  "Reservations": [
    {
      "Instances": [
        {
          "InstanceId": "i-07f9b8c12a4d",
          "InstanceType": "t3.micro",
          "State": { "Name": "running", "Code": 16 },
          "PublicIpAddress": "13.233.104.55",
          "PrivateIpAddress": "10.0.1.42",
          "AvailabilityZone": "ap-south-1a",
          "SecurityGroups": [{ "GroupName": "sg-ec2-backend", "GroupId": "sg-01ab9" }],
          "Tags": [{ "Key": "Name", "Value": "prod-web-server-1" }]
        },
        {
          "InstanceId": "i-09d4e5f67b8c",
          "InstanceType": "t3.micro",
          "State": { "Name": "running", "Code": 16 },
          "PublicIpAddress": "13.233.104.92",
          "PrivateIpAddress": "10.0.2.89",
          "AvailabilityZone": "ap-south-1b",
          "SecurityGroups": [{ "GroupName": "sg-ec2-backend", "GroupId": "sg-01ab9" }],
          "Tags": [{ "Key": "Name", "Value": "prod-web-server-2" }]
        }
      ]
    }
  ]
}`,

    'docker ps': `CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS          PORTS                  NAMES
c48a719d0e21   nginx:alpine-slim     "/docker-entrypoint.…"   2 days ago     Up 2 days       0.0.0.0:80->80/tcp     nginx_proxy
e91b5c82a174   flask-api:latest      "gunicorn --bind 0.0…"   2 days ago     Up 2 days       5000/tcp               monitoring_api
a72d3f910b83   mysql:8.0             "docker-entrypoint.s…"   2 days ago     Up 2 days       3306/tcp               mysql_persistent`,

    'cat skills.sh': `#!/usr/bin/env bash
# Suhas Gowda - Environment Variables
export CLOUD_PROVIDER="AWS (EC2, VPC, ALB, RDS Multi-AZ, S3, IAM, CloudWatch)"
export OS_ENVIRONMENT="Ubuntu Linux (Permissions, Process Mgmt, Systemd, SSH)"
export CONTAINERS="Docker, Docker Compose, Multi-tier Networking, Named Volumes"
export AUTOMATION="Bash Scripting, Cron Daemons, Python, Jenkins on EC2"
export NETWORKING="TCP/IP, Security Groups, NACLs, Reverse Proxy, Route53"
export EDUCATION="BCA - Mangalore University (CGPA 8.74 / 10.0)"
echo "DevOps environment loaded successfully."`,

    'status': `[INFRASTRUCTURE TELEMETRY REPORT]
● Edge CDN        : Amazon CloudFront (Distribution: EYVQNOGMMMDWK)
● CloudFront URL  : https://d20dw1jkxfe8yj.cloudfront.net/ (Live & Active)
● S3 Origin       : my-static-website-project-1231 (ap-south-1, OAC SigV4 Secured)
● Compute Cluster : tg-python-backends (2/2 EC2 Instances Healthy)
● Database        : AWS RDS Multi-AZ (Active Synced Replication)
● Uptime          : 99.999%
● Engineer Status : Actively seeking AWS DevOps / Cloud Engineering roles`,

    'projects': `PROJECT PORTFOLIO SUMMARY:
1. AWS S3 + CloudFront Static Portfolio (Origin Access Control, HTTPS, Global CDN Edge)
   ↳ Live: https://d20dw1jkxfe8yj.cloudfront.net/
   ↳ Code: https://github.com/sngouda/AWS_PROJECTS/tree/main/AWS-S3-CloudFront-Portfolio
2. AWS Load Balancer with Dual EC2 & Multi-AZ RDS (High Availability & Traffic Routing)
3. Dockerized Monitoring API (Nginx Reverse Proxy, Network Segmentation, Persistent Storage)
4. Campus Care (Live production complaint system on Render + Aiven Cloud MySQL + Brevo API)`,

    'exp': `PROFESSIONAL TRACK RECORD:
● DevOps Intern @ Cravita Technologies (Aug 2026 - Present | Bangalore)
  - Linux admin, Bash scripts, AWS EC2/VPC/Security Groups/NACLs, Docker & Jenkins.
● Junior Java Developer Intern @ System Tron (Sep 2025 - Oct 2025 | Remote)
  - Java OOP programming, application structuring, and problem-solving.`,

    'certs': `VERIFIED CREDENTIALS:
1. Linux Skill Certificate - Escbash Labs (22 topics, 41 labs, 21 scenarios + capstone)
2. Networking Skill Certificate - Escbash Labs (32 topics, 121 labs, 11 scenarios + capstone)
3. Digital Skills 101 - Core IT, hardware, networks, cybersecurity
4. Deloitte Australia Cyber Job Simulation - SQL, Python, Excel analysis
5. BCA Degree - MGM College Udupi / Mangalore University (CGPA: 8.74/10.0)`,

    'contact': `COMMUNICATION CHANNELS:
● Email    : suhasgowda636227@gmail.com
● Phone    : +91 6362274523
● Location : Sirsi, Karnataka, India
● GitHub   : https://github.com/sngouda
● LinkedIn : https://www.linkedin.com/in/suhasgowda1866`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const echoLine = document.createElement('div');
    echoLine.className = 'terminal-line';
    echoLine.innerHTML = `<span class="prompt-user">suhas@aws-bastion</span>:<span class="prompt-path">~</span>$ <span class="cmd-run">${escapeHtml(rawCmd)}</span>`;
    terminalBody.appendChild(echoLine);

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    const response = document.createElement('div');
    response.className = 'terminal-response';

    if (COMMANDS[cmd]) {
      response.textContent = COMMANDS[cmd];
    } else if (cmd.includes('cloudfront')) {
      response.textContent = COMMANDS['aws cloudfront'];
    } else if (cmd.includes('s3')) {
      response.textContent = COMMANDS['aws s3 ls'];
    } else if (cmd.startsWith('aws ec2') || cmd === 'aws') {
      response.textContent = COMMANDS['aws ec2 describe-instances'];
    } else if (cmd.startsWith('docker')) {
      response.textContent = COMMANDS['docker ps'];
    } else if (cmd.includes('skill')) {
      response.textContent = COMMANDS['cat skills.sh'];
    } else if (cmd.includes('whoami')) {
      response.textContent = 'Suhas Gowda | AWS DevOps Engineer (CGPA 8.74)';
    } else {
      response.innerHTML = `<span style="color:#ef4444;">bash: ${escapeHtml(rawCmd)}: command not found.</span> Type <span class="gradient-text">'help'</span> for available commands.`;
    }

    terminalBody.appendChild(response);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (terminalSubmit && terminalInput) {
    terminalSubmit.addEventListener('click', function () {
      executeCommand(terminalInput.value);
      terminalInput.value = '';
    });

    terminalInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
        terminalInput.value = '';
      }
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const cmd = this.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  // ==========================================================================
  // 8. One-Click Copy Actions
  // ==========================================================================
  const copyBtn = document.getElementById('btn-copy-email');
  const copyText = document.getElementById('copy-email-text');
  const emailVal = 'suhasgowda636227@gmail.com';

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailVal).then(function () {
          copyText.textContent = 'Copied!';
          copyBtn.style.background = 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)';
          copyBtn.style.color = '#ffffff';
          setTimeout(function () {
            copyText.textContent = 'Copy';
            copyBtn.style.background = '';
            copyBtn.style.color = '';
          }, 2000);
        });
      } else {
        copyText.textContent = 'Copied!';
        setTimeout(function () { copyText.textContent = 'Copy'; }, 2000);
      }
    });
  }

  // ==========================================================================
  // 9. Mobile Menu Toggle
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    });
  }

})();
