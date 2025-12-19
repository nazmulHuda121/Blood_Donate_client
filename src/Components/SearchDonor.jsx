import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';

const SearchDonors = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDonors([]);

    try {
      const res = await axios.get('/users/donors', { params: filters });

      if (res.data.length === 0) {
        setError('No donors found!');
      } else {
        setDonors(res.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch donors. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Search Blood Donors
      </h2>

      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)} // Goes to previous page
          className="btn btn-outline text-gray-300 border-gray-300 hover:bg-red-500"
        >
          ← Back
        </button>
      </div>

      {/* SEARCH FORM */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
      >
        <select
          onChange={(e) =>
            setFilters({ ...filters, bloodGroup: e.target.value })
          }
          className="select select-bordered"
        >
          <option value="">Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <input
          placeholder="District"
          className="input input-bordered"
          onChange={(e) => setFilters({ ...filters, district: e.target.value })}
        />

        <input
          placeholder="Upazila"
          className="input input-bordered"
          onChange={(e) => setFilters({ ...filters, upazila: e.target.value })}
        />

        <button className="btn bg-red-600 text-white">Search</button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-500">Searching...</p>}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {/* RESULT */}
      {!loading && donors.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div key={donor._id} className="card bg-base-100 shadow">
              <figure>
                <img src={donor.avatar} alt="" />
              </figure>
              <div className="card-body">
                <h3 className="font-bold">{donor.name}</h3>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>
                  {donor.district}, {donor.upazila}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
