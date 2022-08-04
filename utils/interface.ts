export interface SchemeInterface_Array {
    array: {
      identifier: string;
      bookmarked: boolean;
      _id: number;
      title: string;
      url: string;
      category: string;
    }[];
}

export interface SidePropsInterface {
    side: boolean;
    setSide: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
}