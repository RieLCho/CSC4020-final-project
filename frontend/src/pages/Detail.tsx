import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBlueArchiveUid, likeCharacter, likeDialogue } from '../api'; // likeCharacter, likeDialogue 함수 추가
import { FrameImageData } from '../types';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get('uid');

  const [frame, setFrame] = useState<FrameImageData>();

  useEffect(() => {
    if (uid) {
      getBlueArchiveUid(uid).then((data) => setFrame(data));
    }
  }, [uid]);

  if (!uid || !frame) return null;

  const handleClose = () => {
    navigate(-1); // 이전 URL로 돌아가기
  };

  const handleLikeCharacter = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');
    if (isLoggedIn && userId && frame?.character_name) {
      try {
        await likeCharacter(frame.character_name, userId);
        // 좋아요 성공 시 처리
      } catch (error) {
        console.error('좋아요 실패:', error);
      }
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  const handleLikeDialogue = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');
    if (isLoggedIn && userId && uid) {
      try {
        await likeDialogue(uid, userId);
        // 좋아요 성공 시 처리
      } catch (error) {
        console.error('좋아요 실패:', error);
      }
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={handleClose} className="btn">
        <span className="material-icons">home</span>
      </button>
      <h3 className="font-bold text-lg">Detail for UID: {uid}</h3>
      <p className="py-4">
        <img
          src={frame.url}
          alt="frame"
          className="w-full h-fit object-cover rounded-md mb-2"
        />
        <p className="text-sm text-gray-500 flex items-center">
          {frame.event_name}
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          {frame.character_name}
          <button onClick={handleLikeCharacter} className="ml-2 btn-like">
            좋아요
          </button>
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          {frame.text}
          <button onClick={handleLikeDialogue} className="ml-2 btn-like">
            좋아요
          </button>
        </p>
      </p>
    </div>
  );
};

export default DetailPage;
