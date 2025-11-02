<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ArrowRight } from 'lucide-svelte';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  
  // Components
  import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
  import Cta from "$lib/components/Cta.svelte";
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  let cleanup: (() => void) | null = null;
  let touchStates = new Map();

  // Testimonials data
  const testimonials = [
    {
      text: "Tim 2WATUJU benar-benar memahami visi kami. Mereka tidak hanya merancang rumah, tapi menciptakan rumah impian yang sesuai dengan gaya hidup keluarga kami. Hasilnya melebihi ekspektasi!",
      name: "RIFKI HAWARI",
      role: "PENGUSAHA",
      initials: "RH",
      position: "right"
    },
    {
      text: "Proses kolaborasi dengan 2WATUJU sangat menyenangkan. Mereka mendengarkan setiap detail kebutuhan kami dan menghadirkan solusi arsitektur yang cerdas dan fungsional untuk praktik medis saya.",
      name: "DR. AMANDA SARI",
      role: "DOKTER SPESIALIS",
      initials: "AS",
      position: "right"
    },
    {
      text: "Sebagai pengusaha lokal, saya sangat mengapresiasi pendekatan 2WATUJU yang mengintegrasikan nilai-nilai budaya Lampung dalam desain modern. Rumah kami menjadi kebanggaan keluarga.",
      name: "BUDI TANOTO",
      role: "WIRASWASTA",
      initials: "BT",
      position: "right"
    },
    {
      text: "Rumah yang dirancang 2WATUJU tidak hanya cantik secara visual, tapi juga sangat nyaman untuk aktivitas sehari-hari. Setiap sudut rumah memiliki fungsi yang optimal untuk keluarga kami.",
      name: "LINDA MARIA",
      role: "EDUCATOR",
      initials: "LM",
      position: "right"
    }
  ];

  onMount(() => {
    // Delay animations until fonts are loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initializeAnimations();
      });
    } else {
      // Fallback for browsers without font loading API
      setTimeout(initializeAnimations, 100);
    }
    
    setupMobileTouch();
  });

  onDestroy(() => {
    if (cleanup) {
      cleanup();
    }
  });

  function initializeAnimations() {
    // Hero section animations with reduced motion
    const heroImageTl = gsap.timeline();
    heroImageTl
      .fromTo('.hero-image', 
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo('.hero-buttons', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

    // About section animations
    gsap.fromTo('.about-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.about-cards',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-cards',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Process section animations
    gsap.fromTo('.process-step',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process-step',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Testimonials animation
    gsap.fromTo('.speech-bubble',
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.speech-bubble',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    cleanup = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }

  function setupMobileTouch() {
    const interactiveElements = document.querySelectorAll('.touch-interactive');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
      element.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    });
  }

  function handleTouchStart(event: TouchEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('touch-active');
    touchStates.set(element, true);
  }

  function handleTouchEnd(event: TouchEvent) {
    const element = event.currentTarget as HTMLElement;
    setTimeout(() => {
      element.classList.remove('touch-active');
      touchStates.delete(element);
    }, 150);
  }

  // Event handlers
  function handleWorkflowClick() {
    console.log('Workflow clicked');
    // Navigate to workflow page or scroll to process section
    document.querySelector('.process-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleConsultationClick() {
    console.log('Consultation clicked');
    // Navigate to consultation page or scroll to CTA
    document.querySelector('.cta-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleProjectClick(projectSlug: string) {
    console.log('Project clicked:', projectSlug);
    // Navigate to project detail page
    goto(`${base}/projects/${projectSlug}`);
  }

  function handleViewAllProjects() {
    console.log('View all projects clicked');
    // Navigate to projects page
    goto(`${base}/projects`);
  }

  function handleImageLoad() {
    console.log('✅ Hero image loaded successfully');
  }

  function handleImageError() {
    console.error('❌ Hero image failed to load');
  }
</script>

<svelte:head>
  <title>2WATUJU - Arsitektur & Interior Lampung</title>
  <meta name="description" content="Dirancang secara kolaboratif dan penuh makna, dari awal hingga generasi berikutnya. Studio arsitektur terpercaya di Lampung dengan pendekatan personal dan premium." />
  <meta name="keywords" content="arsitektur lampung, interior design, rumah modern, desain rumah, arsitek lampung, 2watuju" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="2WATUJU - Arsitektur & Interior Lampung" />
  <meta property="og:description" content="Dirancang secara kolaboratif dan penuh makna, dari awal hingga generasi berikutnya." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://2watuju.com" />
  
  <!-- Critical resource hints for faster loading -->
  <link rel="preload" as="image" href="{base}/images/hero-desktop-1200.webp" fetchpriority="high">
  <link rel="dns-prefetch" href="https://images.unsplash.com">
  
  <!-- Critical inline CSS for immediate rendering -->
  <style>
    .hero-critical {
      background-color: #56AAB7;
      min-height: 60vh;
      contain: layout style paint;
    }
    
    .hero-image-container {
      position: relative;
      width: 100%;
      height: auto;
      contain: layout style paint;
    }
    
    .hero-image-critical {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
    }
    
    @media (min-width: 1280px) {
      .hero-critical {
        min-height: 100vh;
      }
    }

    /* Optimized speech bubble styles */
    .speech-bubble::before,
    .speech-bubble::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
    }

    .speech-right::before {
      right: 40px;
      bottom: -40px;
      border: 20px solid;
      border-color: #56AAB7 #56AAB7 transparent transparent;
    }

    .speech-right::after {
      right: 43px;
      bottom: -34px;
      border: 18px solid;
      border-color: #fff #fff transparent transparent;
    }

    .speech-left::before {
      left: 40px;
      bottom: -40px;
      border: 20px solid;
      border-color: #56AAB7 transparent transparent #56AAB7;
    }

    .speech-left::after {
      left: 43px;
      bottom: -34px;
      border: 18px solid;
      border-color: #fff transparent transparent #fff;
    }

    @media (max-width: 768px) {
      .speech-right::before,
      .speech-left::before {
        left: 30px;
        right: 30px;
      }
      
      .speech-right::after,
      .speech-left::after {
        left: 33px;
        right: 33px;
      }
    }

        /* Offset for sections to account for fixed header */
    section[id] {
      scroll-margin-top: 100px; /* Adjust based on your header height */
    }
    
    /* Better scroll padding for mobile */
    @media (max-width: 768px) {
      section[id] {
        scroll-margin-top: 80px;
      }
    }
  </style>
</svelte:head>

<!-- Main content container -->
<div class="mx-auto overflow-x-hidden">
  <!-- Hero Section with immediate image visibility -->
  <section class="hero-critical min-h-[78vh] sm:min-h-[85vh] xl:min-h-screen 2xl:px-64 pt-20 sm:pt-24 md:pt-12 pb-12 md:pb-24 flex justify-start items-center xl:justify-center flex-col relative w-full transition-all duration-300 px-4 sm:px-6 md:px-8">
    
    <!-- Image Container - Simplified, no layering -->
    <div class="hero-image-container w-full max-w-[420px] sm:max-w-3xl md:max-w-5xl xl:max-w-none hero-image mx-auto">
      <!-- Main Image - Direct render, no placeholder -->
      <picture>
        <!-- Mobile screens -->
        <source 
          media="(max-width: 767px)" 
          srcset="{base}/images/hero-mobile-400.webp 400w,
                  {base}/images/hero-mobile-800.webp 800w"
          sizes="100vw"
        />
        
        <!-- Tablet screens -->
        <source 
          media="(max-width: 1023px)" 
          srcset="{base}/images/hero-tablet-800.webp 800w,
                  {base}/images/hero-tablet-1200.webp 1200w"
          sizes="100vw"
        />
        
        <!-- Desktop screens -->
        <source 
          media="(min-width: 1024px)" 
          srcset="{base}/images/hero-desktop-1200.webp 1200w,
                  {base}/images/hero-desktop-1600.webp 1600w,
                  {base}/images/hero-desktop-2000.webp 2000w"
          sizes="(max-width: 1400px) 1200px,
                 (max-width: 1800px) 1600px,
                 2000px"
        />
        
        <!-- Fallback image -->
        <img 
          src="{base}/images/hero-desktop-1200.webp" 
          alt="2WATUJU Architecture Hero" 
          class="object-contain w-full max-h-[60vh] sm:max-h-none"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          on:load={handleImageLoad}
          on:error={handleImageError}
        />
      </picture>
    </div>
    
    <!-- Buttons with better loading state -->
    <div class="hero-buttons flex w-full flex-col sm:flex-row justify-center items-stretch sm:items-center gap-6 sm:gap-16 lg:gap-24 px-2 sm:px-4 mt-10 sm:mt-12" style="min-height: 6rem;">
      <a 
        class="flex w-full sm:w-auto cursor-pointer font-roboto-condensed text-white gap-4 sm:gap-6 items-center justify-between sm:justify-start group p-3 sm:p-2 rounded-lg transition-transform duration-200 hover:scale-105 touch-interactive border border-white/20 sm:border-transparent"
          href="#alur"
          >
        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#56AAB7] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
          <ArrowRight class="group-hover:rotate-12 duration-300 w-5 h-5 sm:w-7 sm:h-7" />
        </div>
        <div class="flex flex-col text-sm sm:text-lg text-left">
          <span class="font-bold">ALUR KERJA</span>
          <span>PROYEK KITA</span>
        </div>
      </a>

      <a href="wh" 
        class="flex w-full sm:w-auto font-roboto-condensed text-white gap-4 sm:gap-6 items-center justify-between sm:justify-start group p-3 sm:p-2 rounded-lg transition-transform duration-200 hover:scale-105 touch-interactive border border-white/20 sm:border-transparent"
        on:click={handleConsultationClick}
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}>
        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#56AAB7] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
          <ArrowRight class="group-hover:rotate-12 duration-300 w-5 h-5 sm:w-7 sm:h-7" />
        </div>
        <div class="flex flex-col text-sm sm:text-lg text-left">
            <span>JADWALKAN</span>
          <span class="font-bold">KONSULTASI</span>
        </div>
      </a>
    </div>
  </section>

  <!-- About Section with CLS prevention -->
  <section class="py-20 xl:px-32 2xl:px-64 px-4 sm:px-8" style="contain: layout; min-height: 60vh;">
    <div class="flex w-full flex-col gap-16 sm:gap-24">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-12 mx-6 md:mx-0">
        <!-- Main Title with reserved space -->
        <div class="lg:flex-1" style="contain: layout;">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl about-title leading-tight hover:text-[#56AAB7] active:text-[#56AAB7] transition-colors duration-500 cursor-default" style="min-height: 8rem;">
            DIRANCANG SECARA KOLABORATIF <br/>
            <span class="tracking-wide">DAN PENUH MAKNA.— DARI AWAL</span><br/> 
            HINGGA GENERASI BERIKUTNYA.
          </h1>
        </div>

        <!-- About Cards with fixed dimensions -->
        <div class="flex flex-col sm:flex-row gap-12 ">
          <div class="flex flex-col gap-4 w-72 about-cards group touch-interactive" style="contain: layout; min-height: 16rem;">
            <h3 class="font-chivo-mono text-balance uppercase tracking-wide group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300">
              LOCAL INTELLIGENCE
            </h3>
            <div class="flex flex-col gap-2 text-balance text-justify">
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                Setiap ruang kami hadirkan bukan
                hanya untuk ditinggali, tapi juga 
                menyatu dengan nilai dan narasi
                lokal yang hidup di sekitarnya.
              </p>
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                Dengan mengintegrasikan gaya
                hidup setiap keluarga ke dalam
                setiap rumah yang kami rancang
                terutama Masyarakat Lampung.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 w-72 about-cards group touch-interactive" style="contain: layout; min-height: 16rem;">
            <h3 class="font-chivo-mono text-balance uppercase tracking-wide group-hover:text-[#56AAB7] group-active:text-[#56AAB7] transition-colors duration-300">
              PREMIUM & PERSONAL
            </h3>
            <div class="flex flex-col gap-2 text-balance  text-justify">
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                Kami memulai setiap rancangan
                dengan mendengarkan seluruh
                kisah dan Cerita. 
              </p>
              <p class="font-roboto text-sm leading-relaxed group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                Bukan sekadar sebagai arsitek,
                tapi sebagai Sahabat Anda yang
                berjalan bersama sejak awal
                hingga rumah itu hidup sepenuhnya.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Projects Component -->
      <FeaturedProjects 
        contentMode="full"
        onProjectClick={handleProjectClick}
        onViewAllProjects={handleViewAllProjects}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  </section>

  <!-- PROSES KERJA Section with Responsive Connected Lines -->
  <section class="py-20 xl:px-32 2xl:px-64 px-4 sm:px-8 bg-[#56AAB7] text-white process-section" id="alur">
    <div class="flex flex-col h-fit items-stretch w-full lg:flex-row gap-8 lg:gap-12">
      <!-- Left Column - Process Steps -->
      <div class="space-y-8 min-w-sm flex flex-col">
        <h2 class="text-4xl sm:text-5xl font-bold font-roboto-condensed mb-12">
          PROSES KERJA
        </h2>
        
        <div class="relative flex flex-col h-full justify-between overflow-y-hidden">
          {#each [
            { number: '1', title: 'Konsultasi' },
            { number: '2', title: 'Eksplorasi' },
            { number: '3', title: 'Rencana Desain Awal' },
            { number: '4', title: 'Development' },
            { number: '5', title: 'Finalisasi' },
            { number: '6', title: 'Handling' }
          ] as step, index}
            <div class="flex items-center group process-step touch-interactive relative" 
                 style="animation-delay: {index * 0.1}s;"
                 class:mb-12={index < 5}
                 class:lg:mb-0={index < 5}
                 class:mb-0={index === 5}
                 on:touchstart={handleTouchStart}
                 on:touchend={handleTouchEnd}
                 on:touchcancel={handleTouchEnd}>
              
              <!-- Number Circle -->
              <div class="process-number w-12 h-12 sm:w-16 sm:h-16 border-2 border-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold group-hover:bg-white group-hover:text-[#56AAB7] group-active:bg-white group-active:text-[#56AAB7] transition-all duration-300 bg-[#56AAB7] relative z-10 mr-4 sm:mr-6 flex-shrink-0">
                {step.number}
                
                <!-- Vertical Connecting Line - Connected to circle center -->
                {#if index < 5}
                  <div class="absolute left-1/2 top-full w-0.5 bg-white/40 z-0 process-line -translate-x-0.5" 
                       style="height: 6rem; animation-delay: {(index + 1) * 0.2}s;">
                  </div>
                {/if}
              </div>
              
              <!-- Step Title -->
              <h3 class="process-title text-xl sm:text-2xl font-medium font-roboto group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-300">
                {step.title}
              </h3>
            </div>
          {/each}
        </div>
      </div>

      <!-- Vertical Divider -->
      <div class="hidden lg:flex w-0.5 bg-white/30 self-stretch min-h-96"></div>
      
      <!-- Mobile Horizontal Divider -->
      <div class="lg:hidden w-full h-0.5 bg-white/30 my-8"></div>
      
      <!-- Right Column - Deliverables -->
      <div class="space-y-8 flex flex-col w-full">
        <h2 class="text-3xl sm:text-4xl font-bold font-roboto-condensed mb-12">
          HASIL PRODUK<br/>
          YANG ANDA DAPAT
        </h2>
        
        <!-- Deliverables Grid -->
        <div class="flex flex-col w-full font-roboto-condensed text-base sm:text-lg lg:text-base xl:text-lg 2xl:text-xl gap-2">
          <!-- First Row -->
          <div class="flex gap-2 w-full h-fit">
            <!-- Square Box -->
            <div class="flex-1 aspect-square flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-1 sm:gap-y-2 items-start justify-center p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Desain 3d <br/>Interior</h2>
                <img src="{base}/icons/001_computer.webp" alt="Computer Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            <!-- Square Box -->
            <div class="flex-1 aspect-square flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-1 sm:gap-y-2 items-start justify-center p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Desain 3d<br/>Eksterior</h2>
                <img src="{base}/icons/029_computer_2.webp" alt="Computer 2 Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            <!-- Wide Box (2x width) -->
            <div class="flex-2 self-stretch flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col items-start justify-center gap-y-1 sm:gap-y-2 p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Hasil Cetak Printout <br/>a3 Berwarna</h2>
                <img src="{base}/icons/006_plan.webp" alt="Plan Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
          </div>

          <!-- Second Row -->
          <div class="flex gap-2 w-full">
            <!-- Three equal square boxes -->
            <div class="flex-1 aspect-square flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-1 sm:gap-y-2 items-start justify-center p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Gambar Kerja<br/>Perencanaan</h2>
                <img src="{base}/icons/033_compass_1.webp" alt="Compass Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            
            <div class="flex-1 aspect-square flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-1 sm:gap-y-2 items-start justify-center p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Rencana Anggaran<br/>Biaya</h2>
                <img src="{base}/icons/043_project_2.webp" alt="Project Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            
            <div class="flex-1 aspect-square flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-1 sm:gap-y-2 items-start justify-center p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Perhitungan<br/>Struktur</h2>
                <img src="{base}/icons/041_workspace.webp" alt="Workspace Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
          </div>

          <!-- Third Row -->
          <div class="flex gap-2 w-full h-fit">
            <!-- Wide Box (2x width) -->
            <div class="flex-2 self-stretch flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                style="flex: 2;"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col items-start justify-center gap-y-1 sm:gap-y-2 p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Soft File Dokumen<br/>Perencanaan</h2>
                <img src="{base}/icons/024_contract.webp" alt="Contract Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>

            <!-- Square Box -->
            <div class="flex-1 aspect-square flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-1 sm:gap-y-2 items-start justify-center p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Animasi<br/>Video</h2>
                <img src="{base}/icons/018_computer_1.webp" alt="Computer 1 Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
            
            <!-- Square Box -->
            <div class="flex-1 aspect-square flex items-center justify-start border-2 border-white rounded-md hover:bg-white/10 transition-colors duration-300 cursor-pointer min-w-0"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
                on:touchcancel={handleTouchEnd}>
              <div class="flex flex-col gap-y-1 sm:gap-y-2 items-start justify-center p-1 sm:p-2 lg:p-2 xl:p-3 w-full">
                <h2 class="uppercase leading-tight text-xs sm:text-sm lg:text-base">Katalog<br/>Desain 3D</h2>
                <img src="{base}/icons/026_house_plan_2.webp" alt="House Plan Icon" class="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 object-contain"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section with Optimized Tailwind and Loop -->
  <section class="sm:pt-20 xl:px-32 2xl:px-64 px-4 sm:px-8 bg-gray-50 cta-section">
    <div class="w-full mx-auto flex flex-col gap-6">
      <!-- Testimonials Grid with Loop -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {#each testimonials as testimonial, index}
          <div 
            class="speech-bubble speech-{testimonial.position} relative max-w-full text-left leading-relaxed mt-10 bg-white border border-[#56AAB7] rounded-3xl p-8 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 touch-interactive"
            on:touchstart={handleTouchStart}
            on:touchend={handleTouchEnd}
            on:touchcancel={handleTouchEnd}
          >
            <div class="mb-6">
              <p class="font-roboto text-[#56AAB7] m-0 text-xs sm:text-md lg:text-lg">
                "{testimonial.text}"
              </p>
            </div>
            <div class="flex items-center gap-4 pt-4 border-t-2 border-gray-100">
              <div class="w-12 h-12 bg-[#56AAB7] rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                {testimonial.initials}
              </div>
              <div>
                <h4 class="font-roboto-mono font-semibold text-[#56AAB7] m-0 text-sm">
                  {testimonial.name}
                </h4>
                <p class="font-roboto text-[#56AAB7] text-xs mt-1 m-0">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>

    </div>
  </section>
  <section class="sm:pb-20 xl:px-32 2xl:px-64 sm:px-8 bg-gray-50 cta-section">
      <Cta/>
  </section>
</div>

<style>
  /* Ensure proper aspect ratio on small screens */
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  
  /* Fallback for browsers that don't support aspect-ratio */
  @supports not (aspect-ratio: 1 / 1) {
    .aspect-square::before {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
    
    .aspect-square {
      position: relative;
    }
    
    .aspect-square > div {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  
  /* Minimum sizes for very small screens */
  @media (max-width: 480px) {
    .aspect-square {
      min-height: 80px;
    }
  }
  
  @media (min-width: 481px) and (max-width: 640px) {
    .aspect-square {
      min-height: 100px;
    }
  }

  /* Line clamp utility */
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Performance optimizations */
  .contain-layout {
    contain: layout style paint;
  }
  
  /* Mobile optimizations */
  @media (max-width: 640px) {
    .hero-section {
      min-height: 50vh;
    }
    
    .hero-buttons-container {
      min-height: 5rem;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Touch states for mobile */
  .touch-interactive.touch-active {
    transform: scale(0.98);
    opacity: 0.9;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .group\/section:hover .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  /* Text selection styling */
  ::selection {
    background-color: rgba(255, 255, 255, 0.3);
    color: inherit;
  }
  
  /* Smooth cursor interactions */
  .group\/collab:hover {
    cursor: default;
  }
  
  .group\/button:hover {
    cursor: pointer;
  }
</style>
