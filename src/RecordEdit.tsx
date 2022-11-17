import { FC } from "react";
import {
  Edit,
  FormDataConsumer,
  required,
  SelectInput,
  SimpleForm,
} from "react-admin";

export const RecordEdit: FC = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm>
      <SelectInput
        source="category"
        choices={[
          { id: "A", name: "A" },
          { id: "B", name: "B" },
        ]}
        validate={[required("Category may not be empty")]}
      />

      <FormDataConsumer>
        {/* When category is changed, the select input for subCategory is updated to reflect the new choices, but we
            also need to adjust the current choice to the empty value in order keep the form in a valid state. How to do
            that? */}
        {({ formData }) => {
          const choices =
            formData.category === "A"
              ? [
                  { id: "Foo", name: "Foo" },
                  { id: "Bar", name: "Bar" },
                ]
              : [
                  { id: "Baz", name: "Baz" },
                  { id: "Bam", name: "Bam" },
                ];
          return <SelectInput source="subCategory" choices={choices} />;
        }}
      </FormDataConsumer>
    </SimpleForm>
  </Edit>
);
