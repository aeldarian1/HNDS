import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings section
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      S.divider(),
      
      // Content sections
      S.listItem()
        .title('Events')
        .schemaType('event')
        .child(S.documentTypeList('event').title('Events')),
      
      S.listItem()
        .title('Gallery')
        .schemaType('galleryItem')
        .child(S.documentTypeList('galleryItem').title('Gallery Items')),
      
      S.listItem()
        .title('Chronicles')
        .schemaType('chronicle')
        .child(S.documentTypeList('chronicle').title('Chronicles')),
      
      S.divider(),
      
      // Organization sections
      S.listItem()
        .title('Team Members')
        .schemaType('teamMember')
        .child(S.documentTypeList('teamMember').title('Team Members')),
      
      S.listItem()
        .title('Partners')
        .schemaType('partner')
        .child(S.documentTypeList('partner').title('Partners')),
      
      S.divider(),
      
      // Pages
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
    ])
