import { SVGProps } from "react";

const Icon = ({ id, ...props }: { id: string } & SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props}>
      <use href={`/assets/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
