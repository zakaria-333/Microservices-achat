import Row1 from '../../components/directeurSite/Row1'
import Row2 from '../../components/directeurSite/Row2'
import { Box, Button } from '@mui/material'
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';



const HomeSite = () => {
  const contentRef = useRef();
  const downloadPDF = () => {

    const element = contentRef.current;
    html2pdf()
      .from(element)
      .save();
  };
  return (
    <div >
      <Box sx={{ textAlign: 'right', mr: '40px' }}>
        <Button variant="contained" onClick={downloadPDF} endIcon={<BackupOutlinedIcon />}>
          TÉLÉCHARGER LE RAPPORT
        </Button>
      </Box>
      <div ref={contentRef}>
        <Row1 />
        <Row2 />
      </div>
    </div>
  )
}

export default HomeSite
