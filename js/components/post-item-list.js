import { PostItemComponent } from './post-item.js';

export function PostItemListComponent(allPosts) {
  let list = "";

  for (const post of allPosts) {
    list += PostItemComponent(post);
  }

  return list;
}
