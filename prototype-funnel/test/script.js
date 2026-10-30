// The speaking test, beat by beat. One question set for every test for now.
// kind: which scene layout a beat uses. part: which part it belongs to (for progress).

export const CUE = {
  topic: 'Describe a city you would like to visit.',
  points: ['where it is', 'how you know about it', 'what you would do there', 'and explain why you want to go'],
  labels: ['Where it is', 'How you know about it', 'What you would do there', 'Why you want to go'],
};

const ask = (id, part, label, text, tip, cap) => ({ id, kind: 'ask', part, who: 'nolan', label, text, tip, cap });

export const BEATS = [
  // Sarah opens
  { id: 's1', kind: 'sarah', part: 'intro', who: 'sarah',
    lines: n => [`Hi ${n}, I’m Sarah.`, 'In a moment you’ll sit a full IELTS speaking test, just like the real one.', 'It takes about 12 minutes.'] },
  { id: 's2', kind: 'parts', part: 'intro', who: 'sarah',
    lines: () => ['Three parts, one take.', 'Part 1, about you.', 'Part 2, the cue card.', 'Part 3, the discussion.', 'Nobody will stop you. Nolan won’t react. That’s normal.'] },

  // Mic
  { id: 'm1', kind: 'mic', part: 'mic', who: 'nolan' },
  { id: 'm3', kind: 'sound', part: 'mic', who: 'nolan' },

  // Nolan: hello and ID
  { id: 'n1', kind: 'caption', part: 'p1', who: 'nolan', lines: () => ['Good morning, I am Nolan.', 'I will be your examiner today.'] },
  ask('id1', 'p1', 'Before we start', 'Can you tell me your full name, please?', 'Answer this first', 15),
  ask('id2', 'p1', 'Before we start', 'And where are you from?', 'Speak an answer out loud', 15),

  // Part 1
  ask('q1', 'p1', 'Where you live', 'Do you live in a house or an apartment?', 'Now, some questions about you', 30),
  ask('q2', 'p1', 'Where you live', 'What do you like most about the place you live in?', 'Speak an answer out loud', 30),
  ask('q3', 'p1', 'Where you live', 'Is there anything you would change about it?', 'Speak an answer out loud', 30),
  ask('q4', 'p1', 'Free time', 'What do you usually do when you are not working or studying?', 'Now, free time', 30),
  ask('q5', 'p1', 'Free time', 'Do you prefer spending your free time alone or with other people?', 'Speak an answer out loud', 30),
  ask('q6', 'p1', 'Free time', 'Has the way you spend your free time changed in the last few years?', 'Speak an answer out loud', 30),

  // Part 2
  { id: 'p2i', kind: 'caption', part: 'p2', who: 'nolan', lines: () => ['Now I am going to give you a topic.', 'You will have one minute to think.', 'You can make some notes if you wish.'] },
  { id: 'p2c', kind: 'cue', part: 'p2', who: 'nolan', lines: () => ['Ready for Part 2. Here is your cue card.'] },
  { id: 'p2p', kind: 'prep', part: 'p2', who: 'nolan', secs: 60 },
  { id: 'p2t', kind: 'talk', part: 'p2', who: 'nolan', secs: 120 },
  ask('p2r', 'p2', 'Rounding off', 'Have you ever come close to visiting this city?', 'Speak an answer out loud', 15),

  // Part 3
  ask('r1', 'p3', 'Cities and the future', 'Why do some people prefer to live in big cities?', 'Now, some general questions', 45),
  ask('r2', 'p3', 'Cities and the future', 'What problems do big cities face today?', 'Speak an answer out loud', 45),
  ask('r3', 'p3', 'Cities and the future', 'How might cities change in the next fifty years?', 'Speak an answer out loud', 45),
  ask('r4', 'p3', 'Cities and the future', 'Should governments encourage people to move to smaller towns?', 'Speak an answer out loud', 45),

  // Close
  { id: 't6', kind: 'caption', part: 'end', who: 'nolan', lines: () => ['Thank you.', 'That is the end of the speaking test.'] },
  { id: 'c1', kind: 'check', part: 'end', who: 'sarah' },
];

// Not in the normal run: reached by a blocked mic or a dropped connection
export const SIDE = {
  m2: { id: 'm2', kind: 'blocked', part: 'mic', who: 'none' },
  e1: { id: 'e1', kind: 'offline', part: 'mic', who: 'none' },
};

export const PARTS = {
  p1: { name: 'Part 1 · About you', ids: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] },
  p2: { name: 'Part 2 · The cue card' },
  p3: { name: 'Part 3 · Discussion', ids: ['r1', 'r2', 'r3', 'r4'] },
};


// How long a spoken line stays up: about 2.7 words a second, never under 1.6s
export const lineMs = s => Math.max(1600, Math.round(s.split(/\s+/).length / 2.7 * 1000) + 820);
