/**
 * mockComplaints.js
 * Static mock data for complaints used throughout the app.
 * Each complaint has a unique ID, title, category, description,
 * location, date, status, and the name of the person who submitted it.
 */

const mockComplaints = [
  {
    id: "CMP-2024-001",
    title: "Broken streetlight near Main Road",
    category: "Street Lighting",
    description:
      "The streetlight on the corner of Main Road and 5th Avenue has been broken for two weeks. The area is very dark at night, causing safety concerns for pedestrians.",
    location: "Main Road, Sector 5",
    date: "2024-03-10",
    status: "Pending",
    submittedBy: "Rahul Sharma",
  },
  {
    id: "CMP-2024-002",
    title: "Garbage not collected for 3 days",
    category: "Sanitation",
    description:
      "Garbage bins at Park Avenue have not been emptied for the last three days. The overflowing waste is attracting stray animals and creating a health hazard.",
    location: "Park Avenue, Block B",
    date: "2024-03-09",
    status: "In Progress",
    submittedBy: "Priya Patel",
  },
  {
    id: "CMP-2024-003",
    title: "Large pothole on Highway 12",
    category: "Road Maintenance",
    description:
      "A large pothole has formed on Highway 12 near the intersection with Civil Lines. Multiple vehicles have been damaged. Immediate repair needed.",
    location: "Highway 12, Civil Lines",
    date: "2024-03-08",
    status: "Resolved",
    submittedBy: "Amit Kumar",
  },
  {
    id: "CMP-2024-004",
    title: "Water supply disruption in Sector 9",
    category: "Water Supply",
    description:
      "Residents of Sector 9 have been experiencing irregular water supply for the past week. Water pressure is very low during morning hours.",
    location: "Sector 9, Block C",
    date: "2024-03-07",
    status: "In Progress",
    submittedBy: "Sneha Gupta",
  },
  {
    id: "CMP-2024-005",
    title: "Traffic signal malfunction at City Square",
    category: "Traffic",
    description:
      "The traffic signal at City Square junction has been blinking red continuously since yesterday. This is causing major traffic congestion during peak hours.",
    location: "City Square Junction",
    date: "2024-03-06",
    status: "Pending",
    submittedBy: "Rahul Sharma",
  },
  {
    id: "CMP-2024-006",
    title: "Broken park bench and damaged fence",
    category: "Public Safety",
    description:
      "The park bench near the children's play area in Central Park is broken with exposed nails. The surrounding fence is also damaged, posing risks for children.",
    location: "Central Park, Sector 3",
    date: "2024-03-05",
    status: "Pending",
    submittedBy: "Meena Reddy",
  },
  {
    id: "CMP-2024-007",
    title: "Overflowing drain near School Road",
    category: "Sanitation",
    description:
      "The drain near Government School on School Road has been overflowing for several days. Foul smell and mosquito breeding are major concerns for the residents.",
    location: "School Road, Sector 7",
    date: "2024-03-04",
    status: "Resolved",
    submittedBy: "Vikram Singh",
  },
  {
    id: "CMP-2024-008",
    title: "Street lights flickering on MG Road",
    category: "Street Lighting",
    description:
      "Multiple streetlights on MG Road between 2nd and 5th cross are flickering intermittently. This creates visibility issues for drivers at night.",
    location: "MG Road, 2nd to 5th Cross",
    date: "2024-03-03",
    status: "In Progress",
    submittedBy: "Anita Desai",
  },
];

export default mockComplaints;
