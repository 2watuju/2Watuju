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

{/if}
