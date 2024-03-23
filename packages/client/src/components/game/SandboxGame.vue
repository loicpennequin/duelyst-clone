<script setup lang="ts">
import { GameSession, type SerializedGameState } from '@game/sdk';

const WIDTH = 9;
const HEIGHT = 5;
const state: SerializedGameState = {
  activeEntityId: null,
  history: [],
  phase: 'battle',

  map: {
    height: HEIGHT,
    width: WIDTH,
    cells: Array.from({ length: HEIGHT }, (_, y) =>
      Array.from({ length: WIDTH }, (_, x) => ({
        position: {
          x,
          y,
          z: 0
        },
        spriteId: 'ground'
      }))
    ).flat(),
    player1StartPosition: { x: 0, y: 2, z: 0 },
    player2StartPosition: { x: WIDTH - 1, y: 2, z: 0 }
  },
  entities: [],
  players: [
    {
      id: '1',
      name: 'Player 1',
      cards: [
        { blueprintId: 'sajj' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' }
      ],
      isPlayer1: true,
      graveyard: [],
      hasMulliganed: true
    },
    {
      id: '2',
      name: 'Player 2',
      cards: [
        { blueprintId: 'sajj' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' },
        { blueprintId: 'healing_mystic' }
      ],
      isPlayer1: false,
      graveyard: [],
      hasMulliganed: true
    }
  ]
};

const fx = useFXProvider();
const session = GameSession.createClientSession(state, 'seed', fx.ctx);

const dispatch = (
  type: Parameters<(typeof session)['dispatch']>[0]['type'],
  payload: any
) => {
  session.dispatch({
    type,
    payload: {
      ...payload,
      playerId: payload?.playerId ?? session.playerSystem.activePlayer.id
    }
  });
};
</script>

<template>
  <Game
    :game-session="session"
    :player-id="null"
    :game-type="GAME_TYPES.SANDBOX"
    @move="dispatch('move', $event)"
    @attack="dispatch('attack', $event)"
    @end-turn="dispatch('endTurn', $event)"
    @use-skill="dispatch('useSkill', $event)"
    @play-card="dispatch('playCard', $event)"
    @replace="dispatch('replace', $event)"
    @mulligan="dispatch('mulligan', $event)"
  />
</template>