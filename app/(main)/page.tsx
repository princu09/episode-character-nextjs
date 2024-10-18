import { LoadNewCharacters } from "@/utils/optimiseCharacters";
import { ICharactorRes } from "@/interface";
import api from "@/config/_axiosSetup";
import CharacterBox from "@/components/CharacterBox.component";
import CustomPagination from "@/components/Pagination";

interface IHomeProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const page: React.FC<IHomeProps> = async ({ searchParams }) => {
  const fetchFirstCharater = async () => {
    const page = searchParams?.page || 1;

    return await api
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => {
        return res.data;
      });
  };

  const mainData: ICharactorRes = await fetchFirstCharater();

  return (
    <div className="flex flex-wrap gap-x-5">
      {mainData?.results.map((item) => (
        <CharacterBox key={item?.id} item={item} loaded={true} />
      ))}
      <LoadNewCharacters characters={mainData?.results} />

      <div className="flex items-center justify-center w-full mt-5">
        <CustomPagination total={mainData?.info?.pages} />
      </div>
    </div>
  );
};

export default page;
