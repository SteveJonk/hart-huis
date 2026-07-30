import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      S.divider(),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('review').title('Reviews'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !['page', 'faq', 'review'].includes(item.getId()!),
      ),
    ])
