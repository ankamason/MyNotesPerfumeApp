import { GoogleFragranceSearchService } from './src/services/GoogleFragranceSearchService.js';
import { UserCollection } from './src/models/UserCollection.js';
import { Perfume } from './src/models/Perfume.js';
import { RecommendationEngine } from './src/services/RecommendationEngine.js';
import { NoteNormalizer } from './src/utils/NoteNormalizer.js';

class FragranceAppWithBackend {
  constructor() {
    console.log('🤖 FragranceAI starting with sophisticated backend!');
    
    this.userCollection = new UserCollection();
    this.lastSearchResults = [];
    
    this.initializeElements();
    this.initializeEventListeners();
    this.initializeTheme();
    this.loadCollection();
    this.updateCollectionDisplay();
    
    console.log('✅ AI-powered backend is now running in the browser!');
    console.log('👨‍💻 Backend services loaded:', {
      GoogleFragranceSearchService: !!GoogleFragranceSearchService,
      UserCollection: !!UserCollection,
      Perfume: !!Perfume,
      RecommendationEngine: !!RecommendationEngine,
      NoteNormalizer: !!NoteNormalizer
    });
  }

  loadCollection() {
    try {
      const savedPerfumes = localStorage.getItem('fragrance-collection');
      if (savedPerfumes) {
        const perfumesData = JSON.parse(savedPerfumes);
        
        perfumesData.forEach(perfumeData => {
          // Normalize notes when loading from localStorage
          const normalizedPerfumeData = {
            ...perfumeData,
            notes: {
              top: NoteNormalizer.normalizeArray(perfumeData.notes?.top || []),
              middle: NoteNormalizer.normalizeArray(perfumeData.notes?.middle || []),
              base: NoteNormalizer.normalizeArray(perfumeData.notes?.base || [])
            }
          };
          
          const perfume = new Perfume(normalizedPerfumeData);
          this.userCollection.addPerfume(perfume);
        });
        
        console.log(`🔄 Loaded and normalized ${perfumesData.length} perfumes from localStorage`);
      }
    } catch (error) {
      console.error('Error loading collection from localStorage:', error);
      localStorage.removeItem('fragrance-collection');
    }
  }

  saveCollection() {
    try {
      const perfumes = this.userCollection.getAllPerfumes();
      localStorage.setItem('fragrance-collection', JSON.stringify(perfumes));
      console.log(`💾 Saved ${perfumes.length} perfumes to localStorage`);
    } catch (error) {
      console.error('Error saving collection to localStorage:', error);
    }
  }

  clearCollection() {
    localStorage.removeItem('fragrance-collection');
    this.userCollection = new UserCollection();
    this.updateCollectionDisplay();
    this.showSuccess('Collection cleared!');
  }

  initializeElements() {
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('search-btn');
    this.searchResults = document.getElementById('search-results');
    this.resultsContainer = document.getElementById('results-container');
    
    this.collectionSection = document.getElementById('collection-section');
    this.collectionContainer = document.getElementById('collection-container');
    this.collectionCount = document.getElementById('collection-count');
    this.analyzeBtn = document.getElementById('analyze-btn');
    
    this.analysisSection = document.getElementById('analysis-section');
    this.signatureNotes = document.getElementById('signature-notes');
    this.familyChart = document.getElementById('family-chart');
    this.intensityProfile = document.getElementById('intensity-profile');
    
    this.recommendationsSection = document.getElementById('recommendations-section');
    this.recommendationsContainer = document.getElementById('recommendations-container');
    
    this.loadingOverlay = document.getElementById('loading-overlay');
    
    this.themeBtn = document.getElementById('theme-btn');
    
    this.addManualBtn = document.getElementById('add-manual-btn');
    this.manualEntryModal = document.getElementById('manual-entry-modal');
    this.closeModalBtn = document.getElementById('close-modal-btn');
    this.manualPerfumeForm = document.getElementById('manual-perfume-form');
    this.cancelBtn = document.getElementById('cancel-btn');
    
    console.log('🔧 Elements initialized:', {
      searchInput: !!this.searchInput,
      searchBtn: !!this.searchBtn,
      collectionSection: !!this.collectionSection,
      collectionContainer: !!this.collectionContainer,
      collectionCount: !!this.collectionCount,
      analyzeBtn: !!this.analyzeBtn,
      themeBtn: !!this.themeBtn,
      addManualBtn: !!this.addManualBtn,
      manualEntryModal: !!this.manualEntryModal,
      closeModalBtn: !!this.closeModalBtn,
      manualPerfumeForm: !!this.manualPerfumeForm,
      cancelBtn: !!this.cancelBtn
    });
  }

  initializeEventListeners() {
    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', () => this.handleSearch());
    }
    
    if (this.searchInput) {
      this.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSearch();
      });
    }
    
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const query = e.target.dataset.query;
        if (this.searchInput) {
          this.searchInput.value = query;
          this.handleSearch();
        }
      });
    });
    
    if (this.analyzeBtn) {
      this.analyzeBtn.addEventListener('click', () => this.analyzeCollection());
    }
    
    if (this.themeBtn) {
      this.themeBtn.addEventListener('click', () => this.toggleTheme());
    }
    
    if (this.addManualBtn) {
      this.addManualBtn.addEventListener('click', () => this.openManualEntryModal());
    }
    
    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => this.closeManualEntryModal());
    }
    
    if (this.cancelBtn) {
      this.cancelBtn.addEventListener('click', () => this.closeManualEntryModal());
    }
    
    if (this.manualPerfumeForm) {
      this.manualPerfumeForm.addEventListener('submit', (e) => this.handleManualPerfumeSubmit(e));
    }
    
    if (this.manualEntryModal) {
      this.manualEntryModal.addEventListener('click', (e) => {
        if (e.target === this.manualEntryModal) {
          this.closeManualEntryModal();
        }
      });
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.manualEntryModal && !this.manualEntryModal.classList.contains('hidden')) {
        this.closeManualEntryModal();
      }
    });
  }

  openManualEntryModal() {
    console.log('🔓 Opening manual entry modal');
    if (this.manualEntryModal) {
      this.manualEntryModal.classList.remove('hidden');
      
      setTimeout(() => {
        const nameInput = document.getElementById('perfume-name');
        if (nameInput) nameInput.focus();
      }, 100);
    }
  }

  closeManualEntryModal() {
    console.log('🔒 Closing manual entry modal');
    if (this.manualEntryModal) {
      this.manualEntryModal.classList.add('hidden');
    }
    
    if (this.manualPerfumeForm) {
      this.manualPerfumeForm.reset();
    }
  }

  async handleManualPerfumeSubmit(e) {
    e.preventDefault();
    console.log('📝 Manual perfume form submitted');

    // 🔍 ADD THIS DEBUG LINE RIGHT AT THE TOP
    const familySelect = document.getElementById('fragrance-family');
    console.log('🔍 SUBMISSION: Selected families at form submit:', 
        Array.from(familySelect.selectedOptions).map(o => o.value));
    
    console.log(this.isEditing ? '💾 Edit perfume form submitted' : '📝 Manual perfume form submitted');
    
    const perfumeData = this.extractPerfumeFromForm();
    
    console.log('📋 Manual perfume data (before normalization):', perfumeData);
    
    if (!perfumeData.name.trim() || !perfumeData.brand.trim()) {
      this.showError('Please fill in the perfume name and brand.');
      return;
    }
    
    try {
      // Normalize notes before creating perfume object
      const normalizedPerfumeData = {
        ...perfumeData,
        notes: {
          top: NoteNormalizer.normalizeArray(perfumeData.notes.top),
          middle: NoteNormalizer.normalizeArray(perfumeData.notes.middle),
          base: NoteNormalizer.normalizeArray(perfumeData.notes.base)
        }
      };
      
      console.log('📋 Manual perfume data (after normalization):', normalizedPerfumeData);
      
      const perfume = new Perfume(normalizedPerfumeData);
      console.log('✨ Created manual perfume object:', perfume);
      
      const success = this.userCollection.addPerfume(perfume);
      
      if (success) {
        console.log('✅ Manual perfume added to collection');
        
        this.saveCollection();
        this.updateCollectionDisplay();
        this.showSuccess(`Added ${perfume.name} to your collection!`);
        this.closeManualEntryModal();
        
        setTimeout(() => {
          if (this.collectionSection) {
            this.collectionSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 100);
        
      } else {
        this.showError('This perfume is already in your collection.');
      }
      
    } catch (error) {
      console.error('❌ Error creating manual perfume:', error);
      this.showError('Error adding perfume. Please check your information.');
    }
  }

  extractPerfumeFromForm() {
    console.log('🔍 === EXTRACT FORM START ===');
    
    // Get form values
    const nameInput = document.getElementById('perfume-name');
    const brandInput = document.getElementById('perfume-brand');
    const yearInput = document.getElementById('perfume-year');
    const topNotesInput = document.getElementById('top-notes');
    const middleNotesInput = document.getElementById('middle-notes');
    const baseNotesInput = document.getElementById('base-notes');
    
    const name = nameInput ? nameInput.value.trim() : '';
    const brand = brandInput ? brandInput.value.trim() : '';
    const year = yearInput ? yearInput.value || null : null;
    
    // 🔧 FIXED: Multi-select fragrance family extraction with better error handling
    const familySelect = document.getElementById('fragrance-family');
    console.log('🔍 Family select element found:', !!familySelect);
    
    let selectedFamilies = [];
    let family = 'Unclassified';
    
    if (familySelect && familySelect.selectedOptions) {
        try {
            selectedFamilies = Array.from(familySelect.selectedOptions).map(option => option.value);
            console.log('🔍 Successfully extracted families:', selectedFamilies);
            
            if (selectedFamilies.length > 0) {
                family = selectedFamilies.join(' ');
                console.log('🔍 Joined family string:', family);
            } else {
                console.log('🔍 No families selected, using Unclassified');
            }
        } catch (error) {
            console.error('❌ Error extracting families:', error);
            console.log('🔧 Falling back to Unclassified');
            family = 'Unclassified';
        }
    } else {
        console.log('❌ Family select element or selectedOptions not found');
    }
    
    console.log('🔍 Final family result:', family);
    
    // Parse and normalize notes (split by comma and clean up)
    const topNotes = this.parseNotesInput(topNotesInput ? topNotesInput.value : '');
    const middleNotes = this.parseNotesInput(middleNotesInput ? middleNotesInput.value : '');
    const baseNotes = this.parseNotesInput(baseNotesInput ? baseNotesInput.value : '');
    
    console.log('🔍 Parsed notes before final processing:', { topNotes, middleNotes, baseNotes });
    
    // Generate unique ID for manually added perfume (only if not editing)
    const id = this.isEditing ? this.editingPerfumeId : `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const perfumeData = {
        id: id,
        name: name,
        brand: brand,
        notes: {
            top: topNotes.length > 0 ? topNotes : ['Not Specified'],
            middle: middleNotes.length > 0 ? middleNotes : ['Not Specified'],
            base: baseNotes.length > 0 ? baseNotes : ['Not Specified']
        },
        fragranceFamily: family, // This should now be "Oriental Gourmand Green Chypre"
        year: year ? parseInt(year) : null,
        source: 'manual-entry',
        description: `Manually added ${family.toLowerCase()} fragrance.`
    };
    
    console.log('🔍 === EXTRACT FORM END ===');
    console.log('🔍 Final perfume data:', perfumeData);
    return perfumeData;
  }

  parseNotesInput(input) {
    if (!input || !input.trim()) return [];
    
    // Split by comma, normalize each note, and filter out empty ones
    const notes = input
      .split(',')
      .map(note => note.trim())
      .filter(note => note.length > 0)
      .slice(0, 10); // Limit to 10 notes maximum
    
    // Normalize all notes for consistent capitalization
    const normalizedNotes = NoteNormalizer.normalizeArray(notes);
    
    console.log('🔍 parseNotesInput - Input:', input);
    console.log('🔍 parseNotesInput - Raw notes:', notes);
    console.log('🔍 parseNotesInput - Normalized notes:', normalizedNotes);
    
    return normalizedNotes;
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('fragrance-app-theme') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (this.themeBtn) {
      const themeIcon = this.themeBtn.querySelector('.theme-icon');
      if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }
    localStorage.setItem('fragrance-app-theme', theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  showLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.remove('hidden');
    }
  }

  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('hidden');
    }
  }

  async handleSearch() {
    if (!this.searchInput) return;
    
    const query = this.searchInput.value.trim();
    if (!query) return;

    console.log('🔍 Using YOUR GoogleFragranceSearchService to search for:', query);
    this.showLoading();
    
    try {
      const results = await GoogleFragranceSearchService.searchPerfume(query);
      console.log('🎯 Your AI found these results:', results);
      
      // Normalize notes in search results for consistency
      this.lastSearchResults = results.map(result => ({
        ...result,
        notes: {
          top: NoteNormalizer.normalizeArray(result.notes?.top || []),
          middle: NoteNormalizer.normalizeArray(result.notes?.middle || []),
          base: NoteNormalizer.normalizeArray(result.notes?.base || [])
        }
      }));
      
      this.displaySearchResults(this.lastSearchResults);
      
      if (this.searchResults) {
        this.searchResults.classList.remove('hidden');
        
        this.searchResults.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
      
    } catch (error) {
      console.error('Search error:', error);
      this.showError('Search failed. Please try again.');
    } finally {
      this.hideLoading();
    }
  }

  displaySearchResults(results) {
    if (!this.resultsContainer) return;
    
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try searching for "Chanel No. 5", "Tom Ford Black Orchid", or "Creed Aventus"</p>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = results.map(result => 
      this.createPerfumeCard(result, 'search')
    ).join('');
    
    this.attachCardEventListeners();
  }

  createPerfumeCard(perfume, context = 'collection') {
    const isInCollection = this.userCollection.hasPerfume(perfume.id);

    const fragranceFamilies = perfume.fragranceFamily && perfume.fragranceFamily !== 'Unclassified' 
    ? perfume.fragranceFamily.split(' ') 
    : ['Unclassified'];
    
    return `
      <div class="perfume-card" data-perfume-id="${perfume.id}">
        ${context === 'search' ? `<div class="confidence-score">${Math.round(perfume.confidence * 100)}% match</div>` : ''}
        
        <div class="card-header">
          <h3 class="perfume-name">${perfume.name}</h3>
          <p class="perfume-brand">${perfume.brand}</p>
          ${perfume.year ? `<p class="perfume-year" style="color: var(--text-muted); font-size: 0.875rem;">${perfume.year}</p>` : ''}
        </div>

        <div class="notes-section">
          <div class="notes-category">
            <div class="notes-label">Top Notes</div>
            <div class="notes-list">
              ${perfume.notes.top.map(note => `<span class="note-tag">${note}</span>`).join('')}
            </div>
          </div>
          
          <div class="notes-category">
            <div class="notes-label">Heart Notes</div>
            <div class="notes-list">
              ${perfume.notes.middle.map(note => `<span class="note-tag">${note}</span>`).join('')}
            </div>
          </div>
          
          <div class="notes-category">
            <div class="notes-label">Base Notes</div>
            <div class="notes-list">
              ${perfume.notes.base.map(note => `<span class="note-tag">${note}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="fragrance-families" style="margin: 1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${fragranceFamilies.map(family => `
            <span style="background: var(--accent-gradient); color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 500;">
              ${family}
            </span>
          `).join('')}
        </div>

        <div class="card-actions">
          ${context === 'search' ? `
            <button class="btn btn-primary add-to-collection-btn" data-perfume-id="${perfume.id}" ${isInCollection ? 'disabled' : ''}>
              <span>${isInCollection ? '✅' : '➕'}</span>
              ${isInCollection ? 'In Collection' : 'Add to Collection'}
            </button>
          ` : `
            <button class="btn btn-secondary remove-from-collection-btn" data-perfume-id="${perfume.id}">
              <span>🗑️</span>
              Remove
            </button>
          `}
          
          <button class="btn btn-secondary find-similar-btn" data-perfume-id="${perfume.id}">
            <span>🔍</span>
            Find Similar
          </button>
        </div>
      </div>
    `;
  }

  updateCollectionDisplay() {
    if (!this.collectionContainer || !this.collectionCount) return;
    
    const perfumes = this.userCollection.getAllPerfumes();
    console.log('🔄 Updating collection display with', perfumes.length, 'perfumes:', perfumes);
    
    this.collectionCount.textContent = perfumes.length;
    console.log('📊 Collection count updated to:', this.collectionCount.textContent);
    
    if (perfumes.length === 0) {
      this.collectionContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🌸</div>
          <h3>Start Your Fragrance Journey</h3>
          <p>Search for perfumes above to build your collection and discover your unique scent profile.</p>
        </div>
      `;
      if (this.analyzeBtn) {
        this.analyzeBtn.classList.add('hidden');
      }
      console.log('📝 Showing empty state');
    } else {
      console.log('🎨 Creating collection cards...');
      const collectionHTML = perfumes.map(perfume => {
        console.log('🃏 Creating card for:', perfume.name);
        return this.createPerfumeCard(perfume, 'collection');
      }).join('');
      
      this.collectionContainer.innerHTML = collectionHTML;
      if (this.analyzeBtn) {
        this.analyzeBtn.classList.remove('hidden');
      }
      console.log('✅ Collection display updated, analyze button shown');
    }

    this.attachCardEventListeners();
    console.log('🔗 Event listeners attached');
  }

  attachCardEventListeners() {
    document.querySelectorAll('.add-to-collection-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const perfumeId = e.target.closest('.add-to-collection-btn').dataset.perfumeId;
        this.addToCollection(perfumeId);
      });
    });

    document.querySelectorAll('.remove-from-collection-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const perfumeId = e.target.closest('.remove-from-collection-btn').dataset.perfumeId;
        this.removeFromCollection(perfumeId);
      });
    });

    document.querySelectorAll('.find-similar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const perfumeId = e.target.closest('.find-similar-btn').dataset.perfumeId;
        this.findSimilarPerfumes(perfumeId);
      });
    });
  }

  async addToCollection(perfumeId) {
    console.log('🎯 ADD TO COLLECTION CALLED with ID:', perfumeId);
    
    const perfumeData = this.lastSearchResults.find(p => p.id === perfumeId);
    console.log('🔍 Found perfume data:', perfumeData);
    
    if (perfumeData) {
      console.log('➕ Creating Perfume object...');
      // Notes are already normalized from search results processing
      const perfume = new Perfume(perfumeData);
      console.log('✅ Perfume object created:', perfume);
      
      console.log('📦 Adding to collection...');
      const success = this.userCollection.addPerfume(perfume);
      console.log('📊 Add success:', success);
      console.log('📈 Collection size now:', this.userCollection.getSize());
      console.log('🎨 All perfumes:', this.userCollection.getAllPerfumes());
      
      if (success) {
        this.saveCollection();
        
        console.log('🔄 Calling updateCollectionDisplay...');
        this.updateCollectionDisplay();
        
        console.log('🎉 Showing success message...');
        this.showSuccess(`Added ${perfume.name} to your collection!`);
        
        console.log('✅ Collection now has', this.userCollection.getSize(), 'perfumes');
        
        const addBtn = document.querySelector(`[data-perfume-id="${perfumeId}"] .add-to-collection-btn`);
        if (addBtn) {
          addBtn.disabled = true;
          addBtn.innerHTML = '<span>✅</span> In Collection';
          console.log('🔄 Updated add button for', perfume.name);
        }
        
        setTimeout(() => {
          if (this.collectionSection) {
            this.collectionSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 100);
        
        console.log('🔍 Collection container element:', this.collectionContainer);
        console.log('🔍 Collection container innerHTML length:', this.collectionContainer?.innerHTML?.length);
        console.log('🔍 Collection container content preview:', this.collectionContainer?.innerHTML?.substring(0, 100));
      }
    } else {
      console.error('❌ Could not find perfume data for ID:', perfumeId);
      console.log('📋 Available search results:', this.lastSearchResults.map(p => ({ id: p.id, name: p.name })));
    }
  }

  removeFromCollection(perfumeId) {
    console.log('🗑️ REMOVE FROM COLLECTION CALLED with ID:', perfumeId);
    
    const success = this.userCollection.removePerfume(perfumeId);
    console.log('📊 Remove success:', success);
    
    if (success) {
      this.saveCollection();
      
      console.log('🔄 Updating collection display after removal...');
      this.updateCollectionDisplay();
      this.showSuccess('Perfume removed from collection');
      
      const searchCard = document.querySelector(`#search-results [data-perfume-id="${perfumeId}"] .add-to-collection-btn`);
      if (searchCard) {
        searchCard.disabled = false;
        searchCard.innerHTML = '<span>➕</span> Add to Collection';
        console.log('🔄 Updated search result button after removal');
      }
    }
  }

  async findSimilarPerfumes(perfumeId) {
    this.showLoading();
    
    try {
      console.log('🔍 FIND SIMILAR called for ID:', perfumeId);
      
      let targetPerfume = null;
      
      targetPerfume = this.lastSearchResults.find(p => p.id === perfumeId);
      console.log('🔍 Found in search results:', !!targetPerfume);
      
      if (!targetPerfume) {
        targetPerfume = this.userCollection.getAllPerfumes().find(p => p.id === perfumeId);
        console.log('🔍 Found in collection:', !!targetPerfume);
      }
      
      if (!targetPerfume) {
        console.log('🔍 Trying to find by name in mock database...');
        const allCandidates = await GoogleFragranceSearchService.searchPerfume('');
        targetPerfume = allCandidates.find(p => p.id === perfumeId);
        console.log('🔍 Found in mock database:', !!targetPerfume);
      }
      
      console.log('📋 Available IDs in search results:', this.lastSearchResults.map(p => p.id));
      console.log('📋 Available IDs in collection:', this.userCollection.getAllPerfumes().map(p => p.id));
      
      if (!targetPerfume) {
        console.error('❌ Could not find target perfume with ID:', perfumeId);
        this.showError('Could not find the selected perfume. Please try again.');
        return;
      }
      
      console.log('✅ Target perfume found:', targetPerfume.name);
      console.log('🔍 Using YOUR RecommendationEngine to find perfumes similar to:', targetPerfume.name);
      
      const allCandidates = await GoogleFragranceSearchService.searchPerfume('');
      
      // Normalize candidate notes for consistent comparison
      const normalizedCandidates = allCandidates
        .filter(p => p.id !== perfumeId)
        .map(candidate => ({
          ...candidate,
          notes: {
            top: NoteNormalizer.normalizeArray(candidate.notes?.top || []),
            middle: NoteNormalizer.normalizeArray(candidate.notes?.middle || []),
            base: NoteNormalizer.normalizeArray(candidate.notes?.base || [])
          }
        }));
      
      console.log('📊 Found', normalizedCandidates.length, 'candidate perfumes for comparison');
      
      const recommendations = RecommendationEngine.findSimilarPerfumesNormalized(
        targetPerfume, 
        normalizedCandidates
      );
      
      console.log('🎯 Your AI found these similar perfumes:', recommendations);
      
      this.displayRecommendations(recommendations, `Similar to ${targetPerfume.name}`);
      
      if (this.recommendationsSection) {
        this.recommendationsSection.classList.remove('hidden');
        
        this.recommendationsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
      
    } catch (error) {
      console.error('Find similar error:', error);
      this.showError('Could not find similar perfumes.');
    } finally {
      this.hideLoading();
    }
  }

  async analyzeCollection() {
    if (this.userCollection.getSize() === 0) {
      this.showError('Add some perfumes to your collection first!');
      return;
    }
    
    console.log('🧠 Using UserCollection analytics to analyze', this.userCollection.getSize(), 'perfumes...');
    this.showLoading();
    
    try {
      const popularNotes = this.userCollection.getMostPopularNotes();
      const familyDistribution = this.userCollection.getFamilyDistribution();
      const intensityProfile = this.userCollection.getIntensityProfile();
      
      console.log('📊 Your AI analysis results:', {
        popularNotes: popularNotes.slice(0, 5),
        familyDistribution,
        intensityProfile
      });
      
      this.displaySignatureNotes(popularNotes.slice(0, 8));
      this.displayFamilyDistribution(familyDistribution);
      this.displayIntensityProfile(intensityProfile);
      
      await this.getCollectionBasedRecommendations();
      
      if (this.analysisSection) {
        this.analysisSection.classList.remove('hidden');
      }
      if (this.recommendationsSection) {
        this.recommendationsSection.classList.remove('hidden');
      }
      
      if (this.analysisSection) {
        this.analysisSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      this.showError('Analysis failed. Please try again.');
    } finally {
      this.hideLoading();
    }
  }

  displaySignatureNotes(notes) {
    if (!this.signatureNotes) return;
    
    this.signatureNotes.innerHTML = notes.map(note => `
      <div class="signature-note" style="background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); margin: 0.5rem; display: inline-block;">
        <div style="font-weight: 600; font-size: 1rem; color: var(--text-primary);">${note.note}</div>
        <div style="font-size: 0.875rem; color: var(--text-secondary);">Appears in ${note.count} perfume${note.count > 1 ? 's' : ''}</div>
      </div>
    `).join('');
  }

  displayFamilyDistribution(distribution) {
    if (!this.familyChart) return;
    
    this.familyChart.innerHTML = distribution.sortedByPopularity.map(family => `
      <div class="family-bar" style="margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-weight: 500; color: var(--text-primary);">${family.family}</span>
          <span style="color: var(--text-secondary); font-size: 0.875rem;">${family.percentage}%</span>
        </div>
        <div style="background: var(--bg-secondary); border-radius: 50px; height: 8px; overflow: hidden;">
          <div style="background: var(--accent-gradient); height: 100%; width: ${family.percentage}%; border-radius: 50px; transition: width 0.5s ease;"></div>
        </div>
      </div>
    `).join('');
  }

  displayIntensityProfile(profile) {
    if (!this.intensityProfile) return;
    
    this.intensityProfile.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">
          ${profile.dominantIntensity} Intensity Preference
        </div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
          ${profile.description}
        </div>
      </div>
    `;
  }

  async getCollectionBasedRecommendations() {
    try {
      console.log('🤖 Using RecommendationEngine for collection-based recommendations...');
      
      const allCandidates = await GoogleFragranceSearchService.searchPerfume('');
      
      // Normalize candidate notes and filter out owned perfumes
      const normalizedCandidates = allCandidates
        .filter(candidate => !this.userCollection.hasPerfume(candidate.id))
        .map(candidate => ({
          ...candidate,
          notes: {
            top: NoteNormalizer.normalizeArray(candidate.notes?.top || []),
            middle: NoteNormalizer.normalizeArray(candidate.notes?.middle || []),
            base: NoteNormalizer.normalizeArray(candidate.notes?.base || [])
          }
        }));
      
      const recommendations = RecommendationEngine.getCollectionBasedRecommendationsNormalized(
        this.userCollection,
        normalizedCandidates,
        5
      );
      
      console.log('✨ Your AI recommends these perfumes based on your collection:', recommendations);
      
      this.displayRecommendations(recommendations, 'Perfect For Your Style');
      
    } catch (error) {
      console.error('Recommendations error:', error);
    }
  }

  displayRecommendations(recommendations, title) {
    if (!this.recommendationsContainer || !this.recommendationsSection) return;
    
    if (recommendations.length === 0) {
      this.recommendationsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">✨</div>
          <h3>No recommendations available</h3>
          <p>Add more perfumes to your collection for better recommendations.</p>
        </div>
      `;
      return;
    }

    const titleElement = this.recommendationsSection.querySelector('.section-title');
    if (titleElement) {
      titleElement.innerHTML = `<span class="section-icon">✨</span>${title}`;
    }

    this.recommendationsContainer.innerHTML = recommendations.map(rec => `
      <div class="recommendation-card perfume-card">
        <div class="confidence-score">${Math.round((rec.matchScore || rec.similarityScore) * 100)}% match</div>
        
        ${this.createPerfumeCard(rec.perfume, 'recommendation')}
        
        <div class="recommendation-reasoning" style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
          <div style="font-weight: 500; margin-bottom: 0.5rem; color: var(--text-primary);">Why this matches you:</div>
          <ul style="margin: 0; padding-left: 1.5rem; color: var(--text-secondary); font-size: 0.875rem;">
            ${rec.reasoning.map(reason => `<li style="margin-bottom: 0.25rem;">${reason}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    this.attachCardEventListeners();
  }

  showSuccess(message) {
    this.showToast(message, 'success');
  }

  showError(message) {
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: var(--shadow-large);
      z-index: 10000;
      font-weight: 500;
      animation: slideDown 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    to { transform: translateX(-50%) translateY(0); opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateX(-50%) translateY(0); opacity: 1; }
    to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Loading your AI-powered fragrance app...');
  window.fragranceApp = new FragranceAppWithBackend();
});

document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('fragrance-family');
    const preview = document.getElementById('families-preview');
    const previewContainer = document.getElementById('selected-families-preview');
    
    function updatePreview() {
        const selected = Array.from(select.selectedOptions).map(option => option.value);
        
        if (selected.length === 0) {
            preview.textContent = 'No families selected';
            previewContainer.classList.remove('has-selection');
        } else if (selected.length === 1) {
            preview.textContent = `Selected: ${selected[0]}`;
            previewContainer.classList.add('has-selection');
        } else {
            preview.textContent = `Selected: ${selected.join(' + ')} → "${selected.join(' ')}"`;
            previewContainer.classList.add('has-selection');
        }
    }
    
    if (select) {
        select.addEventListener('change', updatePreview);
        updatePreview(); // Initial call
    }
});