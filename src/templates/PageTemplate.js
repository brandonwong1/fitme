import React from 'react';

const PageTemplate = (props) => {

  return (
    <div className={'d-flex flex-grow'} id={'background'}>
      <div className={"container flex-column"}>
        {props.children}
      </div>
    </div>
  )

}

export default PageTemplate;