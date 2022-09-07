import {createReducer} from "@ngrx/store";

export const initialState = {
  definition: {
    givenName: "",
    surName: "",
    contactNo: "",
    email: "",
    address: {
      street: "", block: "", unit: "", city: "", state: null, country: "", postalCode: ""
    },
    message: ""
  }
}

export const formReducer = createReducer({initialState});
