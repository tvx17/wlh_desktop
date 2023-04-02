import {listeners as l_game} from 'src/js/listeners/games';

const listener_collection = {}

//
// const listeners = {
//   api:   {
//     send: {
//       connected:    c_api.send.connected,
//       disconnected: c_api.send.disconnected
//     }
//   },
//   games: {
//     success: {
//       createdGame: l_game.success.createdGame
//     },
//     done:    {
//       game_to_archive:      listener.gamesDoneGameToArchive,
//       story_points_to_jira: listener.gamesDoneStoryPointsToJira
//     },
//     send:    {
//       active_games:         listener.gamesSendActiveGames,
//       card_deck:            listener.gamesSendCardDeck,
//       game:                 listener.gamesSendGame,
//       game_deleted:         listener.gamesSendGameDeleted,
//       game_reset:           listener.gamesSendGameReset,
//       gid:                  listener.gamesSendGid,
//       jira_issue_from_jira: listener.gamesSendJiraIssueFromJira,
//       votes_reset:          listener.gamesSendVotesReset
//     }
//   },
//
//   players: {
//     send: {
//       active_players: listener.playersSendActivePlayers,
//       player:         listener.playersSendPlayerAdded,
//       player_added:   listener.playersSendPlayerAdded,
//       player_gone:    listener.playersSendPlayerGone,
//       player_new:     listener.playersSendPlayerNew,
//       vote:           listener.playersSendVote
//     }
//   },
//   misc:    {
//     connected:  listener.connect,
//     disconnect: listener.disconnect,
//     error:      listener.error,
//     log:        listener.log,
//     message:    listener.message
//   }
//
// };

const methods = {
  setup: () => {
    for(let result_type in Object.keys(l_game)){
      for(let destination in l_game[result_type]){
        methods.registerListener('games', result_type, destination, l_game[result_type][destination])
      }
    }
  },

  registerListener: (module, result_type, destination, callback) => {
    if(!listener_collection.hasOwnProperty(module)){
      listener_collection[module] = {};
    }
    if(!listener_collection[module].hasOwnProperty(result_type)){
      listener_collection[module][result_type] = {};
    }
    listener_collection[module][result_type][destination] = callback;
  }
};

export {listener_collection, methods};
