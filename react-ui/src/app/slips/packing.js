// @flow

import * as React from 'react';
import styled from 'styled-components';

import { getPackingSlipData } from 'api/slips';
import { descFromValue } from 'lib/constants/bike-size';

const Pages = styled.div`
  @page {
    size: 8.5in 11in;
    margin: 0in;
  }
  & * {
    font-size: inherit;
  }
  & table {
    border-collapse: collapse;
  }
  & table, & th, & td {
    border: 1px solid black;
  }
  & td {
    vertical-align: top;
    padding: 5px;
  }

  font-family: Sans-Serif;
  font-size: 10pt;
  padding: 0;
  margin: 0;
`;

const Page = styled.div`
  page-break-after: always;
  page-break-inside: avoid;
  padding: 0.6in;
  width: 7.3in;
`;

export default async () => {
  const data = await getPackingSlipData();
  return <Pages>{
    data.households.map(household =>
    <Page key={household.id}>
      <div style={{ width: '50%', float: 'left' }}>
        <b style={{ fontSize: '1.6em' }}>Family Summary Sheet</b><br/>
        <br/>
        <b>Referred By:</b> { household.nominator_name }<br/>
        <b>Affiliation:</b> { household.nominator.affiliation.name } ({ household.nominator.affiliation.type })<br/>
        <b style={{ fontSize: '1.3em' }}>
          Division: { household.address ? household.address.cmpd_division : '__' }</b><br/>
        <b style={{ fontSize: '1.3em' }}>Response Area:
          { household.address ? household.address.cmpd_response_area : '___' }</b><br/>
      </div>
      <div style={{ width: '50%', float: 'right' }}>
        <div style={{ fontWeight: 'bold', fontSize: '2.6em', border: '4px solid black', textAlign: 'center' }}>
          { household.id }
        </div>
        <br/>
        <b>Bicycles requested:</b> { household.children.filter(child => child.bike_want).length }<br/>
        <br/><b>Bicycles assigned:</b> ____<br/>
      </div>
      <div style={{ clear: 'both', height: '15px' }}> </div>
      <table style={{ width: '100%' }}><tbody>
        <tr>
          <td width="50%"><b>Name (First, Last)</b><br/>&nbsp;{ household.name_last }, { household.name_first }</td>
          <td width="50%" rowSpan="2">
            <b>Address</b>
            { household.address ?
              <span>
                <br/>&nbsp;{ household.address.street }
                { household.address.street2 ?
                  <span><br/>&nbsp;{ household.address.street2 }</span>
                   : null }
                <br/>&nbsp;{ household.address.city },
                { household.address.state },
                { household.address.zip }
              </span>
            : 'Not available' }
          </td>
        </tr>
        <tr>
          <td>
            <b>Phone Numbers</b>
            { household.phones.map(phone =>
              <span key={phone.id}><br/>&nbsp;{ phone.number } ({ phone.type })</span>)
            }
          </td>
        </tr>
        <tr>
          <td style={{ border: '3px solid black' }}>
            Contact the warehouse for assistance at:
            <br/>
            <br/>Phone: { data.assistance.phone }
            <br/>Radio: { data.assistance.radio }
            <br/>
            <br/><b style={{ fontStretch: 'condensed' }}>RETURN THIS DOCUMENT TO THE WAREHOUSE</b>
          </td>
          <td style={{ border: '3px solid black' }}>
            <b>I certify that I have made the delivery to this location:</b>
            <br/>
            <br/>
            <div style={{
              width: '90%', borderTop: '2px solid black', margin: '0 5%',
              marginTop: '2em', textAlign: 'center'
            }}>
              Officer Making Delivery - Printed Name
            </div>
          </td>
        </tr>
      </tbody></table>
      <table width="100%"><tbody>
        <tr>
          <td colSpan="6" style={{ textAlign: 'center', background: '#ccc' }}>
            <b style={{ fontSize: '0.8em' }}>
              Check the first column below when toys for the child have been entered into their box</b>
            <br/>
            <br/><b style={{ fontSize: '1.5em' }}>Children Information</b>
          </td>
        </tr>
        <tr>
          <td><b>Done</b></td>
          <td><b>Name</b></td>
          <td><b>Sex</b></td>
          <td><b>Age</b></td>
          <td><b>Bike&nbsp;Requested</b></td>
          <td><b>Notes</b></td>
        </tr>
        { household.children.map(child =>
        <tr key={child.id}>
          <td></td>
          <td>{ child.name_first }</td>
          <td>{ child.gender }</td>
          <td>{ child.age }</td>
          <td>
            { child.bike_want ? `${descFromValue(child.bike_size)}\n${child.bike_style}` : 'no' }
          </td>
          <td>
            <div style={{ maxHeight: '7.5em', overflow: 'hidden', fontSize: '0.9em' }}>
              { !child.clothes_want ? null : `
                Shirt size: ${ child.clothes_size_shirt },
                Pants size: ${ child.clothes_size_pants },
                Shoe size: ${ child.shoe_size }
              `}
              { !child.favourite_colour ? null :
                ` Favorite color: ${ child.favourite_colour }`
              }
              { !child.interests ? null :
                ` Interests: ${ child.interests }`
              }
              { !child.ideas ? null :
                ` Ideas: ${ child.ideas }`
              }
            </div>
          </td>
        </tr>)
        }
      </tbody></table>
      <br/>
      <span style={{ fontSize: '0.8em' }}>
        <b>Instructions: Officers,</b> although a bike may be requested,
        there are not enough bikes for all requests. Please note the box
        to determine the number of bikes that have bee nassigned to this
        family. In the Bike Requested area, if a bike has been assigned,
        it will be circled for the child it has bee nassigned to.

        <br/> <br/><b>Volunteers:</b> If you are filling the family box
        for the children on this list, please enter the number of gifts
        you have put into the box for each child in the DONE box to the
        left of each child&quot;s name.
      </span>
    </Page>)
    }
  </Pages>;
};
