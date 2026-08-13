import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {CogIcon} from '@sanity/icons/Cog'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {MenuIcon} from '@sanity/icons/Menu'
import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['navigation', 'footer', 'formGeneralSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .icon(MenuIcon)
        .child(S.document().schemaType('navigation').documentId('navigation').title('Navigation')),
      S.listItem()
        .title('Footer')
        .id('footer')
        .icon(BlockElementIcon)
        .child(S.document().schemaType('footer').documentId('footer').title('Footer')),
      S.divider(),
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('woning').title('Objecten'),
      S.divider(),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('review').title('Reviews'),
      S.divider(),
      S.documentTypeListItem('contactForm').title('Forms').icon(EnvelopeIcon),
      S.listItem()
        .title('Form settings')
        .id('formGeneralSettings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('formGeneralSettings')
            .documentId('formGeneralSettings')
            .title('Form settings'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['page', 'woning', 'faq', 'review', 'contactForm', ...SINGLETONS].includes(item.getId()!),
      ),
    ])
