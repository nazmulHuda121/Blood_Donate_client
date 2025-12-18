const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
      <div className="text-red-600 text-3xl">{icon}</div>
      <div>
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
