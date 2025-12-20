# Data Protection Strategy

## Overview
Our JLPT learning data (kanji, vocabulary, sentences) is valuable intellectual property that needs protection from unauthorized scraping while maintaining fast application performance.

## Current Protection Measures

### 1. Robots.txt
- **Location**: `/public/robots.txt`
- **Purpose**: Instructs search engines and well-behaved bots not to index or crawl data files
- **Effectiveness**: Stops legitimate crawlers (Google, Bing, etc.) but not malicious scrapers

### 2. HTTP Security Headers
- **Location**: `next.config.js`
- **Headers Applied**:
  - `X-Robots-Tag`: Prevents indexing by search engines
  - `Cache-Control`: Allows browser caching for performance while requiring revalidation
- **Effectiveness**: Prevents search engine indexing, doesn't stop direct downloads

### 3. Data Location
- **Files**: `/public/data/*.json` (kanji.json, vocabulary.json, sentences.json)
- **Why Public**: 
  - Fast client-side loading
  - Browser caching for offline use
  - Lower server costs (static file serving)
  - Easy development and updates

## What This Protects Against

✅ **Search engine indexing** - Data won't appear in Google/Bing search results  
✅ **Casual copying** - Discourages non-technical users  
✅ **Automated crawlers** - Stops bots that respect robots.txt  

## What This Doesn't Protect Against

❌ **Determined scrapers** - Technical users can still download files directly  
❌ **Browser DevTools** - Users can inspect network requests and save responses  
❌ **Direct URL access** - Files are still accessible at `/data/*.json`

## Additional Protection Options (Not Implemented)

If you need stronger protection in the future, consider:

### Option A: Authentication Required
- Move data behind authenticated API routes
- Requires users to sign in before accessing any data
- **Trade-off**: Worse UX, can't browse without account

### Option B: Rate Limiting
- Limit requests per IP address (e.g., 100/hour)
- Prevents bulk downloading
- **Trade-off**: Requires Redis/Upstash for production, can be bypassed with VPNs

### Option C: Obfuscation
- Encrypt/encode data files, decrypt on client
- Makes scraping more difficult but not impossible
- **Trade-off**: Performance overhead, determined scrapers can still reverse-engineer

### Option D: Server-Side Rendering Only
- Never send full datasets to client
- Serve data page-by-page through API
- **Trade-off**: Slower performance, higher server costs

## Recommendations

**Current approach is appropriate for:**
- Educational content that benefits from fast loading
- Applications where user experience is priority
- Content that has value but isn't extremely sensitive

**Consider stronger measures if:**
- You notice significant unauthorized scraping
- Data becomes commercially valuable
- You want to monetize access to the data
- Competitors are copying your content

## Monitoring

To detect scraping attempts, monitor:
- Server logs for unusual `/data/*.json` request patterns
- Multiple requests from same IP in short time
- Requests with suspicious user agents
- Direct file downloads vs. normal app usage

## Legal Protection

Remember: Technical measures are just one layer. Consider:
- Copyright notices in data files
- Terms of Service prohibiting scraping
- DMCA takedown notices for unauthorized use
- Legal action against commercial misuse
