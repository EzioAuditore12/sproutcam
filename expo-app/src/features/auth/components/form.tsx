import { View, type ViewProps } from "react-native";
import { cn } from "heroui-native/utils";

import { Input } from "heroui-native/input";
import { Button } from "heroui-native/button";
import { Label } from "heroui-native/label";
import { TextField } from "heroui-native/text-field";
import { FieldError } from "heroui-native/field-error";
import { useForm } from "@tanstack/react-form";

import { authClient, signIn } from "@/lib/auth";

import { type LoginParam, loginParamSchema } from "../schemas/param.schema";

interface LoginFormProps extends ViewProps {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const Form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies LoginParam,
    validators: {
      onChange: loginParamSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Submitting login form:", value);

      const response = await signIn.email({
        email: value.email,
        password: value.password,
      });

      console.log("Login response:", response);
    },
  });

  return (
    <View className={cn("flex-col gap-y-4", className)} {...props}>
      <Form.Field name="email">
        {({ name, state, handleBlur, handleChange }) => {
          return (
            <TextField isRequired isInvalid={!state.meta.isValid}>
              <Label>Email</Label>
              <Input
                id={name}
                value={state.value}
                onBlur={handleBlur}
                onChangeText={handleChange}
                keyboardType="email-address"
                placeholder="Enter your email ..."
              />
              <FieldError>{state.meta.errors.map((err) => err?.message)}</FieldError>
            </TextField>
          );
        }}
      </Form.Field>

      <Form.Field name="password">
        {({ name, state, handleBlur, handleChange }) => {
          return (
            <TextField isRequired isInvalid={!state.meta.isValid}>
              <Label>Password</Label>
              <Input
                id={name}
                value={state.value}
                onBlur={handleBlur}
                onChangeText={handleChange}
                secureTextEntry
                placeholder="Enter your password ..."
              />
              <FieldError>{state.meta.errors.map((err) => err?.message)}</FieldError>
            </TextField>
          );
        }}
      </Form.Field>

      <Button onPress={Form.handleSubmit}>Login</Button>
    </View>
  );
}
