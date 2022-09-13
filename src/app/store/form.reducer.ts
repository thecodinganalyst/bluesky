import {createReducer} from "@ngrx/store";

export const initialState = {
  controls: {
    label: "Contact Form",
    controls: [
      { key: 'givenName', label: 'Given Name', value: '', required: true, order: 1, size: 0.5},
      { key: 'familyName', label: 'Family Name', value: '', required: true, order: 2, size: 0.5},
      { key: 'contactNo', label: 'Contact No', value: '', required: true, order: 3, size: 0.5},
      { key: 'email', label: 'Email', value: '', required: true, order: 4, size: 0.5},
      { label: "Address", controls: [
          { key: 'street', label: 'Street', value: '', required: true, order: 5, size: 1},
          { key: 'building', label: 'Building', value: '', required: false, order: 6, size: 0.5},
          { key: 'unit', label: 'Unit', value: '', required: false, order: 7, size: 0.5},
          { key: 'city', label: 'City', value: '', required: true, order: 8, size: 0.5},
          { key: 'postalCode', label: 'Postal Code', value: '', required: true, order: 9, size: 0.5},
          { key: 'stateProvince', label: 'State/Province', value: '', required: true, order: 10, size: 1},
          { key: 'country', label: 'Country', value: '', required: true, order: 11, size: 1},
        ]
      },
      { key: 'message', label: 'Message', value: '', required: true, order: 12, size: 3},
    ]
  }
}


export const formReducer = createReducer({initialState});
