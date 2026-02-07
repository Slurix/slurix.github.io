# Chemical Engineer Portfolio Website

A professional portfolio website showcasing advanced process control expertise in the pulp and paper industry.

## 🚀 Quick Start - GitHub Pages Setup

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right and select **"New repository"**
3. Name your repository: `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - **Important**: The repository name must be exactly `yourusername.github.io` for GitHub Pages to work
4. Set the repository to **Public**
5. Click **"Create repository"**

### Step 2: Upload Your Website Files

You have two options:

#### Option A: Upload via GitHub Web Interface
1. In your new repository, click **"uploading an existing file"**
2. Drag and drop these files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Click **"Commit changes"**

#### Option B: Use Git Command Line
```bash
# Navigate to your website folder
cd /path/to/your/website

# Initialize git
git init

# Add all files
git add index.html style.css script.js README.md

# Commit
git commit -m "Initial commit: Portfolio website"

# Add remote (replace yourusername)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**

### Step 4: Access Your Website

After a few minutes, your website will be live at:
```
https://yourusername.github.io
```

## 📝 Customization Guide

### Update Personal Information

1. **index.html** - Replace these placeholders:
   - Update your name in the hero section
   - `your.email@example.com` → Your email
   - `yourusername` → Your GitHub username
   - `linkedin.com/in/yourprofile` → Your LinkedIn URL
   - Years of experience, stats, and metrics
   - Company names in experience section

2. **Project Links** - Update GitHub repository URLs:
   ```html
   https://github.com/yourusername/project-name
   ```

3. **Publications** - Add your actual publications and dates

4. **About Section** - Customize your bio and credentials

### Change Colors & Design

Edit the `:root` variables in `style.css`:

```css
:root {
    --color-primary: #2a5a3a;        /* Main green color */
    --color-accent: #e8a03a;         /* Orange accent */
    --color-bg-dark: #0d1b2a;        /* Dark background */
    /* ... more colors */
}
```

### Add Your Photo

Replace the placeholder SVG in the About section:

```html
<div class="about-image">
    <img src="your-photo.jpg" alt="Your Name">
</div>
```

Upload `your-photo.jpg` to your repository.

## 🔧 Advanced Features

### Add a Contact Form

The contact form is currently set to show an alert. To make it functional:

1. **Use FormSpree** (easiest):
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

2. **Use EmailJS**:
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Add their JavaScript library
   - Configure email template

### Add Google Analytics

Add before closing `</head>` tag in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Domain

To use a custom domain (e.g., `www.yourname.com`):

1. Buy a domain from a registrar
2. Add a `CNAME` file to your repository with your domain:
   ```
   www.yourname.com
   ```
3. Configure DNS settings with your domain provider
4. In GitHub Settings → Pages, add your custom domain

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🎨 Design Features

- **Industrial/Technical Aesthetic**: Dark theme with green and orange accents
- **Smooth Animations**: Fade-ins, scroll effects, and transitions
- **Interactive Elements**: Hover effects, progress bars, and dynamic stats
- **Modern Typography**: DM Serif Display, Syne, and IBM Plex Mono fonts
- **Animated Gradient Background**: Subtle movement for visual interest

## 📄 File Structure

```
yourusername.github.io/
│
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🐛 Troubleshooting

### Website Not Showing
- Wait 5-10 minutes after enabling GitHub Pages
- Check that repository name is exactly `yourusername.github.io`
- Ensure repository is set to Public
- Check that files are in the root directory

### CSS/JS Not Loading
- Make sure file names are exactly: `style.css` and `script.js`
- Check for typos in `<link>` and `<script>` tags
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

---

**Made for Chemical Engineers in Process Control**
