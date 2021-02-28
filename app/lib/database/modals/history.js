import { Model } from '@nozbe/watermelondb'
import { field, json } from '@nozbe/watermelondb/decorators'

export const sanitizer = r => r;

export default class history extends Model {
  static table = 'history'

  @field('history_id') history_id
  
  @json('data', sanitizer) data
}