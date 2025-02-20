const BoxItem = ({index}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5002 9.40013L7.50018 4.21013"
        stroke={index === 4 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.0002 16.0001V8.00012C20.9998 7.64939 20.9072 7.30493 20.7317 7.00128C20.5562 6.69763 20.3039 6.44548 20.0002 6.27012L13.0002 2.27012C12.6961 2.09458 12.3513 2.00217 12.0002 2.00217C11.6491 2.00217 11.3042 2.09458 11.0002 2.27012L4.00018 6.27012C3.69645 6.44548 3.44416 6.69763 3.26864 7.00128C3.09313 7.30493 3.00054 7.64939 3.00018 8.00012V16.0001C3.00054 16.3508 3.09313 16.6953 3.26864 16.999C3.44416 17.3026 3.69645 17.5548 4.00018 17.7301L11.0002 21.7301C11.3042 21.9057 11.6491 21.9981 12.0002 21.9981C12.3513 21.9981 12.6961 21.9057 13.0002 21.7301L20.0002 17.7301C20.3039 17.5548 20.5562 17.3026 20.7317 16.999C20.9072 16.6953 20.9998 16.3508 21.0002 16.0001Z"
        stroke={index === 4 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.2702 6.96013L12.0002 12.0101L20.7302 6.96013"
        stroke={index === 4 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0002 22.0801V12.0001"
        stroke={index === 4 ? "white" : "#737791"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BoxItem;