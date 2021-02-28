import { Model } from '@nozbe/watermelondb'
import { field, json } from '@nozbe/watermelondb/decorators'

export const sanitizer = r => r;

export default class favorite extends Model {
  static table = 'favorites'

  @field('favorite_id') favorite_id
  
  @json('data', sanitizer) data
}