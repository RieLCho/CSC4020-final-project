import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getBlueArchiveUid,
  getLikedCharacters,
  getLikedDialogues,
  likeCharacter,
  likeDialogue,
  unlikeCharacter,
  unlikeDialogue,
} from '../api'; // likeCharacter, likeDialogue 함수 추가
import { FrameImageData } from '../types';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get('uid');

  const [frame, setFrame] = useState<FrameImageData>();
  const [isCharacterLiked, setIsCharacterLiked] = useState<boolean>(false);
  const [isDialougeLiked, setIsDialougeLiked] = useState<boolean>(false);

  useEffect(() => {
    console.log('likedCharacters:', isCharacterLiked);
    console.log('likedDialouges:', isDialougeLiked);
  }, [isCharacterLiked, isDialougeLiked]);

  useEffect(() => {
    if (uid) {
      getBlueArchiveUid(uid).then((data) => setFrame(data));
    }
    if (localStorage.getItem('isLoggedIn') && localStorage.getItem('userId')) {
      getLikedCharacters(localStorage.getItem('userId') as string).then(
        (data) => {
          if (
            data.some(
              (character: any) =>
                character.character_name === frame?.character_name
            )
          ) {
            setIsCharacterLiked(true);
          }
        }
      );
      getLikedDialogues(localStorage.getItem('userId') as string).then(
        (data) => {
          if (data.some((dialogue: any) => dialogue.uid === uid)) {
            setIsDialougeLiked(true);
          }
        }
      );
    }
  }, [uid, frame?.character_name]);

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
        setIsCharacterLiked(true); // 상태 업데이트 추가
      } catch (error) {
        console.error('좋아요 실패:', error);
      }
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  const handleUnlikeCharacter = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');
    if (isLoggedIn && userId && frame?.character_name) {
      try {
        await unlikeCharacter(frame.character_name, userId);
        setIsCharacterLiked(false); // 상태 업데이트 추가
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
        setIsDialougeLiked(true); // 상태 업데이트 추가
      } catch (error) {
        console.error('좋아요 실패:', error);
      }
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  const handleUnlikeDialogue = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');
    if (isLoggedIn && userId && uid) {
      try {
        await unlikeDialogue(uid, userId);
        setIsDialougeLiked(false); // 상태 업데이트 추가
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
          {!isCharacterLiked ? (
            <button onClick={handleLikeCharacter} className="ml-2 btn-like">
              좋아요
            </button>
          ) : (
            <button onClick={handleUnlikeCharacter} className="ml-2 btn-like">
              좋아요 취소
            </button>
          )}
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          {frame.text}
          {!isDialougeLiked ? (
            <button onClick={handleLikeDialogue} className="ml-2 btn-like">
              좋아요
            </button>
          ) : (
            <button onClick={handleUnlikeDialogue} className="ml-2 btn-like">
              좋아요 취소
            </button>
          )}
        </p>
      </p>
    </div>
  );
};

export default DetailPage;
