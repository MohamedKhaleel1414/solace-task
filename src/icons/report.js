const Reports = ({index}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.0002 2.00012H6.00018C5.46975 2.00012 4.96104 2.21084 4.58597 2.58591C4.2109 2.96098 4.00018 3.46969 4.00018 4.00012V20.0001C4.00018 20.5306 4.2109 21.0393 4.58597 21.4143C4.96104 21.7894 5.46975 22.0001 6.00018 22.0001H18.0002C18.5306 22.0001 19.0393 21.7894 19.4144 21.4143C19.7895 21.0393 20.0002 20.5306 20.0002 20.0001V8.00012L14.0002 2.00012Z"
        stroke={index === 2 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.0002 17.0001H8.00018"
        stroke={index === 2 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.0002 13.0001H8.00018"
        stroke={index === 2 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.0002 9.00012H9.00018H8.00018"
        stroke={index === 2 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.0002 2.00012V8.00012H20.0002"
        stroke={index === 2 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Reports;