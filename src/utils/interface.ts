export interface SavedLink {
  _id: string;
  identifier: string;
  title: string;
  url: string;
  bookmarked: boolean;
  time?: string;
  category?: string;
  categories: string[];
  __v?: number;
}

type Modify<T, R> = Omit<T, keyof R> & R;
export interface addLinkInterface
  extends Modify<
    SavedLink,
    {
      bookmarked?: boolean;
      title?: string;
      _id?: number;
      category?: string;
    }
  > {}

export interface LinksInterface extends Array<SavedLink> {}

export interface SidePropsInterface {
  side: boolean;
  setSide: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}
