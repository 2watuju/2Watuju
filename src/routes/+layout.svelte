<!-- Clean Layout Component - debug elements removed -->
<script>
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  import { base } from '$app/paths';
  import { socialLinks, primaryPhone, emailAddress } from '$lib/data/company.js';
  
  let mounted = false;
  let scrolled = false;
  let mobileMenuOpen = false;
  let scrollY = 0;
  
  // Logo state management
  let logoLoaded = false;
  let logoError = false;
  let logoElement;
  
  // Reactive variables for smooth transitions
  $: headerClass = scrolled ? 'scrolled' : '';
  
  onMount(() => {
    mounted = true;
    
    // Check if logo is already loaded (cached)
    checkLogoStatus();
    
    const handleScroll = () => {
      scrollY = window.scrollY;
      scrolled = scrollY > 50;
    };
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        mobileMenuOpen = false;
      }
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial scroll check
    handleScroll();
    
    return () => {
      mounted = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });

  onDestroy(() => {
    mounted = false;
  });

  // Check logo status after component mounts
  function checkLogoStatus() {
    //@ts-ignore
    if (logoElement) {
      // If image is already loaded (cached), trigger load state
      if (logoElement.complete && logoElement.naturalWidth > 0) {
        handleLogoLoad({ target: logoElement });
      }
    } else {
      // Retry after a short delay
      setTimeout(checkLogoStatus, 100);
    }
  }


  function handleProjectsClick() {
    console.log('Projects clicked');
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
    //@ts-ignore

  function handleKeydown(event) {
    if (event.key === 'Escape' && mobileMenuOpen) {
      closeMobileMenu();
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
    //@ts-ignore

  function handleLogoLoad(event) {
    logoLoaded = true;
    logoError = false;
  }
    //@ts-ignore

  function handleLogoError(event) {
    logoError = true;
    logoLoaded = false;
  }
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#56AAB7" />
  
  <!-- Preload logo to prevent layout shift -->
  <link 
    rel="preload" 
    as="image" 
    href="https://pub-da54bf79f89f4f2980788c758f380531.r2.dev/logo.webp"
    fetchpriority="high"
  >
  
  <!-- Critical CSS to prevent layout shifts -->
  <style>
    /* Reserve space for logo immediately */
    .logo-container {
      width: 2.5rem; /* w-10 */
      height: 2.5rem; /* h-10 */
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f3f4f6; /* Subtle background while loading */
      border-radius: 0.375rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    @media (min-width: 1024px) {
      .logo-container {
        width: 3rem; /* lg:w-12 */
        height: 3rem; /* lg:h-12 */
      }
    }
    
    .logo-container.loaded {
      background-color: transparent;
    }
    
    .logo-container.error {
      background-color: #fef2f2;
      border: 2px dashed #ef4444;
    }
    
    /* Prevent header layout shift */
    .header-fixed-height {
      min-height: 4rem;
    }
    
    @media (min-width: 1024px) {
      .header-fixed-height {
        min-height: 5rem;
      }
    }
    
    /* Logo image styling */
    .logo-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: opacity 0.3s ease;
    }
    
    .logo-image.loaded {
      opacity: 1;
    }
    
    .logo-image.error {
      opacity: 0;
    }
    
    /* Fallback styling */
    .logo-fallback {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
      color: #6b7280;
      transition: opacity 0.3s ease;
    }
    
    .logo-fallback.hidden {
      opacity: 0;
      pointer-events: none;
    }
  </style>
</svelte:head>

<svelte:window bind:scrollY on:keydown={handleKeydown} />

<!-- Main container -->
<div class="min-h-screen text-neutral-900 font-sans relative font-roboto-condensed selection:bg-[#56AAB7]/20 selection:text-black">
  <!-- Background layers -->
  <div class="fixed inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100"></div>

  <!-- Header -->
  <header class="header-fixed-height py-1 lg:py-3 fixed top-0 w-full px-4 lg:px-12 z-[300] transition-all duration-500 border-b {!scrolled ? 'bg-white/95 backdrop-blur-xl border-neutral-200/60 shadow-lg shadow-neutral-900/5' : 'bg-white/80 backdrop-blur-sm border-transparent'}">
    <div class="flex items-center justify-between max-w-7xl mx-auto relative h-full">
      <!-- Logo Section -->
      <div class="flex items-center space-x-3 group">
        <a href="{base}/" class="transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 rounded-lg p-1" aria-label="2WATUJU Homepage">
          <div class="logo-container" 
               class:loaded={logoLoaded} 
               class:error={logoError}>
            
            <!-- Main logo image -->
            <img 
              bind:this={logoElement}
              src="{base}/images/logo-48.webp" 
              srcset="{base}/images/logo-24.webp 24w, 
                      {base}/images/logo-48.webp 48w, 
                      {base}/images/logo-96.webp 96w"
              sizes="(max-width: 1023px) 40px, 48px"
              alt="2WATUJU Logo" 
              class="logo-image transition-all duration-300 group-hover:brightness-110"
              class:loaded={logoLoaded}
              class:error={logoError}
              width="48"
              height="48"
              on:load={handleLogoLoad}
              on:error={handleLogoError}
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </a>  
        
        <div class="hidden sm:block">
          <h1 class="text-xs lg:text-sm font-bold tracking-wider text-neutral-800 lg:hidden group-hover:text-[#56AAB7] transition-colors duration-300">2WATUJU</h1>
          <p class="text-xs text-neutral-600 lg:hidden group-hover:text-neutral-700 transition-colors duration-300">ARSITEKTUR & INTERIOR LAMPUNG</p>
        </div>
      </div>

      <!-- Center Title -->
      <a 
        class="tracking-wider absolute left-1/2 transform -translate-x-1/2 text-xs lg:text-sm font-medium text-neutral-700 mobile-hidden hover:text-[#56AAB7] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 rounded px-2 py-1 whitespace-nowrap"
        href="{base}/"
        aria-label="Scroll to top"
      >
        2WATUJU | ARSITEKTUR & INTERIOR LAMPUNG
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex gap-4 text-sm" role="navigation">
          <a
            href="{base}/about"
            data-sveltekit-prefetch
            class="group relative px-6 py-2 text-xs lg:text-sm font-medium text-neutral-700 hover:text-[#56AAB7] transition-all duration-300 border-2 border-transparent hover:border-[#56AAB7] rounded-full hover:bg-[#56AAB7]/5 hover:shadow-lg hover:shadow-[#56AAB7]/20 focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 whitespace-nowrap"
            aria-label="Tentang Kami"
          >
            <span class="relative z-10 tracking-wide group-hover:tracking-wider transition-all duration-300">
              TENTANG KAMI
            </span>
          </a>

        
        <a
          href="{base}/projects"
            data-sveltekit-prefetch
          class="group relative px-6 py-2 text-xs lg:text-sm font-medium bg-gradient-to-r from-[#56AAB7] to-[#4A9AA8] text-white rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#56AAB7]/30 hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 overflow-hidden whitespace-nowrap"
          aria-label="Proyek"
        >
          <span class="relative z-10 tracking-wide group-hover:tracking-wider transition-all duration-300">PROYEK</span>
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50"
        on:click={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
      >
        <div class="w-6 h-6 flex flex-col justify-center space-y-1">
          <span class="w-full h-0.5 bg-neutral-700 transition-all duration-300 {mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}"></span>
          <span class="w-full h-0.5 bg-neutral-700 transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : ''}"></span>
          <span class="w-full h-0.5 bg-neutral-700 transition-all duration-300 {mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}"></span>
        </div>
      </button>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
      <div class="lg:hidden mt-4 pb-4 border-t border-neutral-200">
        <nav class="flex flex-col space-y-2 pt-4" role="navigation">
          <a 
            class="group text-left px-4 py-3 text-neutral-700 hover:text-[#56AAB7] hover:bg-[#56AAB7]/5 rounded-lg transition-all duration-200"
            href="{base}/about"
            data-sveltekit-prefetch
            on:click={() => closeMobileMenu()}
          >
            <span class="group-hover:tracking-wider transition-all duration-200">TENTANG KAMI</span>
          </a>
          <a 
            class="group text-left px-4 py-3 text-neutral-700 hover:text-[#56AAB7] hover:bg-[#56AAB7]/5 rounded-lg transition-all duration-200"
            href="{base}/projects"
            data-sveltekit-prefetch
            on:click={() => closeMobileMenu()}
          >
            <span class="group-hover:tracking-wider transition-all duration-200">PROYEK</span>
          </a>
        </nav>
      </div>
    {/if}
  </header>

  <!-- Mobile Menu Overlay -->
  {#if mobileMenuOpen}
    <div 
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[250] lg:hidden"
      on:click={closeMobileMenu}
      role="button"
      tabindex="0"
      aria-label="Close mobile menu"
      on:keydown={(e) => e.key === 'Enter' && closeMobileMenu()}
    ></div>
  {/if}

  <!-- Page Content -->
  <main class="relative z-10 pt-16 md:pt-20">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="relative z-10 bg-gradient-to-t from-neutral-100 to-white text-black">
    <div class=" mx-auto px-4 xl:px-32 2xl:px-64 px-4 sm:px-8 py-12 lg:py-16 ">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <!-- Left Column - Company Info -->
        <div class="lg:col-span-6 space-y-6 border-b-2 border-b-neutral-200 pb-6 lg:pb-0 lg:border-b-0">
          <!-- Logo Section -->
          <div class="flex items-start space-x-4 group">
            <div class="w-28 h-28 bg-white rounded-xl p-3 flex-shrink-0  group-hover:scale-105 border border-none">
            <img 
              src="{base}/images/logo-112.webp" 
              srcset="{base}/images/logo-112.webp 112w, 
                      {base}/images/logo-224.webp 224w"
              sizes="112px"
              alt="2WATUJU Logo" 
              class="w-full h-full object-contain transition-all duration-300 group-hover:brightness-110"
              width="112"
              height="112"
              loading="lazy"
              decoding="async"
            />
            </div>
            <div class="text-sm leading-relaxed max-w-md">
              <p class="font-roboto text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300 text-justify">
                2Watuju mempunyai Visi dan Misi untuk mewujudkan hunian yang sesuai dengan kepribadianmu. Kami yakin bahwa setiap orang bisa mengekspresikan kisah hidupnya menjadi sebuah hunian idaman atau sebaliknya yaitu hunian yang menjadi awal mula dari cerita baru dan perjalanan yang akan dimulai.
              </p>
            </div>
          </div>
        </div>

        <!-- Middle Column - Social Media & Address -->
        <div class="lg:col-span-3 space-y-6 font-roboto-mono lg:justify-self-end">
          <div class="flex flex-col space-y-3"> 
            <h3 class="text-sm font-semibold tracking-wider text-neutral-800">Social Media</h3>
            <div class="flex flex-col space-y-2">
              {#each socialLinks as link}
                <a href={link.href} class="group inline-flex items-center space-x-2 hover:text-[#56AAB7] transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 rounded px-1 py-0.5">
                  <span class="group-hover:tracking-wider transition-all duration-200">{link.label}</span>
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                    {#if link.type === 'instagram'}
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    {:else if link.type === 'youtube'}
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    {:else if link.type === 'facebook'}
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    {/if}
                  </svg>
                </a>
              {/each}
            </div>
          </div>
          
          <div class="flex flex-col space-y-2 group">
            <h4 class="text-sm font-semibold font-roboto-mono text-neutral-800">Alamat</h4>
            <p class="text-sm font-roboto text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300 leading-relaxed">
              Jl. Cemara Raya No.1 Tj. Senang, Kec. Tj. Senang,<br />
              Kota Bandar Lampung, Lampung 35135
            </p>
          </div>
        </div>

        <!-- Right Column - Contact -->
        <div class="lg:col-span-3 space-y-6 lg:justify-self-end">
          <div class="flex flex-col space-y-2 group">
            <h3 class="text-sm font-semibold tracking-wider font-roboto-mono text-neutral-800">Kontak</h3>
            <a href={primaryPhone.telHref} class="text-sm font-roboto text-neutral-600 hover:text-[#56AAB7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 rounded px-1 py-0.5">
              {primaryPhone.display}
            </a>
          </div>
          
          <div class="space-y-2 group">
            <h4 class="text-sm font-semibold font-roboto-mono text-neutral-800">Email</h4>
            <a href={`mailto:${emailAddress}`} class="text-sm transition-colors duration-300 font-roboto text-neutral-600 hover:text-[#56AAB7] focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 rounded px-1 py-0.5 inline-block">
              {emailAddress}
            </a>
          </div>
        </div>
      </div>
    
    </div>
  </footer>

  <!-- Scroll to Top Button -->
  {#if scrollY > 300}
    <button 
      class="fixed bottom-8 right-8 w-12 h-12 bg-[#56AAB7] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#4A9AA8] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#56AAB7] focus:ring-opacity-50 z-50 animate-fadeIn"
      on:click={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    </button>
  {/if}
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  /* Smooth font rendering */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Responsive utilities */
  @media (max-width: 1023px) {
    .mobile-hidden {
      display: none !important;
    }
  }

  @media (min-width: 1024px) {
    .desktop-hidden {
      display: none !important;
    }
  }
  
  /* Focus styles for better accessibility */
  :global(*:focus) {
    outline: none;
  }
  
  /* Custom scrollbar */
  :global(::-webkit-scrollbar) {
    display: none;
  }
  
  :global(::-webkit-scrollbar-track) {
    display: none;
  }
  
  :global(::-webkit-scrollbar-thumb) {
    display: none;

  }
  
  :global(::-webkit-scrollbar-thumb:hover) {
        display: none;
  }
</style>
