const Home = () => {
  return (
    <div className="min-h-screen font-gyeonggi-title text-base sm:text-lg md:text-xl lg:text-2xl">
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content w-full text-center flex-col">
          <h1 className="text-5xl font-bold">JiniArchive</h1>
          <span className="py-6 whitespace-pre-line">
            {
              '학생들의 어록을 모아놓은 블루 아카이브 대사 검색 사이트입니다.\n데이터베이스 설계 학습을 위한 학술적인 목적으로 만들어졌습니다.'
            }
          </span>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Search</h2>
              <p className="whitespace-pre-line">
                블루 아카이브 대사를 검색하고 해당 대사의 장면을 찾아보세요.
              </p>
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
              <p>캐릭터들의 목록을 확인하고, 캐릭터의 어록을 확인하세요.</p>
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
              <h2 className="card-title">Clubs</h2>
              <p>학교와 동아리 구성원을 확인해보세요.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">
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
