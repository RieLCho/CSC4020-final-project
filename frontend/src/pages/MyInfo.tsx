import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLikedCharacters, getLikedDialogues } from '../api';
import FrameCard from '../components/FrameCard';

const MyInfo = () => {
  const navigate = useNavigate();
  const [likedStudents, setLikedStudents] = useState<any[]>([]);
  const [likedDialogues, setLikedDialogues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    console.log('likedStudents:', likedStudents);
    console.log('likedDialogues:', likedDialogues);
  }, [likedStudents, likedDialogues]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');

    if (!isLoggedIn || !userId) {
      navigate('/'); // 로그인 하지 않았을 경우 메인 페이지로 이동
      return;
    }

    const fetchData = async () => {
      try {
        const [characters, dialogues] = await Promise.all([
          getLikedCharacters(userId),
          getLikedDialogues(userId),
        ]);
        setLikedStudents(characters);
        setLikedDialogues(dialogues.map((item: any) => item.dialogue));
        setIsLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <span>데이터 로딩 중 오류가 발생했습니다.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{`${localStorage.getItem('userId')}님의 좋아요 내역`}</h1>

      <h2 className="text-lg font-semibold mb-2">좋아하는 학생들</h2>
      {likedStudents.length > 0 ? (
        <table className="table table-zebra w-full mb-4">
          <thead>
            <tr>
              <th>학생 이름</th>
              <th>학교 이름</th>
              <th>동아리 이름</th>
              <th>좋아요 수</th>
            </tr>
          </thead>
          <tbody>
            {likedStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.school_name || 'N/A'}</td>
                <td>{student.club_name || 'N/A'}</td>
                <td>{student.favorite_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>좋아하는 캐릭터가 없습니다.</p>
      )}

      <h2 className="text-lg font-semibold mb-2">좋아하는 대화들</h2>
      {likedDialogues.length > 0 ? (
        <FrameCard frames={likedDialogues} />
      ) : (
        <p>좋아하는 장면이 없습니다.</p>
      )}
    </div>
  );
};

export default MyInfo;
