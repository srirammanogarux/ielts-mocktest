# Audio for ElevenLabs · Day 1 · Part 1

19 files to generate, cut into 59 clips.

## How to record

1. In ElevenLabs **Text to Speech**, choose the model **Eleven Multilingual v2**. It reads the `<break time="1.5s" />` tags as pauses.
2. Pick the voice named on the section. Use **the same settings for every file of that voice**, on every day. Start with Stability 50%, Similarity 75%, Style 0%, Speaker boost on, speed 1.0.
3. Copy the grey box exactly: same words, same punctuation, break tags included. Generate.
4. Listen. If any line is wrong, or a pause is missing, **regenerate the whole box**. Don't edit the audio.
5. Download the MP3 and rename it to the **Save as** name.
6. Put it in that day's `vo/raw/` folder, or send the files to Claude.

Then run `python3 tools/vo/vo.py split prototype`.

**Why one file per section?** Each file gets cut into one clip per line. Each clip's length then controls when that line's caption changes and when its animation happens: rows lighting up, list items growing in, the mic arriving. The break tags make the cuts cleaner. If the pauses don't come through, that's fine too: the splitter listens for the words and cuts between the lines anyway.

---

### 01 · Welcome

**Voice:** Sarah  
**Save as:** `d1-01.mp3`  
**Lines:** 2

```text
Hi, welcome. <break time="1.5s" /> Let me walk you through what happens on test day.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Hi, welcome. | `d1-01-1.mp3` |
| 2 | Let me walk you through what happens on test day. | `d1-01-2.mp3` |

### 02 · One examiner

**Voice:** Sarah  
**Save as:** `d1-02.mp3`  
**Lines:** 2

```text
You'll be sitting with one examiner. <break time="1.5s" /> Just the two of you, in one room.
```

| # | Line | Cut into |
|---|---|---|
| 1 | You'll be sitting with one examiner. | `d1-02-1.mp3` |
| 2 | Just the two of you, in one room. | `d1-02-2.mp3` |

### 03 · Part 1

**Voice:** Sarah  
**Save as:** `d1-03.mp3`  
**Lines:** 4

```text
Part 1 is the easy one. <break time="1.5s" /> They ask about your home, <break time="1.5s" /> about your work, <break time="1.5s" /> and what you do on weekends.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Part 1 is the easy one. | `d1-03-1.mp3` |
| 2 | They ask about your home, | `d1-03-2.mp3` |
| 3 | about your work, | `d1-03-3.mp3` |
| 4 | and what you do on weekends. | `d1-03-4.mp3` |

### 04 · Part 2

**Voice:** Sarah  
**Save as:** `d1-04.mp3`  
**Lines:** 4

```text
Part 2 is the topic card. <break time="1.5s" /> They hand you a card, <break time="1.5s" /> you get one minute to make notes, <break time="1.5s" /> then you speak on your own.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Part 2 is the topic card. | `d1-04-1.mp3` |
| 2 | They hand you a card, | `d1-04-2.mp3` |
| 3 | you get one minute to make notes, | `d1-04-3.mp3` |
| 4 | then you speak on your own. | `d1-04-4.mp3` |

### 05 · Part 3

**Voice:** Sarah  
**Save as:** `d1-05.mp3`  
**Lines:** 4

```text
Part 3 is a discussion. <break time="1.5s" /> Bigger questions about people in general, <break time="1.5s" /> not about you any more. <break time="1.5s" /> The whole test takes twelve to fourteen minutes.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Part 3 is a discussion. | `d1-05-1.mp3` |
| 2 | Bigger questions about people in general, | `d1-05-2.mp3` |
| 3 | not about you any more. | `d1-05-3.mp3` |
| 4 | The whole test takes twelve to fourteen minutes. | `d1-05-4.mp3` |

### 06 · Four things

**Voice:** Sarah  
**Save as:** `d1-06.mp3`  
**Lines:** 5

```text
While you talk, she is listening for four things. <break time="1.5s" /> How smoothly you speak. <break time="1.5s" /> The words you pick. <break time="1.5s" /> Your grammar. <break time="1.5s" /> And your pronunciation.
```

| # | Line | Cut into |
|---|---|---|
| 1 | While you talk, she is listening for four things. | `d1-06-1.mp3` |
| 2 | How smoothly you speak. | `d1-06-2.mp3` |
| 3 | The words you pick. | `d1-06-3.mp3` |
| 4 | Your grammar. | `d1-06-4.mp3` |
| 5 | And your pronunciation. | `d1-06-5.mp3` |

### 07 · Opinions

**Voice:** Sarah  
**Save as:** `d1-07.mp3`  
**Lines:** 5

```text
She is not judging your opinions. <break time="1.5s" /> You can love reading. <break time="1.5s" /> You can hate reading. <break time="1.5s" /> The score is exactly the same. <break time="1.5s" /> She is only listening to your English.
```

| # | Line | Cut into |
|---|---|---|
| 1 | She is not judging your opinions. | `d1-07-1.mp3` |
| 2 | You can love reading. | `d1-07-2.mp3` |
| 3 | You can hate reading. | `d1-07-3.mp3` |
| 4 | The score is exactly the same. | `d1-07-4.mp3` |
| 5 | She is only listening to your English. | `d1-07-5.mp3` |

### 08 · Today, Part 1

**Voice:** Sarah  
**Save as:** `d1-08.mp3`  
**Lines:** 2

```text
We'll practise each part, one by one. <break time="1.5s" /> Today, Part 1.
```

| # | Line | Cut into |
|---|---|---|
| 1 | We'll practise each part, one by one. | `d1-08-1.mp3` |
| 2 | Today, Part 1. | `d1-08-2.mp3` |

### 09 · Part 1 intro

**Voice:** Sarah  
**Save as:** `d1-09.mp3`  
**Lines:** 4

```text
She just talks to you about your life. <break time="1.5s" /> Your home, <break time="1.5s" /> your work, <break time="1.5s" /> what you do on weekends.
```

| # | Line | Cut into |
|---|---|---|
| 1 | She just talks to you about your life. | `d1-09-1.mp3` |
| 2 | Your home, | `d1-09-2.mp3` |
| 3 | your work, | `d1-09-3.mp3` |
| 4 | what you do on weekends. | `d1-09-4.mp3` |

### 10 · The bad answer

**Voice:** Sarah  
**Save as:** `d1-10.mp3`  
**Lines:** 3

```text
Here's what most people do. <break time="1.5s" /> Five words. <break time="1.5s" /> There's nothing in there to mark.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Here's what most people do. | `d1-10-1.mp3` |
| 2 | Five words. | `d1-10-2.mp3` |
| 3 | There's nothing in there to mark. | `d1-10-3.mp3` |

### 11 · The good answer

**Voice:** Sarah  
**Save as:** `d1-11.mp3`  
**Lines:** 2

```text
Just keep going for one more sentence. <break time="1.5s" /> Now she has actually heard you speak.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Just keep going for one more sentence. | `d1-11-1.mp3` |
| 2 | Now she has actually heard you speak. | `d1-11-2.mp3` |

### 12 · Pick a topic

**Voice:** Sarah  
**Save as:** `d1-12.mp3`  
**Lines:** 3

```text
So that is the only thing I want today. <break time="1.5s" /> Answer, then add one more sentence. <break time="1.5s" /> Go ahead, pick a topic.
```

| # | Line | Cut into |
|---|---|---|
| 1 | So that is the only thing I want today. | `d1-12-1.mp3` |
| 2 | Answer, then add one more sentence. | `d1-12-2.mp3` |
| 3 | Go ahead, pick a topic. | `d1-12-3.mp3` |

### 13 · Your question

**Voice:** Sarah  
**Save as:** `d1-13.mp3`  
**Lines:** 2

```text
Here's your question. <break time="1.5s" /> Take a moment, then start when you are ready.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Here's your question. | `d1-13-1.mp3` |
| 2 | Take a moment, then start when you are ready. | `d1-13-2.mp3` |

### 15 · That was good

**Voice:** Sarah  
**Save as:** `d1-15.mp3`  
**Lines:** 2

```text
That was good. <break time="1.5s" /> However that felt, first answers are always short.
```

| # | Line | Cut into |
|---|---|---|
| 1 | That was good. | `d1-15-1.mp3` |
| 2 | However that felt, first answers are always short. | `d1-15-2.mp3` |

### 16 · Another student

**Voice:** Sarah  
**Save as:** `d1-16.mp3`  
**Lines:** 3

```text
Now listen to Aarav. <break time="1.5s" /> Another student of mine, who I taught last year. <break time="1.5s" /> Same question, same minute.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Now listen to Aarav. | `d1-16-1.mp3` |
| 2 | Another student of mine, who I taught last year. | `d1-16-2.mp3` |
| 3 | Same question, same minute. | `d1-16-3.mp3` |

### 17 · Aarav's answer

**Voice:** Aarav  
**Save as:** `d1-17.mp3`  
**Lines:** 4

```text
I'm in my final year of college, studying commerce, <break time="1.5s" /> and on weekends I help out at my father’s shop. <break time="1.5s" /> College gets stressful around exams, but I like my subjects. <break time="1.5s" /> And honestly, the shop has taught me more about business than my textbooks.
```

| # | Line | Cut into |
|---|---|---|
| 1 | I'm in my final year of college, studying commerce, | `d1-17-1.mp3` |
| 2 | and on weekends I help out at my father’s shop. | `d1-17-2.mp3` |
| 3 | College gets stressful around exams, but I like my subjects. | `d1-17-3.mp3` |
| 4 | And honestly, the shop has taught me more about business than my textbooks. | `d1-17-4.mp3` |

### 18 · What just happened

**Voice:** Sarah  
**Save as:** `d1-18.mp3`  
**Lines:** 3

```text
Did you hear that? <break time="1.5s" /> The answer was one sentence. <break time="1.5s" /> Everything after it is what gets scored.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Did you hear that? | `d1-18-1.mp3` |
| 2 | The answer was one sentence. | `d1-18-2.mp3` |
| 3 | Everything after it is what gets scored. | `d1-18-3.mp3` |

### 19 · Tomorrow

**Voice:** Sarah  
**Save as:** `d1-19.mp3`  
**Lines:** 3

```text
That's the end of today. <break time="1.5s" /> You will see how you did in a moment. <break time="1.5s" /> Tomorrow, the topic card.
```

| # | Line | Cut into |
|---|---|---|
| 1 | That's the end of today. | `d1-19-1.mp3` |
| 2 | You will see how you did in a moment. | `d1-19-2.mp3` |
| 3 | Tomorrow, the topic card. | `d1-19-3.mp3` |

### 20 · See you tomorrow

**Voice:** Sarah  
**Save as:** `d1-20.mp3`  
**Lines:** 2

```text
Nice work today. <break time="1.5s" /> See you tomorrow.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Nice work today. | `d1-20-1.mp3` |
| 2 | See you tomorrow. | `d1-20-2.mp3` |
