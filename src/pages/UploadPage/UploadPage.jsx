import React from 'react'
import UploadForm from '../../components/UploadForm'
import { PageTitle } from '../../components/pageTitle'
import "./uploadPage.css"

const UploadPage = () => {
  return (
    <div className='form-container'>
        <PageTitle title="Upload"/>
        <UploadForm />
    </div>
  )
}

export default UploadPage