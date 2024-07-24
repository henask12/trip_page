import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import NcInputNumber from "@/components/NcInputNumber";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ClearDataButton from "@/components/ClearDataButton";

// Define the initial form values and validation schema
const initialValues = {
  guestAdults: 1,
  guestChildren: 0,
  guestInfants: 0,
};

const validationSchema = Yup.object({
  guestAdults: Yup.number().min(0).required(),
  guestChildren: Yup.number().min(0).required(),
  guestInfants: Yup.number().min(0).required(),
});

const FlightSearchFormGuest = () => {
  const hanleButoon = () => {
    console.log();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form values:", values);
      }}
    >
      {({ values }) => (
        <Form className="w-full flex flex-col gap-4">
          {/* Guest selection */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="guestAdults">Adults:</label>
              <Field
                id="guestAdults"
                name="guestAdults"
                component={NcInputNumber}
                label="Adults"
                desc="Number of adults"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="guestChildren">Children:</label>
              <Field
                id="guestChildren"
                name="guestChildren"
                component={NcInputNumber}
                label="Children"
                desc="Number of children"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="guestInfants">Infants:</label>
              <Field
                id="guestInfants"
                name="guestInfants"
                component={NcInputNumber}
                label="Infants"
                desc="Number of infants"
              />
            </div>
          </div>

          <div className="flex items-center">
            <span>{`${
              values.guestAdults + values.guestChildren + values.guestInfants
            } Guests`}</span>
          </div>

          <div className="flex gap-4">
            <ButtonPrimary type="submit">Search Flights</ButtonPrimary>
            <ButtonSecondary type="button">Clear</ButtonSecondary>
            
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FlightSearchFormGuest;
