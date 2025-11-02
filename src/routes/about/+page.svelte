<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import Cta from "$lib/components/Cta.svelte";
    import { base } from '$app/paths';
    import { teamMembers, contactEntries } from '$lib/data/company.js';

    let mounted = false;
    let heroInView = false;
    let teamInView = false;
    let contentInView = false;
    let scrollY = 0;

    onMount(() => {
      mounted = true;
      
      // Intersection Observer for scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'hero-section') heroInView = true;
            if (entry.target.id === 'team-section') teamInView = true;
            if (entry.target.id === 'content-section') contentInView = true;
          }
        });
      }, { threshold: 0.1 });

      const heroEl = document.getElementById('hero-section');
      const teamEl = document.getElementById('team-section');
      const contentEl = document.getElementById('content-section');

      if (heroEl) observer.observe(heroEl);
      if (teamEl) observer.observe(teamEl);
      if (contentEl) observer.observe(contentEl);

      return () => observer.disconnect();
    });

    // Parallax scroll handler
    $: parallaxOffset = scrollY * 0.5;
  </script>

  <svelte:head>
    <title>Tentang Kami - 2WATUJU Arsitektur & Interior Lampung</title>
    <meta name="description" content="Kenali lebih dalam tentang nilai-nilai yang membentuk 2WATUJU sebagai studio arsitektur & interior di Lampung." />
  </svelte:head>

  <svelte:window bind:scrollY />

  <!-- Main content container -->
  <div class="mx-auto overflow-x-hidden relative snap-y snap-mandatory">
    <!-- Opening Hero Section -->
    <section 
        id="younameit-section"
        class="xl:px-32 2xl:px-64 px-4 sm:px-8 flex justify-around gap-8 min-h-[90vh] overflow-hidden snap-center flex-col"
    >
        <!-- Enhanced logo with multiple animations -->
        <div class="flex items-center justify-center group/logo pt-12">
            <div class="relative">
                <!-- Rotating ring -->
                <div class="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 border border-[#56AAB7]/20 rounded-full animate-spin opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" style="animation-duration: 10s;"></div>
                
                <!-- Pulsing background -->
                <div class="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 bg-[#56AAB7]/5 rounded-full scale-0 group-hover/logo:scale-100 transition-transform duration-500"></div>
                
                <!-- Main logo - Responsive sizing -->
                <img 
                    src="{base}/images/logo-224.webp" 
                    alt="logo" 
                    class="flex object-contain w-64 sm:w-80 relative z-10 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:drop-shadow-lg filter group-hover/logo:brightness-110" 
                    width="224" 
                    height="224"
                />
                
                <!-- Floating particles -->
                <div class="absolute inset-0 pointer-events-none">
                    <div class="absolute top-8 right-8 w-2 h-2 bg-[#56AAB7] rounded-full opacity-0 group-hover/logo:opacity-100 transition-all duration-700 transform group-hover/logo:translate-y-[-1rem] group-hover/logo:translate-x-4"></div>
                    <div class="absolute bottom-12 left-12 w-1 h-1 bg-[#56AAB7] rounded-full opacity-0 group-hover/logo:opacity-100 transition-all duration-900 transform group-hover/logo:translate-y-4 group-hover/logo:translate-x-[-1rem]"></div>
                    <div class="absolute top-1/2 left-4 w-1.5 h-1.5 bg-[#56AAB7] rounded-full opacity-0 group-hover/logo:opacity-100 transition-all duration-800 transform group-hover/logo:translate-x-[-2rem]"></div>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-4 sm:gap-6">
            <!-- Main headline with better responsive scaling -->
            <h1 class="font-roboto font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 tracking-wide text-justify leading-tight">
              Rumah adalah tentang kita dan cerita yang selalu dikenang.
            </h1>
            <!-- Subtitle with improved readability -->
            <h2 class="font-roboto text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed text-pretty text-justify">
              Kami menyadari bahwa setiap orang punya cerita yang berbeda-beda tentang hidupnya. Tanpa kita sadari rumah adalah himpunan dari kisah dan cerita kita, menyatu dalam keseharian, terekam dalam setiap sudut ruangan. 2Watuju hadir, bukan hanya sekedar jadi arsitek—tapi teman yang akan menemani kamu, membersamai prosesmu, hingga rumah impian beserta ceritamu terwujud.
            </h2>
        </div>
    </section>

    <!-- Simple Hero Section -->
    <section 
      id="hero-section"
      class="hero-critical min-h-[40vh] xl:min-h-screen 2xl:px-64 pt-24 md:pt-12 pb-12 md:pb-24 flex justify-start items-center xl:justify-center flex-col relative w-full transition-all duration-300 snap-center"
    >
      <img 
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=600&q=80&fm=webp" 
        alt="Tentang kami banner" 
        class="w-full aspect-video" 
        height="644" 
        width="1196"
      />
    </section>

    <!-- Enhanced Team Section with Consistent Typography -->
    <section 
      id="team-section"
      class="xl:px-32 2xl:px-64 px-4 sm:px-8 flex flex-col gap-8 min-h-[90vh] relative overflow-hidden snap-center"
    >
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, #56AAB7 1px, transparent 0); background-size: 50px 50px; animation: grid-drift 20s linear infinite;"></div>
      </div>

      {#if teamInView}
        <!-- Header with improved responsive scaling -->
        <div 
          class="flex font-roboto-mono w-full justify-between items-end relative z-10"
          in:fly={{ y: 50, duration: 800, delay: 200 }}
        >
          <!-- Main title with better scaling -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl relative group/title font-bold tracking-wider">
            <span class="inline-block transition-all duration-300 hover:scale-105 hover:text-[#56AAB7] cursor-default">
              OUR TEAM
            </span>
            <!-- Animated underline -->
            <div class="absolute bottom-0 left-0 w-0 h-1 bg-[#56AAB7] transition-all duration-500 group-hover/title:w-full"></div>
          </h1>
          
          <!-- Brand text with consistent scaling -->
          <h2 
            class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-start font-bold uppercase relative group/brand hidden sm:block"
            in:fly={{ x: 50, duration: 600, delay: 400 }}
          >
            <span class="transition-all duration-300 group-hover/brand:text-[#56AAB7]">
              2Watuju<br/>Design
            </span>
          </h2>
        </div>

        <!-- Enhanced description with consistent font sizes -->
        <div 
            class="relative"
            in:fly={{ y: 30, duration: 700, delay: 600 }}
        >
            <!-- Intro paragraph with better responsive scaling -->
            <p class="font-roboto text-justify [text-justify:inter-word] 
                      text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                      leading-relaxed relative z-10 group/text 
                      hover:text-gray-700 transition-colors duration-300 mb-6">
              Perkenalkan kami, 2Watuju Design, sebuah Jasa Arsitektur yang bergerak pada ranah
              perancangan hunian di Bandar Lampung.
            </p>

            <!-- Main description with improved readability -->
            <p class="font-roboto text-justify [text-justify:inter-word] 
                      text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                      leading-relaxed mb-6">
              2Watuju mempunyai Visi dan Misi untuk mewujudkan hunian yang sesuai dengan
              kepribadianmu. Kami yakin bahwa setiap orang bisa mengekspresikan kisah
              hidupnya menjadi sebuah hunian idaman atau sebaliknya yaitu hunian yang
              menjadi awal mula dari cerita baru dan perjalanan yang akan dimulai. Untuk
              itu kami hadir untuk menemani, mengawal, dan membersamai perancangan rumah
              anda dari nol hingga menjadi hunian yang nyaman untuk anda.
            </p>

            <!-- Clean Statistics -->
            <div class="font-roboto-mono text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-12 space-y-1 text-gray-600">
              <div>10 Tahun</div>
              <div>Ratusan Desain</div>
              <div>Puluhan Terbangun</div>
            </div>

            <!-- Team and Contact Section - Clean minimalist approach -->
            <div class="mt-12 flex flex-col justify-between gap-8 lg:gap-12">
                <!-- Team Section -->
                <div class="flex-1">
                    <h3 class="font-roboto text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 text-gray-800">Tim Kecil Kami :</h3>
                    <div class="space-y-3 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                        {#each teamMembers as member, index}
                            <div
                                class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2"
                                class:border-b={index < teamMembers.length - 1}
                                class:border-gray-100={index < teamMembers.length - 1}
                            >
                                <span class="font-medium text-gray-800">{member.name}</span>
                                <span class="text-gray-600">({member.role})</span>
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Contact Section - Clean with minimal icons -->
                <div class="flex-1">
                    <h3 class="font-roboto text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 text-gray-800">Kontak :</h3>
                    <div class="space-y-3 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                        {#each contactEntries as entry, index}
                            <div
                                class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2"
                                class:border-b={index < contactEntries.length - 1}
                                class:border-gray-100={index < contactEntries.length - 1}
                            >
                                <span class="text-gray-800 flex items-center gap-2">
                                    {#if entry.type === 'whatsapp'}
                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-1.091-4.778-3.078-6.563-1.986-1.784-4.504-2.913-7.317-2.913-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.256-.897z"/>
                                        </svg>
                                    {:else if entry.type === 'instagram'}
                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    {:else if entry.type === 'facebook'}
                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    {:else if entry.type === 'youtube'}
                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    {:else if entry.type === 'website'}
                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"></path>
                                        </svg>
                                    {/if}
                                    {entry.label}
                                </span>
                                <a href={entry.href} class="hover:text-[#56AAB7] transition-colors">{entry.value}</a>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

      {/if}
    </section>

    <!-- Enhanced Content Section -->
    <section 
      id="content-section"
      class="xl:px-32 2xl:px-64 px-4 sm:px-8 snap-center"
    >
      {#if contentInView}
        <!-- CTA Section with entrance animation -->
        <div 
          class="py-20 flex flex-col gap-8 relative"
          in:scale={{ duration: 800, delay: 800, start: 0.9 }}
        >
          <Cta/>
        </div>
      {/if}
    </section>
  </div>

  <style>
    /* Custom animations and effects */
    @keyframes grid-drift {
      0% { transform: translateX(0) translateY(0); }
      100% { transform: translateX(50px) translateY(50px); }
    }
    
    /* Enhanced text selection */
    ::selection {
      background-color: rgba(86, 170, 183, 0.2);
      color: inherit;
    }
    
    /* Smooth scroll behavior */
    html {
      scroll-behavior: smooth;
    }
    
    /* Performance optimizations */
    .group\/image img,
    .group\/logo img {
      will-change: transform;
    }
    
    /* Enhanced focus states for accessibility */
    a:focus,
    button:focus {
      outline: 2px solid #56AAB7;
      outline-offset: 2px;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
