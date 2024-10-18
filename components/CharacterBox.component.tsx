import Image from "next/image";

import { ICharactorResult } from "@/interface";

interface ICharacterBoxProps {
  item: ICharactorResult;
  loaded?: boolean;
}

const CharacterBox: React.FC<ICharacterBoxProps> = ({
  item,
  loaded = false,
}) => {
  return (
    <div
      key={item.id}
      className={`max-w-[150px] h-[150px] flex flex-col justify-center items-center ${!loaded && "loading"}`}
    >
      {loaded ? (
        <>
          <Image
            alt={item?.name as string}
            className="rounded-full"
            height={100}
            src={item.image as string}
            width={100}
          />
          <h1 className="text-center mt-2">{item.name}</h1>
        </>
      ) : (
        <div className="animate-pulse bg-gray-300 rounded-full w-24 h-24"></div>
      )}
    </div>
  );
};

export default CharacterBox;
