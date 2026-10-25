import { HowToGuide, GuideCategory } from '../types/guide';

export const GUIDE_CATEGORIES: { id: GuideCategory; label: string; description: string }[] = [
  {
    id: 'website-app-development',
    label: 'Website & App Development',
    description: 'Build responsive web apps, landing pages, and interactive digital products using modern AI scaffolding tools.',
  },
  {
    id: 'ai-image-generation',
    label: 'AI Image Generation',
    description: 'Create photorealistic art, brand assets, product mockups, and UI graphics with state-of-the-art diffusion models.',
  },
  {
    id: 'ai-video-generation',
    label: 'AI Video Generation',
    description: 'Produce cinematic video sequences, commercial clips, visual effects, and animated stories with camera control.',
  },
  {
    id: 'coding',
    label: 'Coding & Dev',
    description: 'Accelerate engineering workflows, refactor legacy codebases, write unit tests, and debug faster with AI code editors.',
  },
  {
    id: 'writing',
    label: 'Writing & Copy',
    description: 'Draft technical documentation, high-converting copy, essays, and reports with deep editorial refinement.',
  },
  {
    id: 'presentations',
    label: 'Presentations & Slides',
    description: 'Generate polished pitch decks, keynote presentations, and structured visual briefs in minutes.',
  },
  {
    id: 'voice-audio',
    label: 'Voice & Audio',
    description: 'Synthesize expressive human speech, clone voices, separate vocal stems, and produce professional audio tracks.',
  },
  {
    id: 'productivity',
    label: 'Productivity & Hosting',
    description: 'Automate daily workflows, free deployment pipelines, cloud hosting, and knowledge management.',
  },
  {
    id: 'education',
    label: 'Education & Learning',
    description: 'Personalized tutoring, STEM problem solving, flashcard generation, and concept breakdown for students and teachers.',
  },
  {
    id: 'marketing',
    label: 'Marketing & SEO',
    description: 'Formulate SEO content strategies, social media campaigns, ad copy variations, and market research.',
  },
  {
    id: 'business-research',
    label: 'Business & Research',
    description: 'Synthesize academic literature, financial statements, competitive intelligence, and automated data analysis.',
  },
];

export const HOW_TO_GUIDES: HowToGuide[] = [
  // 1. Google AI Studio
  {
    slug: 'building-website-google-ai-studio',
    title: 'Building a Full-Stack Web App with Google AI Studio',
    task: 'Create, test, and deploy a responsive web application from concept to running code using Google AI Studio and Gemini models.',
    category: 'website-app-development',
    difficulty: 'Beginner',
    estimatedDuration: '15 mins',
    pricingStatus: '100% Free Tier Available',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://aistudio.google.com',
    officialDocumentationUrl: 'https://ai.google.dev/docs',
    primaryToolId: 'google-ai-studio',
    primaryToolName: 'Google AI Studio',
    relatedToolIds: ['cursor', 'v0-by-vercel', 'bolt-new'],
    relatedGuideSlugs: ['publishing-website-free-first-hosting', 'building-react-app-ai-coding-assistant'],
    tags: ['web-development', 'google', 'gemini', 'prototyping', 'react', 'api'],
    prerequisites: [
      {
        label: 'Google Account',
        isPaid: false,
        status: 'free',
        description: 'A standard personal or Google Workspace account to log in to Google AI Studio.',
      },
      {
        label: 'Modern Web Browser',
        isPaid: false,
        status: 'free',
        description: 'Chrome, Safari, Firefox, or Edge with JavaScript enabled.',
      },
      {
        label: 'Gemini API Key (Optional)',
        isPaid: false,
        status: 'free',
        description: 'Free tier API key available directly inside AI Studio with generous rate limits for development.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Open Google AI Studio & Create a New Chat Prompt',
        instructions:
          'Navigate to https://aistudio.google.com in your browser. Click the "Sign in with Google" button if prompted. In the left navigation panel, click the blue "+ Create New Prompt" button and select "Chat Prompt" to start an interactive development session.',
        expectedResult: 'You will see a fresh canvas with a "System Instructions" box on the left and a prompt input field at the bottom.',
        troubleshootingAdvice: 'If the interface fails to load, ensure third-party cookies or enterprise restrictions on Google Cloud APIs are not blocked by browser extensions.',
        actionUrl: {
          url: 'https://aistudio.google.com',
          label: 'Open Google AI Studio',
        },
      },
      {
        stepNumber: 2,
        title: 'Select Model & Configure System Instructions',
        instructions:
          'In the right-hand panel, open the Model dropdown and select "Gemini 2.5 Flash" or "Gemini 1.5 Pro". Under the "System Instructions" field, paste guidelines instructing Gemini to act as a senior web engineer who outputs modular, modern TypeScript React components with Tailwind CSS.',
        codePrompt: {
          label: 'System Instructions to paste into AI Studio:',
          type: 'prompt',
          prompt: `You are an elite senior frontend software engineer. 
When asked to build web applications:
1. Provide complete, fully functional React components with TypeScript and Tailwind CSS.
2. Structure UI with responsive layout (mobile, tablet, desktop).
3. Include realistic mock data, interactive state handling, and accessible ARIA attributes.
4. Never truncate code with placeholders like '// ... rest of code'. Write pristine, copy-paste ready blocks.`,
        },
        expectedResult: 'The model configuration is set and the system instructions badge turns active.',
      },
      {
        stepNumber: 3,
        title: 'Submit the Web App Specification Prompt',
        instructions:
          'In the user message box, describe the exact application you want to build. Be specific about the visual layout, color palette, feature set, and user interactions.',
        codePrompt: {
          label: 'Application Specification Prompt to copy:',
          type: 'prompt',
          prompt: `Build a clean, high-performance "Task & Project Tracker" web app with:
- Dark glassmorphism header with navigation and search filter
- Kanban board columns: Backlog, In Progress, Review, and Done
- Interactive drag-or-click task status updates
- Task creation modal with priority tags (Urgent, High, Normal) and due date
- Statistics cards showing completion percentage and pending deadlines
- Smooth hover animations and responsive Tailwind styling`,
        },
        expectedResult: 'Gemini will stream the complete, structured React component code alongside explanation of the data state architecture.',
        troubleshootingAdvice: 'If the response stops mid-code, reply with "Continue generating from line [last line]" or increase the Output Token Limit in the right settings drawer to 8192.',
      },
      {
        stepNumber: 4,
        title: 'Test and Iterate within the Canvas',
        instructions:
          'Review the generated code in the response card. If you want to refine styling (e.g., adjust dark navy backgrounds or add search bar intent filtering), ask Gemini to refine that specific subcomponent while preserving the rest of the application.',
        codePrompt: {
          label: 'Iteration Prompt to copy:',
          type: 'prompt',
          prompt: `Refine the task board: add a search input that filters tasks in real-time by keyword, and include a subtle liquid-gloss border glow when hovering over active task cards.`,
        },
        expectedResult: 'Gemini delivers the updated component with seamless search state and enhanced hover styles.',
      },
      {
        stepNumber: 5,
        title: 'Export Code & Run Locally with Vite',
        instructions:
          'Click the "Get Code" button in the top right corner of Google AI Studio or copy the code block. In your terminal, initialize a new Vite project and paste the generated code into `src/App.tsx`.',
        codePrompt: {
          label: 'Terminal commands to run locally:',
          type: 'command',
          prompt: `npm create vite@latest my-ai-app -- --template react-ts
cd my-ai-app
npm install lucide-react tailwindcss @tailwindcss/vite
npm run dev`,
        },
        expectedResult: 'Vite starts the local development server at http://localhost:5173 with your generated application live and interactive.',
      },
      {
        stepNumber: 6,
        title: 'Deploy to Cloudflare Pages or Vercel',
        instructions:
          'Commit your project to GitHub and connect the repository to Cloudflare Pages or Vercel for instant free global hosting. Follow the "Publishing a Website Using Free-First Hosting" guide for step-by-step production deployment.',
        expectedResult: 'Your web app is live on a secure HTTPS public URL accessible worldwide.',
      },
    ],
    testingExportInstructions:
      'Test your web application locally using `npm run dev` and test responsiveness on mobile (375px), tablet (768px), and desktop (1440px). Run `npm run build` to verify there are zero TypeScript or syntax compilation errors before pushing to production.',
    officialReferences: [
      { title: 'Google AI Studio Overview', url: 'https://ai.google.dev/aistudio' },
      { title: 'Gemini API Prompt Engineering Guide', url: 'https://ai.google.dev/gemini-api/docs/prompting-strategies' },
      { title: 'Google Cloud Developer Documentation', url: 'https://cloud.google.com/docs' },
    ],
  },

  // 2. Google Antigravity
  {
    slug: 'building-website-google-antigravity',
    title: 'Building an Interactive Web Experience with Google Antigravity',
    task: 'Construct a spatial, canvas-driven interactive web experience with dynamic element physics and fluid animations.',
    category: 'website-app-development',
    difficulty: 'Intermediate',
    estimatedDuration: '20 mins',
    pricingStatus: 'Free Developer Preview',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://deepmind.google/technologies/gemini',
    officialDocumentationUrl: 'https://deepmind.google',
    primaryToolId: 'google-gemini',
    primaryToolName: 'Google Antigravity / Gemini Interactive',
    relatedToolIds: ['google-ai-studio', 'cursor', 'runway-gen3'],
    relatedGuideSlugs: ['building-website-google-ai-studio'],
    tags: ['antigravity', 'physics', 'canvas', 'creative-coding', 'webgl', 'deepmind'],
    prerequisites: [
      {
        label: 'WebGL2-Compatible Browser',
        isPaid: false,
        status: 'free',
        description: 'Hardware acceleration enabled in Chrome, Safari, or Firefox.',
      },
      {
        label: 'Node.js & npm',
        isPaid: false,
        status: 'free',
        description: 'Node.js v18 or higher for running local canvas build scripts.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize HTML5 Canvas & Physics Engine Workspace',
        instructions:
          'Create a dedicated React component with a `<canvas>` element and import an animation/physics loop using `requestAnimationFrame` or Matter.js. Set the canvas container to full viewport width (`w-full h-screen overflow-hidden`).',
        expectedResult: 'An edge-to-edge canvas renders smoothly with transparent background and resize observers attached.',
      },
      {
        stepNumber: 2,
        title: 'Define Floating UI Nodes & Physics Bodies',
        instructions:
          'Set up state arrays representing interactive UI cards, badges, and icon entities with coordinates (x, y), velocities (vx, vy), and collision boundaries.',
        codePrompt: {
          label: 'Physics node data structure and spring update hook:',
          type: 'code',
          prompt: `interface PhysicsNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  mass: number;
}

// Hook to apply spring damping and gravity-inversion towards cursor
const updatePhysics = (nodes: PhysicsNode[], cursor: { x: number; y: number; active: boolean }) => {
  return nodes.map(node => {
    let ax = 0;
    let ay = 0.05; // slight ambient gravity
    if (cursor.active) {
      const dx = cursor.x - node.x;
      const dy = cursor.y - node.y;
      const dist = Math.hypot(dx, dy) || 1;
      const force = Math.min(120 / (dist * dist), 0.8);
      ax += (dx / dist) * force;
      ay += (dy / dist) * force;
    }
    return {
      ...node,
      vx: (node.vx + ax) * 0.96,
      vy: (node.vy + ay) * 0.96,
      x: node.x + node.vx,
      y: node.y + node.vy,
    };
  });
};`,
        },
        expectedResult: 'Entities respond dynamically to cursor movement and bounce gently off viewport walls.',
      },
      {
        stepNumber: 3,
        title: 'Implement Magnetic Cursor Repulsion & Attractor States',
        instructions:
          'Bind `onPointerMove`, `onPointerDown`, and `onPointerUp` handlers to the canvas parent. When dragging a card or pressing the mouse, compute radial impulse vectors to simulate antigravity levitation.',
        expectedResult: 'Cards scatter gracefully under fast cursor movement and settle into floating equilibrium when idle.',
      },
      {
        stepNumber: 4,
        title: 'Apply Glossy Glass Shader & Specular Rim Reflections',
        instructions:
          'Style floating cards with `backdrop-filter: blur(20px)`, subtle semi-transparent borders (`border-white/20`), and dynamic radial light gradients that track the cursor angle.',
        expectedResult: 'The UI produces an authentic retro-glossy, liquid-glass aesthetic consistent with modern spatial interfaces.',
      },
      {
        stepNumber: 5,
        title: 'Performance Profiling & 60fps Optimization',
        instructions:
          'Open Chrome DevTools > Performance tab. Verify frame durations remain below 16.6ms. Offload heavy particle math to CSS transforms (`will-change: transform`) or WebGL shaders if simulating >100 nodes.',
        troubleshootingAdvice: 'If stutter occurs on high-DPI retina displays, scale canvas internal buffer by `window.devicePixelRatio` while keeping CSS dimensions fixed.',
      },
    ],
    testingExportInstructions:
      'Verify touch interactions on iOS/Android devices using browser mobile emulation mode. Ensure touch drag does not trigger native page pull-to-refresh.',
    officialReferences: [
      { title: 'Google DeepMind Technology Overview', url: 'https://deepmind.google' },
      { title: 'MDN Canvas API Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API' },
    ],
  },

  // 3. FLUX.1 Image Generation
  {
    slug: 'creating-ai-generated-images',
    title: 'Creating High-Fidelity Photorealistic Images with FLUX.1',
    task: 'Generate photorealistic commercial photography, UI graphics, and artistic assets with accurate hands, text typography, and lighting using FLUX.1.',
    category: 'ai-image-generation',
    difficulty: 'Beginner',
    estimatedDuration: '10 mins',
    pricingStatus: 'Open Weights & Free Web Tiers Available',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://blackforestlabs.ai',
    officialDocumentationUrl: 'https://docs.bfl.ml',
    primaryToolId: 'flux-1',
    primaryToolName: 'FLUX.1',
    relatedToolIds: ['midjourney', 'stable-diffusion', 'dall-e-3'],
    relatedGuideSlugs: ['creating-ai-videos'],
    tags: ['image-generation', 'flux', 'photorealism', 'prompt-engineering', 'commercial-art'],
    prerequisites: [
      {
        label: 'Free Account on FLUX Platform',
        isPaid: false,
        status: 'free',
        description: 'Account on Fal.ai, Replicate, Hugging Face, or local ComfyUI installation.',
      },
      {
        label: 'Understanding of Prompt Syntax',
        isPaid: false,
        status: 'free',
        description: 'Basic familiarity with camera angles, lighting conditions, and composition terminology.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Choose Your Generation Environment',
        instructions:
          'Access FLUX.1 via Black Forest Labs web portal, Hugging Face Spaces (FLUX.1 Schnell for high speed), or Fal.ai playground. If running locally, launch ComfyUI with the `flux1-dev.safetensors` model checkpoint.',
        expectedResult: 'You will have access to the generation playground with prompt box, aspect ratio selectors, and inference settings.',
      },
      {
        stepNumber: 2,
        title: 'Structure the Prompt with Subject, Context & Lighting',
        instructions:
          'FLUX.1 excels at natural language prompts without needing comma-separated keyword spam. Structure your prompt into four components: 1) Core Subject, 2) Environment/Setting, 3) Camera & Lighting details, and 4) Typography/Text in quotes.',
        codePrompt: {
          label: 'Photorealistic Commercial Prompt to copy:',
          type: 'prompt',
          prompt: `Editorial close-up photograph of an ergonomic designer aluminum laptop resting on a minimalist walnut studio desk. Warm afternoon sunlight streaming through Venetian blinds creating soft linear shadows across the matte aluminum surface. A crisp ceramic mug with steam beside it. Shallow depth of field, 85mm portrait lens, f/1.8 aperture, natural colors, authentic grain, 8k resolution.`,
        },
        expectedResult: 'The model prepares to synthesize clean reflections, precise shadows, and authentic optical depth of field.',
      },
      {
        stepNumber: 3,
        title: 'Render In-Image Typography (Text Rendering)',
        instructions:
          'Unlike older diffusion models, FLUX.1 can render clean typography directly inside the image. Enclose the exact words in quotation marks and state where they should appear.',
        codePrompt: {
          label: 'Typography-Enabled Graphic Prompt to copy:',
          type: 'prompt',
          prompt: `A modern retro-glossy poster on a textured concrete wall with the bold clean typography text "AI FINDER" embossed in iridescent cyan liquid glass letters. Studio lighting, high contrast, clean kerning, graphic design masterpiece.`,
        },
        expectedResult: 'The output renders the exact phrase "AI FINDER" with correct spelling and realistic surface integration.',
      },
      {
        stepNumber: 4,
        title: 'Configure Seed, Aspect Ratio & Guidance Scale',
        instructions:
          'Set aspect ratio to 16:9 for website hero banners or 1:1 for social cards. For FLUX.1 [dev], set Guidance Scale to 3.5 and Inference Steps between 25 and 35. For FLUX.1 [schnell], set steps to 4 for ultra-rapid 2-second iterations.',
        troubleshootingAdvice: 'If the image appears over-saturated or burned, reduce the Guidance Scale closer to 3.0.',
      },
      {
        stepNumber: 5,
        title: 'Export High-Resolution Assets & Web Optimization',
        instructions:
          'Download the output in lossless PNG format. Convert the final hero image to WebP or AVIF using Squoosh or `cwebp` to reduce file size from 12MB down to ~350KB for fast web page loading.',
        expectedResult: 'You have a production-grade, lightweight visual asset ready for your web application.',
      },
    ],
    testingExportInstructions:
      'Check image legibility across both dark and light UI backgrounds. Ensure no unwanted AI artifacts or deformed geometry exist in fine background details.',
    officialReferences: [
      { title: 'Black Forest Labs Official Site', url: 'https://blackforestlabs.ai' },
      { title: 'FLUX Model Hub on Hugging Face', url: 'https://huggingface.co/black-forest-labs' },
    ],
  },

  // 4. Runway Gen-3 Video Generation
  {
    slug: 'creating-ai-videos',
    title: 'Creating Cinematic AI Videos with Runway Gen-3 Alpha',
    task: 'Direct, generate, and edit cinematic 5-10 second video clips from text prompts with deliberate camera movements.',
    category: 'ai-video-generation',
    difficulty: 'Intermediate',
    estimatedDuration: '15 mins',
    pricingStatus: 'Freemium (125 One-Time Credits on Signup)',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://runwayml.com',
    officialDocumentationUrl: 'https://help.runwayml.com',
    primaryToolId: 'runway-gen3',
    primaryToolName: 'Runway Gen-3 Alpha',
    relatedToolIds: ['luma-dream-machine', 'pika-labs'],
    relatedGuideSlugs: ['creating-ai-generated-images'],
    tags: ['ai-video', 'runway', 'gen-3', 'cinematography', 'camera-motion', 'vfx'],
    prerequisites: [
      {
        label: 'Runway Account',
        isPaid: false,
        status: 'freemium',
        description: 'Free account provides 125 credits on registration. Standard plan starts at $12/month for 625 monthly credits.',
      },
      {
        label: 'High-Bandwidth Connection',
        isPaid: false,
        status: 'free',
        description: 'Required for streaming video generation previews and downloading 1080p MP4 files.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Open Runway Gen-3 Alpha Studio',
        instructions:
          'Log in at https://app.runwayml.com and select "Generate Video" from the dashboard. Ensure the model dropdown is set to "Gen-3 Alpha" (or "Gen-3 Alpha Turbo" for 7x faster generation speed).',
        expectedResult: 'The video generation timeline and directorial controls display on screen.',
        actionUrl: {
          url: 'https://runwayml.com',
          label: 'Open Runway ML',
        },
      },
      {
        stepNumber: 2,
        title: 'Compose the Camera Motion & Scene Prompt',
        instructions:
          'Write a cinematic prompt following Runway structure: [Camera movement] + [Subject & Action] + [Lighting & Style] + [Atmosphere]. Explicitly state camera instructions like "FPV drone shot", "Slow smooth dolly in", or "Cinematic tilt down".',
        codePrompt: {
          label: 'Cinematic Camera Video Prompt to copy:',
          type: 'prompt',
          prompt: `Slow smooth cinematic dolly-in shot through a futuristic transparent glass laboratory overlooking a rainy metropolis at dusk. Blue and amber neon city reflections across the wet panoramic glass windows. High dynamic range, 35mm anamorphic lens flare, photorealistic physics, 24fps motion blur.`,
        },
        expectedResult: 'The prompt establishes scene geometry and continuous camera path.',
      },
      {
        stepNumber: 3,
        title: 'Configure Motion Controls and Duration',
        instructions:
          'Set generation duration to 5 or 10 seconds. In the Motion settings, set Motion Intensity to 4 or 5 for natural movement without chaotic warping. If using an initial image reference (Image-to-Video), upload your reference image first.',
        troubleshootingAdvice: 'Avoid setting Motion Intensity above 7 unless intentional surrealism is desired, as high values can cause character anatomy morphing.',
      },
      {
        stepNumber: 4,
        title: 'Generate Preview & Apply Motion Brush',
        instructions:
          'Click the "Generate" button. The video queue takes approximately 60-90 seconds. Once rendered, preview playback. If a specific element (like water or smoke) needs targeted animation, click "Motion Brush", paint over that zone, and set directional flow arrows.',
        expectedResult: 'The targeted section animates smoothly while static structural elements remain stable.',
      },
      {
        stepNumber: 5,
        title: 'Extend Timeline & Export in 1080p',
        instructions:
          'If you need a longer clip, click "Extend" on the timeline to append an additional 5 seconds seamlessly from the last keyframe. Once satisfied, click "Download" and select 1080p MP4 format.',
        expectedResult: 'You receive a smooth, high-resolution cinematic MP4 file ready for video editing or web background loops.',
      },
    ],
    testingExportInstructions:
      'For web background videos, compress the exported MP4 using ffmpeg to an H.264/WebM file with muted audio (`-an`) and under 3MB file size for instant browser autoplay.',
    officialReferences: [
      { title: 'Runway Gen-3 Alpha Prompting Guide', url: 'https://help.runwayml.com/hc/en-us/articles/30537021115539' },
      { title: 'Runway Academy Tutorials', url: 'https://runwayml.com/academy' },
    ],
  },

  // 5. Cursor AI Coding
  {
    slug: 'building-react-app-ai-coding-assistant',
    title: 'Building a Production React 19 Application with Cursor',
    task: 'Scaffold, refactor, and ship a production-grade React 19 TypeScript web application using Cursor AI code editor and Composer.',
    category: 'coding',
    difficulty: 'Intermediate',
    estimatedDuration: '25 mins',
    pricingStatus: 'Free Hobby Plan / $20/mo Pro',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://cursor.com',
    officialDocumentationUrl: 'https://docs.cursor.com',
    primaryToolId: 'cursor',
    primaryToolName: 'Cursor',
    relatedToolIds: ['github-copilot', 'claude-code', 'v0-by-vercel'],
    relatedGuideSlugs: ['building-website-google-ai-studio', 'publishing-website-free-first-hosting'],
    tags: ['cursor', 'react', 'typescript', 'tailwind', 'composer', 'ai-coding'],
    prerequisites: [
      {
        label: 'Cursor IDE Installed',
        isPaid: false,
        status: 'freemium',
        description: 'Download free from https://cursor.com (works on Mac, Windows, Linux).',
      },
      {
        label: 'Node.js 18+ and npm',
        isPaid: false,
        status: 'free',
        description: 'Installed on your operating system to run dev servers and builds.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Install Cursor & Configure Workspace .cursorrules',
        instructions:
          'Download and launch Cursor. Create a new folder for your project. At the root of your project, create a file named `.cursorrules`. This file establishes global context, coding guidelines, and rules that Cursor follows automatically on every prompt.',
        codePrompt: {
          label: 'Content for your .cursorrules file:',
          type: 'code',
          prompt: `# Project Guidelines for AI Assistant
- Framework: React 19 SPA with Vite, TypeScript strict mode, and Tailwind CSS v4.
- Icons: Use 'lucide-react' for all icons.
- Architecture: Modular components in /src/components, data models in /src/types.
- Coding style: Functional React with typed props. Always handle empty states and error boundaries.
- No inline style tags. Use Tailwind utility classes with accessible ARIA tags.`,
        },
        expectedResult: 'Cursor indexes the `.cursorrules` file and applies these standards across all code suggestions.',
        actionUrl: {
          url: 'https://cursor.com',
          label: 'Download Cursor',
        },
      },
      {
        stepNumber: 2,
        title: 'Scaffold React App with Composer (Cmd+I / Ctrl+I)',
        instructions:
          'Press `Cmd+I` (Mac) or `Ctrl+I` (Windows/Linux) to open Cursor Composer. Composer can create and modify multiple files simultaneously across your codebase. Enter your application requirement prompt.',
        codePrompt: {
          label: 'Composer multi-file scaffolding prompt to copy:',
          type: 'prompt',
          prompt: `Scaffold a modern Financial Expense Tracker with:
1. /src/types/expense.ts - Typed Expense item (id, title, amount, category, date, isRecurring)
2. /src/data/mockExpenses.ts - 10 realistic sample transactions
3. /src/components/ExpenseList.tsx - Searchable, sortable list with category badges
4. /src/components/ExpenseSummary.tsx - Total spend, monthly breakdown, and budget cards
5. Connect all components in /src/App.tsx with responsive Tailwind styling`,
        },
        expectedResult: 'Composer writes and links all 5 files directly in your file tree.',
      },
      {
        stepNumber: 3,
        title: 'Edit Code In-Place with Cmd+K Inline Assistant',
        instructions:
          'Highlight any block of code inside a component and press `Cmd+K` (or `Ctrl+K`). Type targeted instructions to add features or refactor logic without switching windows.',
        codePrompt: {
          label: 'Inline refactor prompt example:',
          type: 'prompt',
          prompt: `Add a filter pill bar for categories (All, Food, Software, Travel, Office) that updates the active selection and recalculates the summary totals.`,
        },
        expectedResult: 'Cursor generates a side-by-side diff. Press `Cmd+Enter` or click "Accept" to apply the changes.',
        troubleshootingAdvice: 'If the inline diff suggests removing unrelated logic, press Escape to reject and narrow the selected code block before re-invoking Cmd+K.',
      },
      {
        stepNumber: 4,
        title: 'Ask Questions Across Your Entire Codebase with @Codebase',
        instructions:
          'Press `Cmd+L` (or `Ctrl+L`) to open the Chat drawer. Prefix your query with `@Codebase` so Cursor searches through all project files and semantic symbols before answering.',
        codePrompt: {
          label: 'Codebase search prompt to test:',
          type: 'prompt',
          prompt: `@Codebase Find all components that read from localStorage and ensure they have try-catch blocks to prevent SSR/JSON parsing crashes.`,
        },
        expectedResult: 'Cursor inspects your files and provides exact lines with bulletproof error handling.',
      },
      {
        stepNumber: 5,
        title: 'Run TypeScript Linting & Production Build',
        instructions:
          'Open Cursor integrated terminal (`Ctrl+\``). Run `npm run lint` and `npm run build` to confirm zero compilation errors exist before deployment.',
        codePrompt: {
          label: 'Terminal verification commands:',
          type: 'command',
          prompt: `npm run lint && npm run build`,
        },
        expectedResult: 'Build succeeds with production bundle generated in `/dist`.',
      },
    ],
    testingExportInstructions:
      'Test keyboard navigation (Tab/Shift-Tab) across all buttons and inputs. Verify fast load times and clean console output with zero React hydration warnings.',
    officialReferences: [
      { title: 'Cursor Official Documentation', url: 'https://docs.cursor.com' },
      { title: 'Cursor Forum & Community Recipes', url: 'https://forum.cursor.com' },
    ],
  },

  // 6. Gamma App Presentations
  {
    slug: 'creating-presentations-using-ai',
    title: 'Creating Executive Pitch Decks with Gamma AI',
    task: 'Transform raw notes, meeting transcripts, or bulleted outlines into a polished, executive-ready presentation deck with Gamma.',
    category: 'presentations',
    difficulty: 'Beginner',
    estimatedDuration: '10 mins',
    pricingStatus: 'Freemium (400 Free Starter Credits)',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://gamma.app',
    officialDocumentationUrl: 'https://help.gamma.app',
    primaryToolId: 'gamma-app',
    primaryToolName: 'Gamma',
    relatedToolIds: ['tome-app', 'chatgpt'],
    relatedGuideSlugs: ['writing-improving-content-ai'],
    tags: ['gamma', 'presentations', 'pitch-deck', 'slides', 'business', 'deck-design'],
    prerequisites: [
      {
        label: 'Gamma.app Account',
        isPaid: false,
        status: 'freemium',
        description: 'Free account includes 400 credits on signup, enough to generate 10 full decks.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Launch Gamma & Choose "Generate from Outline"',
        instructions:
          'Go to https://gamma.app and sign in. On the dashboard, click "Create New with AI" and choose "Generate". Select "Presentation" as your document format.',
        expectedResult: 'A prompt modal opens with card length controls and outline fields.',
        actionUrl: {
          url: 'https://gamma.app',
          label: 'Open Gamma App',
        },
      },
      {
        stepNumber: 2,
        title: 'Input the Structured Deck Outline',
        instructions:
          'Paste a clear topic outline detailing the problem, solution, market size, business model, and financial projections.',
        codePrompt: {
          label: 'Pitch Deck Generation Prompt to copy:',
          type: 'prompt',
          prompt: `Create an 8-slide Investor Pitch Deck for "CloudPulse" (an AI infrastructure monitoring platform):
1. Title: CloudPulse - Predictive Cloud Reliability
2. The Problem: Unplanned downtime costs enterprises $300k/hour in revenue loss
3. The Solution: Real-time autonomous anomaly prevention using edge ML
4. Market Size: $42B global DevOps & observability market growing at 21% CAGR
5. Product Architecture: Agentless lightweight telemetry collector
6. Business Model: B2B SaaS tiered pricing ($499/mo to $4,999/mo)
7. Competitive Advantage: 99.4% precision with zero manual alert thresholds
8. Call to Action & Financial Ask: Raising $3.5M Seed round to expand engineering`,
        },
        expectedResult: 'Gamma generates an 8-slide structured card layout with tailored headlines.',
      },
      {
        stepNumber: 3,
        title: 'Select Theme Palette & Card Density',
        instructions:
          'Browse the theme picker. For tech and finance presentations, select a high-contrast dark theme like "Obsidian", "Midnight Blue", or "Neo Quartz". Adjust card density to "Detailed" so slides contain thorough substance rather than empty placeholders.',
        expectedResult: 'Typography, accent colors, and background treatments are applied consistently across all cards.',
      },
      {
        stepNumber: 4,
        title: 'Refine Individual Slides with AI Card Tools',
        instructions:
          'Hover over any slide card and click the floating AI icon on the right side. Select "Format as 3 Columns", "Add metric callout card", or "Rewrite concisely". Gamma will rearrange content without breaking visual alignment.',
        expectedResult: 'Cards look tailored and professionally typeset.',
        troubleshootingAdvice: 'If generated slides feel too brief, toggle card density to "Detailed" or prompt the inline AI assistant to "expand on technical details and provide concrete statistics for slide 3".',
      },
      {
        stepNumber: 5,
        title: 'Export to PDF & PowerPoint (.pptx)',
        instructions:
          'Click the "Share" button in the upper right. Select "Export" and choose either "Export to PDF" (ideal for sending over email) or "Export to PowerPoint (.pptx)" (to edit natively in Microsoft 365 or Google Slides).',
        expectedResult: 'The file downloads with high-resolution vector text, embedded layouts, and formatted graphics.',
      },
    ],
    testingExportInstructions:
      'Open the exported PDF on both mobile and laptop screens. Verify all key metrics (e.g. $42B market size, 99.4% precision) remain prominent and legible.',
    officialReferences: [
      { title: 'Gamma Help Center', url: 'https://help.gamma.app' },
      { title: 'Gamma Presentation Design Gallery', url: 'https://gamma.app/templates' },
    ],
  },

  // 7. ElevenLabs Voice Audio
  {
    slug: 'generating-voice-audio',
    title: 'Generating Realistic Human Voiceover Audio with ElevenLabs',
    task: 'Synthesize expressive, studio-grade spoken voiceovers with natural cadence, pauses, and emotional depth using ElevenLabs.',
    category: 'voice-audio',
    difficulty: 'Beginner',
    estimatedDuration: '10 mins',
    pricingStatus: 'Freemium (10,000 Free Characters / Month)',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://elevenlabs.io',
    officialDocumentationUrl: 'https://elevenlabs.io/docs',
    primaryToolId: 'elevenlabs',
    primaryToolName: 'ElevenLabs',
    relatedToolIds: ['descript'],
    relatedGuideSlugs: ['creating-ai-videos'],
    tags: ['elevenlabs', 'voiceover', 'text-to-speech', 'audio', 'podcast', 'tts'],
    prerequisites: [
      {
        label: 'ElevenLabs Free Account',
        isPaid: false,
        status: 'freemium',
        description: 'Free tier grants 10,000 characters every month. Starter plan starts at $5/month for 30,000 characters and commercial license.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Open Speech Synthesis Studio',
        instructions:
          'Go to https://elevenlabs.io and sign in. On the left menu, click "Speech Synthesis" to open the voice generator canvas.',
        expectedResult: 'The voice selector, text input area, and voice parameter sliders are visible.',
        actionUrl: {
          url: 'https://elevenlabs.io',
          label: 'Open ElevenLabs Studio',
        },
      },
      {
        stepNumber: 2,
        title: 'Select Voice & Model Architecture',
        instructions:
          'In the Voice dropdown, select a voice suitable for your project (e.g., "Adam" or "Rachel" for natural narrative explainer tone). For the Model, choose "Eleven Multilingual v2" for rich emotional nuance and accurate pronunciation.',
        expectedResult: 'Voice parameters load with default calibrated baseline settings.',
      },
      {
        stepNumber: 3,
        title: 'Calibrate Voice Settings Sliders',
        instructions:
          'Open "Voice Settings". Adjust the sliders: 1) Stability: set to 0.45-0.55 for natural inflection (higher values make it robotic; lower values add unpredictability), 2) Clarity + Similarity: set to 0.75-0.85, 3) Style Exaggeration: set to 0.15 for subtle authentic emphasis.',
        troubleshootingAdvice: 'If the audio produces whispers or unintended laughter, raise Stability to 0.65.',
      },
      {
        stepNumber: 4,
        title: 'Input Script with Punctuation Cues',
        instructions:
          'Paste your script into the text area. ElevenLabs interprets commas as brief natural pauses, em-dashes (—) as dramatic pauses, and question marks as vocal pitch rises.',
        codePrompt: {
          label: 'Sample Explainer Script to test voice cadence:',
          type: 'prompt',
          prompt: `Welcome to AI Finder. With over one hundred verified artificial intelligence tools indexed, discovering the exact software for your project takes seconds—not hours. Let's explore how to find free, open-source alternatives to expensive subscriptions.`,
        },
        expectedResult: 'The character counter displays used credits against your monthly quota.',
      },
      {
        stepNumber: 5,
        title: 'Generate and Download Studio Master (MP3/WAV)',
        instructions:
          'Click the blue "Generate Speech" button. Play back the generated audio. Click the Download button to save the pristine 44.1kHz MP3/WAV audio track.',
        expectedResult: 'High-quality audio file downloads to your local machine with zero background hiss.',
      },
    ],
    testingExportInstructions:
      'Listen to the audio through both headphones and laptop speakers to check vocal clarity and pacing before mastering into video or podcast editors.',
    officialReferences: [
      { title: 'ElevenLabs Prompting & Punctuation Guide', url: 'https://elevenlabs.io/docs/speech-synthesis/prompting' },
      { title: 'ElevenLabs API Documentation', url: 'https://elevenlabs.io/docs/api-reference' },
    ],
  },

  // 8. Claude Content Writing
  {
    slug: 'writing-improving-content-ai',
    title: 'Writing & Polishing High-Impact Technical Content with Claude 3.7',
    task: 'Draft, restructure, and edit comprehensive technical articles, guides, and reports with depth and zero generic filler using Claude.',
    category: 'writing',
    difficulty: 'Beginner',
    estimatedDuration: '15 mins',
    pricingStatus: 'Free Tier / $20/mo Pro',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://claude.ai',
    officialDocumentationUrl: 'https://docs.anthropic.com',
    primaryToolId: 'claude-ai',
    primaryToolName: 'Claude',
    relatedToolIds: ['chatgpt', 'cursor'],
    relatedGuideSlugs: ['creating-presentations-using-ai'],
    tags: ['claude', 'writing', 'editing', 'technical-writing', 'copywriting', 'content'],
    prerequisites: [
      {
        label: 'Anthropic Claude Account',
        isPaid: false,
        status: 'freemium',
        description: 'Free tier available at https://claude.ai. Pro plan offers priority capacity and extended context.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Open Claude & Define Tone Constraints',
        instructions:
          'Sign in to https://claude.ai. Claude produces superior writing when explicitly constrained against generic clichés (e.g. "delve", "testament", "tapestry", "in conclusion"). Instruct Claude to write with concrete clarity.',
        codePrompt: {
          label: 'Editorial Persona Prompt to copy:',
          type: 'prompt',
          prompt: `You are an executive technical editor. 
Writing principles to enforce:
1. Active voice and concrete verbs only.
2. Ban corporate filler words: never use "delve", "tapestry", "revolutionize", "in today's fast-paced world", or "furthermore".
3. Support every claim with a specific example, real-world metric, or technical mechanism.
4. Keep paragraphs short (2-3 sentences max) for high readability.`,
        },
        expectedResult: 'Claude acknowledges the editorial guidelines.',
        actionUrl: {
          url: 'https://claude.ai',
          label: 'Open Claude',
        },
      },
      {
        stepNumber: 2,
        title: 'Provide Source Notes & Target Audience',
        instructions:
          'Paste your raw notes, bulleted ideas, or outline. Specify your target audience (e.g. senior software engineers, enterprise buyers, or students).',
        codePrompt: {
          label: 'Drafting prompt to copy:',
          type: 'prompt',
          prompt: `Draft a comprehensive 800-word engineering guide on "How to Safely Self-Host Open-Source LLMs for Production".
Key sections to cover:
- Hardware sizing: VRAM requirements for 8B vs 70B models (4-bit quantization vs FP16)
- Inference engines: vLLM vs Ollama comparison
- Latency optimization: PagedAttention and continuous batching
- Security: Air-gapped local endpoints and zero external API leaks`,
        },
        expectedResult: 'Claude streams an in-depth, structured draft with accurate technical specifications.',
      },
      {
        stepNumber: 3,
        title: 'Run a Critique & Compression Pass',
        instructions:
          'Ask Claude to critically edit its own draft to cut wordiness by 25% while preserving all technical facts.',
        codePrompt: {
          label: 'Compression & Refinement Prompt to copy:',
          type: 'prompt',
          prompt: `Review the draft:
1. Cut 20% of words by removing redundant introductory phrasing.
2. Convert the vLLM vs Ollama comparison into a clean Markdown table with columns: Engine, Best Use Case, Throughput, and Setup Complexity.
3. Add a 3-command quickstart code block demonstrating vLLM Docker launch.`,
        },
        expectedResult: 'A tighter, more punchy technical piece with an interactive Markdown comparison table.',
        troubleshootingAdvice: 'If the tone sounds overly academic or dry, explicitly instruct Claude: "Adopt a conversational first-person builder perspective with short, punchy paragraphs and actionable takeaways".',
      },
      {
        stepNumber: 4,
        title: 'Export to Markdown & Publish',
        instructions:
          'Click the copy icon on the response or download the generated Artifact directly as a `.md` file for your blog, documentation site, or CMS.',
        expectedResult: 'Clean, formatted Markdown ready for deployment.',
      },
    ],
    testingExportInstructions:
      'Run the generated text through Hemingway Editor or Grammarly to verify readability score is Grade 8-10 for technical clarity.',
    officialReferences: [
      { title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
      { title: 'Claude Documentation', url: 'https://docs.anthropic.com' },
    ],
  },

  // 9. Portfolio Without Coding
  {
    slug: 'building-portfolio-without-coding',
    title: 'Building a Design Portfolio Without Code Using v0 & Framer',
    task: 'Create, customize, and publish a modern creative portfolio with custom domain and responsive layouts without coding.',
    category: 'website-app-development',
    difficulty: 'Beginner',
    estimatedDuration: '15 mins',
    pricingStatus: '100% Free Tier Available',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://v0.dev',
    officialDocumentationUrl: 'https://v0.dev/faq',
    primaryToolId: 'v0-by-vercel',
    primaryToolName: 'v0 by Vercel',
    relatedToolIds: ['cursor', 'google-ai-studio'],
    relatedGuideSlugs: ['publishing-website-free-first-hosting'],
    tags: ['portfolio', 'no-code', 'v0', 'framer', 'web-design', 'responsive'],
    prerequisites: [
      {
        label: 'Free Vercel or Framer Account',
        isPaid: false,
        status: 'free',
        description: 'Sign up free with GitHub or email.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Open v0.dev AI Generative Canvas',
        instructions:
          'Navigate to https://v0.dev and log in with your Vercel/GitHub account. Click in the central prompt box.',
        expectedResult: 'The prompt interface loads with visual component options.',
        actionUrl: {
          url: 'https://v0.dev',
          label: 'Open v0 by Vercel',
        },
      },
      {
        stepNumber: 2,
        title: 'Enter the Portfolio Specification Prompt',
        instructions:
          'Describe the visual identity, sections, and case studies for your creative portfolio.',
        codePrompt: {
          label: 'Creative Portfolio Prompt to copy:',
          type: 'prompt',
          prompt: `Design a high-end minimalist Product Designer portfolio with:
- Top sticky navigation with logo and "Available for Q3 Work" status pill
- Hero with bold typography statement and social links (GitHub, X, LinkedIn)
- Selected Work grid with 4 interactive project cards featuring tag pills, hover zoom, and case study links
- "About Me & Philosophy" section with skills list
- Clean contact footer with email copy button
- Aesthetic: Dark mode slate-950, deep sapphire accents, border glass highlights`,
        },
        expectedResult: 'v0 generates interactive visual variants in under 30 seconds.',
      },
      {
        stepNumber: 3,
        title: 'Select and Customize Elements In-Canvas',
        instructions:
          'Click on any element in the live preview (e.g. headline text or project image) and type instant modifications like "Change background to dark navy" or "Add view live project button to each card".',
        expectedResult: 'v0 live-updates the canvas in real time with zero code syntax required.',
        troubleshootingAdvice: 'If a component layout appears misaligned on mobile preview, click the device toggle icon in v0 to switch to 375px view and prompt "ensure cards stack vertically on screens under 640px".',
      },
      {
        stepNumber: 4,
        title: 'Publish Live to Free Vercel URL',
        instructions:
          'Click the "Deploy" or "Share" button in the upper right. Select "Deploy to Vercel". Enter your desired site name.',
        expectedResult: 'Your portfolio is immediately published live on a free `*.vercel.app` domain with automatic global SSL.',
      },
    ],
    testingExportInstructions:
      'Open your live URL on your smartphone. Verify the mobile hamburger menu works smoothly and images scale cleanly.',
    officialReferences: [
      { title: 'v0 Documentation & Showcase', url: 'https://v0.dev/docs' },
      { title: 'Vercel Deployment Guide', url: 'https://vercel.com/docs' },
    ],
  },

  // 10. Free-First Hosting Deployment
  {
    slug: 'publishing-website-free-first-hosting',
    title: 'Publishing a Website Using Free-First Hosting Options (Cloudflare & Vercel)',
    task: 'Deploy, configure custom domains, and secure any web application with $0 hosting fees using Cloudflare Pages, Vercel, and GitHub.',
    category: 'productivity',
    difficulty: 'Beginner',
    estimatedDuration: '12 mins',
    pricingStatus: '100% Free Tier (No Credit Card Required)',
    isVerified: true,
    verifiedDate: 'October 2026',
    officialWebsiteUrl: 'https://pages.cloudflare.com',
    officialDocumentationUrl: 'https://developers.cloudflare.com/pages',
    primaryToolId: 'cloudflare-pages',
    primaryToolName: 'Cloudflare Pages / Vercel',
    relatedToolIds: ['v0-by-vercel', 'google-ai-studio', 'cursor'],
    relatedGuideSlugs: ['building-website-google-ai-studio', 'building-react-app-ai-coding-assistant'],
    tags: ['hosting', 'cloudflare', 'vercel', 'deployment', 'free-tier', 'dns', 'ssl'],
    prerequisites: [
      {
        label: 'Free GitHub Account',
        isPaid: false,
        status: 'free',
        description: 'Required to host your code repository securely.',
      },
      {
        label: 'Free Cloudflare or Vercel Account',
        isPaid: false,
        status: 'free',
        description: 'Both platforms offer 100% free hosting tiers with unlimited bandwidth and free SSL.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Push Your Project to a GitHub Repository',
        instructions:
          'In your local project terminal, initialize Git, commit all project files, and push to a new GitHub repository.',
        codePrompt: {
          label: 'Git commands to push to GitHub:',
          type: 'command',
          prompt: `git init
git add .
git commit -m "Initial commit for production deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main`,
        },
        expectedResult: 'Your codebase is safely stored and version-controlled on GitHub.',
      },
      {
        stepNumber: 2,
        title: 'Connect GitHub to Cloudflare Pages',
        instructions:
          'Log in to https://dash.cloudflare.com. In the left sidebar, click "Workers & Pages" > "Create application" > "Pages" > "Connect to Git". Authorize Cloudflare to access your GitHub repository and select your project.',
        actionUrl: {
          url: 'https://pages.cloudflare.com',
          label: 'Open Cloudflare Pages',
        },
        expectedResult: 'Cloudflare imports the repository and opens the Build Settings configuration screen.',
      },
      {
        stepNumber: 3,
        title: 'Configure Build Command & Output Directory',
        instructions:
          'Under Build Settings, select the Framework preset (e.g., "Vite" or "Create React App"). Ensure the Build command is set to `npm run build` and the Build output directory is set to `dist`.',
        expectedResult: 'Cloudflare displays the build pipeline configuration summary.',
        troubleshootingAdvice: 'If the build errors with missing packages, check that your package.json dependencies are in "dependencies" rather than "devDependencies" if required at runtime, or add the NODE_VERSION=20 environment variable in Cloudflare build settings.',
      },
      {
        stepNumber: 4,
        title: 'Deploy and Verify Global Edge Distribution',
        instructions:
          'Click "Save and Deploy". Cloudflare will spin up a build container, install dependencies, run the build, and distribute static assets across its global 330+ city Anycast edge network. The entire build completes in under 60 seconds.',
        expectedResult: 'You will see a green checkmark with your live production URL (e.g., `https://my-project.pages.dev`).',
      },
      {
        stepNumber: 5,
        title: 'Attach a Free Custom Domain & Automatic SSL',
        instructions:
          'On your project dashboard in Cloudflare Pages, click the "Custom domains" tab. Click "Set up a custom domain" and type your domain (e.g. `www.mycoolsite.com`). Cloudflare automatically provisions a free SSL certificate with HTTP/3 support and zero renewal fees.',
        expectedResult: 'Your custom domain is live, encrypted with HTTPS, and globally protected by Cloudflare DDoS defense.',
      },
    ],
    testingExportInstructions:
      'Run Google PageSpeed Insights on your new URL. Cloudflare edge hosting typically scores 95-100 on Performance with zero configuration.',
    officialReferences: [
      { title: 'Cloudflare Pages Documentation', url: 'https://developers.cloudflare.com/pages/' },
      { title: 'Vercel Deployment Guide', url: 'https://vercel.com/docs/deployments/overview' },
      { title: 'GitHub Pages Guide', url: 'https://docs.github.com/en/pages' },
    ],
  },
];

// Helper Functions
export function getAllGuides(): HowToGuide[] {
  return HOW_TO_GUIDES;
}

export function getGuideBySlug(slug: string): HowToGuide | undefined {
  return HOW_TO_GUIDES.find((g) => g.slug.toLowerCase() === slug.toLowerCase());
}

export function getGuidesForTool(toolId: string): HowToGuide[] {
  const norm = toolId.toLowerCase();
  return HOW_TO_GUIDES.filter(
    (g) => g.primaryToolId.toLowerCase() === norm || g.relatedToolIds.some((id) => id.toLowerCase() === norm)
  );
}

export function getGuidesByCategory(category: GuideCategory): HowToGuide[] {
  return HOW_TO_GUIDES.filter((g) => g.category === category);
}

export function searchGuides(
  query: string,
  category: GuideCategory | 'all' = 'all',
  difficulty: string = 'all'
): HowToGuide[] {
  const q = query.toLowerCase().trim();
  return HOW_TO_GUIDES.filter((guide) => {
    // Category match
    if (category !== 'all' && guide.category !== category) return false;
    // Difficulty match
    if (difficulty !== 'all' && guide.difficulty.toLowerCase() !== difficulty.toLowerCase()) return false;
    // Query match
    if (!q) return true;
    const inTitle = guide.title.toLowerCase().includes(q);
    const inTask = guide.task.toLowerCase().includes(q);
    const inTool = guide.primaryToolName.toLowerCase().includes(q);
    const inTags = guide.tags.some((t) => t.toLowerCase().includes(q));
    const inSteps = guide.steps.some(
      (s) => s.title.toLowerCase().includes(q) || s.instructions.toLowerCase().includes(q)
    );
    return inTitle || inTask || inTool || inTags || inSteps;
  });
}
