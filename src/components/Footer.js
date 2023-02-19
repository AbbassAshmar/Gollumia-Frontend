import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';
import './Footer.css'
import SmBtn from './SmBtn';
export default function App() {
  return (
    <MDBFooter bgColor='Black' className='text-left text-lg-left'>
      <MDBContainer className=' p-4'>
        <MDBRow>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <ul style={{margin:"0 0 0 0"}}className='list-unstyled mb-0'>
              <li><a href='#' className='text-white'>Questions ? contact us</a></li>
              <li>
                <a href='#!' className='text-white'>QA</a>
              </li>
              <li>
                <a href='#!' className='text-white'>license</a>
              </li>
              <li>
                <a href='#!' className='text-white'>commonly asked</a>
              </li>
              <li>
                <a href='#!' className='text-white'>privacy</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <ul className='list-unstyled'>
              <li>
                <a href='#!' className='text-white'>Help center</a>
              </li>
              <li>
                <a href='#!' className='text-white'>jobs</a>
              </li>
              <li>
                <a href='#!' className='text-white'>cookie prefrences</a>
              </li>
              <li>
                <a href='#!' className='text-white'>Legal Notices</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-white'>
                  Account
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  ways to watch
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                    corporate information
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  only on AFLIX
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <ul className='list-unstyled'>
              <li>
                <a href='#!' className='text-white'>
                  media center
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  terms of use
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  contact us
                </a>
              </li>
              <li>
              <MDBContainer className='text-center p-4 pb-0'>
        <section className='mb-4'>
          <SmBtn small={true} icon="instagram" color="#ac2bac"/>
          <span style={{margin:"0 3px 0 0 "}}></span>
          <SmBtn small={true} icon="github" color="#333333"/>
          <SmBtn small={true} icon="linkedin-in" color="#0082ca"/>
          <SmBtn small={true} icon="facebook-f" color="blue"/>
        </section>
      </MDBContainer>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}