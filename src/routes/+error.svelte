<!-- src/routes/+error.svelte -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { Home, ArrowLeft, Mail, Phone, Compass, AlertTriangle, RefreshCw, Server, Shield } from 'lucide-svelte';
  import { gsap } from 'gsap';
  import { primaryPhone, emailAddress } from '$lib/data/company.js';
  
  // Check if it's a 404 or other error
  $: is404 = $page.status === 404;
  $: errorCode = $page.status || 500;
  $: errorMessage = $page.error?.message || 'An unexpected error occurred';
  
  // @ts-ignore
  let containerRef;
  // @ts-ignore
  let numberRef;
  // @ts-ignore
  let contentRef;
  
  // Error type configurations
  const errorConfigs = {
    404: {
      icon: Compass,
      title: 'Blueprint Not Found',
      description: "It seems the architectural plans you're looking for have been moved to another location. Let's help you find your way back.",
      color: '#56AAB7'
    },
    403: {
      icon: Shield,
      title: 'Access Restricted',
      description: 'This area is under construction and requires special access. Please ensure you have the proper permissions.',
      color: '#F59E0B'
    },
    500: {
      icon: Server,
      title: 'Foundation Issue',
      description: 'We\'re experiencing some structural problems with our server. Our team is working to reinforce the foundation.',
      color: '#EF4444'
    },
    default: {
      icon: AlertTriangle,
      title: 'Construction Zone',
      description: 'We\'ve encountered an unexpected issue. Our architectural team is investigating the problem.',
      color: '#6B7280'
    }
  };
  
 // @ts-ignore
   $: currentConfig = errorConfigs[errorCode] || errorConfigs.default;
  
  onMount(() => {
    // GSAP Animations
    const tl = gsap.timeline();
    
    // Animate error number
    // @ts-ignore
    tl.fromTo(numberRef,
      { 
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power4.out"
      }
    );
    
    // Animate content
    // @ts-ignore
    if (contentRef && contentRef.children) {
      tl.fromTo(contentRef.children,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        },
        "-=0.5"
      );
    }
    
    // Animate blueprint lines
    // @ts-ignore
    const lines = containerRef.querySelectorAll('.blueprint-line');
    tl.fromTo(lines,
      {
        scaleX: 0,
        transformOrigin: "left center"
      },
      {
        scaleX: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.inOut"
      },
      "-=1"
    );
  });
  
  const handleRefresh = () => {
    window.location.reload();
  };
</script>

<svelte:head>
  <title>{errorCode} - {currentConfig.title} | 2WATUJU Architecture</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
    
    .architectural-grid {
      background-image: 
        linear-gradient(rgba(86, 170, 183, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(86, 170, 183, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: grid-move 20s linear infinite;
    }
    
    @keyframes grid-move {
      0% { background-position: 0 0; }
      100% { background-position: 50px 50px; }
    }
    
    .blueprint-line {
      background: linear-gradient(90deg, transparent, var(--line-color, rgba(86, 170, 183, 0.3)), transparent);
      height: 1px;
      position: absolute;
      width: 100%;
    }
    
    .error-number {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: clamp(100px, 20vw, 200px);
      line-height: 0.8;
      color: transparent;
      -webkit-text-stroke: 2px var(--error-color);
      text-stroke: 2px var(--error-color);
      position: relative;
    }
    
    .error-number::before {
      content: attr(data-number);
      position: absolute;
      top: 0;
      left: 0;
      color: var(--error-color);
      opacity: 0.1;
      -webkit-text-stroke: 0;
      text-stroke: 0;
      z-index: -1;
    }
    
    .icon-decoration {
      position: absolute;
      opacity: 0.05;
      animation: rotate-slow 30s linear infinite;
    }
    
    @keyframes rotate-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .hover-lift {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .pulse-icon {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
  </style>
</svelte:head>

<div bind:this={containerRef} class="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
  <!-- Architectural Grid Background -->
  <div class="architectural-grid absolute inset-0"></div>
  
  <!-- Blueprint Lines -->
  <div class="blueprint-line" style="top: 20%; --line-color: {currentConfig.color}30;"></div>
  <div class="blueprint-line" style="top: 50%; --line-color: {currentConfig.color}30;"></div>
  <div class="blueprint-line" style="top: 80%; --line-color: {currentConfig.color}30;"></div>
  
  {#if is404}
    <!-- 404 Specific Decorations -->
    <div class="icon-decoration top-10 right-10">
      <Compass size={200} style="color: {currentConfig.color}" />
    </div>
    <div class="icon-decoration bottom-10 left-10" style="animation-delay: -15s;">
      <Compass size={150} style="color: {currentConfig.color}" />
    </div>
  {:else}
    <!-- Other Error Decorations -->
    <div class="icon-decoration top-10 right-10 pulse-icon">
      <svelte:component this={currentConfig.icon} size={150} style="color: {currentConfig.color}" />
    </div>
  {/if}
  
  <!-- Main Content -->
  <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
    <!-- Error Number -->
    <div bind:this={numberRef} class="mb-8">
      <h1 
        class="error-number" 
        data-number={errorCode}
        style="--error-color: {currentConfig.color}"
      >
        {errorCode}
      </h1>
    </div>
    
    <!-- Content -->
    <div bind:this={contentRef} class="space-y-6">
      <!-- Icon and Title -->
      <div class="flex justify-center mb-4">
        <div 
          class="w-16 h-16 rounded-full flex items-center justify-center"
          style="background-color: {currentConfig.color}20; color: {currentConfig.color};"
        >
          <svelte:component this={currentConfig.icon} size={32} />
        </div>
      </div>
      
      <!-- Subtitle -->
      <div class="space-y-2">
        <h2 class="text-3xl md:text-4xl font-light text-gray-800 font-['Inter']">
          {currentConfig.title}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto font-['Inter'] font-light">
          {currentConfig.description}
        </p>
        
        {#if !is404 && errorMessage}
          <div class="mt-4 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
            <p class="text-sm text-gray-500 font-mono break-words">
              {errorMessage}
            </p>
          </div>
        {/if}
      </div>
      
      <!-- Divider -->
      <div class="flex items-center justify-center space-x-4 my-8">
        <div 
          class="h-px bg-gradient-to-r from-transparent to-transparent w-24"
          style="background-image: linear-gradient(to right, transparent, {currentConfig.color}, transparent);"
        ></div>
        <div 
          class="w-2 h-2 rounded-full"
          style="background-color: {currentConfig.color};"
        ></div>
        <div 
          class="h-px bg-gradient-to-r from-transparent to-transparent w-24"
          style="background-image: linear-gradient(to right, transparent, {currentConfig.color}, transparent);"
        ></div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a 
          href="/"
          class="hover-lift group flex items-center gap-3 px-8 py-4 text-white rounded-full font-medium transition-all duration-300"
          style="background-color: {currentConfig.color};"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </a>
        
        {#if is404}
          <a 
            href="/projects"
            class="hover-lift group flex items-center gap-3 px-8 py-4 border-2 rounded-full font-medium transition-all duration-300"
            style="border-color: {currentConfig.color}; color: {currentConfig.color};"
            onmouseenter={(e) => {
              e.currentTarget.style.backgroundColor = currentConfig.color;
              e.currentTarget.style.color = 'white';
            }}
            onmouseleave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = currentConfig.color;
            }}
          >
            <span>View Our Projects</span>
            <ArrowLeft size={20} class="rotate-180" />
          </a>
        {:else}
          <button 
            onclick={handleRefresh}
            class="hover-lift group flex items-center gap-3 px-8 py-4 border-2 rounded-full font-medium transition-all duration-300"
            style="border-color: {currentConfig.color}; color: {currentConfig.color};"
            onmouseenter={(e) => {
              e.currentTarget.style.backgroundColor = currentConfig.color;
              e.currentTarget.style.color = 'white';
            }}
            onmouseleave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = currentConfig.color;
            }}
          >
            <RefreshCw size={20} />
            <span>Try Again</span>
          </button>
        {/if}
      </div>
      
      <!-- Contact Information -->
      <div class="mt-16 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-4">Need immediate assistance?</p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
          <a 
            href={primaryPhone.telHref} 
            class="flex items-center gap-2 text-gray-600 transition-colors"
            style="hover:color: {currentConfig.color};"
            onmouseenter={(e) => e.currentTarget.style.color = currentConfig.color}
            onmouseleave={(e) => e.currentTarget.style.color = '#4B5563'}
          >
            <Phone size={16} />
            <span>{primaryPhone.display}</span>
          </a>
          <div class="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
          <a 
            href={`mailto:${emailAddress}`} 
            class="flex items-center gap-2 text-gray-600 transition-colors"
            style="hover:color: {currentConfig.color};"
            onmouseenter={(e) => e.currentTarget.style.color = currentConfig.color}
            onmouseleave={(e) => e.currentTarget.style.color = '#4B5563'}
          >
            <Mail size={16} />
            <span>{emailAddress}</span>
          </a>
        </div>
        
        {#if !is404}
          <p class="text-xs text-gray-400 mt-6">
            Error Code: {errorCode} | Timestamp: {new Date().toLocaleString()}
          </p>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Corner Decorations -->
  <div 
    class="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 opacity-20"
    style="border-color: {currentConfig.color};"
  ></div>
  <div 
    class="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 opacity-20"
    style="border-color: {currentConfig.color};"
  ></div>
  <div 
    class="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 opacity-20"
    style="border-color: {currentConfig.color};"
  ></div>
  <div 
    class="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 opacity-20"
    style="border-color: {currentConfig.color};"
  ></div>
</div>
