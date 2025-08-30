// Emoji Safeguard System
// Prevents and fixes emoji corruption across the application

interface EmojiMapping {
  [key: string]: string;
}

// Comprehensive emoji mappings for business models
const BUSINESS_MODEL_EMOJIS: EmojiMapping = {
  // Content & Media
  "content-creation": "📸",
  "youtube-automation": "📺",
  "copywriting": "✒️",
  // Services
  "freelancing": "🧑‍💻",
  "virtual-assistant": "🤝",
  "online-coaching": "💡",
  // Marketing & Sales
  "affiliate-marketing": "🔗",
  "high-ticket-sales": "🤝",
  "social-media-agency": "📣",
  "ai-marketing-agency": "🤖",
  "digital-services": "🖥️",
  // E-commerce
  "e-commerce": "🛒",
  "dropshipping": "📦",
  "print-on-demand": "🖼️",
  "online-reselling": "🛍️",
  "handmade-goods": "🎨",
  // Tech
  "saas-development": "💻",
  // Local Services
  "local-service": "🛠️",
  // Finance
  "investing-trading": "📈",
  // Consulting
  "consulting": "🧑‍💼",
  // Blogging
  "blogging": "💡",
  // Real Estate
  "real-estate-investing": "🏠",
  // Podcasting
  "podcasting": "🎙️",
  // Ghostwriting
  "ghostwriting": "👻",
  // Amazon FBA
  "amazon-fba": "🏭",
  // Online Course Creation
  "online-course-creation": "🎓",
};

// Emoji validation patterns - Inclusive pattern for all modern emojis
const VALID_EMOJI_PATTERN = /[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{2300}-\u{23FF}]|[\u{2000}-\u{206F}]|[\u{2100}-\u{214F}]|[\u{2190}-\u{21FF}]|[\u{2200}-\u{22FF}]|[\u{2400}-\u{243F}]|[\u{2440}-\u{245F}]|[\u{2460}-\u{24FF}]|[\u{2500}-\u{257F}]|[\u{2580}-\u{259F}]|[\u{25A0}-\u{25FF}]|[\u{2800}-\u{28FF}]|[\u{2900}-\u{297F}]|[\u{2980}-\u{29FF}]|[\u{2A00}-\u{2AFF}]|[\u{2B00}-\u{2BFF}]|[\u{2C00}-\u{2C5F}]|[\u{2C60}-\u{2C7F}]|[\u{2C80}-\u{2CFF}]|[\u{2D00}-\u{2D2F}]|[\u{2D30}-\u{2D7F}]|[\u{2D80}-\u{2DDF}]|[\u{2DE0}-\u{2DFF}]|[\u{2E00}-\u{2E7F}]|[\u{2E80}-\u{2EFF}]|[\u{2F00}-\u{2FDF}]|[\u{2FF0}-\u{2FFF}]|[\u{3000}-\u{303F}]|[\u{3040}-\u{309F}]|[\u{30A0}-\u{30FF}]|[\u{3100}-\u{312F}]|[\u{3130}-\u{318F}]|[\u{3190}-\u{319F}]|[\u{31A0}-\u{31BF}]|[\u{31C0}-\u{31EF}]|[\u{31F0}-\u{31FF}]|[\u{3200}-\u{32FF}]|[\u{3300}-\u{33FF}]|[\u{3400}-\u{4DBF}]|[\u{4DC0}-\u{4DFF}]|[\u{4E00}-\u{9FFF}]|[\u{A000}-\u{A48F}]|[\u{A490}-\u{A4CF}]|[\u{A4D0}-\u{A4FF}]|[\u{A500}-\u{A63F}]|[\u{A640}-\u{A69F}]|[\u{A6A0}-\u{A6FF}]|[\u{A700}-\u{A71F}]|[\u{A720}-\u{A7FF}]|[\u{A800}-\u{A82F}]|[\u{A830}-\u{A83F}]|[\u{A840}-\u{A87F}]|[\u{A880}-\u{A8DF}]|[\u{A8E0}-\u{A8FF}]|[\u{A900}-\u{A92F}]|[\u{A930}-\u{A95F}]|[\u{A960}-\u{A97F}]|[\u{A980}-\u{A9DF}]|[\u{A9E0}-\u{A9FF}]|[\u{AA00}-\u{AA5F}]|[\u{AA60}-\u{AA7F}]|[\u{AA80}-\u{AADF}]|[\u{AAE0}-\u{AAFF}]|[\u{AB00}-\u{AB2F}]|[\u{AB30}-\u{AB6F}]|[\u{AB70}-\u{ABBF}]|[\u{ABC0}-\u{ABFF}]|[\u{AC00}-\u{D7AF}]|[\u{D7B0}-\u{D7FF}]|[\u{D800}-\u{DB7F}]|[\u{DB80}-\u{DBFF}]|[\u{DC00}-\u{DFFF}]|[\u{E000}-\u{F8FF}]|[\u{F900}-\u{FAFF}]|[\u{FB00}-\u{FB4F}]|[\u{FB50}-\u{FDFF}]|[\u{FE00}-\u{FE0F}]|[\u{FE10}-\u{FE1F}]|[\u{FE20}-\u{FE2F}]|[\u{FE30}-\u{FE4F}]|[\u{FE50}-\u{FE6F}]|[\u{FE70}-\u{FEFF}]|[\u{FF00}-\u{FFEF}]|[\u{FFF0}-\u{FFFF}]/u;

// Corrupted emoji patterns to detect and fix - Simplified to only catch actual corruption
const CORRUPTED_EMOJI_PATTERNS = [
  /\\u[0-9a-fA-F]{4}/g, // Unicode escape sequences
  /\\x[0-9a-fA-F]{2}/g, // Hex escape sequences
  /\\[0-7]{3}/g, // Octal escape sequences
];

/**
 * Validates if a string contains valid emojis
 */
export function isValidEmoji(emoji: string): boolean {
  if (!emoji || typeof emoji !== 'string') return false;
  
  // Check for corrupted patterns
  for (const pattern of CORRUPTED_EMOJI_PATTERNS) {
    if (pattern.test(emoji)) return false;
  }
  
  // Check if it contains valid emoji characters
  if (VALID_EMOJI_PATTERN.test(emoji)) {
    return true;
  }
  
  // Check for single character emojis (like 🎉, 🔒)
  if (emoji.length === 2 && emoji.charCodeAt(0) > 127) {
    return true;
  }
  
  // Check for multi-character emojis (like 👨‍💻, 🏳️‍🌈)
  if (emoji.length > 2 && emoji.charCodeAt(0) > 127) {
    return true;
  }
  
  return false;
}

/**
 * Fixes corrupted emoji by replacing with appropriate emoji
 */
export function fixCorruptedEmoji(emoji: string, businessId?: string): string {
  if (!emoji || typeof emoji !== 'string') {
    return businessId ? BUSINESS_MODEL_EMOJIS[businessId] || '�' : '�';
  }
  
  // Check if already valid
  if (isValidEmoji(emoji)) {
    return emoji;
  }
  
  // Try to fix based on business ID
  if (businessId && BUSINESS_MODEL_EMOJIS[businessId]) {
    return BUSINESS_MODEL_EMOJIS[businessId];
  }
  
  // Default fallback
  return '�';
}

/**
 * Safeguards emoji in business model data
 */
export function safeguardBusinessModelEmoji(businessModel: any): any {
  if (!businessModel) return businessModel;
  
  const fixed: Record<string, any> = { ...businessModel };
  
  // Fix emoji field
  if (fixed.emoji !== undefined) {
    fixed.emoji = fixCorruptedEmoji(fixed.emoji, fixed.id);
  }
  
  return fixed;
}

/**
 * Safeguards emoji in business path data
 */
export function safeguardBusinessPathEmoji(businessPath: any): any {
  if (!businessPath) return businessPath;
  
  const fixed: Record<string, any> = { ...businessPath };
  
  // Fix emoji field
  if (fixed.emoji !== undefined) {
    fixed.emoji = fixCorruptedEmoji(fixed.emoji, fixed.id);
  }
  
  return fixed;
}

/**
 * Safeguards emoji in arrays of business data
 */
export function safeguardBusinessDataArray(data: any[]): any[] {
  if (!Array.isArray(data)) return data;
  
  return data.map(item => {
    if (item.id && BUSINESS_MODEL_EMOJIS[item.id]) {
      return safeguardBusinessModelEmoji(item);
    }
    return safeguardBusinessPathEmoji(item);
  });
}

/**
 * Gets safe emoji for business model by ID
 */
export function getSafeEmoji(businessId: string): string {
  return BUSINESS_MODEL_EMOJIS[businessId] || '�';
}

/**
 * Validates and fixes emoji in component props
 */
export function validateComponentEmoji(emoji: string, businessId?: string): string {
  return fixCorruptedEmoji(emoji, businessId);
}

/**
 * Initialize emoji safeguards - call this early in the app
 */
export function initializeEmojiSafeguards(): void {
  // Override console.log to catch emoji corruption
  const originalLog = console.log;
  console.log = function(...args) {
    const message = args.join(' ');
    if (message.includes('\\u') || message.includes('\\x')) {
      console.warn('⚠️ Potential emoji corruption detected in log:', message);
    }
    originalLog.apply(console, args);
  };
  
  // Monitor localStorage for emoji corruption
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key: string, value: string) {
    if (typeof value === 'string' && (value.includes('\\u') || value.includes('\\x'))) {
      console.warn('⚠️ Potential emoji corruption detected in localStorage:', { key, value });
    }
    originalSetItem.call(localStorage, key, value);
  };
  
}

/**
 * Clean corrupted emojis from localStorage
 */
export function cleanCorruptedEmojisFromStorage(): void {
  const keys = Object.keys(localStorage);
  let cleanedCount = 0;
  
  keys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value && typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        let needsUpdate = false;
        
        // Recursively check and fix emojis
        const fixEmojisInObject = (obj: any): any => {
          if (!obj || typeof obj !== 'object') return obj;
          
          const fixed: Record<string, any> = Array.isArray(obj) ? [] : {};
          
          for (const [key, value] of Object.entries(obj)) {
            if (key === 'emoji' && typeof value === 'string') {
              const fixedEmoji = fixCorruptedEmoji(value);
              if (fixedEmoji !== value) {
                needsUpdate = true;
                fixed[key] = fixedEmoji;
              } else {
                fixed[key] = value;
              }
            } else if (typeof value === 'object') {
              fixed[key] = fixEmojisInObject(value);
      } else {
              fixed[key] = value;
            }
          }
          
          return fixed;
        };
        
        const fixed = fixEmojisInObject(parsed);
        
        if (needsUpdate) {
          localStorage.setItem(key, JSON.stringify(fixed));
          cleanedCount++;
        }
      } catch (e) {
        // Not JSON, skip
      }
    }
  });
  
  if (cleanedCount > 0) {
    console.log(`Cleaned ${cleanedCount} corrupted emojis from localStorage`);
  }
}

/**
 * Export emoji mappings for external use
 */
export { BUSINESS_MODEL_EMOJIS };
