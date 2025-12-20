# Comprehensive Sentence Generation Plan for JLPT Levels

## Current Data Inventory

### Kanji
- **N5**: 79 kanji
- **N4**: 166 kanji
- **N3**: 367 kanji
- **N2**: 367 kanji
- **N1**: 1,232 kanji
- **Total**: 2,211 kanji

### Vocabulary
- **N5**: 684 words
- **N4**: 640 words
- **N3**: 1,717 words
- **N2**: 1,777 words
- **N1**: 3,427 words
- **Total**: 8,245 words

### Grammar Patterns
- **N5**: 85 patterns (from jlpt_grammar_guide.md)
- **N4**: 132 patterns (from jlpt_grammar_guide.md)
- **N3-N1**: Need to source additional grammar patterns

### Current Sentences
- **N5**: 185 sentences (extracted from test data)
- **N4**: 627 sentences (extracted from test data)
- **N3**: 0 sentences
- **N2**: 0 sentences
- **N1**: 0 sentences

---

## Generation Strategy

### Level Mixing Rules

Each level can use content from itself and lower levels, with the following distribution:

#### N5 (Target: 500 sentences)
- **Primary**: 80% N5 vocabulary + kanji
- **Allowed**: 20% N4 vocabulary (for variety and natural expression)
- **Grammar**: 100% N5 patterns
- **Difficulty**: 1-3 scale

#### N4 (Target: 500 sentences)
- **Primary**: 70% N4 vocabulary + kanji
- **Supporting**: 30% N5 vocabulary + kanji
- **Grammar**: 70% N4 patterns, 30% N5 patterns
- **Difficulty**: 3-5 scale

#### N3 (Target: 400 sentences)
- **Primary**: 60% N3 vocabulary + kanji
- **Supporting**: 30% N4 vocabulary + kanji, 10% N5 vocabulary + kanji
- **Grammar**: 60% N3 patterns, 30% N4 patterns, 10% N5 patterns
- **Difficulty**: 5-7 scale

#### N2 (Target: 400 sentences)
- **Primary**: 60% N2 vocabulary + kanji
- **Supporting**: 25% N3 vocabulary + kanji, 10% N4 vocabulary + kanji, 5% N5 vocabulary + kanji
- **Grammar**: 60% N2 patterns, 25% N3 patterns, 15% N4/N5 patterns
- **Difficulty**: 7-9 scale

#### N1 (Target: 300 sentences)
- **Primary**: 70% N1 vocabulary + kanji
- **Supporting**: 20% N2 vocabulary + kanji, 10% N3/N4/N5 vocabulary + kanji
- **Grammar**: 70% N1 patterns, 20% N2 patterns, 10% N3/N4/N5 patterns
- **Difficulty**: 9-10 scale

---

## Coverage Requirements

### Vocabulary Coverage
Each vocabulary word should appear in **at least 2-3 sentences** to ensure:
- Multiple contexts for learning
- Different grammatical forms
- Varied usage patterns

**Target Sentence Distribution by Vocabulary:**
- N5: 684 words × 2.5 avg = ~1,710 word instances across 500 sentences (3.4 words/sentence)
- N4: 640 words × 2.5 avg = ~1,600 word instances across 500 sentences (3.2 words/sentence)
- N3: 1,717 words × 2 avg = ~3,434 word instances across 400 sentences (8.6 words/sentence)
- N2: 1,777 words × 2 avg = ~3,554 word instances across 400 sentences (8.9 words/sentence)
- N1: 3,427 words × 1.5 avg = ~5,141 word instances across 300 sentences (17.1 words/sentence)

### Kanji Coverage
Each kanji should appear in **at least 3-5 sentences** to ensure:
- Multiple readings (on-yomi and kun-yomi)
- Different compound words
- Various contexts

**Target Sentence Distribution by Kanji:**
- N5: 79 kanji × 4 avg = ~316 kanji instances across 500 sentences
- N4: 166 kanji × 4 avg = ~664 kanji instances across 500 sentences
- N3: 367 kanji × 3 avg = ~1,101 kanji instances across 400 sentences
- N2: 367 kanji × 3 avg = ~1,101 kanji instances across 400 sentences
- N1: 1,232 kanji × 2 avg = ~2,464 kanji instances across 300 sentences

### Grammar Pattern Coverage
Each grammar pattern should appear in **at least 3-5 sentences** to ensure:
- Different contexts
- Various vocabulary combinations
- Progressive difficulty

**Target Sentence Distribution by Grammar:**
- N5: 85 patterns × 4 avg = ~340 pattern instances across 500 sentences
- N4: 132 patterns × 4 avg = ~528 pattern instances across 500 sentences
- N3: Need grammar data
- N2: Need grammar data
- N1: Need grammar data

---

## Sentence Generation Approach

### Template-Based Generation

Create sentence templates organized by:
1. **Grammar Pattern** (primary organizing principle)
2. **Sentence Type** (statement, question, command, etc.)
3. **Topic/Context** (daily life, work, school, travel, etc.)
4. **Complexity Level** (simple, compound, complex)

### Template Structure

```javascript
{
  grammarPattern: "ために",
  level: "N4",
  template: "{subject}は{goal}ために{action}。",
  slots: {
    subject: ["私", "友達", "学生"],
    goal: ["健康", "試験", "仕事"],
    action: ["運動します", "勉強します", "頑張ります"]
  },
  englishTemplate: "{subject} {action} for {goal}.",
  requiredLevel: "N4",
  allowedLevels: ["N5", "N4"],
  difficulty: 4
}
```

### Generation Algorithm

1. **Select Grammar Pattern** (ensuring even distribution)
2. **Choose Template** for that pattern
3. **Fill Slots** with appropriate vocabulary:
   - Check vocabulary level matches allowed levels
   - Verify kanji usage matches target level
   - Ensure natural combinations
4. **Validate Sentence**:
   - Check vocabulary coverage (not overusing same words)
   - Verify kanji coverage (not overusing same kanji)
   - Ensure grammar pattern is clear
   - Validate difficulty level
5. **Generate English Translation**
6. **Extract Metadata**:
   - Vocabulary used
   - Kanji used
   - Grammar points
   - Difficulty level

---

## Implementation Phases

### Phase 1: N5 & N4 Enhancement (Current Priority)
**Goal**: Expand from 812 to 1,000 sentences (500 each)

**Tasks**:
1. ✅ Extract existing sentences from test data (DONE: 185 N5 + 627 N4)
2. Create N5 sentence templates (85 grammar patterns × 2-3 templates = ~200 templates)
3. Create N4 sentence templates (132 grammar patterns × 2-3 templates = ~300 templates)
4. Generate additional N5 sentences (need 315 more)
5. Generate additional N4 sentences (need 0, but can improve variety)
6. Validate vocabulary/kanji/grammar coverage
7. Review and quality check

### Phase 2: N3 Generation
**Goal**: Create 400 N3 sentences

**Tasks**:
1. Source N3 grammar patterns (estimate ~150 patterns)
2. Create N3 sentence templates (~300 templates)
3. Generate 400 N3 sentences
4. Validate coverage
5. Review and quality check

### Phase 3: N2 Generation
**Goal**: Create 400 N2 sentences

**Tasks**:
1. Source N2 grammar patterns (estimate ~200 patterns)
2. Create N2 sentence templates (~400 templates)
3. Generate 400 N2 sentences
4. Validate coverage
5. Review and quality check

### Phase 4: N1 Generation
**Goal**: Create 300 N1 sentences

**Tasks**:
1. Source N1 grammar patterns (estimate ~250 patterns)
2. Create N1 sentence templates (~300 templates)
3. Generate 300 N1 sentences
4. Validate coverage
5. Review and quality check

---

## Quality Assurance

### Validation Checks
1. **Vocabulary Level Check**: All words exist in allowed JLPT levels
2. **Kanji Level Check**: All kanji exist in allowed JLPT levels
3. **Grammar Pattern Check**: Grammar matches target level
4. **Natural Language Check**: Sentence sounds natural to native speakers
5. **Translation Accuracy**: English translation is accurate
6. **Uniqueness Check**: No duplicate sentences
7. **Coverage Check**: All vocabulary/kanji/grammar patterns used sufficiently

### Coverage Tracking
Create a coverage report showing:
- Vocabulary usage frequency per word
- Kanji usage frequency per character
- Grammar pattern usage frequency per pattern
- Identify under-represented items
- Generate additional sentences for gaps

---

## Technical Implementation

### Script Structure

```
scripts/
  generate-sentences/
    ├── index.js                    # Main orchestrator
    ├── templates/
    │   ├── n5-templates.js         # N5 sentence templates
    │   ├── n4-templates.js         # N4 sentence templates
    │   ├── n3-templates.js         # N3 sentence templates
    │   ├── n2-templates.js         # N2 sentence templates
    │   └── n1-templates.js         # N1 sentence templates
    ├── generators/
    │   ├── sentence-generator.js   # Core generation logic
    │   ├── slot-filler.js          # Fill template slots
    │   └── validator.js            # Validate sentences
    ├── data-loaders/
    │   ├── load-vocabulary.js      # Load vocab from JSON
    │   ├── load-kanji.js           # Load kanji from JSON
    │   └── load-grammar.js         # Load grammar patterns
    └── coverage/
        ├── track-coverage.js       # Track usage statistics
        └── generate-report.js      # Generate coverage report
```

### Output Format

Generated sentences will be saved to:
- `public/data/sentences.json` (main database)
- `analysis/sentence-generation-report.md` (coverage report)

---

## Next Steps

1. **Create sentence template files** for N5 and N4
2. **Build sentence generator script** with validation
3. **Generate additional N5 sentences** (315 needed)
4. **Verify coverage** of all vocabulary, kanji, and grammar
5. **Source N3/N2/N1 grammar patterns** for future phases
6. **Iterate and improve** based on quality review

---

## Success Metrics

- ✅ All vocabulary words appear in at least 2 sentences
- ✅ All kanji appear in at least 3 sentences
- ✅ All grammar patterns appear in at least 3 sentences
- ✅ Sentences are natural and grammatically correct
- ✅ English translations are accurate
- ✅ Difficulty progression is appropriate
- ✅ No duplicate sentences
- ✅ Proper level mixing (e.g., N4 uses mostly N4 content with some N5)
