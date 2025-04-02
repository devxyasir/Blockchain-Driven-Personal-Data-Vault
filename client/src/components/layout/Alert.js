import React, { useState, createContext, useContext } from 'react';
import { Alert as MuiAlert, Snackbar } from '@mui/material';

// Create Alert Context
const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  // Set an alert message
  const setAlertMessage = (message, severity = 'info') => {
    setAlert({ message, severity });
  };

  // Clear alert message
  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ setAlert: setAlertMessage, clearAlert }}>
      {children}
      {alert && (
        <Snackbar
          open={!!alert}
          autoHideDuration={6000}
          onClose={clearAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={clearAlert}
            severity={alert.severity}
          >
            {alert.message}
          </MuiAlert>
        </Snackbar>
      )}
    </AlertContext.Provider>
  );
};

// Alert Component (for standalone use)
const Alert = () => {
  return null; // The actual alert is rendered by the provider
};

export default Alert;
