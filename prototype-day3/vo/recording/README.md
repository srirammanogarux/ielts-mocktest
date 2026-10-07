# Audio for ElevenLabs · Day 3 · Part 3

22 files to generate, cut into 86 clips.

## How to record

1. In ElevenLabs **Text to Speech**, choose the model **Eleven Multilingual v2**. It reads the `<break time="1.5s" />` tags as pauses.
2. Pick the voice named on the section. Use **the same settings for every file of that voice**, on every day. Start with Stability 50%, Similarity 75%, Style 0%, Speaker boost on, speed 1.0.
3. Copy the grey box exactly: same words, same punctuation, break tags included. Generate.
4. Listen. If any line is wrong, or a pause is missing, **regenerate the whole box**. Don't edit the audio.
5. Download the MP3 and rename it to the **Save as** name.
6. Put it in that day's `vo/raw/` folder, or send the files to Claude.

Then run `python3 tools/vo/vo.py split prototype-day3`.

**Why one file per section?** Each file gets cut into one clip per line. Each clip's length then controls when that line's caption changes and when its animation happens: rows lighting up, list items growing in, the mic arriving. The break tags make the cuts cleaner. If the pauses don't come through, that's fine too: the splitter listens for the words and cuts between the lines anyway.

---

### 01 · Welcome back

**Voice:** Sarah  
**Save as:** `d3-01.mp3`  
**Lines:** 4

```text
Welcome back. <break time="1.5s" /> Quick recap. <break time="1.5s" /> Part 1 was short answers about your life. <break time="1.5s" /> Yesterday, the cue card. Two minutes on your own.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Welcome back. | `d3-01-1.mp3` |
| 2 | Quick recap. | `d3-01-2.mp3` |
| 3 | Part 1 was short answers about your life. | `d3-01-3.mp3` |
| 4 | Yesterday, the cue card. Two minutes on your own. | `d3-01-4.mp3` |

### 02 · Today, Part 3

**Voice:** Sarah  
**Save as:** `d3-02.mp3`  
**Lines:** 2

```text
Today is the last part. <break time="1.5s" /> Part 3. The discussion.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Today is the last part. | `d3-02-1.mp3` |
| 2 | Part 3. The discussion. | `d3-02-2.mp3` |

### 03 · How it goes

**Voice:** Sarah  
**Save as:** `d3-03.mp3`  
**Lines:** 4

```text
The examiner asks you three or four questions, one after another. <break time="1.5s" /> And these are not about you any more. <break time="1.5s" /> They are about the world. Technology, education, how society is changing. <break time="1.5s" /> You speak for about thirty seconds on each.
```

| # | Line | Cut into |
|---|---|---|
| 1 | The examiner asks you three or four questions, one after another. | `d3-03-1.mp3` |
| 2 | And these are not about you any more. | `d3-03-2.mp3` |
| 3 | They are about the world. Technology, education, how society is changing. | `d3-03-3.mp3` |
| 4 | You speak for about thirty seconds on each. | `d3-03-4.mp3` |

### 04 · Not scored

**Voice:** Sarah  
**Save as:** `d3-04.mp3`  
**Lines:** 4

```text
Sounds heavy, but remember. <break time="1.5s" /> Your opinions are not being scored. <break time="1.5s" /> There are no wrong answers in this part. <break time="1.5s" /> What they are checking is whether you can back your opinion up.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Sounds heavy, but remember. | `d3-04-1.mp3` |
| 2 | Your opinions are not being scored. | `d3-04-2.mp3` |
| 3 | There are no wrong answers in this part. | `d3-04-3.mp3` |
| 4 | What they are checking is whether you can back your opinion up. | `d3-04-4.mp3` |

### 05 · The one habit

**Voice:** Sarah  
**Save as:** `d3-05.mp3`  
**Lines:** 4

```text
So here is what I want you to do today. <break time="1.5s" /> For every question, say what you think. <break time="1.5s" /> Then say why. <break time="1.5s" /> And then give an example from your own life.
```

| # | Line | Cut into |
|---|---|---|
| 1 | So here is what I want you to do today. | `d3-05-1.mp3` |
| 2 | For every question, say what you think. | `d3-05-2.mp3` |
| 3 | Then say why. | `d3-05-3.mp3` |
| 4 | And then give an example from your own life. | `d3-05-4.mp3` |

### 06 · The thin answer

**Voice:** Sarah  
**Save as:** `d3-06.mp3`  
**Lines:** 3

```text
Say the question is, how has technology changed the way we shop? <break time="1.5s" /> I could just say, people shop online now. <break time="1.5s" /> True. But that is five words, and we know that problem from Day 1.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Say the question is, how has technology changed the way we shop? | `d3-06-1.mp3` |
| 2 | I could just say, people shop online now. | `d3-06-2.mp3` |
| 3 | True. But that is five words, and we know that problem from Day 1. | `d3-06-3.mp3` |

### 07 · The demo answer

**Voice:** Sarah  
**Save as:** `d3-07.mp3`  
**Lines:** 4

```text
Now watch me do it with the habit. <break time="1.5s" /> My view. Shopping has moved to our phones. <break time="1.5s" /> Why. Because it saves time, and there is more choice. <break time="1.5s" /> And my example. My mother has not been to a market in two years.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Now watch me do it with the habit. | `d3-07-1.mp3` |
| 2 | My view. Shopping has moved to our phones. | `d3-07-2.mp3` |
| 3 | Why. Because it saves time, and there is more choice. | `d3-07-3.mp3` |
| 4 | And my example. My mother has not been to a market in two years. | `d3-07-4.mp3` |

### 08 · Thirty seconds

**Voice:** Sarah  
**Save as:** `d3-08.mp3`  
**Lines:** 2

```text
That is thirty seconds, and it has everything. <break time="1.5s" /> My view, why, and an example from my life.
```

| # | Line | Cut into |
|---|---|---|
| 1 | That is thirty seconds, and it has everything. | `d3-08-1.mp3` |
| 2 | My view, why, and an example from my life. | `d3-08-2.mp3` |

### 09 · Pick a theme

**Voice:** Sarah  
**Save as:** `d3-09.mp3`  
**Lines:** 1 (no break tags needed)

```text
Pick the theme you want to practise today.
```

### 10 · Question 1 · Technology

**Voice:** Sarah  
**Save as:** `d3-10-tech.mp3`  
**Lines:** 5

```text
Here is your first question. <break time="1.5s" /> How do you think technology has changed the way we communicate with each other? <break time="1.5s" /> Say what you think. <break time="1.5s" /> Then say why. <break time="1.5s" /> Then give an example from your own life.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Here is your first question. | `d3-10-tech-1.mp3` |
| 2 | How do you think technology has changed the way we communicate with each other? | `d3-10-tech-2.mp3` |
| 3 | Say what you think. | `d3-10-tech-3.mp3` |
| 4 | Then say why. | `d3-10-tech-4.mp3` |
| 5 | Then give an example from your own life. | `d3-10-tech-5.mp3` |

### 10 · Question 1 · Education

**Voice:** Sarah  
**Save as:** `d3-10-edu.mp3`  
**Lines:** 5

```text
Here is your first question. <break time="1.5s" /> How is school today different from when your parents were young? <break time="1.5s" /> Compare as you go. <break time="1.5s" /> Back then, <break time="1.5s" /> whereas now.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Here is your first question. | `d3-10-edu-1.mp3` |
| 2 | How is school today different from when your parents were young? | `d3-10-edu-2.mp3` |
| 3 | Compare as you go. | `d3-10-edu-3.mp3` |
| 4 | Back then, | `d3-10-edu-4.mp3` |
| 5 | whereas now. | `d3-10-edu-5.mp3` |

### 12 · Question 2 · Technology

**Voice:** Sarah  
**Save as:** `d3-12-tech.mp3`  
**Lines:** 5

```text
Nice. Here is the next one. <break time="1.5s" /> What are the pros and cons of relying on technology in our daily lives? <break time="1.5s" /> One good thing. <break time="1.5s" /> One bad thing. <break time="1.5s" /> And where you land.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Nice. Here is the next one. | `d3-12-tech-1.mp3` |
| 2 | What are the pros and cons of relying on technology in our daily lives? | `d3-12-tech-2.mp3` |
| 3 | One good thing. | `d3-12-tech-3.mp3` |
| 4 | One bad thing. | `d3-12-tech-4.mp3` |
| 5 | And where you land. | `d3-12-tech-5.mp3` |

### 12 · Question 2 · Education

**Voice:** Sarah  
**Save as:** `d3-12-edu.mp3`  
**Lines:** 5

```text
Nice. Here is the next one. <break time="1.5s" /> What are the good and bad things about how kids learn in school today? <break time="1.5s" /> One good thing. <break time="1.5s" /> One bad thing. <break time="1.5s" /> And where you land.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Nice. Here is the next one. | `d3-12-edu-1.mp3` |
| 2 | What are the good and bad things about how kids learn in school today? | `d3-12-edu-2.mp3` |
| 3 | One good thing. | `d3-12-edu-3.mp3` |
| 4 | One bad thing. | `d3-12-edu-4.mp3` |
| 5 | And where you land. | `d3-12-edu-5.mp3` |

### 14 · Question 3 · Technology

**Voice:** Sarah  
**Save as:** `d3-14-tech.mp3`  
**Lines:** 4

```text
Okay, here is the third one. <break time="1.5s" /> In what ways has technology improved education for students? <break time="1.5s" /> One way it helped. <break time="1.5s" /> And then another.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Okay, here is the third one. | `d3-14-tech-1.mp3` |
| 2 | In what ways has technology improved education for students? | `d3-14-tech-2.mp3` |
| 3 | One way it helped. | `d3-14-tech-3.mp3` |
| 4 | And then another. | `d3-14-tech-4.mp3` |

### 14 · Question 3 · Education

**Voice:** Sarah  
**Save as:** `d3-14-edu.mp3`  
**Lines:** 4

```text
Okay, here is the third one. <break time="1.5s" /> How can schools help students who learn in different ways? <break time="1.5s" /> One idea. <break time="1.5s" /> Then another. Two ideas beat one.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Okay, here is the third one. | `d3-14-edu-1.mp3` |
| 2 | How can schools help students who learn in different ways? | `d3-14-edu-2.mp3` |
| 3 | One idea. | `d3-14-edu-3.mp3` |
| 4 | Then another. Two ideas beat one. | `d3-14-edu-4.mp3` |

### 16 · Question 4 · Technology

**Voice:** Sarah  
**Save as:** `d3-16-tech.mp3`  
**Lines:** 5

```text
And here is the last one. <break time="1.5s" /> How does technology affect jobs and employment opportunities? <break time="1.5s" /> You are allowed to guess about the future. <break time="1.5s" /> Start with, it is likely that. <break time="1.5s" /> Or, in the long run.
```

| # | Line | Cut into |
|---|---|---|
| 1 | And here is the last one. | `d3-16-tech-1.mp3` |
| 2 | How does technology affect jobs and employment opportunities? | `d3-16-tech-2.mp3` |
| 3 | You are allowed to guess about the future. | `d3-16-tech-3.mp3` |
| 4 | Start with, it is likely that. | `d3-16-tech-4.mp3` |
| 5 | Or, in the long run. | `d3-16-tech-5.mp3` |

### 16 · Question 4 · Education

**Voice:** Sarah  
**Save as:** `d3-16-edu.mp3`  
**Lines:** 6

```text
And here is the last one. <break time="1.5s" /> How do you think computers and the internet are changing what we learn in school? <break time="1.5s" /> Touch all three. <break time="1.5s" /> What it was, <break time="1.5s" /> what it is, <break time="1.5s" /> and what it will be.
```

| # | Line | Cut into |
|---|---|---|
| 1 | And here is the last one. | `d3-16-edu-1.mp3` |
| 2 | How do you think computers and the internet are changing what we learn in school? | `d3-16-edu-2.mp3` |
| 3 | Touch all three. | `d3-16-edu-3.mp3` |
| 4 | What it was, | `d3-16-edu-4.mp3` |
| 5 | what it is, | `d3-16-edu-5.mp3` |
| 6 | and what it will be. | `d3-16-edu-6.mp3` |

### 18 · Four in a row

**Voice:** Sarah  
**Save as:** `d3-18.mp3`  
**Lines:** 3

```text
That is four questions back to back. Well done. <break time="1.5s" /> And if some answers felt thin, that is normal. <break time="1.5s" /> Part 3 is the hardest part for everyone.
```

| # | Line | Cut into |
|---|---|---|
| 1 | That is four questions back to back. Well done. | `d3-18-1.mp3` |
| 2 | And if some answers felt thin, that is normal. | `d3-18-2.mp3` |
| 3 | Part 3 is the hardest part for everyone. | `d3-18-3.mp3` |

### 19 · Look what you did · Technology

**Voice:** Sarah  
**Save as:** `d3-19-tech.mp3`  
**Lines:** 4

```text
Look at what you just did, though. <break time="1.5s" /> Opinions. <break time="1.5s" /> Both sides of an argument. <break time="1.5s" /> Even predicting the future.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Look at what you just did, though. | `d3-19-tech-1.mp3` |
| 2 | Opinions. | `d3-19-tech-2.mp3` |
| 3 | Both sides of an argument. | `d3-19-tech-3.mp3` |
| 4 | Even predicting the future. | `d3-19-tech-4.mp3` |

### 19 · Look what you did · Education

**Voice:** Sarah  
**Save as:** `d3-19-edu.mp3`  
**Lines:** 4

```text
Look at what you just did, though. <break time="1.5s" /> Comparing past and present. <break time="1.5s" /> Weighing both sides. <break time="1.5s" /> Even suggesting ideas.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Look at what you just did, though. | `d3-19-edu-1.mp3` |
| 2 | Comparing past and present. | `d3-19-edu-2.mp3` |
| 3 | Weighing both sides. | `d3-19-edu-3.mp3` |
| 4 | Even suggesting ideas. | `d3-19-edu-4.mp3` |

### 20 · Keep the habit

**Voice:** Sarah  
**Save as:** `d3-20.mp3`  
**Lines:** 3

```text
Keep that one habit. <break time="1.5s" /> Your view, why, and an example from your life. <break time="1.5s" /> It works on any topic they throw at you.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Keep that one habit. | `d3-20-1.mp3` |
| 2 | Your view, why, and an example from your life. | `d3-20-2.mp3` |
| 3 | It works on any topic they throw at you. | `d3-20-3.mp3` |

### 21 · See you tomorrow

**Voice:** Sarah  
**Save as:** `d3-21.mp3`  
**Lines:** 5

```text
That is all three parts. <break time="1.5s" /> You have now practised every part of the speaking test. <break time="1.5s" /> Tomorrow, we put it all together and do an actual mock test, <break time="1.5s" /> covering Part 1, Part 2 and Part 3 together. <break time="1.5s" /> I hope you are excited. See you soon.
```

| # | Line | Cut into |
|---|---|---|
| 1 | That is all three parts. | `d3-21-1.mp3` |
| 2 | You have now practised every part of the speaking test. | `d3-21-2.mp3` |
| 3 | Tomorrow, we put it all together and do an actual mock test, | `d3-21-3.mp3` |
| 4 | covering Part 1, Part 2 and Part 3 together. | `d3-21-4.mp3` |
| 5 | I hope you are excited. See you soon. | `d3-21-5.mp3` |
