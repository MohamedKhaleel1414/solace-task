import React, { ReactNode, useState } from "react";
import logo from "./icons/logo.svg";
import "./App.css";
import axios from "axios";
import Dashboard from "./icons/dashboard";
import Research from "./icons/research";
import Reports from "./icons/report";
import Teams from "./icons/teams";
import BoxItem from "./icons/box";
import Settings from "./icons/settings";
import Inbox from "./icons/inbox";
import Notification from "./icons/notification";
import Camera from "./icons/camera";
import Pin from "./icons/pin";
import { Theme, useTheme } from "@mui/material/styles";
import { useForm } from 'react-hook-form';
import {
  Divider,
  Tab,
  Tabs,
  Box,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  FormControl,
} from "@mui/material";
import { countries } from "./icons/countries";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ILocalizedName {
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  familyName: string;
}

interface INationalID {
  idNumber: string;
  expiryDate: string;
}

interface ICountries {
  id: string;
  name: string;
}

interface INationalities {
  countryId: number;
  country: ICountries;
}

interface IMaritalStatus {
  id: string;
  name: string;
}

interface IUser {
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  familyName: string;
  localizedName: ILocalizedName;
  nationalId: INationalID;
  nationalities: INationalities[];
  maritalStatus: IMaritalStatus;
  dependants: number;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const [countryName, setCountryName] = React.useState<string[]>([]);
  const [index, setIndex] = React.useState<number>(0);
  const [value, setValue] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [reload, setReload] = React.useState<boolean>(false);
  const [gotData, setGotData] = React.useState<IUser>({
    firstName: "",
    fatherName: "",
    grandfatherName: "",
    familyName: "",
    localizedName: {
      firstName: "",
      fatherName: "",
      grandfatherName: "",
      familyName: "",
    },
    nationalId: {
      idNumber: "",
      expiryDate: "",
    },
    nationalities: [],
    maritalStatus: {
      id: "",
      name: "",
    },
    dependants: 0,
  });
  const [fieldValues, setFieldValues] = React.useState<IUser>({
    firstName: "",
    fatherName: "",
    grandfatherName: "",
    familyName: "",
    localizedName: {
      firstName: "",
      fatherName: "",
      grandfatherName: "",
      familyName: "",
    },
    nationalId: {
      idNumber: "",
      expiryDate: "",
    },
    nationalities: [],
    maritalStatus: {
      id: "",
      name: "",
    },
    dependants: 0,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setCountryName(typeof value === "string" ? value.split(",") : value);
    console.log(value);
    let nations = []
    for(let i=0; i<value.length; i++){
      if(gotData.nationalities.length > 0){
        nations.push({
          countryId: Number(gotData.nationalities[0].countryId),
          country: {
            id: gotData.nationalities[0].country.id,
            name: value[i],
          },
        })
      } else {
        nations.push({
          countryId: 1,
          country: {
            id: "1",
            name: value[i],
          },
        })
      }
    }
    console.log(nations);
    setFieldValues({
      dependants: fieldValues.dependants,
      familyName: fieldValues.familyName,
      fatherName: fieldValues.fatherName,
      firstName: fieldValues.firstName,
      grandfatherName: fieldValues.grandfatherName,
      localizedName: {
        firstName: fieldValues.localizedName.firstName,
        fatherName: fieldValues.localizedName.fatherName,
        grandfatherName: fieldValues.localizedName.grandfatherName,
        familyName: fieldValues.localizedName.familyName,
      },
      maritalStatus: fieldValues.maritalStatus,
      nationalities: [...nations],
      nationalId: fieldValues.nationalId
    });
  };

  const editUser = async (data: any) => {
    try{
      console.log(data);
      data = fieldValues
      const result = await axios.patch("http://localhost:4000/info/edit", data)
      console.log(result);
      if(result.status === 200) {
        console.log("refresh");
        handleClose()
        setReload(!reload)
      }
    }catch(error){
      console.log(error);
      alert("Something went wrong")
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  const nav: ReactNode[] = [
    <Dashboard index={index} />,
    <Research index={index} />,
    <Reports index={index} />,
    <Teams index={index} />,
    <BoxItem index={index} />,
  ];

  React.useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get("http://localhost:4000/info/get");
        console.log(data);
        setGotData(data.user);
        setFieldValues(data.user);
        if(data.user.nationalities.length > 0){
          const counts = data.user.nationalities.map((item: INationalities)=>item.country.name)
          console.log(counts);
          setCountryName([...counts])
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
    getData();
  }, [reload]);

  return (
    <div className="flex gap-4">
      <div className="min-h-screen bg-white flex items-center flex-col gap-6 p-6">
        <img src={logo} alt="logo" className="mb-4" />
        {nav?.map((item: ReactNode, idx: number) => {
          return (
            <div
              className={`rounded-xl p-2 cursor-pointer ${
                idx === index ? "bg-[#003fac]" : ""
              }`}
              onClick={() => setIndex(idx)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="w-full px-4">
        <div className="flex justify-between py-4 px-6 mb-6">
          <div className="flex flex-col justify-center text-[26px] font-semibold">
            <p>John Smith Profile</p>
          </div>
          <div className="flex justify-end items-center gap-6">
            <div className=" cursor-pointer">
              <Notification />
            </div>
            <div className=" cursor-pointer">
              <Inbox />
            </div>
            <div className=" cursor-pointer">
              <Settings />
            </div>
            <div className=" rounded-full overflow-hidden">
              <img
                alt="prof"
                src="Subtract.png"
                style={{ height: "40px", width: "40px" }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-[40%] rounded-xl bg-white h-fit p-4">
            <div className="relative w-fit mb-2">
              <img alt="profile" src="Subtract.png" />
              <div className=" absolute bottom-0 right-0 cursor-pointer">
                <Camera />
              </div>
            </div>
            <p className="text-[20px]">John Smith</p>
            <p className="text-[16px] text-[#737791] mb-6">
              Senior Product Manager
            </p>
            <Divider />
            <div className="mt-6">
              <Tabs orientation="vertical">
                <Tab
                  sx={{ p: 0 }}
                  // className={`${value === 0 ? "bg-[#F4F8FE]" : ""}`}
                  label={
                    <div
                      className={`rounded-lg w-full h-full text-start px-4 py-4 ${
                        value === 0 ? "text-[#0F6CBD] bg-[#F4F8FE]" : ""
                      }`}
                    >
                      Personal Information
                    </div>
                  }
                  onClick={() => setValue(0)}
                />
                <Tab
                  sx={{ p: 0 }}
                  // className={`${value === 1 ? "bg-[#F4F8FE]" : ""}`}
                  label={
                    <div
                      className={`rounded-lg w-full h-full text-start px-4 py-4 ${
                        value === 1 ? "text-[#0F6CBD] bg-[#F4F8FE]" : ""
                      }`}
                    >
                      Financial Information
                    </div>
                  }
                  onClick={() => setValue(1)}
                />
              </Tabs>
            </div>
          </div>
          <div className="w-full">
            <CustomTabPanel value={value} index={0}>
              <div className="bg-white rounded-xl px-4 py-2 mb-4">
                <div className="py-2 flex justify-between mb-2">
                  <p className="text-[20px]">Basic Information</p>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ px: 4 }}
                    onClick={handleClickOpen}
                  >
                    Edit
                  </Button>
                </div>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      National ID Number
                    </p>
                    <p className="text-[12px]">
                      {gotData?.nationalId?.idNumber
                        ? gotData?.nationalId?.idNumber
                        : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      National ID Expiring Date
                    </p>
                    <p className="text-[12px]">
                      {gotData?.nationalId?.expiryDate
                        ? gotData?.nationalId?.expiryDate
                        : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Title</p>
                    <p className="text-[12px]">Mr.</p>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">First Name</p>
                    <p className="text-[12px]">
                      {gotData?.firstName ? gotData?.firstName : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Father Name</p>
                    <p className="text-[12px]">
                      {gotData?.fatherName ? gotData?.fatherName : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Grand Father Name
                    </p>
                    <p className="text-[12px]">
                      {gotData?.grandfatherName
                        ? gotData?.grandfatherName
                        : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Family Name</p>
                    <p className="text-[12px]">
                      {gotData?.familyName ? gotData?.familyName : "-"}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">الأسم الأول</p>
                    <p className="text-[12px]">
                      {gotData?.localizedName?.firstName
                        ? gotData?.localizedName?.firstName
                        : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">اسم الأب</p>
                    <p className="text-[12px]">
                      {gotData?.localizedName?.fatherName
                        ? gotData?.localizedName?.fatherName
                        : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">اسم الجد</p>
                    <p className="text-[12px]">
                      {gotData?.localizedName?.grandfatherName
                        ? gotData?.localizedName?.grandfatherName
                        : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      اللقب / اسم العائلة
                    </p>
                    <p className="text-[12px]">
                      {gotData?.localizedName?.familyName
                        ? gotData?.localizedName?.familyName
                        : "-"}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Date of birth</p>
                    <p className="text-[12px]">01 / 04 / 1980</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Gender</p>
                    <p className="text-[12px]">Male</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Nationality</p>
                    <p className="text-[12px]">
                      {gotData?.nationalities.length > 0
                        ? gotData?.nationalities[0]?.country?.name
                        : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Additional Nationality
                    </p>
                    <p className="text-[12px]">
                      {gotData?.nationalities.length > 1
                        ? gotData?.nationalities
                            ?.map((item: INationalities) => item.country.name)
                            .join(", ")
                        : "-"}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Passport No.</p>
                    <p className="text-[12px]">A135464</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Passport Issue Date
                    </p>
                    <p className="text-[12px]">01 / 04 / 1980</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Passport Expiry Date
                    </p>
                    <p className="text-[12px]">01 / 04 / 1980</p>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Marital Status</p>
                    <p className="text-[12px]">
                      {gotData?.maritalStatus?.name
                        ? gotData?.maritalStatus?.name
                        : "-"}
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Dependencies</p>
                    <p className="text-[12px]">
                      {gotData?.dependants ? gotData?.dependants : 0}
                    </p>
                  </Grid>
                </Grid>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 mb-4">
                <div className="py-2 flex justify-between mb-2">
                  <p className="text-[20px]">Contact Information</p>
                  <Button variant="contained" size="small" sx={{ px: 4 }}>
                    Edit
                  </Button>
                </div>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Personal Email</p>
                    <p className="text-[12px]">John.smith@gmail.com </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Mobile</p>
                    <p className="text-[12px]">011223344556</p>
                  </Grid>
                </Grid>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 mb-4">
                <div className="py-2 flex justify-between mb-2">
                  <p className="text-[20px]">Emergency Contacts</p>
                  <Button variant="contained" size="small" sx={{ px: 4 }}>
                    Edit
                  </Button>
                </div>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Emergency Contact Person Name
                    </p>
                    <p className="text-[12px]">John John</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Emergency Relation
                    </p>
                    <p className="text-[12px]">Father</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Emergency Phone
                    </p>
                    <p className="text-[12px]">011223344556</p>
                  </Grid>
                </Grid>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 mb-4">
                <div className="py-2 flex justify-between mb-2">
                  <p className="text-[20px]">Address Details</p>
                  <Button variant="contained" size="small" sx={{ px: 4 }}>
                    Edit
                  </Button>
                </div>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Country</p>
                    <p className="text-[12px]">Egypt</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">City</p>
                    <p className="text-[12px]">Cairo</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Postal Code</p>
                    <p className="text-[12px]">11728</p>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Building</p>
                    <p className="text-[12px]">7</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Street</p>
                    <p className="text-[12px]">Street 127 </p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Floor No.</p>
                    <p className="text-[12px]">7</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Apartment</p>
                    <p className="text-[12px]">72</p>
                  </Grid>
                </Grid>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 mb-4">
                <div className="py-2 flex justify-between mb-2">
                  <p className="text-[20px]">Driving License Details</p>
                  <Button variant="contained" size="small" sx={{ px: 4 }}>
                    Edit
                  </Button>
                </div>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Driving License
                    </p>
                    <p className="text-[12px]">Yes</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Driving License Type
                    </p>
                    <p className="text-[12px]">C1E</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Driving License expiry date
                    </p>
                    <p className="text-[12px]">01 / 04 / 2025</p>
                  </Grid>
                </Grid>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 mb-4">
                <div className="py-2 flex justify-between mb-2">
                  <p className="text-[20px]">Military Status</p>
                  <Button variant="contained" size="small" sx={{ px: 4 }}>
                    Edit
                  </Button>
                </div>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Require Travel Permit
                    </p>
                    <p className="text-[12px]">Yes</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">
                      Military Status
                    </p>
                    <p className="text-[12px]">Exempted</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Document</p>
                    <Button
                      variant="contained"
                      component="label"
                      color="inherit"
                      size="small"
                    >
                      <Pin />
                      <input type="file" hidden />
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="bg-white rounded-xl px-4 py-2 mb-4">
                <div className="py-2 flex justify-between mb-2">
                  <p className="text-[20px]">Bank Information</p>
                  <Button variant="contained" size="small" sx={{ px: 4 }}>
                    Edit
                  </Button>
                </div>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">Bank Name</p>
                    <p className="text-[12px]">CIB</p>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <p className="text-[12px] text-[#737791]">IBAN</p>
                    <p className="text-[12px]">12346546413216446</p>
                  </Grid>
                </Grid>
              </div>
            </CustomTabPanel>
          </div>
        </div>
      </div>
      <Dialog fullWidth maxWidth={"lg"} open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: 26, fontWeight: "600" }}>
          Edit User Info
        </DialogTitle>
        <form onSubmit={handleSubmit(editUser)}>
          <DialogContent>
            <Grid container spacing={1} sx={{ mb: 2, py: 2 }}>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('idNumber', { required: true })}
                  fullWidth
                  id="idNumber"
                  name="idNumber"
                  label="National ID Number"
                  value={fieldValues?.nationalId?.idNumber}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: fieldValues.firstName,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: fieldValues.localizedName,
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: {
                        idNumber: e.target.value,
                        expiryDate: fieldValues.nationalId.expiryDate,
                      }
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('expiryDate', { required: true })}
                  fullWidth
                  id="expiryDate"
                  name="expiryDate"
                  label="National ID Expiring Date"
                  value={fieldValues?.nationalId?.expiryDate}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: fieldValues.firstName,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: fieldValues.localizedName,
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: {
                        expiryDate: e.target.value,
                        idNumber: fieldValues.nationalId.idNumber,
                      }
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2, py: 2 }}>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('firstName', { required: true })}
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={fieldValues?.firstName}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: e.target.value,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: fieldValues.localizedName,
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('fatherName', { required: true })}
                  fullWidth
                  id="fatherName"
                  name="fatherName"
                  label="Father Name"
                  value={fieldValues?.fatherName}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      firstName: fieldValues.firstName,
                      fatherName: e.target.value,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: fieldValues.localizedName,
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('grandfatherName', { required: true })}
                  fullWidth
                  id="grandfatherName"
                  name="grandfatherName"
                  label="Grand Father Name"
                  value={fieldValues?.grandfatherName}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      firstName: fieldValues.firstName,
                      fatherName: fieldValues.fatherName,
                      grandfatherName: e.target.value,
                      localizedName: fieldValues.localizedName,
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('familyName', { required: true })}
                  fullWidth
                  id="familyName"
                  name="fatherName"
                  label="Family Name"
                  value={fieldValues?.familyName}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      grandfatherName: fieldValues.grandfatherName,
                      firstName: fieldValues.firstName,
                      fatherName: fieldValues.fatherName,
                      familyName: e.target.value,
                      localizedName: fieldValues.localizedName,
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2, py: 2 }}>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('firstNameL', { required: true })}
                  fullWidth
                  id="firstNameL"
                  name="firstNameL"
                  label="الأسم الأول"
                  value={fieldValues?.localizedName.firstName}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: fieldValues.firstName,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: {
                        firstName: e.target.value,
                        fatherName: fieldValues.localizedName.fatherName,
                        grandfatherName: fieldValues.localizedName.grandfatherName,
                        familyName: fieldValues.localizedName.familyName,
                      },
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('fatherNameL', { required: true })}
                  fullWidth
                  id="fatherNameL"
                  name="fatherNameL"
                  label="اسم الأب"
                  value={fieldValues?.localizedName.fatherName}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: fieldValues.firstName,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: {
                        fatherName: e.target.value,
                        firstName: fieldValues.localizedName.fatherName,
                        grandfatherName: fieldValues.localizedName.grandfatherName,
                        familyName: fieldValues.localizedName.familyName,
                      },
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('grandfatherNameL', { required: true })}
                  fullWidth
                  id="grandfatherNameL"
                  name="grandfatherNameL"
                  label="اسم الجد"
                  value={fieldValues?.localizedName.grandfatherName}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: fieldValues.firstName,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: {
                        grandfatherName: e.target.value,
                        firstName: fieldValues.localizedName.fatherName,
                        fatherName: fieldValues.localizedName.grandfatherName,
                        familyName: fieldValues.localizedName.familyName,
                      },
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('familyNameL', { required: true })}
                  fullWidth
                  id="familyNameL"
                  name="fatherNameL"
                  label="اللقب / اسم العائلة"
                  value={fieldValues?.localizedName.familyName}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: fieldValues.firstName,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: {
                        familyName: e.target.value,
                        firstName: fieldValues.localizedName.fatherName,
                        fatherName: fieldValues.localizedName.grandfatherName,
                        grandfatherName: fieldValues.localizedName.familyName,
                      },
                      maritalStatus: fieldValues.maritalStatus,
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              sx={{ mb: 2, py: 2 }}
              className="flex items-center"
            >
              <Grid item xs={12} sm={6} md={6} sx={{ px: 2 }}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-chip-label">
                    Nationalities
                  </InputLabel>
                  <Select
                    {...register('nationalities', { required: true })}
                    id="nationalities"
                    name="nationalities"
                    label="Nationalities"
                    multiple
                    value={countryName}
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Nationalities"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value: any) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {countries.map((name: any) => (
                      <MenuItem
                        key={name.code}
                        value={name.name}
                        style={getStyles(name, countryName, theme)}
                      >
                        {name.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('maritalStatus', { required: true })}
                  fullWidth
                  id="maritalStatus"
                  name="maritalStatus"
                  label="Marital Status"
                  value={fieldValues?.maritalStatus.name}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: fieldValues.dependants,
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: e.target.value,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: fieldValues.localizedName,
                      maritalStatus: {
                        id: fieldValues.maritalStatus.id,
                        name: e.target.value,
                      },
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} sx={{ px: 2 }}>
                <TextField
                  {...register('dependants', { required: true })}
                  fullWidth
                  id="dependants"
                  name="dependants"
                  label="Dependencies"
                  type="number"
                  value={fieldValues?.dependants}
                  onChange={(e) => {
                    setFieldValues({
                      dependants: Number(e.target.value),
                      familyName: fieldValues.familyName,
                      fatherName: fieldValues.fatherName,
                      firstName: e.target.value,
                      grandfatherName: fieldValues.grandfatherName,
                      localizedName: fieldValues.localizedName,
                      maritalStatus: {
                        id: fieldValues.maritalStatus.id,
                        name: fieldValues.maritalStatus.name,
                      },
                      nationalities: fieldValues.nationalities,
                      nationalId: fieldValues.nationalId
                    });
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 2, pb: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default App;
