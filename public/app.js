// public/app.js - Modern JavaScript UI Controller

// Import backend services
import { GoogleFragranceSearchService } from './src/services/GoogleFragranceSearchService.js';
import { UserCollection } from './src/models/UserCollection.js';
import { Perfume } from './src/models/Perfume.js';
import { RecommendationEngine } from './src/services/RecommendationEngine.js';


class FragranceApp {
  constructor() {
    // Initialize your AI-powered backend
    this.userCollection = new UserCollection();
    this.isAnalyzing = false;
    
    // UI Elements
    this.initializeElements();
    
    // Event Listeners
    this.initializeEventListeners();
    
    // Theme System
    this.initializeTheme();
    
    // 🆕 LOAD SAVED COLLECTION
    this.loadCollection();
    
    console.log('🌟 FragranceAI initialized with your powerful backend!');
  }

  initializeElements() {
    // Search elements
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('search-btn');
    this.searchResults = document.getElementById('search-results');
    this.resultsContainer = document.getElementById('results-container');
    
    // Collection elements
    this.collectionSection = document.getElementById('collection-section');
    this.collectionContainer = document.getElementById('collection-container');
    this.collectionCount = document.getElementById('collection-count');
    this.analyzeBtn = document.getElementById('analyze-btn');
    
    // Analysis elements
    this.analysisSection = document.getElementById('analysis-section');
    this.signatureNotes = document.getElementById('signature-notes');
    this.familyChart = document.getElementById('family-chart');
    this.intensityProfile = document.getElementById('intensity-profile');
    
    // Recommendations elements
    this.recommendationsSection = document.getElementById('recommendations-section');
    this.recommendationsContainer = document.getElementById('recommendations-container');
    
    // Loading overlay
    this.loadingOverlay = document.getElementById('loading-overlay');
    
    // Theme toggle
    this.themeBtn = document.getElementById('theme-btn');
  }

  initializeEventListeners() {
    // Search functionality
    this.searchBtn.addEventListener('click', () => this.handleSearch());
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });
    
    // Search suggestions
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const query = e.target.dataset.query;
        this.searchInput.value = query;
        this.handleSearch();
      });
    });
    
    // Collection analysis
    this.analyzeBtn.addEventListener('click', () => this.analyzeCollection());
    
    // Theme toggle
    this.themeBtn.addEventListener('click', () => this.toggleTheme());
  }

  initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('fragrance-app-theme') || 'light';
    this.setTheme(savedTheme);
  }

  // 🆕 LOAD SAVED COLLECTION FROM LOCALSTORAGE
  loadCollection() {
    try {
      const savedPerfumes = localStorage.getItem('fragrance-collection');
      if (savedPerfumes) {
        const perfumesData = JSON.parse(savedPerfumes);
        
        // Reconstruct Perfume objects and add to collection
        perfumesData.forEach(perfumeData => {
          const perfume = new Perfume(perfumeData);
          this.userCollection.addPerfume(perfume);
        });
        
        console.log(`🔄 Loaded ${perfumesData.length} perfumes from localStorage`);
        this.updateCollectionDisplay();
      }
    } catch (error) {
      console.error('Error loading collection from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('fragrance-collection');
    }
  }

  // 🆕 SAVE COLLECTION TO LOCALSTORAGE
  saveCollection() {
    try {
      const perfumes = this.userCollection.getAllPerfumes();
      localStorage.setItem('fragrance-collection', JSON.stringify(perfumes));
      console.log(`💾 Saved ${perfumes.length} perfumes to localStorage`);
    } catch (error) {
      console.error('Error saving collection to localStorage:', error);
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = this.themeBtn.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('fragrance-app-theme', theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  showLoading() {
    this.loadingOverlay.classList.remove('hidden');
  }

  hideLoading() {
    this.loadingOverlay.classList.add('hidden');
  }

  async handleSearch() {
    const query = this.searchInput.value.trim();
    if (!query) return;

    this.showLoading();
    
    try {
      // Use GoogleFragranceSearchService!
      const results = await GoogleFragranceSearchService.searchPerfume(query);
      
      // 🆕 STORE SEARCH RESULTS FOR ADDING TO COLLECTION
      this.lastSearchResults = results;
      
      this.displaySearchResults(results);
      this.searchResults.classList.remove('hidden');
      
      // Smooth scroll to results
      this.searchResults.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
    } catch (error) {
      console.error('Search error:', error);
      this.showError('Search failed. Please try again.');
    } finally {
      this.hideLoading();
    }
  }

  displaySearchResults(results) {
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try searching for "Chanel", "Tom Ford", or "Aventus"</p>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = results.map(result => 
      this.createPerfumeCard(result, 'search')
    ).join('');
  }

  createPerfumeCard(perfume, context = 'collection') {
    const isInCollection = this.userCollection.hasPerfume(perfume.id);
    
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
          
          <button class="btn btn-secondary find-similar-btn" data-perfume-id="${perfume.id}">
            <span>🔍</span>
            Find Similar
          </button>
        </div>
      </div>
    `;
  }

  updateCollectionDisplay() {
    const perfumes = this.userCollection.getAllPerfumes();
    this.collectionCount.textContent = perfumes.length;
    
    if (perfumes.length === 0) {
      this.collectionContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🌸</div>
          <h3>Start Your Fragrance Journey</h3>
          <p>Search for perfumes above to build your collection and discover your unique scent profile.</p>
        </div>
      `;
      this.analyzeBtn.classList.add('hidden');
    } else {
      this.collectionContainer.innerHTML = perfumes.map(perfume => 
        this.createPerfumeCard(perfume, 'collection')
      ).join('');
      this.analyzeBtn.classList.remove('hidden');
    }

    // Re-attach event listeners for collection cards
    this.attachCardEventListeners();
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

    // Find similar buttons
    document.querySelectorAll('.find-similar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const perfumeId = e.target.closest('.find-similar-btn').dataset.perfumeId;
        this.findSimilarPerfumes(perfumeId);
      });
    });
  }

  async addToCollection(perfumeId) {
    // Find the perfume from search results
    const perfumeCard = document.querySelector(`[data-perfume-id="${perfumeId}"]`);
    const perfumeData = this.getStoredSearchResults().find(p => p.id === perfumeId);
    
    if (perfumeData) {
      const perfume = new Perfume(perfumeData);
      const success = this.userCollection.addPerfume(perfume);
      
      if (success) {
        // 🆕 SAVE TO LOCALSTORAGE
        this.saveCollection();
        
        this.updateCollectionDisplay();
        this.showSuccess(`Added ${perfume.name} to your collection!`);
        
        // Update the button in search results
        const addBtn = perfumeCard.querySelector('.add-to-collection-btn');
        if (addBtn) {
          addBtn.disabled = true;
          addBtn.innerHTML = '<span>✅</span> In Collection';
        }
      }
    }
  }

  removeFromCollection(perfumeId) {
    const success = this.userCollection.removePerfume(perfumeId);
    if (success) {
      // 🆕 SAVE TO LOCALSTORAGE
      this.saveCollection();
      
      this.updateCollectionDisplay();
      this.showSuccess('Perfume removed from collection');
      
      // Update search results if visible
      const searchCard = document.querySelector(`#search-results [data-perfume-id="${perfumeId}"] .add-to-collection-btn`);
      if (searchCard) {
        searchCard.disabled = false;
        searchCard.innerHTML = '<span>➕</span> Add to Collection';
      }
    }
  }

  async findSimilarPerfumes(perfumeId) {
    this.showLoading();
    
    try {
      // Get the target perfume
      const allPerfumes = [...this.getStoredSearchResults(), ...this.userCollection.getAllPerfumes()];
      const targetPerfume = allPerfumes.find(p => p.id === perfumeId);
      
      if (!targetPerfume) return;
      
      // Get all available perfumes as candidates (from your mock database)
      const candidatePerfumes = await GoogleFragranceSearchService.searchPerfume(''); // Get all
      
      // Use your RecommendationEngine!
      const recommendations = RecommendationEngine.findSimilarPerfumes(
        targetPerfume, 
        candidatePerfumes.filter(p => p.id !== perfumeId)
      );
      
      this.displayRecommendations(recommendations, `Similar to ${targetPerfume.name}`);
      
    } catch (error) {
      console.error('Find similar error:', error);
      this.showError('Could not find similar perfumes.');
    } finally {
      this.hideLoading();
    }
  }

  async analyzeCollection() {
    if (this.userCollection.getSize() === 0) return;
    
    this.showLoading();
    
    try {
      // Use your UserCollection analytics!
      const popularNotes = this.userCollection.getMostPopularNotes();
      const familyDistribution = this.userCollection.getFamilyDistribution();
      const intensityProfile = this.userCollection.getIntensityProfile();
      
      // Display signature notes
      this.displaySignatureNotes(popularNotes.slice(0, 8));
      
      // Display family distribution
      this.displayFamilyDistribution(familyDistribution);
      
      // Display intensity profile
      this.displayIntensityProfile(intensityProfile);
      
      // Get recommendations based on collection
      await this.getCollectionBasedRecommendations();
      
      // Show analysis section
      this.analysisSection.classList.remove('hidden');
      this.recommendationsSection.classList.remove('hidden');
      
      // Smooth scroll to analysis
      this.analysisSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
    } catch (error) {
      console.error('Analysis error:', error);
      this.showError('Analysis failed. Please try again.');
    } finally {
      this.hideLoading();
    }
  }

  displaySignatureNotes(notes) {
    this.signatureNotes.innerHTML = notes.map(note => `
      <div class="signature-note" style="background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); margin: 0.5rem; display: inline-block;">
        <div style="font-weight: 600; font-size: 1rem; color: var(--text-primary);">${note.note}</div>
        <div style="font-size: 0.875rem; color: var(--text-secondary);">Appears in ${note.count} perfume${note.count > 1 ? 's' : ''}</div>
      </div>
    `).join('');
  }

  displayFamilyDistribution(distribution) {
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
    this.intensityProfile.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">
          ${profile.dominantIntensity} Intensity Preference
        </div>
        <div style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
          ${profile.description}
        </div>
      </div>
      
      <div class="intensity-breakdown">
        ${Object.entries(profile).filter(([key]) => ['Light', 'Medium', 'High'].includes(key)).map(([intensity, data]) => `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="color: var(--text-primary);">${intensity}</span>
            <span style="color: var(--text-secondary); font-size: 0.875rem;">${data.percentage}%</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  async getCollectionBasedRecommendations() {
    try {
      // Get candidate perfumes
      const allCandidates = await GoogleFragranceSearchService.searchPerfume(''); // Get all available
      
      // Filter out perfumes already in collection
      const candidates = allCandidates.filter(candidate => 
        !this.userCollection.hasPerfume(candidate.id)
      );
      
      // Use your RecommendationEngine for collection-based recommendations!
      const recommendations = RecommendationEngine.getCollectionBasedRecommendations(
        this.userCollection,
        candidates,
        5 // Top 5 recommendations
      );
      
      this.displayRecommendations(recommendations, 'Perfect For Your Style');
      
    } catch (error) {
      console.error('Recommendations error:', error);
    }
  }

  displayRecommendations(recommendations, title) {
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
    titleElement.innerHTML = `<span class="section-icon">✨</span>${title}`;

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

    // Re-attach event listeners
    this.attachCardEventListeners();
  }

  // 🆕 BONUS: CLEAR ALL DATA (USEFUL FOR TESTING)
  clearCollection() {
    localStorage.removeItem('fragrance-collection');
    this.userCollection = new UserCollection();
    this.updateCollectionDisplay();
    this.showSuccess('Collection cleared!');
  }

  // Utility methods for storing search results and showing messages
  getStoredSearchResults() {
    return this.lastSearchResults || [];
  }

  showSuccess(message) {
    this.showToast(message, 'success');
  }

  showError(message) {
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
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
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Add CSS animations for toast
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
  window.fragranceApp = new FragranceApp();
});

