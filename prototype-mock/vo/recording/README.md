# Audio for ElevenLabs · Day 4 · Mock test

21 files to generate, cut into 35 clips.

## How to record

1. In ElevenLabs **Text to Speech**, choose the model **Eleven Multilingual v2**. It reads the `<break time="1.5s" />` tags as pauses.
2. Pick the voice named on the section. Use **the same settings for every file of that voice**, on every day. Start with Stability 50%, Similarity 75%, Style 0%, Speaker boost on, speed 1.0.
3. Copy the grey box exactly: same words, same punctuation, break tags included. Generate.
4. Listen. If any line is wrong, or a pause is missing, **regenerate the whole box**. Don't edit the audio.
5. Download the MP3 and rename it to the **Save as** name.
6. Put it in that day's `vo/raw/` folder, or send the files to Claude.

Then run `python3 tools/vo/vo.py split prototype-mock`.

**Why one file per section?** Each file gets cut into one clip per line. Each clip's length then controls when that line's caption changes and when its animation happens: rows lighting up, list items growing in, the mic arriving. The break tags make the cuts cleaner. If the pauses don't come through, that's fine too: the splitter listens for the words and cuts between the lines anyway.

---

### 01 · Today is the real thing

**Voice:** Sarah  
**Save as:** `mk-01.mp3`  
**Lines:** 2

```text
Right. <break time="1.5s" /> Today is the real thing.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Right. | `mk-01-1.mp3` |
| 2 | Today is the real thing. | `mk-01-2.mp3` |

### 02 · Three parts

**Voice:** Sarah  
**Save as:** `mk-02.mp3`  
**Lines:** 5

```text
Three parts, back to back. <break time="1.5s" /> Part 1, about you. <break time="1.5s" /> Part 2, the cue card. <break time="1.5s" /> Part 3, the discussion. <break time="1.5s" /> About ten minutes. Same as the test.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Three parts, back to back. | `mk-02-1.mp3` |
| 2 | Part 1, about you. | `mk-02-2.mp3` |
| 3 | Part 2, the cue card. | `mk-02-3.mp3` |
| 4 | Part 3, the discussion. | `mk-02-4.mp3` |
| 5 | About ten minutes. Same as the test. | `mk-02-5.mp3` |

### 03 · Nobody stops you

**Voice:** Sarah  
**Save as:** `mk-03.mp3`  
**Lines:** 4

```text
One difference from the last three days. <break time="1.5s" /> Nobody is going to stop you. <break time="1.5s" /> And nobody shows you a good answer afterwards. <break time="1.5s" /> You just do it.
```

| # | Line | Cut into |
|---|---|---|
| 1 | One difference from the last three days. | `mk-03-1.mp3` |
| 2 | Nobody is going to stop you. | `mk-03-2.mp3` |
| 3 | And nobody shows you a good answer afterwards. | `mk-03-3.mp3` |
| 4 | You just do it. | `mk-03-4.mp3` |

### 05 · Good morning

**Voice:** Nolan  
**Save as:** `mk-05.mp3`  
**Lines:** 2

```text
Good morning, I am Nolan. <break time="1.5s" /> I will be your examiner today.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Good morning, I am Nolan. | `mk-05-1.mp3` |
| 2 | I will be your examiner today. | `mk-05-2.mp3` |

### 06 · Your name

**Voice:** Nolan  
**Save as:** `mk-06.mp3`  
**Lines:** 1 (no break tags needed)

```text
Can you tell me your full name, please?
```

### 07 · Where you are from

**Voice:** Nolan  
**Save as:** `mk-07.mp3`  
**Lines:** 1 (no break tags needed)

```text
And where are you from?
```

### 08 · Part 1 · Q1

**Voice:** Nolan  
**Save as:** `mk-08.mp3`  
**Lines:** 1 (no break tags needed)

```text
Do you live in a house or an apartment?
```

### 09 · Part 1 · Q2

**Voice:** Nolan  
**Save as:** `mk-09.mp3`  
**Lines:** 1 (no break tags needed)

```text
What do you like most about the place you live in?
```

### 10 · Part 1 · Q3

**Voice:** Nolan  
**Save as:** `mk-10.mp3`  
**Lines:** 1 (no break tags needed)

```text
Is there anything you would change about it?
```

### 11 · Part 1 · Q4

**Voice:** Nolan  
**Save as:** `mk-11.mp3`  
**Lines:** 1 (no break tags needed)

```text
What do you usually do when you are not working or studying?
```

### 12 · Part 1 · Q5

**Voice:** Nolan  
**Save as:** `mk-12.mp3`  
**Lines:** 1 (no break tags needed)

```text
Do you prefer spending your free time alone or with other people?
```

### 13 · Part 1 · Q6

**Voice:** Nolan  
**Save as:** `mk-13.mp3`  
**Lines:** 1 (no break tags needed)

```text
Has the way you spend your free time changed in the last few years?
```

### 14 · One minute to think

**Voice:** Nolan  
**Save as:** `mk-14.mp3`  
**Lines:** 3

```text
Now I am going to give you a topic. <break time="1.5s" /> You will have one minute to think. <break time="1.5s" /> You can make some notes if you wish.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Now I am going to give you a topic. | `mk-14-1.mp3` |
| 2 | You will have one minute to think. | `mk-14-2.mp3` |
| 3 | You can make some notes if you wish. | `mk-14-3.mp3` |

### 15 · Your cue card

**Voice:** Nolan  
**Save as:** `mk-15.mp3`  
**Lines:** 1 (no break tags needed)

```text
Ready for Part 2. Here is your cue card.
```

### 18 · Rounding off

**Voice:** Nolan  
**Save as:** `mk-18.mp3`  
**Lines:** 1 (no break tags needed)

```text
Do you still see this person?
```

### 19 · Part 3 · Q1

**Voice:** Nolan  
**Save as:** `mk-19.mp3`  
**Lines:** 1 (no break tags needed)

```text
Why do you think some people are better at teaching than others?
```

### 20 · Part 3 · Q2

**Voice:** Nolan  
**Save as:** `mk-20.mp3`  
**Lines:** 1 (no break tags needed)

```text
Which is more useful for young people to learn: practical skills, or academic knowledge?
```

### 21 · Part 3 · Q3

**Voice:** Nolan  
**Save as:** `mk-21.mp3`  
**Lines:** 1 (no break tags needed)

```text
How has the way people learn changed compared with a generation ago?
```

### 22 · Part 3 · Q4

**Voice:** Nolan  
**Save as:** `mk-22.mp3`  
**Lines:** 1 (no break tags needed)

```text
Do you think schools will look very different fifty years from now?
```

### 23 · End of the test

**Voice:** Nolan  
**Save as:** `mk-23.mp3`  
**Lines:** 2

```text
Thank you. <break time="1.5s" /> That is the end of the speaking test.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Thank you. | `mk-23-1.mp3` |
| 2 | That is the end of the speaking test. | `mk-23-2.mp3` |

### 24 · That is a whole test

**Voice:** Sarah  
**Save as:** `mk-24.mp3`  
**Lines:** 3

```text
That is it. <break time="1.5s" /> That is a whole speaking test, done. <break time="1.5s" /> However that felt, you just did the thing most people avoid until the day itself.
```

| # | Line | Cut into |
|---|---|---|
| 1 | That is it. | `mk-24-1.mp3` |
| 2 | That is a whole speaking test, done. | `mk-24-2.mp3` |
| 3 | However that felt, you just did the thing most people avoid until the day itself. | `mk-24-3.mp3` |
