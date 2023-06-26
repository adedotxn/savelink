import { SVGProps } from "react";

export const SearchSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071 2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"
      fill="currentColor"
    />
  </svg>
);
