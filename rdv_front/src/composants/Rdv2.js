import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

const Rdv2 = ( {rdv} ) => {

    console.log(rdv);

  return (
    <div>
          <p>{rdv.lieu}</p>
    </div>
  );
};

export default Rdv2;
