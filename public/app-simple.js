// Simple version without ES6 modules - GUARANTEED to work!
class FragranceApp {
  constructor() {
    console.log('🌟 FragranceAI starting...');
    
    // Mock data that mimics your backend
    this.mockPerfumes = [
      {
        id: 'chanel-no5',
        name: 'Chanel No. 5',
        brand: 'Chanel',
        notes: {
          top: ['Aldehydes', 'Lemon', 'Neroli', 'Bergamot'],
          middle: ['Jasmine', 'Rose', 'Lily of the Valley', 'Iris'],
          base: ['Sandalwood', 'Vanilla', 'Musk', 'Cedar']
        },
        fragranceFamily: 'Floral',
        year: 1921,
        confidence: 0.95
      },
      {
        id: 'tom-ford-black-orchid',
        name: 'Black Orchid',
        brand: 'Tom Ford',
        notes: {
          top: ['Truffle', 'Gardenia', 'Black Currant', 'Ylang Ylang'],
          middle: ['Orchid', 'Spicy Notes', 'Fruity Notes', 'Lotus Wood'],
          base: ['Patchouli', 'Vanilla', 'Incense', 'Sandalwood']
        },
        fragranceFamily: 'Oriental',
        year: 2006,
        confidence: 0.90
      },
      {
        id: 'creed-aventus',
        name: 'Aventus',
        brand: 'Creed',
        notes: {
          top: ['Pineapple', 'Bergamot', 'Black Currant', 'Apple'],
          middle: ['Rose', 'Dry Birch', 'Moroccan Jasmine', 'Patchouli'],
          base: ['Oak Moss', 'Musk', 'Ambergris', 'Vanilla']
        },
        fragranceFamily: 'Woody',
        year: 2010,
        confidence: 0.88
      },
      {
        id: 'dior-sauvage',
        name: 'Sauvage',
        brand: 'Dior',
        notes: {
          top: ['Calabrian Bergamot', 'Pepper'],
          middle: ['Sichuan Pepper', 'Lavender', 'Pink Pepper', 'Vetiver'],
          base: ['Ambroxan', 'Cedar', 'Labdanum']
        },
        fragranceFamily: 'Woody',
        year: 2015,
        confidence: 0.85
      },
      {
        id: 'chanel-coco-mademoiselle',
        name: 'Coco Mademoiselle',
        brand: 'Chanel',
        notes: {
          top: ['Orange', 'Mandarin Orange', 'Orange Blossom', 'Bergamot'],
          middle: ['Mimosa', 'Jasmine', 'Turkish Rose', 'Ylang Ylang'],
          base: ['White Musk', 'Opoponax', 'Tonka Bean', 'Patchouli']
        },
        fragranceFamily: 'Floral',
        year: 2001,
        confidence: 0.92
      }
    ];
    
    this.userCollection = [];
    this.initializeElements();
    this.initializeEventListeners();
    this.initializeTheme();
    
    console.log('✅ FragranceAI initialized successfully!');
  }

  initializeElements() {
    // Search elements
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('search-btn');
    this.searchResults = document.getElementById('search-results');
    this.resultsContainer = document.getElementById('results-container');
    
    // Collection elements
    this.collectionContainer = document.getElementById('collection-container');
    this.collectionCount = document.getElementById('collection-count');
    this.analyzeBtn = document.getElementById('analyze-btn');
    
    // Theme toggle
    this.themeBtn = document.getElementById('theme-btn');
  }

  initializeEventListeners() {
    // Search functionality
    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', () => {
        console.log('🔍 Search button clicked!');
        this.handleSearch();
      });
    }
    
    if (this.searchInput) {
      this.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          console.log('🔍 Enter key pressed!');
          this.handleSearch();
        }
      });
    }

    // Search suggestions
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const query = e.target.dataset.query;
        this.searchInput.value = query;
        this.handleSearch();
      });
    });

    // Theme toggle
    if (this.themeBtn) {
      this.themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Collection analyze button
    if (this.analyzeBtn) {
      this.analyzeBtn.addEventListener('click', () => this.analyzeCollection());
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('fragrance-app-theme') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = this.themeBtn.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    localStorage.setItem('fragrance-app-theme', theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  handleSearch() {
    const query = this.searchInput.value.trim();
    console.log('🔍 Searching for:', query);
    
    if (!query) {
      console.log('❌ Empty search query');
      return;
    }

    // Simulate API delay
    this.showLoading();
    
    setTimeout(() => {
      // Smart search logic
      const results = this.searchPerfumes(query);
      console.log('📊 Search results:', results);
      this.displaySearchResults(results);
      this.hideLoading();
    }, 500);
  }

  searchPerfumes(query) {
    const queryLower = query.toLowerCase();
    
    return this.mockPerfumes
      .map(perfume => {
        let confidence = 0;
        
        // Name match
        if (perfume.name.toLowerCase().includes(queryLower)) {
          confidence += 0.6;
        }
        
        // Brand match  
        if (perfume.brand.toLowerCase().includes(queryLower)) {
          confidence += 0.4;
        }
        
        // Exact matches get higher scores
        if (perfume.name.toLowerCase() === queryLower) {
          confidence = 0.95;
        }
        
        return { ...perfume, confidence };
      })
      .filter(perfume => perfume.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence);
  }

  showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
    }
  }

  hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('hidden');
    }
  }

  displaySearchResults(results) {
    if (!this.resultsContainer) {
      console.error('❌ Results container not found');
      return;
    }

    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try searching for "Chanel", "Tom Ford", or "Aventus"</p>
        </div>
      `;
    } else {
      this.resultsContainer.innerHTML = results.map(perfume => 
        this.createPerfumeCard(perfume, 'search')
      ).join('');
      
      // Attach event listeners to new cards
      this.attachCardEventListeners();
    }
    
    this.searchResults.classList.remove('hidden');
    
    // Smooth scroll to results
    this.searchResults.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    console.log('✅ Results displayed');
  }

  createPerfumeCard(perfume, context = 'collection') {
    const isInCollection = this.userCollection.some(p => p.id === perfume.id);
    
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

        <div class="fragrance-family" style="margin: 1rem 0;">
          <span style="background: var(--accent-gradient); color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 500;">
            ${perfume.fragranceFamily}
          </span>
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
        </div>
      </div>
    `;
  }

  attachCardEventListeners() {
    // Add to collection buttons
    document.querySelectorAll('.add-to-collection-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const perfumeId = e.target.closest('.add-to-collection-btn').dataset.perfumeId;
        this.addToCollection(perfumeId);
      });
    });

    // Remove from collection buttons
    document.querySelectorAll('.remove-from-collection-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const perfumeId = e.target.closest('.remove-from-collection-btn').dataset.perfumeId;
        this.removeFromCollection(perfumeId);
      });
    });
  }

  addToCollection(perfumeId) {
    const perfume = this.mockPerfumes.find(p => p.id === perfumeId);
    if (perfume && !this.userCollection.some(p => p.id === perfumeId)) {
      this.userCollection.push(perfume);
      this.updateCollectionDisplay();
      this.showSuccess(`Added ${perfume.name} to your collection!`);
      
      // Update the button in search results
      const addBtn = document.querySelector(`[data-perfume-id="${perfumeId}"] .add-to-collection-btn`);
      if (addBtn) {
        addBtn.disabled = true;
        addBtn.innerHTML = '<span>✅</span> In Collection';
      }
    }
  }

  removeFromCollection(perfumeId) {
    this.userCollection = this.userCollection.filter(p => p.id !== perfumeId);
    this.updateCollectionDisplay();
    this.showSuccess('Perfume removed from collection');
    
    // Update search results if visible
    const searchCard = document.querySelector(`#search-results [data-perfume-id="${perfumeId}"] .add-to-collection-btn`);
    if (searchCard) {
      searchCard.disabled = false;
      searchCard.innerHTML = '<span>➕</span> Add to Collection';
    }
  }

  updateCollectionDisplay() {
    this.collectionCount.textContent = this.userCollection.length;
    
    if (this.userCollection.length === 0) {
      this.collectionContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🌸</div>
          <h3>Start Your Fragrance Journey</h3>
          <p>Search for perfumes above to build your collection and discover your unique scent profile.</p>
        </div>
      `;
      this.analyzeBtn.classList.add('hidden');
    } else {
      this.collectionContainer.innerHTML = this.userCollection.map(perfume => 
        this.createPerfumeCard(perfume, 'collection')
      ).join('');
      this.analyzeBtn.classList.remove('hidden');
      this.attachCardEventListeners();
    }
  }

  analyzeCollection() {
    if (this.userCollection.length === 0) return;
    
    this.showSuccess(`Analyzing your collection of ${this.userCollection.length} perfumes...`);
    
    // Simple analysis
    const familyCounts = {};
    const allNotes = [];
    
    this.userCollection.forEach(perfume => {
      // Count families
      familyCounts[perfume.fragranceFamily] = (familyCounts[perfume.fragranceFamily] || 0) + 1;
      
      // Collect all notes
      allNotes.push(...perfume.notes.top, ...perfume.notes.middle, ...perfume.notes.base);
    });
    
    // Find most common notes
    const noteCounts = {};
    allNotes.forEach(note => {
      noteCounts[note] = (noteCounts[note] || 0) + 1;
    });
    
    const topNotes = Object.entries(noteCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([note, count]) => ({ note, count }));
    
    console.log('Analysis:', { familyCounts, topNotes });
    this.showSuccess('Analysis complete! Check console for details.');
  }

  showSuccess(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: #10b981;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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

// Add CSS animations
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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM loaded, initializing app...');
  window.fragranceApp = new FragranceApp();
});