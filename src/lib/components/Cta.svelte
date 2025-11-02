<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import { whatsappCTA } from '$lib/data/company.js';
  export let className = '';

  const whatsappHref = `https://wa.me/${whatsappCTA.waNumber}?text=${encodeURIComponent(whatsappCTA.defaultMessage)}`;

</script>

<div class={`relative overflow-hidden bg-[#56AAB7] min-h-[20rem] flex items-center justify-center group/section ${className}`}>
  <!-- Animated background elements -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
    <div class="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white rounded-full blur-lg animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full blur-md animate-pulse" style="animation-delay: 2s;"></div>
  </div>

  <!-- Main content container -->
  <div class="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center px-6 lg:px-12 py-12">
    
    <!-- Enhanced Text with Background Animation -->
    <div class="text-center lg:text-left">
      <h1 class="font-roboto text-4xl sm:text-5xl lg:text-7xl text-white leading-none select-none">
        <!-- First line with slide-in background -->
        <span class="inline-block relative overflow-hidden">
          <span class="inline-block transform transition-all duration-700 ease-out group-hover/section:translate-y-0 translate-y-0">
            SIAP UNTUK
          </span>
        </span>
        <br/>
        
        <!-- Second line with special effects -->
        <span class="inline-block relative overflow-hidden group/collab overflow-visible">
          <span class="inline-block transform transition-all duration-500 ease-out hover:scale-105 hover:text-[#f0f9ff] cursor-default relative z-10">
            KOLABORASI
          </span>
          
          <!-- Animated question mark -->
          <span class="inline-block ml-2 transform transition-all duration-300 ease-out group-hover/collab:scale-125 group-hover/collab:rotate-12 hover:animate-bounce cursor-default">
            ?
          </span>
        </span>
      </h1>
    </div>

    <!-- Enhanced Button with Multiple Animations -->
    <div class="relative group/button">
          <!-- Ripple effect background -->
          <div class="absolute inset-0 rounded-full bg-white opacity-0 transform scale-75 transition-all duration-300 group-hover/button:opacity-30 group-hover/button:scale-110 animate-pulse"></div>
          
          <!-- Main button -->
          <a 
            href={whatsappHref}
            class="relative z-10 flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white hover:bg-[#56AAB7] border-4 border-transparent hover:border-white transition-all duration-300 ease-out transform hover:scale-110 hover:rotate-12 group/arrow shadow-lg hover:shadow-2xl"
            aria-label="Start Collaboration"
          >
            <!-- Arrow with enhanced animations -->
            <ArrowRight 
              class="w-8 h-8 lg:w-10 lg:h-10 text-[#56AAB7] group-hover/arrow:text-white transition-all duration-300 transform group-hover/button:translate-x-1 group-hover/button:scale-110" 
            />
            
            <!-- Rotating border effect -->
            <div class="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 animate-spin" style="animation-duration: 3s;"></div>
          </a>
          
          <!-- Floating particles effect -->
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover/button:opacity-100 transition-all duration-500 transform group-hover/button:translate-y-[-0.5rem] group-hover/button:translate-x-2"></div>
            <div class="absolute bottom-3 left-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover/button:opacity-100 transition-all duration-700 transform group-hover/button:translate-y-2 group-hover/button:translate-x-[-0.5rem]" style="transition-delay: 100ms;"></div>
            <div class="absolute top-1/2 left-[-0.5rem] w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover/button:opacity-100 transition-all duration-600 transform group-hover/button:translate-x-[-1rem]" style="transition-delay: 200ms;"></div>
          </div>
    </div>
  </div>

      <!-- Enhanced corner decorations -->
      <!-- <div class="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white opacity-30 transform transition-all duration-500 group-hover/section:opacity-60 group-hover/section:scale-110"></div>
      <div class="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white opacity-30 transform transition-all duration-500 group-hover/section:opacity-60 group-hover/section:scale-110"></div>
      <div class="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white opacity-30 transform transition-all duration-500 group-hover/section:opacity-60 group-hover/section:scale-110"></div>
      <div class="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white opacity-30 transform transition-all duration-500 group-hover/section:opacity-60 group-hover/section:scale-110"></div> -->
</div>
