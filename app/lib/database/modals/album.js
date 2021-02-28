import { Model } from '@nozbe/watermelondb'
import { field, json } from '@nozbe/watermelondb/decorators'

export const sanitizer = r => r;

export default class Album extends Model {
  static table = 'albums'

  @field('album_id') album_id
  
  @json('data', sanitizer) data
}