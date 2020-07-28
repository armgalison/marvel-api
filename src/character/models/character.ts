import { Url } from './url';
import { Image } from './image';
import { ComicList } from './comic-list';
import { EventList } from './event-list';
import { SeriesList } from './series-list';
import { StoryList } from './story-list';

export class Character {
  comics?: ComicList;
  description?: string;
  events?: EventList;
  id?: number;
  modified?: Date;
  name?: string;
  resourceURI?: String;
  series?: SeriesList;
  stories?: StoryList;
  thumbnail?: Image;
  urls?: Url[];
}
