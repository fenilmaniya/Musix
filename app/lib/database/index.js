import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import MySchema from './schemas';
import {
  Default,
  Album,
  Favorite,
  History
} from './modals';

const adapter = new SQLiteAdapter({
  schema: MySchema,
  dbName: 'mplayerdb',
})

const database = new Database({
  adapter,
  modelClasses: [
    Default,
    Album,
    Favorite,
    History
  ],
  actionsEnabled: true,
})

export default database;