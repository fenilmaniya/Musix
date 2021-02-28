import { Model } from '@nozbe/watermelondb'
import { field, json } from '@nozbe/watermelondb/decorators'

export const sanitizer = r => r;

export default class Post extends Model {
  static table = 'defaults'

  @field('type') type
  
  @json('data', sanitizer) data
}