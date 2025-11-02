<!-- Clean PannellumPanoramicViewer.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Maximize, RotateCcw, Home, Minimize, MousePointer, Eye, ZoomIn, ZoomOut, Compass, Info, Navigation, AlertTriangle,ToggleLeft,ToggleRight, Menu, X } from 'lucide-svelte';
  import { base } from '$app/paths';

  // Props
  export let title = "MODERN HOUSE";
  export let subtitle = "JAPANDI STYLE | 2025";
  export let thumbnailUrl = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop";
  export let panoramicData = {
    outside: 'assets/panorama/2.png',
    courtyard: 'assets/panorama/5.png',
    bedroom: 'assets/panorama/3.png',
    terrace: 'assets/panorama/4.png'
  };
  export let hotspots = [
    {
      x: 79.02,
      y: 51.94,
      scene: "outside",
      label: "Enter House",
      type: "nav",
      targetScene: "courtyard",
      icon: "door"
    }
  ];

  // State
  let isPanoramicMode = false;
  let isLoading = false;
  let loadingProgress = 0;
  let error = null;
  let containerRef;
  let pannellumContainer;
  let currentScene = 'outside';
  let isFullscreen = false;
  let showHotspots = true;
  let showControls = true;
  let showAllControls = false; // Start with controls hidden on mobile
  let autoRotate = false;
  let mobileMenuOpen = false;
  let windowWidth;

  // Pannellum viewer instance
let viewer = null;
let pannellumLoaded = false;
const panoramaImageCache = new Map();

  // Helper function to resolve image paths
  const resolveImagePath = (imagePath) => {
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${base}/${cleanPath}`;
  };

  // Create resolved panoramic data
  $: resolvedPanoramicData = Object.fromEntries(
    Object.entries(panoramicData).map(([key, value]) => [key, resolveImagePath(value)])
  );
  $: resolvedThumbnailUrl = resolveImagePath(thumbnailUrl);

  // Check if mobile
  $: isMobile = windowWidth < 768;

  // Scene names
  const sceneNames = {
    outside: 'Outside View',
    courtyard: 'Courtyard',
    bedroom: 'Bedroom',
    terrace: 'Terrace',
    livingRoom: 'Living Room',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    poolArea: 'Pool Area',
    diningRoom: 'Dining Room',
    masterBedroom: 'Master Bedroom',
    studyRoom: 'Study Room',
    mainArea: 'Main Area',
    mezzanine: 'Mezzanine',
    grandHall: 'Grand Hall',
    ballroom: 'Ballroom',
    library: 'Library',
    masterSuite: 'Master Suite',
    garden: 'Garden',
    solarDeck: 'Solar Deck',
    verticalGarden: 'Vertical Garden',
    wineCellar: 'Wine Cellar',
    genkan: 'Genkan (Entrance)',
    teaRoom: 'Tea Room',
    zenGarden: 'Zen Garden',
    tatamiRoom: 'Tatami Room'
  };

  // Load Pannellum library from CDN
  const loadPannellum = () => {
    return new Promise((resolve, reject) => {
      if (window.pannellum) {
        resolve();
        return;
      }

      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
      document.head.appendChild(cssLink);

      // Load JavaScript
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
      script.onload = () => {
        pannellumLoaded = true;
        resolve();
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.head.appendChild(script);
    });
  };

  // Enhanced hotspot creation function
  function createCustomHotspot(hotSpotDiv, args) {
    const { label, type, targetSceneKey } = typeof args === 'object' ? args : { label: args, type: 'info', targetSceneKey: '' };
    
    hotSpotDiv.classList.add('custom-tooltip');
    
    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    `;
    
    if (type === 'nav') {
        iconContainer.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
            </svg>
        `;
        // Glass morphism for navigation
        hotSpotDiv.style.background = `
            linear-gradient(135deg, rgba(86, 170, 183, 0.3), rgba(74, 154, 166, 0.2)),
            rgba(255, 255, 255, 0.1)
        `;
        hotSpotDiv.style.backdropFilter = 'blur(10px)';
        hotSpotDiv.style.webkitBackdropFilter = 'blur(10px)';
        hotSpotDiv.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        hotSpotDiv.style.borderRadius = '12px';
        hotSpotDiv.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        hotSpotDiv.style.cursor = 'pointer';
    } else {
        iconContainer.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
        `;
        // Glass morphism for info
        hotSpotDiv.style.background = `
            linear-gradient(135deg, rgba(86, 170, 183, 0.3), rgba(74, 154, 166, 0.2)),
            rgba(255, 255, 255, 0.1)
        `;
        hotSpotDiv.style.backdropFilter = 'blur(10px)';
        hotSpotDiv.style.webkitBackdropFilter = 'blur(10px)';
        hotSpotDiv.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        hotSpotDiv.style.borderRadius = '12px';
        hotSpotDiv.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
    }
    
    hotSpotDiv.appendChild(iconContainer);
    
    var span = document.createElement('span');
    span.innerHTML = label;
    hotSpotDiv.appendChild(span);
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2+20 + 'px';
    span.style.marginTop = -span.scrollHeight - 62 + 'px';
    
    if (type === 'nav' && targetSceneKey) {
        hotSpotDiv.onclick = (e) => {
            e.stopPropagation();
            navigateToScene(targetSceneKey);
        };
    }
  }

  // Get hotspots for current scene
  const getHotspotsForScene = (sceneKey) => {
    return hotspots.filter(hotspot => hotspot.scene === sceneKey);
  };

  const preloadPanoramicImages = async (sceneEntries) => {
    const total = sceneEntries.length;
    if (total === 0) return;

    let loadedCount = 0;

    const updateProgress = () => {
      const baseProgress = 10;
      const span = 40;
      loadingProgress = baseProgress + Math.round((loadedCount / total) * span);
    };

    const loadImage = (sceneKey, imageUrl) => {
      return new Promise((resolve, reject) => {
        if (!imageUrl) {
          loadedCount += 1;
          updateProgress();
          return resolve();
        }

        if (panoramaImageCache.has(imageUrl)) {
          loadedCount += 1;
          updateProgress();
          return resolve();
        }

        const img = new Image();
        img.onload = () => {
          panoramaImageCache.set(imageUrl, true);
          loadedCount += 1;
          updateProgress();
          resolve();
        };

        img.onerror = () => {
          reject(new Error(`Failed to preload scene "${sceneKey}".`));
        };

        img.src = imageUrl;

        if (img.complete && img.naturalWidth > 0) {
          img.onload();
        }
      });
    };

    for (const [sceneKey, imageUrl] of sceneEntries) {
      await loadImage(sceneKey, imageUrl);
    }
  };

  // Initialize Pannellum viewer
  const initPannellum = async () => {
    try {
      isLoading = true;
      loadingProgress = 0;
      error = null;

      // Load Pannellum library
      await loadPannellum();
      loadingProgress = 40;

      const sceneEntries = Object.entries(resolvedPanoramicData);
      if (sceneEntries.length === 0) {
        throw new Error('No panoramic scenes available');
      }

      await preloadPanoramicImages(sceneEntries);
      loadingProgress = Math.max(60, loadingProgress);

      // Create scenes configuration
      const scenes = {};
      const sceneKeys = Object.keys(resolvedPanoramicData);

      for (const [sceneKey, imageUrl] of sceneEntries) {
        const sceneHotspots = getHotspotsForScene(sceneKey);
        
        const pannellumHotspots = showHotspots ? sceneHotspots.map((hotspot, index) => {
          const yaw = (hotspot.x / 100) * 360 - 180;
          const pitch = 90 - (hotspot.y / 100) * 180;
          
          return {
            id: `hotspot_${sceneKey}_${index}`,
            pitch: pitch,
            yaw: yaw,
            cssClass: "custom-hotspot",
            createTooltipFunc: createCustomHotspot,
            createTooltipArgs: {
              label: hotspot.label || 'Unnamed Hotspot',
              type: hotspot.type || 'info',
              targetSceneKey: hotspot.targetScene || ''
            }
          };
        }) : [];

        scenes[sceneKey] = {
          type: 'equirectangular',
          panorama: imageUrl,
          autoLoad: sceneKey === currentScene,
          hotSpots: pannellumHotspots,
          title: sceneNames[sceneKey] || sceneKey,
          author: '2WATUJU Architecture',
          hfov: isMobile ? 110 : 100,
          pitch: 0,
          yaw: 0,
          hotSpotDebug: false
        };
      }

      loadingProgress = Math.max(70, loadingProgress + 5);

      // Ensure currentScene exists
      if (!scenes[currentScene]) {
        currentScene = sceneKeys[0];
      }

      loadingProgress = Math.max(85, loadingProgress + 5);

      // Clear container
      if (pannellumContainer) {
        pannellumContainer.innerHTML = '';
      }

      // Initialize Pannellum viewer
      const config = {
        default: {
          firstScene: currentScene,
          author: '2WATUJU Architecture',
          sceneFadeDuration: 1000,
          autoLoad: true,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          showControls: false,
          mouseZoom: !isMobile,
          doubleClickZoom: true,
          draggable: true,
          keyboardZoom: true,
          friction: 0.15,
          hfov: isMobile ? 110 : 100,
          maxHfov: 120,
          minHfov: 50,
          pitch: 0,
          yaw: 0,
          hotSpotDebug: false,
          backgroundColor: [0, 0, 0]
        },
        scenes: scenes
      };

      // Add timeout for loading detection
      const loadTimeout = setTimeout(() => {
        if (isLoading) {
          error = 'Load timeout: The panoramic viewer took too long to initialize. Please check your internet connection and try again.';
          isLoading = false;
        }
      }, 20000);

      viewer = window.pannellum.viewer(pannellumContainer, config);

      // Event listeners
      viewer.on('load', () => {
        clearTimeout(loadTimeout);
        loadingProgress = 100;
        isLoading = false;
      });

      viewer.on('error', (err) => {
        clearTimeout(loadTimeout);
        const errorMsg = typeof err === 'string' ? err : 'Failed to load panorama';
        error = `${errorMsg}. Please verify that panorama images are accessible.`;
        isLoading = false;
      });

      viewer.on('scenechange', (sceneId) => {
        currentScene = sceneId;
        mobileMenuOpen = false; // Close menu after scene change
      });

      if (autoRotate) {
        viewer.setAutoRotate(2);
      }

    } catch (err) {
      error = `Failed to initialize panoramic viewer: ${err.message || 'Unknown error'}`;
      isLoading = false;
    }
  };

  // Navigation functions
  const navigateToScene = (sceneName) => {
    if (viewer && resolvedPanoramicData[sceneName]) {
      viewer.loadScene(sceneName);
      currentScene = sceneName;
    }
  };

  const resetView = () => {
    if (viewer) {
      viewer.setPitch(0);
      viewer.setYaw(0);
      viewer.setHfov(isMobile ? 110 : 100);
    }
  };

  const toggleAutoRotate = () => {
    autoRotate = !autoRotate;
    if (viewer) {
      if (autoRotate) {
        viewer.setAutoRotate(2);
      } else {
        viewer.setAutoRotate(false);
      }
    }
  };

  const zoomIn = () => {
    if (viewer) {
      const currentHfov = viewer.getHfov();
      viewer.setHfov(Math.max(50, currentHfov - 10));
    }
  };

  const zoomOut = () => {
    if (viewer) {
      const currentHfov = viewer.getHfov();
      viewer.setHfov(Math.min(120, currentHfov + 10));
    }
  };

  const toggleHotspots = () => {
    showHotspots = !showHotspots;
    if (viewer && isPanoramicMode) {
      setTimeout(() => initPannellum(), 100);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen not supported:', err);
    }
  };

  const toggleAllControls = () => {
    showAllControls = !showAllControls;
  };

  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };

  const togglePanoramic = () => {
    if (!isPanoramicMode) {
      isPanoramicMode = true;
      setTimeout(() => initPannellum(), 100);
    } else {
      isPanoramicMode = false;
      cleanup();
    }
  };

  const cleanup = () => {
    if (viewer) {
      viewer.destroy();
      viewer = null;
    }
    isLoading = false;
    loadingProgress = 0;
    error = null;
    currentScene = 'outside';
    autoRotate = false;
    mobileMenuOpen = false;
    pannellumLoaded = false;
  };

  onMount(() => {
    const handleResize = () => {
      windowWidth = window.innerWidth;
    };
    
    windowWidth = window.innerWidth;
    window.addEventListener('resize', handleResize);

    const handleFullscreenChange = () => {
      isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
      
      if (viewer) {
        setTimeout(() => {
          viewer.resize();
        }, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  });

  onDestroy(() => {
    cleanup();
  });

  // Reactive statements
  $: availableScenes = Object.keys(resolvedPanoramicData).filter(scene => scene !== currentScene);
  $: currentSceneHotspots = getHotspotsForScene(currentScene);
</script>

<svelte:head>
  {#if isPanoramicMode}
    <style>
      .custom-hotspot {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (min-width: 768px) {
        .custom-hotspot {
          height: 50px;
          width: 50px;
        }
      }
      
      .custom-hotspot:hover {
        transform: scale(1.2);
        box-shadow: 0 8px 25px rgba(0,0,0,0.5);
      }
      
      div.custom-tooltip span {
        visibility: hidden;
        position: absolute;
        border-radius: 3px;
        background-color: #fff;
        color: #000;
        text-align: center;
        max-width: 200px;
        padding: 5px 10px;
        margin-left: -100px;
        cursor: default;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
      }
      
      div.custom-tooltip:hover span {
        visibility: visible;
      }
      
      div.custom-tooltip:hover span:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
        bottom: -20px;
        left: 50%;
        margin-left: -10px;
      }
    </style>
  {/if}
</svelte:head>

<div bind:this={containerRef} 
     class="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl"
     class:fullscreen={isFullscreen}
     class:mobile-viewer={isMobile && !isFullscreen}
     class:desktop-viewer={!isMobile || isFullscreen}>
  
  <!-- Thumbnail View -->
  {#if !isPanoramicMode}
    <div class="relative w-full h-full group">
      <img 
        src={resolvedThumbnailUrl} 
        alt={title}
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <!-- Overlay with project info -->
      <div class="absolute inset-0 overlay-gradient">
        <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0">
            <div class="space-y-1 sm:space-y-2">
              <h3 class="text-xl sm:text-2xl md:text-3xl font-bold font-roboto-condensed tracking-wider leading-tight">
                {title}
              </h3>
              <p class="text-xs sm:text-sm font-chivo-mono opacity-90 tracking-wide">
                {subtitle}
              </p>
            </div>
            
            <button 
              on:click={togglePanoramic}
              class="flex items-center gap-2 sm:gap-3 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-500 hover:scale-105 shadow-lg text-sm sm:text-base"
              style="background: linear-gradient(to right, #56AAB7, #4a9aa6);"
              disabled={isLoading}
            >
              <Eye size={isMobile ? 16 : 20} />
              <span class="text-xs sm:text-sm font-medium tracking-wide">
                {isLoading ? 'Loading...' : 'Explore 360°'}
              </span>
              <div class="w-2 h-2 rounded-full animate-pulse hidden sm:block" style="background-color: rgba(255,255,255,0.3);"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Pannellum Panoramic View -->
    <div class="relative w-full h-full bg-black">
      <!-- Pannellum Container -->
      <div bind:this={pannellumContainer} class="w-full h-full" id="pannellum-viewer">
        <!-- Pannellum will render here -->
      </div>
      
      <!-- Loading Overlay -->
      {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center z-50 loading-overlay">
          <div class="text-center max-w-md mx-auto px-4 sm:px-6">
            <div class="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8">
              <div class="loader-container">
                <div class="loader-orbit-1"></div>
                <div class="loader-orbit-2"></div>
                <div class="loader-core"></div>
              </div>
            </div>
            
            <div class="w-full bg-gray-800 rounded-full h-2 sm:h-3 mb-4 sm:mb-6 overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-500 ease-out"
                style="width: {loadingProgress}%; background: linear-gradient(to right, #56AAB7, #4a9aa6);"
              ></div>
            </div>
            
            <h3 class="text-lg sm:text-xl font-bold text-white font-roboto-condensed mb-2">
              Initializing 360° Viewer
            </h3>
            <p class="text-gray-300 text-xs sm:text-sm font-roboto mb-3 sm:mb-4">
              Loading panoramic content...
            </p>
            <p class="text-base sm:text-lg font-bold font-chivo-mono" style="color: #56AAB7;">
              {Math.round(loadingProgress)}%
            </p>
            
            <button 
              on:click={() => {
                cleanup();
                isPanoramicMode = false;
              }}
              class="mt-4 sm:mt-6 text-gray-400 hover:text-white text-xs sm:text-sm font-roboto underline transition-colors duration-300"
            >
              Cancel Loading
            </button>
          </div>
        </div>
      {/if}
      
      <!-- Error State -->
      {#if error}
        <div class="absolute inset-0 flex items-center justify-center z-50 error-overlay">
          <div class="text-center max-w-lg mx-auto px-4 sm:px-6">
            <div class="text-red-400 mb-4 sm:mb-6">
              <AlertTriangle size={isMobile ? 40 : 56} class="mx-auto" />
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-red-400 font-roboto-condensed mb-2 sm:mb-3">
              Loading Failed
            </h3>
            <p class="text-red-300 font-roboto mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
              {error}
            </p>
            
            <div class="flex gap-2 sm:gap-3 justify-center">
              <button 
                on:click={() => {
                  cleanup();
                  isPanoramicMode = false;
                }}
                class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm font-medium"
              >
                Back
              </button>
              <button 
                on:click={() => { 
                  error = null; 
                  loadingProgress = 0;
                  initPannellum();
                }}
                class="text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm font-medium"
                style="background: linear-gradient(to right, #56AAB7, #4a9aa6);"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Mobile Controls -->
      {#if !isLoading && !error && showControls && isMobile}
        <!-- Mobile Control Bar -->
        <div class="absolute top-2 left-2 right-2 flex justify-between items-center z-50">
          <button 
            on:click={() => {
              cleanup();
              isPanoramicMode = false;
            }}
            class="control-btn-mobile"
            title="Exit"
          >
            <X size={20} />
          </button>

          <div class="flex gap-2">
            <button 
              on:click={resetView}
              class="control-btn-mobile"
              title="Reset"
            >
              <RotateCcw size={20} />
            </button>
            
            <button 
              on:click={toggleMobileMenu}
              class="control-btn-mobile"
              title="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <!-- Mobile Scene Menu -->
        {#if mobileMenuOpen}
          <div class="absolute inset-0 bg-black bg-opacity-90 z-40 flex items-center justify-center" on:click={toggleMobileMenu}>
            <div class="glass-panel p-6 m-4 max-w-sm w-full max-h-[80vh] overflow-y-auto" on:click|stopPropagation>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-white font-bold text-lg">Navigate Scenes</h3>
                <button on:click={toggleMobileMenu} class="text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div class="mb-4">
                <p class="text-xs text-gray-400 mb-1">Current Scene</p>
                <p class="text-white font-bold">{sceneNames[currentScene] || currentScene}</p>
              </div>
              
              {#if availableScenes.length > 0}
                <div class="space-y-2">
                  {#each availableScenes as sceneName}
                    <button
                      on:click={() => navigateToScene(sceneName)}
                      class="w-full text-left px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white hover:bg-opacity-20 transition-all"
                    >
                      {sceneNames[sceneName] || sceneName}
                    </button>
                  {/each}
                </div>
              {/if}
              
              <!-- Mobile Settings -->
              <div class="mt-6 pt-6 border-t border-gray-600 space-y-3">
                <button 
                  on:click={() => { toggleHotspots(); toggleMobileMenu(); }}
                  class="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white"
                >
                  <span>Hotspots</span>
                  <Eye size={18} class={showHotspots ? "" : "opacity-50"} />
                </button>
                
                <button 
                  on:click={() => { toggleFullscreen(); toggleMobileMenu(); }}
                  class="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white"
                >
                  <span>Fullscreen</span>
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Mobile Zoom Controls -->
        <div class="absolute bottom-4 right-4 flex flex-col gap-2 z-50">
          <button on:click={zoomIn} class="control-btn-mobile" title="Zoom in">
            <ZoomIn size={20} />
          </button>
          <button on:click={zoomOut} class="control-btn-mobile" title="Zoom out">
            <ZoomOut size={20} />
          </button>
        </div>
        
      <!-- Desktop Controls -->
      {:else if !isLoading && !error && showControls && !isMobile}
        <!-- Master Control Toggle Button -->
        <div class="absolute top-4 right-1/2 transform translate-x-1/2 z-50">
          <button 
            on:click={toggleAllControls}
            class="control-btn control-toggle"
            class:active={showAllControls}
            title={showAllControls ? "Hide controls" : "Show controls"}
          >
            <svelte:component 
              this={showAllControls ? ToggleRight : ToggleLeft} 
              size={18} 
            />
          </button>
        </div>

        {#if showAllControls}
          <!-- Top Control Bar -->
          <div class="absolute top-4 left-4 flex gap-2 z-50 control-group">
            <button 
              on:click={() => {
                cleanup();
                isPanoramicMode = false;
              }}
              class="control-btn"
              title="Back to thumbnail"
            >
              <Home size={18} />
            </button>
            
            <button 
              on:click={resetView}
              class="control-btn"
              title="Reset view"
            >
              <RotateCcw size={18} />
            </button>
            
            <button 
              on:click={toggleHotspots}
              class="control-btn"
              class:active={showHotspots}
              title={showHotspots ? "Hide hotspots" : "Show hotspots"}
            >
              <Eye size={18} class={showHotspots ? "" : "opacity-50"} />
            </button>
            
            <button 
              on:click={toggleFullscreen}
              class="control-btn"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {#if isFullscreen}
                <Minimize size={18} />
              {:else}
                <Maximize size={18} />
              {/if}
            </button>
          </div>

          <!-- Zoom Controls -->
          <div class="absolute top-4 right-4 flex flex-col gap-2 z-50 control-group">
            <button on:click={zoomIn} class="control-btn" title="Zoom in">
              <ZoomIn size={18} />
            </button>
            <button on:click={zoomOut} class="control-btn" title="Zoom out">
              <ZoomOut size={18} />
            </button>
          </div>
          
          <!-- Scene Navigation -->
          <div class="absolute bottom-4 right-4 z-50 control-group">
            <div class="glass-panel p-4 max-w-md">
              <div class="flex items-center gap-3 text-white text-sm mb-2">
                <div class="text-start">
                  <div class="text-xs opacity-75 font-chivo-mono">CURRENT SCENE</div>
                  <div class="font-roboto-condensed font-bold">{sceneNames[currentScene] || currentScene}</div>
                </div>
              </div>

              {#if availableScenes.length > 0}
                <div class="border-t border-gray-600 pt-2">
                  <h4 class="text-sm font-roboto-condensed font-bold text-white mb-3 flex items-center gap-2">
                    <Compass size={16} />
                    Navigate Scenes
                  </h4>
                  <div class="space-y-1">
                    {#each availableScenes as sceneName}
                      <button
                        on:click={() => navigateToScene(sceneName)}
                        class="w-full text-xs px-3 py-2 rounded-lg transition-all duration-300 text-left scene-btn flex items-center justify-between"
                      >
                        <span>{sceneNames[sceneName] || sceneName}</span>
                      </button>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}
      {/if}
      
      <!-- Fullscreen indicator -->
      {#if isFullscreen}
        <div class="absolute top-4 left-1/2 transform -translate-x-1/2 glass-panel px-4 py-2 z-50">
          <div class="flex items-center gap-2 text-white text-sm font-roboto-condensed">
            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            PROFESSIONAL 360° MODE
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  /* Responsive viewer height */
  .mobile-viewer {
    aspect-ratio: 16 / 10;
  }

  .desktop-viewer {
    aspect-ratio: 16 / 9;
  }

  @media (max-width: 640px) {
    .mobile-viewer {
      aspect-ratio: 4 / 3;
    }
  }

  .fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 9999 !important;
    border-radius: 0 !important;
  }

  .overlay-gradient {
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%);
  }

  .loading-overlay {
    background: rgba(0,0,0,0.95);
  }

  .error-overlay {
    background: rgba(0,0,0,0.95);
  }

  .glass-panel {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .control-btn {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: white;
    padding: 12px;
    border-radius: 50%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .control-btn:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(86, 170, 183, 0.4);
  }

  .control-btn-mobile {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: white;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .control-btn-mobile:active {
    transform: scale(0.95);
    background: rgba(86, 170, 183, 0.5);
  }

  .control-btn.active {
    background: linear-gradient(to right, #56AAB7, #4a9aa6);
    box-shadow: 0 6px 24px rgba(86, 170, 183, 0.6);
  }

  .control-toggle {
    background: rgba(0, 0, 0, 0.8) !important;
    border: 2px solid rgba(86, 170, 183, 0.5) !important;
  }

  .control-toggle:hover {
    border-color: rgba(86, 170, 183, 0.8) !important;
    background: rgba(0, 0, 0, 0.9) !important;
  }

  .control-toggle.active {
    background: linear-gradient(to right, #56AAB7, #4a9aa6) !important;
    border-color: #56AAB7 !important;
  }

  .control-group {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .scene-btn {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }

  .scene-btn:hover {
    background: #56AAB7;
    color: white;
    transform: scale(1.02);
  }

  .loader-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .loader-orbit-1 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #56AAB7;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  .loader-orbit-2 {
    position: absolute;
    top: 12.5%;
    left: 12.5%;
    width: 75%;
    height: 75%;
    border: 2px solid transparent;
    border-right: 2px solid #4a9aa6;
    border-radius: 50%;
    animation: spin 1.5s linear infinite reverse;
  }

  .loader-core {
    position: absolute;
    top: 37.5%;
    left: 37.5%;
    width: 25%;
    height: 25%;
    background: linear-gradient(45deg, #56AAB7, #4a9aa6);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.2);
      opacity: 0.7;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .loader-orbit-1, .loader-orbit-2, .loader-core { 
      animation: none; 
    }
    
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
