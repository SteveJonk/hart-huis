import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {MenuIcon} from '@sanity/icons/Menu'
import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['navigation', 'footer']

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
      S.divider(),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('review').title('Reviews'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['page', 'faq', 'review', ...SINGLETONS].includes(item.getId()!),
      ),
    ])
