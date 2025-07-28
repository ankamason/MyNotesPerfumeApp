// app-backend.js - Using YOUR incredible AI backend!

import { GoogleFragranceSearchService } from './src/services/GoogleFragranceSearchService.js';
import { UserCollection } from './src/models/UserCollection.js';
import { Perfume } from './src/models/Perfume.js';
import { RecommendationEngine } from './src/services/RecommendationEngine.js';

class FragranceAppWithBackend {
  constructor() {
    console.log('🤖 FragranceAI starting with YOUR sophisticated backend!');
    
    // Initialize your real AI-powered backend!
    this.userCollection = new UserCollection();
    this.lastSearchResults = [];
    
    this.initializeElements();
    this.initializeEventListeners();
    this.initializeTheme();
    
    console.log('✅ Your AI-powered backend is now running in the browser!');
    console.log('👨‍💻 Backend services loaded:', {
      GoogleFragranceSearchService: !!GoogleFragranceSearchService,
      UserCollection: !!UserCollection,
      Perfume: !!Perfume,
      RecommendationEngine: !!RecommendationEngine
    });
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
    // Search functionality - now using YOUR GoogleFragranceSearchService!
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
    
    // Collection analysis - now using YOUR UserCollection analytics!
    this.analyzeBtn.addEventListener('click', () => this.analyzeCollection());
    
    // Theme toggle
    this.themeBtn.addEventListener('click', () => this.toggleTheme());
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('fragrance-app-theme') || 'light';
    this.setTheme(savedTheme);
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

    console.log('🔍 Using YOUR GoogleFragranceSearchService to search for:', query);
    this.showLoading();
    
    try {
      // 🚀 Using YOUR sophisticated search service!
      const results = await GoogleFragranceSearchService.searchPerfume(query);
      console.log('🎯 Your AI found these results:', results);
      
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
          <p>Try searching for "Chanel No. 5", "Tom Ford Black Orchid", or "Creed Aventus"</p>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = results.map(result => 
      this.createPerfumeCard(result, 'search')
    ).join('');
    
    // Attach event listeners
    this.attachCardEventListeners();
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

    // Find similar buttons - using YOUR RecommendationEngine!
    document.querySelectorAll('.find-similar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const perfumeId = e.target.closest('.find-similar-btn').dataset.perfumeId;
        this.findSimilarPerfumes(perfumeId);
      });
    });
  }

  async addToCollection(perfumeId) {
    // Find the perfume from search results
    const perfumeData = this.lastSearchResults.find(p => p.id === perfumeId);
    
    if (perfumeData) {
      console.log('➕ Using YOUR Perfume model to create:', perfumeData);
      
      // 🚀 Using YOUR Perfume model!
      const perfume = new Perfume(perfumeData);
      
      // 🚀 Using YOUR UserCollection!
      const success = this.userCollection.addPerfume(perfume);
      
      if (success) {
        this.updateCollectionDisplay();
        this.showSuccess(`Added ${perfume.name} to your collection!`);
        
        console.log('✅ Collection now has', this.userCollection.getSize(), 'perfumes');
        
        // Update the button in search results
        const addBtn = document.querySelector(`[data-perfume-id="${perfumeId}"] .add-to-collection-btn`);
        if (addBtn) {
          addBtn.disabled = true;
          addBtn.innerHTML = '<span>✅</span> In Collection';
        }
      }
    }
  }

  removeFromCollection(perfumeId) {
    // 🚀 Using YOUR UserCollection's remove method!
    const success = this.userCollection.removePerfume(perfumeId);
    if (success) {
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
      const allPerfumes = [...this.lastSearchResults, ...this.userCollection.getAllPerfumes()];
      const targetPerfume = allPerfumes.find(p => p.id === perfumeId);
      
      if (!targetPerfume) return;
      
      console.log('🔍 Using YOUR RecommendationEngine to find perfumes similar to:', targetPerfume.name);
      
      // Get candidate perfumes from your service
      const allCandidates = await GoogleFragranceSearchService.searchPerfume('');
      const candidates = allCandidates.filter(p => p.id !== perfumeId);
      
      // 🚀 Using YOUR sophisticated RecommendationEngine!
      const recommendations = RecommendationEngine.findSimilarPerfumes(
        targetPerfume, 
        candidates
      );
      
      console.log('🎯 Your AI found these similar perfumes:', recommendations);
      
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
    
    console.log('🧠 Using YOUR UserCollection analytics to analyze', this.userCollection.getSize(), 'perfumes...');
    this.showLoading();
    
    try {
      // 🚀 Using YOUR sophisticated UserCollection analytics!
      const popularNotes = this.userCollection.getMostPopularNotes();
      const familyDistribution = this.userCollection.getFamilyDistribution();
      const intensityProfile = this.userCollection.getIntensityProfile();
      
      console.log('📊 Your AI analysis results:', {
        popularNotes: popularNotes.slice(0, 5),
        familyDistribution,
        intensityProfile
      });
      
      // Display the analysis using your real backend data
      this.displaySignatureNotes(popularNotes.slice(0, 8));
      this.displayFamilyDistribution(familyDistribution);
      this.displayIntensityProfile(intensityProfile);
      
      // Get AI recommendations based on your collection
      await this.getCollectionBasedRecommendations();
      
      // Show analysis sections
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
    `;
  }

  async getCollectionBasedRecommendations() {
    try {
      console.log('🤖 Using YOUR RecommendationEngine for collection-based recommendations...');
      
      // Get candidate perfumes
      const allCandidates = await GoogleFragranceSearchService.searchPerfume('');
      
      // Filter out perfumes already in collection
      const candidates = allCandidates.filter(candidate => 
        !this.userCollection.hasPerfume(candidate.id)
      );
      
      // 🚀 Using YOUR sophisticated RecommendationEngine!
      const recommendations = RecommendationEngine.getCollectionBasedRecommendations(
        this.userCollection,
        candidates,
        5 // Top 5 recommendations
      );
      
      console.log('✨ Your AI recommends these perfumes based on your collection:', recommendations);
      
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
    }, 300);
  }
}

// Initialize the app with YOUR sophisticated backend!
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Loading your AI-powered fragrance app...');
  window.fragranceApp = new FragranceAppWithBackend();
});