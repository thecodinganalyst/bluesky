import {createReducer} from "@ngrx/store";
import {countries} from "./country-list";

export const initialState = {
  title: 'Delivery Form',
  controls: [
    { name: 'givenName', label: 'Given Name', value: '', required: true, order: 2, size: '50%', controlType: 'textbox'},
    { name: 'familyName', label: 'Family Name', value: '', required: true, order: 1, size: '50%', controlType: 'textbox'},
    { name: 'contactNo', label: 'Contact No', value: '', required: true, order: 3, size: '50%', controlType: 'textbox'},
    { name: 'email', label: 'Email', value: '', required: true, order: 4, size: '50%', controlType: 'textbox'},
    { name: 'street', label: 'Street', value: '', required: true, order: 5, size: '100%', controlType: 'textbox'},
    { name: 'building', label: 'Building', value: '', required: false, order: 6, size: '50%', controlType: 'textbox'},
    { name: 'unit', label: 'Unit', value: '', required: false, order: 7, size: '50%', controlType: 'textbox'},
    { name: 'city', label: 'City', value: '', required: true, order: 8, size: '50%', controlType: 'textbox'},
    { name: 'postalCode', label: 'Postal Code', value: '', required: true, order: 9, size: '50%', controlType: 'textbox'},
    { name: 'stateProvince', label: 'State/Province', value: '', required: true, order: 10, size: '100%', controlType: 'textbox'},
    { name: 'country', label: 'Country', value: 'SG', required: true, order: 11, size: '100%', controlType: 'dropdown',
      options: countries.map((country) => ({display: country.name, value: country.code}))},
    { name: 'message', label: 'Message', value: '', required: true, order: 12, size: '500%', controlType: 'textarea'},
  ]

}

export const formReducer = createReducer(initialState);
