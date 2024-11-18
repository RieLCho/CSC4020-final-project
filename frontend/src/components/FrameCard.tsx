import { useNavigate } from 'react-router-dom';
import { FrameImageData } from '../types';

interface FrameDisplayProps {
  frames: FrameImageData[];
}

const FrameCard = ({ frames }: FrameDisplayProps) => {
  const navigate = useNavigate();

  const handleClick = (uid: string) => {
    navigate(`/detail?uid=${uid}`);
  };

  return (
    <>
      {frames.map((frame) => (
        <div
          key={frame.dialogue_id}
          className="rounded-md p-3 card card-compact bg-neutral-content w-96 shadow-xl"
        >
          <figure className="p-4">
            <img
              src={frame.url}
              alt="frame"
              className="w-full h-48 object-cover rounded-md mb-2"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {frame.character_name === '' ? '독백' : frame.character_name}
            </h2>
            <div className="text-gray-700 line-clamp-3 h-full max-h-9 text-ellipsis w-full">
              {frame.text}
            </div>
            <div className="flex justify-between">
              <div className="card-actions justify-end pt-4">
                <button className="btn btn-primary">
                  <span className="material-icons">content_copy</span>
                </button>
              </div>
              <div className="card-actions justify-end pt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => handleClick(frame.dialogue_id)}
                >
                  <span className="material-icons">arrow_forward_ios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FrameCard;
