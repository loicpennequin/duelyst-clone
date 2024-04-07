import { config } from '../../../config';
import { isEmpty } from '../../../entity/entity-utils';
import { type CardBlueprint } from '../../card-lookup';
import { CARD_KINDS, FACTIONS, RARITIES } from '../../card-utils';

export const abyssian: CardBlueprint[] = [
  {
    id: 'maehv',
    name: 'Maehv Skinsolder',
    spriteId: 'f4_3rdgeneral',
    kind: CARD_KINDS.GENERAL,
    faction: FACTIONS.ABYSSIAN,
    rarity: RARITIES.BASIC,
    manaCost: 0,
    onPlay() {
      return;
    },
    description: '',
    attack: config.GENERAL_DEFAULT_ATTACK,
    maxHp: config.GENERAL_DEFAULT_HP
  },
  {
    id: 'void_pulse',
    name: 'Void Pulse',
    spriteId: 'icon_f4_voidpulse',
    kind: CARD_KINDS.SPELL,
    faction: FACTIONS.ABYSSIAN,
    rarity: RARITIES.COMMON,
    manaCost: 1,
    description: 'Deal 1 damage to a unit and heal your general for 2.',
    isTargetable(session, point) {
      return !isEmpty(session, point);
    },
    async onPlay(session, card) {
      await Promise.all([
        session.entitySystem.getEntityAt(card.castPoint)?.takeDamage(1, card),
        session.playerSystem.activePlayer.general.heal(2, card)
      ]);
    }
  }
];
