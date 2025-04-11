# **App Name**: AuraSec Portfolio

## Core Features:

- Hero Section: Display a landing page with a hacker-themed intro animation. Include rotating hacker quotes using a terminal-style typewriter effect.
- Social Links: Display social links (LinkedIn, GitHub) with glowing icons and glitch hover effects.
- Certificates Display: Display certificates as glowing cards with smooth animations, fetched from LinkedIn or manually uploaded.
- Skills Showcase: Show an animated list of cybersecurity skills with logos and hover glow/stacking aura effects.
- Easter Egg Terminal: Implement a hidden '/terminal' route with a 'Hackertyper' effect as an easter egg.

## Style Guidelines:

- Primary color: Dark background (#121212) to enhance the mysterious vibe.
- Secondary color: Neon Blue (#00FFFF) or Purple (#800080) for highlights and interactive elements.
- Accent: Electric Green (#00FF00) for terminal-style text and active states.
- Glitchy text effects for titles and key information to create a cyberpunk feel.
- Glowing icons for social links and skills to add a futuristic touch.
- Smooth, subtle animations using Framer Motion for transitions and hover effects.
- Full-screen layout with clear sections, ensuring responsiveness and easy navigation.

## Original User Request:
**Objective**:  
Create a **personal portfolio website** that radiates **infinite aura** and reflects the **underground hacker/cybersecurity vibe**, designed for **Thomas Shelby**, a **2nd-year cybersecurity student at Milton University**. The UI/UX should feel **smooth, mysterious, elite, and animated**, similar to a high-tech hacking terminal meets modern web elegance.

---

### 💡 Project Requirements

#### 🌐 General Theme
- Hacker/cyberpunk-inspired dark theme (like **Green on Black**, **Neon Blue/Purple**, **Glitchy Text**, **Matrix Vibes**)
- Aura: Use **Framer Motion**, **GSAP**, **Particles.js**, or **Three.js** to add aura-rich effects
- Cursor effects (glow, pulse, trace)
- Neon-style borders and glitch effects
- Responsive and mobile-optimized

---

### 🧠 Tech Stack

- **Frontend**: Next.js (for best performance and routing)  
- **UI Library**: Tailwind CSS + Shadcn/UI for clean and consistent components  
- **Animation**: Framer Motion, GSAP, Three.js or Particles.js  
- **Backend**: Node.js + Express / Next.js API routes  
- **Database**: MongoDB (easily scalable, perfect for certificates & uploads)  
- **Storage**: Cloudinary or Firebase Storage (for certificate images)  
- **Auth/Admin Panel**: Simple JWT Auth or NextAuth for admin access  

---

### 📄 Sections of Website

1. **👤 Hero Section**
   - Hacker-themed intro animation (code lines, digital rain, etc.)
   - "Thomas Shelby – Cybersecurity Student | Milton University | 2nd Year"
   - Profile image in circular glowing border (with neon pulse)
   - Hacker quotes rotating in terminal-style typewriter effect

2. **🔗 Social Links**
   - LinkedIn and GitHub with glowing icons  
   - Hover animation with glitch effects

3. **📜 Certificates**
   - Admin Panel to:
     - Upload via **LinkedIn Credential URL** (fetch title & image preview)
     - Or manually upload:
       - Title
       - Issued month & year
       - Certificate image
   - Display as **glowing cards** with smooth animations

4. **🛠️ Skills**
   - Animated list of cybersecurity tools, languages, and techniques
   - Add **logos with hover glow** and **stacking aura on hover**

5. **🖼️ Gallery or Achievements (Optional)**
   - Terminal-style pop-ups or glitch-in cards showing events, CTFs, etc.

---

### 🔒 Admin Panel Features

- Secure login for admin (Thomas)
- Add/edit/delete certificates
- Upload profile photo
- Optionally change tagline, quotes, and social links from admin

---

### 🧪 Optional Enhancements

- **Matrix-style background** using canvas/Three.js
- **Typing effect** for text (use `react-type-animation`)
- **3D profile cube** rotating with aura
- **Hackertyper effect** on hidden route (`/terminal` easter egg)
  