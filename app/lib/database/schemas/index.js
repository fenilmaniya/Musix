import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'defaults',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'data', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'albums',
      columns: [
        { name: 'album_id', type: 'string' },
        { name: 'data', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'favorites',
      columns: [
        { name: 'favorite_id', type: 'string' },
        { name: 'data', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'history',
      columns: [
        { name: 'history_id', type: 'string' },
        { name: 'data', type: 'string' },
      ]
    }),
  ]
})