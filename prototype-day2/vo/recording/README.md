# Audio for ElevenLabs · Day 2 · Part 2

19 files to generate, cut into 64 clips.

## How to record

1. In ElevenLabs **Text to Speech**, choose the model **Eleven Multilingual v2**. It reads the `<break time="1.5s" />` tags as pauses.
2. Pick the voice named on the section. Use **the same settings for every file of that voice**, on every day. Start with Stability 50%, Similarity 75%, Style 0%, Speaker boost on, speed 1.0.
3. Copy the grey box exactly: same words, same punctuation, break tags included. Generate.
4. Listen. If any line is wrong, or a pause is missing, **regenerate the whole box**. Don't edit the audio.
5. Download the MP3 and rename it to the **Save as** name.
6. Put it in that day's `vo/raw/` folder, or send the files to Claude.

Then run `python3 tools/vo/vo.py split prototype-day2`.

**Why one file per section?** Each file gets cut into one clip per line. Each clip's length then controls when that line's caption changes and when its animation happens: rows lighting up, list items growing in, the mic arriving. The break tags make the cuts cleaner. If the pauses don't come through, that's fine too: the splitter listens for the words and cuts between the lines anyway.

---

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
