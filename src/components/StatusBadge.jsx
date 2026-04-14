/**
 * StatusBadge.jsx
 * A small colored badge that displays the complaint status.
 * Colors: Pending = orange, In Progress = blue, Resolved = green.
 */

const StatusBadge = ({ status }) => {
  // Convert status text into a CSS-friendly class name
  const getClassName = () => {
    switch (status) {
      case "Pending":
        return "pending";
      case "In Progress":
        return "in-progress";
      case "Resolved":
        return "resolved";
      default:
        return "";
    }
  };

  return <span className={`status-badge ${getClassName()}`}>{status}</span>;
};

export default StatusBadge;
