import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  state: boolean;
};

export default function Modal({ children, state }: Props) {
  return (
    <>
      {state && (
        <div className="w-full overflow-auto h-full fixed top-0 left-0 bg-darkBlue bg-opacity-50 backdrop-blur-lg z-50 ">
          <div
            onClick={(e) => e.stopPropagation()}
            className=" w-full mt-16 relative"
          >
            <>{children}</>
          </div>
        </div>
      )}
    </>
  );
}
