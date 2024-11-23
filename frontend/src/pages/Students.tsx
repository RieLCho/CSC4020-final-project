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
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니��.</div>;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>학생 이름</th>
          <th>학교 이름</th>
          <th>동아리 이름</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student: any, index: number) => (
          <tr key={index} onClick={() => handleRowClick(student.name)}>
            <td>{student.name}</td>
            <td>{student.school_name || 'N/A'}</td>
            <td>{student.club_name || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Students;
