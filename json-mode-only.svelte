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
            {/if}
