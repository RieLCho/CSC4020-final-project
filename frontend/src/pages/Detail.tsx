import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBlueArchiveUid } from '../api'; // getBlueArchiveUid 함수 임포트
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

  return (
    <div className="container mx-auto p-4">
      <h3 className="font-bold text-lg">Detail for UID: {uid}</h3>
      <p className="py-4">
        <img
          src={frame.url}
          alt="frame"
          className="w-full h-fit object-cover rounded-md mb-2"
        />
        <p className="text-sm text-gray-500">{frame.event_name}</p>
        <p className="text-sm text-gray-500">
          {`${frame.character_name}: ${frame.text}`}
        </p>
      </p>
      <button onClick={handleClose} className="btn">
        홈으로
      </button>
    </div>
  );
};

export default DetailPage;
