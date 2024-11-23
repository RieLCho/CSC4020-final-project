import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getStudentsList } from '../api';

const Students = () => {
  const navigate = useNavigate();

  const {
    data: students,
    isLoading,
    isError,
  } = useQuery('students', getStudentsList);

  const handleRowClick = (name: string) => {
    navigate(`/students/detail?name=${encodeURIComponent(name)}`);
  };

  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <span>Error loading students.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center font-gyeonggi-title text-base sm:text-lg md:text-xl lg:text-2xl">
      <div className="sm:w-[50%] md:w-[50%] lg:w-[50%]">
        <table className="table table-zebra mx-auto w-full">
          <thead>
            <tr>
              <th>학생 이름</th>
              <th>학교 이름</th>
              <th>동아리 이름</th>
              <th>좋아요 수</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: any, index: number) => (
              <tr
                key={index}
                onClick={() => handleRowClick(student.name)}
                className="hover:text-[#b23213]"
              >
                <td>{student.name}</td>
                <td>{student.school_name || 'N/A'}</td>
                <td>{student.club_name || 'N/A'}</td>
                <td>{student.favorite_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
