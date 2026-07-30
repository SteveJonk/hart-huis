import {benefitsType} from './blocks/benefitsType'
import {crossLinksType} from './blocks/crossLinksType'
import {ctaBandType} from './blocks/ctaBandType'
import {factBarType} from './blocks/factBarType'
import {faqsType} from './blocks/faqsType'
import {heroType} from './blocks/heroType'
import {introType} from './blocks/introType'
import {listingsType} from './blocks/listingsType'
import {pageHeroType} from './blocks/pageHeroType'
import {quoteBandType} from './blocks/quoteBandType'
import {regionBlockType} from './blocks/regionBlockType'
import {reviewsType} from './blocks/reviewsType'
import {servicesType} from './blocks/servicesType'
import {stepsType} from './blocks/stepsType'
import {storyType} from './blocks/storyType'
import {faqType} from './faqType'
import {footerType} from './footerType'
import {navigationType} from './navigationType'
import {ctaType} from './objects/ctaType'
import {linkType} from './objects/linkType'
import {pageBuilderType} from './pageBuilderType'
import {pageType} from './pageType'
import {reviewType} from './reviewType'

export const schemaTypes = [
  // Documents
  pageType,
  faqType,
  reviewType,
  navigationType,
  footerType,
  // Shared objects
  linkType,
  ctaType,
  pageBuilderType,
  // Blocks
  heroType,
  introType,
  servicesType,
  storyType,
  reviewsType,
  listingsType,
  ctaBandType,
  pageHeroType,
  factBarType,
  benefitsType,
  stepsType,
  quoteBandType,
  faqsType,
  regionBlockType,
  crossLinksType,
]
