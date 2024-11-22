const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Our Service</h1>
            <p className="py-6">
              Discover amazing content and explore our features to enhance your
              experience
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Search</h2>
              <p>
                Find exactly what you're looking for with our advanced search
                features.
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.href = '/search')}
                >
                  Go to Search
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Browse Categories</h2>
              <p>Explore our curated collections and categories.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Explore</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Latest Updates</h2>
              <p>Stay up to date with our newest features and content.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Updates</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
