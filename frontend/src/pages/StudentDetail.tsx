import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import FrameCard from '../components/FrameCard';
import Pagination from '../components/Pagination';
import { getStudentDialogues } from '../api';
import NoResult from '../components/NoResult';

const StudentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [page, setPage] = useState(initialPage);

  const { data, isLoading, isError } = useQuery(
    ['studentDialogues', name, page],
    () => getStudentDialogues(name || '', page),
    {
      enabled: !!name,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (page) params.set('page', page.toString());
    navigate(`/students/detail?${params.toString()}`);
  }, [name, page, navigate]);

  useEffect(() => {
    console.log(name);
    console.log(data);
  });

  const isDataLengthZero = data?.frames.length === 0;

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 p-4 font-gyeonggi-title text-base sm:text-lg md:text-xl lg:text-2xl">
      {isLoading ? (
        <div className="h-[90vh] flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <div className="alert alert-error shadow-lg">
          <div>
            <span>Error loading frames.</span>
          </div>
        </div>
      ) : isDataLengthZero ? (
        <NoResult />
      ) : (
        <>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4">
            {name}의 어록 모음
          </h1>
          <div className="max-w-[1430px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            <FrameCard frames={data?.frames || []} />
          </div>
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
};

export default StudentDetail;
