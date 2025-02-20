const Dashboard = ({index}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.0002 14.0001H14.0002V21.0001H21.0002V14.0001Z"
        stroke={index === 0 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.0002 14.0001H3.00018V21.0001H10.0002V14.0001Z"
        stroke={index === 0 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.0002 3.00012H14.0002V10.0001H21.0002V3.00012Z"
        stroke={index === 0 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.0002 3.00012H3.00018V10.0001H10.0002V3.00012Z"
        stroke={index === 0 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Dashboard;