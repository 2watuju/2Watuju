<!-- src/routes/project-editor/+page.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Plus, Search, Filter, Download, Upload, Copy, Save, Edit3, Eye, EyeOff, Trash2, X, ChevronUp, Info, AlertTriangle, Navigation } from 'lucide-svelte';
  import ProjectList from './components/ProjectList.svelte';
  import ProjectEditor from './components/ProjectEditor.svelte';
  import { projects as initialProjects } from '$lib/data/projects.js';
  import { projectCategories } from '$lib/data/category-projects.js';

  // State management
  let projects = [...initialProjects];
  let originalProjects = [...initialProjects];
  let currentProject = null;
  let isEditing = false;
  let isCreating = false;
  let hasUnsavedChanges = false;

  // Filter and search state
  let searchQuery = '';
  let selectedCategory = '';
  let selectedYear = '';
  let sortBy = 'year';
  let sortOrder = 'desc';

  // UI state
  let showJsonOutput = false;
  let copySuccess = false;
  let exportSuccess = false;

  // Panoramic editor state
  let showPanoramicEditor = false;
  let panoramicScenes = [];
  let currentSceneIndex = 0;
  let panoramicHotspots = [];
  let isAddingHotspot = false;
  let editingHotspot = null;
  let showHotspots = true;
  let newHotspotName = '';
  let newHotspotType = 'info';
  let newHotspotTargetScene = '';
  let imageContainer;
  let fileInput;
  let pannellumViewer;
  let viewer = null;
  let pannellumLoaded = false;
  let isViewerMode = false;
  let viewerLoading = false;
  let showFileSizeWarning = false;
  let currentFileSize = 0;
  let showAddSceneOptions = false;
  let newSceneUrlInput = '';
  let newSceneUrlError = '';

  // Scene management
  let newSceneName = '';
  let editingSceneName = null;
  let editingSceneUrl = null;   // NEW: Track which scene URL is being edited
  let newSceneUrl = '';           // NEW: Store the edited URL value

  // Computed values
  $: availableYears = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
  $: availableCategories = [...new Set(projects.map(p => p.categoryId))];
  $: currentScene = panoramicScenes[currentSceneIndex];
  $: imageUrl = currentScene?.imageUrl || null;
  $: editingHotspotData = editingHotspot ? panoramicHotspots.find(h => h.id === editingHotspot) : null;
  $: availableTargetScenes = panoramicScenes.filter((_, index) => index !== currentSceneIndex);
  
  $: filteredProjects = projects
    .filter(project => {
      if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory && project.categoryId !== selectedCategory) {
        return false;
      }
      if (selectedYear && project.year.toString() !== selectedYear) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'title':
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
        case 'year':
          aVal = a.year;
          bVal = b.year;
          break;
        case 'category':
          aVal = a.categoryId;
          bVal = b.categoryId;
          break;
        default:
          aVal = a.id;
          bVal = b.id;
      }
      
      if (sortOrder === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      } else {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }
    });

  // Check for unsaved changes
  $: {
    hasUnsavedChanges = JSON.stringify(projects) !== JSON.stringify(originalProjects);
  }

  // Update cursor when hotspot adding mode changes
  $: if (isViewerMode && pannellumViewer) {
    pannellumViewer.style.cursor = isAddingHotspot ? 'crosshair' : '';
  }

  // ==================== PANORAMIC FUNCTIONS ====================

  // Custom hotspot creation function
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      `;
      hotSpotDiv.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      hotSpotDiv.style.cursor = 'pointer';
    } else {
      iconContainer.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      `;
      hotSpotDiv.style.background = 'linear-gradient(135deg, #56AAB7, #4a9aa6)';
    }
    
    hotSpotDiv.appendChild(iconContainer);
    
    var span = document.createElement('span');
    span.innerHTML = label;
    hotSpotDiv.appendChild(span);
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    span.style.marginTop = -span.scrollHeight - 12 + 'px';
    
    if (type === 'nav' && targetSceneKey) {
      hotSpotDiv.onclick = (e) => {
        e.stopPropagation();
        const targetIndex = panoramicScenes.findIndex(s =>
          s.name.toLowerCase().replace(/\s+/g, '') === targetSceneKey
        );
        if (targetIndex !== -1 && targetIndex !== currentSceneIndex) {
          switchToScene(targetIndex);
        }
      };
    }
  }

  // Image compression
  const compressImage = (file, maxSizeMB = 5, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const MAX_WIDTH = 4096;
        const MAX_HEIGHT = 2048;
        
        let { width, height } = img;
        
        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }
        
        if (height > MAX_HEIGHT) {
          width = (width * MAX_HEIGHT) / height;
          height = MAX_HEIGHT;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(blob);
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Load Pannellum library
  const loadPannellum = () => {
    return new Promise((resolve, reject) => {
      if (window.pannellum) {
        resolve();
        return;
      }

      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
      document.head.appendChild(cssLink);

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
      script.onload = () => {
        pannellumLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Handle panoramic file upload
  const handlePanoramicFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileSizeMB = file.size / (1024 * 1024);
      currentFileSize = fileSizeMB;
      
      if (fileSizeMB > 10) {
        showFileSizeWarning = true;
        setTimeout(() => showFileSizeWarning = false, 5000);
      }
      
      try {
        if (currentScene && panoramicScenes[currentSceneIndex]) {
          panoramicScenes[currentSceneIndex].hotspots = [...panoramicHotspots];
        }
        
        let imageDataUrl;
        if (fileSizeMB > 5) {
          imageDataUrl = await compressImage(file, 5, 0.8);
        } else {
          const reader = new FileReader();
          imageDataUrl = await new Promise((resolve) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        }
        
        const newScene = {
          id: Date.now(),
          name: `Scene ${panoramicScenes.length + 1}`,
          imageUrl: imageDataUrl,
          file: file,
          hotspots: []
        };
        
        panoramicScenes = [...panoramicScenes, newScene];
        currentSceneIndex = panoramicScenes.length - 1;
        panoramicHotspots = [];
        resetAddSceneState();
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Error processing image. Please try a different file.');
      }
    }
  };

  const resetAddSceneState = () => {
    showAddSceneOptions = false;
    newSceneUrlInput = '';
    newSceneUrlError = '';
  };

  const triggerSceneUpload = () => {
    if (fileInput) {
      fileInput.value = '';
      fileInput.click();
    }
    resetAddSceneState();
  };

  const addSceneFromUrl = () => {
    const url = newSceneUrlInput.trim();
    if (!url) {
      newSceneUrlError = 'Please enter an image URL.';
      return;
    }
    
    if (currentScene && panoramicScenes[currentSceneIndex]) {
      panoramicScenes[currentSceneIndex].hotspots = [...panoramicHotspots];
    }
    
    const newScene = {
      id: Date.now(),
      name: `Scene ${panoramicScenes.length + 1}`,
      imageUrl: url,
      file: null,
      hotspots: []
    };
    
    panoramicScenes = [...panoramicScenes, newScene];
    currentSceneIndex = panoramicScenes.length - 1;
    panoramicHotspots = [];
    resetAddSceneState();
  };

  // Scene management
  const addNewScene = () => {
    const nextState = !showAddSceneOptions;
    showAddSceneOptions = nextState;
    if (!nextState) {
      newSceneUrlInput = '';
      newSceneUrlError = '';
    } else {
      newSceneUrlInput = '';
      newSceneUrlError = '';
    }
  };

  const deleteScene = (index) => {
    if (panoramicScenes.length <= 1) return;
    
    if (currentScene && panoramicScenes[currentSceneIndex]) {
      panoramicScenes[currentSceneIndex].hotspots = [...panoramicHotspots];
    }
    
    panoramicScenes = panoramicScenes.filter((_, i) => i !== index);
    if (currentSceneIndex >= panoramicScenes.length) {
      currentSceneIndex = panoramicScenes.length - 1;
    } else if (currentSceneIndex > index) {
      currentSceneIndex--;
    }
    
    const newCurrentScene = panoramicScenes[currentSceneIndex];
    panoramicHotspots = newCurrentScene && newCurrentScene.hotspots ? [...newCurrentScene.hotspots] : [];
  };

  const switchToScene = (index) => {
    if (currentScene && panoramicScenes[currentSceneIndex]) {
      panoramicScenes[currentSceneIndex].hotspots = [...panoramicHotspots];
    }
    
    currentSceneIndex = index;
    
    const newScene = panoramicScenes[currentSceneIndex];
    panoramicHotspots = newScene && newScene.hotspots ? [...newScene.hotspots] : [];
    
    isAddingHotspot = false;
    editingHotspot = null;
    newHotspotName = '';
    newHotspotType = 'info';
    newHotspotTargetScene = '';
    
    if (isViewerMode && viewer) {
      setTimeout(() => initPannellumViewer(), 100);
    }
  };

  const startEditingSceneName = (index) => {
    editingSceneName = index;
    newSceneName = panoramicScenes[index].name;
  };

  const saveSceneName = () => {
    if (editingSceneName !== null && newSceneName.trim()) {
      panoramicScenes[editingSceneName].name = newSceneName.trim();
      panoramicScenes = [...panoramicScenes];
      editingSceneName = null;
      newSceneName = '';
    }
  };

  const cancelSceneEdit = () => {
    editingSceneName = null;
    newSceneName = '';
  };
  const startEditingSceneUrl = (index) => {
  editingSceneUrl = index;
  newSceneUrl = panoramicScenes[index].imageUrl || '';
  };

  const saveSceneUrl = () => {
    if (editingSceneUrl !== null && newSceneUrl.trim()) {
      panoramicScenes[editingSceneUrl].imageUrl = newSceneUrl.trim();
      panoramicScenes = [...panoramicScenes];
      
      // Reinitialize viewer if in viewer mode
      if (isViewerMode && viewer && editingSceneUrl === currentSceneIndex) {
        setTimeout(() => initPannellumViewer(true), 100);
      }
      
      editingSceneUrl = null;
      newSceneUrl = '';
    }
  };

  const cancelSceneUrlEdit = () => {
    editingSceneUrl = null;
    newSceneUrl = '';
  };

  // Hotspot functions
  const getPositionFromClick = (event, container) => {
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  };

  const handleImageClick = (event) => {
    if (!isAddingHotspot) return;
    event.preventDefault();
    const position = getPositionFromClick(event, imageContainer);
    
    const newHotspot = {
      id: Date.now(),
      x: position.x,
      y: position.y,
      label: '',
      scene: '',
      type: 'info',
      targetScene: '',
      targetSceneKey: '',
      icon: 'info'
    };
    
    panoramicHotspots = [...panoramicHotspots, newHotspot];
    editingHotspot = newHotspot.id;
    newHotspotName = '';
    newHotspotType = 'info';
    newHotspotTargetScene = '';
    isAddingHotspot = false;
  };

  const saveHotspotEdit = () => {
    if (editingHotspot && newHotspotName.trim()) {
      const normalizeKey = (value = '') => value.toString().toLowerCase().replace(/\s+/g, '');
      let targetSceneKey = '';
      let storedTargetScene = '';

      if (newHotspotType === 'nav' && newHotspotTargetScene) {
        const targetSceneById = panoramicScenes.find(
          (s) => s.id.toString() === newHotspotTargetScene.toString()
        );

        if (targetSceneById) {
          targetSceneKey = normalizeKey(targetSceneById.name);
          storedTargetScene = targetSceneById.id.toString();
        } else {
          const fallbackKey = normalizeKey(newHotspotTargetScene);
          const targetSceneByKey = panoramicScenes.find(
            (s) => normalizeKey(s.name) === fallbackKey
          );
          targetSceneKey = fallbackKey;
          storedTargetScene = targetSceneByKey ? targetSceneByKey.id.toString() : fallbackKey;
        }
      }
      
      const updatedHotspots = panoramicHotspots.map(h => 
        h.id === editingHotspot 
          ? { 
              ...h, 
              label: newHotspotName.trim(), 
              scene: currentScene.name.toLowerCase().replace(/\s+/g, ''),
              type: newHotspotType,
              targetScene: newHotspotType === 'nav' ? storedTargetScene : '',
              targetSceneKey: newHotspotType === 'nav' ? targetSceneKey : '',
              icon: newHotspotType === 'nav' ? 'door' : 'info'
            }
          : h
      );
      
      panoramicHotspots = updatedHotspots;
      
      if (currentScene) {
        currentScene.hotspots = [...panoramicHotspots];
      }
      
      if (isViewerMode && viewer) {
        setTimeout(() => initPannellumViewer(true), 100);
      }
      
      editingHotspot = null;
      newHotspotName = '';
      newHotspotType = 'info';
      newHotspotTargetScene = '';
    }
  };

  const deleteHotspot = (id) => {
    panoramicHotspots = panoramicHotspots.filter(h => h.id !== id);
    if (editingHotspot === id) {
      editingHotspot = null;
      newHotspotName = '';
      newHotspotType = 'info';
      newHotspotTargetScene = '';
    }
    
    if (currentScene) {
      currentScene.hotspots = [...panoramicHotspots];
    }
    
    if (isViewerMode && viewer) {
      setTimeout(() => initPannellumViewer(true), 100);
    }
  };

  const startEditingHotspot = (hotspot) => {
    editingHotspot = hotspot.id;
    newHotspotName = hotspot.label;
    newHotspotType = hotspot.type || 'info';
    
    if (newHotspotType === 'nav') {
      const normalizeKey = (value = '') => value.toString().toLowerCase().replace(/\s+/g, '');
      const byId = panoramicScenes.find(
        (scene) => scene.id?.toString() === (hotspot.targetScene ?? '').toString()
      );
      const byKey = panoramicScenes.find(
        (scene) => normalizeKey(scene.name) === normalizeKey(hotspot.targetSceneKey || hotspot.targetScene || '')
      );
      
      if (byId) {
        newHotspotTargetScene = byId.id.toString();
      } else if (byKey) {
        newHotspotTargetScene = byKey.id.toString();
      } else {
        newHotspotTargetScene = hotspot.targetScene || '';
      }
    } else {
      newHotspotTargetScene = '';
    }
  };

  const cancelHotspotEdit = () => {
    if (editingHotspot) {
      const hotspot = panoramicHotspots.find(h => h.id === editingHotspot);
      if (hotspot && !hotspot.label) {
        deleteHotspot(editingHotspot);
      }
    }
    editingHotspot = null;
    newHotspotName = '';
    newHotspotType = 'info';
    newHotspotTargetScene = '';
    isAddingHotspot = false;
  };

  // Initialize Pannellum viewer
  const initPannellumViewer = async (preserveView = false) => {
    if (!currentScene || !pannellumViewer) return;
    
    try {
      await loadPannellum();
      
      let currentPitch = 0, currentYaw = 0, currentHfov = 90;
      if (preserveView && viewer) {
        try {
          currentPitch = viewer.getPitch();
          currentYaw = viewer.getYaw();
          currentHfov = viewer.getHfov();
        } catch (e) {
          currentHfov = 90;
        }
      }
      
      if (viewer) {
        viewer.destroy();
        viewer = null;
      }

      if (currentScene) {
        currentScene.hotspots = [...panoramicHotspots];
      }

      const pannellumScenes = {};
      
      panoramicScenes.forEach((scene) => {
        const sceneKey = scene.name.toLowerCase().replace(/\s+/g, '');
        const sceneHotspots = (scene.hotspots || []).map(hotspot => {
          const yaw = (hotspot.x / 100) * 360 - 180;
          const pitch = 90 - (hotspot.y / 100) * 180;
          
          return {
            id: `hotspot_${hotspot.id}`,
            pitch: pitch,
            yaw: yaw,
            cssClass: "custom-hotspot",
            createTooltipFunc: createCustomHotspot,
            createTooltipArgs: {
              label: hotspot.label || 'Unnamed Hotspot',
              type: hotspot.type || 'info',
              targetSceneKey: hotspot.targetSceneKey || ''
            }
          };
        });

        pannellumScenes[sceneKey] = {
          type: 'equirectangular',
          panorama: scene.imageUrl,
          hotSpots: sceneHotspots,
          title: scene.name,
          author: '2WATUJU Architecture',
          hfov: preserveView ? currentHfov : 90,
          pitch: preserveView ? currentPitch : 0,
          yaw: preserveView ? currentYaw : 0,
          hotSpotDebug: true,
          autoLoad: true
        };
      });

      const currentSceneKey = currentScene.name.toLowerCase().replace(/\s+/g, '');

      pannellumViewer.innerHTML = '';
      pannellumViewer._hotspotSetupComplete = false;

      const config = {
        default: {
          firstScene: currentSceneKey,
          author: '2WATUJU Architecture',
          sceneFadeDuration: 1000,
          autoLoad: true,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          showControls: true,
          mouseZoom: true,
          doubleClickZoom: true,
          draggable: true,
          keyboardZoom: true,
          friction: 0.15,
          hfov: preserveView ? currentHfov : 90,
          maxHfov: 120,
          minHfov: 50,
          pitch: preserveView ? currentPitch : 0,
          yaw: preserveView ? currentYaw : 0,
          hotSpotDebug: true,
          backgroundColor: [0, 0, 0]
        },
        scenes: pannellumScenes
      };

      viewer = window.pannellum.viewer(pannellumViewer, config);

      viewer.on('load', () => {
        setTimeout(() => {
          setupViewerHotspotAdding();
        }, 500);
      });

      viewer.on('scenechange', () => {
        setTimeout(() => {
          setupViewerHotspotAdding();
        }, 500);
      });

    } catch (err) {
      console.error('Failed to initialize Pannellum viewer:', err);
    }
  };

  // Setup hotspot adding in viewer
  const setupViewerHotspotAdding = () => {
    if (!viewer || !pannellumViewer) return;
    if (pannellumViewer._hotspotSetupComplete) return;

    let viewerContainer = pannellumViewer.querySelector('.pnlm-container') || 
                         pannellumViewer.querySelector('.pnlm-render-container') ||
                         pannellumViewer.querySelector('canvas') ||
                         pannellumViewer.querySelector('div') ||
                         pannellumViewer;

    if (!viewerContainer) {
      setTimeout(() => setupViewerHotspotAdding(), 1000);
      return;
    }

    if (pannellumViewer._hotspotClickHandler) {
      pannellumViewer.removeEventListener('click', pannellumViewer._hotspotClickHandler, true);
    }

    const handleViewerClick = (event) => {
      if (!isAddingHotspot) return;
      if (event.target.closest('.pnlm-hotspot')) return;

      setTimeout(() => {
        if (!viewer) return;

        try {
          const pitch = viewer.getPitch();
          const yaw = viewer.getYaw();

          const x = ((yaw + 180) / 360) * 100;
          const y = ((90 - pitch) / 180) * 100;

          const clampedX = Math.max(0, Math.min(100, Math.round(x * 100) / 100));
          const clampedY = Math.max(0, Math.min(100, Math.round(y * 100) / 100));

          const newHotspot = {
            id: Date.now(),
            x: clampedX,
            y: clampedY,
            label: '',
            scene: '',
            type: 'info',
            targetScene: '',
            targetSceneKey: '',
            icon: 'info'
          };
          
          panoramicHotspots = [...panoramicHotspots, newHotspot];
          editingHotspot = newHotspot.id;
          newHotspotName = '';
          newHotspotType = 'info';
          newHotspotTargetScene = '';
          isAddingHotspot = false;

          if (currentScene) {
            currentScene.hotspots = [...panoramicHotspots];
          }

          setTimeout(() => {
            initPannellumViewer(true);
          }, 100);
        } catch (error) {
          console.error('Error adding hotspot:', error);
        }
      }, 50);
    };

    pannellumViewer._hotspotClickHandler = handleViewerClick;
    pannellumViewer.addEventListener('click', handleViewerClick, true);
    pannellumViewer.style.cursor = isAddingHotspot ? 'crosshair' : '';
    pannellumViewer._hotspotSetupComplete = true;
  };

  // Toggle viewer mode
  const toggleViewerMode = async () => {
    isViewerMode = !isViewerMode;
    if (isViewerMode) {
      viewerLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        await initPannellumViewer();
      } catch (error) {
        console.error('Error initializing viewer:', error);
      } finally {
        viewerLoading = false;
      }
    } else if (viewer) {
      viewer.destroy();
      viewer = null;
      viewerLoading = false;
    }
  };

  const clearPanoramicData = () => {
    if (confirm('Clear all panoramic scenes and hotspots?')) {
      panoramicScenes = [];
      panoramicHotspots = [];
      currentSceneIndex = 0;
      isViewerMode = false;
      if (viewer) {
        viewer.destroy();
        viewer = null;
      }
    }
  };

  // ==================== PROJECT FUNCTIONS ====================

  const createNewProject = () => {
    const newProject = {
      id: Date.now(),
      title: "NEW\nPROJECT\nNAME",
      slug: "new-project-name",
      categoryId: "modern",
      year: new Date().getFullYear(),
      month: "JAN",
      description: "Add your project description here.",
      images: {
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        mobile: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        tablet: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop",
        desktop: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
      },
      contentSections: [
        {
          title: "Main Feature",
          image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
          imageDescription: "Description of the main feature",
          content: "Content description for this section."
        }
      ],
      stats: {
        land: "150m²",
        floor: "120m²",
        carport: "yes",
        pool: "no",
        bathroom: "2",
        room: "3"
      },
      statsConfig: {
        "LAND AREA": { "icon": "land.svg", "key": "land", "order": 1 },
        "FLOOR AREA": { "icon": "floor.svg", "key": "floor", "order": 2 },
        "ROOM": { "icon": "room.svg", "key": "room", "order": 3 },
        "BATHROOM": { "icon": "bathroom.svg", "key": "bathroom", "order": 4 },
        "CARPORT": { "icon": "garage.svg", "key": "carport", "order": 5 },
        "POOL": { "icon": "pool.svg", "key": "pool", "order": 6 }
      },
      projectDetails: {
        "TIPE PROYEK": { "value": "Modern Style", "order": 1 },
        "PRINCIPLE DESIGNER": { "value": "Kurnia Firmanda Ageng, S.Ars", "order": 2 },
        "LOKASI": { "value": "Bandar Lampung", "order": 3 },
        "INTERIOR DESIGNER": { "value": "Kurnia Firmanda Ageng, S.Ars", "order": 4 }
      },
      panoramic: {},
      hotspots: []
    };

    projects = [...projects, newProject];
    currentProject = newProject;
    isCreating = true;
    isEditing = true;
    
    // Reset panoramic editor
    panoramicScenes = [];
    panoramicHotspots = [];
    currentSceneIndex = 0;
    showPanoramicEditor = false;
  };

  const editProject = (project) => {
    currentProject = { ...project };
    isEditing = true;
    isCreating = false;
    
    // Load panoramic data if exists
    panoramicScenes = [];
    panoramicHotspots = [];
    showPanoramicEditor = false;
    
    if (project.panoramic && Object.keys(project.panoramic).length > 0) {
      const panoramaEntries = Object.entries(project.panoramic);
      const baseId = Date.now();
      const normalizeKey = (key = '') => key.toLowerCase().replace(/\s+/g, '');
      
      // Map normalized scene keys to generated IDs for consistent references
      const sceneIdMap = new Map(
        panoramaEntries.map(([sceneKey], index) => [normalizeKey(sceneKey), baseId + index])
      );

      panoramicScenes = panoramaEntries.map(([sceneKey, imagePath], index) => {
        const normalizedKey = normalizeKey(sceneKey);
        const sceneId = sceneIdMap.get(normalizedKey);
        const displayName = sceneKey
          .split('')
          .map((c, i) => (i === 0 ? c.toUpperCase() : c))
          .join('');

        const relatedHotspots = (project.hotspots || [])
          .filter((h) => normalizeKey(h.scene || '') === normalizedKey)
          .map((hotspot, hotspotIndex) => {
            const hotspotType = hotspot.type || 'info';
            const targetKey = normalizeKey(hotspot.targetScene || '');
            const mappedTargetScene = targetKey ? sceneIdMap.get(targetKey) : '';

            return {
              id: hotspot.id ?? baseId + index * 100 + hotspotIndex,
              x: hotspot.x,
              y: hotspot.y,
              label: hotspot.label || '',
              scene: normalizeKey(hotspot.scene || normalizedKey),
              type: hotspotType,
              targetScene: mappedTargetScene ? mappedTargetScene.toString() : '',
              targetSceneKey: targetKey,
              icon: hotspot.icon || (hotspotType === 'nav' ? 'door' : 'info')
            };
          });

        return {
          id: sceneId,
          name: displayName,
          imageUrl: imagePath,
          file: null,
          hotspots: relatedHotspots
        };
      });
      
      if (panoramicScenes.length > 0) {
        currentSceneIndex = 0;
        panoramicHotspots = [...(panoramicScenes[0].hotspots || [])];
        showPanoramicEditor = true;
      }
    }
  };

  const saveProject = (updatedProject) => {
    // Add panoramic data to project
    if (panoramicScenes.length > 0) {
      // Save current scene hotspots
      if (currentScene && panoramicScenes[currentSceneIndex]) {
        panoramicScenes[currentSceneIndex].hotspots = [...panoramicHotspots];
      }
      
      const panoramicData = {};
      const allHotspots = [];
      
      panoramicScenes.forEach((scene) => {
        const sceneKey = scene.name.toLowerCase().replace(/\s+/g, '');
        const fileName = scene.file?.name || `${scene.name.toLowerCase().replace(/\s+/g, '-')}.png`;
        const sanitizedUrl = (scene.imageUrl || '').trim();
        const panoramaUrl = sanitizedUrl && !sanitizedUrl.startsWith('data:')
          ? sanitizedUrl
          : `assets/panorama/${fileName}`;
        panoramicData[sceneKey] = panoramaUrl;
        
        (scene.hotspots || []).forEach(hotspot => {
          const normalizeKey = (value = '') => value.toString().toLowerCase().replace(/\s+/g, '');
          const derivedTargetKey = hotspot.type === 'nav'
            ? hotspot.targetSceneKey || normalizeKey(hotspot.targetScene || '')
            : '';

          allHotspots.push({
            x: hotspot.x,
            y: hotspot.y,
            scene: sceneKey,
            label: hotspot.label,
            type: hotspot.type || 'info',
            targetScene: derivedTargetKey,
            icon: hotspot.icon || (hotspot.type === 'nav' ? 'door' : 'info')
          });
        });
      });
      
      updatedProject.panoramic = panoramicData;
      updatedProject.hotspots = allHotspots;
    } else {
      updatedProject.panoramic = {};
      updatedProject.hotspots = [];
    }
    
    if (isCreating) {
      projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    } else {
      projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    }
    
    currentProject = null;
    isEditing = false;
    isCreating = false;
    
    // Reset panoramic editor
    panoramicScenes = [];
    panoramicHotspots = [];
    currentSceneIndex = 0;
    showPanoramicEditor = false;
  };

  const deleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      projects = projects.filter(p => p.id !== projectId);
      if (currentProject && currentProject.id === projectId) {
        currentProject = null;
        isEditing = false;
        isCreating = false;
      }
    }
  };

  const cancelEdit = () => {
    if (isCreating) {
      projects = projects.filter(p => p.id !== currentProject.id);
    }
    currentProject = null;
    isEditing = false;
    isCreating = false;
    
    // Reset panoramic editor
    panoramicScenes = [];
    panoramicHotspots = [];
    currentSceneIndex = 0;
    showPanoramicEditor = false;
  };

  const duplicateProject = (project) => {
    const duplicatedProject = {
      ...project,
      id: Date.now(),
      title: project.title.replace(/\n/g, ' ') + ' Copy',
      slug: project.slug + '-copy',
      contentSections: [...project.contentSections],
      stats: { ...project.stats },
      statsConfig: { ...project.statsConfig },
      projectDetails: { ...project.projectDetails },
      panoramic: { ...project.panoramic },
      hotspots: [...(project.hotspots || [])]
    };

    projects = [...projects, duplicatedProject];
  };

  // Export functions
  const downloadProjects = () => {
    const dataStr = `// src/lib/data/projects.js

const BASE_URL = 'https://dafahan.github.io/2Watuju';

export const projects = ${JSON.stringify(projects, null, 2)};

export const projectStatuses = {
  planning: 'Perencanaan',
  'in-progress': 'Dalam Proses',
  completed: 'Selesai'
};

// Helper functions
export const getAllProjects = () => projects;
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getProjectBySlug = (slug) => projects.find(project => project.slug === slug);
export const getProjectsByCategoryId = (categoryId) => projects.filter(project => project.categoryId === categoryId);
export const getProjectsByStatus = (status) => projects.filter(project => project.status === status);

// UPDATED: Efficient helper function for stats
export const getOrderedStats = (project) => {
  if (!project.stats || !project.statsConfig) return [];
  
  return Object.entries(project.statsConfig)
    .map(([label, config]) => ({
      label,
      value: project.stats[config.key],
      icon: config.icon,
      order: config.order
    }))
    .filter(stat => stat.value !== undefined)
    .sort((a, b) => (a.order || 999) - (b.order || 999));
};

// UPDATED: Efficient helper function for project details
export const getOrderedProjectDetails = (project) => {
  if (!project.projectDetails) return [];
  
  return Object.entries(project.projectDetails)
    .map(([label, detail]) => {
      if (typeof detail === 'string') {
        return { label, value: detail, order: 999 };
      }
      return { label, value: detail.value, order: detail.order };
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999));
};`;

    const blob = new Blob([dataStr], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    exportSuccess = true;
    setTimeout(() => exportSuccess = false, 2000);
  };

  const copyProjectsCode = async () => {
    const dataStr = `export const projects = ${JSON.stringify(projects, null, 2)};`;

    try {
      await navigator.clipboard.writeText(dataStr);
      copySuccess = true;
      setTimeout(() => copySuccess = false, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const resetToOriginal = () => {
    if (confirm('Are you sure you want to reset all changes? This will lose all unsaved modifications.')) {
      projects = [...originalProjects];
      currentProject = null;
      isEditing = false;
      isCreating = false;
    }
  };

  const saveAsOriginal = () => {
    originalProjects = [...projects];
    hasUnsavedChanges = false;
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedProjects = JSON.parse(e.target.result);
          if (Array.isArray(importedProjects)) {
            if (confirm('This will replace all current projects. Continue?')) {
              projects = importedProjects;
              originalProjects = [...importedProjects];
            }
          } else {
            alert('Invalid JSON format. Please upload a valid projects array.');
          }
        } catch (error) {
          alert('Error parsing JSON file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  $: {
    if (typeof window !== 'undefined' && hasUnsavedChanges) {
      localStorage.setItem('unsaved-projects', JSON.stringify(projects));
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      const unsavedProjects = localStorage.getItem('unsaved-projects');
      if (unsavedProjects) {
        const parsed = JSON.parse(unsavedProjects);
        if (confirm('Found unsaved changes. Do you want to restore them?')) {
          projects = parsed;
        } else {
          localStorage.removeItem('unsaved-projects');
        }
      }
    }
  });

  onDestroy(() => {
    if (viewer) {
      viewer.destroy();
    }
  });
</script>

<svelte:head>
  <title>Enhanced Project Editor with Panoramic Support | 2WATUJU</title>
  <style>
    .custom-hotspot {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
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
      margin-left: -220px;
      cursor: default;
    }
    
    div.custom-tooltip:hover span{
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
      left: -10px;
      margin: 0 50%;
    }
  </style>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Enhanced Project Data Manager</h1>
          <p class="text-gray-600">Manage projects with full CRUD operations + 360° panoramic support</p>
        </div>
        
        <div class="flex items-center space-x-3">
          {#if hasUnsavedChanges}
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span class="text-sm text-yellow-600 font-medium">Unsaved changes</span>
            </div>
          {/if}
          
          <button
            on:click={saveAsOriginal}
            class="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            disabled={!hasUnsavedChanges}
          >
            <Save class="w-4 h-4 mr-2" />
            Save Changes
          </button>
          
          <button
            on:click={createNewProject}
            class="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus class="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>
      </div>
    </div>

    {#if isEditing}
      <!-- Project Editor View with Panoramic Support -->
      <div class="space-y-6">
        <!-- Regular Project Editor -->
        <ProjectEditor
          project={currentProject}
          {isCreating}
          categories={availableCategories}
          on:save={(event) => saveProject(event.detail)}
          on:cancel={cancelEdit}
        />

        <!-- Panoramic Editor Section -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">360° Panoramic Content (Optional)</h2>
            <button
              on:click={() => showPanoramicEditor = !showPanoramicEditor}
              class="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <Eye class="w-4 h-4 mr-2" />
              {showPanoramicEditor ? 'Hide' : 'Show'} Panoramic Editor
            </button>
          </div>

          {#if showPanoramicEditor}
            <!-- File Size Warning -->
            {#if showFileSizeWarning}
              <div class="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex items-start">
                  <AlertTriangle class="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h3 class="text-yellow-800 font-medium">Large File Detected</h3>
                    <p class="text-yellow-700 text-sm mt-1">
                      File size: {currentFileSize.toFixed(1)}MB. The image has been automatically compressed.
                    </p>
                  </div>
                </div>
              </div>
            {/if}

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <!-- Panoramic Editor Main Area -->
              <div class="xl:col-span-2 space-y-6">
                {#if panoramicScenes.length === 0}
                  <!-- Upload First Scene -->
                  <div class="text-center border-2 border-dashed border-gray-300 rounded-lg p-12">
                    <Upload class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p class="text-lg font-medium text-gray-900">Upload First 360° Scene</p>
                    <p class="text-gray-500 mt-2">Add panoramic images to enable 360° tour</p>
                    <input 
                      bind:this={fileInput}
                      type="file" 
                      accept="image/*" 
                      on:change={handlePanoramicFileUpload}
                      class="hidden"
                    />
                    <div class="mt-4 flex flex-col items-center gap-3">
                      <div class="flex gap-2">
                        <button 
                          on:click={triggerSceneUpload}
                          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Upload Image
                        </button>
                        <button
                          on:click={() => {
                            showAddSceneOptions = true;
                            newSceneUrlError = '';
                          }}
                          class="px-4 py-2 bg-purple-100 text-purple-700 border border-purple-200 rounded-md hover:bg-purple-200"
                        >
                          Use Image URL
                        </button>
                      </div>
                      
                      {#if showAddSceneOptions}
                        <div class="w-full max-w-md bg-white border rounded-md p-3">
                          <label class="block text-xs font-medium text-gray-600 mb-2">Scene Image URL</label>
                          <div class="flex gap-2">
                            <input
                              bind:value={newSceneUrlInput}
                              type="text"
                              placeholder="https://example.com/panorama.jpg"
                              class="flex-1 px-3 py-2 border rounded-md text-sm"
                              on:keydown={(e) => {
                                if (e.key === 'Enter') addSceneFromUrl();
                                if (e.key === 'Escape') resetAddSceneState();
                              }}
                              autofocus
                            />
                            <button
                              on:click={addSceneFromUrl}
                              class="px-3 py-2 bg-green-600 text-white rounded-md text-sm"
                            >
                              Add Scene
                            </button>
                            <button
                              on:click={resetAddSceneState}
                              class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                          {#if newSceneUrlError}
                            <p class="mt-2 text-xs text-red-600">{newSceneUrlError}</p>
                          {/if}
                        </div>
                      {/if}
                    </div>
                  </div>
                {:else}
                  <!-- Scene Management -->
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="font-semibold text-gray-900">Scenes ({panoramicScenes.length})</h3>
                      <button
                        on:click={addNewScene}
                        class="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        <Plus class="w-3 h-3 mr-2" />
                        Add Scene
                      </button>
                    </div>

                    {#if showAddSceneOptions}
                      <div class="mb-4 bg-white border rounded-md p-3">
                        <p class="text-sm font-medium text-gray-700 mb-3">Add a new scene</p>
                        <div class="flex flex-wrap gap-2">
                          <button
                            on:click={triggerSceneUpload}
                            class="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                          >
                            Upload Image
                          </button>
                          <div class="flex-1 min-w-[200px] flex gap-2">
                            <input
                              bind:value={newSceneUrlInput}
                              type="text"
                              placeholder="https://example.com/panorama.jpg"
                              class="flex-1 px-3 py-2 border rounded-md text-sm"
                              on:keydown={(e) => {
                                if (e.key === 'Enter') addSceneFromUrl();
                                if (e.key === 'Escape') resetAddSceneState();
                              }}
                              autofocus
                            />
                            <button
                              on:click={addSceneFromUrl}
                              class="px-3 py-2 bg-green-600 text-white rounded-md text-sm"
                            >
                              Add via URL
                            </button>
                          </div>
                          <button
                            on:click={resetAddSceneState}
                            class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                        {#if newSceneUrlError}
                          <p class="mt-2 text-xs text-red-600">{newSceneUrlError}</p>
                        {/if}
                      </div>
                    {/if}
                    
                    <div class="flex flex-wrap gap-2">
                      {#each panoramicScenes as scene, index (scene.id)}
                        <div class="flex flex-col gap-1">
                          <div class="flex items-center">
                            {#if editingSceneName === index}
                              <div class="flex items-center bg-blue-100 rounded-md p-2">
                                <input
                                  bind:value={newSceneName}
                                  type="text"
                                  class="text-sm bg-transparent border-none outline-none w-24"
                                  on:keydown={(e) => {
                                    if (e.key === 'Enter') saveSceneName();
                                    if (e.key === 'Escape') cancelSceneEdit();
                                  }}
                                  autofocus
                                />
                                <button on:click={saveSceneName} class="ml-1 text-green-600">
                                  <Save class="w-3 h-3" />
                                </button>
                                <button on:click={cancelSceneEdit} class="ml-1 text-red-600">
                                  <X class="w-3 h-3" />
                                </button>
                              </div>
                            {:else}
                              <button
                                on:click={() => switchToScene(index)}
                                class="flex items-center px-3 py-2 rounded-md text-sm"
                                class:bg-blue-600={currentSceneIndex === index}
                                class:text-white={currentSceneIndex === index}
                                class:bg-gray-200={currentSceneIndex !== index}
                              >
                                {scene.name}
                                <span class="ml-2 text-xs opacity-75">({scene.hotspots?.length || 0})</span>
                              </button>
                              <button
                                on:click={() => startEditingSceneName(index)}
                                class="ml-1 p-1 text-gray-400 hover:text-gray-600"
                                title="Edit name"
                              >
                                <Edit3 class="w-3 h-3" />
                              </button>
                              {#if panoramicScenes.length > 1}
                                <button
                                  on:click={() => deleteScene(index)}
                                  class="ml-1 p-1 text-red-400 hover:text-red-600"
                                  title="Delete scene"
                                >
                                  <Trash2 class="w-3 h-3" />
                                </button>
                              {/if}
                            {/if}
                          </div>
                          
                          <!-- URL Display/Edit - NEW SECTION -->
                          {#if currentSceneIndex === index}
                            <div class="ml-2 flex items-center gap-1">
                              {#if editingSceneUrl === index}
                                <div class="flex items-center bg-purple-50 rounded p-1 flex-1 min-w-0">
                                  <input
                                    bind:value={newSceneUrl}
                                    type="text"
                                    class="text-xs bg-transparent border-none outline-none flex-1 min-w-0 px-1"
                                    placeholder="assets/panorama/scene.jpg"
                                    on:keydown={(e) => {
                                      if (e.key === 'Enter') saveSceneUrl();
                                      if (e.key === 'Escape') cancelSceneUrlEdit();
                                    }}
                                    autofocus
                                  />
                                  <button on:click={saveSceneUrl} class="p-0.5 text-green-600 flex-shrink-0">
                                    <Save class="w-3 h-3" />
                                  </button>
                                  <button on:click={cancelSceneUrlEdit} class="p-0.5 text-red-600 flex-shrink-0">
                                    <X class="w-3 h-3" />
                                  </button>
                                </div>
                              {:else}
                                <button
                                  on:click={() => startEditingSceneUrl(index)}
                                  class="flex items-center gap-1 px-2 py-0.5 text-xs bg-purple-50 hover:bg-purple-100 rounded text-purple-700 max-w-xs"
                                  title="Click to edit URL"
                                >
                                  <span class="truncate">
                                    {#if scene.imageUrl?.startsWith('data:')}
                                      📷 Uploaded file
                                    {:else if scene.imageUrl}
                                      🔗 {scene.imageUrl}
                                    {:else}
                                      ⚠️ No URL set
                                    {/if}
                                  </span>
                                  <Edit3 class="w-2.5 h-2.5 flex-shrink-0" />
                                </button>
                              {/if}
                            </div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                    
                    <input 
                      bind:this={fileInput}
                      type="file" 
                      accept="image/*" 
                      on:change={handlePanoramicFileUpload}
                      class="hidden"
                    />
                  </div>

                  <!-- Current Scene URL Info -->
                  {#if currentScene}
                    <div class="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 class="text-sm font-semibold text-purple-900 mb-2">Current Scene URL</h4>
                      <div class="space-y-2">
                        <div class="flex items-start gap-2">
                          <span class="text-xs font-medium text-purple-700 min-w-[60px]">Image:</span>
                          <div class="flex-1 min-w-0">
                            {#if currentScene.imageUrl?.startsWith('data:')}
                              <p class="text-xs text-purple-600">Using uploaded file (data URL)</p>
                              <p class="text-xs text-purple-500 mt-1">Click edit button above to set a custom path</p>
                            {:else if currentScene.imageUrl}
                              <code class="text-xs text-purple-800 break-all">{currentScene.imageUrl}</code>
                            {:else}
                              <p class="text-xs text-red-600">No URL set</p>
                            {/if}
                          </div>
                        </div>
                        
                        {#if currentScene.file}
                          <div class="flex items-start gap-2">
                            <span class="text-xs font-medium text-purple-700 min-w-[60px]">File:</span>
                            <span class="text-xs text-purple-600">{currentScene.file.name}</span>
                          </div>
                        {/if}
                        
                        <div class="mt-2 p-2 bg-purple-100 rounded text-xs text-purple-700">
                          💡 <strong>Tip:</strong> When saving, the URL path will be used in the project data. 
                          You can upload an image to get the data URL, then replace it with your desired path 
                          (e.g., <code>assets/panorama/scene.jpg</code>).
                        </div>
                      </div>
                    </div>
                  {/if}

                  <!-- Image Editor -->
                  {#if currentScene}
                    <div class="bg-white rounded-lg border overflow-hidden">
                      <!-- Toolbar -->
                      <div class="border-b bg-gray-50 p-4">
                        <div class="flex items-center justify-between">
                          <div class="text-sm font-medium text-gray-700">
                            Editing: <span class="text-blue-600">{currentScene.name}</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <button
                              on:click={() => isAddingHotspot = !isAddingHotspot}
                              class="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                              class:bg-green-700={isAddingHotspot}
                              disabled={editingHotspot !== null}
                            >
                              <Plus class="w-3 h-3 mr-2" />
                              {isAddingHotspot ? 'Click to Add' : 'Add Hotspot'}
                            </button>
                            
                            <button
                              on:click={() => showHotspots = !showHotspots}
                              class="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                            >
                              {#if showHotspots}
                                <Eye class="w-3 h-3 mr-2" />
                                Hide
                              {:else}
                                <EyeOff class="w-3 h-3 mr-2" />
                                Show
                              {/if}
                            </button>

                            <button
                              on:click={toggleViewerMode}
                              class="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                            >
                              <Eye class="w-3 h-3 mr-2" />
                              {isViewerMode ? 'Exit 360°' : '360° Preview'}
                            </button>

                            <button
                              on:click={clearPanoramicData}
                              class="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                            >
                              <Trash2 class="w-3 h-3 mr-2" />
                              Clear All
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Image/Viewer Container -->
                      <div class="relative">
                        {#if isViewerMode}
                          <div class="relative w-full h-96 bg-black rounded-lg overflow-hidden">
                            {#if viewerLoading}
                              <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
                                <div class="text-center text-white">
                                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                                  <p>Loading 360° Viewer...</p>
                                </div>
                              </div>
                            {/if}
                            
                            {#if isAddingHotspot}
                              <div class="absolute top-4 left-4 bg-green-600 text-white px-3 py-2 rounded-md text-sm z-20 flex items-center gap-2">
                                <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                Click to add hotspot
                              </div>
                            {/if}
                            
                            <div bind:this={pannellumViewer} class="w-full h-full"
                                 class:cursor-crosshair={isAddingHotspot}>
                            </div>
                          </div>
                        {:else}
                          <div 
                            bind:this={imageContainer}
                            class="relative"
                            class:cursor-crosshair={isAddingHotspot}
                            on:click={handleImageClick}
                            role="button"
                            tabindex="0"
                          >
                            <img 
                              src={imageUrl} 
                              alt="Panoramic view" 
                              class="w-full h-auto max-h-96 object-contain bg-black"
                              draggable="false"
                            />
                            
                            {#if showHotspots}
                              {#each panoramicHotspots as hotspot (hotspot.id)}
                                <div 
                                  class="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                                  style="left: {hotspot.x}%; top: {hotspot.y}%;"
                                >
                                  <div class="relative">
                                    <button
                                      class="w-8 h-8 text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:scale-110 transition-transform"
                                      class:bg-gradient-to-br={true}
                                      class:from-blue-500={hotspot.type !== 'nav'}
                                      class:to-blue-600={hotspot.type !== 'nav'}
                                      class:from-green-500={hotspot.type === 'nav'}
                                      class:to-green-600={hotspot.type === 'nav'}
                                      on:click|stopPropagation={() => startEditingHotspot(hotspot)}
                                    >
                                      {#if hotspot.type === 'nav'}
                                        <ChevronUp class="w-4 h-4" />
                                      {:else}
                                        <Info class="w-4 h-4" />
                                      {/if}
                                    </button>
                                    
                                    {#if hotspot.label}
                                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded whitespace-nowrap">
                                        {hotspot.label}
                                      </div>
                                    {/if}
                                  </div>
                                </div>
                              {/each}
                            {/if}
                          </div>
                        {/if}
                      </div>

                      <!-- Status Bar -->
                      <div class="border-t bg-gray-50 px-4 py-2">
                        <div class="flex items-center justify-between text-sm text-gray-600">
                          <div class="flex items-center gap-4">
                            {#if currentScene?.file}
                              <span class="font-medium">{currentScene.file.name}</span>
                              <span>({Math.round(currentScene.file.size / 1024)} KB)</span>
                            {/if}
                            {#if currentScene?.imageUrl && !currentScene.imageUrl.startsWith('data:')}
                              <span class="text-purple-600">📍 {currentScene.imageUrl}</span>
                            {/if}
                          </div>
                          <div>
                            Hotspots: <span class="font-medium">{panoramicHotspots.length}</span>
                            <span class="ml-2 text-blue-600">Info: {panoramicHotspots.filter(h => h.type !== 'nav').length}</span>
                            <span class="ml-2 text-green-600">Nav: {panoramicHotspots.filter(h => h.type === 'nav').length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  {/if}
                {/if}
              </div>

              <!-- Panoramic Sidebar -->
              <div class="space-y-4">
                <!-- Hotspot Editor -->
                {#if editingHotspot}
                  <div class="bg-white rounded-lg border p-4">
                    <h3 class="font-semibold text-gray-900 mb-4">Edit Hotspot</h3>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input 
                          bind:value={newHotspotName}
                          type="text" 
                          class="w-full px-3 py-2 border rounded-md text-sm"
                          placeholder="Living Room"
                          on:keydown={(e) => {
                            if (e.key === 'Enter') saveHotspotEdit();
                            if (e.key === 'Escape') cancelHotspotEdit();
                          }}
                        />
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select 
                          bind:value={newHotspotType}
                          class="w-full px-3 py-2 border rounded-md text-sm"
                        >
                          <option value="info">ℹ️ Information</option>
                          <option value="nav">🔺 Navigation</option>
                        </select>
                      </div>

                      {#if newHotspotType === 'nav'}
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Target Scene</label>
                          <select 
                            bind:value={newHotspotTargetScene}
                            class="w-full px-3 py-2 border rounded-md text-sm"
                          >
                            <option value="">Select scene...</option>
                            {#each availableTargetScenes as scene}
                              <option value={scene.id.toString()}>{scene.name}</option>
                            {/each}
                          </select>
                        </div>
                      {/if}
                      
                      <div class="flex space-x-2">
                        <button 
                          on:click={saveHotspotEdit}
                          class="flex-1 px-3 py-2 bg-green-600 text-white rounded-md text-sm"
                          disabled={!newHotspotName.trim() || (newHotspotType === 'nav' && !newHotspotTargetScene)}
                        >
                          Save
                        </button>
                        <button 
                          on:click={cancelHotspotEdit}
                          class="flex-1 px-3 py-2 bg-gray-600 text-white rounded-md text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                {/if}

                <!-- Hotspot List -->
                {#if panoramicHotspots.length > 0}
                  <div class="bg-white rounded-lg border p-4">
                    <h3 class="font-semibold text-gray-900 mb-3">Hotspots ({panoramicHotspots.length})</h3>
                    <div class="space-y-2 max-h-64 overflow-y-auto">
                      {#each panoramicHotspots as hotspot (hotspot.id)}
                        <div class="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <div class="flex-1">
                            <div class="flex items-center gap-2">
                              {#if hotspot.type === 'nav'}
                                <span class="px-2 py-1 rounded text-xs bg-green-100 text-green-800">NAV</span>
                              {:else}
                                <span class="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">INFO</span>
                              {/if}
                              <span>{hotspot.label || 'Unnamed'}</span>
                            </div>
                          </div>
                          <div class="flex items-center space-x-1">
                            <button
                              on:click={() => startEditingHotspot(hotspot)}
                              class="p-1 text-blue-600"
                            >
                              <Edit3 class="w-3 h-3" />
                            </button>
                            <button
                              on:click={() => deleteHotspot(hotspot.id)}
                              class="p-1 text-red-600"
                            >
                              <Trash2 class="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                <!-- Summary -->
                {#if panoramicScenes.length > 0}
                  <div class="bg-blue-50 rounded-lg border border-blue-200 p-4">
                    <h3 class="font-semibold text-blue-900 mb-2">Panoramic Summary</h3>
                    <div class="space-y-1 text-sm text-blue-800">
                      <p>Total Scenes: <span class="font-medium">{panoramicScenes.length}</span></p>
                      <p>Total Hotspots: <span class="font-medium">{panoramicScenes.reduce((t, s) => t + (s.hotspots?.length || 0), 0)}</span></p>
                      <p>Current Scene: <span class="font-medium">{currentScene?.name}</span></p>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <!-- Project List View -->
      <div class="space-y-6">
        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div class="relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  bind:value={searchQuery}
                  type="text"
                  placeholder="Search projects..."
                  class="w-full pl-10 pr-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select bind:value={selectedCategory} class="w-full px-3 py-2 border rounded-md">
                <option value="">All</option>
                {#each availableCategories as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select bind:value={selectedYear} class="w-full px-3 py-2 border rounded-md">
                <option value="">All</option>
                {#each availableYears as year}
                  <option value={year.toString()}>{year}</option>
                {/each}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sort</label>
              <div class="flex space-x-2">
                <select bind:value={sortBy} class="flex-1 px-3 py-2 border rounded-md">
                  <option value="year">Year</option>
                  <option value="title">Title</option>
                  <option value="category">Category</option>
                </select>
                <button
                  on:click={() => sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'}
                  class="px-3 py-2 border rounded-md"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t flex justify-between text-sm">
            <span>Showing {filteredProjects.length} of {projects.length}</span>
            <button
              on:click={() => showJsonOutput = !showJsonOutput}
              class="text-blue-600"
            >
              {showJsonOutput ? 'Hide' : 'Show'} Export
            </button>
          </div>
        </div>

        <!-- Export Panel -->
        {#if showJsonOutput}
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h3 class="font-semibold mb-4">Export Data</h3>
            <div class="grid grid-cols-4 gap-4">
              <button on:click={downloadProjects} class="px-4 py-2 bg-blue-600 text-white rounded-md">
                <Download class="w-4 h-4 inline mr-2" />
                Download
              </button>
              <button on:click={copyProjectsCode} class="px-4 py-2 bg-gray-600 text-white rounded-md">
                <Copy class="w-4 h-4 inline mr-2" />
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
              <label class="px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer text-center">
                <Upload class="w-4 h-4 inline mr-2" />
                Import
                <input type="file" accept=".json" on:change={handleFileImport} class="hidden" />
              </label>
              <button on:click={resetToOriginal} class="px-4 py-2 bg-red-600 text-white rounded-md" disabled={!hasUnsavedChanges}>
                Reset
              </button>
            </div>
          </div>
        {/if}

        <!-- Project List -->
        <ProjectList
          projects={filteredProjects}
          on:edit={(e) => editProject(e.detail)}
          on:delete={(e) => deleteProject(e.detail)}
          on:duplicate={(e) => duplicateProject(e.detail)}
        />
      </div>
    {/if}
  </div>
</div>
