import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type BSSelectProps = {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};

const BSSelect = ({ label, name, options }: BSSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            size="large"
            placeholder="Please select a option"
            {...field}
            style={{ width: "100%" }}
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default BSSelect;
