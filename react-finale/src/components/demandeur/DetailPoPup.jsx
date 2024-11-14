import { Box, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState } from 'react';

const DetailPoPup = ({ open, handleClose, rowData }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const determineStage = () => {
      if (!rowData) {
        return -1; // Return -1 or some other default/error value
      }

      const { confirmationDg, confirmationCd, confirmationDaf, confirmationAchat } = rowData;

      // Check for each confirmation status
      const allInProgress = [confirmationDg, confirmationCd, confirmationDaf, confirmationAchat].every(status => status === 'en cours');
      const cdConfirmed = confirmationCd === 'validé';
      const achatConfirmed = confirmationAchat === 'validé';
      const dafConfirmed = confirmationDaf === 'validé';

      if (allInProgress) {
        return 0; // All confirmations are 'en cours'
      }
      if (cdConfirmed && achatConfirmed && dafConfirmed && confirmationDg === 'validé') {
        return 4; // All confirmations are 'validé'
      }
      if (cdConfirmed && achatConfirmed && dafConfirmed) {
        return 3; // CD, Achat, and DAF confirmed
      }
      if (cdConfirmed && achatConfirmed && !dafConfirmed) {
        return 2; // CD and Achat confirmed
      }
      if (cdConfirmed && !achatConfirmed && !dafConfirmed) {
        return 1; // Only CD confirmed
      }

      // Default case if none of the conditions are met
      return -1; // Represents an undefined or error state
    };

    setCurrentStep(determineStage());
  }, [open]);

  const steps = [
    'Validé par Responsable',
    "Validé par Département d'achat",
    'Validé par DAF',
    "Validé par Directeur géneral"
  ];

  // Extract the first justification description if the state is "refusé"
  const justificationDescription = rowData?.justifications?.[0]?.description;

  const isRefused = [
    rowData?.confirmationDg,
    rowData?.confirmationCd,
    rowData?.confirmationDaf,
    rowData?.confirmationAchat
  ].includes('refusé');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>{rowData?.code}</div>
        <div className='text-blue-600'>{rowData?.date}</div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Description : {rowData?.description}
          <br />
          Montant : {rowData?.montant === 0 ? (
            <span className='text-red-600'>Pas encore défini</span>
          ) : (
            `${rowData?.montant} DH`
          )}
          <br />

          {isRefused && justificationDescription && (
            <>
              <br />
              <p className='text-red-700'>Justification de refus : {justificationDescription}</p>
              <br />
            </>
          )}

          <div className='flex justify-between items-center mt-2'>
            <div>Sous-Categorie : </div>
            <div>
              {rowData?.details?.map((detail) => (
                <Chip
                  key={detail.id.subCategorieId} // Use a unique key for each Chip
                  label={detail.subCategorie.nom} // Display the subcategory name
                  sx={{ margin: '4px' }} // Add some spacing between chips
                />
              ))}
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <Box marginY={5}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Dialog>
  );
};

export default DetailPoPup;