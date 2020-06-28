let gameState = {}

function preload () {
  // load in background and characters
  this.load.image('bg',     'https://s3.amazonaws.com/codecademy-content/projects/learn-phaser/cyoa/background.png');
  this.load.image('knight', 'https://s3.amazonaws.com/codecademy-content/projects/learn-phaser/cyoa/knight.png');
  this.load.image('orc',    'https://s3.amazonaws.com/codecademy-content/projects/learn-phaser/cyoa/orc.png');
  this.load.image('wizard', 'https://s3.amazonaws.com/codecademy-content/projects/learn-phaser/cyoa/wizard.png');
}

function create(){
  gameState.background = this.add.image(0, 0, 'bg')
  gameState.background.setOrigin(0, 0);
  renderCharacter(this, 'knight');

  initializePage(this);
  const firstPage = fetchPage(1);
  displayPage(this, firstPage);
}

function renderCharacter(scene, key) {
  if(gameState.character) {
    gameState.character.destroy();
  }
    gameState.character = scene.add.image(270, 340, key) ;
    gameState.character.setOrigin(.5, 1);
    gameState.character.setScale(.7);


}

function initializePage(scene) {
  // create options list and background
  // and saves them into gameState

  if (!gameState.options) {
    // create options list
    // if it doesn't exist
    gameState.options = [];
  }

  if (!gameState.narrative_background) {
    // create narrative background
    // if it doesn't exist
    gameState.narrative_background = scene.add.rectangle(10, 360, 430, 170, 0x000);
  gameState.narrative_background.setOrigin(0, 0);
  }
}

function destroyPage() {
  // wipe out narrative text and options

  if (gameState.narrative) {
    // destroy narrative if it exists
    gameState.narrative.destroy();
  }

  for (let option of gameState.options) {
    // destroy options if they exist
    option.optionBox.destroy();
    option.optionText.destroy();
  }
}

function displayPage(scene, page) {
  const narrativeStyle = { fill: '#ffffff', fontStyle: 'italic', align: 'center', wordWrap: { width: 340 }, lineSpacing: 8};
  renderCharacter(scene, page.character);
  // display general page character
  // & narrative here:
  renderCharacter(scene, page.character);
  
  gameState.narrative = scene.add.text(65, 380, page.narrative, narrativeStyle);

  // for-loop creates different options
  // need the index i for spacing the boxes
  for (let i=0; i<page.options.length; i++) {
    let option = page.options[i];

    // color in the option box
    const optionBox = scene.add.rectangle(40 + i * 130, 470, 110, 40, 0xb39c0e, 0)
    optionBox.strokeColor = 0xb39c0e;
    optionBox.strokeWeight = 2;
    optionBox.strokeAlpha = 1;
    optionBox.isStroked = true;
    optionBox.setOrigin(0, 0)

    // add in the option text
    const baseX = 40 + i * 130;
    const optionText = scene.add.text(baseX, 480, option.option, { fontSize:14, fill: '#b39c0e', align: 'center', wordWrap: {width: 110}});
    const optionTextBounds = optionText.getBounds()

    // centering each option text
    optionText.setX(optionTextBounds.x + 55 - (optionTextBounds.width / 2));
    optionText.setY(optionTextBounds.y + 10 - (optionTextBounds.height / 2));

    // add in gameplay functionality
    // for options here

optionBox.setInteractive()
optionBox.on('pointerup', function() {
  const newPage = this.option.nextPage;
  if (newPage !== undefined) {
    destroyPage();
    displayPage(scene, fetchPage(newPage));
  }
}, { option });

optionBox.on('pointerover', function() {
this.optionBox.setStrokeStyle(2, 0xffe014, 1);
this.optionText.setColor('#ffe014');
}, { optionBox, optionText });

optionBox.on('pointerout', function() {
this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
this.optionText.setColor('#b39c0e');
}, {optionBox, optionText});

gameState.options.push({
  optionBox,
  optionText
});

  }
}

const config = {
  type: Phaser.WEBGL,
  parent: 'phaser-game',
  backgroundColor: 0xfea0fd,
  width: 450,
  height: 550,
  scene: {
    preload,
    create,
  }
};

const game = new Phaser.Game(config);

function fetchPage(page) {


   const pages = [
     {
      character: 'wizard',
      page: 1,
      narrative: 'wizard: Olá Jogador?',
      options: [
        { option: 'Diga Oi',   nextPage: 2 },
        { option: 'Ignorar',   nextPage: 41 },
      ]
    },

    {
      character: 'orc',
      page: 41,
      narrative: 'Orc: Uhm. Perdão?!',
      options: [
        { option: 'Diga oi!',     nextPage: 2 },
        { option: 'Continue ignorando',   nextPage: 3 },
      ]
    },

    {
      character: 'orc',
      page: 2,
      narrative: 'Orc: Eu preciso de ajuda para pegar meu pote de açucar na prateleira, pode me ajudar??',
      options: [
        { option: 'Voce... o que?',   nextPage: 5 },
        { option: 'acho que não',   nextPage: 4 },
      ]
    },

    {
      character: 'orc',
      page: 5,
      narrative: 'Orc: Meu pote de açucar entendeu? Eu sou muito... grosso... Talvez você possa me ajudar heim?',
      options: [
        { option: 'Como posso ajudar?',   nextPage: 6 },
        { option: 'Não eu acho que não...',   nextPage: 4 },
      ]
    },

    {
      character: 'orc',
      page: 6,
      narrative: 'Orc: Eu te levanto até lá, acha que consegue pegar?',
      options: [
        { option: 'Pegar',   nextPage: 10 },
      ]
    },

    {
      character: 'orc',
      page: 10,
      narrative: 'Orc: Obrigado, geralmente as pessoas fogem por causa da minha "beleza".',
      options: [
        { option: 'Sem problemas',   nextPage: 11 },
        { option: 'Não me diga...',   nextPage: 18 },
      ]
    },

    {
      character: 'orc',
      page: 18,
      narrative: 'Orc: Pois é... eu sou um Orc, v ocê ja viu um antes?',
      options: [
        { option: 'Eu acho que sim...',   nextPage: 20 },
      ]
    },

    {
      character: 'orc',
      page: 20,
      narrative: 'Você e o Orc discutem politica enquanto comem biscoitos, aparentemente você tem muito tempo livre! (você estuda filosofia na federal?)',
      options: [
        { option: 'Come os biscoitos...',   nextPage: 21 },
      ]
    },

    {
      character: 'orc',
      page: 21,
      narrative: 'Os biscoitos são du bão! ',
      options: [
        { option: 'Pedir receita',   nextPage: 19 },
      ]
    },

    {
      character: 'orc',
      page: 19,
      narrative: 'O Orc divide a receita com você, aparentemente você curtiu essa demonstração de afeto\nTHE END',
      options: [
        { option: 'Jogar Novamente', nextPage: 1 },
      ]
    },

    {
      character: 'knight',
      page: 11,
      narrative: 'Knight: Ei. Você ajudou aquele orc?',
      options: [
        { option: 'Sim',  nextPage: 12 },
        { option: 'Não',   nextPage: 23 },
      ]
    },

    {
      character: 'knight',
      page: 23,
      narrative: 'Knight: OK bom....',
      options: [
        { option: 'Na verdade...',  nextPage: 12 },
        { option: 'Sai fora',   nextPage: 24 },
      ]
    },

    {
      character: 'knight',
      page: 24,
      narrative: 'Você sai da caverna, que jogo rapido!\nTHE END',
      options: [
        { option: 'Jogar de novo!',  nextPage: 1 },
      ]
    },

    {
      character: 'knight',
      page: 12,
      narrative: 'Knight: Você não devia fazer isso. De que forma o Orc ira aprender?',
      options: [
        { option: 'Foi mal pela mancada!',     nextPage: 14 },
        { option: 'Quem és tu?', nextPage: 13 },
      ]
    },

    {
      character: 'knight',
      page: 13,
      narrative: 'Knight: Apenas um cara interessado.',
      options: [
        { option: 'Tanto faz....', nextPage: 25 },
        { option: 'Você esta certo', nextPage: 17 },
      ]
    },

    {
      character: 'knight',
      page: 25,
      narrative: 'Knight: Eu sei o que é melhor para os Orcs...',
      options: [
        { option: 'Se ta falando...', nextPage: 14 },
      ]
    },

    {
      character: 'knight',
      page: 17,
      narrative: 'Você age como se nada estivesse errado com o que o cavaleiro está dizendo.',
      options: [
        { option: 'OK', nextPage: 22 },
      ]
    },

    {
      character: 'knight',
      page: 22,
      narrative: 'Porem mais tarde você percebe que deveria ter sido mais pro ativo...\nGAME OVER',
      options: [
        { option: 'Jogar Novamente', nextPage: 1 },
      ]
    },

    {
      character: 'knight',
      page: 14,
      narrative: 'Knight: Você acha? Come on. Um orc deve ser capaz de ser independente.',
      options: [
        { option: 'Biscoitis parça',     nextPage: 15 },
        { option: 'Quem és tu, ó cara de tatu?', nextPage: 13 },
      ]
    },

    {
      character: 'knight',
      page: 15,
      narrative: 'Você tenta explicar ao cavaleiro que recebeu biscoitos e um novo amigo.',
      options: [
        { option: 'OK',     nextPage: 16 },
      ]
    },

    {
      character: 'knight',
      page: 16,
      narrative: 'Mas o cavaleiro é um mala sem alça.\nGAME OVER',
      options: [
        { option: 'Play again',     nextPage: 1 },
      ]
    },

    {
      character: 'orc',
      page: 3,
      narrative: 'Orc: Olha eu preciso de ajuda, vai ajudar ou ficar me olhando igual um marreco?',
      options: [
        { option: 'Ta querendo o que?',  nextPage: 2 },
        { option: 'Sair pela tangente...',   nextPage: 4 },
      ]
    },

    {
      character: 'orc',
      page: 4,
      narrative: 'Orc: Oh eu sei como funciona... Fala que é heroi e sai vazado!',
      options: [
        { option: 'Sair como um cagalhão',   nextPage: 8 },
        { option: 'Se empenhar',   nextPage: 7 },
      ]
    },

    {
      character: 'orc',
      page: 7,
      narrative: 'Você se envolve em uma conversa apaixonada com o orc e discute coisas como adultos.',
      options: [
        { option: 'OK',   nextPage: 9 },
      ]
    },

    {
      character: 'wizard',
      page: 8,
      narrative: 'Wizard: Hei pequeno gafanhoto',
      options: [
        { option: 'Contemplem o mago.',   nextPage: 26 },
      ]
    },

    {
      character: 'wizard',
      page: 26,
      narrative: 'Wizard: Vocẽ ta no meu cafofo por algum motivo cara palida?',
      options: [
        { option: 'fazer amigos',   nextPage: 27 },
        { option: 'tretar like a Chuck Norris',   nextPage: 46 },
        { option: 'Fazer biscoito (não bolacha)',   nextPage: 29 },
      ]
    },

    {
      character: 'wizard',
      page: 46,
      narrative: 'Wizard: Não posso te ajudar, sou crente.',
      options: [
        { option: 'Wow',   nextPage: 47 },
      ]
    },

    {
      character: 'wizard',
      page: 47,
      narrative: 'Você foi queimado pelo sacer.\nGAME OVER',
      options: [
        { option: '*Na casa do senhor n existe satanais* Jogar de novo?',   nextPage: 1 },
      ]
    },

    {
      character: 'wizard',
      page: 27,
      narrative: 'Wizard: Tem varias criaturas pra tu faze amizade aqui, quem você quer?',
      options: [
        { option: 'Orc Noiado',   nextPage: 28 },
        { option: 'Mago Crente',   nextPage: 30 },
        { option: 'Guerreiro Folgado',   nextPage: 38 },
      ]
    },

    {
      character: 'wizard',
      page: 38,
      narrative: 'Wizard: Ctza? Esse cara é meio esquisito.',
      options: [
        { option: 'Tão certo como o certo é certo',   nextPage: 39 },
        { option: 'Agora que você falou...',   nextPage: 27 },
      ]
    },

    {
      character: 'wizard',
      page: 39,
      narrative: 'Wizard: AbraCadaBra! *invoca o bolsominion*',
      options: [
        { option: 'Boa!',   nextPage: 40},
      ]
    },

    {
      character: 'knight',
      page: 40,
      narrative: 'Knight: Brasil acima de todos... eu em baixo e tal....',
      options: [
        { option: 'Oi amigaum',   nextPage: 42},
      ]
    },

    {
      character: 'knight',
      page: 42,
      narrative: 'Knight: Na real, to ocupadaço.',
      options: [
        { option: 'Ta tirando?',   nextPage: 43},
      ]
    },

    {
      character: 'knight',
      page: 43,
      narrative: 'Knight: Mas depois nós marca uma broderagem',
      options: [
        { option: 'Ai vi vantagem',   nextPage: 44},
      ]
    },

    {
      character: 'knight',
      page: 44,
      narrative: 'O cavaleiro te deu o bolo, pastor da universal achou ele no Tinder e ele ta de disciplina',
      options: [
        { option: 'Que situação atipica...',   nextPage: 45},
      ]
    },

    {
      character: 'knight',
      page: 45,
      narrative: 'Você falhou em fazer amigos na caverna.\nGAME OVER',
      options: [
        { option: 'Jogar de novo? *Forever Alone...*',   nextPage: 1},
      ]
    },

    {
      character: 'wizard',
      page: 30,
      narrative: 'Wizard: Oh. Wow. Ok. O que você quer fazer?',
      options: [
        { option: 'Jogar Atari, maratonar Dark, comer pipoca...',   nextPage: 31 },
        { option: 'uma conversinha',   nextPage: 32 },
      ]
    },

    {
      character: 'wizard',
      page: 31,
      narrative: 'Vocês jogam *FIFA 88* um jogo raro nunca feito',
      options: [
        { option: 'OK (o roteirista esta bebado)',   nextPage: 36 },
      ]
    },

    {
      character: 'wizard',
      page: 36,
      narrative: 'O wizard é noob e perde todos!',
      options: [
        { option: 'A eu to maluco',   nextPage: 37 },
      ]
    },

    {
      character: 'wizard',
      page: 37,
      narrative: 'O mago não sabe perder e te manda pro quinto dos infernos!\nTHE END',
      options: [
        { option: 'Play again',   nextPage: 1 },
      ]
    },

    {
      character: 'wizard',
      page: 32,
      narrative: 'Wizard: Como ta o clima?',
      options: [
        { option: 'ta um chove não molha!',   nextPage: 33 },
        { option: 'Não sei... ',   nextPage: 33 },
        { option: 'Uma delicia cara...',   nextPage: 33 },
      ]
    },

    {
      character: 'wizard',
      page: 33,
      narrative: 'Voces continuam trocando uma ideia meio lero-lero e percebem que nasceram na mesma vila',
      options: [
        { option: 'OK',   nextPage: 34 },
      ]
    },

    {
      character: 'wizard',
      page: 34,
      narrative: 'Voces descobrem que tem amigos em comum e marcam uma parada pra semana que vem',
      options: [
        { option: 'OK... faze o que',   nextPage: 35 },
      ]
    },

    {
      character: 'wizard',
      page: 35,
      narrative: 'Voce ta bom de soft skill!!\nTHE END',
      options: [
        { option: 'Play again',   nextPage: 1},
      ]
    },

    {
      character: 'wizard',
      page: 28,
      narrative: 'Wizard: Ctza? Me falaram que você é um mala.',
      options: [
        { option: 'Agora eu to zen...',   nextPage: 29 },
        { option: 'Aim to chocada....',   nextPage: 29 },
      ]
    },

    {
      character: 'wizard',
      page: 29,
      narrative: 'Wizard: Tu vai volta no tempo estilo Dark, seja legal com o feioso.',
      options: [
        { option: 'Firme',   nextPage: 1 },
      ]
    },

    {
      character: 'orc',
      page: 9,
      narrative: 'Você sai da caverna com uma nova perspectiva. Sua confiança radiante causa um impacto positivo palpável em sua vida.\nTHE END',
      options: [
        { option: 'Play again',   nextPage: 1 },
      ]
    }
   ]

  return pages.find(function(e) { if(e.page == page) return e });
}