import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { PostBlueArchiveSearch } from '../api';
import FrameCard from '../components/FrameCard';
import SearchBar from '../components/Searchbar';
import { SearchRes } from '../types';
import DetailModal from './Detail';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  const initialPage = parseInt(queryParams.get('page') || '1', 10);

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);

  const { data, isLoading, isError } = useQuery<SearchRes>(
    ['frames', query, page],
    () => PostBlueArchiveSearch(query, page),
    {
      enabled: !!query,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (page) params.set('page', page.toString());
    navigate({ search: params.toString() });
  }, [query, page, navigate]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1); // reset to first page on new search
  };

  return (
    <div className="flex flex-col justify-center gap-y-4 p-4">
      <SearchBar onSearch={handleSearch} initialQuery={initialQuery} />
      <DetailModal />
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
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <FrameCard frames={data?.data || []} />
          </div>
          <Pagination
            currentPage={page}
            totalPages={data?.total_page || 1}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
