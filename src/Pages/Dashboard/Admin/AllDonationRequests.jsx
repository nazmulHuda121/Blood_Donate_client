import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const AllDonationRequests = () => {
  const axios = useAxios();

  const { data: requests = [] } = useQuery({
    queryKey: ['all-requests'],
    queryFn: async () => {
      const res = await axios.get('/donation-requests');
      return res.data;
    },
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Recipient</th>
          <th>Blood</th>
          <th>Status</th>
          <th>District</th>
        </tr>
      </thead>

      <tbody>
        {requests.map((r) => (
          <tr key={r._id}>
            <td>{r.recipientName}</td>
            <td>{r.bloodGroup}</td>
            <td>{r.status}</td>
            <td>{r.recipientDistrict}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AllDonationRequests;
