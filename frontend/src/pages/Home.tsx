const Home = () => {
  return (
    <div className="min-h-screen font-gyeonggi-title text-base sm:text-lg md:text-xl lg:text-2xl">
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content w-full text-center flex-col">
          <h1 className="text-5xl font-bold">JiniArchive</h1>
          <span className="py-6 px-12 whitespace-pre-line">
            {
              'Blue Archive의 Archive, JiniArchive\n\n학생들의 어록을 모아놓은 블루 아카이브 대사 검색 사이트입니다.'
            }
            <p>
              {
                '데이터베이스 설계 학습을 위한 학술적인 목적으로 만들어졌습니다.'
              }
            </p>
          </span>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Search</h2>
              <span className="whitespace-pre-line h-[96px]">
                {
                  '블루 아카이브 대사를 검색하고,\n해당 대사의 장면을 확인해보세요.'
                }
              </span>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.href = '/search')}
                >
                  <span className="material-icons">arrow_forward_ios</span>
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Students</h2>
              <span className="whitespace-pre-line h-[96px]">
                {'캐릭터들의 목록을 확인하고,\n캐릭터의 어록을 확인하세요.'}
              </span>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.href = '/students')}
                >
                  <span className="material-icons ">arrow_forward_ios</span>
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">My Info</h2>
              <span className="whitespace-pre-line h-[96px]">
                {'내 정보를 확인해보세요.'}
              </span>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary "
                  onClick={() => (window.location.href = '/myinfo')}
                >
                  <span className="material-icons ">arrow_forward_ios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
