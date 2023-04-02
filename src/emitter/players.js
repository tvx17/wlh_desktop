import {methods as m_log} from 'src/app/logging';

const file = 'emitter\\players.js';

const emitters = {

  // playersGetActivePlayers:  () => {
  //   methods.message('Emitter: players.get.active', 'info', `${constants._e}playersGetActive`);
  //   methods.emit('players.get.active_players', {});
  // },
  // playersCreatePlayer:      (playerName, playerStatus) => {
  //   methods.message('Emitter: players.create.player', 'info', `${constants._e}emitterName`);
  //   methods.emit('players.create.player', {
  //     name:          playerName,
  //     player_status: playerStatus
  //   });
  // },
  // playersSetExistingPlayer: () => {
  //   methods.message('Emitter: players.set.existing_player', 'info', `${constants._e}emitterName`, {
  //     name:   variables.value.player.name,
  //     status: variables.value.player.status
  //   });
  //   methods.emit('players.set.existing_player', {
  //     name:   variables.value.player.name,
  //     status: variables.value.player.status
  //   });
  // },
  setVote: (cardIndex, playerId = null) => {
    if(!isNaN(cardIndex)){
      m_log.message(`Emitter: players -> setVote`, 'info', file, 'setVote', {
        cardIndex: cardIndex,
        playerId:  playerId
      });
      if(variables.value.player.selectedCardIndex !== -1){
        variables.value.game.cardDeck[variables.value.player.selectedCardIndex].selected = false;
      }
      variables.value.player.selectedCardIndex          = cardIndex;
      variables.value.game.cardDeck[cardIndex].selected = true;
      let overwriteData                                 = {};
      if(playerId !== null){
        overwriteData['pid'] = playerId;
      }

      methods.emit('players.set.vote', {
        vote:      variables.value.game.cardDeck[cardIndex].number,
        player_id: (playerId == null ? variables.value.player.id : playerId)
      }, overwriteData);
    }
  }
};

export {emitters};
