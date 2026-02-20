import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
import React, { useCallback, useEffect, useState } from 'react';
// import Styles from "../../styles/Editlist.module.css";
import Styles from '../../styles/Editlist.module.css';
import axios from 'axios';
import { useS3Upload } from 'next-s3-upload';

import { useRouter } from 'next/router';

// import { PROXY } from "../../config";
import { PROXY } from '../../config';

// import { RiAnticlockwise2Fill, RiDeleteBin6Line } from "react-icons/ri";
// import { ImageDelete } from "../Helpers/FileHandlers";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
// import { makeStyles } from "@mui/styles";

import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
// import { Spinner } from "react-bootstrap";
// import {
//   unusedImages,
//   updateUnusedImages,
//   updateUsedImages,
// } from "../../Components/Helpers/UnusedImages";
import { useSelector } from 'react-redux';
// import { selectUser } from "../../redux/reducer/appEssentials";

// const useStyles = makeStyles((theme) => ({
//   chip: {
//     margin: 0.5,
//   },
//   form: {
//     width: "100%",
//     marginTop: 1,
//   },
//   submit: {
//     margin: 3,
//   },
//   imageList: {
//     flexWrap: "nowrap",
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: "translateZ(0)",
//   },
//   title: {
//     color: "black",
//   },
//   titleBar: {
//     background:
//       "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
//   },
// }));
const cities = [
  'Mumbai',
  'Pune',
  'Delhi',
  'Jaipur',
  'Goa',
  'Udaipur',
  'Agra',
  'Noida',
  'Gurgaon',
  'Ranchi',
  'Patna',
  'Bangalore',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Vadodara',
  'Ghaziabad',
  'Ludhiana',
  'Nashik',
  'Meerut',
  'Rajkot',
  'Varanasi',
  'Srinagar',
  'Aurangabad',
  'Dhanbad',
  'Amritsar',
  'Allahabad',
  'Gwalior',
  'Jabalpur',
  'Coimbatore',
  'Vijayawada',
  'Jodhpur',
  'Raipur',
  'Kota',
  'Chandigarh',
  'Guwahati',
  'Mysore',
  'Bareilly',
  'Aligarh',
  'Moradabad',
  'Jalandhar',
  'Bhuba',
  'Gorakhpur',
  'Bikaner',
  'Saharanpur',
  'Jamshedpur',
  'Bhilai',
  'Cuttack',
  'Firozabad',
  'Kochi',
  'Dehradun',
  'Durgapur',
  'Ajmer',
  'Siliguri',
  'Gaya',
  'Tirupati',
  'Mathura',
  'Bilaspur',
  'Haridwar',
  'Gandhinagar',
  'Shimla',
  'Gangtok',
  'Nainital',
  'Jaisalmer',
  'Indor',
  'Rishikesh',
  'kaushali',
  'Pushkar',
  'Kerala',
  'Jim Corbet',
  'Mussoorie',
  'Faridabad',
  'Dubai',
  'Thailand',
  'Srilanka',
  'Bali',
  'Canada',
  'Maldives',
  'Vietnam',
  'Cambodia',
  'Philippine',
  'Malaysia',
];
// const cities = [
//   'Mumbai',
//   'Pune',
//   'Delhi',
//   'Jaipur',
//   'Goa',
//   'Udaipur',
//   'Agra',
//   'Noida',
//   'Gurgaon',
//   'Ranchi',
//   'Patna',
//   'Bangalore',
//   'Hyderabad',
//   'Ahmedabad',
//   'Chennai',
//   'Kolkata',
//   'Surat',
//   'Lucknow',
//   'Kanpur',
//   'Nagpur',
//   'Indore',
//   'Thane',
//   'Bhopal',
//   'Visakhapatnam',
//   'Vadodara',
//   'Ghaziabad',
//   'Ludhiana',
//   'Nashik',
//   'Meerut',
//   'Rajkot',
//   'Varanasi',
//   'Srinagar',
//   'Aurangabad',
//   'Dhanbad',
//   'Amritsar',
//   'Allahabad',
//   'Gwalior',
//   'Jabalpur',
//   'Coimbatore',
//   'Vijayawada',
//   'Jodhpur',
//   'Raipur',
//   'Kota',
//   'Chandigarh',
//   'Guwahati',
//   'Mysore',
//   'Bareilly',
//   'Aligarh',
//   'Moradabad',
//   'Jalandhar',
//   'Bhuba',
//   'Gorakhpur',
//   'Bikaner',
//   'Saharanpur',
//   'Jamshedpur',
//   'Bhilai',
//   'Cuttack',
//   'Firozabad',
//   'Kochi',
//   'Dehradun',
//   'Durgapur',
//   'Ajmer',
//   'Siliguri',
//   'Gaya',
//   'Tirupati',
//   'Mathura',
//   'Bilaspur',
//   'Haridwar',
//   'Gandhinagar',
//   'Shimla',
//   'Gangtok',
//   'Nainital',
//   'Jaisalmer',
//   'Indor',
//   'Rishikesh',
//   'kaushali',
//   'Pushkar',
//   'Kerala',
//   'Jim Corbett',
//   'Mussoorie',
//   'Dubai',
//   'Thailand',
//   'Canada',
//   'Srilanka',
//   'South Africa',
//   'Singapore',
//   'Bali',
//   'Italy',
//   'UK',
//   'Autralia',
//   'Bokaro',
//   'Faridabad',
//   'South Delhi',
// ];
const newLocations = [
  {
    location: 'Delhi',
    id: 'Delhi',
  },
  {
    location: 'Pune',
    id: 'Pune',
  },
  {
    location: 'Mumbai',
    id: 'Mumbai',
  },
  {
    location: 'Jaipur',
    id: 'Jaipur',
  },
  {
    location: 'Goa',
    id: 'Goa',
  },
  {
    location: 'Gurgaon',
    id: 'Gurgaon',
  },
  {
    location: 'Bangalore',
    id: 'Bangalore',
  },
  {
    location: 'Hyderabad',
    id: 'Hyderabad',
  },
  {
    location: 'Ahmedabad',
    id: 'Ahmedabad',
  },
  {
    location: 'Kolkata',
    id: 'Kolkata',
  },
  {
    location: 'Bokaro',
    id: 'Bokaro',
  },
  {
    location: 'Faridabad',
    id: 'Faridabad',
  },
  {
    location: 'Knapur',
    id: 'Knapur',
  },
  {
    location: 'Nagpur',
    id: 'Nagpur',
  },
  {
    location: 'Indore',
    id: 'Indore',
  },
  {
    location: 'Thane',
    id: 'Thane',
  },
  {
    location: 'Bhopal',
    id: 'Bhopal',
  },
  {
    location: 'Visakhapatnam',
    id: 'Visakhapatnam',
  },
  {
    location: 'Vadodara',
    id: 'Vadodara',
  },
  {
    location: 'Ghaziabad',
    id: 'Ghaziabad',
  },
  {
    location: 'Ludhaiana',
    id: 'Ludhaiana',
  },
  {
    location: 'Nashik',
    id: 'Nashik',
  },
  {
    location: 'Meerut',
    id: 'Meerut',
  },
  {
    location: 'Rajkot',
    id: 'Rajkot',
  },
  {
    location: 'Nainital',
    id: 'Nainital',
  },
  {
    location: 'Srinagar',
    id: 'Srinagar',
  },
  {
    location: 'Aurangabad',
    id: 'Aurangabad',
  },
  {
    location: 'Gwallor',
    id: 'Gwallor',
  },
  {
    location: 'Jabalpur',
    id: 'Jabalpur',
  },
  {
    location: 'Coimbatore',
    id: 'Coimbatore',
  },
  {
    location: 'Vijayawada',
    id: 'Vijayawada',
  },
  {
    location: 'Durgapur',
    id: 'Durgapur',
  },
  {
    location: 'Ajmer',
    id: 'Ajmer',
  },
  {
    location: 'Kota',
    id: 'Kota',
  },
  {
    location: 'Surat',
    id: 'Surat',
  },
  {
    location: 'Guwahati',
    id: 'Guwahati',
  },
  {
    location: 'Mysore',
    id: 'Mysore',
  },
  {
    location: 'Bareilly',
    id: 'Bareilly',
  },
  {
    location: 'Aligarh',
    id: 'Aligarh',
  },
  {
    location: 'Moradabad',
    id: 'Moradabad',
  },
  {
    location: 'Jalandhar',
    id: 'Jalandhar',
  },
  {
    location: 'Bhuba',
    id: 'Bhuba',
  },
  {
    location: 'Gorakhpur',
    id: 'Gorakhpur',
  },
  {
    location: 'Bikaner',
    id: 'Bikaner',
  },
  {
    location: 'Saharanpur',
    id: 'Saharanpur',
  },
  {
    location: 'Jamshedpur',
    id: 'Jamshedpur',
  },
  {
    location: 'Bhilai',
    id: 'Bhilai',
  },
  {
    location: 'Cuttack',
    id: 'Cuttack',
  },
  {
    location: 'Firozabad',
    id: 'Firozabad',
  },
  {
    location: 'Gaya',
    id: 'Gaya',
  },
  {
    location: 'Tirupati',
    id: 'Tirupati',
  },
  {
    location: 'Mathura',
    id: 'Mathura',
  },
  {
    location: 'Bilaspur',
    id: 'Bilaspur',
  },
  {
    location: 'Haridwar',
    id: 'Haridwar',
  },
  {
    location: 'Gandhinagar',
    id: 'Gandhinagar',
  },
  {
    location: 'Shimla',
    id: 'Shimla',
  },
  {
    location: 'Gangtok',
    id: 'Gangtok',
  },
];
const CategotiesList = [
  // {
  //   name: "Bridal Wear",
  //   subCategories: [],
  // },
  // {
  //   name: "Groom Wear",
  //   subCategories: [],
  // },
  {
    name: 'Food',
    subCategories: [
      'Chaat Counter',
      'Fruit Counter',
      'Catering services',
      'Pan Counter',
      'Cake',
      'Bar Tenders',
    ],
  },
  {
    name: 'Invites & Gifts',
    subCategories: ['Invitation Card', 'Invitation Gift'],
  },
  {
    name: 'Jwellery And Accessories',
    subCategories: ['Bridal Jwellery on Rent'],
  },
  {
    name: 'Music & Dance',
    subCategories: [
      'Anchor',
      'Choreographer',
      'DJ',
      'Ghodi & Baggi',
      'Band Baja',
      'Dhol',
      'Live band',
      'DJ based Band',
      'Male & Female Singer',
      'Dance Troupe',
    ],
  },
  {
    name: 'Pandit Jee',
    subCategories: [],
  },
  {
    name: 'Makeup',
    subCategories: ['Bridal Makeup', 'Groom Makeup', 'Family Makeup'],
  },
  {
    name: 'Mehndi',
    subCategories: ['Bride Mehndi', 'Family Member Mehndi'],
  },
  {
    name: 'Photographers',
    subCategories: [
      'Cinema/Video',
      'Album',
      'Collage Maker',
      'Drone',
      'Pre Wedding Shoot',
    ],
  },
  {
    name: 'Planning & Decor',
    subCategories: [
      'Wedding Decor',
      'Wedding Planners',
      'Celebrities Management',
      'Hospitality Service',
    ],
  },
];

const CategoryDefault = {
  'Planning & Decor': [
    {
      name: 'Wedding Décor',
      value: '',
    },
    {
      name: 'Ring Ceremony Décor',
      value: '',
    },
    {
      name: 'Reception Décor',
      value: '',
    },
    {
      name: 'Mehndi Décor',
      value: '',
    },
    {
      name: 'Haldi Decor',
      value: '',
    },
    {
      name: 'Rokka Ceremony decor',
      value: '',
    },
    {
      name: 'Birthday Décor',
      value: '',
    },
    {
      name: 'Anniversary Décor',
      value: '',
    },
  ],
  Photographers: [
    {
      name: 'Wedding',
      value: '',
    },
    {
      name: 'Ring Ceremony',
      value: '',
    },
    {
      name: 'Reception',
      value: '',
    },
    {
      name: 'Mehndi',
      value: '',
    },
    {
      name: 'Haldi',
      value: '',
    },
    {
      name: 'Rokka Ceremony',
      value: '',
    },
    {
      name: 'Birthday',
      value: '',
    },
    {
      name: 'Anniversary',
      value: '',
    },
    {
      name: 'Pre Wedding Shoots ',
      value: '',
    },
    {
      name: 'Portfolio Shoots ',
      value: '',
    },
    {
      name: 'Model Shoots ',
      value: '',
    },
  ],
  Mehndi: [
    {
      name: 'Bride Mehndi',
      value: '',
    },
    {
      name: 'Family Mehndi',
      value: '',
    },
  ],
  Makeup: [
    {
      name: 'Bride Makeup',
      value: '',
    },
    {
      name: 'Family Makeup',
      value: '',
    },
  ],
  Venue: [
    {
      name: 'Veg Menu',
      value: '',
    },
    {
      name: 'Non Veg Menu',
      value: '',
    },
    {
      name: 'Hi-Tea',
      value: '',
    },
    {
      name: 'Flat Lunch',
      value: '',
    },
    {
      name: 'Breakfast',
      value: '',
    },
    {
      name: 'Restaurent Lunch/Dinner',
      value: '',
    },
  ],
};
const SubCategoryDefault = {
  'Invitation Gift': [
    {
      name: 'Invitation Card ',
      value: '',
    },
    {
      name: 'Special Gift Hamper',
      value: '',
    },
  ],
  'Bridal Jwellery on Rent': [
    {
      name: 'Bridal Jewellery on Rent',
      value: '',
    },
  ],
  'Wedding Planners': [
    {
      name: 'Venue Booking Service',
      value: '',
    },
    {
      name: 'Plan any Single Event ',
      value: '',
    },
    {
      name: 'Plan wedding Event Only ',
      value: '',
    },
    {
      name: 'Plan Destination Wedding ',
      value: '',
    },
    {
      name: 'Plan Birthday Event ',
      value: '',
    },
    {
      name: 'Plan Anniversary Event ',
      value: '',
    },
  ],
  'Celebrities Management': [
    {
      name: 'Local Singer ',
      value: '',
    },
    {
      name: 'Bollywood Singer ',
      value: '',
    },
    {
      name: 'Punjabi Singer ',
      value: '',
    },
    {
      name: 'Bollywood Actor ',
      value: '',
    },
    {
      name: 'Bollywood Actress ',
      value: '',
    },
  ],
  'Hospitality Service': [
    {
      name: 'Indian Hostess',
      value: '',
    },
    {
      name: 'Rusian Hostess',
      value: '',
    },
    {
      name: 'Russion Artist',
      value: '',
    },
    {
      name: 'Ground Staff',
      value: '',
    },
    {
      name: 'Personal Assistant',
      value: '',
    },
  ],
  'Chaat Counter': [
    {
      name: 'Per Chat Counter ',
      value: '',
    },
  ],
  'Pan Counter': [
    {
      name: 'Basic Pan Counter',
      value: '',
    },
    {
      name: 'Special Pan Counter ',
      value: '',
    },
  ],
  'Invitation Card': [
    {
      name: 'Invitation Card',
      value: '',
    },
    {
      name: 'Designer Invitation Card',
      value: '',
    },
  ],
  'Catering services': [
    {
      name: 'Veg Per Plat',
      value: '',
    },
    {
      name: 'Non Veg Per Plat ',
      value: '',
    },
    {
      name: 'Flat Lunch ',
      value: '',
    },
    {
      name: 'Hi-Tea',
      value: '',
    },
    {
      name: 'Breakfast ',
      value: '',
    },
  ],
  'Fruit Counter': [
    {
      name: 'Indian Fruits ',
      value: '',
    },
    {
      name: 'Imported Fruits ',
      value: '',
    },
  ],
  Cake: [
    {
      name: 'Normal Cake ',
      value: '',
    },
    {
      name: 'Celebrity Cake ',
      value: '',
    },
    {
      name: 'Designer Cake ',
      value: '',
    },
    {
      name: 'Hanging Cake ',
      value: '',
    },
  ],
  'Bar Tenders': [
    {
      name: 'Indian Male Bar Tender ',
      value: '',
    },
    {
      name: 'Indian Female Bar Tender ',
      value: '',
    },
    {
      name: 'Russian Male Bar Tender ',
      value: '',
    },
    {
      name: 'Russian  Female Bar Tender ',
      value: '',
    },
  ],
  Anchor: [
    {
      name: 'Wedding Achoring ',
      value: '',
    },
    {
      name: 'Travel',
      value: '',
    },
    {
      name: 'Stay',
      value: '',
    },
    {
      name: 'Food',
      value: '',
    },
  ],
  Choreographer: [
    {
      name: 'Wedding Choregrapher ',
      value: '',
    },
    {
      name: 'Travel',
      value: '',
    },
    {
      name: 'Stay',
      value: '',
    },
    {
      name: 'Food',
      value: '',
    },
  ],
  DJ: [
    {
      name: 'DJ Player',
      value: '',
    },
    {
      name: 'Noraml DJ',
      value: '',
    },
    {
      name: 'DJ With LED Screen & Perfomance Stage',
      value: '',
    },
  ],
  'Ghodi & Baggi': [
    {
      name: 'Ghodi ',
      value: '',
    },
    {
      name: 'Baggi',
      value: '',
    },
  ],
  'Band Baja': [
    {
      name: 'Band with 11 Team ',
      value: '',
    },
    {
      name: 'Band with 21 Team ',
      value: '',
    },
    {
      name: 'Band with 31 Team ',
      value: '',
    },
    {
      name: 'Band with 51 Team ',
      value: '',
    },
  ],
  Dhol: [
    {
      name: 'Local Dhol',
      value: '',
    },
    {
      name: 'Artist Dhol',
      value: '',
    },
  ],
};

const CategotiesListVenue = [
  {
    name: 'Hotel',
    subCategories: [],
  },
  {
    name: 'Resort',
    subCategories: [],
  },
  {
    name: 'Farm House',
    subCategories: [],
  },
  {
    name: 'Banquet Hall',
    subCategories: [],
  },
  {
    name: 'Lawn',
    subCategories: [],
  },
  {
    name: 'Destination Wedding',
    subCategories: [],
  },
];

const EditListedItems = ({ query }) => {
  const errorr = () => {
    toast.error('image cant be uploaded with size bigger then 500kb', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  const [secondNumbers, setSecondNumbers] = useState(['']);
  console.log(
    '🚀 ~ file: index.js:1007 ~ EditListedItems ~ secondNumbers:',
    secondNumbers
  );
  const uploadErrorr = () =>
    toast.error('Somethimg went wrong please try again', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const uploadSucsess = () =>
    toast.success('Uploading done Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const editSucsess = () =>
    toast.success('Edit done Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  let [fileListMain, setFileListMain] = useState([]);
  const [fileListAlbum, setFileListAlbum] = useState([]);
  const [fileListBrochure, setFileListBrochure] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);
  const [fileListMenu, setFileListMenu] = useState([]);
  const [mainImageDefault, setMainImagedefault] = useState([]);
  const [brochureImageDefault, setBrochureImagedefault] = useState([]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const [menuImageDefault, setMenuImagedefault] = useState([]);
  const [galleryImageDefault, setGalleryImagedefault] = useState([]);
  const [additional, setAdditional] = useState({
    booking_amount: '',
    parking: '',
    rental_cost_per_plate: false,
    primary_venue_type: '',
    year_of_start: '',
    special_feature: '',
    veg_starting_price: '',
    nov_veg_starting_price: '',
    venue_type: [],
    rooms_in_accomodation: '',
    basic_starting_price: '',
    policy_on_catering: '',
    policy_on_decor: '',
    policy_on_dj: '',
    policy_on_alcohol: '',
    minimum_decor_price: '',
    policy_on_decor: '',
    policy_cancellation: '',
    minimum_advanced_booking: '',
  });

  const [state, setState] = React.useState({
    Indoor: false,
    Outdoor: false,
    Poolside: false,
    Terrace: false,
  });
  const { Poolside, Indoor, Outdoor, Terrace } = state;
  const [typeFilter, setTypeFilter] = useState([]);

  const handleChange = (event) => {
    let newArr = additional.venue_type;
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    if (event.target.checked) {
      newArr.push(event.target.name);
    } else {
      newArr = newArr.filter((item) => item !== event.target.name);
    }

    setAdditional({
      ...additional,
      venue_type: newArr,
    });
    setTypeFilter(newArr);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChangeMain = ({ fileList: newFileList, file }) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 50000000000000) {
        setFileListMain(newFileList);
      } else {
        errorr();
      }
    } else {
      setFileListMain(newFileList);
      setMainImagedefault(null);
    }
  };
  //   const data = newFileList
  //   .filter((data) => data.url)
  //   .map((data) => data.url);
  const handleChangeBrochure = ({ fileList: newFileList, file }) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 50000000000000) {
        setFileListBrochure(newFileList);
      } else {
        errorr();
      }
    } else {
      setFileListBrochure(newFileList);
      setBrochureImagedefault(null);
    }
  };

  const handleChangeGallery = ({ fileList: newFileList, file }) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 50000000000000) {
        setFileListGallery(newFileList);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setGalleryImagedefault(data);
      setFileListGallery(newFileList);
    }
  };

  const handleChangeMenu = ({ fileList: newFileList, file }) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 50000000000000) {
        setFileListMenu(newFileList);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setMenuImagedefault(data);
      setFileListMenu(newFileList);
    }
  };

  const handleChangeAlbum = ({ fileList: newFileList, file }, key) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 50000000000000) {
        fileListAlbum[key].value = newFileList;
        setFileListAlbum([...fileListAlbum]);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      fileListAlbum[key].value = newFileList;
      setFileListAlbum([...fileListAlbum]);
      albumImageDefault[key].value = data;

      setAlbumdefault([...albumImageDefault]);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const editable = query.name === 'edit' ? true : false;
  const [status, setStatus] = useState(editable ? 'Edit' : 'Submit');
  const id = query.id;
  const type = query.type;
  const [config, setConfig] = useState();
  const [uploading, setUploading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [vidLinks, setVidLinks] = useState(['']);
  const [amenities, setAmenities] = useState([{ name: '', min: '', max: '' }]);
  const [plans, setPlans] = useState([{ name: '', value: '' }]);
  const [features, setFeatures] = useState([{ name: '', value: false }]);
  const [deleting, setDeleting] = useState(false);
  const [allowedVendors, setAllowedVendors] = useState([
    { name: 'Decor', value: false },
    { name: 'DJ', value: false },
    { name: 'Cake', value: false },
    { name: 'Liquor', value: false },
    { name: 'Pan Counter', value: false },
  ]);
  // const globleuser = JSON.parse(localStorage.getItem("wedcell"));

  // const classes = useStyles();
  // const { width } = useWindowDimensions();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const Div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const [form, setForm] = useState(null);
  console.log('🚀 ~ file: index.js:1245 ~ EditListedItems ~ form:', form);
  const setDefaultImages = (url, uid) => {
    return {
      uid,
      status: 'done',
      url,
    };
  };
  const [resdata123, setresdata123] = useState();
  const setDefaultImages1 = (data) => data.map((data) => data.url);
  const getdata = async () => {
    await axios
      .post(`${PROXY}/item/getall`, {
        _id: id,
      })
      .then((res) => {
        if (res.data.success) {
          const resData = res.data.data[0];
          setresdata123(resData);
          console.log('🚀 ~ file: index.js:1263 ~ .then ~ resData:', resData);

          if (resData.brochure) {
            const data = resData.brochure.map((url, uid) => {
              return setDefaultImages(url, uid);
            });
            setFileListBrochure(data);
            setBrochureImagedefault(setDefaultImages1(data));
          }

          if (resData.mainImage) {
            const data = setDefaultImages(resData.mainImage, 1);

            setFileListMain([data]);
            setMainImagedefault(data.url);
          }

          if (resData.images?.length) {
            const data = resData.images.map((url, uid) => {
              return setDefaultImages(url, uid);
            });
            setFileListGallery(data);
            setGalleryImagedefault(setDefaultImages1(data));
          }

          if (resData.menu?.length) {
            const data = resData.menu.map((url, uid) => {
              return setDefaultImages(url, uid);
            });
            setFileListMenu(data);
            setMenuImagedefault(setDefaultImages1(data));
          }

          if (resData.albums?.length) {
            const album = [];
            const album2 = [];
            resData.albums.forEach((data) => {
              const al = {
                name: data.name,
                value: data.value.map((data2, key2) => {
                  return setDefaultImages(data2, key2);
                }),
              };
              album.push(al);
              const al2 = {
                value: data.value.map((data2) => {
                  return data2;
                }),
              };
              album2.push(al2);
            });
            setFileListAlbum(album);
            setAlbumdefault(album2);
          }

          setForm({
            ...resData,
            vendorId: resData.vendorId,
          });
          setSecondNumbers(resData?.secondNumbers);
          setAmenities(resData?.amenities);
          setPlans(resData?.plans);
          setFeatures(resData?.features);
          setVidLinks(resData?.vidLinks);
          setIsLoading(false);
          setAllowedVendors(resData.allowedVendors);
        }
      })
      .catch((e) => {
        alert(e.message);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    const editable = query.name === 'edit' ? true : false;

    if (localStorage.getItem('wedcell') !== null) {
      const config = {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('wedcell'))?.data
            ?.token,
        },
      };

      setConfig(config);
    }
    if (editable) {
      getdata();
    } else {
      setForm({
        name: '',
        category: '',
        type: '',
        city: '',
        address: '',
        images: [],
        albums: [],
        brochure: [],
        menu: [],
        vendorId: resdata123.vendorId,
      });
      setIsLoading(false);
    }
  }, [editable, id, router]);

  const onChangeAlbumHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].name = e.target.value;
    setFileListAlbum(newArr);
  };

  // useEffect(() => {

  // }, [form]);

  const addHandler = async () => {
    // setUploading(true);

    const fileListAlbum1 = fileListAlbum.map((data) => {
      return {
        name: data.name,
        value: data.value.map((data, key) => key),
      };
    });

    const formData = new FormData();
    // additional &&
    //   formData.append("additionalDetails", JSON.stringify(additional));
    form.name && formData.append('name', form.name);
    form.category && formData.append('category', form.category);
    form.subCategory && formData.append('subCategory', form.subCategory);
    form.type && formData.append('type', form.type);
    form.city && formData.append('city', form.city);
    form.address && formData.append('address', form.address);
    form.vendorId && formData.append('vendorId', form.vendorId);
    form.description && formData.append('description', form.description);
    form.contactEmail && formData.append('contactEmail', form.contactEmail);
    form.contactPhone && formData.append('contactPhone', form.contactPhone);
    form.zipcode && formData.append('zipcode', form.zipcode);
    form.price &&
      formData.append(
        'price',
        /^\d+$/.test(form.price) ? parseInt(form.price) : 0
      );
    form.vegPerPlate && formData.append('vegPerPlate', form.vegPerPlate);
    form.nonVegPerPlate &&
      formData.append('nonVegPerPlate', form.nonVegPerPlate);
    form.termsandconditions &&
      formData.append('termsandconditions', form.termsandconditions);
    form.amenities &&
      formData.append('amenities', JSON.stringify(form.amenities));
    form.allowedVendors &&
      formData.append('allowedVendors', JSON.stringify(form.allowedVendors));
    form.secondNumbers &&
      formData.append('secondNumbers', JSON.stringify(form.secondNumbers));
    form.features && formData.append('features', JSON.stringify(form.features));
    form.plans && formData.append('plans', JSON.stringify(form.plans));
    form.vidLinks && formData.append('vidLinks', JSON.stringify(form.vidLinks));
    editable && formData.append('_id', form._id);
    // form.vendorId && formData.append("vendorId", JSON.stringify(form.vendorId));

    fileListAlbum && formData.append('album', JSON.stringify(fileListAlbum1));

    mainImageDefault && formData.append('mainLink', mainImageDefault);
    galleryImageDefault &&
      formData.append('galleryLink', JSON.stringify(galleryImageDefault));
    albumImageDefault &&
      formData.append('albumLink', JSON.stringify(albumImageDefault));

    menuImageDefault &&
      formData.append('menuLink', JSON.stringify(menuImageDefault));
    brochureImageDefault &&
      formData.append('brochureLink', brochureImageDefault);

    fileListAlbum &&
      fileListAlbum.forEach((item, key) => {
        item.value.forEach((data) =>
          formData.append(`album${key}`, data.originFileObj)
        );
      });
    fileListMenu &&
      fileListMenu.forEach((item, key) => {
        formData.append('menu', item.originFileObj);
      });
    fileListBrochure &&
      fileListBrochure.forEach((item, key) => {
        formData.append('brochure', item.originFileObj);
      });
    fileListGallery &&
      fileListGallery.forEach((item, key) => {
        formData.append('gallery', item.originFileObj);
      });
    fileListMain &&
      fileListMain.forEach((item, key) => {
        formData.append('main', item.originFileObj);
      });
    console.log(
      '🚀 ~ file: index.js:1456 ~ fileListMain.forEach ~ formData:',
      formData
    );

    // submitItem.brochure = brochure;
    // submitItem.images = galleryImages;
    // submitItem.albums = albums;
    // menu && type === "Venue" ? (submitItem.menu = menu) : null;
    // amenities && type === "Venue" ? (submitItem.amenities = amenities) : null;
    // features && type === "Venue" ? (submitItem.features = features) : null;
    // submitItem.mainImage = mainImage;
    // if (!submitItem.name?.length) {
    //   return alert("Please fill name");
    // }
    // if (!submitItem.type?.length) {
    //   return alert("Please fill type");
    // }
    // if (!submitItem.category?.length) {
    //   return alert("Please fill category");
    // }
    // if (!submitItem.address?.length) {
    //   return alert("Please fill address");
    // }
    // if (!submitItem.city?.length) {
    //   return alert("Please fill city");
    // }
    // if (
    //   !fileListMain.length ||
    //   !form.type ||
    //   !form.city ||
    //   !form.category ||
    //   !form.name ||
    //   !form.description ||
    //   !form.contactEmail ||
    //   !form.contactPhone ||
    //   !form.address ||
    //   !form.zipcode ||
    //   !form.price ||
    //   !form.plans.length ||
    //   !form.termsandconditions ||
    //   !fileListGallery.length ||
    //   !fileListBrochure.length ||
    //   !fileListAlbum.length ||
    //   !form.vidLinks.length
    // ) {
    //   return alert("Fill All Fields In The Form");
    // }
    // if (form.type === "Vendor" && !form.subCategory) {
    //   return alert("Fill All Fields In The Form");
    // }
    // if (
    //   form.type === "Venue" &&
    //   (!form.amenities.length ||
    //     !form.allowedVendors.length ||
    //     !form.features.length ||
    //     !fileListMenu.length ||
    //     !form.vegPerPlate ||
    //     !form.nonVegPerPlate)
    // ) {
    //   return alert("Fill All Fields In The Form");
    // }

    setStatus('Wait....Uploading');

    if (editable) {
      axios
        .post(`${PROXY}/item/update`, formData, config)
        .then((res) => {
          setStatus('Edit Done');
          // setUploading(false);
          // editSucsess();
          setTimeout(() => {
            // location.reload();
            router.push(type === 'Vendors' ? '/Vendors' : '/Venues');
            setStatus('Edit');
          }, 1000);
        })
        .catch((e) => {
          console.log(e.message);
          setStatus('Error Occured');
          // uploadErrorr();
          setUploading(false);
        });
    } else {
      axios
        .post(`${PROXY}/item/create`, formData, config)
        .then((res) => {
          setStatus('All Done');
          setUploading(false);
          uploadSucsess();
          setTimeout(() => {
            setStatus('Submit');
            // location.reload();
            router.push('/dashboard');
          }, 3000);
          // location.reload();
          router.push('/dashboard');
        })
        .catch((e) => {
          console.log(e.message);
          setStatus('Error Occured');
          uploadErrorr();
          setUploading(false);
        });
    }
  };

  return (
    <div
      className='bg-white py-2'
      style={{ marginTop: 180 }}
    >
      <h5 className='text-center'>
        {editable ? 'Edit Listing' : 'Add Listing'}
      </h5>
      {isLoading ? (
        // <Spinner />
        'Hello'
      ) : (
        <div className={Styles.form_container}>
          <div className='row'>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Main Image</label>
                <br></br>

                <Upload
                  listType='picture-card'
                  fileList={fileListMain}
                  onPreview={handlePreview}
                  onChange={handleChangeMain}
                >
                  {fileListMain.length >= 1 ? null : uploadButton}
                </Upload>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Listing Type</label>
                <br></br>
                <select
                  onChange={(e) => {
                    const formm = {};
                    formm.type = e.target.value;
                    if (e.target.value === 'Vendor' && !editable) {
                      formm.termsandconditions =
                        'Booking Policy\n•    Pay 30% of the package price to book the package,\n•    Pay 50% amount before 15days of event \n•    Rest to be paid on the day of the event\n\nCancellation Policy\n•    This booking is non-cancellable. However the booking can be moved to another date at no extra charge.\n•    Advanced can be adjustable in future event if you plan any event with us\n \nTerms\n•    Transportation charges: No transportation charges apply within city. If the event is outside city, Travel & Stay charges shall be borne by the client. \n\n•    After booking confirmation, if you wish to change/alter your booked services in any way (e.g. your chosen event dates or location), we will do our utmost to accommodate these changes but it may not always be possible. Any request for changes must be in writing from the person who made the booking. All costs incurred due to amendments will be borne by you.';
                    } else {
                      formm.termsandconditions =
                        'Booking & Payment\n\n•    Advance: 50% of total Fee to be paid for booking the venue\n•    Remaining Booking Amount: to be paid at least 30 days prior to the event date(100% Booking Fee).\n•    Tax as applicable.\n•    Bookings are done on first come first server basis.\n•    Booking Confirmation Receipt will be given to client after Advance booking.\n•    Payment Mode: Cash, Bank Transfer(NEFT), Demand Draft are accepted.\n\nFacilities:\n\n•    Banquet Timings: Morning 8 a.m – 5 a.m & Evening 7 Pm till  Next Day (Extra charges for additional hours).\n•    Client must inspect the premises prior to taking possession. Similarly the venue is expected to be vacated in the same condition as it was handover to them.\n•    Client will be fully responsible for all liabilities, including food or any damage to the building, carpeting, equipments or other furnishings.\n•    Damage repair charges will be evaluated as per present market value & to be deducted from the Security deposit.\n•    Management is not responsible for any mishap. Natural Calamities and theft.\n•    Music system: 5 p.m- 10 p.m sharp.\n•    For DJ/Orchestra/ Any musical arrangement, guest has to arrange all valid licenses & permission . Asmi shall take no responsibility for the same.\n•    All statutory permission (police, sound, excise etc.) will sole responsibility of client, copy of such permission will have to be presented in the office before 3 days of the event.\n•    Smoking or Spitting of paan, gutkhas and other tobacco consumption is strictly prohibited inside the banquet premises.\n•    Spitting in the venue would attract the penalty of Rs.1,000/-.\n•    Venue representatives have the exclusive rights to restrict entry of certain guests into the premises.\n•    No animals and pets are permitted in the premises.\n•    Firearms and weapons are not allowed in the premises.\n•    Fireworks & firecrackers are strictly prohibited.';
                      setPlans(CategoryDefault[e.target.value]);
                    }
                    setForm({ ...form, ...formm });
                  }}
                  id={'type'}
                  className={Styles.select_tag}
                  value={form?.type}
                >
                  <option
                    value=''
                    disabled
                    selected={editable ? false : true}
                  >
                    --select--
                  </option>
                  {type === 'Vendors' ? (
                    <option
                      value='Vendor'
                      key='Vendor'
                    >
                      Vendor
                    </option>
                  ) : (
                    <option
                      value='Venue'
                      key='Venue'
                    >
                      Venue
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>City</label>
                <br></br>
                <select
                  onChange={(e) => {
                    setForm({ ...form, city: e.target.value });
                  }}
                  id='city'
                  className={Styles.select_tag}
                  defaultValue={form?.city}
                >
                  <option
                    value={''}
                    disabled
                    selected={editable ? false : true}
                  >
                    --select--
                  </option>
                  {cities.map((name) => (
                    <option
                      key={name}
                      value={name}
                    >
                      {name}
                    </option>
                  ))}
                  {/* {newLocations.map((name) => (
                    <option key={name.id} value={name.location}>
                      {name.location}
                    </option>
                  ))} */}
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Category</label>
                <br></br>
                {form?.type === 'Vendor' ? (
                  <select
                    onChange={(e) => {
                      const formm = {};
                      formm.category = e.target.value;
                      if (form.type === 'Vendor' && !editable) {
                        if (CategoryDefault[e.target.value] !== undefined) {
                          setPlans(CategoryDefault[e.target.value]);
                        }
                      }
                      setForm({ ...form, ...formm });
                    }}
                    id='category'
                    className={Styles.select_tag}
                    defaultValue={form?.category}
                  >
                    <option
                      value={''}
                      disabled
                      selected={editable ? false : true}
                    >
                      --select--
                    </option>
                    {CategotiesList.map((list, key) => (
                      <option
                        key={list.name}
                        value={list.name}
                      >
                        {list.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    onChange={(e) => {
                      setForm({ ...form, category: e.target.value });
                    }}
                    id='category'
                    className={Styles.select_tag}
                    defaultValue={form?.category}
                  >
                    <option
                      value={''}
                      disabled
                      selected={editable ? false : true}
                    >
                      --select--
                    </option>
                    {CategotiesListVenue.map((list, key) => (
                      <option
                        key={list.name}
                        value={list.name}
                      >
                        {list.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Sub Category</label>
                <br></br>
                {form?.type === 'Vendor' ? (
                  <select
                    onChange={(e) => {
                      const formm = {};
                      formm.subCategory = e.target.value;
                      if (form.type === 'Vendor' && !editable) {
                        if (SubCategoryDefault[e.target.value] !== undefined) {
                          setPlans(SubCategoryDefault[e.target.value]);
                        }
                      }
                      setForm({ ...form, ...formm });
                    }}
                    className={Styles.select_tag}
                    defaultValue={form?.subCategory ? form?.subCategory : ''}
                  >
                    <option
                      value={''}
                      disabled
                      selected={editable ? false : true}
                    >
                      --select--
                    </option>

                    {CategotiesList.map((list) =>
                      form?.category === list.name
                        ? list.subCategories.map((sub) => (
                            <option
                              key={sub}
                              value={sub}
                            >
                              {sub}
                            </option>
                          ))
                        : ''
                    )}
                  </select>
                ) : (
                  <select
                    onChange={(e) => {
                      setForm({ ...form, subCategory: e.target.value });
                    }}
                    className={Styles.select_tag}
                    defaultValue={''}
                  >
                    <option
                      value={''}
                      disabled
                      selected={editable ? false : true}
                    >
                      --select--
                    </option>
                    {CategotiesListVenue.map((list) =>
                      form?.category === list.name
                        ? list.subCategories.map((sub) => (
                            <option
                              key={sub}
                              value={sub}
                            >
                              {sub}
                            </option>
                          ))
                        : ''
                    )}
                  </select>
                )}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Name of Listing</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                  type='text'
                  value={form?.name}
                  placeholder='Name of Listing'
                  className={Styles.phone_tag}
                />
              </div>
            </div>

            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <label className={Styles.label}>Description / About</label>
              <br></br>
              <input
                onChange={(e) => {
                  setForm({ ...form, description: e.target.value });
                }}
                type='text'
                value={form?.description}
                placeholder='Description / About'
                className={Styles.email_tag}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Contact Email</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, contactEmail: e.target.value });
                  }}
                  type='text'
                  value={form?.contactEmail}
                  placeholder='Contact Email'
                  className={Styles.phone_tag}
                />
              </div>
            </div>

            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <label className={Styles.label}>Contact Number</label>
              <br></br>
              <input
                onChange={(e) => {
                  setForm({ ...form, contactPhone: e.target.value });
                }}
                type='text'
                value={form?.contactPhone}
                placeholder='Contact Number'
                className={Styles.email_tag}
              />
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <label className={Styles.label}>Second Contact</label>
              <span
                style={{ fontSize: '17px', marginLeft: '5px' }}
                onClick={() => {
                  setSecondNumbers((old) => [...old, '']);
                }}
              >
                +
              </span>
              <br></br>
              {console.log(
                '🚀 ~ file: index.js:1860 ~ {ondNumbers:',
                secondNumbers
              )}
              {secondNumbers?.map((data, key) => {
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      onChange={(e) => {
                        const dummy = secondNumbers;
                        dummy[key] = e.target.value;

                        setSecondNumbers([...dummy]);
                        setForm({ ...form, secondNumbers: secondNumbers });
                      }}
                      type='number'
                      value={data}
                      placeholder='Contact Number'
                      className={Styles.email_tag}
                    />
                    {secondNumbers.length !== 1 ? (
                      <div
                        className='col-md-4'
                        style={{ marginTop: -3, marginLeft: 10 }}
                      >
                        <span
                          onClick={() => {
                            const newarr = [...secondNumbers];
                            newarr.splice(key, 1);

                            setSecondNumbers(newarr);
                          }}
                          className='fs-5 cursor-pointer'
                        >
                          <button>Delete</button>
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Address</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, address: e.target.value });
                  }}
                  type='text'
                  value={form?.address}
                  placeholder='Address'
                  className={Styles.phone_tag}
                />
              </div>
            </div>

            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <label className={Styles.label}>Zipcode</label>
              <br></br>
              <input
                onChange={(e) => {
                  setForm({ ...form, zipcode: e.target.value });
                }}
                type='text'
                value={form?.zipcode}
                placeholder='Zipcode'
                className={Styles.email_tag}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Amenity Price</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, price: e.target.value });
                  }}
                  type='text'
                  value={form?.price}
                  placeholder='Amenity Price'
                  className={Styles.phone_tag}
                />
              </div>
            </div>
          </div>
          {form?.type === 'Venue' && (
            <>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                  <div className={Styles.category_section}>
                    <label className={Styles.label}>
                      Veg Platter Price (in ₹)
                    </label>
                    <br></br>
                    <input
                      onChange={(e) => {
                        setForm({ ...form, vegPerPlate: e.target.value });
                      }}
                      type='text'
                      value={form?.vegPerPlate}
                      placeholder='Veg Platter Price (in ₹)'
                      className={Styles.phone_tag}
                    />
                  </div>
                </div>

                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                  <label className={Styles.label}>
                    NonVeg Platter Price (in ₹)
                  </label>
                  <br></br>
                  <input
                    onChange={(e) => {
                      setForm({ ...form, nonVegPerPlate: e.target.value });
                    }}
                    value={form?.nonVegPerPlate}
                    type='text'
                    placeholder='NonVeg Platter Price (in ₹)'
                    className={Styles.email_tag}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className={Styles.name_block}>
                    <label className={Styles.label}>Menu</label>
                    <br></br>
                    <Upload
                      multiple
                      listType='picture-card'
                      fileList={fileListMenu}
                      onPreview={handlePreview}
                      onChange={handleChangeMenu}
                    >
                      {uploadButton}
                    </Upload>
                  </div>
                </div>
              </div>
              <div className='row mt-3 mb-3'>
                <label className={Styles.label}>
                  Amenities / Halls &nbsp;&nbsp;&nbsp;&nbsp;
                  <span
                    onClick={() => {
                      const newitem = { name: '', min: '', max: '' };
                      setAmenities((old) => [...old, newitem]);
                    }}
                    className='fs-5 cursor-pointer'
                  >
                    +
                  </span>
                </label>

                {amenities.map((data, key) => (
                  <>
                    <div className='col-md-4'>
                      <label className={Styles.label}>Name</label>
                      <br></br>
                      <input
                        onChange={(e) => {
                          const newarr = [...amenities];
                          newarr[key].name = e.target.value;
                          setAmenities(newarr);
                          setForm({ ...form, amenities: newarr });
                        }}
                        type='text'
                        value={data.name}
                        placeholder='Name'
                        className={Styles.phone_tag}
                      />
                    </div>
                    <div className='col-md-4'>
                      <label className={Styles.label}>Minimum Capacity</label>
                      <br></br>
                      <input
                        onChange={(e) => {
                          const newarr = [...amenities];
                          newarr[key].min = e.target.value;
                          setAmenities(newarr);
                          setForm({ ...form, amenities: newarr });
                        }}
                        type='text'
                        value={data.min}
                        placeholder='Minimum Capacity'
                        className={Styles.phone_tag}
                      />
                    </div>
                    <div className='col-md-4'>
                      <label className={Styles.label}>Maximum Capacity</label>
                      <br></br>
                      <input
                        onChange={(e) => {
                          const newarr = [...amenities];
                          newarr[key].max = e.target.value;
                          setAmenities(newarr);
                          setForm({ ...form, amenities: newarr });
                        }}
                        type='text'
                        value={data.max}
                        placeholder='Maximum Capacity'
                        className={Styles.phone_tag}
                      />
                    </div>
                  </>
                ))}
              </div>
              <label className={Styles.label}>Vendor Allow Policy</label>
              <div className='row mt-3 mb-3'>
                <div className='col-md-4'>
                  <label className={Styles.label}>Vendor Name</label>
                  <br></br>
                </div>
                <div className='col-md-4'>
                  <label className={Styles.label}>Allowed / Not Allowed</label>
                  <br></br>
                </div>
              </div>
              {allowedVendors.map((data, key) => (
                <div
                  className='row mt-3 mb-3'
                  key={key}
                >
                  <div className='col-md-4'>
                    <label className={Styles.label}>{data.name}</label>
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='checkbox'
                      onChange={() => {
                        const newarr = [...allowedVendors];
                        newarr[key].value = !data.value;
                        setAllowedVendors(newarr);
                        setForm({ ...form, allowedVendors: newarr });
                      }}
                      checked={data.value}
                    />
                  </div>
                </div>
              ))}
              <label className={Styles.label}>
                Features &nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  onClick={() => {
                    const newitem = { name: '', value: '' };
                    setFeatures((old) => [...old, newitem]);
                  }}
                  className='fs-5 cursor-pointer'
                >
                  +
                </span>
              </label>

              {features.map((data, key) => (
                <div
                  className='row mt-3 mb-3'
                  key={key}
                >
                  <div className='col-md-4'>
                    <label className={Styles.label}>Name</label>
                    <br></br>
                    <input
                      onChange={(e) => {
                        const newarr = [...features];
                        newarr[key].name = e.target.value;
                        setFeatures(newarr);
                        // setForm({ ...form, features: newarr });
                      }}
                      value={data.name}
                      type='text'
                      placeholder='Name'
                      className={Styles.phone_tag}
                    />
                  </div>
                  <div className='col-md-4'>
                    <label className={Styles.label}>
                      Allowed / Not Allowed
                    </label>
                    <br></br>
                    <br />
                    <input
                      type='checkbox'
                      onChange={() => {
                        const newarr = [...features];
                        newarr[key].value = !data.value;
                        setFeatures(newarr);
                        setForm({ ...form, features: newarr });
                      }}
                      checked={data.value}
                    />
                  </div>
                  <div
                    className='col-md-4'
                    style={{ marginTop: 30 }}
                  >
                    <span
                      onClick={() => {
                        const newarr = [...features];
                        newarr.splice(key, 1);
                        setFeatures(newarr);
                        // setForm({ ...form, features: newarr });
                      }}
                      className='fs-5 cursor-pointer'
                    >
                      <button>Delete</button>
                      {/* <RiDeleteBin6Line /> */}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
          <div className='row mt-3 mb-3'>
            <label className={Styles.label}>
              Plans / Packages &nbsp;&nbsp;&nbsp;&nbsp;
              <span
                onClick={() => {
                  const newitem = { name: '', value: '' };
                  setPlans((old) => [...old, newitem]);
                }}
                className='fs-5 cursor-pointer'
              >
                +
              </span>
            </label>

            {plans.map((data, key) => (
              <div
                className='row mt-3 mb-3'
                key={key}
              >
                <div className='col-md-4'>
                  <label className={Styles.label}>Plan Name</label>
                  <br></br>
                  <input
                    onChange={(e) => {
                      const newarr = [...plans];
                      newarr[key].name = e.target.value;
                      setPlans(newarr);
                      setForm({ ...form, plans: newarr });
                    }}
                    type='text'
                    value={data.name}
                    placeholder='Plan Name'
                    className={Styles.phone_tag}
                  />
                </div>
                <div className='col-md-4'>
                  <label className={Styles.label}>Value</label>
                  <br></br>
                  <input
                    onChange={(e) => {
                      const newarr = [...plans];
                      newarr[key].value = e.target.value;
                      setPlans(newarr);
                      setForm({ ...form, plans: newarr });
                    }}
                    value={data.value}
                    type='text'
                    placeholder='Value'
                    className={Styles.phone_tag}
                  />
                </div>
                <div
                  className='col-md-4'
                  style={{ marginTop: 30 }}
                >
                  <span
                    onClick={() => {
                      const newarr = [...plans];
                      newarr.splice(key, 1);
                      setPlans(newarr);
                    }}
                    className='fs-5 cursor-pointer'
                  >
                    <button>Delete</button>
                    {/* <RiDeleteBin6Line /> */}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className='row'>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Terms and Conditions</label>
                <br></br>
                <textarea
                  onChange={(e) => {
                    setForm({ ...form, termsandconditions: e.target.value });
                  }}
                  value={form?.termsandconditions}
                  type='text'
                  placeholder='Terms and Conditions'
                  className={Styles.phone_tag}
                ></textarea>
              </div>
            </div>
          </div>
          <div className=''>
            <div
              ref={Div}
              className={Styles.name_block}
            >
              <label className={Styles.label}>Gallery</label>
              <br></br>
              <Upload
                multiple
                listType='picture-card'
                fileList={fileListGallery}
                onPreview={handlePreview}
                onChange={handleChangeGallery}
              >
                {uploadButton}
              </Upload>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
            <div className={Styles.name_block}>
              <label className={Styles.label}>Brochure</label>
              <br></br>
              <Upload
                listType='picture-card'
                fileList={fileListBrochure}
                onPreview={handlePreview}
                onChange={handleChangeBrochure}
              >
                {fileListBrochure.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <label className={Styles.label}>Albums</label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span
            onClick={() => {
              const newitem = { name: '', value: [] };
              setFileListAlbum((old) => [...old, newitem]);
            }}
            className='fs-5 cursor-pointer'
          >
            +
          </span>
          <br></br>
          <div className='row'>
            {fileListAlbum.map((album, key) => (
              <div key={key}>
                <div className='row mt-3 mb-3'>
                  <div className='col-md-4'>
                    <input
                      type='text'
                      onChange={onChangeAlbumHandler(key)}
                      placeholder='Album name'
                      className={Styles.phone_tag}
                      value={album.name}
                    />
                  </div>
                  <div
                    className='col-md-4'
                    style={{ marginTop: 10 }}
                  >
                    {deleting ? (
                      <Spinner />
                    ) : (
                      <span
                        onClick={() => {
                          const newarr = [...fileListAlbum];
                          const newarr2 = [...albumImageDefault];
                          newarr.splice(key, 1);
                          newarr2.splice(key, 1);
                          setFileListAlbum(newarr);
                          setAlbumdefault(newarr2);
                        }}
                        className='fs-5 cursor-pointer'
                      >
                        <button>Delete</button>
                        {/* <RiDeleteBin6Line /> */}
                      </span>
                    )}
                  </div>
                </div>
                <Upload
                  multiple
                  listType='picture-card'
                  fileList={fileListAlbum[key]?.value}
                  onPreview={handlePreview}
                  onChange={(e) => handleChangeAlbum(e, key)}
                >
                  {uploadButton}
                </Upload>
              </div>
            ))}
          </div>
          <div className='row'>
            <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8'>
              <div className={Styles.category_section}>
                <label className={Styles.label}>
                  Video Links &nbsp;&nbsp;&nbsp;&nbsp;
                  <span
                    onClick={() => {
                      const newitem = '';
                      setVidLinks((old) => [...old, newitem]);
                    }}
                    className='fs-5 cursor-pointer'
                  >
                    +
                  </span>
                </label>
                <br></br>
                {vidLinks.map((data, key) => (
                  <div
                    className='row mt-3 mb-3'
                    key={key}
                  >
                    <div className='col-md-4'>
                      <input
                        key={key}
                        onChange={(e) => {
                          const newitem = [...vidLinks];
                          newitem[key] = e.target.value;
                          setVidLinks(newitem);
                          setForm({ ...form, vidLinks: newitem });
                        }}
                        value={data}
                        type='text'
                        placeholder='https://youtu.be/dOKQeqGNJwY'
                        className={Styles.phone_tag}
                      />
                    </div>
                    <div
                      className='col-md-4'
                      style={{ marginTop: 10 }}
                    >
                      <span
                        onClick={() => {
                          const newarr = [...vidLinks];

                          newarr.splice(key, 1);

                          setVidLinks(newarr);
                          // setForm({ ...form, features: newarr });
                        }}
                        className='fs-5 cursor-pointer'
                      >
                        <button>Delete</button>
                        {/* <RiDeleteBin6Line /> */}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {form?.type === 'qwqw' && (
            <div>
              <h6>Additional Details</h6>

              <div className={Styles.category_section}>
                <label className={Styles.label}>
                  Booking Amount to block date
                </label>
                <br></br>
                <input
                  onChange={(e) => {
                    setAdditional({
                      ...additional,
                      booking_amount: e.target.value,
                    });
                  }}
                  type='text'
                  value={additional.booking_amount}
                  placeholder='Name of Listing'
                  className={Styles.phone_tag}
                />
              </div>
              <div className={Styles.category_section}>
                <FormControl>
                  <FormLabel id='demo-controlled-radio-buttons-group'>
                    Parking
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={additional.parking}
                    onChange={(e) =>
                      setAdditional({ ...additional, parking: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value='There is sufficient parking available'
                      control={<Radio />}
                      label='There is sufficient parking available'
                    />
                    <FormControlLabel
                      value='Parking is available near the venue'
                      control={<Radio />}
                      label='Parking is available near the venue'
                    />
                    <FormControlLabel
                      value='No parking available'
                      control={<Radio />}
                      label='No parking available'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={Styles.category_section}>
                <FormControl>
                  <FormLabel id='demo-controlled-radio-buttons-group'>
                    Does your venue have rental cost along with per plate cost?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={additional.rental_cost_per_plate}
                    onChange={(e) => {
                      setAdditional({
                        ...additional,
                        rental_cost_per_plate: e.target.value,
                      });
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label='Yes'
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label='No'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={Styles.category_section}>
                <FormControl
                  sx={{}}
                  component='fieldset'
                  variant='standard'
                >
                  <FormLabel component='legend'>Venue Type</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Indoor}
                          onChange={handleChange}
                          name='Indoor'
                        />
                      }
                      label='Indoor'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Outdoor}
                          onChange={handleChange}
                          name='Outdoor'
                        />
                      }
                      label='Outdoor'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Poolside}
                          onChange={handleChange}
                          name='Poolside'
                        />
                      }
                      label='Poolside'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Terrace}
                          onChange={handleChange}
                          name='Terrace'
                        />
                      }
                      label='Terrace'
                    />
                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
                {/* <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Venue Type
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Indoor}
                      onChange={handleChange}
                      name="Indoor"
                    />
                  }
                  label="Indoor"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Outdoor}
                      onChange={handleChange}
                      name="Outdoor"
                    />
                  }
                  label="Outdoor"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Poolside}
                      onChange={handleChange}
                      name="Poolside"
                    />
                  }
                  label="Poolside"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Terrace}
                      onChange={handleChange}
                      name="Terrace"
                    />
                  }
                  label="Terrace"
                />
              </FormGroup>
            </FormControl> */}
              </div>
              <div className={Styles.category_section}>
                <FormControl>
                  <FormLabel id='demo-controlled-radio-buttons-group'>
                    Cancellation Policy
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={additional.policy_cancellation}
                    onChange={(e) => {
                      setAdditional({
                        ...additional,
                        policy_cancellation: e.target.value,
                      });
                    }}
                  >
                    <FormControlLabel
                      value={'Partial Refund Offered'}
                      control={<Radio />}
                      label='Partial Refund Offered'
                    />
                    <FormControlLabel
                      value={'No Refund Offered'}
                      control={<Radio />}
                      label='No Refund Offered'
                    />
                    <FormControlLabel
                      value={
                        'No Refund Offered However Date Adjustment Can Be Done'
                      }
                      control={<Radio />}
                      label='No Refund Offered However Date Adjustment Can Be Done'
                    />
                    <FormControlLabel
                      value={'Full Refund Offered within limited due date'}
                      control={<Radio />}
                      label='Full Refund Offered within limited due date'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={Styles.category_section}>
                <label className={Styles.label}>
                  When your venue started operations?
                </label>
                <br></br>
                <input
                  onChange={(e) => {
                    setAdditional({
                      ...additional,
                      year_of_start: e.target.value,
                    });
                  }}
                  type='number'
                  value={additional.year_of_start}
                  placeholder='Veg Platter Price (in ₹)'
                  className={Styles.phone_tag}
                />
              </div>
              <div className={Styles.category_section}>
                <label className={Styles.label}>Rooms available</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({
                      ...additional,
                      rooms_in_accomodation: e.target.value,
                    });
                  }}
                  type='number'
                  value={additional.rooms_in_accomodation}
                  placeholder='Veg Platter Price (in ₹)'
                  className={Styles.phone_tag}
                />
              </div>
              <div className={Styles.category_section}>
                <label className={Styles.label}>
                  Starting price for basic room
                </label>
                <br></br>
                <input
                  onChange={(e) => {
                    setAdditional({
                      ...additional,
                      basic_starting_price: e.target.value,
                    });
                  }}
                  type='number'
                  value={additional.basic_starting_price}
                  placeholder='Veg Platter Price (in ₹)'
                  className={Styles.phone_tag}
                />
              </div>
              <div className={Styles.category_section}>
                <FormControl>
                  <FormLabel id='demo-controlled-radio-buttons-group'>
                    Policy on catering
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={additional.policy_on_catering}
                    onChange={(e) => {
                      setAdditional({
                        ...additional,
                        policy_on_catering: e.target.value,
                      });
                    }}
                  >
                    <FormControlLabel
                      value={'Inhouse catering, Outside vendors not permitted'}
                      control={<Radio />}
                      label='Inhouse catering, Outside vendors not permitted'
                    />
                    <FormControlLabel
                      value={'Inhouse catering, Outside vendors allowed'}
                      control={<Radio />}
                      label='Inhouse catering, Outside vendors allowed'
                    />
                    <FormControlLabel
                      value={
                        'No inhouse service, Outside vendors allowed from panel'
                      }
                      control={<Radio />}
                      label='No inhouse service, Outside vendors allowed from panel'
                    />
                    <FormControlLabel
                      value={'No inhouse services, Outside vendors allowed'}
                      control={<Radio />}
                      label='No inhouse services, Outside vendors allowed'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={Styles.category_section}>
                <FormControl>
                  <FormLabel id='demo-controlled-radio-buttons-group'>
                    Policy on decor
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={additional.policy_on_decor}
                    onChange={(e) => {
                      setAdditional({
                        ...additional,
                        policy_on_decor: e.target.value,
                      });
                    }}
                  >
                    <FormControlLabel
                      value={
                        'Decorators should be chosen only from enlisted Panel'
                      }
                      control={<Radio />}
                      label='Decorators should be chosen only from enlisted Panel'
                    />
                    <FormControlLabel
                      value={'Outside decorators permitted'}
                      control={<Radio />}
                      label='Outside decorators permitted'
                    />
                    <FormControlLabel
                      value={'In-house décor'}
                      control={<Radio />}
                      label='In-house décor'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={Styles.category_section}>
                <label className={Styles.label}>
                  Minimum Starting Price to decorate your venue
                </label>
                <br></br>
                <input
                  onChange={(e) => {
                    setAdditional({
                      ...additional,
                      minimum_decor_price: e.target.value,
                    });
                  }}
                  type='number'
                  value={additional.minimum_decor_price}
                  placeholder='Veg Platter Price (in ₹)'
                  className={Styles.phone_tag}
                />
              </div>
              <div className={Styles.category_section}>
                <FormControl>
                  <FormLabel id='demo-controlled-radio-buttons-group'>
                    Policy on alcohol
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={additional.policy_on_alcohol}
                    onChange={(e) => {
                      setAdditional({
                        ...additional,
                        policy_on_alcohol: e.target.value,
                      });
                    }}
                  >
                    <FormControlLabel
                      value={
                        'In house alcohol available, Outside alcohol permitted'
                      }
                      control={<Radio />}
                      label='In house alcohol available, Outside alcohol permitted'
                    />
                    <FormControlLabel
                      value={
                        'In house alcohol available, Outside alcohol not permitted'
                      }
                      control={<Radio />}
                      label='In house alcohol available, Outside alcohol not permitted'
                    />
                    <FormControlLabel
                      value={
                        'In house alcohol not available, Outside alcohol permitted'
                      }
                      control={<Radio />}
                      label='In house alcohol not available, Outside alcohol permitted'
                    />
                    <FormControlLabel
                      value={
                        'In house alcohol not available, Outside alcohol not permitted'
                      }
                      control={<Radio />}
                      label='In house alcohol not available, Outside alcohol not permitted'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={Styles.category_section}>
                <FormControl>
                  <FormLabel id='demo-controlled-radio-buttons-group'>
                    Policy on DJ
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={additional.policy_on_dj}
                    onChange={(e) => {
                      setAdditional({
                        ...additional,
                        policy_on_dj: e.target.value,
                      });
                    }}
                  >
                    <FormControlLabel
                      value={'In house DJ available, Outside DJ permitted'}
                      control={<Radio />}
                      label='In house DJ available, Outside DJ permitted'
                    />
                    <FormControlLabel
                      value={'In house DJ available, Outside DJ not permitted'}
                      control={<Radio />}
                      label='In house DJ available, Outside DJ not permitted'
                    />
                    <FormControlLabel
                      value={'In house DJ not available, Outside DJ permitted'}
                      control={<Radio />}
                      label='In house DJ not available, Outside DJ permitted'
                    />

                    <FormControlLabel
                      value={
                        'In house DJ not available, Outside DJ not permitted'
                      }
                      control={<Radio />}
                      label='In house DJ not available, Outside DJ not permitted'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          )}
          <div className='d-block mt-3'>
            <button
              onClick={addHandler}
              className={` primary-btn`}
              disabled={uploading ? true : false}
            >
              {status}
            </button>
          </div>
        </div>
      )}
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt='example'
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

EditListedItems.getInitialProps = ({ query }) => {
  return { query };
};

export default EditListedItems;

// // import Header from "../../Components/Dashboard/Header";
// // import Styles from "../../styles/Dashboard/Dashboard.module.css";
// import Header from "../Components/Header";
// import Styles from "../styles/Dashboard/Dashboard.module.css";
// import { useState } from "react";
// // import EditListedItems from "../../Components/Dashboard/EditListedItems"; // for adding
// import EditListedItems from "../Components/Dashboard/EditListedItems";

// // import ActualEditListings from "../../Components/Dashboard/ActualEditListings"; // for editing

// import { useRouter } from "next/router";

// const EditList = () => {
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const router = useRouter();

//   return (
//     <div
//       className={`${Styles.dashboard_container} bg-grey`}
//       style={{ marginTop: 80 }}
//     >
//       {/* <Header setHeaderHeight={setHeaderHeight} /> */}
//       <div
//         className="main_dashboard position-relative"
//         style={{ marginTop: `${headerHeight}px` }}
//       >
//         {/* <Sidebar headerHeight={headerHeight} dashboard="vendor" /> */}
//         <div
//           className={`${Styles.main_content} ms-auto`}
//           style={{
//             transition: "all 450ms",
//             width: "100%",
//           }}
//         >
//           <EditListedItems router={router} />
//           {/* {pathname === "add" && <EditListedItems />}
//           {pathname === "edit" && <EditListedItems />} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditList;
