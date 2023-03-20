export interface LinkInterface {
  bookmarked: boolean;
  identifier: string;
  time?: string;
  title: string;
  url: string;
  categories: string[];
  category: string;
  _id: number;
}

type Modify<T, R> = Omit<T, keyof R> & R;
export interface addLinkInterface
  extends Modify<
    LinkInterface,
    {
      bookmarked?: boolean;
      title?: string;
      _id?: number;
      category?: string;
    }
  > {}

export interface LinksInterface extends Array<LinkInterface> {}

export interface SidePropsInterface {
  side: boolean;
  setSide: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}
