import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Avatar, Container, Box, Card, CardContent, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Button } from "@mui/material";
import Clear from "@mui/icons-material/Clear";
import cblogo from "./cblogo.PNG";
import image from "./bg.png"; 
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { RiUploadCloud2Fill } from "react-icons/ri";
import PlantDiseaseFacts from "./PlantDiseaseFacts";
import earlyBlightImage from "./assets/early.jpg";
import lateBlightImage from "./assets/late.jpg";
import healthyImage from "./assets/health.jpg";
import e2 from "./assets/early2.jpg";
import e3 from "./assets/early3.png";
import l2 from "./assets/late2.jpg";
import l3 from "./assets/late3.jpg";
import h2 from "./assets/healthy2.jpg";
import h3 from "./assets/health3.jpg";
import { Link} from "@mui/material";
// Define a mapping of disease names to supplements
// Update diseaseSupplements to have multiple entries for each disease
const diseaseSupplements = {
    "Early Blight": [
      {
        name: "Antracol",
        image: earlyBlightImage,
        usage: "Apply Antracol once every 7 days for 3 weeks. Ensure the plant is in a well-ventilated area. For best results, spray the entire plant, including both the upper and lower leaf surfaces, to prevent spore germination and fungal spread."
      },
      {
        name: "Dithane M-45",
        image: e2,
        usage: "Apply Dithane M-45 weekly for 4 weeks to control early blight. For optimal effectiveness, start treatment at the first signs of the disease or as a preventive measure before blight symptoms appear."
      },
      {
        name: "Copper Oxychloride",
        image: e3,
        usage: "Use Copper Oxychloride every 10 days to prevent fungal growth. Make sure to apply after any rainfall or heavy irrigation to protect the plant from re-infection."
      }
    ],
    "Late Blight": [
      {
        name: "Amistar Top",
        image: lateBlightImage,
        usage: "Apply this immediately after detecting symptoms. Repeat after 5 days for best results. This systemic fungicide will be absorbed by the plant, providing long-lasting protection."
      },
      {
        name: "Ridomil Gold",
        image: l2,
        usage: "Use Ridomil Gold every week during the rainy season to prevent late blight. During wet conditions, the risk of late blight increases significantly, so it's essential to apply this fungicide as part of a preventive treatment program."
      },
      {
        name: "Curzate",
        image: l3,
        usage: "Spray Curzate at 10-day intervals to manage the spread of late blight. Curzate is most effective when applied early, before the disease has spread extensively. "
      }
    ],
    "Healthy": [
      {
        name: "Inlife Supplement",
        image: healthyImage,
        usage: "Use Nutrient Supplement once a month to maintain plant health. This supplement helps to balance nutrient levels in the soil, promoting overall plant vigor. Apply evenly around the plant’s root zone, ensuring it is absorbed by the soil. For potted plants, reduce the dosage and water thoroughly after application to prevent nutrient burn."
      },
      {
        name: "Plant Tonic",
        image: h2,
        usage: "Apply Plant Tonic monthly for stronger immunity against diseases. This tonic boosts plant resilience and helps protect against common pests and diseases. During the growing season, consider applying every 3-4 weeks for enhanced immunity, especially when environmental stressors like drought or high humidity are present."
      },
      {
        name: "Bio-Grow",
        image: h3,
        usage: "Use Bio-Grow every two months for enhanced plant growth. This product is rich in organic compounds that promote soil health, enhance nutrient uptake, and stimulate root development. Apply during the growing season when plants are actively developing."
      }
    ]
  };
  const diseaseInfo = {
    "Early Blight": {
      description: "Early Blight is a fungal disease caused by *Alternaria solani*, affecting tomato plants, causing dark spots with concentric rings on leaves, stems, and fruits.",
      symptoms: [
        "Dark, sunken lesions on leaves, often surrounded by yellow halos.",
        "Lesions on stems and fruit, leading to fruit rot.",
      ],
      prevention: [
        "Use resistant plant varieties.",
        "Practice crop rotation and avoid planting tomatoes in the same spot each year.",
      ]
    },
    "Late Blight": {
      description: "Late Blight, caused by *Phytophthora infestans*, is a devastating disease of tomatoes and potatoes that leads to rapid plant death. It thrives in wet, cool conditions.",
      symptoms: [
        "Water-soaked lesions on leaves, which turn brown and spread quickly.",
        "Blackened stems and fruit rot.",
      ],
      prevention: [
        "Apply fungicides regularly during wet weather conditions.",
        "Remove infected plant parts and dispose of them immediately.",
      ]
    },
    "Healthy": {
      description: "Healthy plants are free from disease, have strong root systems, and exhibit vigorous growth.",
      symptoms: [
        "Green, robust leaves.",
        "Strong stem structure.",
      ],
      prevention: [
        "Regularly fertilize plants with the appropriate nutrients.",
        "Maintain proper watering practices to avoid both drought stress and waterlogging.",
      ]
    }
  };
  

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#fff"),
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#ffffff7a",
  },
}));

const useStyles = {
  grow: { flexGrow: 1 },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  mainContainer: {
    backgroundImage: `url(${image})`,  
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: '#be6a77',
    boxShadow: 'none',
    color: 'white',
  },
  loader: {
    color: '#be6a77 !important',
  },
  supplementCard: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
    marginTop: "20px",
  },
  supplementImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
};

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [imageFile, setImageFile] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [supplement, setSupplement] = useState(null);

  const sendFile = async () => {
    if (imageFile && selectedFile) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await axios.post(process.env.REACT_APP_API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          setData(res.data);
          // Based on the disease detected, get the supplement
          const diseaseName = res.data.class;
          if (diseaseSupplements[diseaseName]) {
            setSupplement(diseaseSupplements[diseaseName]);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearData = () => {
    setData(null);
    setImageFile(null);
    setSelectedFile(null);
    setPreview(null);
    setSupplement(null);
  };

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(null);
      setImageFile(null);
      setPreview(null);
      return;
    }
    setSelectedFile(files[0]);
    setImageFile(files[0]);  // Store the actual file
    setPreview(URL.createObjectURL(files[0]));
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (preview) sendFile();
  }, [preview]);

  const Dropzone = ({ onFileSelected }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: onFileSelected,
      accept: "image/*",
    });

    return (
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop an image to process</p>
        <RiUploadCloud2Fill size={50}/>
      </div>
    );
  };

  return (
    <>
      <Container maxWidth={false} disableGutters sx={useStyles.mainContainer}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <PlantDiseaseFacts />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            {/* Input Card */}
            <Card sx={useStyles.imageCard}>
              {!imageFile && (
                <CardContent>
                  <Dropzone onFileSelected={onSelectFile} />
                </CardContent>
              )}
              {imageFile && (
                <CardContent>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "contain",
                      borderRadius: "15px",
                    }}
                  />
                </CardContent>
              )}
              {data && (
                <CardContent
                  sx={{
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "25px",
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                  }}
                >
                  <TableContainer
                    component={Paper}
                    elevation={3}
                    style={{ borderRadius: "25px", overflow: "hidden" }}
                  >
                    <Table size="small" aria-label="results table">
                      <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Disease:</TableCell>
                          <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
                            Accuracy:
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ fontSize: "15px", color: "#333" }}>{data.class}</TableCell>
                          <TableCell align="right" style={{ fontSize: "15px", color: "#333" }}>
                            {parseFloat(data.confidence * 100).toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {isLoading && (
                <CardContent>
                  <CircularProgress color="secondary" sx={useStyles.loader} />
                  <Typography variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>
              )}
            </Card>
  
                    {/* Supplement Recommendation Card */}
                    {Array.isArray(supplement) && supplement.length > 0 && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                        {/* Title for Supplement Recommendations */}
                        <Typography variant="h5" component="div" sx={{ fontWeight: "bold", textAlign: "center" }}>
                         Recommended Supplements
                        </Typography>

                        {/* Cards for each supplement */}
                        <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                        {supplement.map((supp, index) => (
                            <Card key={index} sx={{ width: "200px", padding: "10px" }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                {supp.name}
                                </Typography>
                                <img
                                src={supp.image}
                                alt={supp.name}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    maxHeight: "160px",
                                    borderRadius: "10px",
                                }}
                                />
                                <Typography variant="body1" component="div" sx={{ marginTop: "10px" }}>
                                {supp.usage}
                                </Typography>
                            </CardContent>
                            </Card>
                        ))}
                        </Box>
                    </Box>
                    )}
                              {/* Disease Information Card */}
          {data && diseaseInfo[data.class] && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px",maxWidth: "400px", width: "100%"  }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: "bold", textAlign: "center" }}>
                Disease Information
              </Typography>
              <Card sx={{ padding: "20px", boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                    {data.class} Information
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "10px" }}>
                    <strong>Description:</strong> {diseaseInfo[data.class].description}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "10px", fontWeight: "bold" }}>
                    Symptoms:
                  </Typography>
                  <ul>
                    {diseaseInfo[data.class].symptoms.map((symptom, index) => (
                      <li key={index}>
                        <Typography variant="body2">{symptom}</Typography>
                      </li>
                    ))}
                  </ul>
                  <Typography variant="body2" sx={{ marginTop: "10px", fontWeight: "bold" }}>
                    Prevention:
                  </Typography>
                  <ul>
                    {diseaseInfo[data.class].prevention.map((prevent, index) => (
                      <li key={index}>
                        <Typography variant="body2">{prevent}</Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Box>
          )}

                            
            {/* Clear Button */}
            {data && (
              <Box sx={{ marginTop: "20px" }}>
                <ColorButton variant="contained" size="large" onClick={clearData} startIcon={<Clear />}>
                  Clear
                </ColorButton>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
  
};

export { ImageUpload };
