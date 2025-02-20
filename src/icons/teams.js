const Teams = ({index}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_10178)">
        <path
          d="M23.0002 21.0001V19.0001C22.9995 18.1139 22.7045 17.2529 22.1615 16.5524C21.6186 15.852 20.8583 15.3517 20.0002 15.1301"
          stroke={index === 3 ? "white" : "#737791"}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.0002 21.0001V19.0001C17.0002 17.9393 16.5788 16.9218 15.8286 16.1717C15.0785 15.4216 14.061 15.0001 13.0002 15.0001H5.00018C3.93932 15.0001 2.9219 15.4216 2.17176 16.1717C1.42161 16.9218 1.00018 17.9393 1.00018 19.0001V21.0001"
          stroke={index === 3 ? "white" : "#737791"}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.0002 3.13013C16.8606 3.35043 17.6232 3.85083 18.1678 4.55244C18.7124 5.25405 19.008 6.11696 19.008 7.00513C19.008 7.8933 18.7124 8.75621 18.1678 9.45782C17.6232 10.1594 16.8606 10.6598 16.0002 10.8801"
          stroke={index === 3 ? "white" : "#737791"}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.00018 11.0001C11.2093 11.0001 13.0002 9.20926 13.0002 7.00012C13.0002 4.79098 11.2093 3.00012 9.00018 3.00012C6.79104 3.00012 5.00018 4.79098 5.00018 7.00012C5.00018 9.20926 6.79104 11.0001 9.00018 11.0001Z"
          stroke={index === 3 ? "white" : "#737791"}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_10178">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Teams;