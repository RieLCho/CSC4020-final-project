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
      getLikedDialogues(localStorage.getItem('userId') as string).then(
        (data) => {
          if (data.some((dialogue: any) => dialogue.uid === uid)) {
            setIsDialougeLiked(true);
          }
        }
      );
      getLikedCharacters(localStorage.getItem('userId') as string).then(
        (data) => {
          if (
            data.some(
              (character: any) => character.name === frame?.character_name
            )
          ) {
            setIsCharacterLiked(true);
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
        setIsCharacterLiked(true); // 상태 업데���트 추가
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
    <div className="container mx-auto p-4 font-gyeonggi-title text-2xl">
      <div className="flex justify-between items-center">
        <button onClick={handleClose} className="btn">
          <span className="material-icons">arrow_back_ios</span>
          <span>이전 페이지</span>
        </button>
        <div className="flex items-center">
          <span>{frame.text}</span>
          {!isDialougeLiked ? (
            <button
              onClick={handleLikeDialogue}
              className="btn btn-primary ml-2"
            >
              <span className="material-icons">thumb_up_off_alt</span>
            </button>
          ) : (
            <button
              onClick={handleUnlikeDialogue}
              className="btn btn-secondary ml-2"
            >
              <span className="material-icons">thumb_down_off_alt</span>
            </button>
          )}
        </div>
      </div>
      <p className="py-4">
        <img
          src={frame.url}
          alt="frame"
          className="w-full h-fit object-cover rounded-md mb-2"
        />
        <div className="text-gray-500 flex flex-col space-y-2 text-2xl">
          <span>{frame.event_name}</span>
          <div className="flex items-center">
            <span>{frame.character_name}</span>
            {!isCharacterLiked ? (
              <button
                onClick={handleLikeCharacter}
                className="btn btn-primary ml-2"
              >
                <span className="material-icons">thumb_up_off_alt</span>
              </button>
            ) : (
              <button
                onClick={handleUnlikeCharacter}
                className="btn btn-secondary ml-2"
              >
                <span className="material-icons">thumb_down_off_alt</span>
              </button>
            )}
          </div>
        </div>
      </p>
    </div>
  );
};

export default DetailPage;
