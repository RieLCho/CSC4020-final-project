import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FrameCard from '../components/FrameCard';
import { getStudentDialogues } from '../api';
import { FrameImageData } from '../types';

const StudentDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const [frames, setFrames] = useState<FrameImageData[]>([]);

  useEffect(() => {
    if (name) {
      getStudentDialogues(name).then((data) => setFrames(data));
    }
  }, [name]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{name}의 어록 모음</h1>
      <FrameCard frames={frames} />
    </div>
  );
};

export default StudentDetail;
