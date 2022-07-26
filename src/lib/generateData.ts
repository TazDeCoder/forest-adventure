import { PathNode } from '../interfaces';

export default function generateData() {
  const data: PathNode[] = [
    {
      id: 1,
      text: 'You enter the infamous forest hidden in the mist; A forest known for its overwhelming mist that encloses it. Before you enter the forest, you glance over a small rock to see a "fan" sitting on it that you can perhaps use to aid you through the forest. It would be wise to pick up',
      prompt: 'Do you pick it up?',
      choices: [
        {
          id: 0,
          require: [],
          text: 'Yes',
          items: ['fan'],
          next: 2,
        },
        {
          id: 1,
          require: [],
          text: 'No',
          items: [],
          next: 2,
        },
      ],
      isNight: false,
    },
    {
      id: 2,
      text: 'After hours of walking, the mist around you has now grown to the point where it is now almost impossible to know exactly which direction you are going. You need to act quick, or else you might get lost',
      prompt: 'What do you do?',
      choices: [
        {
          id: 0,
          require: [],
          text: 'Keeping going the same direction',
          items: [],
          next: 3,
        },
        {
          id: 1,
          require: [],
          text: 'Stay still...',
          items: [],
          next: 3,
        },
        {
          id: 2,
          require: ['fan'],
          text: 'Use the "fan" to clear a path for you',
          items: [],
          next: 4,
        },
      ],
      isNight: false,
    },
    {
      id: 3,
      text: 'You got lost in the forest. It was foolish for you to go to this forest knowing you will likely get lost the deeper you went in it without a way to clear some of the mist off',
      prompt: '',
      choices: [],
      isNight: false,
    },
    {
      id: 4,
      text: 'It is now beginning to get dark, it is a good idea now to think about building a campfire to ward off any potential dangers that may lurk in the forest at night.',
      prompt: 'What do you do?',
      choices: [
        {
          id: 0,
          require: [],
          text: 'Go off to collect woods to build your campfire',
          items: ['woods'],
          next: 6,
        },
        {
          id: 1,
          require: [],
          text: 'Keep exploring the forest',
          items: [],
          next: 5,
        },
        {
          id: 1,
          require: [],
          text: 'Find a safe place elsewhere to rest for the night',
          items: [],
          next: 7,
        },
      ],
      isNight: false,
    },
    {
      id: 5,
      text: 'As you explore more of the forest, you come across an ambandoned shed. With curiousity, you check inside to find an "axe", a pair of "goggles", and a box of "matches". With an "axe" you can now chop down some trees to get the "woods" needed for a campfire',
      prompt: 'Do you decide to chop down some trees?',
      choices: [
        {
          id: 0,
          require: [],
          text: 'Go chop down some trees',
          items: ['axe', 'goggles', 'matches', 'woods'],
          next: 6,
        },
        {
          id: 1,
          require: [],
          text: 'Find a safe place to rest for the night',
          items: ['axe', 'goggles', 'matches'],
          next: 7,
        },
      ],
      isNight: false,
    },
    {
      id: 6,
      text: 'Night has approached. You have built your campfire. Everything seems to be okay. With re-assurance of no danger to be found, you are confident to explore the forest even more deeper till dawn.',
      prompt: 'What do you do?',
      choices: [
        {
          id: 0,
          require: [],
          text: 'Rest for the night',
          items: [],
          next: 10,
        },
        {
          id: 1,
          require: ['matches'],
          text: 'Keep exploring the forest',
          items: [],
          next: 8,
        },
      ],
      isNight: true,
    },
    {
      id: 7,
      text: 'Night has approached. You found a small quiet cave to seek shelter for the night. As you lay on the soft ground, ominous sounds emerge outside of the cave. Worried that you may get attacked by a creature, you get up prepared for what is to come',
      prompt: 'What do you do?',
      choices: [
        {
          id: 0,
          require: [],
          text: 'Go to a corner of the cave and stay quiet',
          items: [],
          next: 9,
        },
        {
          id: 1,
          require: ['axe', 'matches'],
          text: 'Light a match and get your axe out',
          items: [],
          next: 10,
        },
      ],
      isNight: true,
    },
    {
      id: 8,
      text: 'As you explore the forest at night, you begin to hallucinate of strange voices and feel like as though something is watching over your shoulders. Suddenly, a dark ominous figure appears before you with eyes piercing at your soul.',
      prompt: 'What do you do?',
      choices: [
        {
          id: 0,
          require: [],
          text: 'Stay still...',
          items: [],
          next: 9,
        },
        {
          id: 1,
          require: ['axe'],
          text: 'Bring out your axe',
          items: [],
          next: 10,
        },
      ],
      isNight: true,
    },
    {
      id: 9,
      text: 'You have been eaten by the creature. It would have been wise to have a weapon with you if you going to explore a creepy forest in the first place',
      prompt: '',
      choices: [],
      isNight: true,
    },
    {
      id: 10,
      text: 'Well done you have made it to the next day. Unfortunately, this is where the game ends; if you like to support this project, then please check out the code repo for more details on that - bye for now :¬)',
      prompt: '',
      choices: [],
      isNight: true,
    },
  ];

  return data;
}
