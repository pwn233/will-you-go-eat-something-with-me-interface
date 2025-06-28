import { SOMETHING } from '@/enums'
import type { ISomethingAssets } from '@/types'

import {
  burgerKing,
  dominos,
  katsuMidori,
  kfc,
  mcdonald,
  momoParadise,
  shinkanzenSushi,
  sushiro,
  teenoi,
} from './images'

export const MAP_SOMETHING_ASSETS: Record<SOMETHING, ISomethingAssets> = {
  [SOMETHING.TEENOI_SUKI]: {
    label: 'Teenoi Suki',
    imageURL: teenoi,
  },
  [SOMETHING.MOMO_PARADISE]: {
    label: 'Momo Paradise',
    imageURL: momoParadise,
  },
  [SOMETHING.SUSHIRO]: {
    label: 'Sushiro',
    imageURL: sushiro,
  },
  [SOMETHING.KATSU_MIDORI]: {
    label: 'Katsu Midori',
    imageURL: katsuMidori,
  },
  [SOMETHING.SHINKANZEN_SUSHI]: {
    label: 'Shinkanzensushi',
    imageURL: shinkanzenSushi,
  },
  [SOMETHING.MCDONALD]: {
    label: 'McDonald',
    imageURL: mcdonald,
  },
  [SOMETHING.KFC]: {
    label: 'KFC',
    imageURL: kfc,
  },
  [SOMETHING.DOMINOS]: {
    label: 'Dominos',
    imageURL: dominos,
  },
  [SOMETHING.BURGER_KING]: {
    label: 'Burger King',
    imageURL: burgerKing,
  },
}
