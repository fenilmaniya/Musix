import { Q } from '@nozbe/watermelondb';
import db from '../lib/database';
import _ from 'lodash';

export const getDefaults = async(type) => {
  const dc=db.get('defaults');
  const hc=db.get('history');
  let defaults=await dc
    .query()
    .fetch()
    .then(data => data.map(item => item.data))
    .catch(e => undefined);
  
  let histories=await hc
    .query()
    .fetch()
    .then(data => {
      _.reverse(data);
      return data.map(item => item.data)
    })
    .catch(e => undefined);

  if (!defaults) return defaults;
  if (!histories) histories=[];

  return _.groupBy([...defaults, ..._.take(histories, 20)], (d) => d.type);
}

export const setDefaults = async(data, type) => {
  const dc=db.get('defaults');
  await db.action(async() => {
    data.map(async(item)=> 
      await dc.create(d => {
        d.type=type,
        d.data=item
      })
    )
  })
}

export const getAlbumDetails = async(albumId) => {
  const ac=db.get('albums');
  return await ac
    .query(Q.where('album_id', albumId.toString()))
    .fetch()
    .then(d => d[0].data)
    .catch(e => undefined);
}

export const saveAlbumDetail = async(albumDetail) => {
  const ac=db.get('albums');
  await db.action(async() => {
    await ac.create(a => {
      a.album_id = albumDetail.id.toString(),
      a.data = albumDetail
    })
  })
}

export const checkIsFavorite = async(id) => {
  const fc=db.get('favorites');
  return await fc
    .query(Q.where('favorite_id', id))
    .fetch()
    .then(d => {
      return d.length > 0;
    })
}

export const addSongFavorite =async(song) => {
  const fc=db.get('favorites');
  return await fc
    .query(Q.where('favorite_id', song.id))
    .fetch()
    .then(async(d) => {
      if (d.length>0) {
        await db.action(async() => {
          const favorite=await fc.find(d[0].id)
          await favorite.markAsDeleted();
          await favorite.destroyPermanently();
        });
      } else {
        await db.action(async() => {
          await fc.create(f=> {
            f.favorite_id = song.id,
            f.data = song
          })
        });
      }
      return !d.length > 0;
    })
}

export const addSongHistory = async(song) => {
  const hc=db.get('history');
  await hc.query(Q.where('history_id', song.id))
    .fetch()
    .then(async(d) => {
      await db.action(async() => { 
        if (d.length>0) {
          const history=await hc.find(d[0].id);
          await history.markAsDeleted();
          await history.destroyPermanently();
        }

        await hc.create(h => {
          h.history_id=song.id,
          h.data = song
        })
      })
    })
}