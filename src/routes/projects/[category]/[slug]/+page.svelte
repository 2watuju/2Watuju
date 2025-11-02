<!-- src/routes/projects/[slug]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import FeaturedProjects from '$lib/components/FeaturedProjects.svelte';
  import PanoramicViewer from '$lib/components/PanoramicViewer.svelte';
  import Cta from "$lib/components/Cta.svelte";
  import { getOrderedStats, getOrderedProjectDetails } from '$lib/data/projects.js';

  /** @type {import('./$types').PageData} */
  export let data;
  
  $: project = data.project;
  $: category = data.category;
  $: relatedProjects = data.relatedProjects;
  
  // NEW: Get ordered stats and project details
  $: orderedStats = getOrderedStats(project);
  $: orderedProjectDetails = getOrderedProjectDetails(project);
  
  let currentImageIndex = 0;
  let touchStates = new Map();
  
  // Image gallery (for now using the same image, but you can expand this)
  $: projectImages = [
    project.images.desktop,
    project.images.tablet,
    project.images.mobile
  ];
  
  onMount(() => {
    setupMobileTouch();
  });
  
  function setupMobileTouch() {
    const interactiveElements = document.querySelectorAll('.touch-interactive');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
      element.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    });
  }

  function handleViewAllProjects() {
    console.log('View all projects clicked');
    goto(`${base}/projects`);
  }

  function handleProjectClick(projectId) {
    console.log('Project clicked:', projectId);
    goto(`${base}/projects/${projectId}`);
  }

  function handleTouchStart(event) {
    const element = event.currentTarget;
    element.classList.add('touch-active');
    touchStates.set(element, true);
  }
  
  function handleTouchEnd(event) {
    const element = event.currentTarget;
    setTimeout(() => {
      element.classList.remove('touch-active');
      touchStates.delete(element);
    }, 150);
  }
  
  function handleBackToCategory() {
    goto(`${base}/projects/${project.categoryId}`);
  }
  
  function handleBackToProjects() {
    goto(`${base}/projects`);
  }
  
  function handleContactClick() {
    goto(`${base}/contact`);
  }
  
  function handleRelatedProjectClick(projectSlug) {
    goto(`${base}/projects/${project.categoryId}/${projectSlug}`);
  }
  
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % projectImages.length;
  }
  
  function prevImage() {
    currentImageIndex = currentImageIndex === 0 ? projectImages.length - 1 : currentImageIndex - 1;
  }
  
  function handleImageError(event) {
    event.target.src = `${base}/images/dummy-desktop-400.webp`;
  }

  function handleBackToHome() {
    goto(`${base}/`);
  }

  // NEW: Function to chunk array into groups for responsive layout
  function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
</script>

<svelte:head>
  <title>{project.title.replace('\n', ' ')} - 2WATUJU Architecture</title>
  <meta name="description" content="{project.description}" />
  <meta name="keywords" content="proyek {project.title.toLowerCase()}, arsitektur bandar lampung, {category.name.toLowerCase()}, 2watuju" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="{project.title.replace('\n', ' ')} - 2WATUJU Architecture" />
  <meta property="og:description" content="{project.description}" />
  <meta property="og:image" content="{project.images.desktop}" />
  <meta property="og:type" content="article" />
  
  <!-- Preload hero image -->
  <link rel="preload" as="image" href="{project.images.desktop}" fetchpriority="high">
</svelte:head>

<!-- Main content container -->
<div class="mx-auto overflow-x-hidden">
  <!-- Panoramic Hero Section -->
  <section class="relative pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
    <!-- Panoramic Viewer -->
    <div class="w-full">
      <PanoramicViewer 
        title={project.title.replace('\n', ' ')}
        subtitle="{category.name.toUpperCase()} | {project.year}"
        thumbnailUrl={project.images.desktop}
        panoramicData={project.panoramic || {}}
        hotspots={project.hotspots || []}
      />
    </div>

    <!-- Project Info -->
    <div class="flex flex-col sm:flex-row font-roboto-mono w-full justify-between items-start sm:items-center py-8 sm:py-12 border-b-2 border-gray-200 gap-4">
      <h1 class="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">{project.title.replace('\n', ' ')}</h1>
      <h2 class="uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600">{category.name} | {project.month} {project.year}</h2>
    </div>
  </section>
  
  <!-- Project Details Section -->
  <section class="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64 font-roboto-mono ">
    <div class="flex w-full border-b-2 border-gray-200 pb-8 sm:pb-12">
      <div class="max-w-5xl mx-auto flex flex-col gap-y-6 sm:gap-y-8 justify-center items-center w-full">
        
        <!-- UPDATED: Dynamic Project Details Grid -->
        {#each chunkArray(orderedProjectDetails, 2) as chunk}
          <div class="flex w-full flex-col gap-6 sm:flex-row sm:justify-between sm:gap-8"> <!-- Row container -->
            {#each chunk as detail}
              <div class="flex flex-col w-full sm:w-fit">
                <h1 class="uppercase font-bold text-xl sm:text-3xl">
                  {detail.label}
                </h1>
                <h2 class="text-base sm:text-xl">
                  {detail.value}
                </h2>
              </div>
            {/each}
            
            <!-- Fill empty space if odd number of items -->
            {#if chunk.length === 1}
              <div class="hidden sm:flex w-fit flex-col"></div>
            {/if}
          </div>
        {/each}
        
        <!-- UPDATED: Dynamic Project Statistics -->
        {#if orderedStats.length > 0}
          <div class="w-full pt-6 sm:pt-8 mt-6 sm:mt-8">
            <!-- Responsive grid for stats - Using dynamic chunks of 2 for mobile, 3 for desktop -->
            <div class="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
              <!-- Create 3 columns dynamically -->
              {#each chunkArray(orderedStats, Math.ceil(orderedStats.length / 3)) as column, columnIndex}
                <div class="flex flex-col gap-6 w-full sm:w-auto">
                  {#each column as stat}
                    <div class="flex flex-row items-center justify-start gap-3">
                      <div class="w-16 h-16 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={`${base}/icons/${stat.icon}`} 
                          alt="{stat.label} icon" 
                          class="object-contain w-16 h-16"
                          on:error={(e) => {
                            // Fallback to a default icon if the specific icon doesn't exist
                            e.target.src = `${base}/icons/default.svg`;
                          }}
                        >
                      </div>
                      <div class="flex flex-col font-roboto-mono">
                        <h1 class="font-bold text-base sm:text-lg leading-tight">{stat.label}</h1>
                        <h2 class="font-normal text-sm sm:text-base">{stat.value}</h2>
                      </div>
                    </div>
                  {/each}
                </div>
              {/each}
            </div>
          </div>
        {/if}

      </div>
    </div>

    <!-- Dynamic Project Content Sections -->
    <div class="flex w-full border-b-2 border-gray-200 py-8 sm:py-12 flex-col gap-12">
      {#if project.contentSections && project.contentSections.length > 0}
        {#each project.contentSections as section, index}
          <div class="flex w-full flex-col gap-6 sm:gap-8">
            <img 
              src={section.image} 
              alt={section.imageDescription || section.title} 
              class="object-cover flex aspect-video w-full shadow-lg rounded-sm"
              on:error={handleImageError}
            />
            
            <div class="space-y-4 sm:space-y-6">
              <h1 class="font-bold font-roboto-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {section.title}
              </h1>

              <div class="space-y-4 sm:space-y-6">
                <p class="text-pretty text-sm sm:text-base md:text-lg lg:text-xl font-roboto leading-relaxed text-justify">
                  {@html section.content}
                </p>
                
                {#if section.imageDescription}
                  <p class="text-xs sm:text-sm text-gray-600 italic font-roboto leading-relaxed">
                    {section.imageDescription}
                  </p>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <!-- Fallback content if no contentSections available -->
        <div class="flex w-full flex-col gap-6 sm:gap-8">
          <img 
            src={project.images.thumbnail} 
            alt="{project.title} main view" 
            class="object-cover flex aspect-video w-full shadow-lg rounded-sm"
            on:error={handleImageError}
          />
          
          <div class="space-y-4 sm:space-y-6">
            <h1 class="font-bold font-roboto-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Fasad Yang Mencerminkan Kehangatan
            </h1>

            <div class="space-y-4 sm:space-y-6">
              <p class="text-pretty text-sm sm:text-base md:text-lg lg:text-xl font-roboto leading-relaxed">
                {project.description}
              </p>
              
              <p class="text-pretty text-sm sm:text-base md:text-lg lg:text-xl font-roboto leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
              <p class="text-pretty text-sm sm:text-base md:text-lg lg:text-xl font-roboto leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>
  
  
  <section class="py-20 xl:px-32 2xl:px-64 px-4 sm:px-8 cta-section">
      <Cta/>
  </section>

  <section class="pb-20 xl:px-32 2xl:px-64 px-4 sm:px-8 cta-section">
      <FeaturedProjects 
        contentMode="nameOnly"
        onProjectClick={handleProjectClick}
        onViewAllProjects={handleViewAllProjects}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
  </section>

</div>

<style>
  /* Touch states for mobile */
  .touch-interactive.touch-active {
    transform: scale(0.98);
    opacity: 0.9;
  }
  
  /* Smooth transitions */
  .transition-all {
    transition: all 0.3s ease;
  }

  /* Enhanced hover effects */
  .group:hover .group-hover\:scale-105 {
    transform: scale(1.05);
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
