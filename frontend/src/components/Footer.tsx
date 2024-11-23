const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded font-gyeonggi-title text-base sm:text-lg md:text-xl lg:text-2xl">
      <div className="grid grid-flow-row gap-4">
        <div className="flex items-center">
          <div>
            <span className="material-icons pr-3 mt-2">school</span>
          </div>
          <p className="font-bold">
            동국대학교 데이터베이스 설계 기말 프로젝트
          </p>
        </div>
        <p className="text-sm opacity-75">
          Copyright © {new Date().getFullYear()} - All rights reserved.
          <br />
          This is a fan project and is not affiliated with or endorsed by Nexon
          or Blue Archive.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
