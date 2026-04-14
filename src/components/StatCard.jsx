/**
 * StatCard.jsx
 * A summary card used on dashboards to display a metric (e.g., Total Complaints).
 * Accepts an icon emoji, value, label, and accent color for the left border.
 */

const StatCard = ({ icon, value, label, color }) => {
  return (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      {/* Icon area with a colored background */}
      <div
        className="stat-icon"
        style={{ background: `${color}15`, color: color }}
      >
        {icon}
      </div>

      {/* Stat value and label */}
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
