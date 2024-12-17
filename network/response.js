exports.success = (req, res, message = '', status = 200) => {
    res.status(status).send({
      error: false,
      status,
      body: message,
    });
  };
  
  exports.error = (req, res, message = 'Internal Server Error', status = 500, details) => {
    console.error('Error details:', details); // Para logging opcional
    res.status(status).send({
      error: true,
      status,
      // body: message,
      message,
        details: details || {} // Incluye los detalles en la respuesta
    });
  };
  