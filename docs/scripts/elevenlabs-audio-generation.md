# IELTS Speaking · Audio for ElevenLabs

Every spoken line from the four lesson scripts, ready to paste into ElevenLabs. **81 files to generate** across the four days. They get cut into 244 clips, one per line.

Each file is **one section** of a script (one screen in the prototype), in the same order as the script docs: `day-1-part-1.md`, `day-2-part-2.md`, `day-3-part-3.md`, `day-4-mock-test.md`. Where a section changes with the theme the learner picks, there is one file per theme.

## How to record

1. In ElevenLabs **Text to Speech**, choose the model **Eleven Multilingual v2**. It reads the `<break time="1.5s" />` tags as pauses.
2. Pick the voice named on the section. Use **the same settings for every file of that voice**, on every day. Start with Stability 50%, Similarity 75%, Style 0%, Speaker boost on, speed 1.0.
3. Copy the grey box exactly: same words, same punctuation, break tags included. Generate.
4. Listen. If any line is wrong, or a pause is missing, **regenerate the whole box**. Don't edit the audio.
5. Download the MP3 and rename it to the **Save as** name.
6. Put it in that day's `vo/raw/` folder, or send the files to Claude.

**Why one file per section?** Each file gets cut into one clip per line. Each clip's length then controls when that line's caption changes and when its animation happens: rows lighting up, list items growing in, the mic arriving. The break tags make the cuts cleaner. If the pauses don't come through, that's fine too: the splitter listens for the words and cuts between the lines anyway.

## Voices

| Voice | Direction | Used on |
|---|---|---|
| **Sarah** | The teacher. Warm, clear, unhurried. Talking to one person. | Day 1 · Part 1, Day 2 · Part 2, Day 3 · Part 3, Day 4 · Mock test |
| **Nolan** | The examiner. Polite, neutral, British. Even pace. Never reacts, never encourages. | Day 4 · Mock test |
| **Aarav** | Day 1 student. Young man, Indian English, relaxed and natural. | Day 1 · Part 1 |
| **Maya** | Day 2 student. Young woman, natural and warm, telling it, not performing it. | Day 2 · Part 2 |

## Files per day

| Day | Files | Sarah | Other voice | Save into |
|---|---|---|---|---|
| [Day 1 · Part 1](#day-1--part-1) | 19 | 18 | Aarav 1 | `prototype/vo/raw/` |
| [Day 2 · Part 2](#day-2--part-2) | 19 | 17 | Maya 2 | `prototype-day2/vo/raw/` |
| [Day 3 · Part 3](#day-3--part-3) | 22 | 22 | – | `prototype-day3/vo/raw/` |
| [Day 4 · Mock test](#day-4--mock-test) | 21 | 4 | Nolan 17 | `prototype-mock/vo/raw/` |

---

## Day 1 · Part 1

19 files · save into `prototype/vo/raw/` · then `python3 tools/vo/vo.py split prototype`

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

---

## Day 2 · Part 2

19 files · save into `prototype-day2/vo/raw/` · then `python3 tools/vo/vo.py split prototype-day2`

### 01 · Welcome back

**Voice:** Sarah  
**Save as:** `d2-01.mp3`  
**Lines:** 3

```text
Welcome back. <break time="1.5s" /> Yesterday you did Part 1. <break time="1.5s" /> Short questions, short answers.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Welcome back. | `d2-01-1.mp3` |
| 2 | Yesterday you did Part 1. | `d2-01-2.mp3` |
| 3 | Short questions, short answers. | `d2-01-3.mp3` |

### 02 · Today, Part 2

**Voice:** Sarah  
**Save as:** `d2-02.mp3`  
**Lines:** 3

```text
Today is Part 2. The cue card. <break time="1.5s" /> This is the part people are most scared of. <break time="1.5s" /> And honestly, the most predictable, once you know how it works.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Today is Part 2. The cue card. | `d2-02-1.mp3` |
| 2 | This is the part people are most scared of. | `d2-02-2.mp3` |
| 3 | And honestly, the most predictable, once you know how it works. | `d2-02-3.mp3` |

### 03 · The card

**Voice:** Sarah  
**Save as:** `d2-03.mp3`  
**Lines:** 3

```text
The examiner hands you a card. <break time="1.5s" /> It has a topic on it, <break time="1.5s" /> and three or four points under it.
```

| # | Line | Cut into |
|---|---|---|
| 1 | The examiner hands you a card. | `d2-03-1.mp3` |
| 2 | It has a topic on it, | `d2-03-2.mp3` |
| 3 | and three or four points under it. | `d2-03-3.mp3` |

### 04 · One minute, then two

**Voice:** Sarah  
**Save as:** `d2-04.mp3`  
**Lines:** 4

```text
You get one minute to prepare. <break time="1.5s" /> You can write notes. <break time="1.5s" /> Then you speak for one to two minutes. <break time="1.5s" /> On your own. Nobody helps you.
```

| # | Line | Cut into |
|---|---|---|
| 1 | You get one minute to prepare. | `d2-04-1.mp3` |
| 2 | You can write notes. | `d2-04-2.mp3` |
| 3 | Then you speak for one to two minutes. | `d2-04-3.mp3` |
| 4 | On your own. Nobody helps you. | `d2-04-4.mp3` |

### 05 · Stopped is good

**Voice:** Sarah  
**Save as:** `d2-05.mp3`  
**Lines:** 4

```text
And by the way, if the examiner stops you at two minutes, <break time="1.5s" /> that is not a bad sign. <break time="1.5s" /> That is a good sign. <break time="1.5s" /> It means you filled the whole time.
```

| # | Line | Cut into |
|---|---|---|
| 1 | And by the way, if the examiner stops you at two minutes, | `d2-05-1.mp3` |
| 2 | that is not a bad sign. | `d2-05-2.mp3` |
| 3 | That is a good sign. | `d2-05-3.mp3` |
| 4 | It means you filled the whole time. | `d2-05-4.mp3` |

### 06 · Four words

**Voice:** Sarah  
**Save as:** `d2-06.mp3`  
**Lines:** 5

```text
Now, the trick is in that one minute. <break time="1.5s" /> Don’t write sentences, there is no time for sentences. <break time="1.5s" /> Write one word for each point. <break time="1.5s" /> Four points, four words. <break time="1.5s" /> That is your map.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Now, the trick is in that one minute. | `d2-06-1.mp3` |
| 2 | Don’t write sentences, there is no time for sentences. | `d2-06-2.mp3` |
| 3 | Write one word for each point. | `d2-06-3.mp3` |
| 4 | Four points, four words. | `d2-06-4.mp3` |
| 5 | That is your map. | `d2-06-5.mp3` |

### 07 · Thirty seconds a point

**Voice:** Sarah  
**Save as:** `d2-07.mp3`  
**Lines:** 3

```text
Rough guide for the time. <break time="1.5s" /> Four points, two minutes, <break time="1.5s" /> so about thirty seconds on each point.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Rough guide for the time. | `d2-07-1.mp3` |
| 2 | Four points, two minutes, | `d2-07-2.mp3` |
| 3 | so about thirty seconds on each point. | `d2-07-3.mp3` |

### 08 · Pick a theme

**Voice:** Sarah  
**Save as:** `d2-08.mp3`  
**Lines:** 2

```text
Let me show you the whole thing with an example first. <break time="1.5s" /> Pick a theme.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Let me show you the whole thing with an example first. | `d2-08-1.mp3` |
| 2 | Pick a theme. | `d2-08-2.mp3` |

### 09 · Say this is your card

**Voice:** Sarah  
**Save as:** `d2-09.mp3`  
**Lines:** 2

```text
Okay. Say this is your card. <break time="1.5s" /> If this were mine, my notes would just be four words.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Okay. Say this is your card. | `d2-09-1.mp3` |
| 2 | If this were mine, my notes would just be four words. | `d2-09-2.mp3` |

### 10 · Listen

**Voice:** Sarah  
**Save as:** `d2-10.mp3`  
**Lines:** 2

```text
Now listen to how those four words turn into a full answer. <break time="1.5s" /> This one runs about a minute, which is what you are aiming for.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Now listen to how those four words turn into a full answer. | `d2-10-1.mp3` |
| 2 | This one runs about a minute, which is what you are aiming for. | `d2-10-2.mp3` |

### 11 · The model answer · Movies

**Voice:** Maya  
**Save as:** `d2-11-movie.mp3`  
**Lines:** 5

```text
I recently watched 'The Pursuit of Happyness', with Will Smith and his son Jaden. <break time="1.5s" /> It's based on a true story, about a salesman who loses everything, and at one point he's sleeping in a train station bathroom with his little boy. <break time="1.5s" /> I'd heard it had a really inspiring message, and I'm a Will Smith fan anyway, so one weekend I finally sat down and watched it. <break time="1.5s" /> There's a scene where he tells his son, don't ever let somebody tell you you can't do something. That line stayed with me for days. <break time="1.5s" /> And honestly, the whole film made me think about how much I take for granted.
```

| # | Line | Cut into |
|---|---|---|
| 1 | I recently watched 'The Pursuit of Happyness', with Will Smith and his son Jaden. | `d2-11-movie-1.mp3` |
| 2 | It's based on a true story, about a salesman who loses everything, and at one point he's sleeping in a train station bathroom with his little boy. | `d2-11-movie-2.mp3` |
| 3 | I'd heard it had a really inspiring message, and I'm a Will Smith fan anyway, so one weekend I finally sat down and watched it. | `d2-11-movie-3.mp3` |
| 4 | There's a scene where he tells his son, don't ever let somebody tell you you can't do something. That line stayed with me for days. | `d2-11-movie-4.mp3` |
| 5 | And honestly, the whole film made me think about how much I take for granted. | `d2-11-movie-5.mp3` |

### 11 · The model answer · Hobbies

**Voice:** Maya  
**Save as:** `d2-11-hobby.mp3`  
**Lines:** 6

```text
I've recently gotten into gardening. <break time="1.5s" /> It started when I found my grandmother's old gardening book in the attic. I got curious, bought some seeds, and just tried. <break time="1.5s" /> The first month was a disaster. I overwatered everything and my tomatoes died in two weeks. <break time="1.5s" /> But slowly I figured it out, and now I've got a small balcony garden. Chillies, mint, a few marigolds. <break time="1.5s" /> It's a little morning ritual now. Ten quiet minutes before the day starts, before the phone starts ringing. <break time="1.5s" /> Honestly, it's become the calmest part of my day, and I don't see myself stopping.
```

| # | Line | Cut into |
|---|---|---|
| 1 | I've recently gotten into gardening. | `d2-11-hobby-1.mp3` |
| 2 | It started when I found my grandmother's old gardening book in the attic. I got curious, bought some seeds, and just tried. | `d2-11-hobby-2.mp3` |
| 3 | The first month was a disaster. I overwatered everything and my tomatoes died in two weeks. | `d2-11-hobby-3.mp3` |
| 4 | But slowly I figured it out, and now I've got a small balcony garden. Chillies, mint, a few marigolds. | `d2-11-hobby-4.mp3` |
| 5 | It's a little morning ritual now. Ten quiet minutes before the day starts, before the phone starts ringing. | `d2-11-hobby-5.mp3` |
| 6 | Honestly, it's become the calmest part of my day, and I don't see myself stopping. | `d2-11-hobby-6.mp3` |

### 12 · Point by point · Movies

**Voice:** Sarah  
**Save as:** `d2-12-movie.mp3`  
**Lines:** 4

```text
You heard it, right? <break time="1.5s" /> The card, point by point, in order. <break time="1.5s" /> And look at the ending. <break time="1.5s" /> It wasn’t about the film any more. It was about what changed for the speaker.
```

| # | Line | Cut into |
|---|---|---|
| 1 | You heard it, right? | `d2-12-movie-1.mp3` |
| 2 | The card, point by point, in order. | `d2-12-movie-2.mp3` |
| 3 | And look at the ending. | `d2-12-movie-3.mp3` |
| 4 | It wasn’t about the film any more. It was about what changed for the speaker. | `d2-12-movie-4.mp3` |

### 12 · Point by point · Hobbies

**Voice:** Sarah  
**Save as:** `d2-12-hobby.mp3`  
**Lines:** 4

```text
You heard it, right? <break time="1.5s" /> The card, point by point, in order. <break time="1.5s" /> And look at the ending. <break time="1.5s" /> It wasn’t about the plants any more. It was about what they changed in her day.
```

| # | Line | Cut into |
|---|---|---|
| 1 | You heard it, right? | `d2-12-hobby-1.mp3` |
| 2 | The card, point by point, in order. | `d2-12-hobby-2.mp3` |
| 3 | And look at the ending. | `d2-12-hobby-3.mp3` |
| 4 | It wasn’t about the plants any more. It was about what they changed in her day. | `d2-12-hobby-4.mp3` |

### 13 · That is the structure

**Voice:** Sarah  
**Save as:** `d2-13.mp3`  
**Lines:** 2

```text
When you end with a feeling, the answer sounds finished. <break time="1.5s" /> That is all the structure you need.
```

| # | Line | Cut into |
|---|---|---|
| 1 | When you end with a feeling, the answer sounds finished. | `d2-13-1.mp3` |
| 2 | That is all the structure you need. | `d2-13-2.mp3` |

### 14 · Your turn

**Voice:** Sarah  
**Save as:** `d2-14.mp3`  
**Lines:** 4

```text
Okay, your turn now. Here is your card. <break time="1.5s" /> Describe a trip you went on recently. <break time="1.5s" /> Look at your points. Where, who, what, why it was memorable. <break time="1.5s" /> Those are basically your four words already.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Okay, your turn now. Here is your card. | `d2-14-1.mp3` |
| 2 | Describe a trip you went on recently. | `d2-14-2.mp3` |
| 3 | Look at your points. Where, who, what, why it was memorable. | `d2-14-3.mp3` |
| 4 | Those are basically your four words already. | `d2-14-4.mp3` |

### 17 · That was two minutes

**Voice:** Sarah  
**Save as:** `d2-17.mp3`  
**Lines:** 3

```text
That was up to two minutes of speaking on your own. <break time="1.5s" /> That is not a small thing. <break time="1.5s" /> However it went, the first cue card is hard for everyone.
```

| # | Line | Cut into |
|---|---|---|
| 1 | That was up to two minutes of speaking on your own. | `d2-17-1.mp3` |
| 2 | That is not a small thing. | `d2-17-2.mp3` |
| 3 | However it went, the first cue card is hard for everyone. | `d2-17-3.mp3` |

### 18 · Tomorrow

**Voice:** Sarah  
**Save as:** `d2-18.mp3`  
**Lines:** 3

```text
That is the end of today. <break time="1.5s" /> You will see how you did in a moment. <break time="1.5s" /> Tomorrow, the discussion round.
```

| # | Line | Cut into |
|---|---|---|
| 1 | That is the end of today. | `d2-18-1.mp3` |
| 2 | You will see how you did in a moment. | `d2-18-2.mp3` |
| 3 | Tomorrow, the discussion round. | `d2-18-3.mp3` |

### 19 · See you tomorrow

**Voice:** Sarah  
**Save as:** `d2-19.mp3`  
**Lines:** 2

```text
Nice work today. <break time="1.5s" /> See you tomorrow.
```

| # | Line | Cut into |
|---|---|---|
| 1 | Nice work today. | `d2-19-1.mp3` |
| 2 | See you tomorrow. | `d2-19-2.mp3` |

---

## Day 3 · Part 3

22 files · save into `prototype-day3/vo/raw/` · then `python3 tools/vo/vo.py split prototype-day3`

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

---

## Day 4 · Mock test

21 files · save into `prototype-mock/vo/raw/` · then `python3 tools/vo/vo.py split prototype-mock`

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
