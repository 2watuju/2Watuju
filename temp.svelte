{#if showPanoramicEditor}
            {#if jsonEditMode}
              <!-- JSON Editor Mode -->
              <div class="space-y-6">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div class="flex items-start">
                    <Info class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 class="text-blue-900 font-medium mb-1">JSON Editor Mode</h3>
                      <p class="text-blue-800 text-sm">
                        Edit panoramic URLs and hotspot data directly in JSON format. 
                        Click "Apply Changes" to update the visual editor.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Panoramic URLs JSON Editor -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-semibold text-gray-900">
                      Panoramic Images (JSON)
                    </label>
                    <button
                      on:click={() => {
                        panoramicJsonText = JSON.stringify(
                          {
                            "living": "https://example.com/panorama/living.jpg",
                            "kitchen": "https://example.com/panorama/kitchen.jpg",
                            "bedroom": "https://example.com/panorama/bedroom.jpg"
                          }, 
                          null, 
                          2
                        );
                      }}
                      class="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Load Example
                    </button>
                  </div>
                  <p class="text-xs text-gray-600 mb-2">
                    JSON object mapping scene keys to image paths or URLs
                  </p>
                  <textarea
                    bind:value={panoramicJsonText}
                    rows="10"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={JSON.stringify({ living: 'https://example.com/image.jpg' })}
                  ></textarea>
                </div>

                <!-- Hotspots JSON Editor -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-semibold text-gray-900">
                      Hotspots (JSON Array)
                    </label>
                    <button
                      on:click={() => {
                        hotspotsJsonText = JSON.stringify([
                          {
                            "x": 50.5,
                            "y": 45.2,
                            "scene": "living",
                            "label": "Kitchen Entrance",
                            "type": "nav",
                            "targetScene": "kitchen",
                            "icon": "door"
                          },
                          {
                            "x": 30.0,
                            "y": 60.0,
                            "scene": "living",
                            "label": "Modern Sofa",
                            "type": "info",
                            "targetScene": "",
                            "icon": "info"
                          }
                        ], null, 2);
                      }}
                      class="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Load Example
                    </button>
                  </div>
                  <p class="text-xs text-gray-600 mb-2">
                    Array of hotspot objects with positions, labels, and navigation
                  </p>
                  <textarea
                    bind:value={hotspotsJsonText}
                    rows="15"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={JSON.stringify([{ x: 50, y: 50, scene: 'living', label: 'Info', type: 'info' }])}
                  ></textarea>
                </div>

                <!-- JSON Editor Actions -->
                <div class="flex items-center justify-between pt-4 border-t">
                  <div class="text-sm text-gray-600">
                    <p class="font-medium mb-1">Format Requirements:</p>
                    <ul class="list-disc list-inside space-y-1 text-xs">
                      <li><strong>Panoramic:</strong> Object with scene keys → image URLs</li>
                      <li><strong>Hotspots:</strong> Array with x, y, scene, label, type, targetScene</li>
                      <li><strong>Type:</strong> "info" or "nav"</li>
                      <li><strong>Coordinates:</strong> x and y are percentages (0-100)</li>
                    </ul>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      on:click={() => {
                        panoramicJsonText = '{}';
                        hotspotsJsonText = '[]';
                      }}
                      class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                    >
                      Clear
                    </button>
                    <button
                      on:click={syncFromJsonEditor}
                      class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      Apply Changes
                    </button>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Visual Editor Mode (existing code) -->
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
                    <button 
                      on:click={() => fileInput.click()}
                      class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Choose File
                    </button>
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
                    
                    <div class="flex flex-wrap gap-2">
                      {#each panoramicScenes as scene, index (scene.id)}
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
                            >
                              <Edit3 class="w-3 h-3" />
                            </button>
                            {#if panoramicScenes.length > 1}
                              <button
                                on:click={() => deleteScene(index)}
                                class="ml-1 p-1 text-red-400 hover:text-red-600"
                              >
                                <Trash2 class="w-3 h-3" />
                              </button>
                            {/if}
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
                          <div>
                            {#if currentScene?.file}
                              <span class="font-medium">{currentScene.file.name}</span>
                              <span class="ml-2">({Math.round(currentScene.file.size / 1024)} KB)</span>
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
                    <h3 class="font-semibold text-gray-900 mb-3">
                      Hotspots ({panoramicHotspots.length})
                      <button
                        on:click={syncToJsonEditor}
                        class="ml-2 text-xs text-blue-600 hover:text-blue-700"
                        title="Sync to JSON editor"
                      >
                        Sync to JSON
                      </button>
                    </h3>
                    <div class="space-y-3 max-h-96 overflow-y-auto">
                      {#each panoramicHotspots as hotspot, index (hotspot.id)}
                        <div class="border border-gray-200 rounded-lg p-3 bg-gray-50">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-medium text-gray-500">
                              Hotspot {index + 1}
                            </span>
                            <button
                              on:click={() => deleteHotspot(hotspot.id)}
                              class="p-1 text-red-600 hover:text-red-700"
                              title="Delete hotspot"
                            >
                              <Trash2 class="w-3 h-3" />
                            </button>
                          </div>
                          
                          <div class="space-y-2">
                            <!-- Position -->
                            <div class="grid grid-cols-2 gap-2">
                              <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">
                                  X Position (%)
                                </label>
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="100"
                                  bind:value={hotspot.x}
                                  on:change={() => {
                                    if (currentScene) currentScene.hotspots = [...panoramicHotspots];
                                  }}
                                  class="w-full px-2 py-1 border rounded text-xs"
                                />
                              </div>
                              <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">
                                  Y Position (%)
                                </label>
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="100"
                                  bind:value={hotspot.y}
                                  on:change={() => {
                                    if (currentScene) currentScene.hotspots = [...panoramicHotspots];
                                  }}
                                  class="w-full px-2 py-1 border rounded text-xs"
                                />
                              </div>
                            </div>

                            <!-- Label -->
                            <div>
                              <label class="block text-xs font-medium text-gray-700 mb-1">
                                Label
                              </label>
                              <input
                                type="text"
                                bind:value={hotspot.label}
                                on:change={() => {
                                  if (currentScene) currentScene.hotspots = [...panoramicHotspots];
                                }}
                                placeholder="Enter label"
                                class="w-full px-2 py-1 border rounded text-xs"
                              />
                            </div>

                            <!-- Scene (read-only) -->
                            <div>
                              <label class="block text-xs font-medium text-gray-700 mb-1">
                                Scene
                              </label>
                              <input
                                type="text"
                                value={currentScene?.name.toLowerCase().replace(/\s+/g, '') || ''}
                                disabled
                                class="w-full px-2 py-1 border rounded text-xs bg-gray-100 text-gray-500"
                              />
                            </div>

                            <!-- Type -->
                            <div>
                              <label class="block text-xs font-medium text-gray-700 mb-1">
                                Type
                              </label>
                              <select
                                bind:value={hotspot.type}
                                on:change={() => {
                                  hotspot.icon = hotspot.type === 'nav' ? 'door' : 'info';
                                  if (currentScene) currentScene.hotspots = [...panoramicHotspots];
                                  if (isViewerMode && viewer) {
                                    setTimeout(() => initPannellumViewer(true), 100);
                                  }
                                }}
                                class="w-full px-2 py-1 border rounded text-xs"
                              >
                                <option value="info">ℹ️ Information</option>
                                <option value="nav">🔺 Navigation</option>
                              </select>
                            </div>

                            <!-- Target Scene (only for nav type) -->
                            {#if hotspot.type === 'nav'}
                              <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">
                                  Target Scene
                                </label>
                                <select
                                  bind:value={hotspot.targetScene}
                                  on:change={() => {
                                    const targetScene = panoramicScenes.find(s => s.id.toString() === hotspot.targetScene);
                                    if (targetScene) {
                                      hotspot.targetSceneKey = targetScene.name.toLowerCase().replace(/\s+/g, '');
                                    }
                                    if (currentScene) currentScene.hotspots = [...panoramicHotspots];
                                    if (isViewerMode && viewer) {
                                      setTimeout(() => initPannellumViewer(true), 100);
                                    }
                                  }}
                                  class="w-full px-2 py-1 border rounded text-xs"
                                >
                                  <option value="">Select scene...</option>
                                  {#each availableTargetScenes as scene}
                                    <option value={scene.id.toString()}>{scene.name}</option>
                                  {/each}
                                </select>
                                {#if hotspot.targetSceneKey}
                                  <p class="text-xs text-gray-500 mt-1">
                                    Key: {hotspot.targetSceneKey}
                                  </p>
                                {/if}
                              </div>
                            {/if}

                            <!-- Quick Edit Button -->
                            <button
                              on:click={() => startEditingHotspot(hotspot)}
                              class="w-full mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                            >
                              Edit in Dialog
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
            {/if} <!-- closes {#if jsonEditMode} -->
          {/if}   <!-- closes {#if showPanoramicEditor} -->
        </div>
      </div>
    
{/if}
