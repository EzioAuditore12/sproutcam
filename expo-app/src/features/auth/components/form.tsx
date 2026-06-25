import { cn } from "heroui-native/utils";
import { View, type ViewProps } from "react-native";

import { useAppForm } from "@/hooks/use-app-form";
import { signIn } from "../../../lib/auth";
import { loginParamSchema, type LoginParam } from "../schemas/param.schema";

interface LoginFormProps extends ViewProps {
  handleSubmit: typeof signIn.email;
}

export function LoginForm({ className, handleSubmit, ...props }: LoginFormProps) {
  const Form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies LoginParam,
    validators: {
      onChange: loginParamSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Submitting login form:", value);

      const response = await handleSubmit({
        email: value.email,
        password: value.password,
      });

      if (response.error) alert(response.error.message || "An error occurred");

      console.log("Login response:", response);
    },
  });

  return (
    <Form.AppForm>
      <View className={cn("flex-col gap-y-4", className)} {...props}>
        <Form.AppField name="email">
          {(field) => (
            <field.InputField label="Email" placeholder="Enter your email ..." isRequired />
          )}
        </Form.AppField>

        <Form.AppField name="password">
          {(field) => (
            <field.InputField
              label="Password"
              placeholder="Enter your password ..."
              secureTextEntry
              isRequired
            />
          )}
        </Form.AppField>

        <Form.SubmitButton>Submit</Form.SubmitButton>
      </View>
    </Form.AppForm>
  );
}
