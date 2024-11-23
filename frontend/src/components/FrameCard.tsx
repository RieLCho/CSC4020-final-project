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
          className="rounded-xl p-3 card card-compact bg-neutral-content w-full max-w-md shadow-xl mx-auto my-4 "
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
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    await fetch(frame.url)
                      .then((response) => response.blob())
                      .then((blob) => {
                        const img = document.createElement('img');
                        img.src = URL.createObjectURL(blob);
                        return new Promise((resolve) => {
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            ctx?.drawImage(img, 0, 0);
                            canvas.toBlob((pngBlob) => {
                              if (pngBlob) {
                                navigator.clipboard
                                  .write([
                                    new ClipboardItem({
                                      'image/png': pngBlob,
                                    }),
                                  ])
                                  .then(() => {
                                    alert('Image copied to clipboard!');
                                    resolve(null);
                                  });
                              }
                            }, 'image/png');
                          };
                        });
                      })
                      .catch((err) => {
                        console.error('Failed to copy image:', err);
                      });
                  }}
                >
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
