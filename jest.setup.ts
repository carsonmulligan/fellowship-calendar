import '@testing-library/jest-dom'

// Mock matchMedia if not available (required for some UI components)
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    }
  }
} 